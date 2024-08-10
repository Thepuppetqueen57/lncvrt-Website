import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        const startTime = Date.now();
        const project = "waterfall";
        const baseUrl = `https://api.papermc.io/v2/projects/${project}`;

        const projectResponse = await fetch(baseUrl, {
            headers: {
                accept: "application/json",
            },
        });

        if (!projectResponse.ok) {
            throw new Error(
                `Failed to fetch project details: ${projectResponse.statusText}`
            );
        }

        const projectData = await projectResponse.json();
        const latestVersion = projectData.latest;

        const versionsData = {};
        const versionPromises = projectData.versions.map(async (version) => {
            const versionResponse = await fetch(
                `${baseUrl}/versions/${version}`,
                {
                    headers: {
                        accept: "application/json",
                    },
                }
            );

            if (!versionResponse.ok) {
                throw new Error(
                    `Failed to fetch version details for ${version}: ${versionResponse.statusText}`
                );
            }

            const versionData = await versionResponse.json();
            const latestBuildNumber = versionData.builds.slice(-1)[0];
            const latestBuildURL = `${baseUrl}/versions/${version}/builds/${latestBuildNumber}/downloads/${project}-${version}-${latestBuildNumber}.jar`;
            versionsData[version] = latestBuildURL;
        });

        await Promise.all(versionPromises);

        const sortedVersionsData = {};
        for (const version of projectData.versions.reverse()) {
            sortedVersionsData[version] = versionsData[version];
        }

        res.status(200).send(
            JSON.stringify(
                {
                    latestVersion,
                    versions: sortedVersionsData,
                    fetch_time: Date.now() - startTime,
                },
                null,
                4
            )
        );
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
