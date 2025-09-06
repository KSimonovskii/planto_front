import {useState} from "react";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useAuthActions} from "../../../features/hooks/useAuthActions.ts";

const PersonalAccount = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {loginUser} = useAuthActions();

    // const from = (location.state as { from?: Location })?.from?.pathname || "/";
    const from = (location.state as { from?: string })?.from || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await loginUser({login, password})
            setLogin("");
            setPassword("");
            navigate(from, {replace: true});

        } catch (err: unknown) {
            console.error("Login failed: ", err);
            if (err instanceof Error) {
                setError(err.message);
            }

        } finally {
            setLoading(false);
        }
    };

    const handleRegisterRedirect = async () => {
        navigate("/account/register", {state: {from}});
    };

    return (
        <div className="max-w-md mx-auto mt-24 p-8 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Login to your personal account
            </h2>

            {error && (
                <p className="text-red-600 text-center mb-4 font-medium">
                    {error}
                </p>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="login" className="block text-sm font-semibold text-gray-700 mb-1">
                        Login:
                    </label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300
                        ${loading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <button
                    type="button"
                    onClick={handleRegisterRedirect}
                    className="w-full mt-2 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition duration-300"
                >
                    Register
                </button>

            </form>
        </div>
    );
};

export default PersonalAccount;