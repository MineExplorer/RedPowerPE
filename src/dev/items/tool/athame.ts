ItemRegistry.createTool("athame", {name: "Athame", icon: "athame", material: {level: 0, durability: 50, damage: 3}}, {
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