Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 2,
	explosionres: 100,
	lightopacity: 15,
	renderlayer: 2,
	translucency: 0,
	sound: "stone"
}, "basalt");

IDRegistry.genBlockID("rp_basalt");
Block.createBlock("rp_basalt", [
	{name: "Basalt", texture: [["rp_basalt", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.rp_basalt, "stone", 1, true);
BlockRegistry.registerDrop("rp_basalt", function(coords, blockID, blockData, level, enchant) {
  if (enchant.silk) {
    return [[BlockID.rp_basalt, 1, 0]];
  }
  return [[BlockID.basaltCobble, 1, 0]];
}, 1);

IDRegistry.genBlockID("basaltCobble");
Block.createBlock("basaltCobble", [
	{name: "Basalt Cobble", texture: [["rp_basalt_cobble", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltCobble, "stone", 1, true);
BlockRegistry.setDestroyLevel("basaltCobble", 1);

IDRegistry.genBlockID("basaltBrick");
Block.createBlock("basaltBrick", [
	{name: "Basalt Brick", texture: [["rp_basalt_brick", 0]], inCreative: true},
	{name: "Chiseled Basalt Brick", texture: [["rp_basalt_chiseled", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltBrick, "stone", 1, true);
BlockRegistry.setDestroyLevel("basaltBrick", 1);

IDRegistry.genBlockID("basaltPaver");
Block.createBlock("basaltPaver", [
	{name: "Basalt Paver", texture: [["rp_basalt_paver", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltPaver, "stone", 1, true);
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

VanillaRecipe.addCraftingRecipe("basalt_brick", {
  type: "shaped",
  pattern: [
    "XX",
    "XX"
  ],
  key: {
    "X": { item: "block:rp_basalt" }
  },
  result: {
    item: "block:basaltBrick",
    data: 0,
    count: 4
  }
}, true);

VanillaRecipe.addCraftingRecipe("basalt_paver", {
  type: "shapeless",
  tags: ["crafting_table", "stonecutter"],
  ingredients: [
    { item: "block:rp_basalt" }
  ],
  result: {
    item: "block:basaltPaver"
  }
}, true);

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
