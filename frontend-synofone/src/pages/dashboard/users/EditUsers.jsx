import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";

const EditUsers = () => {
    return (
        <DefaultLayout>
            <Card className="animated fadeInDown p-3">
                <h1 style={{ marginBottom: "10px" }}>Edit Users</h1>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control type="text" placeholder="Masukkan Nama" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" placeholder="Masukkan Email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="role">Role</Form.Label>
                        <Form.Control type="text" placeholder="Masukkan Role" />
                    </Form.Group>
                    <Button type="submit" className="btn-primary me-2" size="sm">
                        Save
                    </Button>
                    <Button className="btn-danger" size="sm">
                        Close
                    </Button>
                </Form>
            </Card>
        </DefaultLayout>
    )
}

export default EditUsers