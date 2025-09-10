ModAPI.addAPICallback("ICore", function(api) {
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 2}, [{id: ItemID.bronzeSword, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 1}, [{id: ItemID.bronzeShovel, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 3}, [{id: ItemID.bronzePickaxe, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 3}, [{id: ItemID.bronzeAxe, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 2}, [{id: ItemID.bronzeHoe, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 6}, [{id: ItemID.bronzeWrench, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 5}, [{id: ItemID.bronzeHelmet, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 8}, [{id: ItemID.bronzeChestplate, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 7}, [{id: ItemID.bronzeLeggings, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 4}, [{id: ItemID.bronzeBoots, count: 1, data: 0}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotTin, count: 2}, [{id: ItemID.cellEmpty, count: 1}]);

	// Casings
	SmelterRecipes.addRecipe({id: ItemID.ingotCopper, count: 1}, [{id: ItemID.casingCopper, count: 2}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotTin, count: 1}, [{id: ItemID.casingTin, count: 2}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotBronze, count: 1}, [{id: ItemID.casingBronze, count: 2}]);
	SmelterRecipes.addRecipe({id: 265, count: 1}, [{id: ItemID.casingIron, count: 2}]);
	SmelterRecipes.addRecipe({id: 266, count: 1}, [{id: ItemID.casingGold, count: 2}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotSteel, count: 1}, [{id: ItemID.casingSteel, count: 2}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotLead, count: 1}, [{id: ItemID.casingLead, count: 2}]);
	SmelterRecipes.addRecipe({id: ItemID.ingotSilver, count: 1}, [{id: ItemID.casingSilver, count: 2}]);
});
