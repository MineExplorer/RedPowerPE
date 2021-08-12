/// <reference path="../core/BlulectricMachine.ts" />

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


const guiBatBox = MachineRegistry.createInventoryWindow("Battery Box", {
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

class BatBox extends BlulectricMachine {
	getScreenByName() {
		return guiBatBox;
	}

	getEnergyLevel(): number {
		return Math.floor(this.data.energy / this.getEnergyStorage() * 8);
	}

	onInit(): void {
		StorageInterface.setSlotValidatePolicy(this.container, "slot1", (_, id) => {
			return ChargeItemRegistry.isValidItem(id, "Bt", 0);
		});
		StorageInterface.setSlotValidatePolicy(this.container, "slot2", (_, id) => {
			return ChargeItemRegistry.isValidStorage(id, "Bt", 0)
		});
	}

	onTick(): void {
		let energyStorage = this.getEnergyStorage();

		this.chargeSlot("slot2");
		this.dischargeSlot("slot1");

		let energyLevel = this.getEnergyLevel();
		if (!this.remove && energyLevel != this.region.getBlockData(this)) {
			this.region.setBlock(this, this.blockID, energyLevel);
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

	getEnergyStorage(): number {
		return 64000;
	}

	energyTick(type: string, src: EnergyTileNode): void {
		let output = Math.min(100, this.data.energy);
		this.data.energy += src.add(output) - output;
	}

	destroyBlock(coords: Callback.ItemUseCoordinates, player: number): void {
		if (this.data.energy > 0) {
			let extra = new ItemExtraData().putInt("energy", this.data.energy);
			let blockData = this.getEnergyLevel();
			this.region.dropItem(coords.x + .5, coords.y + .5, coords.z + .5, this.blockID, 1, blockData, extra);
		} else {
			this.region.dropItem(coords.x + .5, coords.y + .5, coords.z + .5, this.blockID, 1, 0);
		}
	}

	@BlockEngine.Decorators.ContainerEvent(Side.Client)
	setBatteryIcon(container: ItemContainer, window: any, content: any, data: string): void {
		if (content) {
			content.elements["batteryIcon"].bitmap = "battery_icon_" + data;
		}
	}
}

MachineRegistry.registerMachine(BlockID.rp_batbox, new BatBox());

Block.registerPlaceFunction("rp_batbox", function(coords, item, block, player, region) {
	let {x, y, z} = coords.relative;
	region.setBlock(x, y, z, item.id, item.data);
	let tile = World.addTileEntity(x, y, z, region);
	if (item.extra) {
		tile.data.energy = item.extra.getInt("energy");
	}
	else {
		tile.data.energy = tile.getEnergyStorage() / 8 * item.data;
	}
});