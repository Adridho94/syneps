import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";

const CreateUsers = () => {
    return (
        <DefaultLayout>
            <Card className="animated fadeInDown p-3">
                <h1 style={{ marginBottom: "10px" }}>New Users</h1>
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
                    <Button type="submit" className="btn-primary" size="sm">
                        Save
                    </Button>
                </Form>
            </Card>
        </DefaultLayout>
    )
}

export default CreateUsers