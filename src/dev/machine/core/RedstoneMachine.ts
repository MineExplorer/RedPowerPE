class RedstoneMachine extends TileEntityBase {
    defaultValues = {
        activated: false
    }

    data: this["defaultValues"];

    getFacing(): number {
        return this.blockSource.getBlockData(this.x, this.y, this.z) % 6;
    }

    setFacing(side: number): void {
        this.region.setBlock(this, this.blockID, side + (this.data.activated ? 6 : 0));
    }

    onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean {
        let screwdriver = MachineRegistry.getScrewdriverData(item.id);
        if (screwdriver?.canBeUsed(item)) {
            screwdriver.useItem(item, player);
            this.setFacing((this.getFacing() + 1) % 6);
            return true;
        }
        return false;
    }

    activate(): void {
        let block = this.region.getBlock(this);
        this.region.setBlock(this, block.id, block.data + 6);
        this.data.activated = true;
    }

    deactivate(): void {
        let block = this.region.getBlock(this);
        this.region.setBlock(this, block.id, block.data - 6);
        this.data.activated = false;
    }

    onRedstoneUpdate(power: number): void {
        if (power > 0 && !this.data.activated) {
            this.activate();
        }
        else if (power == 0 && this.data.activated) {
            this.deactivate();
        }
    }
}