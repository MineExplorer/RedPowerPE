IDRegistry.genItemID("lumar");
Item.createItem("lumar", "Lumar", {name: "lumar"}, {isTech: true});

Item.registerIconOverrideFunction(ItemID.lumar, function(item, name){
	return {name: "lumar", meta: item.data}
});

Item.addCreativeGroup("lumar", Translation.translate("Lumar"), [
	ItemID.lumar,
]);

var LumarNameEn = ["White Lumar", "Orange Lumar", "Magenta Lumar", "Light Blue Lumar", "Yellow Lumar", "Lime Lumar", "Pink Lumar", "Gray Lumar", "Light Gray Lumar", "Cyan Lumar", "Purple Lumar", "Blue Lumar", "Brown Lumar", "Green Lumar", "Red Lumar", "Black Lumar"];
var LumarNameRu = ["Белый светодиод", "Оранжевый светодиод", "Пурпурный светодиод", "Голубой светодиод", "Жёлтый светодиод", "Лаймовый светодиод", "Розовый светодиод", "Серый светодиод", "Светло-серый светодиод", "Бирюзовый светодиод", "Фиолетовый светодиод", "Синий светодиод", "Коричневый светодиод", "Зелёный светодиод", "Красный светодиод", "Чёрный светодиод"];
for(let i = 0; i < 16; i++){
	Translation.addTranslation(LumarNameEn[i], {ru: LumarNameRu[i]});
	Item.addToCreative(ItemID.lumar, 1, i);
}

Item.registerNameOverrideFunction(ItemID.lumar, function(item, name){
	return Translation.translate(LumarNameEn[item.data]);
});

Recipes.addShaped({id: ItemID.lumar, count: 2, data: 0}, [
	"xa",
	"bx"
], ['x', 351, 19, 'a', 348, 0, 'b', 331, 0]);

for(let i = 14; i >= 5; i--){
	Recipes.addShaped({id: ItemID.lumar, count: 2, data: 15 - i}, [
		"xa",
		"bx"
	], ['x', 351, i, 'a', 348, 0, 'b', 331, 0]);
}

Recipes.addShaped({id: ItemID.lumar, count: 2, data: 11}, [
	"xa",
	"bx"
], ['x', 351, 18, 'a', 348, 0, 'b', 331, 0]);

Recipes.addShaped({id: ItemID.lumar, count: 2, data: 12}, [
	"xa",
	"bx"
], ['x', 351, 17, 'a', 348, 0, 'b', 331, 0]);

Recipes.addShaped({id: ItemID.lumar, count: 2, data: 13}, [
	"xa",
	"bx"
], ['x', 351, 2, 'a', 348, 0, 'b', 331, 0]);

Recipes.addShaped({id: ItemID.lumar, count: 2, data: 14}, [
	"xa",
	"bx"
], ['x', 351, 1, 'a', 348, 0, 'b', 331, 0]);

Recipes.addShaped({id: ItemID.lumar, count: 2, data: 15}, [
	"xa",
	"bx"
], ['x', 351, 16, 'a', 348, 0, 'b', 331, 0]);
