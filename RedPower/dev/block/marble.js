Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 1.5,
	explosionres: 30,
	lightopacity: 15,
	renderlayer: 2,
	translucency: 0
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


function genMarble(x, y, z){
	GenerationUtils.generateOre(x, y, z, BlockID.rpMarble, 0, 72);
	GenerationUtils.generateOre(x + random(0, 6), y, z + random(0, 6), BlockID.marble, 0, 64);
	/*var randX = 0.5 + Math.random()/2
	var randY = 1.75 + Math.random()*2
	var randZ = 0.5 + Math.random()/2
	var randR = Math.random()*2
	rX = (6 + Math.ceil(randR))/Math.sqrt(randX)
	rY = (6 + Math.ceil(randR))/Math.sqrt(randY)
	rZ = (6 + Math.ceil(randR))/Math.sqrt(randZ)
	for(var xx = -rX; xx <= rX; xx++){
		for(var yy = -rY; yy <= rY; yy++){
			for(var zz = -rZ; zz <= rZ; zz++){
    			if(Math.sqrt(xx*xx*randX + yy*yy*randY + zz*zz*randZ) < 6 + randR + Math.random()/2 && World.getBlockID(x+xx,y+yy,z+zz)==1){
					World.setBlock(x+xx, y+yy, z+zz, BlockID.marble);
				}
			}
		}
	}*/
}

var marbleChance = __config__.getNumber("world_gen.marble")
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
	if(Math.random() < marbleChance){
		var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 32, 96);
		if(World.getBlockID(coords.x, coords.y, coords.z) == 1){
			genMarble(coords.x, coords.y, coords.z);
		}
	}
});