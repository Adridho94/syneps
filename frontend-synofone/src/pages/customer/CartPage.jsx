import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavComponent from '../../components/customer/NavbarComponent';
import Api from '../../routes/Api';
import Swal from 'sweetalert2';
const CartPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang akan dihapus
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();

    const filteredItems = orderItems.filter(item => item.status === 3);
    const filteredOrder = orderItems.filter(item => item.status !== 3);
    // const filteredOrder2 = orderItems.filter(item => item.status === 1);

    const formatRupiah = (angka) => {
        const number_string = angka.toString().replace(/[^,\d]/g, '');
        const split = number_string.split(',');
        const sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        return rupiah;
    };


    const checkChart = async () => {
        try {
            const response = await Api.get('/checkCart');
            setOrderItems(response.data.data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const getCartItems = async () => {
        try {
            const response = await Api.get('/cartitem');
            setCartItems(response.data.data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };



    const handleRemoveItem = (itemId) => {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        try {
            const response = Api.delete(`/cartitem/${itemId}`);
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Item berhasil dihapus',
                showConfirmButton: false,
                timer: 1500
            });
        }
        catch (error) {
            console.error(error);
        }
        setCartItems(updatedItems);
        setShowModal(false);
    };

    const handleJumlahChange = (event, itemId) => {
        const newQuantity = parseInt(event.target.value);
        const updatedItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, qty: newQuantity };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    };

    const calculateTotalBelanja = () => {
        const total = cartItems.reduce((accumulator, item) => {
            return accumulator + (item.product.price * item.qty); // Menghitung total harga
        }, 0);

        return formatRupiah(total); // Memformat total setelah perhitungan selesai
    };

    const handleCheckout = async () => {
        try {
            const payload = {
                items: cartItems.map(item => ({
                    product_id: item.product.id,  // Kirim ID produk
                    qty: item.qty                 // Kirim kuantitas yang dipilih
                }))
            };

            // Kirim data checkout ke backend
            const response = await Api.post('/checkout', payload);
            console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Pesanan berhasil dibuat',
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/order/' + response.data.data);

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal melakukan checkout',
                text: error.response ? error.response.data.message : 'Terjadi kesalahan',
            });
        }



    };

    useEffect(() => {
        getCartItems();
        checkChart();
    }, []);

    return (
        <>
            <NavComponent />
            <div id="cart">
                <Container className="mt-5">
                    {cartItems.length === 0 ?
                        (
                            <Row>
                                <Col lg={6} md={6}>
                                    <h1 className='fs-2'>Keranjang masih kosong :(</h1>
                                </Col>
                                <Col lg={6} md={6}>
                                    <Row className='text-center'>
                                        <div className='fs-3 fw-bold text-decoration-underline'>Daftar Transaksi</div>
                                    </Row>
                                    <Row>
                                        <Tabs
                                            defaultActiveKey="order"
                                            id="uncontrolled-tab-example"
                                            className="mb-3"
                                        >

                                            <Tab eventKey="order" title="Order">
                                                {filteredOrder.length > 0 ? (
                                                    filteredOrder.map(item => (
                                                        <div key={item.id}>
                                                            <p className='fw-bold fs-5'>Status:
                                                                {
                                                                    item.status == 1 ? <Link to={`/order/${item.id}`} className='btn btn-warning m-2'>Selesaikan Order </Link> :
                                                                        <Link to={`/status/${item.id}`} className='btn btn-danger m-2'>Konfirmasi Pembayaran</Link>
                                                                }


                                                            </p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Data tidak ada</p>
                                                )}
                                            </Tab>
                                            <Tab eventKey="selesai" title="Selesai" >
                                                {filteredItems.length > 0 ? (
                                                    filteredItems.map(item => (
                                                        <div key={item.id}>
                                                            <p className='fw-bold fs-5'>Status:
                                                                <Link to={`/status/${item.id}`} className='btn btn-success m-2'>Selesai</Link>
                                                            </p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Data tidak ada</p>
                                                )}
                                            </Tab>
                                        </Tabs>
                                    </Row>
                                </Col>
                            </Row>
                        ) : (
                            <Row>
                                <Col lg={7}>
                                    {cartItems.map(item => (
                                        <Card key={item.id} className="mb-3">
                                            <Row>
                                                <Col md={4}>
                                                    <img
                                                        src={item.product.image}
                                                        width="100%"
                                                        alt={item.product.title}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Card.Body>
                                                        <Row>
                                                            <Col lg={6}>
                                                                <Link to={`/detail/${item.id}`} className="card-title">{item.product.title}</Link>
                                                                <Form>
                                                                    <Form.Label>Jumlah :</Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        name="jumlah"
                                                                        min={1}
                                                                        value={item.qty || 1}
                                                                        onChange={(e) => handleJumlahChange(e, item.id)}
                                                                    />
                                                                </Form>
                                                                <p className="mt-2">Harga :</p>
                                                                <h5>IDR {formatRupiah(item.product.price * item.qty)}</h5>
                                                            </Col>
                                                            <Col className="text-end">
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() => { setShowModal(true); setSelectedItem(item.id); }}
                                                                >
                                                                    Hapus
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))}
                                </Col>
                                <Col lg={5}>
                                    <div className="ringkasan">
                                        <Card>
                                            <h5>Ringkasan Belanja</h5>
                                            <p><b>Total Item</b> : {calculateTotalItems()}</p>
                                            <p><b>Total Belanja</b> : IDR {calculateTotalBelanja()}</p>
                                            <Button onClick={handleCheckout} className="btn btn-primary w-100">Check Out</Button>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                        )}

                    {/* Modal Hapus Item */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Body className="text-center">
                            <h4 className="mb-3">Yakin Ingin Hapus Item?</h4>
                            <Button variant="secondary me-2" onClick={() => setShowModal(false)}>
                                Batal
                            </Button>
                            <Button variant="danger" onClick={() => handleRemoveItem(selectedItem)}>
                                Yakin
                            </Button>
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
        </>
    );
};

export default CartPage;
