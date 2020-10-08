// libraries
IMPORT("flags");
IMPORT("BaseBlocks");
IMPORT("ToolLib");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("BackpackAPI");
IMPORT("StorageInterface");
IMPORT("VanillaRecipe");

VanillaRecipe.setResourcePath(__dir__ + "res/")

// constants
const GUI_SCALE = 3.2;

const COLOR_INDEX_TO_DYE_DATA = {
	0: 19,
	1: 14,
	2: 13,
	3: 12,
	4: 11,
	5: 10,
	6: 9,
	7: 8,
	8: 7,
	9: 6,
	10: 5,
	11: 18,
	12: 17,
	13: 2,
	14: 1,
	15: 16
}

// API
function randomInt(min, max) {
	return Math.floor(min + Math.random() * (max - min + 1));
}

function Vector(x, y, z) {
	return {x: x, y: y, z: z};
}

// blutricity
var BT = EnergyTypeRegistry.assureEnergyType("Bt", 1);
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
