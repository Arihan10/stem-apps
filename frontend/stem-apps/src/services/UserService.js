import http from "./http-common";

class UserService 
{
    async SignUp(user)
    {
        console.log(user)
        http.post("api/v1/applications/signup", user)
        .then(function (response)
        {
            console.log(response);
        })
        .catch(function (error) 
        {
            console.log(error.response);
        })
        .finally(function () {

        });
    }

    async Verify(user)
    {
        try {
            console.log(user); 
            const response = await http.post("api/v1/applications/login", user); 
            // console.log(response); 
            return response.data
        } catch(error) 
        {
            console.log(error.response);
        }
    }

    async GetUserById(id) {
        try {
            console.log(id); 
            const response = await http.get("api/v1/applications/id/"+id); 
            console.log(response); 
            return response;
        } catch(error) 
        {
            console.log(error.response);
        }
    }

    async GetUserByEmail(email) {
        try {
            console.log(email); 
            const response = await http.get("api/v1/applications/email/"+encodeURIComponent(email)); 
            console.log(response); 
            return response;
        } catch(error) 
        {
            console.log(error.response);
        }
    }
}

const userService = new UserService(); 
export default userService