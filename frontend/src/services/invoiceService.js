import API from "./api";


export const getInvoices = async()=>{

    const token = localStorage.getItem("token");

    const response = await API.get("/invoices",{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};




export const createInvoice = async(data)=>{

    const token = localStorage.getItem("token");


    const response = await API.post("/invoices",data,{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};




export const updateInvoice = async(id,data)=>{

    const token = localStorage.getItem("token");


    const response = await API.put(`/invoices/${id}`,data,{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};