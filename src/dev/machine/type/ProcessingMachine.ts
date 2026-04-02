/// <reference path="./BlulectricMachine.ts" />

class ProcessingMachine extends BlulectricMachine {
	defaultValues = {
		energy: 0,
		progress: 0
	}

	canEmitEnergy(): boolean {
		return false;
	}

	getEnergyCapacity(): number {
		return 2000;
	}

	onInit(): void {
		super.onInit();
		this.container.setSlotAddTransferPolicy("slotResult", function() {
			return 0;
		});
	}

	onTick() {
		StorageInterface.checkHoppers(this);
		this.dischargeSlot("slotEnergy");
	}
}