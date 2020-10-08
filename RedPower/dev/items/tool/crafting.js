IDRegistry.genItemID("handsawDiamond");
Item.createItem("handsawDiamond", "Diamond Handsaw", {name: "handsaw_diamond"}, {stack: 1});
Item.setMaxDamage(ItemID.handsawDiamond, 1562);

IDRegistry.genItemID("diamondDrawplate");
Item.createItem("diamondDrawplate", "Diamond Drawplate", {name: "diamond_drawplate"}, {stack: 1});

IDRegistry.genItemID("woolCard");
Item.createItem("woolCard", "Wool Card", {name: "wool_card"}, {stack: 1});

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: ItemID.handsawDiamond, count: 1, data: 0}, [
		"rrr",
		" aa",
		" dd"
	], ['a', 265, 0, 'd', 264, 0, 'r', 280, 0]);

	Recipes.addShaped({id: ItemID.diamondDrawplate, count: 1, data: 0}, [
		" x ",
		"x#x",
		" x "
	], ['#', 264, 0, 'x', 265, 0]);

	Recipes.addShaped({id: ItemID.woolCard, count: 1, data: 0}, [
		"#",
		"p",
		"s"
	], ['#', ItemID.fineIronWire, 0, 'p', 5, -1, 's', 280, 0]);

	addRecipeWithCraftingTool({id: VanillaItemID.string, count: 4, data: 0}, [{id: 35, data: -1}], ItemID.woolCard);

	VanillaRecipe.addCraftingRecipe("string_from_wool", {
		type: "shaped",
		tags: ["crafting_table"],
		pattern: [
			"AX",
		],
		key: {
		  "A": { item: "wool" },
		  "X": { item: "item:woolCard" }
		},
		result: [
		  { item: "string", count: 4 },
		  { item: "item:woolCard" }
		]
	});
});

function addRecipeWithCraftingTool(result, ingredients, toolID) {
	ingredients.push({id: toolID, data: -1});
	Recipes.addShapeless(result, ingredients, function(api, field, result) {
		for (let i in field) {
			let item = field[i];
			if (item.id == toolID) {
				let maxDamage = Item.getMaxDamage(toolID);
				if (maxDamage > 0 && item.data++ >= maxDamage) {
					item.id = item.count = item.data = 0;
				}
			}
			else {
				api.decreaseFieldSlot(i);
			}
		}
	});
}