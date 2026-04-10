ItemRegistry.createItem("siliconBoule", {name: "Silicon Boule", icon: "rp_silicon_boule"});
ItemRegistry.createItem("waferSilicon", {name: "Silicon Wafer", icon: "rp_wafer_silicon"});
ItemRegistry.createItem("waferRed", {name: "Red-Doped Wafer", icon: "rp_wafer_red"});
ItemRegistry.createItem("waferBlue", {name: "Blue-Doped Wafer", icon: "rp_wafer_blue"});
ItemRegistry.createItem("fineCopperWire", {name: "Fine Copper Wire", icon: "rp_fine_copper_wire"});
ItemRegistry.createItem("fineIronWire", {name: "Fine Iron Wire", icon: "rp_fine_iron_wire"});
ItemRegistry.createItem("copperCoil", {name: "Copper Coil", icon: "rp_copper_coil"});

Callback.addCallback("PreLoaded", function() {
	addRecipeWithCraftingTool({id: ItemID.waferSilicon, count: 16, data: 0}, [{id: ItemID.siliconBoule, data: 0}], ItemID.handsawDiamond);

	addRecipeWithCraftingTool({id: ItemID.fineCopperWire, count: 1, data: 0}, [{id: ItemID.ingotCopper, data: 0}], ItemID.diamondDrawplate);
	addRecipeWithCraftingTool({id: ItemID.fineIronWire, count: 1, data: 0}, [{id: 265, data: 0}], ItemID.diamondDrawplate);
	Recipes.addShaped({id: ItemID.copperCoil, count: 1, data: 0}, [
		"cxc",
		"x#x",
		"cxc"
	], ['#', 265, 0, 'x', 101, 0, 'c', ItemID.fineCopperWire, 0]);
});