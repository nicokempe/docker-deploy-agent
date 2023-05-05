import { config } from './config';
import { checkForUpdates, deployNewImage, rollback } from './utils/docker';
import { getLatestImage } from './utils/github';

async function main() {
    try {
        const latestImage = await getLatestImage(config.repoName, config.token);
        const needsUpdate = await checkForUpdates(latestImage);

        if (needsUpdate) {
            try {
                await deployNewImage(latestImage);
                console.log('The Update was successful!');
            } catch (error) {
                console.error('Update failed, rolling back:', error);
                await rollback();
                console.log('The Rollback was successful!');
            }
        }
    } catch (error) {
        console.error('An error occured during the update check:', error);
    }
}

(async function runAgent() {
    while (true) {
        await main();
        await new Promise(resolve => setTimeout(resolve, config.interval));
    }
})();
