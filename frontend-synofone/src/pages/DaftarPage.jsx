import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterComponent from "../components/customer/FooterComponent";
import Api from "../routes/Api";
import { useState } from "react";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';
const DaftarPage = () => {
    const [user, setUser] = useState({});
    const navigate=useNavigate();
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(user);
            const response = await Api.post('/user', user);
            console.log(response.data);
            navigate('/login');
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Akun berhasil dibuat. Silahkan login.'
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div id="daftar">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col lg={6}>
                            <h1>Buat Akun</h1>
                            <p>Buat akun untuk mulai belanja.</p>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="nama">Nama Lengkap</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Masukkan Nama"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="telp">Nomor Telepon</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Masukkan Nomor Telepon"
                                            name="contact"
                                            value={user.contact}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Masukkan Email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="password">Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Masukkan Password" 
                                        value={user.password}
                                        onChange={handleChange}
                                        
                                        required />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Label htmlFor="password_confirmation">Password</Form.Label>
                                        <Form.Control type="password" name="password_confirmation" placeholder="Masukkan Password Konfirmasi" 
                                        value={user.password_confirmation}
                                        onChange={handleChange}
                                        required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <Form.Label htmlFor="alamat">Alamat</Form.Label>
                                        <Form.Control as="textarea" name="alamat" id="alamat" rows={5} placeholder="Masukkan Alamat"
                                            value={user.alamat || ''}
                                            onChange={handleChange}

                                        ></Form.Control>
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

            <FooterComponent />
        </>
    );
}

export default DaftarPage;