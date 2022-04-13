const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    var blogs = await Blog.find({}).populate({
        path: 'user',
        select: 'username name _id'
    })
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!request.token || !request.userId) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(request.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id.toString()
    })

    var result = await blog.save()

    user.blogs = user.blogs.concat(result._id.toString())

    await User.findByIdAndUpdate(
        { _id: user._id.toString() }, 
        { $push: { blogs: result._id.toString() } });

    response.json(result)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const body = request.body

    if (!request.token || !request.userId) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(request.userId)

    if (!user.username) {
        return response.status(401).json({ error: 'no authorization' })
    } else {

    const comments = { comments: blog.comments.length > 0 ? blog.comments.concat(body.comment) : [body.comment.toString()] }

    var result = await Blog.findByIdAndUpdate({_id: blog._id.toString()}, comments, { new: true }).populate({
        path: 'user',
        select: 'username name _id'
    })
    response.json(result)
    }
})

blogsRouter.put('/:id/likes', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    var result = await Blog.findByIdAndUpdate({_id: blog._id.toString()}, { likes: blog.likes + 1 }, { new: true }).populate({
        path: 'user',
        select: 'username name _id'
    })
    response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if ( !( blog.user.toString() === request.userId ) ) {
        return response.status(401).send({ error: 'user is unauthorized' })
    }

    await Blog.findOneAndRemove({_id: blog._id.toString()})
    response.status(204).end()
})

module.exports = blogsRouter