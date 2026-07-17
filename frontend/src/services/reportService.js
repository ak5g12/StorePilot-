import API from "./api";


export const getReport = async()=>{

    const token = localStorage.getItem("token");


    const response = await API.get("/dashboard/",{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });


    return response.data;

};