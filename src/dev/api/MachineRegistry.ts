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

	export function useScrewdriver(item: ItemInstance): void {
		let screwdriver = getScrewdriverData(item.id);
		
		
	}
}
