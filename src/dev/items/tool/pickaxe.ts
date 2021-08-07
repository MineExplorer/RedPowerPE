ItemRegistry.createTool("rubyPickaxe", {name: "Ruby Pickaxe", icon: "ruby_pickaxe", material: "ruby"}, ToolType.PICKAXE);
ItemRegistry.createTool("sapphirePickaxe", {name: "Sapphire Pickaxe", icon: "sapphire_pickaxe", material: "sapphire"}, ToolType.PICKAXE);
ItemRegistry.createTool("greenSapphirePickaxe", {name: "Green Sapphire Pickaxe", icon: "green_sapphire_pickaxe", material: "greenSapphire"}, ToolType.PICKAXE);

Item.addCreativeGroup("rp_pickaxes", Translation.translate("Pickaxes"), [
	ItemID.rubyPickaxe,
	ItemID.sapphirePickaxe,
	ItemID.greenSapphirePickaxe
]);

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