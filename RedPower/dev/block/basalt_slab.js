IDRegistry.genBlockID("basaltSlab");
Block.createBlock("basaltSlab", [
	{name: "Basalt Slab", texture: [["basalt", 0]], inCreative: true},
	{name: "Basalt Cobble Slab", texture: [["basalt_cobble", 0]], inCreative: true},
	{name: "Basalt Brick Slab", texture: [["basalt_brick", 0]], inCreative: true},
	{name: "Basalt Slab", texture: [["basalt", 0]], inCreative: false},
	{name: "Basalt Cobble Slab", texture: [["basalt_cobble", 0]], inCreative: false},
	{name: "Basalt Brick Slab", texture: [["basalt_brick", 0]], inCreative: false},
], {
	base: 1,
	destroytime: 1.5,
	explosionres: 100,
	renderlayer: 2,
	translucency: 0
});
ToolAPI.registerBlockMaterial(BlockID.basaltSlab, "stone", 1, true);
Block.registerDropFunction("basaltSlab", function(coords, blockID, blockData, level){
	if(level > 0){
		return [[BlockID.basaltSlab, 1, blockData%3]];
	}
	return [];
});
ToolLib.addBlockDropOnExplosion("basaltSlab");

IDRegistry.genBlockID("basaltSlabFull");
Block.createBlock("basaltSlabFull", [
	{name: "Basalt Slab", texture: [["basalt", 0]], inCreative: false},
	{name: "Basalt Cobble Slab", texture: [["basalt_cobble", 0]], inCreative: false},
	{name: "Basalt Brick Slab", texture: [["basalt_brick", 0]], inCreative: false},
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltSlabFull, "stone", 1, true);
Block.registerDropFunction("basaltSlabFull", function(coords, blockID, blockData, level){
	if(level > 0){
		return [[BlockID.basaltSlab, 1, blockData], [BlockID.basaltSlab, 1, blockData]];
	}
	return [];
});
ToolLib.addBlockDropOnExplosion("basaltSlabFull");
TileRenderer.setSlabShape(BlockID.basaltSlab, 3);
TileRenderer.setSlabPlaceFunction(BlockID.basaltSlab, 3, BlockID.basaltSlabFull);


Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 0}, [
	"xxx"
], ['x', BlockID.rpBasalt, 0]);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 1}, [
	"xxx"
], ['x', BlockID.basaltCobble, 0]);

Recipes.addShaped({id: BlockID.basaltSlab, count: 6, data: 2}, [
	"xxx"
], ['x', BlockID.basaltBrick, 0]);
