import { Button, Container, Row, Col, Form } from "react-bootstrap";
import FooterComponent from "../../components/customer/FooterComponent";
import NavComponent from "../../components/customer/NavComponent";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import Api from '../../routes/Api';
import Swal from 'sweetalert2';

const StatusPage = () => {
    const params = useParams();
    const navigateTo = useNavigate();
    const [order, setOrder] = useState({});
    const [totalBelanja, setTotalBelanja] = useState(0);
    const [deadline, setDeadline] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');
    const [file, setFile] = useState(null);
    const timerRef = useRef(null);

    // Fetch order data once when the component mounts
    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await Api.get('/order-status/' + params.id);
                const orderData = response.data.data[0];
                console.log(response.data);
                if (response.data.data[0].status_pembayaran === 1){
                    navigateTo('/finish');
                }
                setOrder(orderData);
                setTotalBelanja(orderData.total_pembayaran);

                // Set payment deadline to 24 hours after created_at
                const createdAt = new Date(orderData.created_at);
                const deadlineDate = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
                setDeadline(deadlineDate);
            } catch (error) {
                console.log('Error fetching order:', error);
            }
        };

        getOrder();
    }, [params.id]);

    // Start countdown timer only if deadline is available
    useEffect(() => {
        if (deadline) {
            timerRef.current = setInterval(() => {
                const now = new Date();
                const diff = deadline - now;

                if (diff <= 0) {
                    setTimeLeft("Waktu pembayaran telah berakhir");
                    clearInterval(timerRef.current);
                } else {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    setTimeLeft(`${hours} jam ${minutes} menit ${seconds} detik`);
                }
            }, 1000);

            // Cleanup interval when component unmounts
            return () => clearInterval(timerRef.current);
        }
    }, [deadline]);

    // Handle file upload
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilih File',
                text: 'Silakan pilih file untuk diunggah.',
            });
            return;
        }

        const formData = new FormData();
        formData.append("bukti_pembayaran", file);

        try {
            const response = await Api.post("/upload-pembayaran/" + order.id, formData);

            // Log the response to the console
            console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Bukti pembayaran berhasil diunggah.',
            }).then(() => {
                navigateTo('/finish');
            });
        } catch (error) {
            console.log('Error uploading file:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Gagal mengunggah bukti pembayaran. Silakan coba lagi.',
            });
        }
    };

    return (
        <>
            <NavComponent />
            <div id="bayar">
                <Container className="mt-5">
                    <Row>
                        <Col lg={7}>
                            <h6>Pembayaran</h6>
                            <p>Silahkan melakukan pembayaran dan upload bukti bayar sebelum {deadline ? deadline.toLocaleString('id-ID') : '-'}</p>
                            <p>Waktu tersisa: {timeLeft}</p>
                            <p>Total Pembayaran: Rp {totalBelanja}</p>
                            <p>Bank BCA : No Rekening 0123345678</p>

                            {/* Upload Bukti Bayar */}
                            <h6>Upload Bukti Bayar</h6>
                            <div className="upload">
                                <Form onSubmit={handleUpload}>
                                    <Form.Control type="file" name="bukti" onChange={handleFileChange} />
                                    <Button type="submit" variant="primary" className="w-100 mt-3">Upload Bukti Bayar</Button>
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
