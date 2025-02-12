import User from '../models/userModel.js';
import Post from '../models/postModel.js';

// Create post
const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

        if (!postedBy || !text) {
            return res.status(400).json({ error: 'postedBy and text are required' });
        }

        const user = await User.findById(postedBy);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized to create post' });
        }

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
        }

        const newPost = new Post({
            postedBy,
            text,
            img,
        });

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in createPost: ', error.message);
    }
};

// Get post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in getPost: ', error.message);
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized to delete post' });
        }

        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in deletePost: ', error.message);
    }
};

// Like Unlike post
const likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likes.includes(req.user._id)) {
            // Unlike post
            await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } });
            res.status(200).json({ message: 'Post unliked successfully' });
        } else {
            // Like post
            await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } });
            res.status(200).json({ message: 'Post liked successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in likeUnlikePost: ', error.message);
    }
};

export { createPost, getPost, deletePost, likeUnlikePost };
