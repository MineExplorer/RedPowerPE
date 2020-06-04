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

IDRegistry.genBlockID("marble");
Block.createBlock("marble", [
	{name: "Marble", texture: [["marble", 0]], inCreative: true},
], "stone");
ToolAPI.registerBlockMaterial(BlockID.marble, "stone", 1, true);
Block.setDestroyLevel("marble", 1);
ToolLib.addBlockDropOnExplosion("marble");

IDRegistry.genBlockID("marbleBrick");
Block.createBlock("marbleBrick", [
	{name: "Marble Brick", texture: [["marble_brick", 0]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.marbleBrick, "stone", 1, true);
Block.setDestroyLevel("marbleBrick", 1);
ToolLib.addBlockDropOnExplosion("marbleBrick");

Recipes.addShaped({id: BlockID.marbleBrick, count: 4, data: 1}, [
	"xx",
	"xx"
], ['x', BlockID.marble, 0]);


function genMarble(x, y, z, random){
	GenerationUtils.generateOre(x, y, z, BlockID.rpMarble, 0, 72, false, random.nextInt());
	GenerationUtils.generateOre(x + random.nextInt(6), y, z + random.nextInt(6), BlockID.marble, 0, 64, false, random.nextInt());
}

var marbleChance = __config__.getNumber("world_gen.marble")
World.addGenerationCallback("GenerateChunk", function(chunkX, chunkZ, random){
	if(random.nextInt(100) < marbleChance){
		var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 32, 96);
		if(World.getBlockID(coords.x, coords.y, coords.z) == 1){
			genMarble(coords.x, coords.y, coords.z, random);
		}
	}
}, "rp-marble");