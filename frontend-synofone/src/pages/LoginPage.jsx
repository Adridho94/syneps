import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

const LoginPage = () => {
    return (
        <>
            <div id="login">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col lg={6}>
                            <h1>Masuk</h1>
                            <p>Masuk untuk melanjutkan pembelian</p>

                            <Form action="/cart">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Masukkan Email" required />
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Masukkan Password" required />
                                <Link to="/login" className="d-flex justify-content-end mt-3">Lupa Password?</Link>

                                <Button type="submit" variant="primary" className="mt-5" >Masuk</Button>
                            </Form>

                            <p className="mt-5">Belum punya akun? <Link to="/daftar">Daftar</Link></p>
                        </Col>
                        
                        <Col lg={6}>
                            <img src="/src/assets/image 4.png" width="100%" alt="" />
                        </Col>
                    </Row>
                </Container>
            </div>

            <FooterComponent/>
        </>
    );
}

export default LoginPage;