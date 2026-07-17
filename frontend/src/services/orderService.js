import API from "./api";


export const getOrders = async()=>{

    const token = localStorage.getItem("token");


    const response = await API.get("/orders",{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};





export const createOrder = async(data)=>{

    const token = localStorage.getItem("token");


    const response = await API.post("/orders",data,{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};





export const updateOrder = async(id,data)=>{

    const token = localStorage.getItem("token");


    const response = await API.put(

        `/orders/${id}`,

        data,

        {

            headers:{
                Authorization:`Bearer ${token}`
            }

        }

    );


    return response.data;

};