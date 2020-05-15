IDRegistry.genItemID("canvas");
Item.createItem("canvas", "Canvas", {name: "canvas", meta: 0});

IDRegistry.genItemID("canvasBag");
Item.createItem("canvasBag", "Canvas Bag", {name: "canvas_bag", meta: 0}, {stack: 1});
Item.registerIconOverrideFunction(ItemID.canvasBag, function(item, name){
	return {name: "canvas_bag", meta: item.data};
});
BackpackRegistry.register(ItemID.canvasBag, {
	title: "Canvas Bag",
	slots: 27,
	inRow: 9,
	slotsCenter: true,
	useExtraData: true
});
for(let i = 1; i < 16; i++){
	Item.addToCreative(ItemID.canvasBag, 1, i);
}
Item.addCreativeGroup("canvasBag", Translation.translate("Canvas Bag"), [ItemID.canvasBag]);

Recipes.addShaped({id: ItemID.canvas, count: 1, data: 0}, [
	"aaa",
	"axa",
	"aaa"
], ['x', 280, 0, 'a', 287, 0]);

Recipes.addShaped({id: ItemID.canvasBag, count: 1, data: 0}, [
	"aaa",
	"a a",
	"aaa"
], ['a', ItemID.canvas, 0]);

for(let i = 1; i <= 10; i++){
	Recipes.addShaped({id: ItemID.canvasBag, count: 1, data: i}, [
		"aaa",
		"axa",
		"aaa"
	], ['x', 351, 15 - i, 'a', ItemID.canvas, 0]);
}

Recipes.addShaped({id: ItemID.canvasBag, count: 1, data: 11}, [
	"aaa",
	"axa",
	"aaa"
], ['x', 351, 18, 'a', ItemID.canvas, 0]);

Recipes.addShaped({id: ItemID.canvasBag, count: 1, data: 12}, [
	"aaa",
	"axa",
	"aaa"
], ['x', 351, 17, 'a', ItemID.canvas, 0]);

Recipes.addShaped({id: ItemID.canvasBag, count: 1, data: 13}, [
	"aaa",
	"axa",
	"aaa"
], ['x', 351, 2, 'a', ItemID.canvas, 0]);

Recipes.addShaped({id: ItemID.canvasBag, count: 1, data: 14}, [
	"aaa",
	"axa",
	"aaa"
], ['x', 351, 1, 'a', ItemID.canvas, 0]);

Recipes.addShaped({id: ItemID.canvasBag, count: 1, data: 15}, [
	"aaa",
	"axa",
	"aaa"
], ['x', 351, 16, 'a', ItemID.canvas, 0]);
