IDRegistry.genItemID("sickleWood");
IDRegistry.genItemID("sickleStone");
IDRegistry.genItemID("sickleIron");
IDRegistry.genItemID("sickleGold");
IDRegistry.genItemID("sickleDiamond");
IDRegistry.genItemID("rubySickle");
IDRegistry.genItemID("sapphireSickle");
IDRegistry.genItemID("greenSapphireSickle");

Item.createItem("sickleWood", "Wood Sickle", {name: "sickle", meta: 0}, {stack: 1});
Item.createItem("sickleStone", "Stone Sickle", {name: "sickle", meta: 1}, {stack: 1});
Item.createItem("sickleIron", "Iron Sickle", {name: "sickle", meta: 2}, {stack: 1});
Item.createItem("sickleGold", "Gold Sickle", {name: "sickle", meta: 3}, {stack: 1});
Item.createItem("sickleDiamond", "Diamond Sickle", {name: "sickle", meta: 4}, {stack: 1});
Item.createItem("rubySickle", "Ruby Sickle", {name: "ruby_sickle", meta: 0}, {stack: 1});
Item.createItem("sapphireSickle", "Sapphire Sickle", {name: "sapphire_sickle", meta: 0}, {stack: 1});
Item.createItem("greenSapphireSickle", "Green Sapphire Sickle", {name: "green_sapphire_sickle", meta: 0}, {stack: 1});

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

var plants = [31, 37, 38, 59, 83, 106, 141, 142, 175, 244, BlockID.flax];

ToolType.sickle = {
	damage: 1,
	baseDamage: 0,
	blockTypes: ["fibre"],
	calcDestroyTime: function(item, coords, block, params, destroyTime, enchant) {
		var material = ToolAPI.getBlockMaterialName(block.id);
		if (material == "fibre" || material == "plant" || block.id == 30) {
			return 0;
		}
		return destroyTime;
	},
	destroyBlock: function(coords, side, item, block) {
		var x = coords.x, y = coords.y, z = coords.z;
		var material = ToolAPI.getBlockMaterialName(block.id);
		if (material == "plant" && plants.indexOf(block.id) == -1) {
			for (var xx = x - 1; xx <= x + 1; xx++) {
				for (var yy = y - 1; yy <= y + 1; yy++) {
					for (var zz = z - 1; zz <= z + 1; zz++) {
						block = World.getBlock(xx, yy, zz);
						var material = ToolAPI.getBlockMaterialName(block.id);
						if (material == "plant") {
							World.destroyBlock(xx, yy, zz, true);
						}
					}
				}
			}
		} else if (plants.indexOf(block.id) != -1) {
			for (var xx = x - 2; xx <= x + 2; xx++) {
				for (var zz = z - 2; zz <= z + 2; zz++) {
					block = World.getBlock(xx, y, zz);
					if (plants.indexOf(block.id) != -1) {
						World.destroyBlock(xx, y, zz, true);
						if (Math.random() < 1/16 && (block.id == 31 && block.data == 0 || block.id == 175 && (block.data == 2 || block.data == 10))) {
							World.drop(xx + .5, y + .5, zz + .5, ItemID.flaxSeeds, 1, 0);
						}
					}
				}
			}
		}
	}
}

ToolLib.setTool(ItemID.sickleWood, "wood", ToolType.sickle);
ToolLib.setTool(ItemID.sickleStone, "stone", ToolType.sickle);
ToolLib.setTool(ItemID.sickleIron, "iron", ToolType.sickle);
ToolLib.setTool(ItemID.sickleGold, "golden", ToolType.sickle);
ToolLib.setTool(ItemID.sickleDiamond, "diamond", ToolType.sickle);
ToolLib.setTool(ItemID.rubySickle, "ruby", ToolType.sickle);
ToolLib.setTool(ItemID.sapphireSickle, "sapphire", ToolType.sickle);
ToolLib.setTool(ItemID.greenSapphireSickle, "sapphire", ToolType.sickle);

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
