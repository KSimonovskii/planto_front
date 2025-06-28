import {useState} from "react";
import {useNavigate} from "react-router";
import {registerUser} from "../features/api/registAction.ts";

const INITIAL_ACCOUNT_STATE = {
    login: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
};

type InputBlockProps = {
    id: string;
    label: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
};

const InputBlock = ({id, label, value, handleChange, type = "text"}: InputBlockProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

const AccountRegister = () => {

    const [dataAccount, setDataAccount] = useState(INITIAL_ACCOUNT_STATE);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataAccount({...dataAccount, [event.target.name]: event.target.value});
        setError(null);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (dataAccount.password !== dataAccount.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);

        try {
            await registerUser({
                login: dataAccount.login,
                firstname: dataAccount.firstname,
                lastname: dataAccount.lastname,
                email: dataAccount.email,
                password: dataAccount.password,
            });

            setDataAccount(INITIAL_ACCOUNT_STATE);
            setSuccess(true);
            navigate("/accountDashboard");
        } catch (err: any) {
            console.error("Login failed: ", err);
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Register New Account
            </h2>

            {error && (
                <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
            )}

            {success && (
                <p className="text-green-600 text-center mb-4 font-medium">
                    Registration successful!
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <InputBlock id="login" label="Login" value={dataAccount.login} handleChange={handleChange}/>
                <InputBlock id="firstname" label="First Name" value={dataAccount.firstname}
                            handleChange={handleChange}/>
                <InputBlock id="lastname" label="Last Name" value={dataAccount.lastname}
                            handleChange={handleChange}/>
                <InputBlock id="email" label="Email" value={dataAccount.email} handleChange={handleChange}
                            type="email"/>
                <InputBlock id="password" label="Password" value={dataAccount.password} handleChange={handleChange}
                            type="password"/>
                <InputBlock id="confirmPassword" label="Confirm Password" value={dataAccount.confirmPassword}
                            handleChange={handleChange} type="password"/>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${
                        loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Registration process..." : "Register"}
                </button>
            </form>
        </div>
    );
}


export default AccountRegister