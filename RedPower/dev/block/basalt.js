Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 2,
	explosionres: 100,
	lightopacity: 15,
	renderlayer: 2,
	translucency: 0
}, "basalt");

IDRegistry.genBlockID("rpBasalt");
Block.createBlock("rpBasalt", [
	{name: "Basalt", texture: [["basalt", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.rpBasalt, "stone", 1, true);
Block.registerDropFunction("rpBasalt", function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		if(enchant.silk){
			return [[BlockID.rpBasalt, 1, 0]];
		}
		return [[BlockID.basaltCobble, 1, 0]];
	}
	return [];
}, 1);
ToolLib.addBlockDropOnExplosion("rpBasalt");

IDRegistry.genBlockID("basaltCobble");
Block.createBlock("basaltCobble", [
	{name: "Basalt Cobble", texture: [["basalt_cobble", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltCobble, "stone", 1, true);
Block.setDestroyLevel("basaltCobble", 1);
ToolLib.addBlockDropOnExplosion("basaltCobble");

IDRegistry.genBlockID("basaltBrick");
Block.createBlock("basaltBrick", [
	{name: "Basalt Brick", texture: [["basalt_brick", 0]], inCreative: true},
	{name: "Chiseled Basalt Brick", texture: [["basalt_chiseled", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltBrick, "stone", 1, true);
Block.setDestroyLevel("basaltBrick", 1);
ToolLib.addBlockDropOnExplosion("basaltBrick");

IDRegistry.genBlockID("basaltPaver");
Block.createBlock("basaltPaver", [
	{name: "Basalt Paver", texture: [["basalt_paver", 0]], inCreative: true}
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltPaver, "stone", 1, true);
Block.registerDropFunction("basaltPaver", function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		if(enchant.silk){
			return [[blockID, 1, 0]];
		}
		return [[BlockID.basaltCobble, 1, 0]];
	}
	return [];
}, 1);
ToolLib.addBlockDropOnExplosion("basaltPaver");

Item.addCreativeGroup("basalt", Translation.translate("Basalt"), [
	BlockID.rpBasalt,
	BlockID.basaltCobble,
	BlockID.basaltBrick,
	BlockID.basaltPaver,
]);

/*
IDRegistry.genBlockID("basaltBrickStairs");
Block.createBlock("basaltBrickStairs", [
	{name: "Basalt Brick Stairs", texture: [["basalt_brick", 0]], inCreative: true}
], {
	base: 1,
	destroytime: 2,
	explosionres: 100,
	rendertype: 10,
	renderlayer: 2
});
ToolAPI.registerBlockMaterial(BlockID.basaltBrickStairs, "stone", 1, true);
Block.setDestroyLevel("basaltBrickStairs", 1);
*/

Recipes.addFurnace(BlockID.basaltCobble, BlockID.rpBasalt, 0);
Recipes.addShapeless({id: BlockID.basaltPaver, count: 1, data: 0}, [{id: BlockID.rpBasalt, data: 0}]);

Recipes.addShaped({id: BlockID.basaltBrick, count: 4, data: 0}, [
	"xx",
	"xx"
], ['x', BlockID.rpBasalt, 0]);

Recipes.addShaped({id: BlockID.basaltBrick, count: 4, data: 1}, [
	"xx",
	"xx"
], ['x', BlockID.basaltBrick, 0]);


function genBasalt(x, y, z){
	randY = 1 + Math.random()
	randR = Math.random()*3.3
	r = 6.7 + Math.ceil(randR)
	h = r/Math.sqrt(randY)
	for(var xx = -r; xx <= r; xx++){
		for(var yy = -h; yy <= h; yy++){
			for(var zz = -r; zz <= r; zz++){
				if(Math.sqrt(xx*xx + yy*yy*randY + zz*zz) < 6.7 + randR + Math.random()/2){
					id = World.getBlockID(x+xx, y+yy, z+zz)
					if(id==1 || id==3 || id==13 || id==16){
					World.setBlock(x+xx, y+yy, z+zz, BlockID.rpBasalt);}
				}
			}
		}
	}
}


var basaltChance = __config__.getNumber("world_gen.basalt")
World.addGenerationCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random){
	if(random.nextInt(100) < basaltChance){
		var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 4, 12);
		genBasalt(coords.x, coords.y, coords.z);
	}
}, "rp-basalt");