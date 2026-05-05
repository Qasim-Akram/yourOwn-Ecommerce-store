import { useState } from "react"
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './account.css';

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password.trim()) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setApiError('');
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            login(res.data.token, res.data.user);
            navigate('/homepage');
        } catch (err) {
            const msg = err.response?.data?.error || 'Login failed. Please try again.';
            setApiError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleLogin();
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    return (
        <>
            <title>Login - yourOwn Store</title>
            <div className="login-container">
                <h1 className="account-title">Welcome <span>Back</span></h1>
                <p className="account-subtitle">Sign in to your account</p>

                {apiError && (
                    <div className="api-error-banner">
                        {apiError}
                    </div>
                )}

                <div className="form-group">
                    <input
                        type='email'
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setApiError(''); }}
                        onKeyDown={handleKeyDown}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="password-toggle-container">
                    <div className="password-field">
                        <input
                            type={visibility ? "text" : "password"}
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setApiError(''); }}
                            onKeyDown={handleKeyDown}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <button
                        className="toggle-button"
                        onClick={() => setVisibility(!visibility)}
                    >
                        {visibility ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    className={`button-primary ${(!isFormValid || loading) ? 'button-disabled' : ''}`}
                    disabled={!isFormValid || loading}
                    onClick={handleLogin}
                >
                    {loading ? 'Signing in...' : 'Login'}
                </button>

                <div className="auth-link">
                    Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </>
    );
}