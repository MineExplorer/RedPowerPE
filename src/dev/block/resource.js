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
	
	VanillaRecipe.addCraftingRecipe("ingot_copper", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockCopper" }
	  ],
	  result: {
	    item: "item:ingotCopper",
	    count: 9
	  }
	}, true);
	
	VanillaRecipe.addCraftingRecipe("ingot_tin", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockTin" }
	  ],
	  result: {
	    item: "item:ingotTin",
	    count: 9
	  }
	}, true);
	
	/*VanillaRecipe.addCraftingRecipe("ingot_bronze", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockBronze" }
	  ],
	  result: {
	    item: "item:ingotBronze",
	    count: 9
	  }
	}, true);*/
	
	VanillaRecipe.addCraftingRecipe("ingot_silver", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockSilver" }
	  ],
	  result: {
	    item: "item:ingotSilver",
	    count: 9
	  }
	}, true);
	
	VanillaRecipe.addCraftingRecipe("nikolite", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockNikolite" }
	  ],
	  result: {
	    item: "item:nikolite",
	    count: 9
	  }
	}, true);
	
	VanillaRecipe.addCraftingRecipe("gem_ruby", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockRuby" }
	  ],
	  result: {
	    item: "item:gemRuby",
	    count: 9
	  }
	}, true);
	
	VanillaRecipe.addCraftingRecipe("gem_sapphire", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockSapphire" }
	  ],
	  result: {
	    item: "item:gemSapphire",
	    count: 9
	  }
	}, true);
	
	VanillaRecipe.addCraftingRecipe("gem_green_sapphire", {
	  type: "shapeless",
	  ingredients: [
	    { item: "block:blockGreenSapphire" }
	  ],
	  result: {
	    item: "item:gemGreenSapphire",
	    count: 9
	  }
	}, true);
});
