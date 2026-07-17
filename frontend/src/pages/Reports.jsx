import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getReport } from "../services/reportService";


function Reports(){

    const [report,setReport] = useState(null);
    const [loading,setLoading] = useState(true);



    const loadReport = async()=>{

        try{

            const data = await getReport();

            console.log("REPORT DATA:", data);


            setReport(
                data.dashboard || data.report
            );


        }catch(error){

            console.log(
                "REPORT ERROR:",
                error.response?.data || error.message
            );


            toast.error(
                error.response?.data?.message ||
                "Report load failed"
            );


        }finally{

            setLoading(false);

        }

    };




    useEffect(()=>{

        loadReport();

    },[]);





    if(loading){

        return(

            <div className="page">

                <h2>
                    Loading...
                </h2>

            </div>

        );

    }




    if(!report){

        return(

            <div className="page">

                <h2>
                    Report Data Not Found
                </h2>

            </div>

        );

    }





    return(

        <div className="page">


            <h1>
                Reports
            </h1>



            <div className="customer-list">



                <div className="customer-card">

                    <h3>
                        Total Revenue
                    </h3>

                    <p>
                        ₹{report.totalRevenue || 0}
                    </p>

                </div>





                <div className="customer-card">

                    <h3>
                        Total Customers
                    </h3>

                    <p>
                        {report.totalCustomers || 0}
                    </p>

                </div>





                <div className="customer-card">

                    <h3>
                        Total Products
                    </h3>

                    <p>
                        {report.totalProducts || 0}
                    </p>

                </div>





                <div className="customer-card">

                    <h3>
                        Total Orders
                    </h3>

                    <p>
                        {report.totalOrders || 0}
                    </p>

                </div>





                <div className="customer-card">

                    <h3>
                        Paid Invoices
                    </h3>

                    <p>
                        {report.paidInvoices || 0}
                    </p>

                </div>





                <div className="customer-card">

                    <h3>
                        Unpaid Invoices
                    </h3>

                    <p>
                        {report.unpaidInvoices || 0}
                    </p>

                </div>





                <div className="customer-card">

                    <h3>
                        Low Stock Products
                    </h3>

                    <p>
                        {report.lowStockProducts || 0}
                    </p>

                </div>



            </div>


        </div>

    );

}


export default Reports;