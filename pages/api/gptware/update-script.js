import { put, del, list } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    try {
        const { content } = req.body;
        const authorization = req.headers.authorization;
        const type = req.headers.type || "free";

        if (!content || !authorization || authorization !== process.env.GPTWARE_KEY) {
            return res.status(400).json({
                message: "Authorization Key is invalid or content is not provided",
            });
        }

        const validTypes = {
            free: "gptware/free-script.lua",
            orion: "gptware/script-orion.lua",
            lt2: "gptware/script-lt2.lua",
        };

        const scriptPath = validTypes[type] || validTypes.free;
        const blobList = await list();
        const existingBlob = blobList.blobs.find((blob) => blob.pathname === scriptPath);

        if (existingBlob) {
            await del(existingBlob.url);
        }

        await put(scriptPath, content, { access: "public" });

        return res.status(200).json({ message: "Script has been updated!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
