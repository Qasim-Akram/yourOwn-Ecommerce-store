import { useState, useEffect } from "react"
import { Link } from "react-router";
export function Login() {
    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.title = "Login page";
    }, []);

    return (<>
        <p>Welcome to yourOwn Store</p>
        <div className="login-container">
            <input 
                type='email' 
                placeholder=" Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input 
                type={visibility ? "text" : "password"} 
                placeholder=" Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={() => { setVisibility(!visibility) }}>{visibility ? "Hide" : "Show"}</button>
            <Link to="/homepage">
                <button>Login</button>
            </Link>

        <p>didn't have an account? <Link to="/Signup">Signup</Link></p>

        </div>
    </>)

}