BlockRegistry.createBlockType("basalt", {
	extends: "stone",
	destroyTime: 2,
	explosionResistance: 100
});

BlockRegistry.createBlock("rp_basalt", [
	{name: "Basalt", texture: [["rp_basalt", 0]], inCreative: true}
], "basalt");
BlockRegistry.setBlockMaterial(BlockID.rp_basalt, "stone", 1);
BlockRegistry.registerDrop("rp_basalt", function(coords, blockID, blockData, level, enchant) {
  if (enchant.silk) {
    return [[BlockID.rp_basalt, 1, 0]];
  }
  return [[BlockID.basaltCobble, 1, 0]];
}, 1);

BlockRegistry.createBlock("basaltCobble", [
	{name: "Basalt Cobble", texture: [["rp_basalt_cobble", 0]], inCreative: true}
], "basalt");
BlockRegistry.setBlockMaterial(BlockID.basaltCobble, "stone", 1);
BlockRegistry.setDestroyLevel("basaltCobble", 1);

BlockRegistry.createBlock("basaltBrick", [
	{name: "Basalt Brick", texture: [["rp_basalt_brick", 0]], inCreative: true},
	{name: "Chiseled Basalt Brick", texture: [["rp_basalt_chiseled", 0]], inCreative: true}
], "basalt");
BlockRegistry.setBlockMaterial(BlockID.basaltBrick, "stone", 1);
BlockRegistry.setDestroyLevel("basaltBrick", 1);

BlockRegistry.createBlock("basaltPaver", [
	{name: "Basalt Paver", texture: [["rp_basalt_paver", 0]], inCreative: true}
], "basalt");
BlockRegistry.setBlockMaterial(BlockID.basaltPaver, "stone", 1);
BlockRegistry.registerDrop("basaltPaver", function(coords, blockID, blockData, level, enchant) {
  if (enchant.silk) {
    return [[blockID, 1, 0]];
  }
  return [[BlockID.basaltCobble, 1, 0]];
}, 1);

Item.addCreativeGroup("basalt", Translation.translate("Basalt"), [
	BlockID.rp_basalt,
	BlockID.basaltCobble,
	BlockID.basaltBrick,
	BlockID.basaltPaver,
]);

Recipes.addFurnace(BlockID.basaltCobble, BlockID.rp_basalt, 0);

Recipes.addShaped({id: BlockID.basaltBrick, count: 4, data: 0}, [
    "XX",
    "XX"
], ['X', BlockID.rp_basalt, 0]);

Recipes.addShapeless({id: BlockID.basaltPaver, count: 1, data: 0}, [{id: BlockID.rp_basalt, data: 0}]);

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_paver", {
  ingredients: [
    { item: "block:rp_basalt" }
  ],
  result: {
    item: "block:basaltPaver"
  }
});

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_brick", {
  ingredients: [
    { item: "block:rp_basalt" }
  ],
  result: {
    item: "block:basaltBrick",
    data: 0
  }
});

VanillaRecipe.addStonecutterRecipe("stonecutter_chiseled_basalt_brick", {
  ingredients: [
    { item: "block:rp_basalt" }
  ],
  result: {
    item: "block:basaltBrick",
    data: 1
  }
});
