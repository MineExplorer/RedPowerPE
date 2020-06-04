IDRegistry.genBlockID("marbleSlab");
Block.createBlock("marbleSlab", [
	{name: "Marble Slab", texture: [["marble", 0]], inCreative: true},
	{name: "Marble Brick Slab", texture: [["marble_brick", 0]], inCreative: true},
	{name: "Marble Slab", texture: [["marble", 0]], inCreative: false},
	{name: "Marble Brick Slab", texture: [["marble_brick", 0]], inCreative: false}
], {
	base: 1,
	destroytime: 1.5,
	explosionres: 30,
	renderlayer: 2,
	translucency: 0,
	sound: "stone"
});
ToolAPI.registerBlockMaterial(BlockID.marbleSlab, "stone", 1, true);
Block.registerDropFunction("marbleSlab", function(coords, blockID, blockData, level){
	if(level > 0){
		return [[BlockID.marbleSlab, 1, blockData%2]];
	}
	return [];
});
ToolLib.addBlockDropOnExplosion("marbleSlab");

IDRegistry.genBlockID("marbleSlabFull");
Block.createBlock("marbleSlabFull", [
	{name: "Marble Slab", texture: [["marble", 0]], inCreative: false},
	{name: "Marble Brick Slab", texture: [["marble_brick", 0]], inCreative: false},
], "stone");
ToolAPI.registerBlockMaterial(BlockID.marbleSlabFull, "stone", 1, true);
Block.registerDropFunction("marbleSlabFull", function(coords, blockID, blockData, level){
	if(level > 0){
		return [[BlockID.marbleSlab, 1, blockData], [BlockID.marbleSlab, 1, blockData]];
	}
	return [];
});
ToolLib.addBlockDropOnExplosion("marbleSlabFull");
TileRenderer.setSlabShape(BlockID.marbleSlab, 2);
TileRenderer.setSlabPlaceFunction(BlockID.marbleSlab, 2, BlockID.marbleSlabFull);

Item.addCreativeGroup("rpSlabs", Translation.translate("Slabs"), [
	BlockID.basaltSlab,
	BlockID.marbleSlab
]);

Recipes.addShaped({id: BlockID.marbleSlab, count: 6, data: 0}, [
	"xxx"
], ['x', BlockID.marble, 0]);

Recipes.addShaped({id: BlockID.marbleSlab, count: 6, data: 1}, [
	"xxx"
], ['x', BlockID.marbleBrick, 0]);
