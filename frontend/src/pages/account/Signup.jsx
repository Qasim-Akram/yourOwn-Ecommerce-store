import { useState, useEffect } from "react";
import { Link } from "react-router";
import './account.css';

export function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        document.title = "Sign Up - yourOwn Store";
    }, []);

    const validateFields = () => {
        const empty = [];
        if (!firstName.trim()) empty.push('firstName');
        if (!email.trim()) empty.push('email');
        if (!password.trim()) empty.push('password');
        setEmptyFields(empty);
        return empty.length === 0;
    };

    const isFormValid = firstName.trim() !== '' && email.trim() !== '' && password.trim() !== '';

    return (<>
        <div className="signup-container">
            <h1 className="account-title">Create Account</h1>
            <p className="account-subtitle">Join us today</p>
            
            <div className="form-group">
                <input 
                    type='text' 
                    className={`form-input ${emptyFields.includes('firstName') ? 'input-error' : ''}`}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {emptyFields.includes('firstName') && <p className="error-message">First Name is required</p>}
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
                    Sign Up
                </button>
            </Link>

            <div className="auth-link">
                Already have an account? <Link to="/login">Sign in</Link>
            </div>
        </div>
    </>)
}