class MachineBase
extends TileEntityBase {
	getFacing() {
		return this.region.getBlockData(this);
	}

	setActive(isActive: boolean) {
		if (this.networkData.getBoolean("isActive") !== isActive) {
			this.networkData.putBoolean("isActive", isActive);
			this.networkData.sendChanges();
		}
	}

	onInit(): void {
		this.networkData.putInt("blockId", this.blockID);
		this.networkData.putInt("blockData", this.getFacing());
		this.networkData.sendChanges();
	}

	clientLoad() {
		this.renderModel();
		this.networkData.addOnDataChangedListener((data, isExternal) => {
			this.renderModel();
		});
	}

	clientUnload() {
		BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
	}

	@BlockEngine.Decorators.ClientSide
	renderModel() {
		if (this.networkData.getBoolean("isActive")) {
			let blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
			let blockData = this.networkData.getInt("blockData");
			TileRenderer.mapAtCoords(this.x, this.y, this.z, blockId, blockData);
		} else {
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
		}
	}
}
