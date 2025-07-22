/// <reference path="../type/BlulectricMachine.ts" />

BlockRegistry.createBlock("rp_solar", [
	{name: "Solar Panel", texture: [["rp_machine_bottom", 0], ["rp_solar", 0], ["rp_solar", 1], ["rp_solar", 1], ["rp_solar", 1], ["rp_solar", 1]], inCreative: true}
], "stone_slab");
BlockRegistry.setDestroyLevel("rp_solar", 1);
Block.setBlockShape(BlockID.rp_solar, {x: 0, y: 0, z: 0}, {x: 1, y: 0.25, z: 1}, 0);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.rp_solar, count: 1, data: 0}, [
		"ooo",
		"oxo",
		"ooo"
	], ['x', ItemID.ingotBlue, 0, 'o', ItemID.waferBlue, 0]);
});

class SolarPanel extends BlulectricMachine {
	defaultValues = {
		energy: 0,
		canSeeSky: false
	}

	isConductor(type: string): boolean {
		return true;
	}

	onInit(): void {
		this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
	}

	energyTick(type: string, src: EnergyTileNode): void {
		if (World.getThreadTime() % 100 == 0) {
			this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
		}
		if (this.data.canSeeSky && this.region.getLightLevel(this.x, this.y + 1, this.z) == 15) {
			src.add(2);
		}
	}

	onItemUse(): boolean {
		return true;
	}
}

MachineRegistry.registerMachine(BlockID.rp_solar, new SolarPanel());