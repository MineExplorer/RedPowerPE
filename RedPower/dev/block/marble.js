Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 1.5,
	explosionres: 30,
	lightopacity: 15,
	renderlayer: 2,
	translucency: 0,
	sound: "stone"
}, "stone");

IDRegistry.genBlockID("rp_marble");
Block.createBlock("rp_marble", [
	{name: "Marble", texture: [["rp_marble", 0]], inCreative: true},
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_marble, "stone", 1, true);
Block.setDestroyLevel("rp_marble", 1);
ToolLib.addBlockDropOnExplosion("rp_marble");

IDRegistry.genBlockID("marbleBrick");
Block.createBlock("marbleBrick", [
	{name: "Marble Brick", texture: [["rp_marble_brick", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.marbleBrick, "stone", 1, true);
Block.setDestroyLevel("marbleBrick", 1);
ToolLib.addBlockDropOnExplosion("marbleBrick");

VanillaRecipe.addCraftingRecipe("marble_brick", {
  type: "shaped",
  pattern: [
    "XX",
    "XX"
  ],
  key: {
    "X": { item: "block:rp_marble" }
  },
  result: {
    item: "block:marbleBrick",
    data: 0,
    count: 4
  }
}, true);

VanillaRecipe.addStonecutterRecipe("stonecutter_marble_brick", {
  ingredients: [
    { item: "block:rp_marble" }
  ],
  result: {
    item: "block:marbleBrick",
    data: 0
  }
}, true);

function genMarble(x, y, z, random) {
	GenerationUtils.generateOre(x, y, z, BlockID.rp_marble, 0, 72, false, random.nextInt());
	GenerationUtils.generateOre(x + random.nextInt(6), y, z + random.nextInt(6), BlockID.rp_marble, 0, 64, false, random.nextInt());
}

var marbleChance = __config__.getNumber("world_gen.marble")
World.addGenerationCallback("GenerateChunk", function(chunkX, chunkZ, random) {
	if (random.nextInt(100) < marbleChance) {
		var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 32, 96);
		if (World.getBlockID(coords.x, coords.y, coords.z) == 1) {
			genMarble(coords.x, coords.y, coords.z, random);
		}
	}
}, "rp-marble");
