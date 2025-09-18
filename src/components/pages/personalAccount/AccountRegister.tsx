import {useState} from "react";
import {registerUser} from "../../../features/api/registAction.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";
import {changeAccessToken} from "../../../features/slices/userAuthSlice.ts";

const INITIAL_ACCOUNT_STATE = {
    login: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
};

type InputBlockProps = {
    id: string;
    label: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
};

const InputBlock = ({
                        id,
                        label,
                        value,
                        handleChange,
                        type = "text",
                    }: InputBlockProps) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600 font-inter"
        />
    </div>
);

const AccountRegister = () => {
    const [dataAccount, setDataAccount] = useState(INITIAL_ACCOUNT_STATE);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = (location.state as { from?: string })?.from || "/";

    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataAccount({...dataAccount, [event.target.name]: event.target.value});
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (dataAccount.password !== dataAccount.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);
        try {
            const authData = await registerUser({
                login: dataAccount.login,
                firstname: dataAccount.firstname,
                lastname: dataAccount.lastname,
                email: dataAccount.email,
                password: dataAccount.password,
            });

            dispatch(changeAccessToken({token: authData.accessToken}));
            setDataAccount(INITIAL_ACCOUNT_STATE);

            navigate("/cart");
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Registration failed: ", err);
                setError(err.message || "Unknown error during registration.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
                <h2 className="text-3xl font-bold font-rubik text-gray-800 text-center">
                    Register New Account
                </h2>

                {error && (
                    <p className="text-red-600 text-center font-semibold">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputBlock
                        id="login"
                        label="Login"
                        value={dataAccount.login}
                        handleChange={handleChange}
                    />

                    <InputBlock
                        id="email"
                        label="Email"
                        value={dataAccount.email}
                        handleChange={handleChange}
                        type="email"
                    />
                    <InputBlock
                        id="password"
                        label="Password"
                        value={dataAccount.password}
                        handleChange={handleChange}
                        type="password"
                    />
                    <InputBlock
                        id="confirmPassword"
                        label="Confirm Password"
                        value={dataAccount.confirmPassword}
                        handleChange={handleChange}
                        type="password"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-rubik text-white transition-transform duration-200 ${
                            loading
                                ? "bg-lime-300 cursor-not-allowed"
                                : "bg-lime-600 hover:bg-lime-700 hover:scale-105 active:scale-95"
                        }`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AccountRegister;
