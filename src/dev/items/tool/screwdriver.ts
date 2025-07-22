interface IScrewdriver {
    canBeUsed(item: ItemInstance): boolean,
    useItem(item: ItemStack, player: number): void
}

class ToolScrewdriver extends ItemCommon
implements IScrewdriver {
    constructor(stringID: string, name: string, icon: string, maxDmg: number) {
        super(stringID, name, icon);
        this.setMaxStack(1);
        this.setMaxDamage(maxDmg);
        this.setCategory(ItemCategory.EQUIPMENT);
        MachineRegistry.registerScrewdriver(this.id, this);
    }

    canBeUsed(item: ItemInstance): boolean {
        return true;
    }

    useItem(item: ItemStack, player: number): void {
        item.applyDamage(1);
        Entity.setCarriedItem(player, item.id, 1, item.data, item.extra);
		if (item.id == 0) {
			const region = WorldRegion.getForActor(player);
			region.playSoundAtEntity(player, "random.break");
		}
    }
}

ItemRegistry.registerItem(new ToolScrewdriver("rp_screwdriver", "Screwdriver", "rp_screwdriver", 200));

Recipes.addShaped({id: ItemID.rp_screwdriver, count: 1, data: 0}, [
    "A ",
    " X"
], ['A', VanillaItemID.iron_ingot, 0, 'X', VanillaItemID.stick, 0]);
