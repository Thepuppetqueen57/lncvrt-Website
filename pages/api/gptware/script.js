import { list } from "@vercel/blob";

export default async function handler(req, res) {
    try {
        const type = req.query.type;
        const blobList = await list();
        let blob;
        if (type == "free") {
            blob = blobList.blobs.find(
                (blob) => blob.pathname === "gptware/free-script.lua"
            );
        } else if (type == "orion") {
            blob = blobList.blobs.find(
                (blob) => blob.pathname === "gptware/script-orion.lua"
            );
        } else if (type == "lt2") {
            blob = blobList.blobs.find(
                (blob) => blob.pathname === "gptware/script-lt2.lua"
            );
        } else {
            res.status(404).send(
                "Script not found, Avaiable types: free, orion, lt2"
            );
        }

        if (blob) {
            const response = await fetch(blob.downloadUrl);
            const text = await response.text();
            res.setHeader("Content-Type", "application/lua");
            res.status(200).send(atob(text));
        } else {
            res.status(500).send("Internal Server Error");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
