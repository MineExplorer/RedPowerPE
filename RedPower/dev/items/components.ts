ItemRegistry.createItem("siliconBoule", {name: "Silicon Boule", icon: "silicon_boule"});
ItemRegistry.createItem("waferSilicon", {name: "Silicon Wafer", icon: "wafer_silicon"});
ItemRegistry.createItem("waferRed", {name: "Red-Doped Wafer", icon: "wafer_red"});
ItemRegistry.createItem("waferBlue", {name: "Blue-Doped Wafer", icon: "wafer_blue"});
ItemRegistry.createItem("fineCopperWire", {name: "Fine Copper Wire", icon: "fine_copper_wire"});
ItemRegistry.createItem("fineIronWire", {name: "Fine Iron Wire", icon: "fine_iron_wire"});
ItemRegistry.createItem("copperCoil", {name: "Copper Coil", icon: "copper_coil"});

Callback.addCallback("PreLoaded", function() {
	addRecipeWithCraftingTool({id: ItemID.waferSilicon, count: 16, data: 0}, [{id: ItemID.siliconBoule, data: 0}], ItemID.handsawDiamond);

	addRecipeWithCraftingTool({id: ItemID.fineCopperWire, count: 1, data: 0}, [{id: ItemID.ingotCopper, data: 0}], ItemID.diamondDrawplate);
	addRecipeWithCraftingTool({id: ItemID.fineIronWire, count: 1, data: 0}, [{id: 265, data: 0}], ItemID.diamondDrawplate);

	VanillaRecipe.addCraftingRecipe("fine_copper_wire", {
		type: "shaped",
		tags: ["crafting_table"],
		pattern: [
			"AX",
		],
		key: {
		  "A": { item: "item:ingotCopper" },
		  "X": { item: "item:diamondDrawplate" }
		},
		result: [
		  { item: "item:fineCopperWire" },
		  { item: "item:diamondDrawplate" }
		]
	});

	VanillaRecipe.addCraftingRecipe("fine_iron_wire", {
		type: "shaped",
		tags: ["crafting_table"],
		pattern: [
			"AX",
		],
		key: {
		  "A": { item: "iron_ingot" },
		  "X": { item: "item:diamondDrawplate" }
		},
		result: [
		  { item: "item:fineIronWire" },
		  { item: "item:diamondDrawplate" }
		]
	});

	Recipes.addShaped({id: ItemID.copperCoil, count: 1, data: 0}, [
		"cxc",
		"x#x",
		"cxc"
	], ['#', 265, 0, 'x', 101, 0, 'c', ItemID.fineCopperWire, 0]);
});