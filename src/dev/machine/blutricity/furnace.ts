/// <reference path="../type/ProcessingMachine.ts" />

IDRegistry.genBlockID("bt_furnace");
Block.createBlock("bt_furnace", [
	{name: "Blulectric Furnace", texture: [["rp_machine_bottom", 0], ["bt_furnace_top", 0], ["bt_furnace_side", 0], ["bt_furnace_front", 0], ["bt_furnace_side", 0], ["bt_furnace_side", 0]], inCreative: true}
], "stone");
BlockRegistry.setDestroyLevel(BlockID.bt_furnace, 1);

TileRenderer.setStandardModelWithRotation(BlockID.bt_furnace, 2, [["rp_machine_bottom", 0], ["bt_furnace_top", 0], ["bt_furnace_side", 0], ["bt_furnace_front", 0], ["bt_furnace_side", 0], ["bt_furnace_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.bt_furnace, 2, [["rp_machine_bottom", 0], ["bt_furnace_top", 0], ["bt_furnace_side", 0], ["bt_furnace_front", 1], ["bt_furnace_side", 0], ["bt_furnace_side", 0]]);
TileRenderer.setRotationFunction(BlockID.bt_furnace);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.bt_furnace, count: 1, data: 0}, [
		"xxx",
		"x x",
		"aba"
	], ['x', 24, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0]);
});


const guiBTFurnace = MachineRegistry.createInventoryWindow("Blulectric Furnace", {
	drawing: [
		{type: "bitmap", x: 625, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 425, y: 92, bitmap: "btstorage_small_background", scale: GUI_SCALE},
	],

	elements: {
		"progressScale": {type: "scale", x: 625, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE},
		"btScale": {type: "scale", x: 425 + GUI_SCALE, y: 92 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "btstorage_small_scale", scale: GUI_SCALE},
		"slotSource": {type: "slot", x: 536, y: 136, size: 72},
		"slotResult": {type: "slot", x: 720, y: 136, size: 72},
	}
});


class BTFurnace extends ProcessingMachine {
	getScreenByName() {
		return guiBTFurnace;
	}

	onTick(): void {
		super.onTick();

		let sourceSlot = this.container.getSlot("slotSource");
		let resultSlot = this.container.getSlot("slotResult");
		let newActive = false;
		let result = Recipes.getFurnaceRecipeResult(sourceSlot.id, sourceSlot.data, "iron");
		if (result && (resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0)) {
			if (this.data.energy >= 4) {
				this.data.energy -= 4;
				this.data.progress++;
				newActive = true;
			}
			if (this.data.progress >= 100) {
				sourceSlot.setSlot(sourceSlot.id, sourceSlot.count - 1, sourceSlot.data);
				sourceSlot.validate();
				resultSlot.setSlot(result.id, resultSlot.count + 1, result.data);
				this.data.progress = 0;
			}
		}
		else {
			this.data.progress = 0;
		}
		this.setActive(newActive);

		this.container.setScale("progressScale", this.data.progress / 100);
		this.container.setScale("btScale", this.data.energy / this.getEnergyStorage());
		this.container.sendChanges();
	}
}

MachineRegistry.registerMachine(BlockID.bt_furnace, new BTFurnace());

StorageInterface.createInterface(BlockID.bt_furnace, {
	slots: {
		"slotSource": {input: true},
		"slotResult": {output: true}
	}
});