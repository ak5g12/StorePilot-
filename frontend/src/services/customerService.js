import API from "./api";


export const getCustomers = async()=>{

    const token = localStorage.getItem("token");

    const response = await API.get("/customers",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;
};



export const createCustomer = async(data)=>{

    const token = localStorage.getItem("token");

    const response = await API.post("/customers",data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;
};



export const updateCustomer = async(id,data)=>{

    const token = localStorage.getItem("token");

    const response = await API.put(`/customers/${id}`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;
};



export const deleteCustomer = async(id)=>{

    const token = localStorage.getItem("token");

    const response = await API.delete(`/customers/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;
};