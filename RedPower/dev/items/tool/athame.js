IDRegistry.genItemID("athame");
Item.createItem("athame", "Athame", {name: "athame", meta: 0}, {stack: 1});

ToolAPI.registerSword(ItemID.athame, {level: 0, durability: 50, damage: 3}, {
	damage: 0,
	onAttack: function(item, mob) {
		this.damage = Entity.getType(mob) == Native.EntityType.ENDERMAN ? 17 : 0;
		return false;
	}
});

VanillaRecipe.addCraftingRecipe("athame", {
  type: "shaped",
  pattern: [
    "X",
    "#"
  ],
  key: {
    "X": { item: "item:ingotSilver" },
    "#": { item: "stick" }
  },
  result: { 
    item: "item:athame"
  }
}, true);