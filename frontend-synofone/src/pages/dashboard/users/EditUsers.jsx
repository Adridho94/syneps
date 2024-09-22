import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import { useState, useEffect } from "react";
import Api from "../../../routes/Api";
import { useParams, useNavigate } from "react-router-dom";
const EditUsers = () => {
    const [user, setUser] = useState({
        password: '',
        password_confirmation: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await Api.get(`/user/${id}`);
            setUser(response.data.data);
            console.log(response.data.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(user);
            const response = await Api.post(`/user/${id}`, user);
            console.log(response);
            navigate('/admin/users');
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    return (
        <DefaultLayout>
            <Card className="animated fadeInDown p-3">
                <h1 style={{ marginBottom: "10px" }}>Edit Users</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama"
                            name="name"
                            value={user.name || ''}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Masukkan Email"
                            name="email"
                            value={user.email || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Masukkan Password"
                            name="password"
                            value={user.password || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="password_confirmation">Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Input Password confirmation"
                            name="password_confirmation"
                            value={user.password_confirmation || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="role">Role</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name="role"
                            onChange={handleChange}
                        >
                            <option>Pilih Role User</option>
                            <option value="0" >User</option>
                            <option value="1" >Admin</option>
                        </Form.Select>
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