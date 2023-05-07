import { config } from './config';
import { needsUpdate, deployNewImage, rollback } from './utils/docker';
import { getLatestImage } from './utils/github';

async function main() {
    try {
        const latestImage = await getLatestImage(config.repoOwner, config.repoName, config.gitHubToken);

        if (latestImage) {
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
        } else {
            console.log('No latest image found');
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
