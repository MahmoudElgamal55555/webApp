import { useContext, useEffect, useState } from "react";
import axios from "axios";


import { User } from "../../Components/UserContext";
import { FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Cookies from "universal-cookie";

export default function UpdateUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const id = window.location.pathname.split('/').slice(-1)[0];

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
            headers: {
                'Authorization': "Bearer " + (new Cookies).get(`Bearer`)
            }
        })
            .then(res => res.json())
            .then(data => {
                setName(data[0].name);
                setEmail(data[0].email);
            });
    }, []);

    const userNow = useContext(User);
    async function Submit(e) {
        e.preventDefault();
        var request = "";
        setAccept(true);
        request = `http://127.0.0.1:8000/api/user/update/${id}`;
        try {
            let res = await axios.post(request, {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordR,
            }, {
                headers: {
                    'Authorization': "Bearer " + (new Cookies).get(`Bearer`)
                }
            });

            window.location.pathname = "dashboard/users";
        } catch (error) {
            if (error.response.status === 422) {
                setEmailError(true);
            }
        }
    }


    return (
        <>
            <form onSubmit={Submit} >
                <FloatingLabel label="Name" className="mb-3">
                    <Form.Control
                        type='text' id='name' name='name' placeholder=""
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {name === '' && accept ? "Name is required" : ""}
                    </h1>
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                        type='email' id='email' name='email' placeholder=""
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {accept && emailError === 422 && "Email is already been taken"}
                    </h1>
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3">
                    <Form.Control
                        type='password' id='password' name='password' placeholder=""
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {password.length < 8 && accept && "Password must be more than 8 char"}
                    </h1>
                </FloatingLabel>

                <FloatingLabel label="Repeat Password" className="mb-3">
                    <Form.Control
                        type='password' id='repeat' name='repeat' placeholder=""
                        value={passwordR} onChange={(e) => setPasswordR(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {passwordR !== password && accept && "Password does not match"}
                    </h1>
                </FloatingLabel>

                <div style={{ textAlign: "center" }}>
                    <button type="submit">Update</button>
                </div>

            </form>
        </>
    );
}

// const xhttp = new XMLHttpRequest();
// xhttp.onload = function () {
//     alert(this.responseText);
// }
// xhttp.open("GET", `../back-end/routes/api/user/showbyid/${id}`, true);
// xhttp.send();

