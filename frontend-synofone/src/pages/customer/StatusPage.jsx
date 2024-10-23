import { Button, Container, Row, Col, Form } from "react-bootstrap";
import FooterComponent from "../../components/customer/FooterComponent";
import NavComponent from "../../components/customer/NavComponent";
import { useParams,useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import Api from '../../routes/Api';
const StatusPage = () => {
    const params = useParams();
    const navigateTo = useNavigate();
    const [order, setOrder] = useState({});
    const [totalBelanja, setTotalBelanja] = useState(0);

    const getOrder = async () => {
        try {
            const response = await Api.get('/order/' + params.id);
            setOrder(response.data.data);
            console.log(response);
            console.log('Order:', response.data.data);
        } catch (error) {
            console.log('Error fetching order:', error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);
    return (
        <>
            <NavComponent />
            <div id="bayar">
                <Container className="mt-5">
                    <Row>
                        <Col lg={7}>
                            <h6>Pembayaran</h6>
                            <p>Silahkan melakukan pembayaran dan upload bukti bayar sebelum 20 Maret 2022 pukul 23.00 .</p>
                            <p>Bank BCA : No Rekening 0123345678</p>
                            {/* upload bukti */}
                            <h6>Upload Bukti Bayar</h6>
                            <div className="upload">
                                <Form action="/finish">
                                    <Form.Control type="file" name="bukti" />
                                    <Button type="submit" variant="primary" className=" w-100 mt-3">Upload Bukti Bayar</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default StatusPage;