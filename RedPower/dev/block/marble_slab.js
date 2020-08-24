Block.createSpecialType({
	base: 1,
	destroytime: 1.5,
	explosionres: 30,
	renderlayer: 2,
	translucency: 0,
	sound: "stone"
}, "stone_slab");

IDRegistry.genBlockID("marbleSlab");
Block.createBlock("marbleSlab", [
	{name: "Marble Slab", texture: [["rp_marble", 0]], inCreative: true},
	{name: "Marble Brick Slab", texture: [["rp_marble_brick", 0]], inCreative: true},
	{name: "Marble Slab", texture: [["rp_marble", 0]], inCreative: false},
	{name: "Marble Brick Slab", texture: [["rp_marble_brick", 0]], inCreative: false}
], "stone_slab");
ToolAPI.registerBlockMaterial(BlockID.marbleSlab, "stone", 1, true);
Block.registerDropFunction("marbleSlab", function(coords, blockID, blockData, level) {
	if (level > 0) {
		return [[BlockID.marbleSlab, 1, blockData%2]];
	}
	return [];
});
ToolLib.addBlockDropOnExplosion("marbleSlab");

IDRegistry.genBlockID("doubleMarbleSlab");
Block.createBlock("doubleMarbleSlab", [
	{name: "Marble Slab", texture: [["rp_marble", 0]], inCreative: false},
	{name: "Marble Brick Slab", texture: [["rp_marble_brick", 0]], inCreative: false},
], "stone");
ToolAPI.registerBlockMaterial(BlockID.doubleMarbleSlab, "stone", 1, true);
Block.registerDropFunction("doubleMarbleSlab", function(coords, blockID, blockData, level) {
	if (level > 0) {
		return [[BlockID.marbleSlab, 1, blockData], [BlockID.marbleSlab, 1, blockData]];
	}
	return [];
});
ToolLib.addBlockDropOnExplosion("doubleMarbleSlab");
TileRenderer.setSlabShape(BlockID.marbleSlab, 2);
TileRenderer.setSlabPlaceFunction(BlockID.marbleSlab, 2, BlockID.doubleMarbleSlab);

Item.addCreativeGroup("rpSlabs", Translation.translate("Slabs"), [
	BlockID.basaltSlab,
	BlockID.marbleSlab
]);

Recipes.addShaped({id: BlockID.marbleSlab, count: 6, data: 0}, [
	"xxx"
], ['x', BlockID.rp_marble, 0]);

Recipes.addShaped({id: BlockID.marbleSlab, count: 6, data: 1}, [
	"xxx"
], ['x', BlockID.marbleBrick, 0]);

VanillaRecipe.addStonecutterRecipe("stonecutter_marble_slab", {
  ingredients: [
    { item: "block:rp_marble" }
  ],
  result: {
    item: "block:marbleSlab",
    data: 0,
    count: 2
  }
});

VanillaRecipe.addStonecutterRecipe("stonecutter_marble_brick_slab", {
  ingredients: [
    {
      item: "block:marbleBrick",
      data: 0
    }
  ],
  result: {
    item: "block:marbleSlab",
    data: 1,
    count: 2
  }
});
