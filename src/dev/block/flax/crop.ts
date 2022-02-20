BlockRegistry.createBlockType("crop", {
	baseBlock: 59,
	destroyTime: 0,
	renderType: 6,
	sound: "grass"
});

class BlockFlax extends BlockBase {
	constructor() {
		super("flax", "crop");
		for (let i = 0; i < 6; i++) {
			this.addVariation("Flax", [["flax", i]]);
		}
		TileRenderer.setEmptyCollisionShape(this.id);
		this.setShape(0, 0, 0, 1, 1/8, 1, 0);
		this.setShape(0, 0, 0, 1, 3/8, 1, 1);
		this.setShape(0, 0, 0, 1, 3/4, 1, 2);
		this.setShape(0, 0, 0, 1, 15/16, 1, 3);
	}

	getDrop(coords: Vector, block: Tile, level: number, enchant: ToolAPI.EnchantData, item: ItemStack, region: BlockSource): ItemInstanceArray[] {
		if (block.data < 4) {
			return [[ItemID.flaxSeeds, 1, 0]];
		}
		return [[ItemID.flaxSeeds, randomInt(1, 3), 0], [287, randomInt(1, 3), 0]];
	}

	onNeighbourChange(coords: Vector, block: Tile, changeCoords: Vector, region: BlockSource): void {
		if (changeCoords.y < coords.y && region.getBlockId(coords.x, coords.y - 1, coords.z) != 60) {
			region.destroyBlock(coords.x, coords.y, coords.z, true);
		}
	}

	checkFarmland(x: number, y: number, z: number, region: BlockSource) {
		const block = region.getBlock(x, y, z);
		if (block.id == 60) {
			if (block.data < 7) {
				return 0.25;
			}
			return 0.75;
		}
		return 0;
	}

	onRandomTick(x: number, y: number, z: number, block: Tile, region: BlockSource): void {
		if (block.data < 5) {
			const blockBelow = region.getBlock(x, y-1, z)
			if (blockBelow.id != 60) {
				region.destroyBlock(x, y, z, true);
			}
			else if (block.data < 4 && region.getLightLevel(x, y, z) >= 9) {
				let points = (blockBelow.data < 7) ? 2 : 4;
				points += this.checkFarmland(x-1, y, z-1, region);
				points += this.checkFarmland(x-1, y, z, region);
				points += this.checkFarmland(x-1, y, z+1, region);
				points += this.checkFarmland(x, y, z-1, region);
				points += this.checkFarmland(x, y, z+1, region);
				points += this.checkFarmland(x+1, y, z-1, region);
				points += this.checkFarmland(x+1, y, z, region);
				points += this.checkFarmland(x+1, y, z+1, region);
				const chance = 1/(Math.floor(50/points) + 1);
				if (Math.random() < chance) {
					if (block.data < 3) {
						region.setBlock(x, y, z, block.id, block.data + 1);
					}
					else if (region.getBlockId(x, y+1, z) == 0) {
						region.setBlock(x, y, z, block.id, 4);
						region.setBlock(x, y+1, z, block.id, 5);
					}
				}
			}
		} else if (region.getBlockId(x, y-1, z) != block.id) {
			region.destroyBlock(x, y, z, true);
		}
	}

	onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
		const region = BlockSource.getDefaultForActor(player);
		const boneMeal = IDConverter.getIDData("bone_meal");
		if (block.data < 4 && item.id == boneMeal.id && item.data == boneMeal.data) {
			block.data += randomInt(2, 3);
			if (block.data < 4) {
				region.setBlock(coords.x, coords.y, coords.z, block.id, block.data);
			}
			else if (region.getBlockId(coords.x, coords.y + 1, coords.z) == 0) {
				region.setBlock(coords.x, coords.y, coords.z, block.id, 4);
				region.setBlock(coords.x, coords.y + 1, coords.z, block.id, 5);
			}
			if (Game.isItemSpendingAllowed(player)) {
				Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
			}
			for (let i = 0; i < 16; i++) {
				const px = coords.x + Math.random();
				const pz = coords.z + Math.random();
				const py = coords.y + Math.random();
				Particles.addFarParticle(Native.ParticleType.happyVillager, px, py, pz, 0, 0, 0);
			}
		}
	}
}

BlockRegistry.registerBlock(new BlockFlax());
