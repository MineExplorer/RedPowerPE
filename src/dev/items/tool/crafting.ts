ItemRegistry.createItem("handsawDiamond", {name: "Diamond Handsaw", icon: "handsaw_diamond", stack: 1, maxDamage: 1562, category: ItemCategory.EQUIPMENT});
ItemRegistry.createItem("diamondDrawplate", {name: "Diamond Drawplate", icon: "diamond_drawplate", stack: 1, category: ItemCategory.EQUIPMENT});
ItemRegistry.createItem("woolCard", {name: "Wool Card", icon: "wool_card", stack: 1, category: ItemCategory.EQUIPMENT});

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

	VanillaRecipe.addShapelessRecipe("string_from_wool", {
		ingredients: [
		  { item: "wool" },
		  { item: "item:woolCard" }
		],
		result: [
		  { item: "string", count: 4 },
		  { item: "item:woolCard" }
		]
	});
});

function addRecipeWithCraftingTool(result, ingredients, toolID) {
	ingredients.push({id: toolID, data: -1});
	Recipes.addShapeless(result, ingredients, function(api, field, result) {
		for (let i = 0; i < field.length; i++) {
			const item = field[i];
			if (item.id == toolID) {
				const maxDamage = Item.getMaxDamage(toolID);
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