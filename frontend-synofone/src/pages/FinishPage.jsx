import { Col, Container, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavComponent from "../components/NavComponent";

const FinishPage = () => {
    return (
        <>
            <NavComponent />
            <div id="finish">
                <Container className="mt-5">
                    <Row className="text-center">
                        <Col>
                            <h1>Selamat ! Pesanan berhasil dibuat!</h1>
                            <img src="/src/assets/img-sukses.png" alt="" width="50%" />
                            <p>Admin kami akan menghubungi anda secara berkala untuk pesanan dan nomor resi pengiriman melalui Whatsapp.</p>
                            <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default FinishPage;