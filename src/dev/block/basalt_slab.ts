BlockRegistry.createBlockType("stone_slab", {
	baseBlock: 1,
	destroyTime: 1.5,
	explosionResistance: 30,
	renderLayer: 3,
	translucency: 0,
	sound: "stone"
});

BlockRegistry.createBlockType("basalt_slab", {
	extends: "stone_slab",
	destroyTime: 2,
	explosionResistance: 100
});

BlockRegistry.createSlabs("basaltSlab", "doubleBasaltSlab", [
	{name: "Basalt Slab", texture: [["rp_basalt", 0]], inCreative: true},
	{name: "Basalt Cobble Slab", texture: [["rp_basalt_cobble", 0]], inCreative: true},
	{name: "Basalt Brick Slab", texture: [["rp_basalt_brick", 0]], inCreative: true},
	{name: "Basalt Paver Slab", texture: [["rp_basalt_paver", 0]], inCreative: true}
], "basalt_slab");

BlockRegistry.setBlockMaterial(BlockID.basaltSlab, "stone", 1);
BlockRegistry.setBlockMaterial(BlockID.doubleBasaltSlab, "stone", 1);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 0}, [
  "xxx"
], ['x', BlockID.rp_basalt, 0]);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 1}, [
	"xxx"
], ['x', BlockID.basaltCobble, 0]);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 2}, [
	"xxx"
], ['x', BlockID.basaltBrick, 0]);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 3}, [
	"xxx"
], ['x', BlockID.basaltPaver, 0]);

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_slab", {
  ingredients: [
    { item: "block:rp_basalt" }
  ],
  result: {
    item: "block:basaltSlab",
    data: 0,
    count: 2
  }
});

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_cobble_slab", {
  ingredients: [
    { item: "block:basaltCobble" }
  ],
  result: {
    item: "block:basaltSlab",
    data: 1,
    count: 2
  }
});

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_brick_slab", {
  ingredients: [
    {
      item: "block:basaltBrick",
      data: 0
    }
  ],
  result: {
    item: "block:basaltSlab",
    data: 2,
    count: 2
  }
});

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_paver_slab", {
  ingredients: [
    { item: "block:basaltPaver" }
  ],
  result: {
    item: "block:basaltSlab",
    data: 3,
    count: 2
  }
});
