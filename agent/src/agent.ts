import { config } from './config';
import { checkForUpdates, deployNewImage, rollback } from './utils/docker';

async function main() {
    try {
        const needsUpdate = await checkForUpdates();

        if (needsUpdate) {
            try {
                await deployNewImage(needsUpdate);
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
