import API from "./api";


export const getProducts = async()=>{

    const token = localStorage.getItem("token");

    const response = await API.get("/products",{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    return response.data;

};



export const createProduct = async(data)=>{

    const token = localStorage.getItem("token");


    const response = await API.post("/products",data,{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};




export const deleteProduct = async(id)=>{

    const token = localStorage.getItem("token");


    const response = await API.delete(`/products/${id}`,{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};