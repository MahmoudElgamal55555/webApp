import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../../Components/style.css';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function CreateNewUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate();
    const cookie = new Cookies();
    const getCookie = cookie.get('Bearer');

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        var request = "";
        request = `http://127.0.0.1:8000/api/user/create`;
        try {
            let res = await axios.post(request, {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordR,
            }, {
                headers: {
                    Authorization: "Bearer " + getCookie,
                }
            });
            navigate("/dashboard/users");
        } catch (error) {
            if (error.response.status === 422) {
                setEmailError(true);
            }
            setAccept(true);
        }
    }

    return (
        <>

            <form onSubmit={Submit} >

                <FloatingLabel label="Name" className="mb-3">
                    <Form.Control type='text' id='name' name='name' placeholder=""
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {name === '' && accept ? "Name is required" : ""}
                    </h1>
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-3">
                    <Form.Control type='email' id='email' name='email' placeholder=""
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {accept && emailError === 422 && "Email is already been taken"}
                    </h1>
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3">
                    <Form.Control type='password' id='password' name='password' placeholder=""
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {password.length < 8 && accept && "Password must be more than 8 char"}
                    </h1>
                </FloatingLabel>

                <FloatingLabel label="Repeat Password" className="mb-3">
                    <Form.Control type='password' id='repeat' name='repeat' placeholder=""
                        value={passwordR} onChange={(e) => setPasswordR(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {passwordR !== password && accept && "Password does not match"}
                    </h1>
                </FloatingLabel>

                <div style={{ textAlign: "center" }}>
                    <button type="submit">Rigstar</button>
                </div>

            </form>

        </>

    );
}

