import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getInvoices,
    createInvoice,
    updateInvoice
} from "../services/invoiceService";

import { getOrders } from "../services/orderService";


function Invoices(){

    const [invoices,setInvoices] = useState([]);

    const [orders,setOrders] = useState([]);


    const [form,setForm] = useState({

        orderId:"",
        dueDate:""

    });



    const loadData = async()=>{

        try{

            const invoiceData = await getInvoices();

            const orderData = await getOrders();


            setInvoices(invoiceData.invoices || []);

            setOrders(orderData.orders || []);


        }catch(error){

            toast.error("Invoice data load failed");

        }

    };



    useEffect(()=>{

        loadData();

    },[]);





    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };





    const handleCreate = async(e)=>{

        e.preventDefault();


        try{


            const selectedOrder = orders.find(
                order=>order._id === form.orderId
            );


            if(!selectedOrder){

                toast.error("Select Order");

                return;

            }




            const invoiceData={

                orderId:selectedOrder._id,

                amount:selectedOrder.totalAmount,

                dueDate:form.dueDate

            };



            await createInvoice(invoiceData);



            toast.success("Invoice Created");


            setForm({

                orderId:"",
                dueDate:""

            });



            loadData();



        }catch(error){

            toast.error(
                error.response?.data?.message ||
                "Invoice create failed"
            );

        }

    };






    const markPaid = async(id)=>{

        try{


            await updateInvoice(id,{

                status:"Paid"

            });


            toast.success("Invoice Paid");


            loadData();



        }catch(error){

            toast.error("Update failed");

        }

    };






    return(

        <div className="page">


            <h1>
                Invoices
            </h1>




            <form
            className="customer-form"
            onSubmit={handleCreate}
            >


                <select

                name="orderId"

                value={form.orderId}

                onChange={handleChange}

                required

                >


                    <option value="">
                        Select Order
                    </option>



                    {
                        orders.map(order=>(

                            <option
                            key={order._id}
                            value={order._id}
                            >

                                {order.orderNumber}
                                {" - ₹"}
                                {order.totalAmount}

                            </option>

                        ))
                    }


                </select>





                <input

                type="date"

                name="dueDate"

                value={form.dueDate}

                onChange={handleChange}

                required

                />





                <button>

                    Create Invoice

                </button>


            </form>







            <div className="customer-list">


            {

                invoices.map(invoice=>(


                    <div

                    className="customer-card"

                    key={invoice._id}

                    >



                        <h3>

                            {invoice.invoiceNumber}

                        </h3>




                        <p>

                            Amount: ₹{invoice.amount}

                        </p>



                        <p>

                            Status: {invoice.status}

                        </p>




                        <p>

                            Due:
                            {" "}
                            {
                                new Date(
                                    invoice.dueDate
                                ).toLocaleDateString()
                            }

                        </p>





                        {

                            invoice.status === "Unpaid" &&

                            <button

                            onClick={()=>
                                markPaid(invoice._id)
                            }

                            >

                                Mark Paid

                            </button>

                        }



                    </div>


                ))

            }


            </div>



        </div>

    );

}


export default Invoices;