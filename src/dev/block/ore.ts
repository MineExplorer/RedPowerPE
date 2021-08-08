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

IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
	{name: "Copper Ore", texture: [["ore_copper", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 2, true);
Block.setDestroyLevel("oreCopper", 2);
ToolLib.addBlockDropOnExplosion("oreCopper");

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
	{name: "Tin Ore", texture: [["ore_tin", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 2, true);
Block.setDestroyLevel("oreTin", 2);
ToolLib.addBlockDropOnExplosion("oreTin");

IDRegistry.genBlockID("oreSilver");
Block.createBlock("oreSilver", [
	{name: "Silver Ore", texture: [["ore_silver", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreSilver, "stone", 3, true);
Block.setDestroyLevel("oreSilver", 3);
ToolLib.addBlockDropOnExplosion("oreSilver");

IDRegistry.genBlockID("oreTungsten");
Block.createBlock("oreTungsten", [
	{name: "Tungsten Ore", texture: [["ore_tungsten", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreTungsten, "stone", 3, true);
Block.setDestroyLevel("oreTungsten", 3);
ToolLib.addBlockDropOnExplosion("oreTungsten");

IDRegistry.genBlockID("oreNikolite");
Block.createBlock("oreNikolite", [
	{name: "Nikolite Ore", texture: [["ore_nikolite", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreNikolite, "stone", 3, true);
Block.registerDropFunction("oreNikolite", function(coords, blockID, blockData, level, enchant) {
	if (level > 2) {
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
	}
	return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreNikolite");

IDRegistry.genBlockID("oreRuby");
Block.createBlock("oreRuby", [
	{name: "Ruby Ore", texture: [["ore_ruby", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreRuby, "stone", 3, true);
Block.registerDropFunction("oreRuby", function(coords, blockID, blockData, level, enchant) {
	if (level > 2) {
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
	}
	return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreRuby");

IDRegistry.genBlockID("oreSapphire");
Block.createBlock("oreSapphire", [
	{name: "Sapphire Ore", texture: [["ore_sapphire", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreSapphire, "stone", 3, true);
Block.registerDropFunction("oreSapphire", function(coords, blockID, blockData, level, enchant) {
	if (level > 2) {
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
	}
	return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreSapphire");

IDRegistry.genBlockID("oreGreenSapphire");
Block.createBlock("oreGreenSapphire", [
	{name: "Sapphire Ore", texture: [["ore_green_sapphire", 0]], inCreative: true}
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreGreenSapphire, "stone", 3, true);
Block.registerDropFunction("oreGreenSapphire", function(coords, blockID, blockData, level, enchant) {
	if (level > 2) {
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
	}
	return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreGreenSapphire");

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
