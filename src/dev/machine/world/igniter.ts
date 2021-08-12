IDRegistry.genBlockID("rp_igniter");
Block.createBlock("rp_igniter", [
	{name: "Igniter", texture: [["rp_block_bottom", 0], ["igniter_top", 0], ["igniter_side", 1], ["igniter_side", 1], ["igniter_side", 0], ["igniter_side", 0]], inCreative: true},
], "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_igniter, 1);

Recipes.addShaped({id: BlockID.rp_igniter, count: 1, data: 0}, [
	"nxn",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, 0, 'c', VanillaBlockID.cobblestone, 0, 'n', VanillaBlockID.netherrack, 0, 'r', VanillaItemID.redstone, 0, 'x', VanillaItemID.flint_and_steel, 0]);
