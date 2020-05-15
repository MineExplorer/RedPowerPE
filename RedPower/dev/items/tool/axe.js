IDRegistry.genItemID("rubyAxe");
IDRegistry.genItemID("sapphireAxe");
IDRegistry.genItemID("greenSapphireAxe");

Item.createItem("rubyAxe", "Ruby Axe", {name: "ruby_axe", meta: 0}, {stack: 1});
Item.createItem("sapphireAxe", "Sapphire Axe", {name: "sapphire_axe", meta: 0}, {stack: 1});
Item.createItem("greenSapphireAxe", "Green Sapphire Axe", {name: "green_sapphire_axe", meta: 0}, {stack: 1});

Item.addCreativeGroup("rp_axes", Translation.translate("Axes"), [
	ItemID.rubyAxe,
	ItemID.sapphireAxe,
	ItemID.greenSapphireAxe
]);

Item.addRepairItemIds(ItemID.rubyAxe, [ItemID.gemRuby]);
Item.addRepairItemIds(ItemID.sapphireAxe, [ItemID.gemSapphire]);
Item.addRepairItemIds(ItemID.greenSapphireAxe, [ItemID.gemGreenSapphire]);

ToolLib.setTool(ItemID.rubyAxe, "ruby", ToolType.axe);
ToolLib.setTool(ItemID.sapphireAxe, "sapphire", ToolType.axe);
ToolLib.setTool(ItemID.greenSapphireAxe, "sapphire", ToolType.axe);

Recipes.addShaped({id: ItemID.rubyAxe, count: 1, data: 0}, [
	"aa",
	"ab",
	" b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sapphireAxe, count: 1, data: 0}, [
	"aa",
	"ab",
	" b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.greenSapphireAxe, count: 1, data: 0}, [
	"aa",
	"ab",
	" b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);