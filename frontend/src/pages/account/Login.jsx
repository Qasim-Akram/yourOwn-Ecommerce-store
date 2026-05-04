import { useState, useEffect } from "react"
import { Link } from "react-router";
import './account.css';

export function Login() {
    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.title = "Login - yourOwn Store";
    }, []);

    return (<>
        <div className="login-container">
            <h1 className="account-title">Welcome Back</h1>
            <p className="account-subtitle">Sign in to your account</p>
            
            <div className="form-group">
                <input 
                    type='email' 
                    className="form-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div className="password-toggle-container">
                <div className="password-field">
                    <input 
                        type={visibility ? "text" : "password"} 
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    className="toggle-button"
                    onClick={() => setVisibility(!visibility)}
                >
                    {visibility ? "Hide" : "Show"}
                </button>
            </div>
            
            <Link to="/homepage" style={{ textDecoration: 'none' }}>
                <button className="button-primary">Login</button>
            </Link>

            <div className="auth-link">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    </>)
}