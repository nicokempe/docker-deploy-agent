import axios from 'axios';
import { config } from '../config';

const githubApiBaseUrl = 'https://api.github.com';

export async function getLatestImage(repoOwner: string, repoName: string): Promise<string | null> {
    try {
        const response = await axios.get(
            `${githubApiBaseUrl}/orgs/${repoOwner}/packages/${config.packageType}/${config.packageName}/versions`,
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `token ${config.token}`,
                },
                params: {
                    per_page: 1,
                    page: 1,
                },
            }
        );

        const latestVersion = response.data[0];
        if (!latestVersion) {
            return null;
        }

        return `${config.packageName}@${latestVersion.name}`;
    } catch (error) {
        console.error('An error occured fetching the latest image: ', error);
        throw error;
    }
}

