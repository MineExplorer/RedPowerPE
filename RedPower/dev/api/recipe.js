let SmelterRecipes = {
	recipeData: [],
	addRecipe: function(result, input){
		this.recipeData.push({input: input, result: result});
	},
	getRecipe: function(input){
		for(let i in this.recipeData){
			let recipe = this.recipeData[i];
			let valid = true;
			for(let j in recipe.input){
				let source = recipe.input[j];
				let count = input[source.id];
				if(!count || count < source.count){
					valid = false;
					break;
				}
			}
			if(valid){
				return recipe;
			}
		}
	},
	performRecipe: function(recipe, container){
		let resultSlot = container.getSlot("slotResult");
		for(let i in recipe.input){
			let count = recipe.input[i].count;
			for(let j = 1; j <= 4; j++){
				let slot = container.getSlot("slotSource" + j);
				if(slot.id == recipe.input[i].id){
					let c = Math.min(count, slot.count);
					slot.count -= c;
					count -= c;
				}
			}
		}
		resultSlot.id = recipe.result.id;
		resultSlot.count += recipe.result.count;
		container.validateAll();
	}
}