IDRegistry.genBlockID("blockCopper");
Block.createBlock("blockCopper", [
	{name: "Copper Block", texture: [["block_copper", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockCopper, "stone", 2, true);
Block.setDestroyLevel("blockCopper", 2);
Block.setDestroyTime(BlockID.blockCopper, 5);
ToolLib.addBlockDropOnExplosion("blockCopper");

IDRegistry.genBlockID("blockTin");
Block.createBlock("blockTin", [
	{name: "Tin Block", texture: [["block_tin", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockTin, "stone", 2, true);
Block.setDestroyLevel("blockTin", 2);
Block.setDestroyTime(BlockID.blockTin, 5);
ToolLib.addBlockDropOnExplosion("blockTin");

IDRegistry.genBlockID("blockSilver");
Block.createBlock("blockSilver", [
	{name: "Silver Block", texture: [["block_silver", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockSilver, "stone", 3, true);
Block.setDestroyLevel("blockSilver", 3);
Block.setDestroyTime(BlockID.blockSilver, 5);
ToolLib.addBlockDropOnExplosion("blockSilver");


IDRegistry.genBlockID("blockNikolite");
Block.createBlock("blockNikolite", [
	{name: "Nikolite Block", texture: [["block_nikolite", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockNikolite, "stone", 3, true);
Block.setDestroyLevel("blockNikolite", 3);
Block.setDestroyTime(BlockID.blockNikolite, 5);
ToolLib.addBlockDropOnExplosion("blockNikolite");


IDRegistry.genBlockID("blockRuby");
Block.createBlock("blockRuby", [
	{name: "Ruby Block", texture: [["block_ruby", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockRuby, "stone", 3, true);
Block.setDestroyLevel("blockRuby", 3);
Block.setDestroyTime(BlockID.blockRuby, 5);
ToolLib.addBlockDropOnExplosion("blockRuby");

IDRegistry.genBlockID("blockSapphire");
Block.createBlock("blockSapphire", [
	{name: "Sapphire Block", texture: [["block_sapphire", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockSapphire, "stone", 3, true);
Block.setDestroyLevel("blockSapphire", 3);
Block.setDestroyTime(BlockID.blockSapphire, 5);
ToolLib.addBlockDropOnExplosion("blockSapphire");

IDRegistry.genBlockID("blockGreenSapphire");
Block.createBlock("blockGreenSapphire", [
	{name: "Green Sapphire Block", texture: [["block_green_sapphire", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockGreenSapphire, "stone", 3, true);
Block.setDestroyLevel("blockGreenSapphire", 3);
Block.setDestroyTime(BlockID.blockGreenSapphire, 5);
ToolLib.addBlockDropOnExplosion("blockGreenSapphire");


Item.addCreativeGroup("blockResource", Translation.translate("Mineral Blocks"), [
	BlockID.blockCopper,
	BlockID.blockTin,
	BlockID.blockSilver,
	BlockID.blockTungsten,
	BlockID.blockNikolite,
	BlockID.blockRuby,
	BlockID.blockSapphire,
	BlockID.blockGreenSapphire
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.blockCopper, count: 1, data: 0}, [
		"xxx",
		"xxx",
		"xxx"
	], ['x', ItemID.ingotCopper, 0]);
	
	Recipes.addShaped({id: BlockID.blockTin, count: 1, data: 0}, [
		"xxx",
		"xxx",
		"xxx"
	], ['x', ItemID.ingotTin, 0]);
	
	Recipes.addShaped({id: BlockID.blockSilver, count: 1, data: 0}, [
		"xxx",
		"xxx",
		"xxx"
	], ['x', ItemID.ingotSilver, 0]);
	
	Recipes.addShaped({id: BlockID.blockNikolite, count: 1, data: 0}, [
		"xxx",
		"xxx",
		"xxx"
	], ['x', ItemID.nikolite, 0]);
	
	Recipes.addShaped({id: BlockID.blockSapphire, count: 1, data: 0}, [
		"xxx",
		"xxx",
		"xxx"
	], ['x', ItemID.gemSapphire, 0]);
	
	Recipes.addShaped({id: BlockID.blockGreenSapphire, count: 1, data: 0}, [
		"xxx",
		"xxx",
		"xxx"
	], ['x', ItemID.gemGreenSapphire, 0]);
	
	Recipes.addShaped({id: BlockID.blockRuby, count: 1, data: 0}, [
		"xxx",
		"xxx",
		"xxx"
	], ['x', ItemID.gemRuby, 0]);
	
	Recipes.addShapeless({id: ItemID.ingotCopper, count: 9, data: 0}, [{id: BlockID.blockCopper, data: 0}]);
	Recipes.addShapeless({id: ItemID.ingotTin, count: 9, data: 0}, [{id: BlockID.blockTin, data: 0}]);
	Recipes.addShapeless({id: ItemID.ingotSilver, count: 9, data: 0}, [{id: BlockID.blockSilver, data: 0}]);
	Recipes.addShapeless({id: ItemID.nikolite, count: 9, data: 0}, [{id: BlockID.blockNikolite, data: 0}]);
	Recipes.addShapeless({id: ItemID.gemSapphire, count: 9, data: 0}, [{id: BlockID.blockSapphire, data: 0}]);
	Recipes.addShapeless({id: ItemID.gemGreenSapphire, count: 9, data: 0}, [{id: BlockID.blockGreenSapphire, data: 0}]);
	Recipes.addShapeless({id: ItemID.gemRuby, count: 9, data: 0}, [{id: BlockID.blockRuby, data: 0}]);
});
