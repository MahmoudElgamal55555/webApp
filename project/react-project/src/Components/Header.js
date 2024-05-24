import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import Cookies from 'universal-cookie';
import axios from 'axios';

export default function Headers() {

    const cookie = new Cookies();
    const bearer = cookie.get("Bearer");
    async function logout() {
        await axios.post("http://127.0.0.1:8000/api/logout", null, {
            headers: {
                Authorization: "Bearer " + bearer,
            },
        });
        cookie.remove("Bearer");
        window.location.pathname = "/";

    }

    const styleLink = {
        color: "black",
        textDecoration: "none",
    }



    return (
        <>
            {/* bg-body-tertiary */}
            <Navbar expand="lg" className=" bg-primary">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="me-auto ">
                            <Link style={styleLink} to="/" >Home</Link>
                            <Link style={styleLink} to="/about" >About</Link>

                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>


                    {bearer ?
                        <>
                            <Link to="/dashboard" style={{ textAlign: "center" }} className="">
                                <Button variant="primary" size="sm">
                                    DashBoard
                                </Button>
                            </Link>
                            <div className='' >
                                <Button variant="primary" size="sm" onClick={logout}>
                                    Log Out
                                </Button>
                            </div>
                        </>
                        :
                        <>
                            <Link to="/registar" style={{ textAlign: "center" }} className="">
                                <Button variant="primary" size="sm">
                                    Registar
                                </Button>
                            </Link>
                            <Link to="/login" style={{ textAlign: "center" }} className="">
                                <Button variant="primary" size="sm">
                                    login
                                </Button>
                            </Link>
                        </>
                    }



                </Container>

            </Navbar>

        </>

    );
}
