IDRegistry.genItemID("siliconBoule");
Item.createItem("siliconBoule", "Silicon Boule", {name: "silicon_boule"});

IDRegistry.genItemID("waferSilicon");
Item.createItem("waferSilicon", "Silicon Wafer", {name: "wafer_silicon"});

IDRegistry.genItemID("waferRed");
Item.createItem("waferRed", "Red-Doped Wafer", {name: "wafer_red"});

IDRegistry.genItemID("waferBlue");
Item.createItem("waferBlue", "Blue-Doped Wafer", {name: "wafer_blue"});

Callback.addCallback("PreLoaded", function(){
	addRecipeWithCraftingTool({id: ItemID.waferSilicon, count: 16, data: 0}, [{id: ItemID.siliconBoule, data: 0}], ItemID.handsawDiamond);
});