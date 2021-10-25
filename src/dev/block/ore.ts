Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 3,
	explosionres: 15,
	lightopacity: 15,
	renderlayer: 2,
	translucency: 0,
	sound: "stone"
}, "ore");

BlockRegistry.createBlock("oreCopper", [
	{name: "Copper Ore", texture: [["ore_copper", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 2, true);
BlockRegistry.setDestroyLevel("oreCopper", 2);

BlockRegistry.createBlock("oreTin", [
	{name: "Tin Ore", texture: [["ore_tin", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 2, true);
BlockRegistry.setDestroyLevel("oreTin", 2);

BlockRegistry.createBlock("oreSilver", [
	{name: "Silver Ore", texture: [["ore_silver", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreSilver, "stone", 3, true);
BlockRegistry.setDestroyLevel("oreSilver", 3);

BlockRegistry.createBlock("oreTungsten", [
	{name: "Tungsten Ore", texture: [["ore_tungsten", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreTungsten, "stone", 3, true);
BlockRegistry.setDestroyLevel("oreTungsten", 3);

BlockRegistry.createBlock("oreNikolite", [
	{name: "Nikolite Ore", texture: [["ore_nikolite", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreNikolite, "stone", 3, true);
BlockRegistry.registerDrop("oreNikolite", function(coords, blockID, blockData, level, enchant) {
	if (enchant.silk) {
		return [[blockID, 1, 0]];
	}
	ToolAPI.dropOreExp(coords, 2, 5, enchant.experience);
	let drop = [];
	let count = randomInt(4, 5) + randomInt(0, enchant.fortune);
	for (let i = 0; i < count; i++) {
		drop.push([ItemID.nikolite, 1, 0]);
	}
	return drop;
}, 3);

BlockRegistry.createBlock("oreRuby", [
	{name: "Ruby Ore", texture: [["ore_ruby", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreRuby, "stone", 3, true);
BlockRegistry.registerDrop("oreRuby", function(coords, blockID, blockData, level, enchant) {
	if (enchant.silk) {
		return [[blockID, 1, 0]];
	}
	ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
	let drop = [];
	let count = randomInt(1, 3);
	for (let i = 0; i < count; i++) {
		drop.push([ItemID.gemRuby, 1, 0]);
	}
	return ToolAPI.fortuneDropModifier(drop, enchant.fortune);
}, 3);

BlockRegistry.createBlock("oreSapphire", [
	{name: "Sapphire Ore", texture: [["ore_sapphire", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreSapphire, "stone", 3, true);
BlockRegistry.registerDrop("oreSapphire", function(coords, blockID, blockData, level, enchant) {
	if (enchant.silk) {
		return [[blockID, 1, 0]];
	}
	ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
	let drop = [];
	let count = randomInt(1, 3);
	for (let i = 0; i < count; i++) {
		drop.push([ItemID.gemSapphire, 1, 0]);
	}
	return ToolAPI.fortuneDropModifier(drop, enchant.fortune);
}, 3);

BlockRegistry.createBlock("oreGreenSapphire", [
	{name: "Sapphire Ore", texture: [["ore_green_sapphire", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreGreenSapphire, "stone", 3, true);
BlockRegistry.registerDrop("oreGreenSapphire", function(coords, blockID, blockData, level, enchant) {
	if (enchant.silk) {
		return [[blockID, 1, 0]];
	}
	ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
	let drop = [];
	let count = randomInt(1, 3);
	for (let i = 0; i < count; i++) {
		drop.push([ItemID.gemGreenSapphire, 1, 0]);
	}
	return ToolAPI.fortuneDropModifier(drop, enchant.fortune);
}, 3);

Item.addCreativeGroup("ores", Translation.translate("Ores"), [
	BlockID.oreCopper,
	BlockID.oreTin,
	BlockID.oreSilver,
	BlockID.oreTungsten,
	BlockID.oreNikolite,
	BlockID.oreRuby,
	BlockID.oreSapphire,
	BlockID.oreGreenSapphire
]);
