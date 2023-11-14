const bcrypt = require("bcryptjs");

class Bcrypt {
    static hash(password) {
        return bcrypt.hashSync(password);
    }

    static compare(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = Bcrypt;
