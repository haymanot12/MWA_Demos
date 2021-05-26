angular.module("meanJobs").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http){
    return{
        getAllJobs: getAllJobs,
        getOneJob: getOneJob
    };

    function getAllJobs(){
        return $http.get("/api/jobs").then(complete).catch(failed);
    }

    function getOneJob(id){
        return $http.get("/api/jobs/"+id).then(complete).catch(failed);
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}