const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Invoice = require("../models/Invoice");


// Create Order
exports.createOrder = async (req,res)=>{

try{

const {customerId,items}=req.body;


if(!items || items.length===0){

return res.status(400).json({
success:false,
message:"Items are required"
});

}


const customer = await Customer.findById(customerId);


if(!customer){

return res.status(404).json({
success:false,
message:"Customer not found"
});

}


let orderItems=[];
let totalAmount=0;



for(const item of items){


const product=await Product.findById(item.productId);



if(!product){

return res.status(404).json({
success:false,
message:"Product not found"
});

}



if(product.stockQuantity < item.quantity){

return res.status(400).json({
success:false,
message:"Stock not available"
});

}



let subtotal=product.price * item.quantity;


orderItems.push({

productId:product._id,

productName:product.name,

price:product.price,

quantity:item.quantity,

subtotal

});


totalAmount += subtotal;



product.stockQuantity -= item.quantity;

await product.save();



}



const order = await Order.create({

orderNumber:"ORD"+Date.now(),

customerId,

items:orderItems,

totalAmount,

status:"Pending"

});



res.status(201).json({

success:true,

message:"Order created successfully",

order

});



}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};





// Get Orders

exports.getOrders=async(req,res)=>{

try{


const orders=await Order.find()

.populate("customerId","name phone")

.sort({createdAt:-1});


res.json({

success:true,

count:orders.length,

orders

});


}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};






// Get Single Order

exports.getOrder=async(req,res)=>{

try{


const order=await Order.findById(req.params.id)

.populate("customerId","name phone");


res.json({

success:true,

order

});


}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};








// Update Order Status

exports.updateOrder=async(req,res)=>{

try{


const {status}=req.body;


const order=await Order.findById(req.params.id);



if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}



if(status==="Cancelled" && order.status!=="Cancelled"){



for(const item of order.items){


const product=await Product.findById(item.productId);


if(product){

product.stockQuantity += item.quantity;

await product.save();

}

}


}





order.status=status;


await order.save();





// Paid hone par invoice bhi paid

if(status==="Completed"){


const invoice=await Invoice.findOne({

orderId:order._id

});


if(invoice){

invoice.status="Paid";

await invoice.save();

}


}





res.json({

success:true,

message:"Order status updated",

order

});




}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};