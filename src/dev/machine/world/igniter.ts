/// <reference path="../core/RedstoneMachine.ts" />

IDRegistry.genBlockID("rp_igniter");
MachineRegistry.createBlockWithRotation("rp_igniter", "Igniter", {
	default: {top: "igniter_top", bottom: "rp_block_bottom", side: "igniter_side", side2: "igniter_side2"},
	active: {top: "igniter_top_active", bottom: "rp_block_bottom", side: "igniter_side", side2: "igniter_side2"},
}, "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_igniter, 1);

Recipes.addShaped({id: BlockID.rp_igniter, count: 1, data: 0}, [
	"nxn",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, 0, 'c', VanillaBlockID.cobblestone, 0, 'n', VanillaBlockID.netherrack, 0, 'r', VanillaItemID.redstone, 0, 'x', VanillaItemID.flint_and_steel, 0]);

class Igniter extends RedstoneMachine {
	activate() {
		super.activate();
		let coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
		if (this.region.getBlockId(coords) == 0) {
			this.region.setBlock(coords, VanillaTileID.fire, 0);
		}
	}

	deactivate() {
		super.deactivate();
		let coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
		let block = this.region.getBlockId(coords)
		if (block == VanillaTileID.fire || block == VanillaTileID.portal) {
			this.region.setBlock(coords, 0, 0);
		}
	}
}

TileEntity.registerPrototype(BlockID.rp_igniter, new Igniter());