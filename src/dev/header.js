// libraries
IMPORT("BlockEngine");
IMPORT("flags");
IMPORT("BaseBlocks");
IMPORT("ToolLib", "ToolLib");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("BackpackAPI");
IMPORT("StorageInterface");
IMPORT("VanillaRecipe");

VanillaRecipe.setResourcePath(__dir__ + "assets/res/");
VanillaRecipe.setBehaviorPath(__dir__ + "assets/behavior_packs/");

// constants
const GUI_SCALE = 3.2;

const COLOR_INDEX_TO_DYE = {
	0: "white_dye",
	1: "orange_dye",
	2: "magenta_dye",
	3: "light_blue_dye",
	4: "yellow_dye",
	5: "lime_dye",
	6: "pink_dye",
	7: "gray_dye",
	8: "light_gray_dye",
	9: "cyan_dye",
	10: "purple_dye",
	11: "blue_dye",
	12: "brown_dye",
	13: "green_dye",
	14: "red_dye",
	15: "black_dye"
}

// API
function randomInt(min, max) {
	return Math.floor(min + Math.random() * (max - min + 1));
}

// blutricity
const BT = EnergyTypeRegistry.assureEnergyType("Bt", 1);
const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);