BlockRegistry.createBlockType("cable",{
	destroyTime: 0.05,
	explosionResistance: 0.5,
	renderLayer: 3,
});

BlockRegistry.createBlock("blueWire", [
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

BT.registerWire(BlockID.blueWire, 100);
TileRenderer.setupWireModel(BlockID.blueWire, 0, 1/4, "bt-wire");
