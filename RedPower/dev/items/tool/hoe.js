IDRegistry.genItemID("rubyHoe");
IDRegistry.genItemID("sapphireHoe");
IDRegistry.genItemID("greenSapphireHoe");

Item.createItem("rubyHoe", "Ruby Hoe", {name: "ruby_hoe", meta: 0}, {stack: 1});
Item.createItem("sapphireHoe", "Sapphire Hoe", {name: "sapphire_hoe", meta: 0}, {stack: 1});
Item.createItem("greenSapphireHoe", "Green Sapphire Hoe", {name: "green_sapphire_hoe", meta: 0}, {stack: 1});

Item.addCreativeGroup("rp_hoes", Translation.translate("Hoes"), [
	ItemID.rubyHoe,
	ItemID.sapphireHoe,
	ItemID.greenSapphireHoe
]);

ToolLib.setTool(ItemID.rubyHoe, "ruby", ToolType.hoe);
ToolLib.setTool(ItemID.greenSapphireHoe, "sapphire", ToolType.hoe);
ToolLib.setTool(ItemID.sapphireHoe, "sapphire", ToolType.hoe);

Recipes.addShaped({id: ItemID.rubyHoe, count: 1, data: 0}, [
	"aa",
	" b",
	" b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sapphireHoe, count: 1, data: 0}, [
	"aa",
	" b",
	" b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.greenSapphireHoe, count: 1, data: 0}, [
	"aa",
	" b",
	" b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);