IDRegistry.genBlockID("rp_lamp");
Block.createBlock("rp_lamp", [
	{name: "White Lamp", texture: [["rp_lamp", 0]], inCreative: true},
	{name: "Orange Lamp", texture: [["rp_lamp", 1]], inCreative: true},
	{name: "Magenta Lamp", texture: [["rp_lamp", 2]], inCreative: true},
	{name: "Light Blue Lamp", texture: [["rp_lamp", 3]], inCreative: true},
	{name: "Yellow Lamp", texture: [["rp_lamp", 4]], inCreative: true},
	{name: "Lime Lamp", texture: [["rp_lamp", 5]], inCreative: true},
	{name: "Pink Lamp", texture: [["rp_lamp", 6]], inCreative: true},
	{name: "Gray Lamp", texture: [["rp_lamp", 7]], inCreative: true},
	{name: "Light Gray Lamp", texture: [["rp_lamp", 8]], inCreative: true},
	{name: "Cyan Lamp", texture: [["rp_lamp", 9]], inCreative: true},
	{name: "Purple Lamp", texture: [["rp_lamp", 10]], inCreative: true},
	{name: "Blue Lamp", texture: [["rp_lamp", 11]], inCreative: true},
	{name: "Brown Lamp", texture: [["rp_lamp", 12]], inCreative: true},
	{name: "Green Lamp", texture: [["rp_lamp", 13]], inCreative: true},
	{name: "Red Lamp", texture: [["rp_lamp", 14]], inCreative: true},
	{name: "Black Lamp", texture: [["rp_lamp", 15]], inCreative: true}
], "opaque");
Block.setDestroyTime(BlockID.rp_lamp, 2);

IDRegistry.genBlockID("rp_lamp_inverted");
Block.createBlock("rp_lamp_inverted", [
	{name: "White Inverted Lamp", texture: [["rp_lamp_on", 0]], inCreative: true},
	{name: "Orange Inverted Lamp", texture: [["rp_lamp_on", 1]], inCreative: true},
	{name: "Magenta Inverted Lamp", texture: [["rp_lamp_on", 2]], inCreative: true},
	{name: "Light Blue Inverted Lamp", texture: [["rp_lamp_on", 3]], inCreative: true},
	{name: "Yellow Inverted Lamp", texture: [["rp_lamp_on", 4]], inCreative: true},
	{name: "Lime Inverted Lamp", texture: [["rp_lamp_on", 5]], inCreative: true},
	{name: "Pink Inverted Lamp", texture: [["rp_lamp_on", 6]], inCreative: true},
	{name: "Gray Inverted Lamp", texture: [["rp_lamp_on", 7]], inCreative: true},
	{name: "Light Gray Inverted Lamp", texture: [["rp_lamp_on", 8]], inCreative: true},
	{name: "Cyan Inverted Lamp", texture: [["rp_lamp_on", 9]], inCreative: true},
	{name: "Purple Inverted Lamp", texture: [["rp_lamp_on", 10]], inCreative: true},
	{name: "Blue Inverted Lamp", texture: [["rp_lamp_on", 11]], inCreative: true},
	{name: "Brown Inverted Lamp", texture: [["rp_lamp_on", 12]], inCreative: true},
	{name: "Green Inverted Lamp", texture: [["rp_lamp_on", 13]], inCreative: true},
	{name: "Red Inverted Lamp", texture: [["rp_lamp_on", 14]], inCreative: true},
	{name: "Black Inverted Lamp", texture: [["rp_lamp_on", 15]], inCreative: true}
], {
	solid: true,
	destroytime: 2,
	explosionres: 5,
	lightlevel: 15,
	renderlayer: 2
});


Item.addCreativeGroup("rp_lamp", Translation.translate("Lamps"), [
	BlockID.rp_lamp,
]);

Item.addCreativeGroup("rp_lamp_inverted", Translation.translate("Inverted Lamps"), [
	BlockID.rp_lamp_inverted,
]);

