/// <reference path="../type/RedstoneMachine.ts" />

MachineRegistry.createBlockWithRotation("rp_igniter", "Igniter", {
	default: {top: "igniter_top", bottom: "rp_block_bottom", side: "igniter_side", side2: "igniter_side2"},
	active: {top: "igniter_top_active", bottom: "rp_block_bottom", side: "igniter_side", side2: "igniter_side2"},
}, "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_igniter, 1);

Recipes.addShaped({id: BlockID.rp_igniter, count: 1, data: 0}, [
	"nxn",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, -1, 'c', VanillaBlockID.cobblestone, -1, 'n', VanillaBlockID.netherrack, -1, 'r', VanillaItemID.redstone, -1, 'x', VanillaItemID.flint_and_steel, 0]);

class Igniter extends RedstoneMachine {
	getScreenName(): string {
		return null;
	}

	activate() {
		super.activate();
		const coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
		if (this.region.getBlockId(coords) == 0) {
			this.region.setBlock(coords, VanillaTileID.fire, 0);
		}
	}

	deactivate() {
		super.deactivate();
		const coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
		const block = this.region.getBlockId(coords)
		if (block == VanillaTileID.fire || block == VanillaTileID.portal) {
			this.region.setBlock(coords, 0, 0);
		}
	}
}

MachineRegistry.registerPrototype(BlockID.rp_igniter, new Igniter());