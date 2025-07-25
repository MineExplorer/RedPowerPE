class ToolSonicScrewdriver extends ItemCommon
implements IScrewdriver {
    energyPerUse = 40;

    constructor() {
        super("sonic_screwdriver", "Sonic Screwdriver", "sonic_screwdriver", false);
        this.setMaxStack(1);
        this.setCategory(ItemCategory.EQUIPMENT);
        ChargeItemRegistry.registerItem(this.id, "Eu", 16000, 100, 0, true);
        MachineRegistry.registerScrewdriver(this.id, this);
    }

    canBeUsed(item: ItemInstance): boolean {
		return ChargeItemRegistry.getEnergyStored(item) >= this.energyPerUse;
    }

    useItem(item: ItemStack, player: number): void {
        const energyStored = ChargeItemRegistry.getEnergyStored(item);
        ChargeItemRegistry.setEnergyStored(item, energyStored - this.energyPerUse);
        Entity.setCarriedItem(player, item.id, 1, item.data, item.extra);
    }
}

ItemRegistry.registerItem(new ToolSonicScrewdriver());

Recipes.addShaped({id: ItemID.sonic_screwdriver, count: 1, data: Item.getMaxDamage(ItemID.sonic_screwdriver)}, [
	"a  ",
	" x ",
	"  b"
], ['a', ItemID.gemGreenSapphire, 0, 'x', ItemID.ingotCopper, 0, 'b', ItemID.btBattery, -1], ChargeItemRegistry.transferEnergy);
