namespace SmelterRecipes {
	type RecipeFormat = {result: {id: number, count: number, data?: number}, input: {id: number, count: number}[]};

	let recipeData: RecipeFormat[] = [];

	export function addRecipe(result: RecipeFormat["result"], input: RecipeFormat["input"]): void {
		recipeData.push({input: input, result: result});
	}

	export function getRecipe(input: object): RecipeFormat {
		for (let i in recipeData) {
			let recipe = recipeData[i];
			let valid = true;
			for (let j in recipe.input) {
				let source = recipe.input[j];
				let count = input[source.id];
				if (!count || count < source.count) {
					valid = false;
					break;
				}
			}
			if (valid) {
				return recipe;
			}
		}
	}

	export function performRecipe(recipe: RecipeFormat, container: ItemContainer) {
		let resultSlot = container.getSlot("slotResult");
		for (let i in recipe.input) {
			let count = recipe.input[i].count;
			for (let j = 1; j <= 4; j++) {
				let slot = container.getSlot("slotSource" + j);
				if (slot.id == recipe.input[i].id) {
					let dc = Math.min(count, slot.count);
					count -= dc;
					slot.setSlot(slot.id, slot.count - dc, slot.data);
					slot.validate();
				}
			}
		}
		resultSlot.setSlot(recipe.result.id, resultSlot.count + recipe.result.count, recipe.result.data || 0);
		container.validateAll();
	}
}