IDRegistry.genBlockID("rp_deployer");
Block.createBlock("rp_deployer", [
	{name: "Deployer", texture: [["rp_block_bottom", 0], ["deployer_top", 0], ["deployer_side", 0], ["deployer_side", 0], ["deployer_side", 1], ["deployer_side", 1]], inCreative: true},
], "stone");

Recipes.addShaped({id: BlockID.rp_deployer, count: 1, data: 0}, [
	"cxc",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, 0, 'c', VanillaBlockID.cobblestone, 0, 'r', VanillaItemID.redstone, 0, 'x', VanillaBlockID.chest, 0]);

const guiDeployer = MachineRegistry.createInventoryWindow("Deployer", {
	elements: {
		"slot0": {type: "slot", x: 502, y: 112},
		"slot1": {type: "slot", x: 562, y: 112},
		"slot2": {type: "slot", x: 622, y: 112},
		"slot3": {type: "slot", x: 502, y: 172},
		"slot4": {type: "slot", x: 562, y: 172},
		"slot5": {type: "slot", x: 622, y: 172},
		"slot6": {type: "slot", x: 502, y: 232},
		"slot7": {type: "slot", x: 562, y: 232},
		"slot8": {type: "slot", x: 622, y: 232}
	}
});

class Deployer extends TileEntityBase {
    getScreenByName() {
		return guiDeployer;
	}

    activate(): void {
        for (let i = 0; i < 9; i++) {
            let slot = this.container.getSlot("slot" + i);
            if (slot.id != 0) {
                if (ItemRegistry.isBlock(slot.id)) {
                    let side = this.region.getBlockData(this) ^ 1;
                    let coords = World.getRelativeCoords(this.x, this.y, this.z, side);
                    if (this.region.getBlockId(coords) == 0) {
                        this.region.setBlock(coords, slot.id, slot.data);
                        slot.setSlot(slot.id, slot.count - 1, slot.data);
                        slot.validate();
                        this.container.sendChanges();
                        break;
                    }
                } else {
                    // TODO
                }
            }
        }
    }

    onRedstoneUpdate(power: number): void {
        if (power > 0) {
            this.activate();
        }
    }
}

TileEntity.registerPrototype(BlockID.rp_deployer, new Deployer());