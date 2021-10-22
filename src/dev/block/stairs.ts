function setModelAndShapeWithRotation(id: number, data: number, boxes: TileRenderer.BoxVertexes[]): void {
	for (let i = 0; i < 4; i++) {
		let newBoxes = [];
		for (let box of boxes) {
			newBoxes.push(TileRenderer.getRotatedBoxVertexes(box, i));
		}
		TileRenderer.setStaticModel(id, data + i, newBoxes);
		TileRenderer.setCollisionShape(id, data + i, newBoxes);
	}
}

function createStairs(stringID: string, defineData: Block.BlockVariation[], blockType: string | Block.SpecialType): void {
	const numericID = IDRegistry.genBlockID(stringID);
	Block.createBlock(stringID, defineData, blockType);
	Block.registerPlaceFunction(numericID, function(coords, item, block, player, region) {
		const place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
		let data = (BlockRegistry.getBlockRotation(player)^1) - 2;
		if (coords.side == 0 || coords.side >= 2 && coords.vec.y - coords.y >= 0.5) data += 4;
		region.setBlock(place.x, place.y, place.z, item.id, data);
		//World.playSound(place.x, place.y, place.z, placeSound || "dig.stone", 1, 0.8);
		return place;
	});
	setModelAndShapeWithRotation(numericID, 0, [
		[0, 0, 0, 1, 0.5, 1],
		[0, 0.5, 0, 1, 1, 0.5]
	]);
	setModelAndShapeWithRotation(numericID, 4, [
		[0, 0, 0, 1, 0.5, 0.5],
		[0, 0.5, 0, 1, 1, 1]
	]);
}

Block.createSpecialType({
	base: 1,
	destroytime: 1.5,
	explosionres: 100,
	renderlayer: 3,
	translucency: 0,
	sound: "stone"
}, "basalt_stairs");

createStairs("basaltStairs", [
	{name: "Basalt Stairs", texture: [["rp_basalt", 0]], inCreative: true}
], "basalt_stairs");
ToolAPI.registerBlockMaterial(BlockID.basaltStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("basaltStairs", 1);

createStairs("basaltCobbleStairs", [
	{name: "Basalt Cobble Stairs", texture: [["rp_basalt_cobble", 0]], inCreative: true}
], "basalt_slab");
ToolAPI.registerBlockMaterial(BlockID.basaltCobbleStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("basaltCobbleStairs", 1);

createStairs("basaltBrickStairs", [
	{name: "Basalt Brick Stairs", texture: [["rp_basalt_brick", 0]], inCreative: true}
], "basalt_slab");
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

createStairs("marbleStairs", [
	{name: "Marble Stairs", texture: [["rp_marble", 0]], inCreative: true}
], "marble_stairs");
ToolAPI.registerBlockMaterial(BlockID.marbleBrickStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("marbleBrickStairs", 1);

createStairs("marbleBrickStairs", [
	{name: "Marble Brick Stairs", texture: [["rp_marble_brick", 0]], inCreative: true}
], "marble_stairs");
ToolAPI.registerBlockMaterial(BlockID.marbleBrickStairs, "stone", 1, true);
BlockRegistry.setDestroyLevel("marbleBrickStairs", 1);

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
