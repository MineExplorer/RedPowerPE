ItemRegistry.createItem("lumar", {name: "Lumar", icon: "lumar", inCreative: false});

Item.registerIconOverrideFunction(ItemID.lumar, function(item, name) {
	return {name: "lumar", meta: item.data}
});

Item.addCreativeGroup("lumar", Translation.translate("Lumar"), [
	ItemID.lumar,
]);

const LumarNameEn = ["White Lumar", "Orange Lumar", "Magenta Lumar", "Light Blue Lumar", "Yellow Lumar", "Lime Lumar", "Pink Lumar", "Gray Lumar", "Light Gray Lumar", "Cyan Lumar", "Purple Lumar", "Blue Lumar", "Brown Lumar", "Green Lumar", "Red Lumar", "Black Lumar"];
const LumarNameRu = ["Белый светодиод", "Оранжевый светодиод", "Пурпурный светодиод", "Голубой светодиод", "Жёлтый светодиод", "Лаймовый светодиод", "Розовый светодиод", "Серый светодиод", "Светло-серый светодиод", "Бирюзовый светодиод", "Фиолетовый светодиод", "Синий светодиод", "Коричневый светодиод", "Зелёный светодиод", "Красный светодиод", "Чёрный светодиод"];
for (let i = 0; i < 16; i++) {
	Translation.addTranslation(LumarNameEn[i], {ru: LumarNameRu[i]});
	Item.addToCreative(ItemID.lumar, 1, i);
}

Item.registerNameOverrideFunction(ItemID.lumar, function(item, name) {
	return Translation.translate(LumarNameEn[item.data]);
});

for (let data = 0; data < 16; data++) {
	VanillaRecipe.addCraftingRecipe("lumar" + data, {
	  type: "shaped",
	  pattern: [
	    "XG",
	    "RX"
	  ],
	  key: {
	    "X": {
	      item: "dye",
	      data: COLOR_INDEX_TO_DYE_DATA[data]
	    },
	    "R": { item: "redstone" },
	    "G": { item: "glowstone_dust" }
	  },
	  result: {
		item: "item:lumar",
		count: 2,
	    data: data
	  }
	}, true);
}
