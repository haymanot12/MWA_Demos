angular.module("meanJobs").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http){
    return{
        getAllJobs: getAllJobs,
        getOneJobs: getOneJobs,
        addOneJobs: postJob,
        updateOneJob:updateOneJob,
        deleteOneJob: deleteJob
    };

    function getAllJobs(){
        return $http.get("/api/jobs").then(complete).catch(failed);
    }

    function getOneJobs(id){
        return $http.get("/api/jobs/"+id).then(complete).catch(failed);
    }
    function postJob(job){
        return $http.post("/api/jobs/", job).then(complete).catch(failed);
    }
    function updateOneJob(id,job){
        return $http.put("/api/jobs/"+id, job).then(complete).catch(failed);
    }

    function deleteJob(jobId){
        return $http.delete("/api/jobs/"+jobId).then(complete).catch(failed);
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        console.log("failed eror")
        return error.status.statusText;
    }
}