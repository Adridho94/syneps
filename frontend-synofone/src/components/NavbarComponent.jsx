import { Navbar, Container, Nav, Form  } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NavbarComponent = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-primary">
                <Container>
                    <Navbar.Brand href="/"><img src={logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  className="bg-light" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Form>
                                <Form.Control type="search" placeholder="Cari Smartphone apa?" />
                            </Form>
                            <hr className="d-block d-lg-none text-light" />
                            <Link to="/login" className="btn btn-warning text-light me-2">Login</Link>
                            <Link to="/daftar" className="btn btn-outline-light text-light">Daftar</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;