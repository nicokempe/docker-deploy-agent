import Docker from 'dockerode';
import { config } from '../config';

const docker = new Docker();

async function getContainer(): Promise<Docker.Container | null> {
    const containers = await docker.listContainers({ all: true });
    const containerInfo = containers.find((c) => c.Image.includes(config.repoName));

    return containerInfo ? docker.getContainer(containerInfo.Id) : null;
}

async function stopContainer(container: Docker.Container): Promise<void> {
    await container.stop();
    await container.remove();
}

async function startNewContainer(tag: string): Promise<void> {
    const image = `${config.repoOwner}/${config.repoName}:${tag}`;
    const containerConfig = {
        Image: image,
        name: config.repoName,
        // TODO: More configurations (e.g. binding of ports, volumes, ...)
    };

    await docker.createContainer(containerConfig).then((container) => container.start());
}

export async function needsUpdate(latestImageTag: string, packageName: string): Promise<boolean> {
    const container = await getContainer();
    if (!container) {
        return true;
    }

    const containerInfo = await container.inspect();
    const currentImage = containerInfo.Image;

    const latestImage = await docker.getImage(`${config.repoOwner}/${config.repoName}:${latestImageTag}`);
    const latestImageInfo = await latestImage.inspect();

    return currentImage !== latestImageInfo.Id;
}

export async function deployNewImage(tag: string): Promise<void> {
    const container = await getContainer();

    if (container) {
        await stopContainer(container);
    }

    await startNewContainer(tag);
}

export async function rollback(): Promise<void> {
    // TODO: Rollback functionality
}
