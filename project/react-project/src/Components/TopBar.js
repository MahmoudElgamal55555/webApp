import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
export default function TopBar() {
    return (

        <Navbar expand="lg" className=" bg-primary shadow mb-3 ">
            <Container>
                <Navbar.Brand>Dash Board</Navbar.Brand>
                <Link to="/" style={{ textAlign: "center" }} className="">
                    <Button variant="primary" size="sm">
                        Go to website
                    </Button>
                </Link>
            </Container>

        </Navbar >
    );
}
