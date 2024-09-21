import { Form, Button, Card, Row, Col } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import { useState } from 'react';
import Api from "../../../routes/Api.jsx";
import { useNavigate } from 'react-router-dom';


const CreateProduct = () => {

  const navigate =useNavigate();

  const [products, setProducts] = useState({
    image: null, // field image sesuai dengan field di database
    title: '',
    spesification: '',
    price: '',
    qty: '',
    warna: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleImageChange = (e) => {
    setProducts(prevState => ({
      ...prevState,
      image: e.target.files[0] // ambil file pertama dari input file, ganti image dengan gambar
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', products.image);
    formData.append('title', products.title);
    formData.append('spesification', products.spesification);
    formData.append('qty', products.qty);
    formData.append('price', products.price);
    formData.append('warna', products.warna);

    try {
      const response = await Api.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  };





  return (
    <DefaultLayout>
      <Card className="animated fadeInDown p-3">
        <h1 style={{ marginBottom: "10px" }}>New Product </h1>
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
          <Form.Group className="mb-2">
            <Form.Label htmlFor="title" >Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Title di sini"
              style={{ paddingBottom: "30px" }}
              name="title"
              value={products.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="specification">Specification</Form.Label>
            <Row>
              <Col md={6}>
                <Form.Control
                  as="textarea"
                  type="text"
                  placeholder="spesification"
                  name="spesification"
                  value={products.spesification || ""}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan Price"
              name="price"
              value={products.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="qty">Qty</Form.Label>
            <Form.Control 
            type="number" 
            placeholder="Masukkan Qty" 
            name="qty"
            value={products.qty}
            onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="warna">Warna</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Masukkan Warna"
            name="warna"
            value={products.warna}
            onChange={handleChange}
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

export default CreateProduct;
