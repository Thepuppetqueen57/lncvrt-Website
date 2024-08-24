import { list } from "@vercel/blob";

export default async function handler(req, res) {
    try {
        const { type } = req.query;
        const validTypes = {
            free: "gptware/free-script.lua",
            orion: "gptware/script-orion.lua",
            lt2: "gptware/script-lt2.lua",
        };

        if (!validTypes[type]) {
            return res.status(404).json({
                message: "Script not found, Available types: free, orion, lt2",
            });
        }

        const blobList = await list();
        const blob = blobList.blobs.find((blob) => blob.pathname === validTypes[type]);

        if (!blob) {
            return res.status(404).json({ message: "Script not found" });
        }

        const response = await fetch(blob.downloadUrl);
        const text = await response.text();
        res.status(200).send(atob(text));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
