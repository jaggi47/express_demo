const userService  = require('../services/user');
const hashUtility = require('../commonFunctions')
const jwt = require('jsonwebtoken');

exports.signUp = signUp;
exports.login = login;

async function signUp(req, res) {
    try {
        const payload = req.body

        if (!payload.email || !payload.password || !payload.userType) {
            throw new Error("Missing Required feilds");
        }
        var [userInfo] = await userService.getInfo( { email: payload.email } );


             if(!userInfo) {
               await userService.create({ email: payload.email, userType: payload.userType, password: await hashUtility.hash.generate({
                text: payload.password,
              }) });
            } else  {
                throw new Error("You are already registered with us.");
            }
    
        return res.status(200).send({
            message: "User Registered Successfully"
          });
    
    }  catch (error) {
        res.status(400).send({ message: error.message});
      }
} 


async function login(req, res) {
    try {
        const payload = req.body

        if (!payload.email || !payload.password) {
            throw new Error("Missing Required feilds");
        }
        const [userInfo] = await userService.getInfo( { email: payload.email} );

        if (!userInfo) {
            throw new Error("User not found.");
        }

        const passwordMatch = await hashUtility.hash.compare({
            text: payload.password,
            hash: userInfo.password,
        });
        delete userInfo.password;
        if (passwordMatch) {
            return res.status(200).send({
                message: "User Logged In Successfully",
                data: {
                    access_token: jwt.sign({ data: { user_id: userInfo.id, email:userInfo.email, userType: userInfo.userType } , exp: Date.now() }, config.get('secretString')),
                    user_info: userInfo,
              }});
        }
        throw new Error("Password doesn't match.")
    } catch (error) {
        res.status(400).send({ message: error.message});
      }
}; 