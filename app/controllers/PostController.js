const Post = require('../models/Post');
const User = require('../models/User');

const PostController = {
    create: async (req, res) => {
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body });
                res.status(200).json('The post has been updated');
            } else {
                res.status(403).json('You can update only your post');
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    delete: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.deleteOne();
                res.status(200).json('The post has been deleted');
            } else {
                res.status(403).json('You can delete only your post');
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    like: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json('The post has been liked');
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json('The post has been disliked');
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    get: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            post ? res.status(200).json(post) : res.status(404).send('Post not found');
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getTimeline: async (req, res) => {
        try {
            const currentUser = await User.findById(req.params.userId);
            const userPosts = await Post.find({ userId: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId });
                }),
            );
            res.status(200).json(userPosts.concat(...friendPosts));
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = PostController;
