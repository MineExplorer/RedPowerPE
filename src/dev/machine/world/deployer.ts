/// <reference path="../type/RedstoneMachine.ts" />

MachineRegistry.createBlockWithRotation("rp_deployer", "Deployer", {
    default: {top: "deployer_top", bottom: "rp_block_bottom", side: "deployer_side", side2: "deployer_side2"},
    active: {top: "deployer_top_active", bottom: "rp_block_bottom", side: "deployer_side", side2: "deployer_side2"}
}, "stone");
BlockRegistry.setDestroyLevel(BlockID.rp_deployer, 1);

Recipes.addShaped({id: BlockID.rp_deployer, count: 1, data: 0}, [
	"cxc",
	"c#c",
	"crc"
], ['#', VanillaBlockID.piston, -1, 'c', VanillaBlockID.cobblestone, -1, 'r', VanillaItemID.redstone, -1, 'x', VanillaBlockID.chest, -1]);

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
    VanillaItemID.banner,
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
    ItemID.flaxSeeds
];

class Deployer extends RedstoneMachine {
    getScreenByName() {
		return guiDeployer;
	}

    onTick(): void {
        StorageInterface.checkHoppers(this);
    }

    isBlockItem(itemID: number): boolean {
        if (ItemRegistry.isBlock(itemID)) {
            return true;
        }
        return blockItems.indexOf(itemID) != -1;
    }

    isEmptyBlock(coords: Vector, item?: ItemInstance) {
        const blockID = this.region.getBlockId(coords);
        return blockID == 0 ||
          (!item || item.id != VanillaItemID.bucket && item.id != VanillaItemID.glass_bottle) && blockID >= 8 && blockID <= 11;
    }

    activate(): void {
        super.activate();
        const side = this.getFacing();
        const coords = World.getRelativeCoords(this.x, this.y, this.z, side);
        const ent = this.region.spawnEntity(this.x, this.y, this.z, EEntityType.ARROW);
        const angle = Entity.getLookAt(ent, coords.x, coords.y, coords.z);
        Entity.setLookAngle(ent, angle.yaw, angle.pitch);
        for (let i = 0; i < 9; i++) {
            const slot = this.container.getSlot("slot" + i);
            if (slot.id != 0) {
                if (this.isBlockItem(slot.id)) {
                    if (this.isEmptyBlock(coords)) {
                        const place = this.getUseCoords(coords, side);
                        this.invokeItemUseOn(place as any, slot, ent);
                        if (!this.isEmptyBlock(coords)) {
                            this.decreaseItem(slot);
                            this.container.sendChanges();
                            //Game.message(`Placed block on ${place.x}, ${place.y}, ${place.z}, (${place.side})`);
                            break;
                        }
                    }
                } else {
                    const place = this.getUseCoords(coords, side, slot);
                    try {
                        this.useItem(coords, place, slot, ent);
                        //Game.message(`Item use on ${place.x}, ${place.y}, ${place.z}, (${place.side})`);
                    } catch (e) {
                        Game.message(e);
                    }
                    break;
                }
            }
        }
        Entity.remove(ent);
    }

    getUseCoords(coords: Vector, facing: number, item?: ItemInstance): BlockPosition {
        if (this.isEmptyBlock(coords, item)) {
            const blockId = this.region.getBlockId(coords.x, coords.y - 1, coords.z)
            if (Block.isSolid(blockId) || blockId == VanillaTileID.farmland) {
                return {x: coords.x, y: coords.y - 1, z: coords.z, side: 1};
            }
            return {x: this.x, y: this.y, z: this.z, side: facing};
        }
        return {...coords, side: facing ^ 1}
    }

    useItem(coords: Vector, place: BlockPosition, slot: ItemContainerSlot, ent: number): void {
        const block = this.region.getBlock(coords);
        const extraBlock = this.region.getExtraBlock(coords);
        const stringId = ItemRegistry.getVanillaStringID(slot.id);
        //Game.message(JSON.stringify(block.getNamedStatesScriptable()));
        if (stringId.endsWith("spawn_egg")) {
            this.invokeItemUseOn(place, slot, ent);
            this.decreaseItem(slot);
        }
        else if (stringId.endsWith("_bucket")) {
            if (Block.canContainLiquid(block.id) || block.id >= 8 && block.id <= 11) {
                this.invokeItemUseOn(place, slot, ent);
                slot.setSlot(VanillaItemID.bucket, 1, 0);
            }
        }
        else if (stringId == "bucket") {
            const blockId = extraBlock.id || block.id;
            if (blockId >= 8 && blockId <= 11) {
                this.invokeItemUseOn(place, slot, ent);
                this.decreaseItem(slot);
                this.addItem((blockId <= 9) ? VanillaItemID.water_bucket : VanillaItemID.lava_bucket, 1, 0);
            }
        }
        else if (stringId == "glass_bottle") {
            if (block.id == 8 || block.id == 9) {
                this.decreaseItem(slot);
                this.addItem(VanillaItemID.potion, 1, 0);
            }
        }
        else if (stringId == "flint_and_steel") {
            this.invokeItemUseOn(place, slot, ent);
            if (this.region.getBlockId(coords) == VanillaTileID.fire) {
                slot.data++;
                if (slot.data >= Item.getMaxDamage(slot.id)) {
                    slot.setSlot(0, 0, 0);
                }
            }
        }
        else return;
        this.container.sendChanges();
    }

    decreaseItem(slot: ItemContainerSlot): void {
        slot.count--;
        slot.validate();
        slot.markDirty();
    }

    addItem(id: number, count: number, data: number): void {
        for (let i = 0; i < 9; i++) {
            const slot = this.container.getSlot("slot" + i);
            if (slot.id == 0) {
                slot.setSlot(id, count, data);
                return;
            }
        }
        const coords = World.getRelativeCoords(this.x, this.y, this.z, this.getFacing());
        this.region.dropAtBlock(coords.x, coords.y, coords.z, id, count, data);
    }

    invokeItemUseOn(coords: any, item: ItemContainerSlot, entity: number): void {
        const dir = World.getVectorByBlockSide(coords.side);
        coords.vec ??= {
            x: coords.x + .5 + dir.x/2,
            y: coords.y + .5 + dir.y/2,
            z: coords.z + .5 + dir.z/2
        };
        coords.relative ??= World.getRelativeCoords(coords.x, coords.y, coords.z, coords.side);
        const block = this.region.getBlock(coords.x, coords.y, coords.z);
        let useItem = false;
        const func = Game.isItemSpendingAllowed;
        Game.isItemSpendingAllowed = function() {
            useItem = true;
            return false;
        }
        Callback.invokeCallback("ItemUse", coords, item, block, false, entity);
        Game.isItemSpendingAllowed = func;
        Item.invokeItemUseOn(coords, item, true, entity);
        if (useItem) {
            this.decreaseItem(item);
        }
    }
}

if (BlockEngine.getMainGameVersion() >= 16) {
    MachineRegistry.registerPrototype(BlockID.rp_deployer, new Deployer());
}