import fetch from "node-fetch";

interface VersionData {
    downloads: {
        server: {
            url: string;
        };
    };
}

interface ProjectData {
    latest: {
        release: string;
        snapshot: string;
    };
    versions: {
        id: string;
        url: string;
    }[];
}

interface BuildsData {
    latestVersion: string;
    latest: Record<string, string>;
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

export async function getBuilds(primary: boolean): Promise<BuildsData> {
    const startTime = Date.now();

    try {
        const projectData = await fetchJson<ProjectData>("https://launchermeta.mojang.com/mc/game/version_manifest.json");
        let latestVersion: string | null = null;
        const latest = projectData.latest;

        if (primary) {
            const versionNames = projectData.versions.map(
                (version) => version.id
            );
            latestVersion = versionNames[0];

            return {
                latestVersion,
                latest,
                versions: versionNames,
                fetch_time: Date.now() - startTime,
            };
        } else {
            const versionsData: Record<string, string> = {};
            const versionPromises = projectData.versions.map(
                async (version) => {
                    const versionData = await fetchJson<VersionData>(
                        version.url
                    );

                    const downloadURL = versionData.downloads?.server?.url;
                    if (downloadURL) {
                        versionsData[version.id] = downloadURL;
                    }
                }
            );

            await Promise.all(versionPromises);

            latestVersion = Object.keys(versionsData)[0];

            return {
                latestVersion,
                latest,
                versions: versionsData,
                fetch_time: Date.now() - startTime,
            };
        }
    } catch (error) {
        console.error("Error fetching resource details:", error);
        throw new Error("Failed to fetch resource details");
    }
}
