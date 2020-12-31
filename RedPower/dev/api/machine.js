class TileEntityBase {
	useNetworkItemContainer = true;

	getScreenName(player, coords) {
		return "main";
	}

	getScreenByName(screenName) {
		return null;
	}
}

class MachineBase
extends TileEntityBase {
	getFacing() {
		return this.blockSource.getBlockData(this.x, this.y, this.z);
	}

	setActive(isActive) {
		if (this.networkData.getBoolean("isActive") !== isActive) {
			this.networkData.putBoolean("isActive", isActive);
			this.networkData.sendChanges();
		}
	}

	init() {
		if (this.data.meta !== undefined) {
			this.blockSource.setBlock(this.x, this.y, this.z, this.blockID, this.data.meta + 2);
			delete this.data.meta;
		}
		this.networkData.putInt("blockId", this.blockID);
		this.networkData.putInt("blockData", this.getFacing());
		this.networkData.sendChanges();
	}

	// Client functions
	client = {
		renderModel() {
			if (this.networkData.getBoolean("isActive")) {
				let blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
				let blockData = this.networkData.getInt("blockData");
				TileRenderer.mapAtCoords(this.x, this.y, this.z, blockId, blockData);
			} else {
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			}
		},

		load() {
			this.renderModel();
			let self =  this;
			this.networkData.addOnDataChangedListener(function(data, isExternal) {
				self.renderModel();
			});
		},

		unload() {
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
		}
	}
}


var MachineRegistry = {
	machineIDs: {},

	isMachine: function(id) {
		return this.machineIDs[id];
	},

	registerPrototype: function(id, Prototype) {
		this.machineIDs[id] = true;
		Block.setDestroyTime(id, 3.25);
		TileEntity.registerPrototype(id, Prototype);
	},

	registerMachine: function(id, Prototype, notElectric) {
		// wire connection
		ICRender.getGroup("bt-wire").add(id, -1);
		// setup prototype properties and functions
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
		this.registerPrototype(id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId(id, BT);
	},

	registerGenerator: function(id, Prototype) {
		Prototype.isEnergySource = function() {
			return true;
		}
		Prototype.canReceiveEnergy = function() {
			return false;
		}
		this.registerMachine(id, Prototype);
	},

	updateGuiHeader: function(gui, text) {
		var header = gui.getWindow("header");
		header.contentProvider.drawing[2].text = Translation.translate(text);
	}
}
