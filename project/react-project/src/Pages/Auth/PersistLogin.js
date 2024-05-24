import axios from "axios";
import { Outlet } from "react-router-dom";
import { User } from "../../Components/UserContext";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../../Components/Loading";
import Cookies from "universal-cookie";
export default function () {
    // get Courrent User
    const context = useContext(User);
    const token = context.auth.token;

    const [loading, setLoading] = useState(true);
    // cookie
    const cookie = new Cookies();
    const getCookie = cookie.get('Bearer');
    //  send Refresh Token
    useEffect(() => {
        async function refreshToken() {
            try {
                await axios
                    .post('http://127.0.0.1:8000/api/refresh', null, {
                        headers: {
                            Authorization: "Bearer " + getCookie,
                        },
                    })
                    .then((data) => {
                        cookie.set('Bearer', data.data.token);
                        context.setAuth({
                            "userDetails": data.data.user,
                            "token": data.data.token
                        });
                        //  context.setAuth((prev) => {
                        //     return { userDetails: data.data.user, token: data.data.token }
                        // })
                    });
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        !token ? refreshToken() : setLoading(false);
    }, []);

    return loading ? <LoadingScreen /> : <Outlet />;
}