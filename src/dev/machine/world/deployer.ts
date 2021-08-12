/// <reference path="../core/RedstoneMachine.ts" />

IDRegistry.genBlockID("rp_deployer");
Block.createBlock("rp_deployer", [
	{name: "Deployer", texture: [["deployer_top", 0], ["rp_block_bottom", 0], ["deployer_side", 1], ["deployer_side", 1], ["deployer_side", 5], ["deployer_side", 5]], inCreative: false},
	{name: "Deployer", texture: [["rp_block_bottom", 0], ["deployer_top", 0], ["deployer_side", 0], ["deployer_side", 0], ["deployer_side", 4], ["deployer_side", 4]], inCreative: true},
	{name: "Deployer", texture: [["deployer_side", 0], ["deployer_side", 0], ["deployer_top", 0], ["rp_block_bottom", 0], ["deployer_side", 1], ["deployer_side", 1]], inCreative: false},
	{name: "Deployer", texture: [["deployer_side", 0], ["deployer_side", 0], ["rp_block_bottom", 0], ["deployer_top", 0], ["deployer_side", 1], ["deployer_side", 1]], inCreative: false},
	{name: "Deployer", texture: [["deployer_side", 0], ["deployer_side", 0], ["deployer_side", 0], ["deployer_side", 0], ["deployer_top", 1], ["rp_block_bottom", 1]], inCreative: false},
	{name: "Deployer", texture: [["deployer_side", 0], ["deployer_side", 0], ["deployer_side", 0], ["deployer_side", 0], ["rp_block_bottom", 1], ["deployer_top", 1]], inCreative: false},
], "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_deployer, 1);

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

class Deployer extends RedstoneMachine {
    isTechClick: boolean;

    getScreenName() {
        return this.isTechClick ? null : "main";
    }

    getScreenByName() {
		return guiDeployer;
	}

    activate(): void {
        super.activate();
        for (let i = 0; i < 9; i++) {
            let slot = this.container.getSlot("slot" + i);
            if (slot.id != 0) {
                let side = this.getFacing();
                let coords = World.getRelativeCoords(this.x, this.y, this.z, side);
                if (ItemRegistry.isBlock(slot.id)) {
                    if (this.region.getBlockId(coords) == 0) {
                        var place = {x: this.x, y: this.y, z: this.z, side: side};
                        this.invokeItemUseOn(place as any, slot, Player.get());
                        if (this.region.getBlockId(coords) != 0) {
                            slot.setSlot(slot.id, slot.count - 1, slot.data);
                            slot.validate();
                            this.container.sendChanges();
                        }
                        Game.message(`Item use on ${place.x}, ${place.y}, ${place.z}, (${place.side})`);
                        break;
                    }
                } else if (!IDRegistry.getNameByID(slot.id)) {
                    if (this.region.getBlockId(coords) == 0) {
                        var place = {x: this.x, y: this.y, z: this.z, side: side};
                    } else {
                        var place = {...coords, side: side ^ 1}
                    }
                    try {
                        this.invokeItemUseOn(place as any, slot, Player.get());
                        if (slot.id == VanillaItemID.water_bucket) slot.id = VanillaItemID.bucket;
                    } catch (e) {
                        Game.message(e);
                    }
                    Game.message(`Item use on ${place.x}, ${place.y}, ${place.z}, (${place.side})`);
                }
                break;
            }
        }
    }

    invokeItemUseOn(coords: Callback.ItemUseCoordinates, item: ItemInstance, entity: number): void {
        coords.vec ??= {
            x: (coords.x || 0) + .5,
            y: (coords.y || 0) + .5,
            z: (coords.z || 0) + .5
        };
        coords.side ??= 0;
        coords.relative ??= World.getRelativeCoords(coords.x, coords.y, coords.z, coords.side);
        let block = this.region.getBlock(coords.x, coords.y, coords.z);
        this.isTechClick = true;
        let func = Game.isItemSpendingAllowed;
        Game.isItemSpendingAllowed = () => false;
        Callback.invokeCallback("ItemUse", coords, item, block, false, entity);
        this.isTechClick = false;
        Game.isItemSpendingAllowed = func;
        if (!ModAPI.requireGlobal("MCSystem.isDefaultPrevented()")) {
            Item.invokeItemUseOn(coords, item, true, entity);
        }
    }
}

TileEntity.registerPrototype(BlockID.rp_deployer, new Deployer());