import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Api from '../../../routes/Api.jsx';

const EditBrands = () => {
  const [brand, setBrand] = useState({
    gambar: null, // Inisialisasi gambar dengan null
    keterangan: '', // Inisialisasi dengan string kosong
    title: '' // Inisialisasi dengan string kosong
  });
  
  const navigate = useNavigate();
  const { id } = useParams(); // Mendapatkan ID brand dari URL

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await Api.get(`/brand/${id}`);
        setBrand({
          gambar: response.data.data.gambar || null, // Pastikan gambar tidak undefined
          keterangan: response.data.data.keterangan || '', // Pastikan keterangan tidak undefined
          title: response.data.data.title || '' // Pastikan title tidak undefined
        });
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchBrand();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setBrand(prevState => ({
      ...prevState,
      gambar: e.target.files[0] // Handle perubahan file gambar
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('gambar', brand.gambar); // Tambahkan gambar ke FormData
    formData.append('keterangan', brand.keterangan); // Tambahkan keterangan
    formData.append('title', brand.title); // Tambahkan title

    try {
      const response = await Api.post(`/brand/${id}`, formData); // Kirim data ke API
      console.log(response.data
    );
      navigate('/admin/brand'); // Redirect ke halaman brand setelah update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <Card className="animated fadeInDown p-3">
        <h1 style={{ marginBottom: "10px" }}>Edit Brands</h1>
        
        {/* Pratinjau gambar jika ada */}
        {brand.gambar && (
          <img
            src={typeof brand.gambar === 'string' ? brand.gambar : URL.createObjectURL(brand.gambar)} 
            alt="brandpreview" 
            width={500}
          />
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="gambar">Gambar</Form.Label>
            <Form.Control
              type="file"
              name="gambar"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Masukkan Judul"
              value={brand.title || ''} // Pastikan title selalu memiliki value
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="keterangan">Keterangan</Form.Label>
            <Form.Control
              type="text"
              name="keterangan"
              placeholder="Masukkan Keterangan"
              value={brand.keterangan || ''} // Pastikan keterangan selalu memiliki value
              onChange={handleChange}
              style={{ paddingBottom: "50px" }}
            />
          </Form.Group>
          <Button type="submit" className="btn-primary me-2" size="sm">
            Save
          </Button>
          <Button onClick={() => navigate('/admin/brand')} className="btn-danger" size="sm">
            Close
          </Button>
        </Form>
      </Card>
    </DefaultLayout>
  );
};

export default EditBrands;
