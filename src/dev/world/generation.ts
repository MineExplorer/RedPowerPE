namespace WorldDecorator {
    export const oreConfig = {
		oreGenCopper: __config__.getBool("ore_gen.copper"),
		oreGenTin: __config__.getBool("ore_gen.tin"),
		oreGenSilver: __config__.getBool("ore_gen.silver"),
		oreGenTungsten: __config__.getBool("ore_gen.tungsten"),
		oreGenNikolite: __config__.getBool("ore_gen.nikolite"),
		oreGenRuby: __config__.getBool("ore_gen.gems"),
		oreGenSapphire: __config__.getBool("ore_gen.gems"),
		oreGenGreenSapphire: __config__.getBool("ore_gen.gems"),
	}

    export const genMarbleChance = __config__.getInteger("world_gen.marble");
    export const genBasaltChance = __config__.getInteger("world_gen.basalt");

	export function randomCoords(random: java.util.Random, chunkX: number, chunkZ: number, minHeight: number = 0, maxHeight: number = 128): Vector {
		let x = chunkX*16 + random.nextInt(16);
		let z = chunkZ*16 + random.nextInt(16);
		let y = random.nextInt(maxHeight - minHeight + 1) + minHeight;
		return {x: x, y: y, z: z};
	}

    function genMarble(x: number, y: number, z: number, random: java.util.Random) {
        GenerationUtils.generateOre(x, y, z, BlockID.rp_marble, 0, 72, false, random.nextInt());
        GenerationUtils.generateOre(x + random.nextInt(6), y, z + random.nextInt(6), BlockID.rp_marble, 0, 64, false, random.nextInt());
    }

    function genBasalt(x: number, y: number, z: number, random: java.util.Random) {
        let randY = 1 + random.nextFloat();
        let randR = 7 + random.nextFloat()*3;
        let r = Math.ceil(randR)
        let h = r/Math.sqrt(randY)
        for (let xx = -r; xx <= r; xx++) {
            for (let yy = -h; yy <= h; yy++) {
                for (let zz = -r; zz <= r; zz++) {
                    if (Math.sqrt(xx*xx + yy*yy*randY + zz*zz) < randR + random.nextFloat()/2) {
                        let id = World.getBlockID(x+xx, y+yy, z+zz)
                        if (id == 1 || id == 3 || id == 13 || id == 16)
                            World.setBlock(x+xx, y+yy, z+zz, BlockID.rp_basalt, 0);
                    }
                }
            }
        }
    }

    Callback.addCallback("PostLoaded", function() {
        for (let flag in oreConfig) {
            if (oreConfig[flag]) {
                oreConfig[flag] = !Flags.addFlag(flag);
            }
        }
    });

    World.addGenerationCallback("GenerateChunk", function(chunkX, chunkZ, random) {
        // Ores
        if (oreConfig.oreGenCopper) {
            for (let i = 0; i < 12; i++) {
                let coords = randomCoords(random, chunkX, chunkZ, 10, 70);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreCopper, 0, 10, false, random.nextInt());
            }
        }

        if (oreConfig.oreGenTin) {
            for (let i = 0; i < 10; i++) {
                let coords = randomCoords(random, chunkX, chunkZ, 1, 64);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTin, 0, 9, false, random.nextInt());
            }
        }

        if (oreConfig.oreGenSilver) {
            for (let i = 0; i < 4; i++) {
                let coords = randomCoords(random, chunkX, chunkZ, 1, 32);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSilver, 0, 9, false, random.nextInt());
            }
        }

        if (oreConfig.oreGenTungsten) {
            let coords = randomCoords(random, chunkX, chunkZ, 1, 16);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTungsten, 0, 5, false, random.nextInt());
        }

        if (oreConfig.oreGenNikolite) {
            for (let i = 0; i < 8; i++) {
                let coords = randomCoords(random, chunkX, chunkZ, 1, 20);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreNikolite, 0, 8, false, random.nextInt());
            }
        }

        if (oreConfig.oreGenRuby) {
            for (let i = 0; i < 6; i++) {
                let coords = randomCoords(random, chunkX, chunkZ, 1, 48);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreRuby, 0, 6, false, random.nextInt());
            }
        }

        if (oreConfig.oreGenSapphire) {
            for (let i = 0; i < 6; i++) {
                let coords = randomCoords(random, chunkX, chunkZ, 1, 48);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSapphire, 0, 6, false, random.nextInt());
            }
        }

        if (oreConfig.oreGenGreenSapphire) {
            for (let i = 0; i < 6; i++) {
                let coords = randomCoords(random, chunkX, chunkZ, 1, 48);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreGreenSapphire, 0, 6, false, random.nextInt());
            }
        }

        // Marble
        if (random.nextInt(100) < genMarbleChance) {
            let coords = randomCoords(random, chunkX, chunkZ, 32, 96);
            if (World.getBlockID(coords.x, coords.y, coords.z) == 1) {
                genMarble(coords.x, coords.y, coords.z, random);
            }
        }

        // Basalt
        if (random.nextInt(100) < genBasaltChance) {
            let coords = randomCoords(random, chunkX, chunkZ, 4, 12);
            genBasalt(coords.x, coords.y, coords.z, random);
        }
    }, "rp-generation");
}