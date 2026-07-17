import API from "./api";

export const loginUser = async (data) => {
    const response = await API.post("/auth/login", data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await API.post("/auth/register", data);
    return response.data;
};

export const getCurrentUser = async (token) => {
    const response = await API.get("/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};