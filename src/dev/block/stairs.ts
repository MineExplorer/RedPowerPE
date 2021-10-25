Block.createSpecialType({
	base: 1,
	destroytime: 1.5,
	explosionres: 100,
	renderlayer: 3,
	translucency: 0,
	sound: "stone"
}, "basalt_stairs");

BlockRegistry.createStairs("basaltStairs", [
	{name: "Basalt Stairs", texture: [["rp_basalt", 0]], inCreative: true}
], "basalt_stairs");
ToolAPI.registerBlockMaterial(BlockID.basaltStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("basaltStairs", 1);

BlockRegistry.createStairs("basaltCobbleStairs", [
	{name: "Basalt Cobble Stairs", texture: [["rp_basalt_cobble", 0]], inCreative: true}
], "basalt_stairs");
ToolAPI.registerBlockMaterial(BlockID.basaltCobbleStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("basaltCobbleStairs", 1);

BlockRegistry.createStairs("basaltBrickStairs", [
	{name: "Basalt Brick Stairs", texture: [["rp_basalt_brick", 0]], inCreative: true}
], "basalt_stairs");
ToolAPI.registerBlockMaterial(BlockID.basaltBrickStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("basaltBrickStairs", 1);

Block.createSpecialType({
	base: 1,
	destroytime: 1.5,
	explosionres: 30,
	renderlayer: 3,
	translucency: 0,
	sound: "stone"
}, "marble_stairs");

BlockRegistry.createStairs("marbleStairs", [
	{name: "Marble Stairs", texture: [["rp_marble", 0]], inCreative: true}
], "marble_stairs");
ToolAPI.registerBlockMaterial(BlockID.marbleStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("marbleStairs", 1);

BlockRegistry.createStairs("marbleBrickStairs", [
	{name: "Marble Brick Stairs", texture: [["rp_marble_brick", 0]], inCreative: true}
], "marble_stairs");
ToolAPI.registerBlockMaterial(BlockID.marbleBrickStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("marbleBrickStairs", 1);

Item.addCreativeGroup("rpStairs", Translation.translate("Stairs"), [
	BlockID.basaltStairs,
	BlockID.basaltCobbleStairs,
	BlockID.basaltBrickStairs,
	BlockID.marbleStairs,
	BlockID.marbleBrickStairs
]);

Recipes.addShaped({id: BlockID.basaltStairs, count: 4, data: 1}, [
	"x  ",
	"xx ",
	"xxx"
], ['x', BlockID.rp_basalt, 0]);

Recipes.addShaped({id: BlockID.basaltCobbleStairs, count: 4, data: 1}, [
	"x  ",
	"xx ",
	"xxx"
], ['x', BlockID.basaltCobble, 0]);

Recipes.addShaped({id: BlockID.basaltBrickStairs, count: 4, data: 1}, [
	"x  ",
	"xx ",
	"xxx"
], ['x', BlockID.basaltBrick, 0]);

Recipes.addShaped({id: BlockID.marbleStairs, count: 4, data: 1}, [
	"x  ",
	"xx ",
	"xxx"
], ['x', BlockID.rp_marble, 0]);

Recipes.addShaped({id: BlockID.marbleBrickStairs, count: 4, data: 1}, [
	"x  ",
	"xx ",
	"xxx"
], ['x', BlockID.marbleBrick, 0]);

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_cobble_stairs", {
	ingredients: [
	  {
		item: "block:basaltCobble"
	  }
	],
	result: {
	  item: "block:basaltCobbleStairs"
	}
});

VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_brick_stairs", {
	ingredients: [
	  {
		item: "block:basaltBrick",
		data: 0
	  }
	],
	result: {
	  item: "block:basaltBrickStairs"
	}
});

VanillaRecipe.addStonecutterRecipe("stonecutter_marble_brick_stairs", {
	ingredients: [
	  {
		item: "block:marbleBrick"
	  }
	],
	result: {
	  item: "block:marbleBrickStairs"
	}
});
