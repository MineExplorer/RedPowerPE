ItemRegistry.addToolMaterial("ruby", {durability: 500, level: 3, efficiency: 8, damage: 3, enchantability: 11, repairMaterial: ItemID.gemRuby});
ItemRegistry.addToolMaterial("sapphire", {durability: 500, level: 3, efficiency: 8, damage: 2, enchantability: 11, repairMaterial: ItemID.gemSapphire});
ItemRegistry.addToolMaterial("greenSapphire", {durability: 500, level: 3, efficiency: 8, damage: 2, enchantability: 11, repairMaterial: ItemID.gemGreenSapphire});

ItemRegistry.createTool("rubySword", {name: "Ruby Sword", icon: "ruby_sword", material: "ruby"}, ToolType.SWORD);
ItemRegistry.createTool("sapphireSword", {name: "Sapphire Sword", icon: "sapphire_sword", material: "sapphire"}, ToolType.SWORD);
ItemRegistry.createTool("greenSapphireSword", {name: "Green Sapphire Sword", icon: "green_sapphire_sword", material: "greenSapphire"}, ToolType.SWORD);

Item.addCreativeGroup("rp_swords", Translation.translate("Swords"), [
	ItemID.rubySword,
	ItemID.sapphireSword,
	ItemID.greenSapphireSword
]);

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