Block.registerDropFunction("rp_lamp", function(coords, blockID, blockData, level) {
	return [];
});
Block.registerDropFunction("rp_lamp_inverted", function(coords, blockID, blockData, level) {
	return [];
});

Callback.addCallback("PreLoaded", function() {
	for (var i = 0; i < 16; i++) {
		Recipes.addShaped({id: BlockID.rp_lamp, count: 1, data: i}, [
			"gxg",
			"gxg",
			"grg",
		], ['x', ItemID.lumar, i, 'g', 102, -1, 'r', 331, 0]);
		
		Recipes.addShaped({id: BlockID.rp_lamp_inverted, count: 1, data: i}, [
			"gxg",
			"gxg",
			"grg",
		], ['x', ItemID.lumar, i, 'g', 102, -1, 'r', 76, 0]);
	}
});

TileEntity.registerPrototype(BlockID.rp_lamp, {
	defaultValues: {
		inverted: false,
	},
	
	redstone: function(signal) {
		var x = this.x, y = this.y, z = this.z;
		if (!this.data.inverted && signal.power) {
			this.selfDestroy();
			var data = World.getBlock(x, y, z).data;
			World.setBlock(x, y, z, BlockID.rp_lamp_inverted, data);
			var tile = World.addTileEntity(x, y, z);
			tile.data.inverted = false;
		}
		if (this.data.inverted && !signal.power) {
			this.selfDestroy();
			var data = World.getBlock(x, y, z).data;
			World.setBlock(x, y, z, BlockID.rp_lamp_inverted, data);
			var tile = World.addTileEntity(x, y, z);
			tile.data.inverted = true;
		}
	},
	
	destroyBlock: function(coords, player) {
		var blockID = this.data.inverted ? BlockID.rp_lamp_inverted : BlockID.rp_lamp;
		var blockData = World.getBlockData(coords.x, coords.y, coords.z);
		World.drop(coords.x + .5, coords.y + .5, coords.z + .5, blockID, 1, blockData);
	}
});

TileEntity.registerPrototype(BlockID.rp_lamp_inverted, {
	defaultValues: {
		inverted: true,
	},
	
	redstone: function(signal) {
		var x = this.x, y = this.y, z = this.z;
		if (!this.data.inverted && !signal.power) {
			this.selfDestroy();
			var data = World.getBlockData(x, y, z);
			World.setBlock(x, y, z, BlockID.rp_lamp, data);
			var tile = World.addTileEntity(x, y, z);
			tile.data.inverted = false;
		}
		if (this.data.inverted && signal.power) {
			this.selfDestroy();
			var data = World.getBlockData(x, y, z);
			World.setBlock(x, y, z, BlockID.rp_lamp, data);
			var tile = World.addTileEntity(x, y, z);
			tile.data.inverted = true;
		}
	},
	
	destroyBlock: function(coords, player) {
		var blockID = this.data.inverted ? BlockID.rp_lamp_inverted : BlockID.rp_lamp;
		var blockData = World.getBlockData(coords.x, coords.y, coords.z);
		World.drop(coords.x + .5, coords.y + .5, coords.z + .5, blockID, 1, blockData);
	}
});

Block.registerPlaceFunction("rp_lamp", function(coords, item, block) {
	Game.prevent();
	var x = coords.relative.x
	var y = coords.relative.y
	var z = coords.relative.z
	block = World.getBlockID(x, y, z)
	if (GenerationUtils.isTransparentBlock(block)) {
		World.setBlock(x, y, z, item.id, item.data);
		World.addTileEntity(x, y, z);
	}
});

Block.registerPlaceFunction("rp_lamp_inverted", function(coords, item, block) {
	Game.prevent();
	var x = coords.relative.x
	var y = coords.relative.y
	var z = coords.relative.z
	block = World.getBlockID(x, y, z)
	if (GenerationUtils.isTransparentBlock(block)) {
		World.setBlock(x, y, z, item.id, item.data);
		World.addTileEntity(x, y, z);
	}
});
