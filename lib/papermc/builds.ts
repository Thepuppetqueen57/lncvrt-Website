import fetch from "node-fetch";

interface VersionData {
    builds: number[];
}

interface ProjectData {
    latest: string;
    versions: string[];
}

interface BuildsData {
    latestVersion: string;
    versions: Record<string, string>;
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

export async function getBuilds(projectName: string): Promise<BuildsData> {
    const startTime = Date.now();
    const baseUrl = `https://api.papermc.io/v2/projects/${projectName}`;

    try {
        const projectData = await fetchJson<ProjectData>(baseUrl);
        const latestVersion = projectData.latest;

        const versionsData: Record<string, string> = {};
        const versionPromises = projectData.versions.map(async (version) => {
            const versionData = await fetchJson<VersionData>(`${baseUrl}/versions/${version}`);
            const latestBuildNumber = versionData.builds.slice(-1)[0];
            const latestBuildURL = `${baseUrl}/versions/${version}/builds/${latestBuildNumber}/downloads/${projectName}-${version}-${latestBuildNumber}.jar`;
            versionsData[version] = latestBuildURL;
        });

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
    } catch (error) {
        console.error("Error fetching resource details:", error);
        throw new Error("Failed to fetch resource details");
    }
}
