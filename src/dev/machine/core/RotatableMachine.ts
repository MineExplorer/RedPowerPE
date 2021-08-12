class RotatableMachine extends TileEntityBase {
    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean {
        let screwdriver = MachineRegistry.getScrewdriverData(item.id);
        if (screwdriver?.canBeUsed(item)) {
            screwdriver.useItem(item, player);
            let block = this.region.getBlock(this);
            this.region.setBlock(this, block.id, (block.data + 1) % 6 + block.data - block.data % 6);
            return true;
        }
        return false;
    }
}