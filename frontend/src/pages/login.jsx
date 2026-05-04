import { useState } from "react"
const [visibility, setVisibility] = useState(false);
export function Login() {
    return (<>
        <title>Login page</title>

        <p>Welcome to yourOwn Store</p>
        <div className="login-container">
            <input type='email' placeholder=" Email"></input>
            <input type='password' placeholder=" Password"></input>
            <button onClick={()=>{setVisibility(!visibility)}}>{visibility?"Show":"Hide"}</button>
            <button>Login</button>
        </div>
    </>)

}