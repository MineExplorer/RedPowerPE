/// <reference path="./MachineBase.ts" />

class BlulectricMachine extends MachineBase
implements EnergyTile {
	energyNode: EnergyTileNode;
	data: this["defaultValues"];

	defaultValues = {
		energy: 0
	}

	getEnergyStorage(): number {
		return 0;
	}

	isConductor(type: string): boolean {
		return false;
	}

	canReceiveEnergy(side: number, type: string): boolean {
		return true;
	}

	canExtractEnergy(side: number, type: string): boolean {
		return true;
	}

	energyReceive(type: string, amount: number, voltage: number): number {
		const add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
		this.data.energy += add;
		return add;
	}

	energyTick(type: string, src: EnergyTileNode): void {}

	chargeSlot(slotName: string) {
		this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot(slotName), "Eu", this.data.energy, 0);
	}

	dischargeSlot(slotName: string) {
		const amount = this.getEnergyStorage() - this.data.energy;
		this.data.energy += ChargeItemRegistry.getEnergyFromSlot(this.container.getSlot(slotName), "Eu", amount, 0);
	}
}