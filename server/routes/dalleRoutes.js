import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.route('/').post(async (req, res) => {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(req.body), // Ensure req.body contains the proper JSON
            }
        );

        // Get the image as a Blob
        const blob = await response.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());
        const base64Image = buffer.toString('base64'); // Convert to Base64 string
        res.json({ image: `data:${blob.type};base64,${base64Image}` }); // Send Base64 data
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.message || 'An error occurred');
    }
});

export default router