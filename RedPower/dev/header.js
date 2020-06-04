// libraries
IMPORT("flags");
IMPORT("ToolLib");
IMPORT("energylib");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("BackpackAPI");
IMPORT("StorageInterface");

// constants
var GUI_SCALE = 3.2;

// API
function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// blutricity
var BT = EnergyTypeRegistry.assureEnergyType("Bu", 2);
