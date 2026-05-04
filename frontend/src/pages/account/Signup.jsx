import { useState } from "react";
import { Link, useNavigate } from "react-router";
import './account.css';

export function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
    };

    const handleSubmit = () => {
        const newErrors = {
            firstName: !form.firstName.trim(),
            email: !form.email.trim(),
            password: !form.password.trim(),
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;
        navigate("/homepage");
    };

    const isValid = form.firstName.trim() && form.email.trim() && form.password.trim();

    return (
        <>
            <title>Signup - yourOwn Store</title>
            <div className="signup-container">
                <h1 className="account-title">Create <span>Account</span></h1>
                <p className="account-subtitle">Join us today</p>

                <div className="form-group">
                    <input
                        type="text"
                        className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange('firstName')}
                    />
                    {errors.firstName && <p className="error-message">First Name is required</p>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Last Name (optional)"
                        value={form.lastName}
                        onChange={handleChange('lastName')}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange('email')}
                    />
                    {errors.email && <p className="error-message">Email is required</p>}
                </div>

                <div className="password-toggle-container">
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange('password')}
                        />
                        {errors.password && <p className="error-message">Password is required</p>}
                    </div>
                    <button className="toggle-button" onClick={() => setShowPassword(p => !p)}>
                        {showPassword ? " Hide " : "Show"}
                    </button>
                </div>

                <button
                    className={`button-primary ${!isValid ? 'button-disabled' : ''}`}
                    disabled={!isValid}
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>

                <div className="auth-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </>
    );
}