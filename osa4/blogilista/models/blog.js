const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, unique: true },
    likes: { type: Number, default: 0 }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (doc, response) => {
        response.id = response._id.toString()
        delete response._id
        delete response._v
    }
})

module.exports = mongoose.model('Blog', blogSchema)