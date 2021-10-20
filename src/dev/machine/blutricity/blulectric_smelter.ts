/// <reference path="../type/ProcessingMachine.ts" />

IDRegistry.genBlockID("bt_smelter");
Block.createBlock("bt_smelter", [
	{name: "Blulectric Smelter", texture: [["rp_machine_bottom", 0], ["bt_smelter_top", 0], ["bt_smelter_side", 0], ["bt_smelter_front", 0], ["bt_smelter_side", 0], ["bt_smelter_side", 0]], inCreative: true}
], "stone");
BlockRegistry.setDestroyLevel(BlockID.bt_smelter, 1);

TileRenderer.setStandardModelWithRotation(BlockID.bt_smelter, 2, [["rp_machine_bottom", 0], ["bt_smelter_top", 0], ["bt_smelter_side", 0], ["bt_smelter_front", 0], ["bt_smelter_side", 0], ["bt_smelter_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.bt_smelter, 2, [["rp_machine_bottom", 0], ["bt_smelter_top", 0], ["bt_smelter_side", 0], ["bt_smelter_front", 1], ["bt_smelter_side", 0], ["bt_smelter_side", 0]]);
TileRenderer.setRotationFunction(BlockID.bt_smelter);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.bt_smelter, count: 1, data: 0}, [
		"xxx",
		"x x",
		"aba"
	], ['x', 45, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0]);
});


const guiBTSmelter = MachineRegistry.createInventoryWindow("Blulectric Smelter", {
	drawing: [
		{type: "bitmap", x: 636, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 425, y: 92, bitmap: "btstorage_small_background", scale: GUI_SCALE},
	],

	elements: {
		"progressScale": {type: "scale", x: 636, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE, clicker: {
			onClick: () => {
				RecipeViewer && RecipeViewer.RecipeTypeRegistry.openRecipePage("rp_smelter");
			}}
		},
		"btScale": {type: "scale", x: 425 + GUI_SCALE, y: 92 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "btstorage_small_scale", scale: GUI_SCALE},
		"slotSource1": {type: "slot", x: 502, y: 112},
		"slotSource2": {type: "slot", x: 562, y: 112},
		"slotSource3": {type: "slot", x: 502, y: 172},
		"slotSource4": {type: "slot", x: 562, y: 172},
		"slotResult": {type: "slot", x: 720, y: 136, size: 72},
	}
});

class BTSmelter extends ProcessingMachine {
	getScreenByName() {
		return guiBTSmelter;
	}

	onTick(): void {
		super.onTick();

		const input = SmelterRecipes.getInput(this.container);
		const recipe = SmelterRecipes.getRecipe(input);
		let newActive = false;
		if (recipe) {
			const resultSlot = this.container.getSlot("slotResult");
			if (resultSlot.id == recipe.result.id && resultSlot.count + recipe.result.count <= 64 || resultSlot.id == 0) {
				if (this.data.energy >= 4) {
					this.data.energy -= 4;
					this.data.progress++;
					newActive = true;
				}
				if (this.data.progress >= 100) {
					SmelterRecipes.performRecipe(recipe, this.container);
					this.data.progress = 0;
				}
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

MachineRegistry.registerMachine(BlockID.bt_smelter, new BTSmelter());

StorageInterface.createInterface(BlockID.bt_smelter, {
	slots: {
		"slotSource1": {input: true},
		"slotSource2": {input: true},
		"slotSource3": {input: true},
		"slotSource4": {input: true},
		"slotResult": {output: true}
	}
});