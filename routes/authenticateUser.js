var jwt = require('jsonwebtoken');
const config  = require('config');

exports.user = function (req, res, next) {
    const { headers: { authorization } } = req;

	if (authorization) {
		prepareDecodedData({ authorization })
			.then((payload) => {
                console.log("auth", payload)
				if (payload) {
                    let body;
                    if (req.method === 'GET') {
                        body = Object.assign({}, req.query, payload);
                        req.query = body;
                    } else {
                        body = Object.assign({}, req.body, payload)
                        req.body = body;
                    }
                    return next();
                }
			}).catch(() => res.status(401).send({ code: 401, message: 'Token might be invalid or has been expired', error: 'Token Invalid.' }));
	} else {
		res.status(400).send({ code: 400, message: 'Malformed Request', error: 'Missing Headers' });
	}
  };

  const prepareDecodedData = ({ authorization }) => new Promise(async (resolve, reject) => {
	jwt.verify(authorization, config.get('secretString'), (err, decoded) => {
        if (err) {
            return undefined;
        } if (decoded.exp) {
            const {
                data: {
                 email:email, user_id:user_id, userType
                },
            } = decoded;
            return resolve({
                 user_id:user_id, email:email, userType
            });
        }
        return undefined;
    });
	reject();
});