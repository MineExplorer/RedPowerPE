IDRegistry.genBlockID("basaltSlab");
IDRegistry.genBlockID("doubleBasaltSlab");

BaseBlocks.createSlab("basaltSlab", [
  {name: "Basalt Slab", texture: [["rp_basalt", 0]], inCreative: true},
  {name: "Basalt Cobble Slab", texture: [["rp_basalt_cobble", 0]], inCreative: true},
  {name: "Basalt Brick Slab", texture: [["rp_basalt_brick", 0]], inCreative: true}
], {
	base: 1,
	destroytime: 1.5,
	explosionres: 100,
	renderlayer: 2,
	translucency: 0
}, BlockID.doubleBasaltSlab);
ToolAPI.registerBlockMaterial(BlockID.basaltSlab, "stone", 1, true);

BaseBlocks.createDoubleSlab("doubleBasaltSlab", [
	{name: "Basalt Slab", texture: [["rp_basalt", 0]], inCreative: false},
	{name: "Basalt Cobble Slab", texture: [["rp_basalt_cobble", 0]], inCreative: false},
	{name: "Basalt Brick Slab", texture: [["rp_basalt_brick", 0]], inCreative: false},
], "basalt", BlockID.basaltSlab);
ToolAPI.registerBlockMaterial(BlockID.doubleBasaltSlab, "stone", 1, true);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 0}, [
  "xxx"
], ['x', BlockID.rp_basalt, 0]);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 1}, [
	"xxx"
], ['x', BlockID.basaltCobble, 0]);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 2}, [
	"xxx"
], ['x', BlockID.basaltBrick, 0]);

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

