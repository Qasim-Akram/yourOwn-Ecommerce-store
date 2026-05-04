import { useState, useEffect } from "react";
import { Link } from "react-router";
import './account.css';

export function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        document.title = "Sign Up - yourOwn Store";
    }, []);

    return (<>
        <div className="signup-container">
            <h1 className="account-title">Create Account</h1>
            <p className="account-subtitle">Join us today</p>
            
            <div className="form-group">
                <input 
                    type='text' 
                    className="form-input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-input"
                    placeholder="Last Name (optional)"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

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
                <button className="button-primary">Sign Up</button>
            </Link>

            <div className="auth-link">
                Already have an account? <Link to="/login">Sign in</Link>
            </div>
        </div>
    </>)
}