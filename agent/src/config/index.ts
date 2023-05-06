import dotenv from 'dotenv';

dotenv.config();

export const config = {
    token: process.env.GITHUB_TOKEN || '',
    repoOwner: process.env.GITHUB_REPO_OWNER || '',
    repoName: process.env.GITHUB_REPO_NAME || '',
    packageName: process.env.PACKAGE_NAME || '',
    packageType: process.env.PACKAGE_TYPE || '',
    interval: parseInt(process.env.CHECK_INTERVAL || '900000', 10),
};
