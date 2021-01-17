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

// render
ICRender.getGroup("ic-wire").add(BlockID.bt_transformer, -1);
(function() {
	let modelBoxes =  [
		[0, 0, 0, 1, 1/8, 1],
		[1/8, 1/8, 1/16, 7/8, 7/8, 15/16],
		[0, 1/8, 3/8, 1, 1, 5/8]
	]
	let render = TileRenderer.createBlockModel(BlockID.bt_transformer, 0, modelBoxes);
	BlockRenderer.setStaticICRender(BlockID.bt_transformer, 0, render);
	TileRenderer.setCollisionShape(BlockID.bt_transformer, 0, modelBoxes);
})();

class BTTransformer {
	defaultValues = {
		electric_mode: false
	}

	isEnergySource() {
		return true;
	}

	getEnergyStorage() {
		return 128;
	}

	redstone(signal) {
		this.data.electric_mode = signal.power > 0;
	}

	energyReceive(type, amount, voltage) {
		if ((type == "Bt" && !this.data.electric_mode) || (type == "Eu" && this.data.electric_mode)) {
			let add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
			this.data.energy += add;
			return add;
		}
		return 0;
	}

	energyTick(type, src) {
		let output = this.data.energy;
		if (type == "Bt" && this.data.electric_mode) {
			this.data.energy += src.add(output) - output;
		}
		if (type == "Eu" && !this.data.electric_mode) {
			this.data.energy += src.add(output) - output;
		}
	}
}

MachineRegistry.registerPrototype(BlockID.bt_transformer, new BTTransformer());

EnergyTileRegistry.addEnergyTypeForId(BlockID.bt_transformer, EU);