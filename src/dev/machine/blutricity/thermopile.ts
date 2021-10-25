/// <reference path="../type/BlulectricMachine.ts" />

BlockRegistry.createBlockWithRotation("rp_thermopile", [
	{name: "Thermopile", texture: [["rp_thermopile", 0], ["rp_thermopile", 0], ["rp_thermopile_side", 0], ["rp_thermopile_side", 1], ["rp_thermopile_side", 0], ["rp_thermopile_side", 0]], inCreative: true}
], "stone");
BlockRegistry.setDestroyLevel("rp_thermopile", 1);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.rp_thermopile, count: 1, data: 0}, [
		"cac",
		"oxo",
		"cac"
	], ['x', ItemID.ingotBlue, 0, 'o', ItemID.waferBlue, 0, 'a', 265, 0, 'c', ItemID.ingotCopper, 0]);
});

const blockHeatValues = {0: -0.25, 8: -1.5, 9: -1.5, 10: 2, 11: 2, 79: -2, 174: -2};

class Thermopile extends BlulectricMachine {
	cold: number;
	heat: number;

	defaultValues = {
		energy: 0,
		output: 0
	}

	onInit(): void {}

	canReceiveEnergy(): boolean {
		return false;
	}

	getHeatValue(id: number): number {
		return blockHeatValues[id] || 0;
	}

	calculateHeat(x: number, y: number, z: number): void {
		let heat = this.getHeatValue(this.region.getBlockId(x, y, z));
		if (heat < 0) this.cold -= heat;
		else this.heat += heat;
	}

	energyTick(type: string, src: EnergyTileNode) {
		if (World.getThreadTime() % 20 == 0) {
			this.cold = 0;
			this.heat = 0;
			this.calculateHeat(this.x - 1, this.y, this.z);
			this.calculateHeat(this.x + 1, this.y, this.z);
			this.calculateHeat(this.x, this.y, this.z - 1);
			this.calculateHeat(this.x, this.y, this.z + 1);
			this.data.output = Math.min(this.cold, this.heat) / 4;
			//Debug.m(this.data.output);
		}
		src.add(this.data.output);
	}

	onItemUse() {
		return true;
	}
}

MachineRegistry.registerMachine(BlockID.rp_thermopile, new Thermopile());
