import { create } from "apisauce";

const apiClient = create({
    baseURL: "https://radbackend.onrender.com/",
});
export default apiClient;
