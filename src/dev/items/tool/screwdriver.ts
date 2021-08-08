ItemRegistry.createItem("rp_screwdriver", {name: "Screwdriver", icon: "rp_screwdriver", maxDamage: 200});
ItemRegistry.createItem("sonic_screwdriver", {name: "Sonic Screwdriver", icon: "sonic_screwdriver"});
ChargeItemRegistry.registerItem(ItemID.sonic_screwdriver, "Bt", 16000, 100, 0, true); // 400

VanillaRecipe.addCraftingRecipe("rp_screwdriver", {
    type: "shaped",
    tags: ["crafting_table"],
    pattern: [
        "A ",
        " X"
    ],
    key: {
        "A": { item: "iron_ingot" },
        "X": { item: "stick" }
    },
    result: {
        item: "item:rp_screwdriver"
    }
});

Recipes.addShaped({id: ItemID.sonic_screwdriver, count: 1, data: Item.getMaxDamage(ItemID.sonic_screwdriver)}, [
	"a  ",
	" x ",
	"  b"
], ['a', ItemID.gemGreenSapphire, 0, 'cx', ItemID.ingotCopper, 0, 'b', ItemID.btBattery, 0]);