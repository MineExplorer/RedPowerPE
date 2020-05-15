ModAPI.addAPICallback("RecipeViewer", function(api){
	let RecipeViewer = api.Core;
	const Bitmap = android.graphics.Bitmap;
	const Canvas = android.graphics.Canvas;
	const Rect = android.graphics.Rect;

	let bmp, cvs, source;
	let x = y = 0;

	RecipeViewer.registerRecipeType("rp_smelter", {
		contents: {
			icon: BlockID.rpSmelter,
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
		getList: function(id, data, isUsage){
			let list = [];
			if(isUsage){
				for(let i in SmelterRecipes.recipeData){
					let recipe = SmelterRecipes.recipeData[i];
					for(let j in recipe.input){
						if(recipe.input[j].id == id){
							list.push({
								input: recipe.input,
								output: [recipe.result]
							});
						}
					}
				}
			}
			else {
				for(let i in SmelterRecipes.recipeData){
					let recipe = SmelterRecipes.recipeData[i];
					if(recipe.result.id == id){
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