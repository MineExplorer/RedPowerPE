ItemRegistry.createItem("flaxSeeds", {name: "Flax Seeds", icon: "flax_seeds", category: ItemCategory.NATURE});

Item.registerUseFunction("flaxSeeds", function(coords, item, block, player) {
	const region = WorldRegion.getForActor(player);
	if (block.id == 60 && coords.side == 1 && region.getBlockId(coords.x, coords.y + 1, coords.z) == 0) {
		region.setBlock(coords.x, coords.y + 1, coords.z, BlockID.flax, 0);
		if (Game.isItemSpendingAllowed(player)) {
            Entity.setCarriedItem(player, item.id, item.count - 1, 0);
        }
        region.playSound(coords.x, coords.y + 1, coords.z, "dig.grass", 1, 0.8);
	}
});

// drop seeds from grass
Callback.addCallback("DestroyBlock", function(coords, block, player) {
	const region = BlockSource.getDefaultForActor(player);
	if (Math.random() < 1/16 && (block.id == 31 && block.data == 0 || block.id == 175 && (block.data == 2 || block.data == 10))) {
		region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, ItemID.flaxSeeds, 1, 0);
	}
});
