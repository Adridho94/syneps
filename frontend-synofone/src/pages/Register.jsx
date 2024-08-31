import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Register = () => {
    return (
        <>
            <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-100">
                    <Col xs={8} md={4} lg={3} className="mx-auto">
                        <Form className="p-4 border rounded shadow-sm">
                            <h1 className="text-center mb-4">Register</h1>

                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Email Address" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button className="w-100 mb-3" size="sm" type="submit">
                                Register
                            </Button>

                            <p className="text-center">Already registered?
                                <Link to="/login" style={{ textDecoration: "none", color: "#007bff" }}>
                                    Sign In
                                </Link>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Register;
