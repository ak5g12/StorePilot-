import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { 
    getOrders, 
    createOrder, 
    updateOrder 
} from "../services/orderService";

import {
    getInvoices,
    updateInvoice
} from "../services/invoiceService";

import { getCustomers } from "../services/customerService";
import { getProducts } from "../services/productService";


function Orders(){


const [orders,setOrders]=useState([]);

const [customers,setCustomers]=useState([]);

const [products,setProducts]=useState([]);

const [invoices,setInvoices]=useState([]);



const [form,setForm]=useState({

customerId:"",
productId:"",
quantity:1

});





const loadData=async()=>{

try{


const orderData=await getOrders();

const customerData=await getCustomers();

const productData=await getProducts();

const invoiceData=await getInvoices();



setOrders(orderData.orders || []);

setCustomers(customerData.customers || []);

setProducts(productData.products || []);

setInvoices(invoiceData.invoices || []);



}catch(error){

toast.error("Data load failed");

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








const handleSubmit=async(e)=>{

e.preventDefault();


try{


const product=products.find(

p=>p._id===form.productId

);



if(!product){

toast.error("Select Product");

return;

}



await createOrder({

customerId:form.customerId,

items:[{

productId:product._id,

quantity:Number(form.quantity)

}]

});



toast.success("Order Created");



setForm({

customerId:"",

productId:"",

quantity:1

});


loadData();



}catch(error){

toast.error(

error.response?.data?.message ||

"Order create failed"

);

}


};









const markPaid=async(order)=>{


try{


// update order

await updateOrder(

order._id,

{

status:"Completed"

}

);



// find invoice

const invoice=invoices.find(

inv=>inv.orderId?._id===order._id ||

inv.orderId===order._id

);



if(invoice){

await updateInvoice(

invoice._id,

{

status:"Paid"

}

);

}



toast.success("Payment Completed");


loadData();



}catch(error){

toast.error(

"Payment update failed"

);

}


};









const cancelOrder=async(id)=>{


try{


await updateOrder(

id,

{

status:"Cancelled"

}

);



toast.success(

"Order Cancelled"

);



loadData();



}catch(error){


toast.error(

"Cancel failed"

);


}



};








return(

<div className="page">


<h1>
Orders
</h1>





<form

className="customer-form"

onSubmit={handleSubmit}

>



<select

name="customerId"

value={form.customerId}

onChange={handleChange}

required

>


<option value="">

Select Customer

</option>



{

customers.map(c=>(

<option

key={c._id}

value={c._id}

>

{c.name}

</option>

))

}



</select>








<select

name="productId"

value={form.productId}

onChange={handleChange}

required

>



<option value="">

Select Product

</option>



{

products.map(p=>(


<option

key={p._id}

value={p._id}

>

{p.name}

</option>


))

}



</select>







<input

type="number"

name="quantity"

min="1"

value={form.quantity}

onChange={handleChange}

/>





<button>

Create Order

</button>



</form>









<div className="customer-list">



{

orders.map(order=>(


<div

className="customer-card"

key={order._id}

>


<h3>

{order.orderNumber}

</h3>



<p>

Customer:

{" "}

{order.customerId?.name || "Customer"}

</p>



<p>

Amount:

₹{order.totalAmount}

</p>



<p>

Status:

{" "}

{order.status}

</p>






{

order.status==="Pending" &&

<div>


<button

onClick={()=>markPaid(order)}

>

Mark Paid

</button>



<button

onClick={()=>cancelOrder(order._id)}

>

Cancel Order

</button>



</div>

}






<strong>

Items:

</strong>



{

order.items.map((item,index)=>(


<p key={index}>

{item.productName}

{" - "}

Qty:

{item.quantity}

{" - "}

₹{item.subtotal}


</p>



))

}



</div>


))

}



</div>



</div>

);


}


export default Orders;