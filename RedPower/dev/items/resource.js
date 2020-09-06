IDRegistry.genItemID("ingotRed");
Item.createItem("ingotRed", "Red Alloy Ingot", {name: "ingot_red"});

IDRegistry.genItemID("ingotBlue");
Item.createItem("ingotBlue", "Blue Alloy Ingot", {name: "ingot_blue"});

IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "Bronze Ingot", {name: "ingot_bronze"});

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "Tin Ingot", {name: "ingot_tin"});

IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "Copper Ingot", {name: "ingot_copper"});

IDRegistry.genItemID("ingotSilver");
Item.createItem("ingotSilver", "Silver Ingot", {name: "ingot_silver"});

//IDRegistry.genItemID("ingotTungsten");
//Item.createItem("ingotTungsten", "Tungsten Ingot", {name: "ingot_tungsten"});

Item.addCreativeGroup("ingot", Translation.translate("Ingots"), [
	ItemID.ingotRed,
	ItemID.ingotBlue,
	ItemID.ingotBronze,
	ItemID.ingotTin,
	ItemID.ingotCopper,
	ItemID.ingotSilver
]);

IDRegistry.genItemID("nikolite");
Item.createItem("nikolite", "Nikolite", {name: "nikolite"});
ChargeItemRegistry.registerFlashItem(ItemID.nikolite, "Bt", 1000, 0);

IDRegistry.genItemID("gemRuby");
Item.createItem("gemRuby", "Ruby", {name: "ruby"});

IDRegistry.genItemID("gemSapphire");
Item.createItem("gemSapphire", "Sapphire", {name: "sapphire"});

IDRegistry.genItemID("gemGreenSapphire");
Item.createItem("gemGreenSapphire", "Green Sapphire", {name: "green_sapphire"});

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