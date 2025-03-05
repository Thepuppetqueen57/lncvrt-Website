import fetch from "node-fetch";

interface VersionData {
    builds: {
        latest: number;
    };
}

interface ProjectData {
    latest: string;
    versions: string[];
}

interface BuildsData {
    latestVersion: string;
    versions: string[] | Record<string, string>;
    fetch_time: number;
}

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        headers: {
            accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}

export async function getBuilds(projectName: string, primary: boolean): Promise<BuildsData> {
    const startTime = Date.now();
    const baseUrl = `https://api.purpurmc.org/v2/${projectName}`;

    try {
        const projectData = await fetchJson<ProjectData>(baseUrl);
        const latestVersion = projectData.latest;

        if (primary) {
            return {
                latestVersion,
                versions: projectData.versions,
                fetch_time: Date.now() - startTime,
            };
        } else {
            const versionsData: Record<string, string> = {};
            const versionPromises = projectData.versions.map(
                async (version) => {
                    const versionData = await fetchJson<VersionData>(`${baseUrl}/${version}`);
                    const latestBuildNumber = versionData.builds.latest;
                    const latestBuildURL = `${baseUrl}/${version}/${latestBuildNumber}/download`;
                    versionsData[version] = latestBuildURL;
                }
            );

            await Promise.all(versionPromises);

            const sortedVersionsData: Record<string, string> = {};
            for (const version of projectData.versions.reverse()) {
                sortedVersionsData[version] = versionsData[version];
            }

            return {
                latestVersion,
                versions: sortedVersionsData,
                fetch_time: Date.now() - startTime,
            };
        }
    } catch (error) {
        console.error("Error fetching resource details:", error);
        throw new Error("Failed to fetch resource details");
    }
}
