BlockRegistry.createBlock("blockCopper", [
	{name: "Copper Block", texture: [["block_copper", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockCopper, "stone", 2, true);
BlockRegistry.setDestroyLevel("blockCopper", 2);
Block.setDestroyTime(BlockID.blockCopper, 5);

BlockRegistry.createBlock("blockTin", [
	{name: "Tin Block", texture: [["block_tin", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockTin, "stone", 2, true);
BlockRegistry.setDestroyLevel("blockTin", 2);
Block.setDestroyTime(BlockID.blockTin, 5);

BlockRegistry.createBlock("blockSilver", [
	{name: "Silver Block", texture: [["block_silver", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockSilver, "stone", 3, true);
BlockRegistry.setDestroyLevel("blockSilver", 3);
Block.setDestroyTime(BlockID.blockSilver, 5);

BlockRegistry.createBlock("blockNikolite", [
	{name: "Nikolite Block", texture: [["block_nikolite", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockNikolite, "stone", 3, true);
BlockRegistry.setDestroyLevel("blockNikolite", 3);
Block.setDestroyTime(BlockID.blockNikolite, 5);

BlockRegistry.createBlock("blockRuby", [
	{name: "Ruby Block", texture: [["block_ruby", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockRuby, "stone", 3, true);
BlockRegistry.setDestroyLevel("blockRuby", 3);
Block.setDestroyTime(BlockID.blockRuby, 5);

BlockRegistry.createBlock("blockSapphire", [
	{name: "Sapphire Block", texture: [["block_sapphire", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockSapphire, "stone", 3, true);
BlockRegistry.setDestroyLevel("blockSapphire", 3);
Block.setDestroyTime(BlockID.blockSapphire, 5);

BlockRegistry.createBlock("blockGreenSapphire", [
	{name: "Green Sapphire Block", texture: [["block_green_sapphire", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockGreenSapphire, "stone", 3, true);
BlockRegistry.setDestroyLevel("blockGreenSapphire", 3);
Block.setDestroyTime(BlockID.blockGreenSapphire, 5);

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

Callback.addCallback("PostLoaded", function() {
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

	function addResourceUnpackRecipe(recipeName: string, blockID: string, itemID: string, count: number): void {
		VanillaRecipe.addCraftingRecipe(recipeName, {
			type: "shapeless",
			ingredients: [
			  { item: "block:" + blockID }
			],
			result: {
			  item: "item:" + itemID,
			  count: 9
			}
		}, true);
	}

	addResourceUnpackRecipe("ingot_copper", "blockCopper", "ingotCopper", 9);
	addResourceUnpackRecipe("ingot_tin", "blockTin", "ingotTin", 9);
	addResourceUnpackRecipe("ingot_silver", "blockSilver", "ingotSilver", 9);
	addResourceUnpackRecipe("nikolite", "blockNikolite", "nikolite", 9);
	addResourceUnpackRecipe("gem_ruby", "blockRuby", "gemRuby", 9);
	addResourceUnpackRecipe("gem_sapphire", "blockSapphire", "gemSapphire", 9);
	addResourceUnpackRecipe("gem_green_sapphire", "blockGreenSapphire", "gemGreenSapphire", 9);
});
