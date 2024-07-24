import { Row, Container, Col } from "react-bootstrap";

const BrandComponent = () => {
    return (
        <>
            <Container>
                <div className="brand mt-5">
                    {/* Desktop View */}
                    <Row>
                        <Col lg={2} className="d-none d-lg-block">
                            <img src="/src/assets/ic-samsung.png" alt="" />
                        </Col>

                        <Col lg={2} className="d-none d-lg-block">
                            <img src="/src/assets/ic-xiaomi.png" alt="" />
                        </Col>

                        <Col lg={2} className="d-none d-lg-block">
                            <img src="/src/assets/ic-apple.png" alt="" />
                        </Col>

                        <Col lg={2} className="d-none d-lg-block">
                            <img src="/src/assets/ic-realme.png" alt="" />
                        </Col>

                        <Col lg={2} className="d-none d-lg-block">
                            <img src="/src/assets/ic-oppo.png" alt="" />
                        </Col>

                        <Col lg={2} className="d-none d-lg-block">
                            <img src="/src/assets/ic-vivo.png" alt="" />
                        </Col>
                    </Row>
                    {/* Mobile View */}
                    <div className="mobile-brand d-block d-lg-none">
                        <Row>
                            <Col lg={2} xs={4}>
                                <img src="/src/assets/ic-samsung.png" alt="" />
                            </Col>

                            <Col lg={2} xs={4}>
                                <img src="/src/assets/ic-xiaomi.png" alt="" />
                            </Col>

                            <Col lg={2} xs={4}>
                                <img src="/src/assets/ic-apple.png" alt="" />
                            </Col>

                            <Col lg={2} xs={4}>
                                <img src="/src/assets/ic-realme.png" alt="" />
                            </Col>

                            <Col lg={2} xs={4}>
                                <img src="/src/assets/ic-oppo.png" alt="" />
                            </Col>

                            <Col lg={2} xs={4}>
                                <img src="/src/assets/ic-vivo.png" alt="" />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default BrandComponent;