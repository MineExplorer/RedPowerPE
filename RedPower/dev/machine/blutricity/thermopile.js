IDRegistry.genBlockID("rpThermopile");
Block.createBlock("rpThermopile", [
	{name: "Thermopile", texture: [["rp_thermopile", 0], ["rp_thermopile", 0], ["rp_thermopile_side", 0], ["rp_thermopile_side", 1], ["rp_thermopile_side", 0], ["rp_thermopile_side", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.rpThermopile, "stone", 1);
Block.setDestroyLevel("rpThermopile", 1);

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: BlockID.rpThermopile, count: 1, data: 0}, [
		"cac",
		"oxo",
		"cac"
	], ['x', ItemID.ingotBlue, 0, 'o', ItemID.waferBlue, 0, 'a', 265, 0, 'c', ItemID.ingotCopper, 0]);
});

var blockHeatValues = {0: -0.25, 8: -1.5, 9: -1.5, 10: 2, 11: 2, 79: -2, 174: -2};

MachineRegistry.registerPrototype(BlockID.rpThermopile, {
	defaultValues: {
		cold: 0,
		heat: 0
	},
	
	isGenerator: function() {
		return true;
	},
	
	getHeat: function(x, z){
		var heat = blockHeatValues[World.getBlockID(x, this.y, z)] || 0;
		if(heat < 0) this.data.cold -= heat;
		else this.data.heat += heat;
	},
	
	energyTick: function(type, src){
		if(World.getThreadTime()%20==0){
			this.data.cold = 0;
			this.data.heat = 0;
			this.getHeat(this.x-1, this.z);
			this.getHeat(this.x+1, this.z);
			this.getHeat(this.x, this.z - 1);
			this.getHeat(this.x, this.z + 1);
			//Debug.m(Math.min(this.data.cold, this.data.heat)/8);
		}
		src.add(Math.min(this.data.cold, this.data.heat)/8);
	}
});
