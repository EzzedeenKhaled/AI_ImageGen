import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.route('/').post(async (req, res) => {
    try {
        const response = await fetch(
            "https://router.huggingface.co/nscale/v1/images/generations",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(req.body), // Ensure req.body contains the proper JSON
            }
        );

        if (!response.ok) {
            // Log the error from the external API itself
            const errorText = await response.text();
            throw new Error(`Hugging Face API Error: ${response.status} - ${errorText}`);
        }
        const hfData = await response.json();            // Parse JSON
        const base64Image = hfData.data[0].b64_json;    // Extract actual image
        res.json({ image: `data:image/png;base64,${base64Image}` }); // Send proper Base64 image
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.message || 'An error occurred');
    }
});

export default router