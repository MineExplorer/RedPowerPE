IDRegistry.genBlockID("btsmelter");
Block.createBlock("btsmelter", [
	{name: "Blulectric Smelter", texture: [["rp_machine_bottom", 0], ["btsmelter_top", 0], ["btsmelter_side", 0], ["btsmelter_front", 0], ["btsmelter_side", 0], ["btsmelter_side", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.btsmelter, "stone", 1);
Block.setDestroyLevel(BlockID.btsmelter, 1);

TileRenderer.setStandartModel(BlockID.btsmelter, [["rp_machine_bottom", 0], ["btsmelter_top", 0], ["btsmelter_side", 0], ["btsmelter_front", 0], ["btsmelter_side", 0], ["btsmelter_side", 0]]);
TileRenderer.registerRotationModel(BlockID.btsmelter, 0, [["rp_machine_bottom", 0], ["btsmelter_top", 0], ["btsmelter_side", 0], ["btsmelter_front", 0], ["btsmelter_side", 0], ["btsmelter_side", 0]]);
TileRenderer.registerRotationModel(BlockID.btsmelter, 4, [["rp_machine_bottom", 0], ["btsmelter_top", 0], ["btsmelter_side", 0], ["btsmelter_front", 1], ["btsmelter_side", 0], ["btsmelter_side", 0]]);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.btsmelter, count: 1, data: 0}, [
		"xxx",
		"x x",
		"aba"
	], ['x', 45, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0]);
});


var guiBSmelter = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Blulectric Smelter"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 636, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 425, y: 92, bitmap: "bstorage_small_background", scale: GUI_SCALE},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 636, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE},
		"btScale": {type: "scale", x: 425 + GUI_SCALE, y: 92 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "bstorage_small_scale", scale: GUI_SCALE},
		"slotSource1": {type: "slot", x: 502, y: 112},
		"slotSource2": {type: "slot", x: 562, y: 112},
		"slotSource3": {type: "slot", x: 502, y: 172},
		"slotSource4": {type: "slot", x: 562, y: 172},
		"slotResult": {type: "slot", x: 720, y: 136, size: 72},
	}
});

Callback.addCallback("LevelLoaded", function() {
	MachineRegistry.updateGuiHeader(guiBSmelter, "Blulectric Smelter");
});


MachineRegistry.registerPrototype(BlockID.btsmelter, {
	defaultValues: {
		progress: 0,
		isActive: false
	},
	
	getGuiScreen: function() {
		return guiBSmelter;
	},
	
	getTransportSlots: function() {
		return {input: ["slotSource1", "slotSource2", "slotSource3", "slotSource4", "slotEnergy"], output: ["slotResult"]};
	},
	
	getEnergyStorage: function() {
		return 1600;
	},
	
	tick: function() {
		StorageInterface.checkHoppers(this);
		
		var sourceItems = {};
		for (var i = 1; i <= 4; i++) {
			var slot = this.container.getSlot("slotSource" + i);
			if (slot.id > 0 && slot.data==0) {
				sourceItems[slot.id] = sourceItems[slot.id] || 0;
				sourceItems[slot.id] += slot.count;
			}
		}
		
		var recipe = SmelterRecipes.getRecipe(sourceItems);
		var newActive = false;
		if (recipe) {
			var resultSlot = this.container.getSlot("slotResult");
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
			else {
				this.data.progress = 0;
			}
		}
		this.setActive(newActive);
		
		var energyStorage = this.getEnergyStorage();
		this.data.energy = Math.min(this.data.energy, energyStorage);
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Bt", energyStorage - this.data.energy, 25, 0);
		
		this.container.setScale("progressScale", this.data.progress/100);
		this.container.setScale("btScale", this.data.energy / energyStorage);
	},
	
	energyTick: MachineRegistry.basicEnergyReceiveFunc
});

TileRenderer.setRotationPlaceFunction(BlockID.btsmelter);

StorageInterface.createInterface(BlockID.btsmelter, {
	slots: {
		"slotSource1": {input: true},
		"slotSource2": {input: true},
		"slotSource3": {input: true},
		"slotSource4": {input: true},
		"slotResult": {output: true}
	}
});