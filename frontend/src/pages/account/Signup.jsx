import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './account.css';

export function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
        setApiError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        if (!form.password.trim()) newErrors.password = 'Password is required';
        else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setApiError('');
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/signup', {
                firstName: form.firstName,
                lastName: form.lastName || undefined,
                email: form.email,
                password: form.password
            });
            login(res.data.token, res.data.user);
            navigate('/homepage');
        } catch (err) {
            const msg = err.response?.data?.error || 'Signup failed. Please try again.';
            setApiError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    const isValid = form.firstName.trim() && form.email.trim() && form.password.length >= 6;

    return (
        <>
            <title>Signup - yourOwn Store</title>
            <div className="signup-container">
                <h1 className="account-title">Create <span>Account</span></h1>
                <p className="account-subtitle">Join us today</p>

                {apiError && (
                    <div className="api-error-banner">
                        {apiError}
                    </div>
                )}

                <div className="form-group">
                    <input
                        type="text"
                        className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange('firstName')}
                        onKeyDown={handleKeyDown}
                    />
                    {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Last Name (optional)"
                        value={form.lastName}
                        onChange={handleChange('lastName')}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange('email')}
                        onKeyDown={handleKeyDown}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="password-toggle-container">
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            placeholder="Password (min 6 characters)"
                            value={form.password}
                            onChange={handleChange('password')}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <button className="toggle-button" onClick={() => setShowPassword(p => !p)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    className={`button-primary ${(!isValid || loading) ? 'button-disabled' : ''}`}
                    disabled={!isValid || loading}
                    onClick={handleSubmit}
                >
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>

                <div className="auth-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </>
    );
}