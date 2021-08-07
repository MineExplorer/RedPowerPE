ItemRegistry.createItem("flaxSeeds", {name: "Flax Seeds", icon: "flax_seeds"});

IDRegistry.genBlockID("flax");
Block.createBlock("flax", [
	{name: "Flax", texture: [["flax", 0]], inCreative: false},
	{name: "Flax", texture: [["flax", 1]], inCreative: false},
	{name: "Flax", texture: [["flax", 2]], inCreative: false},
	{name: "Flax", texture: [["flax", 3]], inCreative: false},
	{name: "Flax", texture: [["flax", 4]], inCreative: false},
	{name: "Flax", texture: [["flax", 5]], inCreative: false},
], {
	base: 59,
	destroytime: 0,
	rendertype: 6,
	sound: "grass"
});
TileRenderer.setEmptyCollisionShape(BlockID.flax);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 1/8, 1, 0);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 3/8, 1, 1);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 3/4, 1, 2);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 15/16, 1, 3);

Block.registerDropFunction("flax", function(coords, blockID, blockData, level, enchant, item, region) {
	if (region.getBlockId(coords.x, coords.y + 1, coords.z) == blockID) {
		region.destroyBlock(coords.x, coords.y + 1, coords.z, true);
	}
	if (blockData < 4) {
		return [[ItemID.flaxSeeds, 1, 0]];
	}
	return [[ItemID.flaxSeeds, randomInt(1, 3), 0], [287, randomInt(1, 3), 0]];
});

Callback.addCallback("DestroyBlock", function(coords, block, player) {
	let region = BlockSource.getDefaultForActor(player);
	if (Math.random() < 1/16 && (block.id == 31 && block.data == 0 || block.id == 175 && (block.data == 2 || block.data == 10))) {
		region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, ItemID.flaxSeeds, 1, 0);
	}
});

Block.registerNeighbourChangeFunction("flax", function(coords, block, changeCoords, region) {
	if (changeCoords.y < coords.y && region.getBlockId(coords.x, coords.y - 1, coords.z) != 60) {
		region.destroyBlock(coords.x, coords.y, coords.z, true);
	}
});

Item.registerUseFunction("flaxSeeds", function(coords, item, block, player) {
	let region = BlockSource.getDefaultForActor(player);
	if (block.id == 60 && coords.side == 1 && region.getBlockId(coords.x, coords.y + 1, coords.z) == 0) {
		region.setBlock(coords.x, coords.y + 1, coords.z, BlockID.flax, 0);
		if (Game.isItemSpendingAllowed(player)) {
            Entity.setCarriedItem(player, item.id, item.count - 1, 0);
        }
        World.playSound(coords.x, coords.y + 1, coords.z, "dig.grass", 1, 0.8);
	}
});

function checkFarmland(x, y, z, region) {
	let block = region.getBlock(x, y, z);
	if (block.id == 60) {
		if (block.data < 7) {
			return 0.25;
		}
		return 0.75;
	}
	return 0;
}

Block.setRandomTickCallback(BlockID.flax, function(x, y, z, id, data, region) {
	if (data < 5) {
		let block = region.getBlock(x, y-1, z)
		if (block.id != 60) {
			region.destroyBlock(x, y, z, true);
		}
		else if (data < 4 && region.getLightLevel(x, y, z) >= 9) {
			let points = (block.data < 7) ? 2 : 4;
			points += checkFarmland(x-1, y, z-1, region);
			points += checkFarmland(x-1, y, z, region);
			points += checkFarmland(x-1, y, z+1, region);
			points += checkFarmland(x, y, z-1, region);
			points += checkFarmland(x, y, z+1, region);
			points += checkFarmland(x+1, y, z-1, region);
			points += checkFarmland(x+1, y, z, region);
			points += checkFarmland(x+1, y, z+1, region);
			let chance = 1/(Math.floor(50/points) + 1);
			if (Math.random() < chance) {
				if (data < 3) {
					region.setBlock(x, y, z, id, data + 1);
				}
				else if (region.getBlockId(x, y+1, z) == 0) {
					region.setBlock(x, y, z, id, 4);
					region.setBlock(x, y+1, z, id, 5);
				}
			}
		}
	} else if (region.getBlockId(x, y-1, z) != id) {
		region.destroyBlock(x, y, z, true);
	}
});

// bone meal use
Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
	let region = BlockSource.getDefaultForActor(player);
	if (item.id == 351 && item.data == 15 && block.id == BlockID.flax && block.data < 4) {
		block.data += randomInt(2, 3);
		if (block.data < 4) {
			region.setBlock(coords.x, coords.y, coords.z, block.id, block.data);
		}
		else if (region.getBlockId(coords.x, coords.y + 1, coords.z) == 0) {
			region.setBlock(coords.x, coords.y, coords.z, block.id, 4);
			region.setBlock(coords.x, coords.y + 1, coords.z, block.id, 5);
		}
		Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
		for (let i = 0; i < 16; i++) {
			let px = coords.x + Math.random();
			let pz = coords.z + Math.random();
			let py = coords.y + Math.random();
			Particles.addFarParticle(Native.ParticleType.happyVillager, px, py, pz, 0, 0, 0);
		}
	}
});
