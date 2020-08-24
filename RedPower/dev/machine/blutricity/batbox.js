IDRegistry.genBlockID("rp_batbox");
Block.createBlock("rp_batbox", [
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0]], inCreative: true},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 1], ["rp_batbox_side", 1], ["rp_batbox_side", 1], ["rp_batbox_side", 1]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 2], ["rp_batbox_side", 2], ["rp_batbox_side", 2], ["rp_batbox_side", 2]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 3], ["rp_batbox_side", 3], ["rp_batbox_side", 3], ["rp_batbox_side", 3]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 4], ["rp_batbox_side", 4], ["rp_batbox_side", 4], ["rp_batbox_side", 4]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 5], ["rp_batbox_side", 5], ["rp_batbox_side", 5], ["rp_batbox_side", 5]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 6], ["rp_batbox_side", 6], ["rp_batbox_side", 6], ["rp_batbox_side", 6]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 7], ["rp_batbox_side", 7], ["rp_batbox_side", 7], ["rp_batbox_side", 7]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 8], ["rp_batbox_side", 8], ["rp_batbox_side", 8], ["rp_batbox_side", 8]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_batbox, "stone", 1);
Block.registerDropFunction("rp_batbox", function(coords, blockID, blockData, level) {
	return [];
});

TileRenderer.setStandartModel(BlockID.rp_batbox, [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0]]);
for (var i = 1; i <= 8; i++) {
	TileRenderer.registerRenderModel(BlockID.rp_batbox, i, [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", i], ["rp_batbox_side", i], ["rp_batbox_side", i], ["rp_batbox_side", i]]);
}

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.rp_batbox, count: 1, data: 0}, [
		"xpx",
		"xax",
		"aba"
	], ['x', ItemID.btBattery, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0, 'p', 5, -1]);
});


var guiBatBox = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Battery Box"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	params: {       
		slot: "default_slot",
		invSlot: "default_slot"              
	},
	
	drawing: [
		{type: "background", color: android.graphics.Color.parseColor("#b3b3b3")},
		{type: "bitmap", x: 530, y: 75, bitmap: "bstorage_background", scale: GUI_SCALE},
	],
	
	elements: {
		"batteryIcon": {type: "image", x: 530 + 6*GUI_SCALE, y: 75 - 7*GUI_SCALE, bitmap: "battery_icon_off", scale: GUI_SCALE},
		"btScale": {type: "scale", x: 530 + GUI_SCALE, y: 75 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "bstorage_scale", scale: GUI_SCALE},
		"slot1": {type: "slot", x: 650, y: 80, isValid: function(id) {return ChargeItemRegistry.isValidItem(id, "Bu", 0);}},
		"slot2": {type: "slot", x: 650, y: 172, isValid: function(id) {return ChargeItemRegistry.isValidStorage(id, "Bu", 0);}},
	}
});

Callback.addCallback("LevelLoaded", function() {
	MachineRegistry.updateGuiHeader(guiBatBox, "Battery Box");
});


MachineRegistry.registerPrototype(BlockID.rp_batbox, {
	defaultValues: {
		data: 0
	},
		
	getGuiScreen: function() {
		return guiBatBox;
	},
	
	init: function() {
		var meta = Math.floor(this.data.energy/3000);
		if (meta) {
			this.data.meta = meta;
			TileRenderer.mapAtCoords(this.x, this.y, this.z, BlockID.rp_batbox, meta);
		}
	},
	
	tick: function() {
		var energyStorage = this.getEnergyStorage();
		
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slot2"), "Bu", energyStorage - this.data.energy, 1);
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot1"), "Bu", this.data.energy, 1);
		
		var meta = Math.floor(this.data.energy/3000);
		if (meta != this.data.meta) {
			this.data.meta = meta;
			if (meta) {
				TileRenderer.mapAtCoords(this.x, this.y, this.z, BlockID.rp_batbox, meta);
			}
			else {
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
				var content = this.container.getGuiContent();
				if (content) {
					
				}
			}
		}
		var content = this.container.getGuiContent();
		if (content) {
			if (this.data.energy == 24000) {
				content.elements.batteryIcon.bitmap = "battery_icon_on";
			}
			else {
				content.elements.batteryIcon.bitmap = "battery_icon_off";
			}
		}
		this.container.setScale("btScale", this.data.energy / energyStorage);
	},
	
	getEnergyStorage: function() {
		return 24000;
	},
	
	energyTick: function(type, src) {
		var TRANSFER = 25;
		this.data.energy += src.storage(Math.min(TRANSFER*4, this.getEnergyStorage() - this.data.energy), Math.min(TRANSFER, this.data.energy));
	},
	
	destroyBlock: function(coords, player) {
		BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
		var extra;
		if (this.data.energy > 0) {
			extra = new ItemExtraData();
			extra.putInt("energy", this.data.energy);
		}
		var blockData = Math.floor(this.data.energy / 3000);
		World.drop(coords.x, coords.y, coords.z, BlockID.rp_batbox, 1, blockData, extra);
	}
});


Block.registerPlaceFunction("rp_batbox", function(coords, item, block) {
	var x = coords.relative.x
	var y = coords.relative.y
	var z = coords.relative.z
	block = World.getBlockID(x, y, z)
	if (GenerationUtils.isTransparentBlock(block)) {
		World.setBlock(x, y, z, item.id, 0);
		var tile = World.addTileEntity(x, y, z);
		if (item.extra) {
			tile.data.energy = item.extra.getInt("energy") + 16;
		}
		else if (item.data == 8) {
			tile.data.energy = 24016;
		}
	}
});