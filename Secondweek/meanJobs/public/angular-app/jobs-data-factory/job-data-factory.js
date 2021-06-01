angular.module("meanJobs").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http){
    return{
        getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        addOneJob: postJob,
        editOneJob:editOneJob,
        deleteOneJob: deleteJob,
        registerUser:registerUser,
        login: login,
        searchJob: searchJob
    };

    function getAllJobs(){
        return $http.get("/api/jobs").then(complete).catch(failed);
    }

    function getOneJob(id){
        return $http.get("/api/jobs/"+id).then(complete).catch(failed);
    }
    function postJob(job){
        return $http.post("/api/jobs/", job).then(complete).catch(failed);
    }

    function editOneJob(jobId){
        return $http.put("/api/jobs/"+jobId).then(complete).catch(failed);
    }

    function deleteJob(jobId){
        return $http.delete("/api/jobs/"+jobId).then(complete).catch(failed);
    }
    function registerUser(user){
        return $http.post("/api/users/register", user).then(complete).catch(failed);
    }

    function login(user){
        return $http.post("/api/users/login", user).then(complete).catch(failed);
    }

    function searchJob(searchString){
        return $http.patch("/api/jobs?jobTitle="+searchString).then(complete).catch(failed);
    }



    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}