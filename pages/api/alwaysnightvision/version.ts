import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";

interface VersionResponse {
    version_number: string;
}

interface ResponseData {
    latestVersion: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const response = await fetch(
            "https://api.modrinth.com/v2/project/tbQ19uFx/version"
        );
        if (!response.ok) {
            throw new Error(
                `Failed to fetch resource details: ${response.statusText}`
            );
        }

        const data = await response.json();
        if (!Array.isArray(data) || !data.every(item => 'version_number' in item)) {
            throw new Error('Invalid response format');
        }

        const versionData: VersionResponse[] = data;
        const latestVersion = versionData[0]?.version_number || "Unknown";

        res.status(200).json({ latestVersion });
    } catch (error) {
        console.error("Error fetching resource details:", error);
        res.status(500).json({ latestVersion: "Failed to fetch resource details" });
    }
}
