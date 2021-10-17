/// <reference path="../type/RedstoneMachine.ts" />

IDRegistry.genBlockID("rp_block_breaker");
MachineRegistry.createBlockWithRotation("rp_block_breaker", "Block Breaker", {
	default: {top: "block_breaker_top", bottom: "block_breaker_bottom", side: "block_breaker_side"},
	active: {top: "block_breaker_top_active", bottom: "block_breaker_bottom", side: "block_breaker_side_active"}
}, "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_block_breaker, 1);

Recipes.addShaped({id: BlockID.rp_block_breaker, count: 1, data: 0}, [
	"cxc",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, 0, 'c', VanillaBlockID.cobblestone, 0, 'r', VanillaItemID.redstone, 0, 'x', VanillaItemID.iron_pickaxe, 0]);

class BlockBreaker extends RedstoneMachine {
	getScreenName(): string {
		return null;
	}

	activate(): void {
		super.activate();
		let coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
		let blockID = this.region.getBlockId(coords);
		if (blockID != 0 && ToolAPI.getBlockMaterialName(blockID) != "unbreaking") {
			let result = this.region.breakBlockForJsResult(coords, -1, new ItemStack(VanillaItemID.iron_pickaxe, 1, 0));
			if (result.items.length > 0) {
				this.dropItems(result.items);
			}
		}
	}

	dropItems(items: ItemInstance[]): void {
		let side = this.getFacing()^1;
		let dir = World.getVectorByBlockSide(side);
		let coords = World.getRelativeCoords(this.x, this.y, this.z, side);
		let container = StorageInterface.getStorage(this.blockSource, coords.x, coords.y, coords.z);
		for (let item of items) {
			if (container) container.addItem(item);
			if (item.count > 0) {
				let ent = this.region.dropItem(coords.x + .5, coords.y + .5, coords.z + .5, item);
				Entity.setVelocity(ent, dir.x / 5, dir.y / 5, dir.z / 5);
			}
		}
	}
}

TileEntity.registerPrototype(BlockID.rp_block_breaker, new BlockBreaker());