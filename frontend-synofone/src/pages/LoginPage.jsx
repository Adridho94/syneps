import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import FooterComponent from "../components/customer/FooterComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../routes/Api";
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({});

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        await Api.post("/login", {
            'email': email,
            'password': password
        }).then((response) => {
            // console.log(response.data.token);
            Cookies.set("token", response.data.token);
            Cookies.set('role', response.data.role);
            const role = response.data.role;
            if (role === '1') {
            navigate('/admin/dashboard');
            }
            navigate ('/');
        }).catch((error) => {
            setValidation(error.response.data);
        })
    }

    useEffect(()=> {
    if (Cookies.get('token')) {
        return navigate('/admin/dashboard');
    }
}, [0]);

// useEffect(()=>{},[]);
return (
    <>
        <div id="login">
            <Container>
                <Row className="d-flex align-items-center">
                    <Col lg={6}>
                        <h1>Masuk</h1>
                        <p>Masuk untuk melanjutkan pembelian</p>

                        <Form onSubmit={handleLogin}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Masukkan Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {validation.email && (
                                <div className="alert alert-danger mt-2" role="alert">
                                    {validation.email[0]}
                                </div>
                            )}

                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {validation.password && (
                                <div className="alert alert-danger mt-2" role="alert">
                                    {validation.password[0]}
                                </div>
                            )}

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

        <FooterComponent />
    </>
);
}

export default LoginPage;