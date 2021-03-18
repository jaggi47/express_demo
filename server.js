'use_strict';
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require("passport");
const Joi = require('joi');
let app = express();
const user = express();
app.use('/user', user);

app.use(express.json())
app.use(passport.initialize());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(customRequestLogger.create());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, app_version, device_type, access_token,app_secret_key, auth_token, Authorization");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
  next();
});
app.set('port', 3000);
httpServer = http.createServer(app);
httpServer.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

// all api's




mongoose.connect("mongodb+srv://admin:TSJPef6VhZEXYCh@cluster0.awiqx.mongodb.net/Schools", {
	useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB.'))
  .catch( err => console.log("error in connection", err))

  const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    password: String,
  })


  const User = mongoose.model('User', userSchema)

  const vehicleSchema = new mongoose.Schema({
    userEmail: String,
    name: String,
    number: String,
  })


  const Vehicle = mongoose.model('Vehicle', vehicleSchema)

app.post('/api/signup', async (req,res) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
  
    })
    const validation = schema.validate(req.body);
  
    if (validation.error) {
      let errorReason =
        validation.error.details !== undefined
          ? validation.error.details[0].message
          : 'Parameter missing or parameter type is wrong';
          res.status(400).send({ message: errorReason})
          return false;
    }
  
    const userObject = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const test = await userObject.save();
    res.status(200).send({ message: "Signup successfully"})
  } catch (err) {
    if (err.code === 11000) {
        res.status(400).send({ message: "Duplicate data"})
    }
      res.sendStatus(400)
}
})


app.post('/api/addVehicle', async (req,res) => {
  try {
    const schema = Joi.object().keys({
      userEmail: Joi.string().required(),
      name: Joi.string().required(),
      number: Joi.string().required(),
  
    })
    const validation = schema.validate(req.body);
  
    if (validation.error) {
      let errorReason =
        validation.error.details !== undefined
          ? validation.error.details[0].message
          : 'Parameter missing or parameter type is wrong';
          res.status(400).send({ message: errorReason})
          return false;
    }
  
    const userExists = await User.findOne({ email: req.body.userEmail });
		if (!userExists) {
      res.status(400).send({ message: "User not found"})
		}
    const vehicleObject = new Vehicle({
      userEmail: req.body.userEmail,
      name: req.body.name,
      number: req.body.number,
    });
    await vehicleObject.save();
    res.status(200).send({ message: "Vehocle added successfully"})
  } catch (err) {
      res.sendStatus(400)
}
})


app.get('/api/myVehicle', async (req,res) => {
  try {
    const schema = Joi.object().keys({
      userEmail: Joi.string().required(),
  
    })
    const validation = schema.validate(req.query);
  
    if (validation.error) {
      let errorReason =
        validation.error.details !== undefined
          ? validation.error.details[0].message
          : 'Parameter missing or parameter type is wrong';
          res.status(400).send({ message: errorReason})
          return false;
    }
  
    const userExists = await User.findOne({ email: req.query.userEmail });
		if (!userExists) {
      res.status(400).send({ message: "User not found"})
    }
    const vehicles = await Vehicle.find({ userEmail: req.query.userEmail });

    res.status(200).send({ message: "Vehicle added successfully", data: vehicles })
  } catch (err) {
      res.sendStatus(400)
}
})

  // async function getCourses() {
  //   const courses = await Course.find()
  //   .or([{  author: 'Sarah'}, { isPublished: true }])
  //   .limit(10)
  //   .sort({ name: 1})
  //   .select({ name: 1, tags: 1});
  //   console.log(courses)
  // }
  // getCourses()









  // async function createCourse() {
  //   const course = new Course({
  //     name: 'Mongo Course',
  //     author: 'Sarah',
  //     tags: ['node', 'backend'],
  //     isPublished: true
  //   })
  
  //   const result = await course.save();
  //   console.log(result);
  // }
  // createCourse();








// user.get('/', function (req,res)  {
//   console.log(user.mountpath)
//   res.send('User homepage')
// })






// app.get('/api/courses/:id', (req, res) => {
//   const course = courses.find( c=> c.id === parseInt(req.params.id))

//   console.log(course)
//   if (!course) {
//     res.send(404).send("Course not found")
//   } else {
//     res.send(course)
//   }
// })



