IDRegistry.genItemID("siliconBoule");
Item.createItem("siliconBoule", "Silicon Boule", {name: "silicon_boule"});

IDRegistry.genItemID("waferSilicon");
Item.createItem("waferSilicon", "Silicon Wafer", {name: "wafer_silicon"});

IDRegistry.genItemID("waferRed");
Item.createItem("waferRed", "Red-Doped Wafer", {name: "wafer_red"});

IDRegistry.genItemID("waferBlue");
Item.createItem("waferBlue", "Blue-Doped Wafer", {name: "wafer_blue"});

IDRegistry.genItemID("fineCopperWire");
Item.createItem("fineCopperWire", "Fine Copper Wire", {name: "fine_copper_wire"});

IDRegistry.genItemID("fineIronWire");
Item.createItem("fineIronWire", "Fine Iron Wire", {name: "fine_iron_wire"});

IDRegistry.genItemID("copperCoil");
Item.createItem("copperCoil", "Copper Coil", {name: "copper_coil"});

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