/// <reference path="../type/RedstoneMachine.ts" />

MachineRegistry.createBlockWithRotation("rp_block_breaker", "Block Breaker", {
	default: {top: "block_breaker_top", bottom: "block_breaker_bottom", side: "block_breaker_side"},
	active: {top: "block_breaker_top_active", bottom: "block_breaker_bottom", side: "block_breaker_side_active"}
}, "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_block_breaker, 1);

Recipes.addShaped({id: BlockID.rp_block_breaker, count: 1, data: 0}, [
	"cxc",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, -1, 'c', VanillaBlockID.cobblestone, -1, 'r', VanillaItemID.redstone, -1, 'x', VanillaItemID.iron_pickaxe, 0]);

class BlockBreaker extends RedstoneMachine {
	getScreenName(): string {
		return null;
	}

	activate(): void {
		super.activate();
		const coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
		const blockID = this.region.getBlockId(coords);
		if (blockID != 0 && ToolAPI.getBlockMaterialName(blockID) != "unbreaking") {
			const result = this.region.breakBlockForResult(coords, -1, new ItemStack(VanillaItemID.iron_pickaxe, 1, 0));
			if (result.items.length > 0) {
				this.dropItems(result.items);
			}
		}
	}

	dropItems(items: ItemInstance[]): void {
		const side = this.getFacing()^1;
		const dir = World.getVectorByBlockSide(side);
		const coords = World.getRelativeCoords(this.x, this.y, this.z, side);
		const container = StorageInterface.getStorage(this.blockSource, coords.x, coords.y, coords.z);
		for (let item of items) {
			if (container) container.addItem(item);
			if (item.count > 0) {
				const ent = this.region.dropAtBlock(coords.x, coords.y, coords.z, item);
				Entity.setVelocity(ent, dir.x / 5, dir.y / 5, dir.z / 5);
			}
		}
	}
}

MachineRegistry.registerPrototype(BlockID.rp_block_breaker, new BlockBreaker());