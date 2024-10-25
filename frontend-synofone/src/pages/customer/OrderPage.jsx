import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavComponent from '../../components/customer/NavComponent';
import FooterComponent from '../../components/customer/FooterComponent';
import Api from '../../routes/Api';
import Swal from 'sweetalert2';
const OrderPage = () => {
    const [jumlah, setJumlah] = useState(1);
    const [orderItems, setOrderItems] = useState([]);
    const [order, setOrder] = useState({
        cart_id: "",
        alamat: '',
        metode_pembayaran: '',
        metode_pengiriman: '',
        total_pembayaran: 0,
    });
    const navigateTo = useNavigate();
    const hargaProduk = orderItems.reduce((total, item) => total + item.product.price * item.qty, 0);
    const params = useParams();
    const order_id = params.id;
    const getOrderItems = async () => {
        try {
            const response = await Api.get('/cartitem-order/' + order_id);
            setOrderItems(response.data.data);
            setOrder({ ...order, cart_id: response.data.data[0].cart_id });
            console.log('Order items:', response.data.data);
        } catch (error) {
            console.log('Error fetching order items:', error);
        }
    };



    // Menghitung total belanja berdasarkan jumlah dan metode pengiriman
    const calculateTotalBelanja = () => {
        const hargaPengiriman = order.metode_pengiriman === 'reguler' ? 20000 : order.metode_pengiriman === 'ekspres' ? 50000 : 0;
        const totalHarga = hargaProduk * jumlah + hargaPengiriman;
        return totalHarga;
    };


    const handleOrder = async () => {
        try {
            const response = await Api.post('/order', {
                ...order,
                total_pembayaran: calculateTotalBelanja(),
            });
            console.log('Order:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Order Berhasil',
                text: 'Pesanan anda berhasil diterima',
            });
            navigateTo('/status/' + response.data.data.id);
        } catch (error) {
            console.log('Error ordering:', error);
            Swal.fire({
                icon: 'error',
                title: 'Order Gagal',
                text: 'Pesanan anda gagal diterima',
            });
        }
    };


    useEffect(() => {
        getOrderItems();
    }, []);
    return (
        <>
            <NavComponent />
            <Container className="mt-3">
                <Row>
                    <Col lg={6}>
                        <div className="produk mt-5">
                            <Card className="mb-3">
                                <Card.Body>
                                    {orderItems.map((item, index) => (
                                        <Row key={item.id || index}>
                                            <Col lg={4}>
                                                <Card.Img src={item.product.image} width="100%" alt="" />
                                            </Col>
                                            <Col lg={8}>
                                                <h5>{item.product.title}</h5>
                                                <Form>
                                                    <Form.Label>Jumlah :</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="jumlah"
                                                        value={item.qty}
                                                        disabled
                                                    />
                                                </Form>
                                                <label htmlFor="harga">Harga</label>
                                                <h5>IDR {(item.product.price * item.qty).toLocaleString()}</h5>
                                            </Col>
                                        </Row>
                                    ))}
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="info-buyer">
                            <Form>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="alamat"
                                    placeholder="Masukkan Alamat"
                                    rows={5}
                                    value={order.alamat}
                                    onChange={(e) => setOrder({ ...order, alamat: e.target.value })}
                                />
                            </Form>

                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Metode Pengiriman</Form.Label>
                                <Form.Select
                                    name="pengiriman"
                                    onChange={(e) => setOrder({ ...order, metode_pengiriman: e.target.value })}

                                >
                                    <option value="">-- Pilih Satu --</option>
                                    <option value="reguler">Reguler | IDR 20.000</option>
                                    <option value="ekspres">Ekspres | IDR 50.000</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Metode Pembayaran</Form.Label>
                                <Form.Select
                                    name="bayar"
                                    onChange={(e) => setOrder({ ...order, metode_pembayaran: e.target.value })}
                                >
                                    <option value="">-- Pilih Satu --</option>
                                    <option value="bank">Transfer Bank</option>
                                    <option value="gopay">Gopay</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Tampilan Bank */}
                            {order.metode_pembayaran === 'bank' && (
                                <Row id="row-bank">
                                    <Col md={3}>
                                        <img src="/src/assets/ic-bca.png" alt="" width="120px" />
                                    </Col>
                                    <Col md={9}>
                                        <p>Bank BCA</p>
                                        <h6>01234567890</h6>
                                        <p>a.n Synofone</p>
                                    </Col>
                                </Row>
                            )}

                            {/* Tampilan Gopay */}
                            {order.metode_pembayaran === 'gopay' && (
                                <Row id="row-gopay">
                                    <Col md={3}>
                                        <img src="/src/assets/ic-gopay.png" alt="" width="120px" />
                                    </Col>
                                    <Col md={9}>
                                        <p>Gopay</p>
                                        <h6>01234567890</h6>
                                        <p>a.n Synofone</p>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="rincian mt-5">
                            <h6>Rincian Pembayaran</h6>
                            <p>Harga Produk: <b>IDR {(hargaProduk * jumlah).toLocaleString()}</b></p>
                            <p>Ongkos Kirim ({order.metode_pengiriman}): <b>IDR {order.metode_pengiriman === 'reguler' ? '20,000' : order.metode_pengiriman === 'ekspres' ? '50,000' : '0'}</b></p>
                            <hr />
                            <p>Total Belanja: <b>IDR {calculateTotalBelanja().toLocaleString()}</b></p>
                        </div>

                        <div
                            onClick={handleOrder}
                            className="btn btn-primary w-100 mt-3"
                        >
                            Konfirmasi
                        </div>
                    </Col>
                </Row>
            </Container>

            <FooterComponent />
        </>
    );
};

export default OrderPage;
