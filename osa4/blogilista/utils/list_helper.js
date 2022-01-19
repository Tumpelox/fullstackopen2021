const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (likes, blog) => { likes += blog.likes; return likes }, 0 )
}

const mostLikes = (blogs) => {
    return blogs.reduce( (most, blog) => blog.likes > most.likes ? blog : most , blogs[0] )
}

const mostBlogs = (blogs) => {
    var authorList = blogs
        .reduce( (most, blog) => {
        if (Object.keys(most).find(key => key === blog.author)) {
            most[blog.author]  += 1
            return most
        } else {
            most[blog.author] = 1
            return most
        }
        }, {} )

    return Object.keys(authorList).reduce( (most, author) =>
        authorList[author] > most.blogs ?
        { "author": author, "blogs": authorList[author] } :
        most
        , {"author": "", "blogs": 0})
}

const mostLikesAuthor = (blogs) => {
    var authorList = blogs
        .reduce( (likes, blog) => {
        if (Object.keys(likes).find(key => key === blog.author)) {
            likes[blog.author]  += blog.likes
            return likes
        } else {
            likes[blog.author] = blog.likes
            return likes
        }
        }, {} )

    return Object.keys(authorList).reduce( (most, author) => 
        authorList[author] > most.likes ? 
        { "author": author, "likes": authorList[author] } : 
        most
        , {"author": "", "likes": 0})
}

module.exports = { dummy, totalLikes, mostLikes, mostBlogs, mostLikesAuthor }
