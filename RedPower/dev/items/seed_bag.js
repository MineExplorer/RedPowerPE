IDRegistry.genItemID("seedBag");
Item.createItem("seedBag", "Seed Bag", {name: "seed_bag", meta: 0}, {stack: 1, isTech: true});
Item.setMaxDamage(ItemID.seedBag, 576);
Item.addToCreative(ItemID.seedBag, 1, 576);

Item.registerIconOverrideFunction(ItemID.seedBag, function(item, name) {
	return {name: "seed_bag", meta: (item.data < 576)? 1: 0}
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
		if (!scope.format) {
			var containers = scope.containers || {};
			for (var key in containers) {
				containers[key] = new ItemContainer(containers[key]);
			}
			SeedBag.containers = containers;
		} else {
			SeedBag.containers = scope.containers || {};
		}
    },

    function save() {
        return {
            nextUnique: SeedBag.nextUnique,
			containers: SeedBag.containers,
			format: 1
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

	decreaseCount: function(item, container, decreaseCount, player) {
		if (decreaseCount == 0) return;
		let storedCount = 0;
		for (let name in container.slots) {
			let slot = container.getSlot(name);
			if (slot.id > 0) {
				let count = Math.min(slot.count, decreaseCount);
				slot.count -= count;
				decreaseCount -= count;
				storedCount += slot.count;
				container.setSlot(name, slot.id, slot.count, slot.data);
				container.validateSlot(name);
			}
		}
		Entity.setCarriedItem(player, item.id, 1, 576 - storedCount, item.extra);
	},

	isValidItem: function(id, container) {
		if (!seeds[id]) return false;
		for (let i in container.slots) {
			let slot = container.getSlot(i);
			if (slot.id > 0 && slot.id != id) {
				return false;
			}
		}
		return true;
	},

	setupContainer: function (container) {
        container.setClientContainerTypeName("seed_bag.ui");
        container.setGlobalAddTransferPolicy(function (container, name, id, amount, data, extra, player) {
			amount = SeedBag.isValidItem(id, container) ? amount : 0;
			if (SeedBag.isValidItem(id, container)) {
				amount = Math.min(amount, 64 - container.getSlot(name).count);
				let item = Entity.getCarriedItem(player);
				if (item.id == ItemID.seedBag)
					Entity.setCarriedItem(player, item.id, 1, item.data - amount, item.extra);
				return amount;
			}
			return 0;
		});
		container.setGlobalGetTransferPolicy(function (container, name, id, amount, data, extra, player) {
			let item = Entity.getCarriedItem(player);
			if (item.id == ItemID.seedBag)
				Entity.setCarriedItem(player, item.id, 1, item.data + amount, item.extra);
			return amount;
        });
    },

	openGuiFor: function (item, player) {
		let client = Network.getClientForPlayer(player);
		if (!client) {
			return;
		}

		let extra = item.extra || new ItemExtraData();
        let containerID = extra.getInt("container");

        let container = this.containers["d" + containerID];
		if (!container) {
			containerID = this.nextUnique++;
			extra.putInt("container", containerID);
			container = this.containers["d" + containerID] = new ItemContainer();
			Entity.setCarriedItem(player, item.id, 1, item.data, extra);
		}
		if (!container.getClientContainerTypeName()) {
			this.setupContainer(container);
		}
		container.openFor(client, "seed_bag");
    }
}

SeedBag.gui = new UI.StandartWindow({
	standard: {
		header: {text: {text: Translation.translate("Seed Bag")}},
		inventory: {standard: true},
		background: {standard: true}
	},
	drawing: [],
	elements: {
		"slot0": {type: "slot", x: 530, y: 120},
		"slot1": {type: "slot", x: 590, y: 120},
		"slot2": {type: "slot", x: 650, y: 120},
		"slot4": {type: "slot", x: 530, y: 180},
		"slot5": {type: "slot", x: 590, y: 180},
		"slot6": {type: "slot", x: 650, y: 180},
		"slot8": {type: "slot", x: 530, y: 240},
		"slot9": {type: "slot", x: 590, y: 240},
		"slot10": {type: "slot", x: 650, y: 240}
	}
}),

ItemContainer.registerScreenFactory("seed_bag.ui", function(container, name) {
	return SeedBag.gui;
});

Callback.addCallback("LevelLoaded", function() {
	MachineRegistry.updateGuiHeader(SeedBag.gui, "Seed Bag");
});

Item.registerNoTargetUseFunction(ItemID.seedBag, function (item, player) {
	SeedBag.openGuiFor(item, player);
});


let seeds = {295: 59, 391: 141, 392: 142, 458: 244}
seeds[ItemID.flaxSeeds] = BlockID.flax;

Item.registerUseFunction("seedBag", function(coords, item, block, player) {
	if (item.extra && block.id == 60 && coords.side == 1) {
		let id = 0;
		let count = 0;
		let decreaseCount = 0;
		let container = SeedBag.getContainer(item.extra);
		let region = BlockSource.getDefaultForActor(player);
		if (container) {
			for (let name in container.slots) {
				let slot = container.getSlot(name);
				if (slot.id > 0) {
					id = slot.id;
					count += slot.count;
					container.setSlot(name, slot.id, slot.count, slot.data);
				}
			}
		}
		if (count) {
			for (let x = coords.x - 2; x <= coords.x + 2; x++)
			for (let z = coords.z - 2; z <= coords.z + 2; z++) {
				if (region.getBlockId(x, coords.y, z) == 60 && region.getBlockId(x, coords.y + 1, z) == 0) {
					region.setBlock(x, coords.y + 1, z, seeds[id], 0);
					decreaseCount++;
				}
				if (decreaseCount >= count) {
					SeedBag.decreaseCount(item, container, decreaseCount, player);
					return;
				}
			}
			SeedBag.decreaseCount(item, container, decreaseCount, player);
		}
	}
});
