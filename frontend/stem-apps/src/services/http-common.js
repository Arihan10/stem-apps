import axios from "axios"; 

export default axios.create({
    baseURL: "http://stem-apps.onrender.com/", 
    headers: {
        "Content-Type": "application/json"
    }
})