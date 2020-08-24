IDRegistry.genBlockID("rp_smelter");
Block.createBlock("rp_smelter", [
	{name: "Smelter", texture: [["rp_smelter", 0], ["rp_smelter", 0], ["rp_smelter_side", 0], ["rp_smelter_front", 0], ["rp_smelter_side", 0], ["rp_smelter_side", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_smelter, "stone", 1);
Block.setDestroyLevel(BlockID.rp_smelter, 1);

TileRenderer.setStandartModel(BlockID.rp_smelter, [["rp_smelter", 0], ["rp_smelter", 0], ["rp_smelter_side", 0], ["rp_smelter_front", 0], ["rp_smelter_side", 0], ["rp_smelter_side", 0]], true);
TileRenderer.registerRotationModel(BlockID.rp_smelter, 0, [["rp_smelter", 0], ["rp_smelter", 0], ["rp_smelter_side", 0], ["rp_smelter_front", 0], ["rp_smelter_side", 0], ["rp_smelter_side", 0]]);
TileRenderer.registerRotationModel(BlockID.rp_smelter, 4, [["rp_smelter", 0], ["rp_smelter", 0], ["rp_smelter_side", 0], ["rp_smelter_front", 1], ["rp_smelter_side", 0], ["rp_smelter_side", 0]]);

Recipes.addShaped({id: BlockID.rp_smelter, count: 1, data: 0}, [
	"xxx",
	"x x",
	"xxx"
], ['x', 45, -1]);


Callback.addCallback("PreLoaded", function() {
	// rp items
	SmelterRecipes.addRecipe({id: ItemID.ingotRed, count: 1}, [{id: 265, count: 1}, {id: 331, count: 4}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotRed, count: 1}, [{id: ItemID.ingotCopper, count: 1}, {id: 331, count: 4}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBlue, count: 1}, [{id: ItemID.ingotSilver, count: 1}, {id: ItemID.nikolite, count: 4}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 4}, [{id: ItemID.ingotTin, count: 1}, {id: ItemID.ingotCopper, count: 3}]);
	SmelterRecipes.addRecipe({id: ItemID.siliconBoule, count: 1}, [{id: 12, count: 8}, {id: 263, count: 8}]);
	SmelterRecipes.addRecipe({id: ItemID.waferRed, count: 1}, [{id: ItemID.waferSilicon, count: 1}, {id: 331, count: 4}]);
	SmelterRecipes.addRecipe({id: ItemID.waferBlue, count: 1}, [{id: ItemID.waferSilicon, count: 1}, {id: ItemID.nikolite, count: 4}]);

	// tools
	SmelterRecipes.addRecipe({id: 265, count: 1}, [{id: 256, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 3}, [{id: 257, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 3}, [{id: 258, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 2}, [{id: 267, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 2}, [{id: 292, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 2}, [{id: 359, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 3}, [{id: ItemID.sickleIron, count: 1}]);

	SmelterRecipes.addRecipe({id: 266, count: 2}, [{id: 283, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 1}, [{id: 284, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 3}, [{id: 285, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 3}, [{id: 286, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 2}, [{id: 294, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 3}, [{id: ItemID.sickleGold, count: 1}]);

	// armor
	SmelterRecipes.addRecipe({id: 265, count: 5}, [{id: 306, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 8}, [{id: 307, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 7}, [{id: 308, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 4}, [{id: 309, count: 1}]);

	SmelterRecipes.addRecipe({id: 266, count: 5}, [{id: 314, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 8}, [{id: 315, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 7}, [{id: 316, count: 1}]);
	SmelterRecipes.addRecipe({id: 266, count: 4}, [{id: 317, count: 1}]);

	// other
	SmelterRecipes.addRecipe({id: 265, count: 3}, [{id: 66, count: 8}]);
	SmelterRecipes.addRecipe({id: 265, count: 3}, [{id: 101, count: 8}]);
	SmelterRecipes.addRecipe({id: 265, count: 31}, [{id: 145, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 4}, [{id: 167, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 3}, [{id: 325, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 5}, [{id: 328, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 6}, [{id: 330, count: 1}]);
	SmelterRecipes.addRecipe({id: 265, count: 7}, [{id: 380, count: 1}]);
});

// mod compatibility
ModAPI.addAPICallback("ICore", function(api) {
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 2}, [{id: ItemID.bronzeSword, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 1}, [{id: ItemID.bronzeShovel, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 3}, [{id: ItemID.bronzePickaxe, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 3}, [{id: ItemID.bronzeAxe, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 2}, [{id: ItemID.bronzeHoe, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 6}, [{id: ItemID.wrenchBronze, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 5}, [{id: ItemID.bronzeHelmet, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 8}, [{id: ItemID.bronzeChestplate, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 7}, [{id: ItemID.bronzeLeggings, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 4}, [{id: ItemID.bronzeBoots, count: 1}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotTin, count: 2}, [{id: ItemID.cellEmpty, count: 1}]);
});


var guiSmelter = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Smelter"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 636, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE},
		{type: "bitmap", x: 419, y: 150, bitmap: "fire_background", scale: GUI_SCALE}
	],
	
	elements: {
		"progressScale": {type: "scale", x: 636, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE},
		"burningScale": {type: "scale", x: 419, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_SCALE},
		"slotSource1": {type: "slot", x: 502, y: 112},
		"slotSource2": {type: "slot", x: 562, y: 112},
		"slotSource3": {type: "slot", x: 502, y: 172},
		"slotSource4": {type: "slot", x: 562, y: 172},
		"slotFuel": {type: "slot", x: 410, y: 200, isValid: function(id, count, data) {
			return Recipes.getFuelBurnDuration(id, data) > 0;
		}},
		"slotResult": {type: "slot", x: 720, y: 142},
	}
});

Callback.addCallback("LevelLoaded", function() {
	MachineRegistry.updateGuiHeader(guiSmelter, "Smelter");
});


MachineRegistry.registerPrototype(BlockID.rp_smelter, {
	defaultValues: {
		progress: 0,
		burn: 0,
		burnMax: 0,
		isActive: false
	},
	
	getGuiScreen: function() {
		return guiSmelter;
	},
	
	getTransportSlots: function() {
		return {input: ["slotSource1", "slotSource2", "slotSource3", "slotSource4", "slotFuel"], output: ["slotResult"]};
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
		
		if (this.data.burn > 0) {
			this.data.burn--;
		}
		
		var recipe = SmelterRecipes.getRecipe(sourceItems);
		if (recipe) {
			var resultSlot = this.container.getSlot("slotResult");
			if (resultSlot.id == recipe.result.id && resultSlot.count + recipe.result.count <= 64 || resultSlot.id == 0) {
				if (this.data.burn == 0) {
					this.data.burn = this.data.burnMax = this.getFuel("slotFuel");
				}
				if (this.data.burn > 0 && this.data.progress++ >= 200) {
					SmelterRecipes.performRecipe(recipe, this.container);
					this.data.progress = 0;
				}
			}
		} else {
			this.data.progress = 0;
		}
		
		this.setActive(this.data.burn > 0);
		if (this.data.burn == 0) {
			this.data.progress = 0;
		}
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("progressScale", this.data.progress / 200);
	},
	
	getFuel: function(slotName) {
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0) {
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn) {
				if (LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
					var empty = LiquidRegistry.getEmptyItem(fuelSlot.id, fuelSlot.data);
					fuelSlot.id = empty.id;
					fuelSlot.data = empty.data;
					return burn;
				}
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				return burn;
			}
		}
		return 0;
	},
}, true);

TileRenderer.setRotationPlaceFunction(BlockID.rp_smelter);

StorageInterface.createInterface(BlockID.rp_smelter, {
	slots: {
		"slotFuel": {input: true, isValid: function(item, side) {return side > 1}},
		"slotSource1": {input: true, isValid: function(item, side) {return side == 1}},
		"slotSource2": {input: true, isValid: function(item, side) {return side == 1}},
		"slotSource3": {input: true, isValid: function(item, side) {return side == 1}},
		"slotSource4": {input: true, isValid: function(item, side) {return side == 1}},
		"slotResult": {output: true}
	}
});