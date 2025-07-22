ItemRegistry.createItem("lumar", {name: "Lumar", icon: "lumar", inCreative: false});

Item.registerIconOverrideFunction(ItemID.lumar, function(item, name) {
	return {name: "lumar", meta: item.data}
});

Item.addCreativeGroup("lumar", Translation.translate("Lumar"), [
	ItemID.lumar,
]);

const LumarNameEn = ["White Lumar", "Orange Lumar", "Magenta Lumar", "Light Blue Lumar", "Yellow Lumar", "Lime Lumar", "Pink Lumar", "Gray Lumar", "Light Gray Lumar", "Cyan Lumar", "Purple Lumar", "Blue Lumar", "Brown Lumar", "Green Lumar", "Red Lumar", "Black Lumar"];
for (let i = 0; i < 16; i++) {
	Item.addToCreative(ItemID.lumar, 1, i);
}

Item.registerNameOverrideFunction(ItemID.lumar, function(item, name) {
	return Translation.translate(LumarNameEn[item.data]);
});

for (let index = 0; index < 16; index++) {
	const dyeItem = BlockEngine.getMainGameVersion() == 11 ? 
        {id: VanillaItemID.dye, data: COLOR_INDEX_TO_DYE_DATA[index]} :
        {id: VanillaItemID[COLOR_INDEX_TO_DYE[index]], data: 0};

	Recipes.addShaped({id: ItemID.lumar, count: 2, data: index}, [
        "XG",
        "RX"
    ], [
        'X', dyeItem.id, dyeItem.data,
        'R', VanillaItemID.redstone, 0,
        'G', VanillaItemID.glowstone_dust, 0
    ]);
}
