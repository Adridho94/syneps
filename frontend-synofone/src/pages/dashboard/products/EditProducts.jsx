import { Form, Button, Card, Row, Col, FloatingLabel } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import { useEffect, useState } from "react";
import Api from "../../../routes/Api";
import { useParams, useNavigate } from "react-router-dom";

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [previewImage, setPreviewImage] = useState(null); // State untuk preview image

  const getProduct = async () => {
    try {
      const response = await Api.get(`/product/${id}`);
      setProduct(response.data.data);
      setPreviewImage(response.data.data.image); // Set preview dengan URL gambar dari data produk
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct(prevState => ({
      ...prevState,
      image: file // simpan file gambar di state produk
    }));

    // Set preview dengan URL sementara dari file yang dipilih
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', product.image);
    formData.append('title', product.title);
    formData.append('spesification', product.spesification);
    formData.append('price', product.price);
    formData.append('qty', product.qty);
    formData.append('warna', product.warna);

    try {
      const response = await Api.post(`/product/${id}`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DefaultLayout>
      <Card className="animated fadeInDown p-3">
        <h1 style={{ marginBottom: "10px" }}>Edit Product</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Image"
              name="image"
              onChange={handleImageChange}
            />
          </Form.Group>

          {/* Preview Image */}
          {previewImage && (
            <div className="mb-3">
              <img src={previewImage} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>
          )}

          <Form.Group className="mb-2">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Title"
              name="title"
              value={product.title || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <FloatingLabel controlId="floatingTextarea2" label="Spesifikasi">
              <Form.Control
                as="textarea"
                name="spesification"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                value={product.spesification || ''}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan Price"
              name="price"
              value={product.price || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="qty">Qty</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan Qty"
              name="qty"
              value={product.qty || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="warna">Warna</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Warna"
              name="warna"
              value={product.warna || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" className="btn-primary me-2" size="sm">
            Save
          </Button>
          <Button className="btn-danger" size="sm" onClick={() => navigate('/admin/products')}>Close</Button>
        </Form>
      </Card>
    </DefaultLayout>
  )
}

export default EditProducts;
