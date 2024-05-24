import TopBar from "../Components/TopBar";
import SideBar from "../Components/SideBar";
import Users from "./Users/Users";
import { Outlet, Route, Routes } from "react-router-dom";


export default function Dashboard() {
    return (
        <div className="">
            <TopBar />
            <div className="d-flex ">
                <SideBar />
                <div style={{ width: "80%" }}>
                    <Outlet />                   
                </div>
            </div>
        </div>
    )
}
