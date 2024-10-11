import FooterComponent from "../../components/customer/FooterComponent";
import NavbarComponent from "../../components/customer/NavbarComponent";
import UnggulanComponent from "../../components/customer/UnggulanComponent";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Api from "../../routes/Api";
import Cookies from "js-cookie";
import Swal from "sweetalert2"; // Import SweetAlert2

const DetailPage = () => {
    const [jumlah, setJumlah] = useState(1);
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate(); // Untuk redirect

    // Mengubah jumlah produk yang ingin ditambahkan ke keranjang
    const handleJumlahChange = (event) => {
        const value = parseInt(event.target.value);
        setJumlah(value >= 1 ? value : 1); // Pastikan jumlah minimal adalah 1
    };

    // Mengambil data produk dari API berdasarkan ID
    const getProduct = async () => {
        try {
            const response = await Api.get(`/product/${id}`);
            setProduct(response.data.data);
        } catch (error) {
            console.log("Error fetching product data:", error);
        }
    };

    // Fungsi untuk menambahkan produk ke keranjang
    const handleCart = async () => {
        try {
            const response = await Api.post('/cart', {
                product_id: id,
                qty: jumlah,
            });
            console.log("Product added to cart:", response);

            // Tampilkan alert sukses dengan Swal.fire
            Swal.fire({
                title: 'Berhasil!',
                text: 'Produk berhasil ditambahkan ke keranjang.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/cart');  // Redirect ke halaman cart setelah menambahkan
            });

        } catch (error) {
            console.log("Error adding to cart:", error);

            // Tampilkan alert error dengan Swal.fire
            Swal.fire({
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat menambahkan ke keranjang.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi'
            });
        }
    };

    // Mengambil produk ketika komponen pertama kali di-render
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
                                {/* Cek apakah gambar produk tersedia */}
                                {product.image ? (
                                    <img src={product.image} alt={product.title} />
                                ) : (
                                    <p>No Image Available</p>
                                )}
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <div className="deskripsi">
                                <h4>{product.title}</h4>
                                <br />
                                <div className="spec">
                                    <h6>Spesifikasi:</h6>
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {product.spesification}
                                    </div>
                                </div>
                                <br />
                                <div className="colors">
                                    <h6>Pilihan Warna:</h6>
                                    <div className="color-options mt-3">
                                        <button className="btn me-2">{product.warna}</button>
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
                                        <Button onClick={handleCart} className="btn btn-primary w-100">Masukkan Keranjang</Button>
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
