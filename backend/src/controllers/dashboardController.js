const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Invoice = require("../models/Invoice");



exports.getDashboard = async(req,res)=>{

try{


const totalCustomers = await Customer.countDocuments();


const totalProducts = await Product.countDocuments();


const totalOrders = await Order.countDocuments();



// Paid revenue

const revenueData = await Invoice.aggregate([

{
$match:{
status:"Paid"
}
},

{
$group:{
_id:null,
revenue:{
$sum:"$amount"
}
}
}

]);





const paidInvoices = await Invoice.countDocuments({

status:"Paid"

});




const unpaidInvoices = await Invoice.countDocuments({

status:"Unpaid"

});





const lowStockProducts = await Product.countDocuments({

stockQuantity:{
$lte:5
}

});






res.json({

success:true,

dashboard:{


totalCustomers,

totalProducts,

totalOrders,


totalRevenue:
revenueData.length
?
revenueData[0].revenue
:
0,


paidInvoices,


unpaidInvoices,


lowStockProducts


}


});





}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};