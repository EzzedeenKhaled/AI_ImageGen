import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import Post from '../models/post.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/')
    .get(async (req, res) => {
        try {
            const posts = await Post.find({});
            res.status(200).json({ success: true, data: posts });
        } catch (error) {
            console.error(error);
            res.status(500).send(error?.message || 'An error occurred');
        }
    })
    .post(async (req, res) => {
        try {

            const { name, prompt, photo } = req.body;

            const photoUrl = await cloudinary.uploader.upload(photo);

            const newPost = await Post.create({
                name,
                prompt,
                photo: photoUrl.url,
            });
            res.status(201).json({ success: true, data: newPost });
        } catch (error) {
            console.error(error);
            res.status(500).send(error?.message || 'An error occurred');
        }
    });

export default router





