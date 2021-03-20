ItemRegistry.createItem("btBattery", {name: "BT Battery", icon: "bt_battery", stack: 1, inCreative: false});
ChargeItemRegistry.registerItem(ItemID.btBattery, "Bt", 16000, 100, 0, true);

Recipes.addShaped({id: ItemID.btBattery, count: 1, data: Item.getMaxDamage(ItemID.btBattery)}, [
	"xcx",
	"xax",
	"xcx"
], ['x', ItemID.nikolite, 0, 'a', ItemID.ingotTin, 0, 'c', ItemID.ingotCopper, 0]);