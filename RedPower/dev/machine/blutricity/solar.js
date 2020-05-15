IDRegistry.genBlockID("rpSolar");
Block.createBlock("rpSolar", [
	{name: "Solar Panel", texture: [["rp_machine_bottom", 0], ["rp_solar", 0], ["rp_solar", 1], ["rp_solar", 1], ["rp_solar", 1], ["rp_solar", 1]], inCreative: true}
], {renderlayer: 2});
ToolAPI.registerBlockMaterial(BlockID.rpSolar, "stone", 1);
Block.setDestroyLevel("rpSolar", 1);
Block.setBlockShape(BlockID.rpSolar, {x: 0, y: 0, z: 0}, {x: 1, y: 0.25, z: 1});

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: BlockID.rpSolar, count: 1, data: 0}, [
		"ooo",
		"oxo",
		"ooo"
	], ['x', ItemID.ingotBlue, 0, 'o', ItemID.waferBlue, 0]);
});


MachineRegistry.registerPrototype(BlockID.rpSolar, {
	isGenerator: function() {
		return true;
	},
	
	energyTick: function(type, src){
		if(World.getBlockID(this.x, this.y + 1, this.z) != BlockID.luminator && World.getLightLevel(this.x, this.y + 1, this.z) == 15){
			src.add(1);
		}
	}
});
