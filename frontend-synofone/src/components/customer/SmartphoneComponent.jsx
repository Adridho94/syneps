// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

import { Container, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import Api from "../../routes/Api";
import { useEffect, useState } from "react";
const SmartphoneComponent = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await Api.get("/products");
            setProducts(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            <Container className="mt-5">
                <Row className="mb-3">
                    <Col>
                        <h5>Smartphone Lainnya</h5>
                    </Col>
                </Row>
                <Row>
                    {products.map((product, index) => (
                        <Col lg={3} className="d-none d-lg-block" key={product.id || index}>
                            <Card>
                                <img src={product.image} alt={product.title} />
                                <Card.Body>
                                    <Link className="card-text" to="/detail/1">{product.title}</Link>
                                    <h5>{product.price_harga}</h5>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}


                </Row>

                {/* mobile view */}
                <Row className="d-lg-none">
                    <Swiper
                        // install Swiper modules
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={50}
                        slidesPerView={2}

                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={product.id || index}>
                                <Col lg={3}>
                                    <Card>
                                        <img src={product.image} alt="" />
                                        <Card.Body>
                                            <Link className="card-text" to="/detail/1">{product.title}</Link>
                                            <h5>{product.price_rupiah}</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </Row>
            </Container>
        </>
    );
}

export default SmartphoneComponent;