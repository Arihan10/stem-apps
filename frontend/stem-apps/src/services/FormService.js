import http from "./http-common";
import userService from "./UserService";

class FormService 
{
    async FormsSubmittedNumber(_id) {
        try {
            const userInfo = await userService.GetUserById(_id); 
            console.log(userInfo.data); 
            return userInfo.data.applications.length; 
        } catch (error) {
            console.log(error.response); 
        }
    }

    async Submit(data)
    {
        console.log(data)
        /*const userInfo = await userService.GetUserById(data.user_id); 
        console.log(userInfo.data); 
        if (userInfo.data.applications.length > 0) return false;*/

        http.post("api/v1/applications", data)
        .then(function (response)
        {
            console.log(response); 
            // return true; 
        })
        .catch(function (error) 
        {
            console.log(error.response);
        })
        .finally(function () {

        });
    }

    async GetAllApplications() {
        try {
            const response = await http.get("/api/v1/applications"); 
            console.log(response); 
            return response; 
        } catch(error) {
            console.log(error.response); 
        }
    }
}

const formService = new FormService();
export default formService