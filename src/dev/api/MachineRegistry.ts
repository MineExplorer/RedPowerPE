namespace MachineRegistry {
	let machineIDs = {};

	export function isMachine(id: number) {
		return machineIDs[id];
	}

	export function registerPrototype(id: number, Prototype: TileEntity.TileEntityPrototype) {
		machineIDs[id] = true;
		Block.setDestroyTime(id, 3.25);
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
}
