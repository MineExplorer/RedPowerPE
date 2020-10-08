IDRegistry.genBlockID("bt_furnace");
Block.createBlockWithRotation("bt_furnace", [
	{name: "Blulectric Furnace", texture: [["rp_machine_bottom", 0], ["bt_furnace_top", 0], ["bt_furnace_side", 0], ["bt_furnace_front", 0], ["bt_furnace_side", 0], ["bt_furnace_side", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.bt_furnace, "stone", 1);
Block.setDestroyLevel(BlockID.bt_furnace, 1);

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


var guiBTFurnace = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Blulectric Furnace"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
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

Callback.addCallback("LevelLoaded", function() {
	MachineRegistry.updateGuiHeader(guiBTFurnace, "Blulectric Furnace");
});


MachineRegistry.registerMachine(BlockID.bt_furnace, {
	defaultValues: {
		energy: 0,
		progress: 0,
		isActive: false
	},

	getGuiScreen: function() {
		return guiBTFurnace;
	},

	getTransportSlots: function() {
		return {input: ["slotSource"], output: ["slotResult"]};
	},

	getEnergyStorage: function() {
		return 2000;
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
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Bt", energyStorage - this.data.energy, 0);
		
		this.container.setScale("progressScale", this.data.progress/100);
		this.container.setScale("btScale", this.data.energy / energyStorage);
	}
});


StorageInterface.createInterface(BlockID.bt_furnace, {
	slots: {
		"slotSource": {input: true},
		"slotResult": {output: true}
	}
});