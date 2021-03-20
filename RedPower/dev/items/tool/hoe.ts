ItemRegistry.createTool("rubyHoe", {name: "Ruby Hoe", icon: "ruby_hoe", material: "ruby"}, ToolType.HOE);
ItemRegistry.createTool("sapphireHoe", {name: "Sapphire Hoe", icon: "sapphire_hoe", material: "sapphire"}, ToolType.HOE);
ItemRegistry.createTool("greenSapphireHoe", {name: "Green Sapphire Hoe", icon: "green_sapphire_hoe", material: "greenSapphire"}, ToolType.HOE);

Item.addCreativeGroup("rp_hoes", Translation.translate("Hoes"), [
	ItemID.rubyHoe,
	ItemID.sapphireHoe,
	ItemID.greenSapphireHoe
]);

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