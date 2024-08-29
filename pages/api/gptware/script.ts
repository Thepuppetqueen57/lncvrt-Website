import { list } from "@vercel/blob";
import { NextApiRequest, NextApiResponse } from "next";

interface Blob {
    pathname: string;
    downloadUrl: string;
}

interface BlobList {
    blobs: Blob[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const { type } = req.query;
        const validTypes: Record<string, string> = {
            free: "gptware/free-script.lua",
            orion: "gptware/script-orion.lua",
            lt2: "gptware/script-lt2.lua",
        };

        if (typeof type !== 'string' || !validTypes[type]) {
            return res.status(404).json({
                message: "Script not found, Available types: free, orion, lt2",
            });
        }

        const blobList: BlobList = await list();
        const blob = blobList.blobs.find((blob) => blob.pathname === validTypes[type]);

        if (!blob) {
            return res.status(404).json({ message: "Script not found" });
        }

        const response = await fetch(blob.downloadUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch script: ${response.statusText}`);
        }

        const text = await response.text();
        res.status(200).send(Buffer.from(text, 'base64').toString('utf-8'));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
