/// <reference path="../core/RedstoneMachine.ts" />

IDRegistry.genBlockID("rp_block_breaker");
Block.createBlock("rp_block_breaker", [
	{name: "Block Breaker", texture: [["block_breaker_bottom", 0], ["block_breaker_top", 0], ["block_breaker_side", 0], ["block_breaker_side", 0], ["block_breaker_side", 1], ["block_breaker_side", 1]], inCreative: true}
], "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_block_breaker, 1);

Recipes.addShaped({id: BlockID.rp_block_breaker, count: 1, data: 0}, [
	"cxc",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, 0, 'c', VanillaBlockID.cobblestone, 0, 'r', VanillaItemID.redstone, 0, 'x', VanillaItemID.iron_pickaxe, 0]);

class BlockBreaker extends RedstoneMachine {
	
	activate() {
		super.activate();
		let coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
		//if (this.region.getBlockId)
		//	this.blockSource.breakBlockForResult()
	}
}

TileEntity.registerPrototype(BlockID.rp_block_breaker, new BlockBreaker());