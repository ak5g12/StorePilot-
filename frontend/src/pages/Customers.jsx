import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getCustomers,
    createCustomer,
    deleteCustomer
} from "../services/customerService";


function Customers(){

    const [customers,setCustomers] = useState([]);

    const [form,setForm] = useState({
        name:"",
        phone:"",
        email:"",
        address:""
    });



    const loadCustomers = async()=>{

        try{

            const data = await getCustomers();

            setCustomers(data.customers);


        }catch(error){

            toast.error("Customers load failed");

        }

    };



    useEffect(()=>{

        loadCustomers();

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

            await createCustomer(form);

            toast.success("Customer Added");


            setForm({
                name:"",
                phone:"",
                email:"",
                address:""
            });


            loadCustomers();


        }catch(error){

            toast.error(
                error.response?.data?.message ||
                "Failed"
            );

        }

    };




    const handleDelete=async(id)=>{

        try{

            await deleteCustomer(id);

            toast.success("Deleted");

            loadCustomers();


        }catch(error){

            toast.error("Delete failed");

        }

    };




    return(

        <div className="page">


            <h1>
                Customers
            </h1>



            <form
            className="customer-form"
            onSubmit={handleSubmit}
            >


                <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                />


                <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                />


                <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                />


                <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                />


                <button>
                    Add Customer
                </button>


            </form>





            <div className="customer-list">


            {
                customers.map((customer)=>(


                    <div 
                    className="customer-card"
                    key={customer._id}
                    >


                        <h3>
                            {customer.name}
                        </h3>


                        <p>
                            Phone: {customer.phone}
                        </p>


                        <p>
                            Email: {customer.email}
                        </p>


                        <p>
                            Address: {customer.address}
                        </p>



                        <button
                        onClick={()=>handleDelete(customer._id)}
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


export default Customers;