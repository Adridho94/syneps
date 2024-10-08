import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import DefaultLayout from "../../../components/dashboard/DefaultLayout"
// ini untuk memanggil configurasi axios
import Api from '../../../routes/Api.jsx'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const Banners = () => {

    const [banners, setBanners] = useState([]);

    function deleteData(id) {
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
                        const response = await Api.delete(`/banner/${id}`);
                        console.log(response.data);
                        getBanner();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                }
                )
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Your file has not been deleted.',
                    'error'
                )
                console.error(error)
            }
        }
    }

    const getBanner = async () => {
        try {
            const response = await Api.get('/banners');
            // console.log(response.data.data)
            setBanners(response.data.data)
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        getBanner();
    }, [0])
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
                            <th>No</th>
                            <th>Image</th>
                            <th>Keterangan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>
                                    {index + 1}</td>
                                <td>
                                    <img src={item.image} alt="" width="50" />
                                </td>
                                <td>{item.keterangan}</td>
                                <td>
                                    <Link to={"/admin/banners/" + item.id}>
                                        <Button className="btn-warning text-white me-2" size="sm">Edit</Button>
                                    </Link>
                                    <Button className="btn-danger" size="sm" onClick={deleteData(item.id)} >Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </DefaultLayout>
    )
}

export default Banners