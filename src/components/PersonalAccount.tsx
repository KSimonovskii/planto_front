import {useState} from "react";
import {useNavigate} from "react-router";
import {loginUser} from "../features/api/authActions.ts";
import AccountDashboard from "./AccountDashboard.tsx";

const PersonalAccount = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await loginUser({username, password});
            setUsername("");
            setPassword("");
            navigate({AccountDashboard});
        } catch (err) {
            console.error("Login failed: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="personal-account-container">
            <h2>Login to your personal account</h2>
            <div>
                {error && <p className="error-message">{error}</p>}
            </div>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Login :</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>

    );

};

export default PersonalAccount