import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserPlus, faPlus } from "@fortawesome/free-solid-svg-icons";

import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

import { Link, NavLink } from "react-router-dom";
// import style link
import "./style.css";



export default function SideBar() {


    return (
        <div className="side-bar ">

            <NavLink activeclassname="active" to="/dashboard/users" className="item-link" >
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px" }} />
                <span>Users</span>
            </NavLink>

            <NavLink activeclassname="active" to="/dashboard/createNewUser" className="item-link" >
                <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "10px" }} />
                <span>new User</span>
            </NavLink>

            <NavLink activeclassname="active" to="/dashboard/products" className="item-link" >
                <FontAwesomeIcon icon={faProductHunt} style={{ marginRight: "10px" }} />
                <span>Products</span>
            </NavLink>

            <NavLink activeclassname="active" to="/dashboard/createNewProducts" className="item-link" >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
                <span>new products</span>
            </NavLink>
        </div>
    );
} 