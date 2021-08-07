const plants = [31, 37, 38, 59, 83, 106, 141, 142, 175, 244, BlockID.flax];

class ToolSickle extends ItemTool {
	damage: 1;
	baseDamage: 0;
	blockTypes: ["fibre"];

	calcDestroyTime(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, params: {base: number, devider: number, modifier: number}, destroyTime: number): number {
		let material = ToolAPI.getBlockMaterialName(block.id);
		if (material == "fibre" || material == "plant" || block.id == 30) {
			return 0;
		}
		return destroyTime;
	}

	onDestroy(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, player: number): boolean {
		let region = WorldRegion.getForActor(player);
		let x = coords.x, y = coords.y, z = coords.z;
		let material = ToolAPI.getBlockMaterialName(block.id);
		if (material == "plant" && plants.indexOf(block.id) == -1) {
			for (let xx = x - 1; xx <= x + 1; xx++) {
				for (let yy = y - 1; yy <= y + 1; yy++) {
					for (let zz = z - 1; zz <= z + 1; zz++) {
						let block = region.getBlock(xx, yy, zz);
						if (ToolAPI.getBlockMaterialName(block.id) == "plant") {
							region.destroyBlock(xx, yy, zz, true);
						}
					}
				}
			}
		}
		else if (plants.indexOf(block.id) != -1) {
			for (let xx = x - 2; xx <= x + 2; xx++) {
				for (let zz = z - 2; zz <= z + 2; zz++) {
					let block = region.getBlock(xx, y, zz);
					if (plants.indexOf(block.id) != -1) {
						region.destroyBlock(xx, y, zz, true);
						if (Math.random() < 1/16 && (block.id == 31 && block.data == 0 || block.id == 175 && (block.data == 2 || block.data == 10))) {
							region.dropItem(xx + .5, y + .5, zz + .5, ItemID.flaxSeeds, 1, 0);
						}
					}
				}
			}
		}
		return false;
	}
}

ItemRegistry.registerItem(new ToolSickle("sickleWood", "Wood Sickle", {name: "sickle", meta: 0}, "wood"));
ItemRegistry.registerItem(new ToolSickle("sickleStone", "Stone Sickle", {name: "sickle", meta: 1}, "stone"));
ItemRegistry.registerItem(new ToolSickle("sickleIron", "Iron Sickle", {name: "sickle", meta: 2}, "iron"));
ItemRegistry.registerItem(new ToolSickle("sickleGold", "Gold Sickle", {name: "sickle", meta: 3}, "golden"));
ItemRegistry.registerItem(new ToolSickle("sickleDiamond", "Diamond Sickle", {name: "sickle", meta: 4}, "diamond"));
ItemRegistry.registerItem(new ToolSickle("rubySickle", "Ruby Sickle", "ruby_sickle", "ruby"));
ItemRegistry.registerItem(new ToolSickle("sapphireSickle", "Sapphire Sickle", "sapphire_sickle", "sapphire"));
ItemRegistry.registerItem(new ToolSickle("greenSapphireSickle", "Green Sapphire Sickle", "green_sapphire_sickle", "greenSapphire"));

Item.addCreativeGroup("sickles", Translation.translate("Sickles"), [
	ItemID.sickleWood,
	ItemID.sickleStone,
	ItemID.sickleIron,
	ItemID.sickleGold,
	ItemID.sickleDiamond,
	ItemID.rubySickle,
	ItemID.sapphireSickle,
	ItemID.greenSapphireSickle
]);

Recipes.addShaped({id: ItemID.sickleWood, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', 5, -1, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sickleStone, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', 4, -1, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sickleIron, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', 265, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sickleGold, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', 266, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sickleDiamond, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', 264, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.rubySickle, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sapphireSickle, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.greenSapphireSickle, count: 1, data: 0}, [
	" a ",
	"  a",
	"ba "
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);
