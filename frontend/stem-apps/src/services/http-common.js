import axios from "axios"; 

export default axios.create({
    baseURL: "https://stem-apps.onrender.com/", 
    headers: {
        "Content-Type": "application/json"
    }
})