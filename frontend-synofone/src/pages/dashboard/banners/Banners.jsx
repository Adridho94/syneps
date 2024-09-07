import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import DefaultLayout from "../../../components/dashboard/DefaultLayout"
// ini untuk memanggil configurasi axios
import Api from '../../../routes/Api.jsx'
import { useState, useEffect } from 'react'


const Banners = () => {

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const getBanner = async () => {
            try {
                const response  = await Api.get('/banners');
                console.log(response.data.data)
                setBanners(response.data.data)
            } catch (error){
                console.error(error)
            }
        };
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
                        {banners.map((item,index)=>(
                        <tr key={item.id || index}>
                            <td>
                                {index+1}</td>
                            <td>
                                <img src={item.image} alt="" width="50" />
                                </td>
                            <td>{item.keterangan}</td>
                            <td>
                                <Link to={"/admin/banners/"+item.id}>
                                    <Button className="btn-warning text-white me-2" size="sm">Edit</Button>
                                </Link>
                                <Button className="btn-danger" size="sm">Delete</Button>
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