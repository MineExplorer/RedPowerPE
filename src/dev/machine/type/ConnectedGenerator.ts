/// <reference path="./BlulectricMachine.ts" />

abstract class ConnectedGenerator extends BlulectricMachine {
	isHost: boolean = false;
	host: ConnectedGenerator = null;
	connectedTiles: ConnectedGenerator[] = null;

	isConductor(type: string): boolean {
		return true;
	}

	canReceiveEnergy(side: number, type: string, node: EnergyGrid | EnergyTileNode): boolean {
		return node.kind == "tile" && node.tileEntity.blockID == this.blockID;
	}

    canEmitEnergy(side: number, type: string, node: EnergyNode): boolean {
		return true;
	}

	onInit(): void {
		this.connectedTiles = [];
		this.energyNode.defaultTransferMode = TransferMode.Full;
	}

    onTick(): void {
		this.checkHost();
    }

    energyTick(type: string, src: EnergyTileNode): void {
        if (!this.isHost) return;

        let availableEnergy = 0;
        let maxOutput = 0;
        this.connectedTiles.forEach(tile => {
            availableEnergy += tile.data.energy;
            if (tile.data.energy > maxOutput) {
                maxOutput = tile.data.energy;
            }
            tile.data.energy = 0;
        });
        this.energyNode.add(availableEnergy, maxOutput);
	}

	destroy(): boolean {
		this.host?.resetHost();
		return false;
	}

	checkHost(): void {
		if (!this.host) {
			const visited: ConnectedGenerator[] = [];
			const host = this.findHostRecursive(visited);
			if (host) {
				this.setHost(host);
			} else {
				this.setHost(this);
				visited.forEach(tile => {
					tile.setHost(this);
				});
				visited.forEach(tile => {
					EnergyGridBuilder.buildGridForTile(tile);
				});
			}
		}
	}

	findHostRecursive(visited: TileEntity[]): ConnectedGenerator {
		visited.push(this);
		let host: ConnectedGenerator = null;
		for (let side = 2; side < 6; side++) {
			const relative = World.getRelativeCoords(this.x, this.y, this.z, side);
			const tile = this.region.getTileEntity(relative.x, relative.y, relative.z);
			if (tile && tile.blockID == this.blockID && !visited.includes(tile)) {
				if (tile.host) {
					if (host && host != tile.host) {
						const connected: ConnectedGenerator[] = tile.host.connectedTiles;
						tile.host.resetHost();
						connected.forEach(t => {
							t.setHost(host);
						});
					} else {
						host = tile.host;
					}
				}
				if (!host) {
					host = tile.findHostRecursive(visited);
				}
			}
		}
		return host;
	}

	setHost(host: ConnectedGenerator): void {
		host.connectedTiles.push(this);
		this.host = host;
		this.isHost = host == this;
	}

	resetHost(): void {
		this.isHost = false;
		this.connectedTiles.forEach(tile => {
			tile.host = null;
		});
		this.connectedTiles = [];
	}
}