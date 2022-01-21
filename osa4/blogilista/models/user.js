const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    passwordHash: { type: String, required: true },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (doc, responseData) => {
        responseData.id = responseData._id.toString()
        delete responseData._id
        delete responseData.__v
        delete responseData.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)