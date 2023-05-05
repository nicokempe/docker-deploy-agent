# Docker Auto-Update Agent

This project provides an automatic update agent for Docker-based applications in restricted network environments. The agent periodically checks for new application versions and updates the running containers accordingly.

## Prerequisites

- Node.js v16 or higher
- Docker and Docker Compose
- GitHub Personal Access Token with package:read permissions

## Installation

1. Clone the repository:

```console
nke@alpine:~$ git clone https://github.com/nicokempe/docker-deploy-agent.git
nke@alpine:~$ cd docker-deploy-agent
```

2. Install the dependencies:

```console
nke@alpine:~$ npm install
```

3. Create a `.env` file and add your GitHub credentials and repository information:

```env
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO_OWNER=repository_owner
GITHUB_REPO_NAME=repository_name
PACKAGE_NAME=your_package_name
CHECK_INTERVAL=900000
DOCKER_AGENT_IMAGE=your_repo_owner/your_repo_name
DOCKER_AGENT_TAG=your_tag
```

> Don't forget to list the `.env` file in the `.gitignore` to avoid accidentally committing it to your repository.

4. Build the agent container, configure it in the .env file and start it with Docker Compose:

```console
nke@alpine:~$ docker build -t your_repo_owner/your_repo_name:your_tag .
nke@alpine:~$ docker-compose up -d
```

## Usage

The agent runs as a standalone Docker container and periodically checks for updates to your application. When an update is available, the agent performs a zero-touch deployment, updating the application to the latest version. If the update fails, the agent features a rollback function to revert to the previous version.

## Customization

You can customize the agent to suit your specific requirements by modifying the configuration in the `.env` file and the code in the `src` files. Please make sure to thoroughly test any changes before deploying them in a production environment.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](https://github.com/nicokempe/docker-deploy-agent/blob/main/LICENSE)
