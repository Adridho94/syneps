// Import dari react-router-dom untuk navigasi halaman
import { Link } from "react-router-dom";

// Import dari react-bootstrap untuk elemen UI yang siap pakai
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
// Komponen DefaultLayout yang akan digunakan sebagai layout utama
const DefaultLayout = ({children}) => {

    const navigate = useNavigate();

    const handleLogout =()=>{
        Cookies.remove("token")
        navigate('/');
    }
    return (
        <>
            {/* Membungkus layout dengan div yang memiliki id "defaultLayout" dan mengatur styling */}
            <div id="defaultLayout" style={{ minHeight: "100vh", display: "flex" }}>
                
                {/* Sidebar di sisi kiri halaman */}
                <aside className="bg-primary p-3" style={{ width: "250px" }}>
                    {/* Judul sidebar */}
                    <h1 className="text-white text-center mt-2 mb-3">Start</h1>
                    
                    {/* Menu navigasi dalam bentuk kolom */}
                    <Nav className="flex-column">
                        {/* Link navigasi menggunakan react-router-dom dan styling dari bootstrap */}
                        <Nav.Link as={Link} to="/admin/dashboard" className="text-white">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/admin/banners" className="text-white">Banners</Nav.Link>
                        <Nav.Link as={Link} to="/admin/brands" className="text-white">Brands</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products" className="text-white">Products</Nav.Link>
                        <Nav.Link as={Link} to="/admin/users" className="text-white">Users</Nav.Link>
                    </Nav>
                </aside>
                
                {/* Konten utama di sisi kanan halaman */}
                <div className="d-flex flex-column flex-grow-1">
                    
                    {/* Navbar di atas halaman */}
                    <Navbar className="shadow-sm p-3 bg-light">
                        <Container fluid>
                            {/* Tombol logout yang diletakkan di kanan */}
                            <Navbar.Collapse className="justify-content-end">
                                <Button className="btn-logout text-primary" size="sm" onClick={handleLogout}>Logout</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    
                    {/* Area utama untuk konten halaman */}
                    <main className="flex-grow-1 p-4">
                        {/* Outlet untuk merender komponen anak sesuai dengan rute */}
                        {children}
                    </main>
                    
                    {/* Footer di bawah halaman */}
                    <footer className="text-center mt-auto p-3">
                        <div>&copy; Syneps Academy</div>
                    </footer>
                </div>
            </div>
        </>
    );
}

// Ekspor komponen DefaultLayout agar bisa digunakan di tempat lain
export default DefaultLayout;
