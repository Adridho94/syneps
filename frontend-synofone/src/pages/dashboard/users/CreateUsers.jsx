import { Form, Button, Card } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import Api from "../../../routes/Api.jsx";
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const CreateUsers = () => {

    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const navigate = useNavigate();
    // function untuk menghandle perubahan di form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // function untuk menghandle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Api.post('/user', users);
            console.log(response.data);
            navigate('/admin/users');
        } catch (error) {
            console.error(error);
            console.log(error.response.data.status)
        }
    };


    return (
        <DefaultLayout>
            <Card className="animated fadeInDown p-3">
                <h1 style={{ marginBottom: "10px" }}>New Users</h1>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Masukkan Nama"
                        name="name"
                        value={users.name}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Masukkan Email" 
                        name="email"
                        value={users.email}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" placeholder="Masukkan password"
                        name="password"
                        value={users.password}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="password_confirmation">Password Confirmation</Form.Label>
                        <Form.Control type="password" placeholder="Masukkan password konfirmasi" 
                        name="password_confirmation"
                        value={users.password_confirmation}
                        onChange={handleChange}
                        />
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