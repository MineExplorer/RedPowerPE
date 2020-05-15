IDRegistry.genItemID("rubySword");
IDRegistry.genItemID("sapphireSword");
IDRegistry.genItemID("greenSapphireSword");

Item.createItem("rubySword", "Ruby Sword", {name: "ruby_sword", meta: 0}, {stack: 1});
Item.createItem("sapphireSword", "Sapphire Sword", {name: "sapphire_sword", meta: 0}, {stack: 1});
Item.createItem("greenSapphireSword", "Green Sapphire Sword", {name: "green_sapphire_sword", meta: 0}, {stack: 1});

Item.addCreativeGroup("rp_swords", Translation.translate("Swords"), [
	ItemID.rubySword,
	ItemID.sapphireSword,
	ItemID.greenSapphireSword
]);

Item.addRepairItemIds(ItemID.rubySword, [ItemID.gemRuby]);
Item.addRepairItemIds(ItemID.sapphireSword, [ItemID.gemSapphire]);
Item.addRepairItemIds(ItemID.greenSapphireSword, [ItemID.gemGreenSapphire]);

ToolAPI.addToolMaterial("ruby", {durability: 500, level: 3, efficiency: 8, damage: 3, enchantability: 11});
ToolAPI.addToolMaterial("sapphire", {durability: 500, level: 3, efficiency: 8, damage: 2, enchantability: 11});

ToolLib.setTool(ItemID.rubySword, "ruby", ToolType.sword);
ToolLib.setTool(ItemID.sapphireSword, "sapphire", ToolType.sword);
ToolLib.setTool(ItemID.greenSapphireSword, "sapphire", ToolType.sword);

Recipes.addShaped({id: ItemID.rubySword, count: 1, data: 0}, [
	"a",
	"a",
	"b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sapphireSword, count: 1, data: 0}, [
	"a",
	"a",
	"b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.greenSapphireSword, count: 1, data: 0}, [
	"a",
	"a",
	"b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);