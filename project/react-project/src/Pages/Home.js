import Header from "../Components/Header";


import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { trash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from "@fortawesome/free-solid-svg-icons";



export default function Home() {
    return (
        <div className="App">
            <Header />
            {/* <FontAwesomeIcon icon={faGithub} /> */}
            {/* <FontAwesomeIcon icon={faHouse} /> */}
            <h1>Home</h1>
        </div>
    );
}