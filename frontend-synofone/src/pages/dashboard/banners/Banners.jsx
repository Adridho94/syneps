import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import DefaultLayout from "../../../components/dashboard/DefaultLayout"

const Banners = () => {
    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between alig-items-center mb-3 mt-2">
                <h1>Banners</h1>
                <Link to="/admin/banners/new">
                    <Button className="mt-3" size="sm">Add New</Button>
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <Table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Keterangan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                            <td>Loading...</td>
                            <td>Loading...</td>
                            <td>
                                <Link to="/admin/banners/:id">
                                    <Button className="btn-warning text-white me-2" size="sm">Edit</Button>
                                </Link>
                                <Button className="btn-danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </DefaultLayout>
    )
}

export default Banners