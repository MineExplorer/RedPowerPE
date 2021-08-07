ItemRegistry.createTool("rubyAxe", {name: "Ruby Axe", icon: "ruby_axe", material: "ruby"}, ToolType.AXE);
ItemRegistry.createTool("sapphireAxe", {name: "Sapphire Axe", icon: "sapphire_axe", material: "sapphire"}, ToolType.AXE);
ItemRegistry.createTool("greenSapphireAxe", {name: "Green Sapphire Axe", icon: "green_sapphire_axe", material: "greenSapphire"}, ToolType.AXE);

Item.addCreativeGroup("rp_axes", Translation.translate("Axes"), [
	ItemID.rubyAxe,
	ItemID.sapphireAxe,
	ItemID.greenSapphireAxe
]);

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