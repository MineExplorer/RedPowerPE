ItemRegistry.createTool("rubyShovel", {name: "Ruby Shovel", icon: "ruby_shovel", material: "ruby"}, ToolType.SHOVEL);
ItemRegistry.createTool("sapphireShovel", {name: "Sapphire Shovel", icon: "sapphire_shovel", material: "sapphire"}, ToolType.SHOVEL);
ItemRegistry.createTool("greenSapphireShovel", {name: "Green Sapphire Shovel", icon: "green_sapphire_shovel", material: "greenSapphire"}, ToolType.SHOVEL);

Item.addCreativeGroup("rp_shovels", Translation.translate("Shovels"), [
	ItemID.rubyShovel,
	ItemID.sapphireShovel,
	ItemID.greenSapphireShovel
]);

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