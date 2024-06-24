const BadRequest = require("../common/errors/BadRequestError");
const NotAuthorizedError = require("../common/errors/NotAuthorizedError");
const NotFoundError = require("../common/errors/NotFoundError");
const postModel = require("../models/post.model");
const BadRequestError = require("../common/errors/BadRequestError");

const createPost = async (req, res) => {

    const { title, content, summary } = req.body;

    // Validations
    if (!title) throw new BadRequest("Title is Required");//json.errors[0].message || 'Something went wrong' (for Frontend)
    if (!content) throw new BadRequest("Content is Required");
    if (!summary) throw new BadRequest("Summary is Required");

    const checkTitle = await postModel.findOne({ title: title });
    if (checkTitle) throw new BadRequest("This Title is  already exists");

    let newPost;

    if (req.file) {

        newPost = await postModel.create({
            userId: req.user._id,
            title: title,
            content: content,
            summary: summary,
            image: req.file.path
        });

    } else {

        throw new BadRequest("Image of type PNG and jpd are Required to create a Blog!")
    }

    if (!newPost) throw new NotFoundError("Post Not Found");

    res.status(200).json({
        status: "Success",
        message: "Post Created Successfully",
        post: newPost
    })

}

const GetAllPosts = async (req, res) => {

    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filters = {
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.title && { title: { $regex: req.query.title, $options: 'i' } }),
        ...(req.query.summary && { summary: { $regex: req.query.summary, $options: 'i' } }),
        ...(req.query.content && { content: { $regex: req.query.content, $options: 'i' } })
    }

    const posts = await postModel.find(filters).populate("comments").populate("userId").skip(startIndex).limit(limit).sort({createdAt:-1});

    if (!posts) throw new NotFoundError("Posts Not Found");

    const totalPosts = await postModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const pagination = {};
    if (endIndex < totalPosts) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit
        }
    }


    res.status(200).json({
        status: "Success",
        message: "All Posts",
        totalPosts: totalPosts,
        results:posts.length,
        pagination: pagination,
        currentPage: page,
        totalPages: totalPages,
        posts: posts,

    })
}

const GetSinglePost = async (req, res) => {

    const { postId } = req.params;

    const post = await postModel.findById(postId).populate("comments");

    if (!post) throw new NotFoundError("Post Not Found")

    res.status(200).json({
        status: "Success",
        message: "Single Post",
        post: post
    })

}

const updatePost = async (req, res) => {

    const { postId } = req.params;

    if (!postId) {

        throw new BadRequestError("postId is Required for updating the Post");
    }


    const post = await postModel.findById(postId);
    if (!post) throw new NotFoundError("Post Document Not Found")

    const { title, content, summary } = req.body;

    const { modifiedCount } = await postModel.updateOne(
        { _id: postId, userId: req.user._id },
        {
            $set: {
                title: title,
                content: content,
                summary: summary
            }
        }
    );

    if (modifiedCount === 0) {
        throw new NotAuthorizedError();
    }

    res.status(200).json({
        status: "Success",
        message: "Post Updated Successfully",
        post: post
    })


}

const DeletePost = async (req, res) => {

    const { postId } = req.params;
    if (!postId) throw new BadRequestError("postId is Required for Deleting the Post");

    const post = await postModel.findById(postId);

    if (!post) {
        throw new NotFoundError('Document not Found');
    }

    const { deletedCount } = await postModel.deleteOne({ _id: postId, userId: req.user_id });

    if (deletedCount === 0) {
        throw new NotAuthorizedError();
    }

    res.status(200).json({
        status: "Success",
        message: "Post Deleted Successfully",
        post: post
    })

}

module.exports = { createPost, GetAllPosts, GetSinglePost, updatePost, DeletePost };