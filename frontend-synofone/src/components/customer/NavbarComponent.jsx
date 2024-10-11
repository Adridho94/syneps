import { Navbar, Container, Nav, Form, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
import Api from "../../routes/Api";
const NavbarComponent = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Fungsi untuk mengecek token dan role
    const checkAuth = () => {
        const token = Cookies.get('token');
        const userRole = Cookies.get('role');
        return { token: !!token, role: userRole || '' };
    };

    // Menghandle Logout
    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("role");
        const response = Api.post('/logout');
        console.log(response);
        navigate('/'); // Arahkan ke halaman utama setelah logout
    };

    useEffect(() => {
        const { token, role } = checkAuth(); // Ambil token dan role
        setRole(role); // Set role
    }, []); // Hanya dijalankan sekali saat komponen mount

    const { token } = checkAuth(); // Dapatkan status token untuk render

    return (
        <Navbar expand="lg" className="bg-primary">
            <Container>
                <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex align-items-center">
                        {/* Form Pencarian */}
                        <Form className="me-2">
                            <Form.Control type="search" placeholder="Cari Smartphone apa?" />
                        </Form>

                        <hr className="d-block d-lg-none text-light" />

                        {/* Link ke halaman Cart dengan Icon */}
                        <Link to="/cart" className="text-light me-2">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>

                        {/* Dropdown untuk User */}
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="text-light bg-transparent border-0">
                                <FontAwesomeIcon icon={faUser} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {/* Opsi untuk Admin Dashboard jika role adalah admin */}
                                {role === '1' && (
                                    <Dropdown.Item as={Link} to="/admin/dashboard">
                                        Dashboard
                                    </Dropdown.Item>
                                )}
                                {/* Opsi untuk Login jika user belum login */}
                                {!token && (
                                    <>
                                        <Dropdown.Item as={Link} to="/login">
                                            Login
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/daftar">
                                            Daftar
                                        </Dropdown.Item>
                                    </>
                                )}
                                {/* Opsi untuk Logout jika user sudah login */}
                                {token && (
                                    <Dropdown.Item onClick={handleLogout}>
                                        Log Out
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
