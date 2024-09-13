import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import Api from '../../../routes/Api';
import { useState, useEffect } from 'react';
const Brands = () => {
    const [brands, setBrands] = useState([]);
    const getBrands = async () => {
        try {
            const response = await Api.get('/brands');
            setBrands(response.data.data);
            console.log(response.data.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const deleteData = (id) => {
        return async () => {
            try {
                const response = await Api.delete(`/brand/${id}`);
                console.log(response.data);
                getBrands();
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        getBrands();
    }, []);


    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between alig-items-center mb-3 mt-2">
                <h1>Brands</h1>
                <Link to="/admin/brands/new">
                    <Button className="mt-3" size="sm">Add New</Button>
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <Table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Keterangan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((item, index) => (


                            <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={item.gambar} alt="" width="50" />
                                </td>
                                <td>{item.title}</td>
                                <td>{item.keterangan}</td>
                                <td>
                                    <Link to={"/admin/brands/"+item.id}>
                                        <Button className="btn-warning text-white me-2" size="sm">Edit</Button>
                                    </Link>
                                    <Button className="btn-danger" size="sm" onClick={deleteData(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </DefaultLayout>
    )
}

export default Brands