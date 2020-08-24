Block.createSpecialType({
	destroytime: 0.05,
	explosionres: 0.5,
	renderlayer: 3,
}, "cable");

IDRegistry.genBlockID("blueWire");
Block.createBlock("blueWire", [
	{name: "Blue Alloy Wire", texture: [["blue_wire", 0]], inCreative: true}
], "cable");

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.blueWire, count: 12, data: 0}, [
		"aaa",
		"xxx",
		"aaa"
	], ['x', ItemID.ingotBlue, 0, 'a', 35, -1]);
	Recipes.addShaped({id: BlockID.blueWire, count: 12, data: 0}, [
		"axa",
		"axa",
		"axa"
	], ['x', ItemID.ingotBlue, 0, 'a', 35, -1]);
});

BT.registerWire(BlockID.blueWire);
TileRenderer.setupWireModel(BlockID.blueWire, 0, 1/4, "bt-wire");
