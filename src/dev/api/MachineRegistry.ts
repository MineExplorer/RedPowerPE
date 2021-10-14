namespace MachineRegistry {
	let machineIDs = {};

	export function isMachine(id: number) {
		return machineIDs[id];
	}

	export function registerPrototype(id: number, Prototype: TileEntity.TileEntityPrototype) {
		machineIDs[id] = true;
		Block.setDestroyTime(id, 3.25);
		ToolAPI.registerBlockMaterial(id, "stone", 1, true);
		TileEntity.registerPrototype(id, Prototype);
	}

	export function registerMachine(id: number, Prototype: TileEntity.TileEntityPrototype) {
		registerPrototype(id, Prototype);
		// wire connection
		ICRender.getGroup("bt-wire").add(id, -1);
		EnergyTileRegistry.addEnergyTypeForId(id, BT);
	}

	export function updateGuiHeader(gui: any, text: string) {
		let header = gui.getWindow("header");
		header.contentProvider.drawing[2].text = Translation.translate(text);
	}

	export function createInventoryWindow(header: string, uiDescriptor: {drawing?: UI.DrawingSet, elements: UI.ElementSet}) {
		const gui = new UI.StandartWindow({
			standard: {
				header: {text: {text: Translation.translate(header)}},
				inventory: {standard: true},
				background: {standard: true}
			},

			drawing: uiDescriptor.drawing || [],
			elements: uiDescriptor.elements
		});

		Callback.addCallback("LevelLoaded", function() {
			updateGuiHeader(gui, header);
		});

		return gui;
	}

	const screwdrivers = {};

	export function registerScrewdriver(id: number, properties: IScrewdriver) {
		screwdrivers[id] = properties;
	}

	export function getScrewdriverData(id: number): IScrewdriver {
		return screwdrivers[id];
	}

	export function isScrewdriver(item: ItemInstance): boolean {
		let screwdriver = getScrewdriverData(item.id);
		return screwdriver?.canBeUsed(item);
	}

	type BlockTexture = {top: string, bottom: string, side: string, side2?: string};

	function getTextureArray(texture: BlockTexture): [string, number][][] {
		texture.side2 ??= texture.side;
		return [
			[[texture.top, 0], [texture.bottom, 0], [texture.side, 1], [texture.side, 1], [texture.side2, 1], [texture.side2, 1]],
			[[texture.bottom, 0], [texture.top, 0], [texture.side, 0], [texture.side, 0], [texture.side2, 0], [texture.side2, 0]],
			[[texture.side, 0], [texture.side, 0], [texture.top, 0], [texture.bottom, 0], [texture.side2, 2], [texture.side2, 3]],
			[[texture.side, 1], [texture.side, 1], [texture.bottom, 0], [texture.top, 0], [texture.side2, 3], [texture.side2, 2]],
			[[texture.side, 2], [texture.side, 2], [texture.side2, 3], [texture.side2, 2], [texture.top, 0], [texture.bottom, 0]],
			[[texture.side, 3], [texture.side, 3], [texture.side2, 2], [texture.side2, 3], [texture.bottom, 0], [texture.top, 0]],
		]
	}

	export function createBlockWithRotation(stringID: string, name: string, texture: {default: BlockTexture, active: BlockTexture}, blockType?: string | Block.SpecialType): void {
		let textures = getTextureArray(texture.default);
		let variations = [];
		for (let i = 0; i < textures.length; i++) {
			variations.push({name: name, texture: textures[i], inCreative: i == 1});
		}
		textures = getTextureArray(texture.active);
		for (let i = 0; i < textures.length; i++) {
			variations.push({name: name, texture: textures[i], inCreative: false});
		}
		Block.createBlock(stringID, variations, blockType);
        BlockRegistry.setRotationFunction(stringID, true);
    }
}
