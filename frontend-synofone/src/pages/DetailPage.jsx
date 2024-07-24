import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import UnggulanComponent from "../components/UnggulanComponent";

import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const DetailPage = () => {
    const [jumlah, setJumlah] = useState(1);

    const handleJumlahChange = (event) => {
        // ubah nilai jumlah saat input berubah
        setJumlah(parseInt(event.target.value));
    };

    return (
        <>
            <NavbarComponent />
            <div id="detail">
                <Container className="mt-5">
                    <Row>
                        <Col lg={5}>
                            <Card>
                                <img src="/src/assets/hp3.png" alt="" />
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <div className="deskripsi">
                                <h4>Iphone 15 Pro Max</h4>
                                <br />
                                <div className="spec">
                                    <h6>Spesifikasi :</h6>
                                    <ul>
                                        <li>Chip A17 Pro, CPU 6‑core</li>
                                        <li>GPU 6‑core</li>
                                        <li>Layar 6.7 inch</li>
                                        <li>Layar Super Retina XDR</li>
                                    </ul>
                                </div>
                                <br />
                                <div className="colors">
                                    <h6>Pilihan Warna :</h6>
                                    <div className="color-options mt-3">
                                        <button className="btn me-2">Grey</button>
                                        <button className="btn me-2">Red</button>
                                        <button className="btn me-2">Purple</button>
                                    </div>
                                </div>
                                <br />
                                <h6>Jumlah</h6>
                                <Row>
                                    <Col lg={2}>
                                        <Form>
                                            <Form.Control
                                                type="number"
                                                name="jumlah"
                                                value={jumlah}
                                                min={1}
                                                onChange={handleJumlahChange}
                                            />
                                        </Form>
                                    </Col>
                                    <Col lg="10">
                                        <Link to="/login" className="btn btn-primary w-100">Masukkan Keranjang</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <hr className="d-block d-lg-none mt-5" />

            <UnggulanComponent />
            <FooterComponent />

        </>
    );
}

export default DetailPage;