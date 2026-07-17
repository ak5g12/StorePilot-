import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProducts,
    createProduct,
    deleteProduct
} from "../services/productService";


function Products(){

    const [products,setProducts] = useState([]);


    const [form,setForm] = useState({
        name:"",
        description:"",
        sku:"",
        price:"",
        stockQuantity:""
    });



    const loadProducts = async()=>{

        try{

            const data = await getProducts();

            setProducts(data.products);


        }catch(error){

            toast.error("Products load failed");

        }

    };



    useEffect(()=>{

        loadProducts();

    },[]);




    const handleChange=(e)=>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    };




    const handleSubmit=async(e)=>{

        e.preventDefault();


        try{


            await createProduct({

                ...form,

                price:Number(form.price),

                stockQuantity:Number(form.stockQuantity)

            });



            toast.success("Product Added");



            setForm({

                name:"",
                description:"",
                sku:"",
                price:"",
                stockQuantity:""

            });



            loadProducts();



        }catch(error){

            toast.error(
                error.response?.data?.message ||
                "Product create failed"
            );

        }

    };




    const handleDelete=async(id)=>{


        try{


            await deleteProduct(id);


            toast.success("Product Deleted");


            loadProducts();



        }catch(error){

            toast.error("Delete failed");

        }

    };





    return(

        <div className="page">


            <h1>
                Products
            </h1>




            <form
            className="customer-form"
            onSubmit={handleSubmit}
            >


                <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
                />



                <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                />



                <input
                name="sku"
                placeholder="SKU"
                value={form.sku}
                onChange={handleChange}
                required
                />



                <input
                name="price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                />



                <input
                name="stockQuantity"
                placeholder="Stock Quantity"
                type="number"
                value={form.stockQuantity}
                onChange={handleChange}
                required
                />



                <button>
                    Add Product
                </button>


            </form>





            <div className="customer-list">


            {
                products.map((product)=>(


                    <div
                    className="customer-card"
                    key={product._id}
                    >


                        <h3>
                            {product.name}
                        </h3>


                        <p>
                            SKU: {product.sku}
                        </p>


                        <p>
                            Price: ₹{product.price}
                        </p>


                        <p>
                            Stock: {product.stockQuantity}
                        </p>


                        <p>
                            {product.description}
                        </p>



                        <button
                        onClick={()=>handleDelete(product._id)}
                        >
                            Delete
                        </button>


                    </div>


                ))
            }


            </div>


        </div>

    )

}


export default Products;