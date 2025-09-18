import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthActions} from "../../../features/hooks/useAuthActions.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";


const PersonalAccount = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {loginUser} = useAuthActions();
    const {user, isAdmin} = useCurrentUser();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await loginUser({login, password});
            setLogin("");
            setPassword("");


        } catch (err: unknown) {
            console.error("Login failed: ", err);
            if (err instanceof Error) {
                setError(err.message);
            }

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            if (isAdmin) {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/cart", { replace: true });
            }
        }
    }, [user, isAdmin, navigate]);

    const handleRegisterRedirect = () => {
        navigate("/account/register");
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
                <h2 className="text-3xl font-bold font-rubik text-gray-800 text-center">
                    Login to Your Account
                </h2>

                {error && (
                    <p className="text-red-600 text-center font-semibold">{error}</p>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600 font-inter"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600 font-inter"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-rubik text-white transition-transform duration-200
              ${loading ? "bg-lime-300 cursor-not-allowed" : "bg-lime-600 hover:bg-lime-800 hover:scale-105 active:scale-95"}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <button
                        type="button"
                        onClick={handleRegisterRedirect}
                        className="w-full py-3 rounded-lg border border-lime-600 text-lime-600 font-rubik hover:bg-lime-50 transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        Register
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PersonalAccount;
