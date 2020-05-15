IDRegistry.genItemID("rubyShovel");
IDRegistry.genItemID("sapphireShovel");
IDRegistry.genItemID("greenSapphireShovel");

Item.createItem("rubyShovel", "Ruby Shovel", {name: "ruby_shovel", meta: 0}, {stack: 1});
Item.createItem("sapphireShovel", "Sapphire Shovel", {name: "sapphire_shovel", meta: 0}, {stack: 1});
Item.createItem("greenSapphireShovel", "Green Sapphire Shovel", {name: "green_sapphire_shovel", meta: 0}, {stack: 1});

Item.addCreativeGroup("rp_shovels", Translation.translate("Shovels"), [
	ItemID.rubyShovel,
	ItemID.sapphireShovel,
	ItemID.greenSapphireShovel
]);

Item.addRepairItemIds(ItemID.rubyShovel, [ItemID.gemRuby]);
Item.addRepairItemIds(ItemID.sapphireShovel, [ItemID.gemSapphire]);
Item.addRepairItemIds(ItemID.greenSapphireShovel, [ItemID.gemGreenSapphire]);

ToolLib.setTool(ItemID.rubyShovel, "ruby", ToolType.shovel);
ToolLib.setTool(ItemID.sapphireShovel, "sapphire", ToolType.shovel);
ToolLib.setTool(ItemID.greenSapphireShovel, "sapphire", ToolType.shovel);

Recipes.addShaped({id: ItemID.rubyShovel, count: 1, data: 0}, [
	"a",
	"b",
	"b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sapphireShovel, count: 1, data: 0}, [
	"a",
	"b",
	"b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.greenSapphireShovel, count: 1, data: 0}, [
	"a",
	"b",
	"b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);