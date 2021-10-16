namespace IntegrationAPI {
	export function registerPlant(blockID: number): void {
		plants.push(blockID);
	}

	export function registerSeeds(itemID: number, blockID: number): void {
		seeds[itemID] = blockID;
	}

	export function addDeployerItem(itemID: number): void {
		blockItems.push(itemID);
	}
}