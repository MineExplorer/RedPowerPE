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
Block.registerDropFunction("rp_basalt", function(coords, blockID, blockData, level, enchant) {
	if (level > 0) {
		if (enchant.silk) {
			return [[BlockID.rp_basalt, 1, 0]];
		}
		return [[BlockID.basaltCobble, 1, 0]];
	}
	return [];
}, 1);
ToolLib.addBlockDropOnExplosion("rp_basalt");

IDRegistry.genBlockID("basaltCobble");
Block.createBlock("basaltCobble", [
	{name: "Basalt Cobble", texture: [["rp_basalt_cobble", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltCobble, "stone", 1, true);
Block.setDestroyLevel("basaltCobble", 1);
ToolLib.addBlockDropOnExplosion("basaltCobble");

IDRegistry.genBlockID("basaltBrick");
Block.createBlock("basaltBrick", [
	{name: "Basalt Brick", texture: [["rp_basalt_brick", 0]], inCreative: true},
	{name: "Chiseled Basalt Brick", texture: [["rp_basalt_chiseled", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltBrick, "stone", 1, true);
Block.setDestroyLevel("basaltBrick", 1);
ToolLib.addBlockDropOnExplosion("basaltBrick");

IDRegistry.genBlockID("basaltPaver");
Block.createBlock("basaltPaver", [
	{name: "Basalt Paver", texture: [["rp_basalt_paver", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltPaver, "stone", 1, true);
Block.registerDropFunction("basaltPaver", function(coords, blockID, blockData, level, enchant) {
	if (level > 0) {
		if (enchant.silk) {
			return [[blockID, 1, 0]];
		}
		return [[BlockID.basaltCobble, 1, 0]];
	}
	return [];
}, 1);
ToolLib.addBlockDropOnExplosion("basaltPaver");

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


function genBasalt(random, x, y, z) {
	randY = 1 + random.nextFloat();
	randR = 7 + random.nextFloat()*3;
	r = Math.ceil(randR)
	h = r/Math.sqrt(randY)
	for (var xx = -r; xx <= r; xx++) {
		for (var yy = -h; yy <= h; yy++) {
			for (var zz = -r; zz <= r; zz++) {
				if (Math.sqrt(xx*xx + yy*yy*randY + zz*zz) < randR + random.nextFloat()/2) {
					id = World.getBlockID(x+xx, y+yy, z+zz)
					if (id==1 || id==3 || id==13 || id==16)
						World.setBlock(x+xx, y+yy, z+zz, BlockID.rp_basalt);
				}
			}
		}
	}
}


var basaltChance = __config__.getNumber("world_gen.basalt")
World.addGenerationCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random) {
	if (random.nextInt(100) < basaltChance) {
		var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 4, 12);
		genBasalt(random, coords.x, coords.y, coords.z);
	}
}, "rp-basalt");
