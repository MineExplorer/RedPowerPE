IDRegistry.genItemID("seedBag");
Item.createItem("seedBag", "Seed Bag", {name: "seed_bag", meta: 0}, {stack: 1});
Item.setMaxDamage(ItemID.seedBag, 576);

Item.registerIconOverrideFunction(ItemID.seedBag, function(item, name) {
	return {name: "seed_bag", meta: (item.data > 0)? 1: 0}
});

Recipes.addShaped({id: ItemID.seedBag, count: 1, data: 0}, [
	" s ",
	"a a",
	"aaa"
], ['a', ItemID.canvas, 0, 's', 287, 0]);

Item.registerNameOverrideFunction(ItemID.seedBag, function(item, name) {
	if (item.extra) {
		let id = 0;
		let count = 0;
		let container = SeedBag.getContainer(item.extra);
		if (container) {
			for (let i in container.slots) {
				let slot = container.getSlot(i);
				if (slot.id > 0) {
					id = slot.id;
					count += slot.count;
				}
			}
			if (count) {
				name += "\n§7" + Translation.translate(Item.getName(id)) + " * " + count;
			}
		}
	}
	return name;
});

Saver.addSavesScope("SeedBagScope",
    function read(scope) {
        SeedBag.nextUnique = scope.nextUnique || 1;
        SeedBag.containers = scope.containers || {};
    },

    function save() {
        return {
            nextUnique: SeedBag.nextUnique,
            containers: SeedBag.containers
        };
    }
);


let SeedBag = {
	containers: {},
	nextUnique: 1,
	
	getContainer: function(extra) {
		if (extra) {
			return this.containers["d" + extra.getInt("container")];
		}
		return null;
	},
	
	decreaseCount: function(item, container, decreaseCount) {
		if (decreaseCount == 0) return;
		let storedCount = 0;
		for (let i in container.slots) {
			let slot = container.getSlot(i);
			if (slot.id > 0) {
				let count = Math.min(slot.count, decreaseCount);
				slot.count -= count;
				decreaseCount -= count;
				storedCount += slot.count;
			}
		}
		container.validateAll();
		if (storedCount > 0) {
			Player.setCarriedItem(item.id, 1, 577 - storedCount, item.extra);
		} else {
			Player.setCarriedItem(item.id, 1, 0, item.extra);
		}
	},
	
	isValidItem: function(id, count, data, container) {
		if (!seeds[id]) return false;
		for (let i in container.slots) {
			let slot = container.getSlot(i);
			if (slot.id > 0 && slot.id != id) {
				return false;
			}
		}
		return true;
	},
	
	openGuiFor: function (item) {
		let containerID = 0;
		let extra = item.extra;
        if (!extra) {
			extra = new ItemExtraData();
		} else {
			containerID = extra.getInt("container");
		}
        let container = this.containers["d" + containerID];
		if (!container) {
			let containerID = this.nextUnique++;
			extra.putInt("container", containerID);
			container = this.containers["d" + containerID] = new UI.Container();
			Player.setCarriedItem(item.id, 1, item.data, extra);
		}
		container.openAs(this.gui);
    }
}

SeedBag.gui = new UI.StandartWindow({
	standart: {
		header: {text: {text: Translation.translate("Seed Bag")}},
		inventory: {standart: true},
		background: {standart: true}
	},
	drawing: [],
	elements: {
		"slot0": {type: "slot", x: 530, y: 120, isValid: SeedBag.isValidItem},
		"slot1": {type: "slot", x: 590, y: 120, isValid: SeedBag.isValidItem},
		"slot2": {type: "slot", x: 650, y: 120, isValid: SeedBag.isValidItem},
		"slot4": {type: "slot", x: 530, y: 180, isValid: SeedBag.isValidItem},
		"slot5": {type: "slot", x: 590, y: 180, isValid: SeedBag.isValidItem},
		"slot6": {type: "slot", x: 650, y: 180, isValid: SeedBag.isValidItem},
		"slot8": {type: "slot", x: 530, y: 240, isValid: SeedBag.isValidItem},
		"slot9": {type: "slot", x: 590, y: 240, isValid: SeedBag.isValidItem},
		"slot10": {type: "slot", x: 650, y: 240, isValid: SeedBag.isValidItem}
	}
});

Callback.addCallback("LevelLoaded", function() {
	let header = SeedBag.gui.getWindow("header");
	header.contentProvider.drawing[1].text = Translation.translate("Seed Bag");
});

Item.registerNoTargetUseFunction(ItemID.seedBag, function (item) {
	SeedBag.openGuiFor(item);
});

let seeds = {295: 59, 391: 141, 392: 142, 458: 244}
seeds[ItemID.flaxSeeds] = BlockID.flax;

Item.registerUseFunction("seedBag", function(coords, item, block, player) {
	if (item.extra && block.id == 60 && coords.side == 1) {
		let id = 0;
		let count = 0;
		let decreaseCount = 0;
		let container = SeedBag.getContainer(item.extra);
		if (container) {
			for (let i in container.slots) {
				let slot = container.getSlot(i);
				if (slot.id > 0) {
					id = slot.id;
					count += slot.count;
				}
			}
		}
		if (count) {
			for (let x = coords.x - 2; x <= coords.x + 2; x++)
			for (let z = coords.z - 2; z <= coords.z + 2; z++) {
				if (World.getBlockID(x, coords.y, z) == 60 && World.getBlockID(x, coords.y + 1, z) == 0) {
					World.setBlock(x, coords.y + 1, z, seeds[id], 0);
					decreaseCount++;
				}
				if (decreaseCount >= count) {
					SeedBag.decreaseCount(item, container, decreaseCount);
					return;
				}
			}
			SeedBag.decreaseCount(item, container, decreaseCount);
		} else {
			Entity.setCarriedItem(player, item.id, 1, 0, item.extra);
		}
	}
});

Callback.addCallback("tick", function() {
	if (World.getThreadTime() % 10 == 0) {
		var item = Player.getCarriedItem();
		if (item.id == ItemID.seedBag) {
			let count = 0;
			let container = SeedBag.getContainer(item.extra);
			if (container) {
				for (let i in container.slots) {
					let slot = container.getSlot(i);
					if (slot.id > 0) {
						count += slot.count;
					}
				}
			}
			if (count > 0) {
				if (item.data != 577 - count) {
					Player.setCarriedItem(item.id, 1, 577 - count, item.extra);
				}
			} else if (item.data > 0) {
				Player.setCarriedItem(item.id, 1, 0, item.extra);
			}
		}
	}
});
