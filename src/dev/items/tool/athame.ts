ItemRegistry.createTool("athame", {name: "Athame", icon: "athame", material: {level: 0, durability: 50, damage: 3}}, {
  onAttack: function(item, mob) {
    this.damage = Entity.getType(mob) == Native.EntityType.ENDERMAN ? 17 : 0;
    return false;
  }
});

Recipes.addShaped({id: ItemID.athame, count: 1, data: 0}, [
  "X",
  "#"
], ['X', ItemID.ingotSilver, 0, '#', VanillaItemID.stick, 0]);