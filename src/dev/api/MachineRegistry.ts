namespace MachineRegistry {
	const machineIDs = {};

	export function isMachine(id: number): boolean {
		return machineIDs[id];
	}

	export function registerPrototype(id: number, Prototype: TileEntity.TileEntityPrototype): void {
		machineIDs[id] = true;
		Block.setDestroyTime(id, 3);
		ToolAPI.registerBlockMaterial(id, "stone", 1, true);
		TileEntity.registerPrototype(id, Prototype);
	}

	export function registerMachine(id: number, Prototype: TileEntity.TileEntityPrototype): void {
		registerPrototype(id, Prototype);
		// wire connection
		ICRender.getGroup("bt-wire").add(id, -1);
		EnergyTileRegistry.addEnergyTypeForId(id, BT);
	}

	export function updateGuiHeader(gui: any, text: string): void {
		const header = gui.getWindow("header");
		header.contentProvider.drawing[2].text = Translation.translate(text);
	}

	export function createInventoryWindow(header: string, uiDescriptor: {drawing?: UI.DrawingSet, elements: UI.ElementSet}): UI.StandartWindow {
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

	export function registerScrewdriver(id: number, properties: IScrewdriver): void {
		screwdrivers[id] = properties;
	}

	export function getScrewdriverData(id: number): Nullable<IScrewdriver> {
		return screwdrivers[id];
	}

	export function isScrewdriver(item: ItemInstance): boolean {
		const screwdriver = getScrewdriverData(item.id);
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
		const textures = getTextureArray(texture.default);
		const variations = [];
		for (let i = 0; i < textures.length; i++) {
			variations.push({name: name, texture: textures[i], inCreative: i == 0});
		}
		const activeTextures = getTextureArray(texture.active);
		for (let i = 0; i < activeTextures.length; i++) {
			variations.push({name: name, texture: activeTextures[i], inCreative: false});
		}
		const numericID = IDRegistry.genBlockID(stringID);
		Block.createBlock(stringID, variations, blockType);
        BlockRegistry.setRotationFunction(stringID, true);
		TileRenderer.setHandAndUiModel(numericID, 0, textures[1]);
    }
}
