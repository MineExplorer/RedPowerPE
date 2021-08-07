ItemRegistry.createItem("ingotRed", {name: "Red Alloy Ingot", icon: "ingot_red"});
ItemRegistry.createItem("ingotBlue", {name: "Blue Alloy Ingot", icon: "ingot_blue"});
ItemRegistry.createItem("ingotBronze", {name: "Bronze Ingot", icon: "ingot_bronze"});
ItemRegistry.createItem("ingotTin", {name: "Tin Ingot", icon: "ingot_tin"});
ItemRegistry.createItem("ingotCopper", {name: "Copper Ingot", icon: "ingot_copper"});
ItemRegistry.createItem("ingotSilver", {name: "Silver Ingot", icon: "ingot_silver"});
ItemRegistry.createItem("ingotTungsten", {name: "Tungsten Ingot", icon: "ingot_tungsten"});

Item.addCreativeGroup("ingot", Translation.translate("Ingots"), [
	ItemID.ingotRed,
	ItemID.ingotBlue,
	ItemID.ingotBronze,
	ItemID.ingotTin,
	ItemID.ingotCopper,
	ItemID.ingotSilver,
	ItemID.ingotTungsten
]);

ItemRegistry.createItem("nikolite", {name: "Nikolite", icon: "nikolite"});
ChargeItemRegistry.registerFlashItem(ItemID.nikolite, "Bt", 1000, 0);

ItemRegistry.createItem("gemRuby", {name: "Ruby", icon: "ruby"});
ItemRegistry.createItem("gemSapphire", {name: "Sapphire", icon: "sapphire"});
ItemRegistry.createItem("gemGreenSapphire", {name: "Green Sapphire", icon: "green_sapphire"});

Item.addCreativeGroup("gem", Translation.translate("Gems"), [
	ItemID.gemRuby,
	ItemID.gemSapphire,
	ItemID.gemGreenSapphire
]);

Callback.addCallback("PreLoaded", function() {
	Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);
	Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);
	Recipes.addFurnace(BlockID.oreSilver, ItemID.ingotSilver, 0);
});