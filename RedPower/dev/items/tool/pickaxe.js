IDRegistry.genItemID("rubyPickaxe");
IDRegistry.genItemID("sapphirePickaxe");
IDRegistry.genItemID("greenSapphirePickaxe");

Item.createItem("rubyPickaxe", "Ruby Pickaxe", {name: "ruby_pickaxe", meta: 0}, {stack: 1});
Item.createItem("sapphirePickaxe", "Sapphire Pickaxe", {name: "sapphire_pickaxe", meta: 0}, {stack: 1});
Item.createItem("greenSapphirePickaxe", "Green Sapphire Pickaxe", {name: "green_sapphire_pickaxe", meta: 0}, {stack: 1});

Item.addCreativeGroup("rp_pickaxes", Translation.translate("Pickaxes"), [
	ItemID.rubyPickaxe,
	ItemID.sapphirePickaxe,
	ItemID.greenSapphirePickaxe
]);

Item.addRepairItemIds(ItemID.rubyPickaxe, [ItemID.gemRuby]);
Item.addRepairItemIds(ItemID.sapphirePickaxe, [ItemID.gemSapphire]);
Item.addRepairItemIds(ItemID.greenSapphirePickaxe, [ItemID.gemGreenSapphire]);

ToolLib.setTool(ItemID.rubyPickaxe, "ruby", ToolType.pickaxe);
ToolLib.setTool(ItemID.sapphirePickaxe, "sapphire", ToolType.pickaxe);
ToolLib.setTool(ItemID.greenSapphirePickaxe, "sapphire", ToolType.pickaxe);

Recipes.addShaped({id: ItemID.rubyPickaxe, count: 1, data: 0}, [
	"aaa",
	" b ",
	" b "
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sapphirePickaxe, count: 1, data: 0}, [
	"aaa",
	" b ",
	" b "
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.greenSapphirePickaxe, count: 1, data: 0}, [
	"aaa",
	" b ",
	" b "
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);