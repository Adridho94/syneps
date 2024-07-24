import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

const DaftarPage = () => {
    return (
        <>
            <div id="daftar">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col lg={6}>
                            <h1>Buat Akun</h1>
                            <p>Buat akun untuk mulai belanja.</p>

                            <Form action="/login">
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label for="nama">Nama Lengkap</Form.Label>
                                        <Form.Control type="text" name="nama-lengkap" placeholder="Masukkan Nama Lengkap" required />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label for="telp">Nomor Telepon</Form.Label>
                                        <Form.Control type="text" name="telpon" placeholder="Masukkan Nomor Telepon" required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label for="email">Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Masukkan Email" required />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label for="password">Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Masukkan Password" required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <Form.Label for="alamat">Alamat</Form.Label>
                                        <Form.Control as="textarea" name="alamat" id="alamat" rows={5} placeholder="Masukkan Alamat"></Form.Control>
                                    </Col>
                                </Row>

                                <Button type="submit" className="btn btn-primary mt-5">Buat Akun</Button>
                            </Form>

                            <p className="mt-5">Sudah punya akun? <Link to="/login">Masuk</Link></p>
                        </Col>

                        <Col lg={6}>
                            <img src="/src/assets/image 5.png" width="100%" alt="" />
                        </Col>
                    </Row>
                </Container>
            </div>

            <FooterComponent/>
        </>
    );
}

export default DaftarPage;