namespace SmelterRecipes {
	export type RecipeFormat = {result: ItemInstance, input: ItemInstance[]};

	export const recipeData: RecipeFormat[] = [];

	export function addRecipe(result: {id: number, count: number, data?: number}, input: {id: number, count: number, data?: number}[]): void {
		result.data ??= 0;
		for (let item of input) {
			item.data ??= -1;
		}
		recipeData.push({input: input as ItemInstance[], result: result as ItemInstance});
	}

	export function removeRecipe(inputItems: ItemInstance[]): Nullable<ItemInstance> {
		const recipe = getRecipe(inputItems);
		if (recipe) {
			recipeData.splice(recipeData.indexOf(recipe), 1);
			return recipe.result;
		}
		return null;
	}

	export function getInput(container: ItemContainer): ItemInstance[] {
		const inputItems: ItemInstance[] = [];
		for (let i = 1; i <= 4; i++) {
			const slot = container.getSlot("slotSource" + i);
			if (slot.id > 0) {
				inputItems.push(new ItemStack(slot));
			}
		}
		return inputItems;
	}

	export function getRecipe(inputItems: ItemInstance[]): RecipeFormat {
		if (inputItems.length == 0) return null;
		for (let recipe of recipeData) {
			let valid = true;
			for (let item of recipe.input) {
				let count = 0;
				for (let slot of inputItems) {
					if (item.id == slot.id && (item.data == -1 || item.data == slot.data)) {
						count += slot.count;
					}
				}
				if (count < item.count) {
					valid = false;
					break;
				}
			}
			if (valid) {
				return recipe;
			}
		}
		return null;
	}

	export function performRecipe(recipe: RecipeFormat, container: ItemContainer) {
		const resultSlot = container.getSlot("slotResult");
		for (let item of recipe.input) {
			let count = item.count;
			for (let i = 1; i <= 4; i++) {
				const slot = container.getSlot("slotSource" + i);
				if (item.id == slot.id && (item.data == -1 || item.data == slot.data)) {
					const dc = Math.min(count, slot.count);
					count -= dc;
					slot.setSlot(slot.id, slot.count - dc, slot.data);
					slot.validate();
				}
			}
		}
		resultSlot.setSlot(recipe.result.id, resultSlot.count + recipe.result.count, recipe.result.data);
		container.validateAll();
	}
}