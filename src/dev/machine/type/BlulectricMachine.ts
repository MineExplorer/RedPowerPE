/// <reference path="./MachineBase.ts" />

abstract class BlulectricMachine extends MachineBase
implements EnergyTile {
	energyNode: EnergyTileNode;
	data: this["defaultValues"];

	defaultValues = {
		energy: 0
	}

	getEnergyCapacity(): number {
		return 0;
	}

	/** @deprecated use getEnergyCapacity instead */
	getEnergyStorage(): number {
		return this.getEnergyCapacity();
	}

	isGenerator(): boolean {
		return false;
	}

	isConductor(type: string): boolean {
		return false;
	}

	canReceiveEnergy(side: number, type: string, node: EnergyNode): boolean {
		return true;
	}

	canEmitEnergy(side: number, type: string, node: EnergyNode): boolean {
		return false;
	}

	getFreeEnergyAmount(): number {
		const storage = this.getEnergyCapacity();
		if (storage > this.data.energy) {
			return Math.floor(storage - this.data.energy);
		}
		return 0;
	}

	energyReceive(type: string, amount: number, voltage: number): number {
		const add = Math.min(amount, this.getEnergyCapacity() - this.data.energy);
		this.data.energy += add;
		return add;
	}

	energyTick(type: string, src: EnergyTileNode): void {}

	chargeSlot(slotName: string) {
		this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot(slotName), "Eu", this.data.energy, 0);
	}

	dischargeSlot(slotName: string) {
		const amount = this.getEnergyCapacity() - this.data.energy;
		this.data.energy += ChargeItemRegistry.getEnergyFromSlot(this.container.getSlot(slotName), "Eu", amount, 0);
	}
}