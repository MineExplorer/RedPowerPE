var MachineRegistry = {
	machineIDs: {},

	isMachine: function(id){
		return this.machineIDs[id];
	},

	registerPrototype: function(id, Prototype, notElectric){
		// register ID
		this.machineIDs[id] = true;
		Prototype.id = id;
		
		// render functions
		if(Prototype.defaultValues && Prototype.defaultValues.isActive !== undefined){
			Prototype.defaultValues.meta = 0;
			if(!Prototype.init){
				Prototype.init = this.initModel;
			}
			if(!Prototype.setActive){
				Prototype.setActive = this.setActive;
			}
			if(!Prototype.destroy){
				Prototype.destroy = function(){
					BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
				}
			}
		}
		if(!notElectric){
			// wire connection
			ICRender.getGroup("bt-wire").add(id, -1);
			// setup energy value
			if (Prototype.defaultValues){
				Prototype.defaultValues.energy = 0;
			}
			else{
				Prototype.defaultValues = {
					energy: 0
				};
			}
			// setup functions
			if(!Prototype.getEnergyStorage){
				Prototype.getEnergyStorage = function(){
					return 0;
				};
			}
		}
		
		Block.setDestroyTime(id, 3.25);
		TileEntity.registerPrototype(id, Prototype);
		
		if(!notElectric){
			EnergyTileRegistry.addEnergyTypeForId(id, BT);
		}
	},

	// standart functions
	initModel: function(){
		TileRenderer.mapAtCoords(this.x, this.y, this.z, this.id, this.data.meta + (this.data.isActive? 4 : 0));
	},
	
	setActive: function(isActive){
		if(this.data.isActive != isActive){
			this.data.isActive = isActive;
			TileRenderer.mapAtCoords(this.x, this.y, this.z, this.id, this.data.meta + (isActive? 4 : 0));
		}
	},
	
	basicEnergyReceiveFunc: function(type, src){
		var energyNeed = this.getEnergyStorage() - this.data.energy;
		this.data.energy += src.get(energyNeed);
	},
	
	updateGuiHeader: function(gui, text){
		var header = gui.getWindow("header");
		header.contentProvider.drawing[1].text = Translation.translate(text);
	}
}
