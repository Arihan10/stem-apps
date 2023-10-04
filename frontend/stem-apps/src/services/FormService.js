import http from "./http-common";

class FormService 
{
    async Submit(data)
    {
        console.log(data)
        http.post("api/v1/responses", data)
        .then(function (response)
        {
            console.log(response);
        })
        .catch(function (error) 
        {
            console.log(error);
        })
        .finally(function () {

        });
    }
}

const formService = new FormService();
export default formService