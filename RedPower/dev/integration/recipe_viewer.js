ModAPI.addAPICallback("RecipeViewer", function(api) {
	let RecipeViewer = api.Core;
	
	if (RecipeViewer.addListByData) {
		RecipeViewer.addListByData(ItemID.lumar, 16, "item");
		RecipeViewer.addListByData(ItemID.canvasBag, 16, "item");
	}

	RecipeViewer.registerRecipeType("rp_smelter", {
		contents: {
			icon: BlockID.rp_smelter,
			drawing: [
				{type: "bitmap", x: 500, y: 222, bitmap: "furnace_bar_scale", scale: 6},
			],
			elements: {
				input0: {type: "slot", x: 240, y: 150, size: 120},
				input1: {type: "slot", x: 360, y: 150, size: 120},
				input2: {type: "slot", x: 240, y: 270, size: 120},
				input3: {type: "slot", x: 360, y: 270, size: 120},
				output0: {type: "slot", x: 652, y: 210, size: 120},
			}
		},
		getList: function(id, data, isUsage) {
			let list = [];
			if (isUsage) {
				for (let i in SmelterRecipes.recipeData) {
					let recipe = SmelterRecipes.recipeData[i];
					for (let j in recipe.input) {
						if (recipe.input[j].id == id) {
							list.push({
								input: recipe.input,
								output: [recipe.result]
							});
						}
					}
				}
			}
			else {
				for (let i in SmelterRecipes.recipeData) {
					let recipe = SmelterRecipes.recipeData[i];
					if (recipe.result.id == id) {
						list.push({
							input: recipe.input,
							output: [recipe.result]
						});
					}
				}
			}
			return list;
		}
	});
});