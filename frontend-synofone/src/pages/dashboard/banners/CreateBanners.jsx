import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import Api from "../../../routes/Api.jsx";
import { useState } from 'react'
const CreateBanners = () => {

  // penampung data
  const [image, setImage] = useState(null);
  const [keterangan, setKeterangan] = useState("ini keterangan");

  // function input data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("keterangan", keterangan);
    console.log(formData);
    try {
      const response = await Api.post("/banner", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <DefaultLayout>
      <Card className="animated fadeInDown p-3">
        <h1 style={{ marginBottom: "10px" }}>New Banners</h1>
        <Form>
            {/* <input type="password" className="form-control" placeholder="input di sini " /> */}
          <Form.Group className="mb-2">
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control type="file" placeholder="Image"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="keterangan">Keterangan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Keterangan"
              style={{ paddingBottom: "50px" }}
              name="keterangan"
              id="keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="btn-primary" size="sm" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </Card>
    </DefaultLayout>
  );
};

export default CreateBanners;
