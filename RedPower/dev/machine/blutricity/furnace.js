IDRegistry.genBlockID("btfurnace");
Block.createBlock("btfurnace", [
	{name: "Blulectric Furnace", texture: [["rp_machine_bottom", 0], ["btfurnace_top", 0], ["btfurnace_side", 0], ["btfurnace_front", 0], ["btfurnace_side", 0], ["btfurnace_side", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.btfurnace, "stone", 1);
Block.setDestroyLevel(BlockID.btfurnace, 1);

TileRenderer.setStandartModel(BlockID.btfurnace, [["rp_machine_bottom", 0], ["btfurnace_top", 0], ["btfurnace_side", 0], ["btfurnace_front", 0], ["btfurnace_side", 0], ["btfurnace_side", 0]]);
TileRenderer.registerRotationModel(BlockID.btfurnace, 0, [["rp_machine_bottom", 0], ["btfurnace_top", 0], ["btfurnace_side", 0], ["btfurnace_front", 0], ["btfurnace_side", 0], ["btfurnace_side", 0]]);
TileRenderer.registerRotationModel(BlockID.btfurnace, 4, [["rp_machine_bottom", 0], ["btfurnace_top", 0], ["btfurnace_side", 0], ["btfurnace_front", 1], ["btfurnace_side", 0], ["btfurnace_side", 0]]);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.btfurnace, count: 1, data: 0}, [
		"xxx",
		"x x",
		"aba"
	], ['x', 24, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0]);
});


var guiBFurnace = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Blulectric Furnace"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 625, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 425, y: 92, bitmap: "bstorage_small_background", scale: GUI_SCALE},
	],
	
	elements: {
		"progressScale": {type: "scale", x: 625, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE},
		"btScale": {type: "scale", x: 425 + GUI_SCALE, y: 92 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "bstorage_small_scale", scale: GUI_SCALE},
		"slotSource": {type: "slot", x: 536, y: 136, size: 72},
		"slotResult": {type: "slot", x: 720, y: 136, size: 72},
	}
});

Callback.addCallback("LevelLoaded", function() {
	MachineRegistry.updateGuiHeader(guiBFurnace, "Blulectric Furnace");
});


MachineRegistry.registerPrototype(BlockID.btfurnace, {
	defaultValues: {
		progress: 0,
		isActive: false
	},
	
	getGuiScreen: function() {
		return guiBFurnace;
	},
	
	getTransportSlots: function() {
		return {input: ["slotSource"], output: ["slotResult"]};
	},
	
	getEnergyStorage: function() {
		return 1600;
	},
	
	tick: function() {
		StorageInterface.checkHoppers(this);
		
		var sourceSlot = this.container.getSlot("slotSource");
		var resultSlot = this.container.getSlot("slotResult");
		var newActive = false;
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
		if (result && (resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0)) {
			if (this.data.energy >= 4) {
				this.data.energy -= 4;
				this.data.progress++;
				newActive = true;
			}
			if (this.data.progress >= 100) {
				sourceSlot.count--;
				resultSlot.id = result.id;
				resultSlot.data = result.data;
				resultSlot.count++;
				this.container.validateAll();
				this.data.progress = 0;
			}
		}
		else {
			this.data.progress = 0;
		}
		this.setActive(newActive);
		
		var energyStorage = this.getEnergyStorage();
		this.data.energy = Math.min(this.data.energy, energyStorage);
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Bt", energyStorage - this.data.energy, 25, 0);
		
		this.container.setScale("progressScale", this.data.progress/100);
		this.container.setScale("btScale", this.data.energy / energyStorage);
	}
});

TileRenderer.setRotationPlaceFunction(BlockID.btfurnace);

StorageInterface.createInterface(BlockID.btfurnace, {
	slots: {
		"slotSource": {input: true},
		"slotResult": {output: true}
	}
});