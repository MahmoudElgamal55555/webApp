import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';

import Spinner from 'react-bootstrap/Spinner';
import { User } from "../../Components/UserContext";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [afterRsp, setAfterRes] = useState(0);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        var spinnerload = document.getElementById("spinnerload");
        spinnerload.classList.remove("visually-hidden");

        axios
            .get(`http://127.0.0.1:8000/api/user/show`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + token,
                },
            })
            .then((data) => setUsers(data.data))
            .catch((error) => {
                console.log(error);
            }).
            finally(() => {
                spinnerload.classList.add("visually-hidden");
            });


    }, [afterRsp]);




    const showUsers = users.map((user, index) => {
        return (
            <tr key={index}>

                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <div className="">

                        <FontAwesomeIcon className="mx-3"
                            style={{
                                cursor: "pointer",
                                color: "red",
                                width: "22px",
                                height: "22px"
                            }}
                            icon={faTrash}
                            onClick={() => deleteUser(user.id)} />
                        <Link to={`${user.id}`} >
                            <FontAwesomeIcon className="mx-3"
                                style={{
                                    cursor: "pointer",
                                    color: "black",
                                    width: "22px",
                                    height: "22px"
                                }}
                                icon={faPenToSquare} />
                        </Link>
                    </div>
                </td>
            </tr>
        );
    });

    async function deleteUser(id) {
        const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setAfterRes((pre) => pre + 1);
    }

    return (
        <div style={{ padding: "20px" }}>
            <Spinner id="spinnerload" className="visually-hidden position-fixed top-50 start-50" animation="border" />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center col-1">Id</th>
                        <th className="text-center col-3">User</th>
                        <th className="text-center col-5">Email</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showUsers}
                </tbody>
            </Table>

        </div>
    );
}


// const xhttp = new XMLHttpRequest();
// xhttp.responseType = 'json';
// xhttp.onload = function () {
//     setUsers(this.response);
//     spinnerload.classList.add("visually-hidden");
// }
// xhttp.open("GET", `http://127.0.0.1:8000/api/user/show`, true);
// xhttp.send();