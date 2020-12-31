IDRegistry.genBlockID("rp_batbox");
Block.createBlock("rp_batbox", [
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0]], inCreative: true},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 1], ["rp_batbox_side", 1], ["rp_batbox_side", 1], ["rp_batbox_side", 1]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 2], ["rp_batbox_side", 2], ["rp_batbox_side", 2], ["rp_batbox_side", 2]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 3], ["rp_batbox_side", 3], ["rp_batbox_side", 3], ["rp_batbox_side", 3]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 4], ["rp_batbox_side", 4], ["rp_batbox_side", 4], ["rp_batbox_side", 4]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 5], ["rp_batbox_side", 5], ["rp_batbox_side", 5], ["rp_batbox_side", 5]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 6], ["rp_batbox_side", 6], ["rp_batbox_side", 6], ["rp_batbox_side", 6]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 7], ["rp_batbox_side", 7], ["rp_batbox_side", 7], ["rp_batbox_side", 7]], inCreative: false},
	{name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 8], ["rp_batbox_side", 8], ["rp_batbox_side", 8], ["rp_batbox_side", 8]], inCreative: true}
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_batbox, "stone", 1);
Block.registerDropFunction("rp_batbox", function(coords, blockID, blockData, level) {
	return [];
});

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.rp_batbox, count: 1, data: 0}, [
		"xpx",
		"xax",
		"aba"
	], ['x', ItemID.btBattery, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0, 'p', 5, -1]);
});


let guiBatBox = new UI.StandartWindow({
	standard: {
		header: {text: {text: Translation.translate("Battery Box")}},
		inventory: {standard: true},
		background: {standard: true}
	},

	drawing: [
		{type: "bitmap", x: 530, y: 75, bitmap: "btstorage_background", scale: GUI_SCALE},
	],

	elements: {
		"batteryIcon": {type: "image", x: 530 + 6*GUI_SCALE, y: 75 - 7*GUI_SCALE, bitmap: "battery_icon_off", scale: GUI_SCALE},
		"btScale": {type: "scale", x: 530 + GUI_SCALE, y: 75 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "btstorage_scale", scale: GUI_SCALE},
		"slot1": {type: "slot", x: 650, y: 80},
		"slot2": {type: "slot", x: 650, y: 172},
	}
});

Callback.addCallback("LevelLoaded", function() {
	MachineRegistry.updateGuiHeader(guiBatBox, "Battery Box");
});

class BatBox
extends TileEntityBase {
	getScreenByName() {
		return guiBatBox;
	}

	getEnergyLevel() {
		return Math.floor(this.data.energy / this.getEnergyStorage() * 8);
	}

	init() {
		this.container.setSlotAddTransferPolicy("slot1", function(container, name, id, amount, data, extra) {
			return ChargeItemRegistry.isValidItem(id, "Bt", 0) ? amount : 0;
		});
		this.container.setSlotAddTransferPolicy("slot2", function(container, name, id, amount, data, extra) {
			return ChargeItemRegistry.isValidStorage(id, "Bt", 0) ? amount : 0;
		});
	}

	tick() {
		let energyStorage = this.getEnergyStorage();

		this.data.energy += ChargeItemRegistry.getEnergyFromSlot(this.container.getSlot("slot2"), "Bt", energyStorage - this.data.energy, 0);
		this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot("slot1"), "Bt", this.data.energy, 0);

		let energyLevel = this.getEnergyLevel();
		if (!this.remove && energyLevel != this.blockSource.getBlockData(this.x, this.y, this.z)) {
			this.blockSource.setBlock(this.x, this.y, this.z, this.blockID, energyLevel);
		}

		if (this.data.energy == this.getEnergyStorage()) {
			this.container.sendEvent("setBatteryIcon", "on");
		}
		else {
			this.container.sendEvent("setBatteryIcon", "off");
		}

		this.container.setScale("btScale", this.data.energy / energyStorage);
		this.container.sendChanges();
	}

	isEnergySource() {
		return true;
	}

	getEnergyStorage() {
		return 64000;
	}

	energyTick(type, src) {
		let output = Math.min(100, this.data.energy);
		this.data.energy += src.add(output) - output;
	}

	destroyBlock(coords, player) {
		if (this.data.energy > 0) {
			let extra = new ItemExtraData().putInt("energy", this.data.energy);
			let blockData = this.getEnergyLevel();
			this.blockSource.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, this.blockID, 1, blockData, extra);
		} else {
			this.blockSource.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, this.blockID, 1, 0);
		}
	}

	client = {
		containerEvents: {
			setBatteryIcon(container, window, content, data) {
				if (content) {
					content.elements["batteryIcon"].bitmap = "battery_icon_" + data;
				}
			}
		},
	}
}

MachineRegistry.registerMachine(BlockID.rp_batbox, new BatBox());

Block.registerPlaceFunction("rp_batbox", function(coords, item, block, player, region) {
	let x = coords.relative.x;
	let y = coords.relative.y;
	let z = coords.relative.z;
	region.setBlock(x, y, z, item.id, item.data);
	let tile = World.addTileEntity(x, y, z, region);
	if (item.extra) {
		tile.data.energy = item.extra.getInt("energy");
	}
	else {
		tile.data.energy = tile.getEnergyStorage() / 8 * item.data;
	}
});