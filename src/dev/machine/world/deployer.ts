/// <reference path="../type/RedstoneMachine.ts" />

IDRegistry.genBlockID("rp_deployer");
MachineRegistry.createBlockWithRotation("rp_deployer", "Deployer", {
    default: {top: "deployer_top", bottom: "rp_block_bottom", side: "deployer_side", side2: "deployer_side2"},
    active: {top: "deployer_top_active", bottom: "rp_block_bottom", side: "deployer_side", side2: "deployer_side2"}
}, "stone");
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

const blockItems = [
    VanillaBlockID.cake,
    VanillaBlockID.bed,
    VanillaItemID.repeater,
    VanillaBlockID.brewing_stand,
    VanillaBlockID.hopper,
    VanillaBlockID.frame,
    VanillaBlockID.flower_pot,
    VanillaItemID.comparator,
    VanillaBlockID.campfire,
    VanillaBlockID.soul_campfire,
    VanillaBlockID.chain,
    VanillaBlockID.nether_sprouts,
    VanillaItemID.sign,
    VanillaItemID.birch_sign,
    VanillaItemID.acacia_sign,
    VanillaItemID.jungle_sign,
    VanillaItemID.warped_sign,
    VanillaItemID.spruce_sign,
    VanillaItemID.crimson_sign,
    VanillaItemID.darkoak_sign,
    VanillaBlockID.iron_door,
    VanillaBlockID.birch_door,
    VanillaBlockID.acacia_door,
    VanillaBlockID.jungle_door,
    VanillaBlockID.spruce_door,
    VanillaBlockID.warped_door,
    VanillaBlockID.wooden_door,
    VanillaBlockID.crimson_door,
    VanillaBlockID.dark_oak_door,
    VanillaItemID.wheat_seeds,
    VanillaItemID.melon_seeds,
    VanillaItemID.pumpkin_seeds,
    VanillaItemID.beetroot_seeds,
    VanillaBlockID.nether_wart,
];

function registeAsBlockItem(id: number): void {
    blockItems.push(id);
}

class Deployer extends RedstoneMachine {
    isTechClick: boolean;

    getScreenName() {
        return this.isTechClick ? null : "main";
    }

    getScreenByName() {
		return guiDeployer;
	}

    isBlockItem(itemID: number): boolean {
        if (ItemRegistry.isBlock(itemID)) {
            return true;
        }
        return blockItems.indexOf(itemID) != -1;
    }

    isEmptyBlock(coords: Vector, item?: ItemInstance) {
        let blockID = this.region.getBlockId(coords);
        return blockID == 0 ||
          (!item || item.id != VanillaItemID.bucket && item.id != VanillaItemID.glass_bottle) && blockID >= 8 && blockID <= 11;
    }

    activate(): void {
        super.activate();
        for (let i = 0; i < 9; i++) {
            let slot = this.container.getSlot("slot" + i);
            if (slot.id != 0) {
                let side = this.getFacing();
                let coords = World.getRelativeCoords(this.x, this.y, this.z, side);
                if (this.isBlockItem(slot.id)) {
                    if (this.isEmptyBlock(coords)) {
                        let place = this.getUseCoords(coords, side);
                        this.invokeItemUseOn(place as any, slot, Player.get());
                        if (!this.isEmptyBlock(coords)) {
                            this.decreaseItem(slot);
                            this.container.sendChanges();
                            Game.message(`Placed block on ${place.x}, ${place.y}, ${place.z}, (${place.side})`);
                            break;
                        }
                    }
                } else if (!IDRegistry.getNameByID(slot.id)) {
                    let place = this.getUseCoords(coords, side, slot);
                    let block = this.region.getBlock(place);
                    let extraBlock = this.region.getExtraBlock(place);
                    try {
                        this.invokeItemUseOn(place as any, slot, Player.get());
                        this.useItem(place, slot, block, extraBlock);
                    } catch (e) {
                        Game.message(e);
                    }
                    Game.message(`Item use on ${place.x}, ${place.y}, ${place.z}, (${place.side})`);
                    break;
                }
            }
        }
    }

