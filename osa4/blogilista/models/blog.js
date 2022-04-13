const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, unique: true },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments : {type: Array, default: [] }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (doc, response) => {
        response.id = response._id.toString()
        delete response._id
        delete response.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)