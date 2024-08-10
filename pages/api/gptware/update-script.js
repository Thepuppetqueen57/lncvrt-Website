import { put, del, list } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { content } = req.body;
        const authorization = req.headers.authorization;
        const type = req.headers.type;

        if (
            content == null ||
            authorization == null ||
            authorization !== process.env.GPTWARE_KEY
        ) {
            return res.status(400).send(
                JSON.stringify(
                    {
                        message:
                            "Authorization Key is invalid or content is not provided",
                    },
                    null,
                    4
                )
            );
        }

        const blobList = await list();
        let blob;
        if (type === "orion") {
            blob = blobList.blobs.find(
                (blob) => blob.pathname === "gptware/script-orion.lua"
            );
        } else if (type === "lt2") {
            blob = blobList.blobs.find(
                (blob) => blob.pathname === "gptware/script-lt2.lua"
            );
        } else {
            blob = blobList.blobs.find(
                (blob) => blob.pathname === "gptware/free-script.lua"
            );
        }

        if (blob) {
            await del(blob.url);
        }

        if (type === "orion") {
            await put("gptware/script-orion.lua", content, {
                access: "public",
            });
        } else if (type === "lt2") {
            await put("gptware/script-lt2.lua", content, {
                access: "public",
            });
        } else {
            await put("gptware/free-script.lua", content, {
                access: "public",
            });
        }

        return res
            .status(200)
            .send(
                JSON.stringify({ message: "Script has been updated!" }, null, 4)
            );
    } else {
        res.setHeader("Allow", ["POST"]);
        return res
            .status(405)
            .send(
                JSON.stringify(
                    { message: `Method ${req.method} Not Allowed` },
                    null,
                    4
                )
            );
    }
}
