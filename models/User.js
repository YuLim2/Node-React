const monggose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10


const userSchema = monggose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    Image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) { // 저장 전에 password 암호화
    var user = this;

    if (use.isModified('password')) { // password가 반환될 때만

        bcrypt.genSalt(saltRounds, function(err, salt) { // saltRounds를 사용하여 salt 생성
            if (err) return next(err) // err 시 바로 next

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

const User = monggose.model('User', userSchema) //스키마를 모델로 감싸기

module.exports = { User } //다른 파일에서도 쓸 수 있도록 export; 수출