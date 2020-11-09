var MachineRenderer = {
	getFacing: function() {
		return this.blockSource.getBlockData(this.x, this.y, this.z);
	},

	renderModel: function() {
		if (this.data.isActive) {
			TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, this.getFacing());
		} else {
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
		}
	},

	setActive: function(isActive) {
		if (this.data.isActive != isActive) {
			this.data.isActive = isActive;
			this.renderModel();
		}
	},

	init: function() {
		if (this.data.meta != undefined) {
			this.blockSource.setBlock(this.x, this.y, this.z, this.blockID, this.data.meta + 2);
			delete this.data.meta;
		}
		this.renderModel();
	},

	destroy: function() {
		BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
	}
}


var MachineRegistry = {
	machineIDs: {},

	isMachine: function(id) {
		return this.machineIDs[id];
	},

	registerPrototype: function(id, Prototype, notElectric) {
		// register ID
		this.machineIDs[id] = true;

		if (!notElectric) {
			// wire connection
			ICRender.getGroup("bt-wire").add(id, -1);
			// setup prototype properties
			Prototype.useNetworkItemContainer = true;
			Prototype.getScreenName = function(player, coords) {
				return "main";
			};
			Prototype.defaultValues = Prototype.defaultValues || {};
			Prototype.defaultValues.energy = 0;
			Prototype.getEnergyStorage = Prototype.getEnergyStorage || function() {
				return 0;
			}
			Prototype.energyReceive = Prototype.energyReceive || function(type, amount, voltage) {
				var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
				this.data.energy += add;
				return add;
			}
		}

		Block.setDestroyTime(id, 3.25);
		TileEntity.registerPrototype(id, Prototype);

		if (!notElectric) {
			EnergyTileRegistry.addEnergyTypeForId(id, BT);
		}
	},

	registerGenerator: function(id, Prototype) {
		Prototype.isEnergySource = function() {
			return true;
		}
		Prototype.canReceiveEnergy = function() {
			return false;
		}
		this.registerPrototype(id, Prototype);
	},

	registerMachine: function(id, Prototype, notElectric) {
		for(var property in MachineRenderer) {
			if (!Prototype[property]) {
				Prototype[property] = MachineRenderer[property];
			}
		}
		this.registerPrototype(id, Prototype, notElectric);
	},

	updateGuiHeader: function(gui, text) {
		var header = gui.getWindow("header");
		header.contentProvider.drawing[1].text = Translation.translate(text);
	}
}
