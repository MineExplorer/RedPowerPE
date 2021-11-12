class MachineBase extends TileEntityBase {
	getFacing(): number {
		return this.blockSource.getBlockData(this.x, this.y, this.z);
	}

	setActive(isActive: boolean): void {
		if (this.networkData.getBoolean("active") !== isActive) {
			this.networkData.putBoolean("active", isActive);
			this.networkData.sendChanges();
		}
	}

	onInit(): void {
		this.networkData.putInt("blockId", this.blockID);
		this.networkData.putInt("facing", this.getFacing());
		this.networkData.sendChanges();
	}

	clientLoad(): void {
		this.renderModel();
		this.networkData.addOnDataChangedListener((data, isExternal) => {
			this.renderModel();
		});
	}

	clientUnload(): void {
		BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
	}

	@BlockEngine.Decorators.ClientSide
	renderModel(): void {
		if (this.networkData.getBoolean("active")) {
			const blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
			const facing = this.networkData.getInt("facing");
			TileRenderer.mapAtCoords(this.x, this.y, this.z, blockId, facing);
		} else {
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
		}
	}
}