    getUseCoords(coords: Vector, facing: number, item?: ItemInstance): BlockPosition {
        if (this.isEmptyBlock(coords, item)) {
            let blockID = this.region.getBlockId(coords.x, coords.y - 1, coords.z);
            if (!(blockID == 0 || blockID >= 8 && blockID <= 11)) {
                return {x: coords.x, y: coords.y - 1, z: coords.z, side: 1};
            }
            return {x: this.x, y: this.y, z: this.z, side: facing};
        }
        return {...coords, side: facing ^ 1}
    }

    useItem(coords: BlockPosition, slot: ItemContainerSlot, block: BlockState, extraBlock: BlockState): void {
        switch (slot.id) {
            case VanillaItemID.water_bucket:
            case VanillaItemID.lava_bucket:
            case VanillaItemID.cod_bucket:
            case VanillaItemID.salmon_bucket:
            case VanillaItemID.pufferfish_bucket:
            case VanillaItemID.tropical_fish_bucket:
                var blockId = this.region.getExtraBlock(coords).id || this.region.getBlockId(coords);
                if (blockId >= 8 || blockId <= 11) {
                    slot.setSlot(VanillaItemID.bucket, 1, 0);
                }
                break;
            case VanillaItemID.bucket:
                var blockId = extraBlock.id || block.id;
                if (blockId == 8 || blockId == 9) {
                    this.decreaseItem(slot);
                    this.addItem(VanillaItemID.water_bucket, 1, 0);
                }
                if (blockId == 10 || blockId == 11) {
                    this.decreaseItem(slot);
                    this.addItem(VanillaItemID.lava_bucket, 1, 0);
                }
                break;
            case VanillaItemID.glass_bottle:
                if (block.id == 8 || block.id == 9) {
                    this.decreaseItem(slot);
                    this.addItem(VanillaItemID.potion, 1, 0);
                }
                break;
            // TODO: spawn eggs, minecarts, banners
            /*default:
                //Callback.invokeCallback("ItemDispensed", coords, slot, this.blockSource);
                slot.setSlot(slot.id, slot.count - 1, slot.data, slot.extra);
                slot.validate();
                break;*/
        }
        this.container.sendChanges();
    }

    decreaseItem(slot: ItemContainerSlot): void {
        slot.count--;
        slot.validate();
        slot.markDirty();
    }

    addItem(id: number, count: number, data: number): void {
        for (let i = 0; i < 9; i++) {
            let slot = this.container.getSlot("slot" + i);
            if (slot.id == 0) {
                slot.setSlot(id, count, data);
                return;
            }
        }
        let dir = World.getVectorByBlockSide(this.getFacing());
        this.region.dropItem(this.x + .5 + dir.x/2, this.y + .5 + dir.y/2, this.z + .5 + dir.z/2, id, count, data);
    }

    invokeItemUseOn(coords: Callback.ItemUseCoordinates, item: ItemInstance, entity: number): void {
        let dir = World.getVectorByBlockSide(this.getFacing());
        coords.vec ??= {
            x: coords.x + .5 + dir.x/2,
            y: coords.y + .5 + dir.y/2,
            z: coords.z + .5 + dir.z/2
        };
        coords.relative ??= World.getRelativeCoords(coords.x, coords.y, coords.z, coords.side);
        let block = this.region.getBlock(coords.x, coords.y, coords.z);
        this.isTechClick = true;
        let func = Game.isItemSpendingAllowed;
        Game.isItemSpendingAllowed = () => false;
        Callback.invokeCallback("ItemUse", coords, item, block, false, entity);
        this.isTechClick = false;
        Game.isItemSpendingAllowed = func;
        //if (!ModAPI.requireGlobal("MCSystem.isDefaultPrevented()")) {
            Item.invokeItemUseOn(coords, item, true, entity);
        //}
    }
}

TileEntity.registerPrototype(BlockID.rp_deployer, new Deployer());