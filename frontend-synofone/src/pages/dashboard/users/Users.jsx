import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import { useEffect, useState } from "react";
import Api from "../../../routes/Api";
import Swal from "sweetalert2";
const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await Api.get('/users');
            setUsers(response.data.data);
            console.log(response.data.data);
        }
        catch (error) {
            console.error(error);
        }
    };

    const deleteUser = (id) => {
        return async () => {
            try {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const response = await Api.delete(`/user/${id}`);
                        console.log(response.data);
                        getUsers();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                }
                )
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between alig-items-center mb-3 mt-2">
                <h1>Users</h1>
                <Link to="/admin/users/new">
                    <Button className="mt-3" size="sm">
                        Add New
                    </Button>
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <Table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{
                                    item.role === 1 ? 'Admin' : 'User'
                                }</td>
                                <td>
                                    <Link to={"/admin/users/" + item.id}>
                                        <Button className="btn-warning text-white me-2" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button onClick={deleteUser(item.id)} className="btn-danger" size="sm">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </DefaultLayout>
    )
}

export default Users