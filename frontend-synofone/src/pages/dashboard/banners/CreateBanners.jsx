import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";

const CreateBanners = () => {
  return (
    <DefaultLayout>
      <Card className="animated fadeInDown p-3">
        <h1 style={{ marginBottom: "10px" }}>New Banners</h1>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control type="file" placeholder="Image" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="keterangan">Keterangan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Keterangan"
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

export default CreateBanners;
