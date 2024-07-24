import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavComponent from '../components/NavComponent';
import FooterComponent from '../components/FooterComponent';

const OrderPage = () => {
    const [jumlah, setJumlah] = useState(1);
    const [metodePembayaran, setMetodePembayaran] = useState('');
    const [metodePengiriman, setMetodePengiriman] = useState('');

    const hargaProduk = 500000; // Harga produk per unit

    // Event handler untuk mengubah nilai jumlah
    const handleJumlahChange = (event) => {
        const newJumlah = parseInt(event.target.value);
        setJumlah(newJumlah);
    };

    // Event handler untuk mengubah metode pembayaran
    const handleMetodePembayaranChange = (event) => {
        const selectedMetode = event.target.value;
        setMetodePembayaran(selectedMetode);
    };

    // Event handler untuk mengubah metode pengiriman
    const handleMetodePengirimanChange = (event) => {
        const selectedMetode = event.target.value;
        setMetodePengiriman(selectedMetode);
    };

    // Menghitung total belanja berdasarkan jumlah dan metode pengiriman
    const calculateTotalBelanja = () => {
        const hargaPengiriman = metodePengiriman === 'reguler' ? 20000 : metodePengiriman === 'ekspres' ? 50000 : 0;
        const totalHarga = hargaProduk * jumlah + hargaPengiriman;
        return totalHarga;
    };

    return (
        <>
            <NavComponent />
            <Container className="mt-3">
                <Row>
                    <Col lg={6}>
                        <div className="produk mt-5">
                            <Card className="mb-3">
                                <Card.Body>
                                    <Row>
                                        <Col lg={4}>
                                            <Card.Img src="/src/assets/hp3.png" width="100%" alt="" />
                                        </Col>
                                        <Col lg={8}>
                                            <h5>Iphone 15 Pro Max</h5>
                                            <Form>
                                                <Form.Label>Jumlah :</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="jumlah"
                                                    value={jumlah}
                                                    onChange={handleJumlahChange}
                                                    min={1}
                                                />
                                            </Form>
                                            <label htmlFor="harga">Harga</label>
                                            <h5>IDR {(hargaProduk * jumlah).toLocaleString()}</h5>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="info-buyer">
                            <Form>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control as="textarea" name="alamat" placeholder="Masukkan Alamat" rows={5} />
                            </Form>

                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Metode Pengiriman</Form.Label>
                                <Form.Select name="pengiriman" onChange={handleMetodePengirimanChange}>
                                    <option value="">-- Pilih Satu --</option>
                                    <option value="reguler">Reguler | IDR 20.000</option>
                                    <option value="ekspres">Ekspres | IDR 50.000</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Metode Pembayaran</Form.Label>
                                <Form.Select name="bayar" onChange={handleMetodePembayaranChange}>
                                    <option value="">-- Pilih Satu --</option>
                                    <option value="bank">Transfer Bank</option>
                                    <option value="gopay">Gopay</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Tampilan Bank */}
                            {metodePembayaran === 'bank' && (
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
                            {metodePembayaran === 'gopay' && (
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
                            <p>Ongkos Kirim ({metodePengiriman}): <b>IDR {metodePengiriman === 'reguler' ? '20,000' : metodePengiriman === 'ekspres' ? '50,000' : '0'}</b></p>
                            <hr />
                            <p>Total Belanja: <b>IDR {calculateTotalBelanja().toLocaleString()}</b></p>
                        </div>

                        <Link to="/status" className="btn btn-primary w-100 mt-3">
                            Konfirmasi
                        </Link>
                    </Col>
                </Row>
            </Container>

            <FooterComponent />
        </>
    );
};

export default OrderPage;
