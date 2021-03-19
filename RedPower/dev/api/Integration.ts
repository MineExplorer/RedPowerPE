namespace IntegrationAPI {
	export function registerPlant(blockID: number) {
		plants.push(blockID);
	}

	export function registerSeeds(itemID: number, blockID: number) {
		seeds[itemID] = blockID;
	}
}