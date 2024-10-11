import FooterComponent from "../../components/customer/FooterComponent";
import NavbarComponent from "../../components/customer/NavbarComponent";
import UnggulanComponent from "../../components/customer/UnggulanComponent";

import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Api from "../../routes/Api";
const DetailPage = () => {
    const [jumlah, setJumlah] = useState(1);
    const [product, setProduct] = useState({});

    const { id } = useParams();
    const handleJumlahChange = (event) => {
        // ubah nilai jumlah saat input berubah
        setJumlah(parseInt(event.target.value));
    };
    const getProduct = async () => {
        try {
            const response = await Api.get(`/product/${id}`);
            setProduct(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    // const data = product.spesification  || '';
    // const formattedData = data.split('\n').map((line, index) => (
    //     <React.Fragment key={index}>
    //         {line}
    //         <br />
    //     </React.Fragment>
    // ));
    useEffect(() => {
        getProduct();
    }, [id]);

    return (
        <>
            <NavbarComponent />
            <div id="detail">
                <Container className="mt-5">
                    <Row>

                        <Col lg={5}>
                            <Card>
                                <img src={product.image} alt="" />
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <div className="deskripsi">
                                <h4>{product.title}</h4>
                                <br />
                                <div className="spec">
                                    <h6>Spesifikasi :</h6>
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {product.spesification}
                                    </div>
                                </div>
                                <br />
                                <div className="colors">
                                    <h6>Pilihan Warna :</h6>
                                    <div className="color-options mt-3">
                                        <button className="btn me-2">{product.warna}</button>
                                        {/* <button className="btn me-2">Grey</button>
                                        <button className="btn me-2">Red</button>
                                        <button className="btn me-2">Purple</button> */}
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
                                    <Col lg={2}>
                                        <h6><span className="text-danger">Stok: </span>{product.qty}</h6>
                                    </Col>
                                    <Col lg={8}>
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