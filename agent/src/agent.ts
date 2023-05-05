import { config } from './config';
import { needsUpdate, deployNewImage, rollback } from './utils/docker';
import { getLatestImage } from './utils/github';

async function main() {
    try {
        const latestImage = await getLatestImage(config.repoName, config.token);
        const updateRequired = await needsUpdate(latestImage, config.packageName);

        if (updateRequired) {
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
        console.error('An error occurred during the update check:', error);
    }
}

(async function runAgent() {
    while (true) {
        await main();
        await new Promise(resolve => setTimeout(resolve, config.interval));
    }
})();
