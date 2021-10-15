/// <reference path="./BlulectricMachine.ts" />

class ProcessingMachine extends BlulectricMachine {
	defaultValues = {
		energy: 0,
		progress: 0
	}

	canExtractEnergy(): boolean {
		return false;
	}

	getEnergyStorage(): number {
		return 2000;
	}

	onInit(): void {
		this.container.setSlotAddTransferPolicy("slotResult", function() {
			return 0;
		});
	}

	onTick() {
		StorageInterface.checkHoppers(this);
		this.dischargeSlot("slotEnergy");
	}
}