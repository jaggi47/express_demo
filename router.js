const express = require('express');
const router = express.Router({ caseSensitive: true });
const authenticate = require('./routes/authenticateUser')
const userController    = require('./controller/user');
const jobsController    = require('./controller/jobs');

router.post('/user/signUp', userController.signUp);
router.post('/user/login', userController.login);

router.post('/jobs/create', authenticate.user, jobsController.create);
router.post('/jobs/list', authenticate.user, jobsController.list);
router.post('/jobs/apply', authenticate.user, jobsController.apply);
router.post('/jobs/applications', authenticate.user, jobsController.applications);



module.exports = router;

