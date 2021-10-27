const bcrypt = require('bcryptjs')

export const decrypt = (password: string, hash: string) => {
    var value = bcrypt.compareSync(password, hash)
    return value
}

export const encrypt = (value: string) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(value, salt);
    return hash
}
