import { useState } from "react"
import { Link } from "react-router";
import './account.css';

export function Login() {
    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);


    const validateFields = () => {
        const empty = [];
        if (!email.trim()) empty.push('email');
        if (!password.trim()) empty.push('password');
        setEmptyFields(empty);
        return empty.length === 0;
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    return (<>
        <title>Login - yourOwn Store</title>
        <div className="login-container">
            <h1 className="account-title">Welcome <span>Back</span></h1>
            <p className="account-subtitle">Sign in to your account</p>

            <div className="form-group">
                <input
                    type='email'
                    className={`form-input ${emptyFields.includes('email') ? 'input-error' : ''}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emptyFields.includes('email') && <p className="error-message">Email is required</p>}
            </div>

            <div className="password-toggle-container">
                <div className="password-field">
                    <input
                        type={visibility ? "text" : "password"}
                        className={`form-input ${emptyFields.includes('password') ? 'input-error' : ''}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {emptyFields.includes('password') && <p className="error-message">Password is required</p>}
                </div>
                <button
                    className="toggle-button"
                    onClick={() => setVisibility(!visibility)}
                >
                    {visibility ? "Hide" : "Show"}
                </button>
            </div>

            <Link to={isFormValid ? "/homepage" : "#"} style={{ textDecoration: 'none' }} onClick={(e) => !isFormValid && e.preventDefault()}>
                <button
                    className={`button-primary ${!isFormValid ? 'button-disabled' : ''}`}
                    disabled={!isFormValid}
                    onClick={() => validateFields()}
                >
                    Login
                </button>
            </Link>

            <div className="auth-link">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    </>)
}