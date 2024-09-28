import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
const NavbarComponent = () => {
    const [role, setRole] = useState('');
    const [token, setToken] = useState(false);

    const checkToken = () => {
        if (Cookies.get('token')) {
            setToken(true);
        }
    }
    const handleLogout =()=>{
        Cookies.remove("token")
        Cookies.remove("role")
        navigate('/');
    }
    useEffect(() => {
        setRole(Cookies.get('role'));
        checkToken();
    }, [role]);



    return (
        <>
            <Navbar expand="lg" className="bg-primary">
                <Container>
                    <Navbar.Brand href="/"><img src={logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Form>
                                <Form.Control type="search" placeholder="Cari Smartphone apa?" />
                            </Form>
                            <hr className="d-block d-lg-none text-light" />
                            {role === '1' ? (
                                <Link to="/admin/dashboard" className="btn btn-success me-2 text-light">Dashboard</Link>
                            ) : (
                                ""
                            )}
                            {token ? (
                                <div to="/logout" className="btn btn-outline-danger text-light" onClick={handleLogout}>Logout</div>
                            ) : (
                                <>
                                <Link to="/login" className="btn btn-outline-light text-light">Login</Link>,
                                <Link to="/daftar" className="btn btn-outline-light text-light">Daftar</Link>
                                </>
                            )
                                // && (
                                //     // <Link to="/login" className="btn btn-outline-light text-light">Login</Link>,
                                //     <Link to="/daftar" className="btn btn-outline-light text-light">Daftar</Link>
                                // )

                            }
                            {/* <Link to="/daftar" className="btn btn-outline-light text-light">Daftar</Link> */}
                            {/* <Link to="/login" className="btn btn-warning text-light me-2">Login</Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;