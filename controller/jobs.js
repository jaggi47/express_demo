const jobService  = require('../services/jobs');
const { USER_TYPE }  = require('../constants')

exports.create = create;
exports.list = list;
exports.apply = apply;
exports.applications = applications;

async function create(req, res) {
    try {
        const payload = req.body

        if (!payload.title || !payload.description || !payload.type || !payload.address) {
            throw new Error("Missing Required feilds");
        }
        
        await jobService.create({ title: payload.title, description: payload.description, created_by: payload.user_id, address: payload.address, type: payload.type})

        return res.status(200).send({
            message: "Added new Job"
          });
    
    }  catch (error) {
        res.status(400).send({ message: error.message});
      }
} 

async function list(req, res) {
    try {
        const payload = req.body
        
        const list = await jobService.list({ user_id: payload.user_id})

        return res.status(200).send({
            message: "Success",
            data: list
          });
    
    }  catch (error) {
        res.status(400).send({ message: error.message});
      }
} 

async function apply(req, res) {
    try {
        const payload = req.body
        if (!payload.job_id) {
            throw new Error("Missing Required feilds");
        }
        const [info] = await jobService.getInfo({ user_id: payload.user_id, job_id: payload.job_id})
        if (info) {
            throw new Error("You already applied for this job");
        }

        await jobService.insertApplication({ user_id: payload.user_id, job_id: payload.job_id})

        return res.status(200).send({
            message: "Job application submitted",
            data: list
          });
    
    }  catch (error) {
        res.status(400).send({ message: error.message});
      }
} 



async function applications(req, res) {
    try {
        const payload = req.body

        const list = await jobService.getApplication({ user_id: payload.user_id })

        return res.status(200).send({
            message: "Job application submitted",
            data: list
          });
    
    }  catch (error) {
        res.status(400).send({ message: error.message});
      }
} 