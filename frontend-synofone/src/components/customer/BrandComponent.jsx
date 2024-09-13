import { Row, Container, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
import Api from '../../routes/Api.jsx';
const BrandComponent = () => {
    const [brands, setBrands] = useState([]);

    const getBrands = async () => {
        try {
            const response = await Api.get('/brands');
            setBrands(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);
    return (
        <>
            <Container>
                <div className="brand mt-5">
                    {/* Desktop View */}
                    <Row>
                        {brands.map((brand, index) => (

                            <Col lg={2} className="d-none d-lg-block" key={brand.id || index}>
                                <img src={brand.gambar} alt="" />
                            </Col>
                        ))}

                        {/* <Col lg={2} className="d-none d-lg-block">
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
                        </Col> */}
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