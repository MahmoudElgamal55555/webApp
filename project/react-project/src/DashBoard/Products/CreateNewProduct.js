
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../../Components/style.css';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function CreateNewProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [accept, setAccept] = useState(false);

    const navigate = useNavigate();
    const cookie = new Cookies();
    const getCookie = cookie.get('Bearer');

    console.log(image);


    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        var request = "";
        request = `http://127.0.0.1:8000/api/product/create`;
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);

            let res = await axios.post(request,
                formData
                , {
                    headers: {
                        Authorization: "Bearer " + getCookie,
                    }
                });
            navigate("/dashboard/users");
        } catch (error) {
            // console.log(error);
            setAccept(true);
        }
    }

    return (
        <>

            <form onSubmit={Submit} >

                <FloatingLabel label="Title" className="mb-3">
                    <Form.Control type='text' id='title' name='title' placeholder=""
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {title.length < 1 && accept ? "Title must be more than 2" : ""}
                    </h1>
                </FloatingLabel>
                <FloatingLabel label="Description" className="mb-3">
                    <Form.Control type='text' id='description' name='description' placeholder=""
                        value={description} onChange={(e) => setDescription(e.target.value)}
                    />

                    <h1 className="error" style={{ height: "15px" }}>
                        {/* {accept && emailError === 422 && "Email is already been taken"} */}
                    </h1>
                </FloatingLabel>

                <FloatingLabel label="Image" className="mb-3">
                    <Form.Control type='file' id='image' name='image' placeholder=""
                        onChange={(e) => setImage(e.target.files.item(0))}
                    />
                    <h1 className="error" style={{ height: "15px" }}>
                        {/* {password.length < 8 && accept && "Password must be more than 8 char"} */}
                    </h1>
                </FloatingLabel>

                <div style={{ textAlign: "center" }}>
                    <button type="submit">Create product</button>
                </div>

            </form>

        </>

    );
}


