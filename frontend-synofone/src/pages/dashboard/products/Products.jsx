import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import DefaultLayout from "../../../components/dashboard/DefaultLayout";
import Api from "../../../routes/Api";
import { useState, useEffect } from "react";
const Products = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await Api.get('/products');
            setProducts(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between alig-items-center mb-3 mt-2">
                <h1>Products</h1>
                <Link to="/admin/products/new">
                    <Button className="mt-3" size="sm">
                        Add New
                    </Button>
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <Table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Specification</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Warna</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (

                            <tr key={item.id || index}>
                                <td>{index +1}</td>
                                <td>
                                <img src={item.image} alt="" width="50" />
                                </td>
                                <td>{item.title}</td>
                                <td>{item.spesification}</td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.warna}</td>
                                <td>
                                    <Link to={`/admin/products/${item.id}`}>
                                        <Button className="btn-warning text-white me-2" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button className="btn-danger" size="sm">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </DefaultLayout>
    );
};

export default Products;
