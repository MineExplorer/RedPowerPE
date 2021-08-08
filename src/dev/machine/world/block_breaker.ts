IDRegistry.genBlockID("rp_block_breaker");
Block.createBlock("rp_block_breaker", [
	{name: "Block Breaker", texture: [["block_breaker_bottom", 0], ["block_breaker_top", 0], ["block_breaker_side", 0], ["block_breaker_side", 0], ["block_breaker_side", 1], ["block_breaker_side", 1]], inCreative: true}
], "stone");

Recipes.addShaped({id: BlockID.rp_block_breaker, count: 1, data: 0}, [
	"cxc",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, 0, 'c', VanillaBlockID.cobblestone, 0, 'r', VanillaItemID.redstone, 0, 'x', VanillaItemID.iron_pickaxe, 0]);
