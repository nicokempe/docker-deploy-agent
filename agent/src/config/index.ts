import dotenv from 'dotenv';

// Docs: https://github.com/nicokempe/docker-deploy-agent/wiki/Enviroment-variables

dotenv.config();

export const config = {
    gitHubUsername: process.env.GITHUB_USER_NAME || '',
    gitHubUserMail: process.env.GITHUB_USER_MAIL || '',
    gitHubToken: process.env.GITHUB_TOKEN || '',
    repoOwner: process.env.GITHUB_REPO_OWNER || '',
    repoName: process.env.GITHUB_REPO_NAME || '',
    packageName: process.env.PACKAGE_NAME || '',
    packageType: process.env.PACKAGE_TYPE || 'container',
    interval: Number(process.env.CHECK_INTERVAL) || 900000,
    dockerAgentImage: process.env.DOCKER_AGENT_IMAGE || '',
    dockerAgentTag: process.env.DOCKER_AGENT_TAG || 'latest',
};
