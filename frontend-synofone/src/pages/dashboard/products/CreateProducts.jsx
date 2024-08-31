import { Form, Button, Card, Row, Col } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";

const CreateProduct = () => {
  return (
    <DefaultLayout>
      <Card className="animated fadeInDown p-3">
        <h1 style={{ marginBottom: "10px" }}>New Product</h1>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control type="file" placeholder="Image" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Title" style={{ paddingBottom: "30px" }} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="specification">Specification</Form.Label>
            <Row>
              <Col md={3}>
                <Form.Control type="text" placeholder="Chip" className="mb-2" />
              </Col>
              <Col md={2}>
                <Form.Control type="text" placeholder="Cpu" className="mb-2" />
              </Col>
              <Col md={2}>
                <Form.Control type="text" placeholder="Gpu" className="mb-2" />
              </Col>
              <Col md={2}>
                <Form.Control type="number" placeholder="Ukuran Layar" className="mb-2" />
              </Col>
              <Col md={3}>
                <Form.Control type="text" placeholder="Jenis Layar" className="mb-2" />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control type="number" placeholder="Masukkan Price" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="qty">Qty</Form.Label>
            <Form.Control type="number" placeholder="Masukkan Qty" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="warna">Warna</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Warna" />
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
