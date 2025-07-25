BlockRegistry.createBlock("rp_marble", [
	{name: "Marble", texture: [["rp_marble", 0]], inCreative: true},
], "stone");
BlockRegistry.setBlockMaterial(BlockID.rp_marble, "stone", 1);
BlockRegistry.setDestroyLevel("rp_marble", 1);

BlockRegistry.createBlock("marbleBrick", [
	{name: "Marble Brick", texture: [["rp_marble_brick", 0]], inCreative: true}
], "stone");
BlockRegistry.setBlockMaterial(BlockID.marbleBrick, "stone", 1);
BlockRegistry.setDestroyLevel("marbleBrick", 1);

Recipes.addShaped({id: BlockID.marbleBrick, count: 4, data: 0}, [
    "XX",
    "XX"
], ['X', BlockID.rp_marble, 0]);

VanillaRecipe.addStonecutterRecipe("stonecutter_marble_brick", {
  ingredients: [
    { item: "block:rp_marble" }
  ],
  result: {
    item: "block:marbleBrick",
    data: 0
  }
});
