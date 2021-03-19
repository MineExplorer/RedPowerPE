/// <reference path="../core/BlulectricMachine.ts" />

IDRegistry.genBlockID("bt_transformer");
Block.createBlock("bt_transformer", [
	{name: "Blutricity Transformer", texture: [["bt_transformer_bottom", 0], ["bt_transformer_top", 0], ["bt_transformer_side", 0], ["bt_transformer_side", 0], ["bt_transformer_side", 1], ["bt_transformer_side", 1]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.bt_transformer, "stone", 1);
Block.setDestroyLevel("bt_transformer", 1);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.bt_transformer, count: 1, data: 0}, [
		"xxx",
		"cxc",
		"axa"
	], ['x', 265, 0, 'a', ItemID.ingotBlue, 0, 'c', ItemID.copperCoil, 0]);
});

namespace TransformerRender {
	ICRender.getGroup("ic-wire").add(BlockID.bt_transformer, -1);
	let modelBoxes: any = [
		[0, 0, 0, 1, 1/8, 1],
		[1/8, 1/8, 1/16, 7/8, 7/8, 15/16],
		[0, 1/8, 3/8, 1, 1, 5/8]
	]
	let render = TileRenderer.createBlockModel(BlockID.bt_transformer, 0, modelBoxes);
	BlockRenderer.setStaticICRender(BlockID.bt_transformer, 0, render);
	TileRenderer.setCollisionShape(BlockID.bt_transformer, 0, modelBoxes);
}

class BTTransformer extends BlulectricMachine {
	defaultValues = {
		energy: 0,
		electric_mode: false
	}

	canReceiveEnergy(side: number, type: string): boolean {
		return this.data.electric_mode == (type == "Bt");
	}

	canExtractEnergy(side: number, type: string): boolean {
		return this.data.electric_mode != (type == "Bt");
	}

	getEnergyStorage(): number {
		return 128;
	}

	energyTick(type: string, src: EnergyTileNode): void {
		let output = this.data.energy;
		if (output > 0) {
			this.data.energy -= src.addPacket(this.data.electric_mode ? "Bt" : "Eu", output);
		}
	}

	redstone(signal: {power: number}): void {
		let mode = signal.power > 0;
		if (this.data.electric_mode != mode) {
			this.data.electric_mode = mode;
			this.rebuildGrid();
		}
	}

	rebuildGrid(): void {
		this.energyNode.resetConnections();
		EnergyGridBuilder.buildGridForTile(this);
	}

	onItemUse(): boolean {
		return true;
	}
}

MachineRegistry.registerMachine(BlockID.bt_transformer, new BTTransformer());

EnergyTileRegistry.addEnergyTypeForId(BlockID.bt_transformer, EU);