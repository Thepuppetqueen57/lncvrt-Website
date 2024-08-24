import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        const response = await fetch(
            "https://api.modrinth.com/v2/project/IBF9is2I/version"
        );
        if (!response.ok) {
            throw new Error(
                `Failed to fetch resource details: ${response.statusText}`
            );
        }

        const data = await response.json();
        const latestVersion = data[0]?.version_number || "Unknown";

        res.status(200).send(JSON.stringify({ latestVersion }, null, 4));
    } catch (error) {
        console.error("Error fetching resource details:", error);
        res.status(500).send(
            JSON.stringify(
                { message: "Failed to fetch resource details" },
                null,
                4
            )
        );
    }
}
