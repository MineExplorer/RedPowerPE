IDRegistry.genItemID("handsawDiamond");
Item.createItem("handsawDiamond", "Diamond Handsaw", {name: "handsaw_diamond", meta: 0}, {stack: 1});

Item.setMaxDamage(ItemID.handsawDiamond, 1562);

Recipes.addShaped({id: ItemID.handsawDiamond, count: 1, data: 0}, [
	"rrr",
	" aa",
	" dd"
], ['a', 265, 0, 'd', 264, 0, 'r', 280, 0]);

function addRecipeWithCraftingTool(result, data, tool){
	data.push({id: tool, data: -1});
	Recipes.addShapeless(result, data, function(api, field, result){
		for(var i in field){
			if(field[i].id == tool){
				field[i].data++;
				if(field[i].data >= Item.getMaxDamage(tool.id)){
					field[i].id = field[i].count = field[i].data = 0;
				}
			}
			else {
				api.decreaseFieldSlot(i);
			}
		}
	});
}