// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

import { Container, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

const UnggulanComponent = () => {
    return (
        <>
            <Container className="unggulan mt-5">
                <Row className="mb-3">
                    <Col>
                        <h5>Smartphone Unggulan</h5>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} className="d-none d-lg-block">
                        <Card>
                            <img src="/src/assets/hp1.png" alt="" />
                            <Card.Body>
                                <Link className="card-text" to="/detail">Xiaomi Redmi Note 13</Link>
                                <h5>IDR 500.000</h5>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} className="d-none d-lg-block">
                        <Card>
                            <img src="/src/assets/hp2.png" alt="" />
                            <Card.Body>
                                <Link className="card-text" to="/detail">Oppo A79 5G</Link>
                                <h5>IDR 500.000</h5>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} className="d-none d-lg-block">
                        <Card>
                            <img src="/src/assets/hp3.png" alt="" />
                            <Card.Body>
                                <Link className="card-text" to="/detail">Iphone 15 Pro Max</Link>
                                <h5>IDR 500.000</h5>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} className="d-none d-lg-block">
                        <Card>
                            <img src="/src/assets/hp4.png" alt="" />
                            <Card.Body>
                                <Link className="card-text" to="/detail">Samsung Galaxy S23 FE</Link>
                                <h5>IDR 500.000</h5>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* mobile view */}
                <Row className="d-lg-none">
                    <Swiper
                        // install Swiper modules
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={50}
                    >
                        <SwiperSlide>
                            <Col lg={3}>
                                <Card>
                                    <img src="/src/assets/hp1.png" alt="" />
                                    <Card.Body>
                                        <Link className="card-text" to="/detail">Xiaomi Redmi Note 13</Link>
                                        <h5>IDR 500.000</h5>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Col lg={3}>
                                <Card>
                                    <img src="/src/assets/hp2.png" alt="" />
                                    <Card.Body>
                                        <Link className="card-text" to="/detail">Oppo A79 5G</Link>
                                        <h5>IDR 500.000</h5>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Col lg={3}>
                                <Card>
                                    <img src="/src/assets/hp3.png" alt="" />
                                    <Card.Body>
                                        <Link className="card-text" to="/detail">Iphone 15 Pro Max</Link>
                                        <h5>IDR 500.000</h5>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Col lg={3}>
                                <Card>
                                    <img src="/src/assets/hp4.png" alt="" />
                                    <Card.Body>
                                        <Link className="card-text" to="/detail">Samsung Galaxy S23 FE</Link>
                                        <h5>IDR 500.000</h5>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </SwiperSlide>
                    </Swiper>
                </Row>
            </Container>
        </>
    );
}

export default UnggulanComponent;