let RecipeViewer: {Core: any, RecipeType: typeof RecipeType, RecipeTypeRegistry: RecipeTypeRegistry};

ModAPI.addAPICallback("RecipeViewer", function(api: typeof RecipeViewer) {
	RecipeViewer = api;

	RecipeViewer.Core.addListByData(ItemID.lumar, 16, "item");
	RecipeViewer.Core.addListByData(ItemID.canvasBag, 16, "item");

	class SmelterRecipeType extends api.RecipeType {
		constructor() {
			super(Translation.translate("Smelter"), BlockID.rp_smelter, {
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
			});
		}

		getAllList(): RecipePattern[] {
			const list: RecipePattern[] = [];
			for (let i in SmelterRecipes.recipeData) {
				const recipe = SmelterRecipes.recipeData[i];
				list.push({
					input: recipe.input,
					output: [recipe.result]
				});
			}
			return list;
		}
	}

	api.RecipeTypeRegistry.register("rp_smelter", new SmelterRecipeType());
});