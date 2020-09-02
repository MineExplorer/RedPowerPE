// libraries
IMPORT("flags");
IMPORT("ToolLib");
IMPORT("energylib");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("BackpackAPI");
IMPORT("StorageInterface");
IMPORT("VanillaRecipe");

VanillaRecipe.setResourcePath(__dir__ + "res/")

// constants
var GUI_SCALE = 3.2;

// API
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Vector(x, y, z) {
	return {x: x, y: y, z: z};
}

// blutricity
var BT = EnergyTypeRegistry.assureEnergyType("Bu", 2);
