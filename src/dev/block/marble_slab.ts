/// <reference path="type/BlockSlab.ts" />

BlockSlab.createBlocks("marbleSlab", "doubleMarbleSlab", [
	{name: "Marble Slab", texture: [["rp_marble", 0]], inCreative: true},
	{name: "Marble Brick Slab", texture: [["rp_marble_brick", 0]], inCreative: true},
], "stone_slab");

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
      item: "block:marbleBrick"
    }
  ],
  result: {
    item: "block:marbleSlab",
    data: 1,
    count: 2
  }
});
