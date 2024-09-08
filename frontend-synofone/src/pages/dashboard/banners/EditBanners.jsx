import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Api from '../../../routes/Api.jsx';

const EditBanners = () => {
  const [banner, setBanner] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();  // Destructure id from useParams

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await Api.get(`/banner/${id}`);
        console.log(response.data);
        setBanner(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBanner();
  }, [id]);  // Use id as dependency

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", banner.image);
    formData.append("keterangan", banner.keterangan);

    try {
      const response = await Api.post(`/banner/${id}`, formData);  // Change to POST
      console.log(response.data);
      navigate("/admin/banners");  // Redirect after success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <Card className="animated fadeInDown p-3">
        <h1 style={{ marginBottom: "10px" }}>Edit Banners</h1>
        {/* Image preview fallback */}
        {banner.image && (
          <img
            src={typeof banner.image === 'string' ? banner.image : URL.createObjectURL(banner.image)}
            alt="Banner preview"
            width={500}
          />
        )}
        <Form onSubmit={handleUpdate}>  {/* Add onSubmit */}
          <Form.Group className="mb-2">
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Image"
              name="image"
              id="image"
              onChange={(e) => setBanner({ ...banner, image: e.target.files[0] })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="keterangan">Keterangan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Keterangan"
              style={{ paddingBottom: "50px" }}
              value={banner.keterangan || ""}
              onChange={(e) => setBanner({ ...banner, keterangan: e.target.value })}
            />
          </Form.Group>
          <Button type="submit" className="btn-primary me-2" size="sm">
            Save
          </Button>
          <Button className="btn-danger" size="sm" onClick={() => navigate("/admin/banners")}>
            Close
          </Button>
        </Form>
      </Card>
    </DefaultLayout>
  );
};

export default EditBanners;
