import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
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
                    <Nav className="me-auto"> {/* Menambahkan class untuk spasi */}
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Cari Smartphone apa?" className="me-2" />
                        </Form>
                        <hr className="d-block d-lg-none text-light" />
                        {role === '1' && (
                            <Link to="/admin/dashboard" className="btn btn-success me-2 text-light">Dashboard</Link>
                        )}
                        {token ? (
                            <div className="btn btn-outline-danger text-light" onClick={handleLogout}>Logout</div>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light text-light me-2">Login</Link>
                                <Link to="/daftar" className="btn btn-outline-light text-light">Daftar</Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
