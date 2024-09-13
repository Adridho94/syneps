import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import Api from "../../../routes/Api.jsx";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBrands = () => {
    const [brands, setBrands] = useState({
        gambar: null, // ubah field image menjadi gambar
        keterangan: '',
        title: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrands(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setBrands(prevState => ({
            ...prevState,
            gambar: e.target.files[0] // ambil file pertama dari input file, ganti image dengan gambar
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('gambar', brands.gambar); // ubah image menjadi gambar
        formData.append('keterangan', brands.keterangan);
        formData.append('title', brands.title);

        try {
            const response = await Api.post('/brand', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            navigate('/admin/brands');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DefaultLayout>
            <Card className="animated fadeInDown p-3">
                <h1 style={{ marginBottom: "10px" }}>New Brands</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="gambar">Gambar</Form.Label> {/* Ubah label menjadi Gambar */}
                        <Form.Control
                            type="file"
                            name="gambar" // Ubah name menjadi gambar
                            onChange={handleImageChange} // handle perubahan file
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Masukkan Judul"
                            value={brands.title}
                            onChange={handleChange} // handle perubahan teks untuk title
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="keterangan">Keterangan</Form.Label>
                        <Form.Control
                            type="text"
                            name="keterangan"
                            placeholder="Masukkan Keterangan"
                            value={brands.keterangan}
                            onChange={handleChange} // handle perubahan teks untuk keterangan
                            style={{ paddingBottom: "50px" }}
                        />
                    </Form.Group>
                    <Button type="submit" className="btn-primary" size="sm">
                        Save
                    </Button>
                </Form>
            </Card>
        </DefaultLayout>
    );
};

export default CreateBrands;
