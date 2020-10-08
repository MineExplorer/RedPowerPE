IDRegistry.genBlockID("rp_thermopile");
Block.createBlockWithRotation("rp_thermopile", [
	{name: "Thermopile", texture: [["rp_thermopile", 0], ["rp_thermopile", 0], ["rp_thermopile_side", 0], ["rp_thermopile_side", 1], ["rp_thermopile_side", 0], ["rp_thermopile_side", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_thermopile, "stone", 1);
Block.setDestroyLevel("rp_thermopile", 1);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.rp_thermopile, count: 1, data: 0}, [
		"cac",
		"oxo",
		"cac"
	], ['x', ItemID.ingotBlue, 0, 'o', ItemID.waferBlue, 0, 'a', 265, 0, 'c', ItemID.ingotCopper, 0]);
});

var blockHeatValues = {0: -0.25, 8: -1.5, 9: -1.5, 10: 2, 11: 2, 79: -2, 174: -2};

MachineRegistry.registerGenerator(BlockID.rp_thermopile, {
	defaultValues: {
		output: 0
	},

	getHeatValue: function(id) {
		return blockHeatValues[id] || 0;
	},
	
	getHeat: function(x, y, z) {
		var heat = this.getHeatValue(World.getBlockID(x, y, z));
		if (heat < 0) this.cold -= heat;
		else this.heat += heat;
	},
	
	energyTick: function(type, src) {
		if (World.getThreadTime() % 20 == 0) {
			this.cold = 0;
			this.heat = 0;
			this.getHeat(this.x - 1, this.y, this.z);
			this.getHeat(this.x + 1, this.y, this.z);
			this.getHeat(this.x, this.y, this.z - 1);
			this.getHeat(this.x, this.y, this.z + 1);
			this.data.output = Math.min(this.cold, this.heat) / 4;
			//Debug.m(this.data.output);
		}
		src.add(this.data.output);
	}
});
