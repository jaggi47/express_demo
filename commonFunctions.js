const bcrypt = require('bcryptjs')
const hash = {
	generate: ({ text, iterations = 10 }) => new Promise((resolve, reject) => {
		bcrypt.hash(text, iterations, (err, hash) => {
			return err ? reject(err) : resolve(hash.toString());
		});
	}),
	compare: ({ hash, text }) => new Promise((resolve, reject) => {
		bcrypt.compare(text, hash, (err, compare) => {
			return err ? reject(err) : resolve(compare);
		});
	}),
};

exports.hash = hash;