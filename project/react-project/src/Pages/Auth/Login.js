import { useContext, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { User } from "../../Components/UserContext";
import Cookies from "universal-cookie";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const navig = useNavigate();

    // cookie
    const cookie = new Cookies();


    const userNow = useContext(User);

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            let res = await axios.post("http://127.0.0.1:8000/api/login", {
                email: email,
                password: password,
            });
            const token = res.data.data.token;
            cookie.set('Bearer', token);
            const userDetails = res.data.data.user;
            userNow.setAuth({ token, userDetails });
            console.log(userNow);
            navig("/dashboard");
        } catch (error) {
            if (error.response.status === 401) {
                setEmailError(true);
            }
            // setEmailError(error.response.status);
        }
    }

    return (
        <div>
            <Header />
            <div className="parent">
                <div className="registar">
                    <form onSubmit={Submit}>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' placeholder="Email..." required
                            value={email} onChange={(e) => setEmail(e.target.value)} />


                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' name='password' placeholder="Password..."
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        {password.length < 8 && accept && (
                            <p className="error">Password must be more than 8 char</p>
                        )}

                        <div style={{ textAlign: "center" }}>
                            <button type="submit">Log in</button>
                        </div>

                        {accept && emailError && (
                            <p className="error">Wrong Email or Password</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}