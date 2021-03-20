var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// libraries
IMPORT("BlockEngine");
IMPORT("flags");
IMPORT("BaseBlocks");
IMPORT("ToolLib", "ToolLib");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("BackpackAPI");
IMPORT("StorageInterface");
IMPORT("VanillaRecipe");
VanillaRecipe.setResourcePath(__dir__ + "res/");
// constants
var GUI_SCALE = 3.2;
var COLOR_INDEX_TO_DYE_DATA = {
    0: 19,
    1: 14,
    2: 13,
    3: 12,
    4: 11,
    5: 10,
    6: 9,
    7: 8,
    8: 7,
    9: 6,
    10: 5,
    11: 18,
    12: 17,
    13: 2,
    14: 1,
    15: 16
};
// API
function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}
function Vector(x, y, z) {
    return { x: x, y: y, z: z };
}
// blutricity
var BT = EnergyTypeRegistry.assureEnergyType("Bt", 1);
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
// Ores
Translation.addTranslation("Copper Ore", { ru: "Медная руда", es: "Mineral de Cobre", pt: "Minério de Cobre", zh: "铜矿石" });
Translation.addTranslation("Tin Ore", { ru: "Оловянная руда", es: "Mineral de Estaño", pt: "Minério de Estanho", zh: "锡矿石" });
Translation.addTranslation("Silver Ore", { ru: "Серебряная руда", es: "Mineral de Plata", pt: "Minério de Prata", zh: "银矿石" });
Translation.addTranslation("Tungsten Ore", { ru: "Вольфрамовая руда", es: "Mineral de Tungsteno", zh: "红宝石矿石" });
Translation.addTranslation("Ruby Ore", { ru: "Рубиновая руда" });
Translation.addTranslation("Sapphire Ore", { ru: "Сапфировая руда" });
Translation.addTranslation("Green Sapphire Ore", { ru: "Руда зелёного сапфира" });
Translation.addTranslation("Nikolite Ore", { ru: "Николитовая руда" });
// Blocks
//Translation.addTranslation("Bronze Block", {ru: "Бронзовый блок", es: "Bloque de Bronce", pt: "Bloco de Bronze", zh: "青铜块"});
Translation.addTranslation("Copper Block", { ru: "Медный блок", es: "Bloque de Cobre", pt: "Bloco de Cobre", zh: "铜块" });
Translation.addTranslation("Tin Block", { ru: "Оловянный блок", es: "Bloque de Estaño", pt: "Bloco de Estanho", zh: "锡矿石" });
Translation.addTranslation("Silver Block", { ru: "Серебряный блок", es: "Bloque de Plata", pt: "Bloco de Prata", zh: "银块" });
//Translation.addTranslation("Tungsten Block", {ru: "Вольфрамовый блок", es: "Bloque de Tungsteno", zh: "钨块"});
Translation.addTranslation("Ruby Block", { ru: "Рубиновый блок" });
Translation.addTranslation("Sapphire Block", { ru: "Сапфировый блок" });
Translation.addTranslation("Green Sapphire Block", { ru: "Блок зелёного сапфира" });
Translation.addTranslation("Nikolite Block", { ru: "Николитовый блок" });
Translation.addTranslation("Flax", { ru: "Лён" });
Translation.addTranslation("Indigo Flower", { ru: "Цветок индиго" });
Translation.addTranslation("Marble", { ru: "Мрамор" });
Translation.addTranslation("Marble Brick", { ru: "Мраморный кирпич" });
Translation.addTranslation("Basalt", { ru: "Базальт" });
Translation.addTranslation("Basalt Cobble", { ru: "Базальтовый булыжник" });
Translation.addTranslation("Basalt Brick", { ru: "Базальтовый кирпич" });
Translation.addTranslation("Chiseled Basalt Brick", { ru: "Резной базальтовый кирпич" });
Translation.addTranslation("Basalt Paver", { ru: "Базальтовая плитка" });
Translation.addTranslation("Basalt Slab", { ru: "Базальтовая плита" });
Translation.addTranslation("Basalt Cobble Slab", { ru: "Плита из базальтового булыжника" });
Translation.addTranslation("Basalt Brick Slab", { ru: "Плита из базальтового кирпича" });
Translation.addTranslation("Marble Slab", { ru: "Мраморная плита" });
Translation.addTranslation("Marble Brick Slab", { ru: "Плита из мраморного кирпича" });
// Lamps
Translation.addTranslation("White Lamp", { ru: "Белая лампа" });
Translation.addTranslation("Orange Lamp", { ru: "Оранжевая лампа" });
Translation.addTranslation("Magenta Lamp", { ru: "Пурпурная лампа" });
Translation.addTranslation("Light Blue Lamp", { ru: "Голубая лампа" });
Translation.addTranslation("Yellow Lamp", { ru: "Жёлтая лампа" });
Translation.addTranslation("Lime Lamp", { ru: "Лаймовая лампа" });
Translation.addTranslation("Pink Lamp", { ru: "Розовая лампа" });
Translation.addTranslation("Gray Lamp", { ru: "Серая лампа" });
Translation.addTranslation("Light Gray Lamp", { ru: "Светло-серая лампа" });
Translation.addTranslation("Cyan Lamp", { ru: "Бирюзовая лампа" });
Translation.addTranslation("Purple Lamp", { ru: "Фиолетовая лампа" });
Translation.addTranslation("Blue Lamp", { ru: "Синяя лампа" });
Translation.addTranslation("Brown Lamp", { ru: "Коричневая лампа" });
Translation.addTranslation("Green Lamp", { ru: "Зелёная лампа" });
Translation.addTranslation("Red Lamp", { ru: "Красная лампа" });
Translation.addTranslation("Black Lamp", { ru: "Чёрная лампа" });
Translation.addTranslation("White Inverted Lamp", { ru: "Белая инвертированная лампа" });
Translation.addTranslation("Orange Inverted Lamp", { ru: "Оранжевая инвертированная лампа" });
Translation.addTranslation("Magenta Inverted Lamp", { ru: "Пурпурная инвертированная лампа" });
Translation.addTranslation("Light Blue Inverted Lamp", { ru: "Голубая инвертированная лампа" });
Translation.addTranslation("Yellow Inverted Lamp", { ru: "Жёлтая инвертированная лампа" });
Translation.addTranslation("Lime Inverted Lamp", { ru: "Лаймовая инвертированная лампа" });
Translation.addTranslation("Pink Inverted Lamp", { ru: "Розовая инвертированная лампа" });
Translation.addTranslation("Gray Inverted Lamp", { ru: "Серая инвертированная лампа" });
Translation.addTranslation("Light Gray Inverted Lamp", { ru: "Светло-серая инвертированная лампа" });
Translation.addTranslation("Cyan Inverted Lamp", { ru: "Бирюзовая инвертированная лампа" });
Translation.addTranslation("Purple Inverted Lamp", { ru: "Фиолетовая инвертированная лампа" });
Translation.addTranslation("Blue Inverted Lamp", { ru: "Синяя инвертированная лампа" });
Translation.addTranslation("Brown Inverted Lamp", { ru: "Коричневая инвертированная лампа" });
Translation.addTranslation("Green Inverted Lamp", { ru: "Зелёная инвертированная лампа" });
Translation.addTranslation("Red Inverted Lamp", { ru: "Красная инвертированная лампа" });
Translation.addTranslation("Black Inverted Lamp", { ru: "Чёрная инвертированная лампа" });
// Machines
Translation.addTranslation("Smelter", { ru: "Плавильная печь" });
Translation.addTranslation("Blulectric Smelter", { ru: "Блутрическая плавильная печь" });
Translation.addTranslation("Blulectric Furnace", { ru: "Блутрическая печь" });
Translation.addTranslation("Solar Panel", { ru: "Солнечная панель", es: "Panel Solar", pt: "Painel Solar", zh: "太阳能发电机" });
Translation.addTranslation("Thermopile", { ru: "Термоэлемент" });
Translation.addTranslation("Battery Box", { ru: "Аккумулятор" });
Translation.addTranslation("Blutricity Transformer", { ru: "Преобразователь блутричества" });
Translation.addTranslation("Blue Alloy Wire", { ru: "Провод из синего сплава" });
// Items
Translation.addTranslation("Flax Seeds", { ru: "Семена льна" });
Translation.addTranslation("Ruby", { ru: "Рубин" });
Translation.addTranslation("Sapphire", { ru: "Сапфир" });
Translation.addTranslation("Green Sapphire", { ru: "Зелёный сапфир" });
Translation.addTranslation("Nikolite", { ru: "Николит" });
Translation.addTranslation("Red Alloy Ingot", { ru: "Слиток красного сплава" });
Translation.addTranslation("Blue Alloy Ingot", { ru: "Слиток синего сплава" });
Translation.addTranslation("Bronze Ingot", { ru: "Бронзовый слиток", es: "Lingote de Bronce", pt: "Lingote de Bronze", zh: "青铜锭" });
Translation.addTranslation("Tin Ingot", { ru: "Оловянный слиток", es: "Lingote de Estaño", pt: "Lingote de Estanho", zh: "锡锭" });
Translation.addTranslation("Copper Ingot", { ru: "Медный слиток", es: "Lingote de Cobre", pt: "Lingote de Cobre", zh: "铜锭" });
Translation.addTranslation("Silver Ingot", { ru: "Серебрянный слиток", es: "Lingote de Plata", pt: "Lingote de Prata", zh: "银锭" });
Translation.addTranslation("Tungsten Ingot", { ru: "Вольфрамовый слиток", es: "Lingote de Tungsteno", zh: "钨锭" });
Translation.addTranslation("Silicon Boule", { ru: "Кремниевый монокристалл" });
Translation.addTranslation("Silicon Wafer", { ru: "Кремниевая плата" });
Translation.addTranslation("Red-Doped Wafer", { ru: "Красная плата" });
Translation.addTranslation("Blue-Doped Wafer", { ru: "Синяя плата" });
Translation.addTranslation("Fine Copper Wire", { ru: "Качественная медная проволока" });
Translation.addTranslation("Fine Iron Wire", { ru: "Качественная железная проволока" });
Translation.addTranslation("Copper Coil", { ru: "Медная катушка" });
Translation.addTranslation("BT Battery", { ru: "Батарея" });
// Tools
Translation.addTranslation("Diamond Handsaw", { ru: "Алмазная ножовка" });
Translation.addTranslation("Diamond Drawplate", { ru: "Алмазная волока" });
Translation.addTranslation("Wool Card", { ru: "Чесалка" });
Translation.addTranslation("Athame", { ru: "Атам" });
Translation.addTranslation("Wood Sickle", { ru: "Деревянный серп" });
Translation.addTranslation("Stone Sickle", { ru: "Каменный серп" });
Translation.addTranslation("Iron Sickle", { ru: "Железный серп" });
Translation.addTranslation("Gold Sickle", { ru: "Золотой серп" });
Translation.addTranslation("Diamond Sickle", { ru: "Алмазный серп" });
Translation.addTranslation("Ruby Sword", { ru: "Рубиновый меч" });
Translation.addTranslation("Ruby Shovel", { ru: "Рубиновая лопата" });
Translation.addTranslation("Ruby Pickaxe", { ru: "Рубиновая кирка" });
Translation.addTranslation("Ruby Axe", { ru: "Рубиновый топор" });
Translation.addTranslation("Ruby Hoe", { ru: "Рубиновая мотыга" });
Translation.addTranslation("Ruby Sickle", { ru: "Рубиновый серп" });
Translation.addTranslation("Sapphire Sword", { ru: "Сапфировый меч" });
Translation.addTranslation("Sapphire Shovel", { ru: "Сапфировая лопата" });
Translation.addTranslation("Sapphire Pickaxe", { ru: "Сапфировая кирка" });
Translation.addTranslation("Sapphire Axe", { ru: "Сапфировый топор" });
Translation.addTranslation("Sapphire Hoe", { ru: "Сапфировая мотыга" });
Translation.addTranslation("Sapphire Sickle", { ru: "Сапфировый серп" });
Translation.addTranslation("Green Sapphire Sword", { ru: "Сапфировый меч" });
Translation.addTranslation("Green Sapphire Shovel", { ru: "Сапфировая лопата" });
Translation.addTranslation("Green Sapphire Pickaxe", { ru: "Сапфировая кирка" });
Translation.addTranslation("Green Sapphire Axe", { ru: "Сапфировый топор" });
Translation.addTranslation("Green Sapphire Hoe", { ru: "Сапфировая мотыга" });
Translation.addTranslation("Green Sapphire Sickle", { ru: "Сапфировый серп" });
Translation.addTranslation("Canvas", { ru: "Холст" });
Translation.addTranslation("Canvas Bag", { ru: "Холщёвая сумка" });
Translation.addTranslation("Seed Bag", { ru: "Мешочек для семян" });
// Creative groups
Translation.addTranslation("Ores", { ru: "Руды" });
Translation.addTranslation("Mineral Blocks", { ru: "Минеральный блоки" });
Translation.addTranslation("Slabs", { ru: "Плиты" });
Translation.addTranslation("Lamps", { ru: "Лампы" });
Translation.addTranslation("Inverted Lamps", { ru: "Инвертированные лампы" });
Translation.addTranslation("Lumar", { ru: "Светодиоды" });
Translation.addTranslation("Ingots", { ru: "Слитки" });
Translation.addTranslation("Gems", { ru: "Драгоценные камни" });
Translation.addTranslation("Swords", { ru: "Мечи" });
Translation.addTranslation("Shovels", { ru: "Лопаты" });
Translation.addTranslation("Pickaxes", { ru: "Кирки" });
Translation.addTranslation("Axes", { ru: "Топоры" });
Translation.addTranslation("Hoes", { ru: "Мотыги" });
Translation.addTranslation("Sickles", { ru: "Серпы" });
var MachineRegistry;
(function (MachineRegistry) {
    var machineIDs = {};
    function isMachine(id) {
        return machineIDs[id];
    }
    MachineRegistry.isMachine = isMachine;
    function registerPrototype(id, Prototype) {
        machineIDs[id] = true;
        Block.setDestroyTime(id, 3.25);
        TileEntity.registerPrototype(id, Prototype);
    }
    MachineRegistry.registerPrototype = registerPrototype;
    function registerMachine(id, Prototype) {
        registerPrototype(id, Prototype);
        // wire connection
        ICRender.getGroup("bt-wire").add(id, -1);
        EnergyTileRegistry.addEnergyTypeForId(id, BT);
    }
    MachineRegistry.registerMachine = registerMachine;
    function updateGuiHeader(gui, text) {
        var header = gui.getWindow("header");
        header.contentProvider.drawing[2].text = Translation.translate(text);
    }
    MachineRegistry.updateGuiHeader = updateGuiHeader;
})(MachineRegistry || (MachineRegistry = {}));
var SmelterRecipes;
(function (SmelterRecipes) {
    var recipeData = [];
    function addRecipe(result, input) {
        recipeData.push({ input: input, result: result });
    }
    SmelterRecipes.addRecipe = addRecipe;
    function getRecipe(input) {
        for (var i in recipeData) {
            var recipe = recipeData[i];
            var valid = true;
            for (var j in recipe.input) {
                var source = recipe.input[j];
                var count = input[source.id];
                if (!count || count < source.count) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return recipe;
            }
        }
    }
    SmelterRecipes.getRecipe = getRecipe;
    function performRecipe(recipe, container) {
        var resultSlot = container.getSlot("slotResult");
        for (var i in recipe.input) {
            var count = recipe.input[i].count;
            for (var j = 1; j <= 4; j++) {
                var slot = container.getSlot("slotSource" + j);
                if (slot.id == recipe.input[i].id) {
                    var dc = Math.min(count, slot.count);
                    count -= dc;
                    slot.setSlot(slot.id, slot.count - dc, slot.data);
                    slot.validate();
                }
            }
        }
        resultSlot.setSlot(recipe.result.id, resultSlot.count + recipe.result.count, recipe.result.data || 0);
        container.validateAll();
    }
    SmelterRecipes.performRecipe = performRecipe;
})(SmelterRecipes || (SmelterRecipes = {}));
var IntegrationAPI;
(function (IntegrationAPI) {
    function registerPlant(blockID) {
        plants.push(blockID);
    }
    IntegrationAPI.registerPlant = registerPlant;
    function registerSeeds(itemID, blockID) {
        seeds[itemID] = blockID;
    }
    IntegrationAPI.registerSeeds = registerSeeds;
})(IntegrationAPI || (IntegrationAPI = {}));
ItemRegistry.createItem("flaxSeeds", { name: "Flax Seeds", icon: "flax_seeds" });
IDRegistry.genBlockID("flax");
Block.createBlock("flax", [
    { name: "Flax", texture: [["flax", 0]], inCreative: false },
    { name: "Flax", texture: [["flax", 1]], inCreative: false },
    { name: "Flax", texture: [["flax", 2]], inCreative: false },
    { name: "Flax", texture: [["flax", 3]], inCreative: false },
    { name: "Flax", texture: [["flax", 4]], inCreative: false },
    { name: "Flax", texture: [["flax", 5]], inCreative: false },
], {
    base: 59,
    destroytime: 0,
    rendertype: 6,
    sound: "grass"
});
TileRenderer.setEmptyCollisionShape(BlockID.flax);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 1 / 8, 1, 0);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 3 / 8, 1, 1);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 3 / 4, 1, 2);
Block.setShape(BlockID.flax, 0, 0, 0, 1, 15 / 16, 1, 3);
Block.registerDropFunction("flax", function (coords, blockID, blockData, level, enchant, item, region) {
    if (region.getBlockId(coords.x, coords.y + 1, coords.z) == blockID) {
        region.destroyBlock(coords.x, coords.y + 1, coords.z, true);
    }
    if (blockData < 4) {
        return [[ItemID.flaxSeeds, 1, 0]];
    }
    return [[ItemID.flaxSeeds, randomInt(1, 3), 0], [287, randomInt(1, 3), 0]];
});
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    if (Math.random() < 1 / 16 && (block.id == 31 && block.data == 0 || block.id == 175 && (block.data == 2 || block.data == 10))) {
        region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, ItemID.flaxSeeds, 1, 0);
    }
});
Block.registerNeighbourChangeFunction("flax", function (coords, block, changeCoords, region) {
    if (changeCoords.y < coords.y && region.getBlockId(coords.x, coords.y - 1, coords.z) != 60) {
        region.destroyBlock(coords.x, coords.y, coords.z, true);
    }
});
Item.registerUseFunction("flaxSeeds", function (coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    if (block.id == 60 && coords.side == 1 && region.getBlockId(coords.x, coords.y + 1, coords.z) == 0) {
        region.setBlock(coords.x, coords.y + 1, coords.z, BlockID.flax, 0);
        if (Game.isItemSpendingAllowed(player)) {
            Entity.setCarriedItem(player, item.id, item.count - 1, 0);
        }
        World.playSound(coords.x, coords.y + 1, coords.z, "dig.grass", 1, 0.8);
    }
});
function checkFarmland(x, y, z, region) {
    var block = region.getBlock(x, y, z);
    if (block.id == 60) {
        if (block.data < 7) {
            return 0.25;
        }
        return 0.75;
    }
    return 0;
}
Block.setRandomTickCallback(BlockID.flax, function (x, y, z, id, data, region) {
    if (data < 5) {
        var block = region.getBlock(x, y - 1, z);
        if (block.id != 60) {
            region.destroyBlock(x, y, z, true);
        }
        else if (data < 4 && region.getLightLevel(x, y, z) >= 9) {
            var points = (block.data < 7) ? 2 : 4;
            points += checkFarmland(x - 1, y, z - 1, region);
            points += checkFarmland(x - 1, y, z, region);
            points += checkFarmland(x - 1, y, z + 1, region);
            points += checkFarmland(x, y, z - 1, region);
            points += checkFarmland(x, y, z + 1, region);
            points += checkFarmland(x + 1, y, z - 1, region);
            points += checkFarmland(x + 1, y, z, region);
            points += checkFarmland(x + 1, y, z + 1, region);
            var chance = 1 / (Math.floor(50 / points) + 1);
            if (Math.random() < chance) {
                if (data < 3) {
                    region.setBlock(x, y, z, id, data + 1);
                }
                else if (region.getBlockId(x, y + 1, z) == 0) {
                    region.setBlock(x, y, z, id, 4);
                    region.setBlock(x, y + 1, z, id, 5);
                }
            }
        }
    }
    else if (region.getBlockId(x, y - 1, z) != id) {
        region.destroyBlock(x, y, z, true);
    }
});
// bone meal use
Callback.addCallback("ItemUse", function (coords, item, block, isExternal, player) {
    var region = BlockSource.getDefaultForActor(player);
    if (item.id == 351 && item.data == 15 && block.id == BlockID.flax && block.data < 4) {
        block.data += randomInt(2, 3);
        if (block.data < 4) {
            region.setBlock(coords.x, coords.y, coords.z, block.id, block.data);
        }
        else if (region.getBlockId(coords.x, coords.y + 1, coords.z) == 0) {
            region.setBlock(coords.x, coords.y, coords.z, block.id, 4);
            region.setBlock(coords.x, coords.y + 1, coords.z, block.id, 5);
        }
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
        for (var i = 0; i < 16; i++) {
            var px = coords.x + Math.random();
            var pz = coords.z + Math.random();
            var py = coords.y + Math.random();
            Particles.addFarParticle(Native.ParticleType.happyVillager, px, py, pz, 0, 0, 0);
        }
    }
});
Block.createSpecialType({
    base: 1,
    solid: true,
    destroytime: 2,
    explosionres: 100,
    lightopacity: 15,
    renderlayer: 2,
    translucency: 0,
    sound: "stone"
}, "basalt");
IDRegistry.genBlockID("rp_basalt");
Block.createBlock("rp_basalt", [
    { name: "Basalt", texture: [["rp_basalt", 0]], inCreative: true }
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.rp_basalt, "stone", 1, true);
Block.registerDropFunction("rp_basalt", function (coords, blockID, blockData, level, enchant) {
    if (level > 0) {
        if (enchant.silk) {
            return [[BlockID.rp_basalt, 1, 0]];
        }
        return [[BlockID.basaltCobble, 1, 0]];
    }
    return [];
}, 1);
ToolLib.addBlockDropOnExplosion("rp_basalt");
IDRegistry.genBlockID("basaltCobble");
Block.createBlock("basaltCobble", [
    { name: "Basalt Cobble", texture: [["rp_basalt_cobble", 0]], inCreative: true }
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltCobble, "stone", 1, true);
Block.setDestroyLevel("basaltCobble", 1);
ToolLib.addBlockDropOnExplosion("basaltCobble");
IDRegistry.genBlockID("basaltBrick");
Block.createBlock("basaltBrick", [
    { name: "Basalt Brick", texture: [["rp_basalt_brick", 0]], inCreative: true },
    { name: "Chiseled Basalt Brick", texture: [["rp_basalt_chiseled", 0]], inCreative: true }
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltBrick, "stone", 1, true);
Block.setDestroyLevel("basaltBrick", 1);
ToolLib.addBlockDropOnExplosion("basaltBrick");
IDRegistry.genBlockID("basaltPaver");
Block.createBlock("basaltPaver", [
    { name: "Basalt Paver", texture: [["rp_basalt_paver", 0]], inCreative: true }
], "basalt");
ToolAPI.registerBlockMaterial(BlockID.basaltPaver, "stone", 1, true);
Block.registerDropFunction("basaltPaver", function (coords, blockID, blockData, level, enchant) {
    if (level > 0) {
        if (enchant.silk) {
            return [[blockID, 1, 0]];
        }
        return [[BlockID.basaltCobble, 1, 0]];
    }
    return [];
}, 1);
ToolLib.addBlockDropOnExplosion("basaltPaver");
Item.addCreativeGroup("basalt", Translation.translate("Basalt"), [
    BlockID.rp_basalt,
    BlockID.basaltCobble,
    BlockID.basaltBrick,
    BlockID.basaltPaver,
]);
Recipes.addFurnace(BlockID.basaltCobble, BlockID.rp_basalt, 0);
VanillaRecipe.addCraftingRecipe("basalt_brick", {
    type: "shaped",
    pattern: [
        "XX",
        "XX"
    ],
    key: {
        "X": { item: "block:rp_basalt" }
    },
    result: {
        item: "block:basaltBrick",
        data: 0,
        count: 4
    }
}, true);
VanillaRecipe.addCraftingRecipe("basalt_paver", {
    type: "shapeless",
    tags: ["crafting_table", "stonecutter"],
    ingredients: [
        { item: "block:rp_basalt" }
    ],
    result: {
        item: "block:basaltPaver"
    }
}, true);
VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_brick", {
    ingredients: [
        { item: "block:rp_basalt" }
    ],
    result: {
        item: "block:basaltBrick",
        data: 0
    }
});
VanillaRecipe.addStonecutterRecipe("stonecutter_chiseled_basalt_brick", {
    ingredients: [
        { item: "block:rp_basalt" }
    ],
    result: {
        item: "block:basaltBrick",
        data: 1
    }
});
function genBasalt(random, x, y, z) {
    randY = 1 + random.nextFloat();
    randR = 7 + random.nextFloat() * 3;
    r = Math.ceil(randR);
    h = r / Math.sqrt(randY);
    for (var xx = -r; xx <= r; xx++) {
        for (var yy = -h; yy <= h; yy++) {
            for (var zz = -r; zz <= r; zz++) {
                if (Math.sqrt(xx * xx + yy * yy * randY + zz * zz) < randR + random.nextFloat() / 2) {
                    id = World.getBlockID(x + xx, y + yy, z + zz);
                    if (id == 1 || id == 3 || id == 13 || id == 16)
                        World.setBlock(x + xx, y + yy, z + zz, BlockID.rp_basalt);
                }
            }
        }
    }
}
var basaltChance = __config__.getNumber("world_gen.basalt");
World.addGenerationCallback("GenerateChunkUnderground", function (chunkX, chunkZ, random) {
    if (random.nextInt(100) < basaltChance) {
        var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 4, 12);
        genBasalt(random, coords.x, coords.y, coords.z);
    }
}, "rp-basalt");
Block.createSpecialType({
    base: 1,
    solid: true,
    destroytime: 1.5,
    explosionres: 30,
    lightopacity: 15,
    renderlayer: 2,
    translucency: 0,
    sound: "stone"
}, "stone");
IDRegistry.genBlockID("rp_marble");
Block.createBlock("rp_marble", [
    { name: "Marble", texture: [["rp_marble", 0]], inCreative: true },
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_marble, "stone", 1, true);
Block.setDestroyLevel("rp_marble", 1);
ToolLib.addBlockDropOnExplosion("rp_marble");
IDRegistry.genBlockID("marbleBrick");
Block.createBlock("marbleBrick", [
    { name: "Marble Brick", texture: [["rp_marble_brick", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.marbleBrick, "stone", 1, true);
Block.setDestroyLevel("marbleBrick", 1);
ToolLib.addBlockDropOnExplosion("marbleBrick");
VanillaRecipe.addCraftingRecipe("marble_brick", {
    type: "shaped",
    pattern: [
        "XX",
        "XX"
    ],
    key: {
        "X": { item: "block:rp_marble" }
    },
    result: {
        item: "block:marbleBrick",
        data: 0,
        count: 4
    }
}, true);
VanillaRecipe.addStonecutterRecipe("stonecutter_marble_brick", {
    ingredients: [
        { item: "block:rp_marble" }
    ],
    result: {
        item: "block:marbleBrick",
        data: 0
    }
}, true);
function genMarble(x, y, z, random) {
    GenerationUtils.generateOre(x, y, z, BlockID.rp_marble, 0, 72, false, random.nextInt());
    GenerationUtils.generateOre(x + random.nextInt(6), y, z + random.nextInt(6), BlockID.rp_marble, 0, 64, false, random.nextInt());
}
var marbleChance = __config__.getNumber("world_gen.marble");
World.addGenerationCallback("GenerateChunk", function (chunkX, chunkZ, random) {
    if (random.nextInt(100) < marbleChance) {
        var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 32, 96);
        if (World.getBlockID(coords.x, coords.y, coords.z) == 1) {
            genMarble(coords.x, coords.y, coords.z, random);
        }
    }
}, "rp-marble");
IDRegistry.genBlockID("basaltSlab");
IDRegistry.genBlockID("doubleBasaltSlab");
BaseBlocks.createSlab("basaltSlab", [
    { name: "Basalt Slab", texture: [["rp_basalt", 0]], inCreative: true },
    { name: "Basalt Cobble Slab", texture: [["rp_basalt_cobble", 0]], inCreative: true },
    { name: "Basalt Brick Slab", texture: [["rp_basalt_brick", 0]], inCreative: true }
], {
    base: 1,
    destroytime: 1.5,
    explosionres: 100,
    renderlayer: 2,
    translucency: 0
}, BlockID.doubleBasaltSlab);
ToolAPI.registerBlockMaterial(BlockID.basaltSlab, "stone", 1, true);
BaseBlocks.createDoubleSlab("doubleBasaltSlab", [
    { name: "Basalt Slab", texture: [["rp_basalt", 0]], inCreative: false },
    { name: "Basalt Cobble Slab", texture: [["rp_basalt_cobble", 0]], inCreative: false },
    { name: "Basalt Brick Slab", texture: [["rp_basalt_brick", 0]], inCreative: false },
], "basalt", BlockID.basaltSlab);
ToolAPI.registerBlockMaterial(BlockID.doubleBasaltSlab, "stone", 1, true);
Recipes.addShaped({ id: BlockID.basaltSlab, count: 6, data: 0 }, [
    "xxx"
], ['x', BlockID.rp_basalt, 0]);
Recipes.addShaped({ id: BlockID.basaltSlab, count: 6, data: 1 }, [
    "xxx"
], ['x', BlockID.basaltCobble, 0]);
Recipes.addShaped({ id: BlockID.basaltSlab, count: 6, data: 2 }, [
    "xxx"
], ['x', BlockID.basaltBrick, 0]);
VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_slab", {
    ingredients: [
        { item: "block:rp_basalt" }
    ],
    result: {
        item: "block:basaltSlab",
        data: 0,
        count: 2
    }
});
VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_cobble_slab", {
    ingredients: [
        { item: "block:basaltCobble" }
    ],
    result: {
        item: "block:basaltSlab",
        data: 1,
        count: 2
    }
});
VanillaRecipe.addStonecutterRecipe("stonecutter_basalt_brick_slab", {
    ingredients: [
        {
            item: "block:basaltBrick",
            data: 0
        }
    ],
    result: {
        item: "block:basaltSlab",
        data: 2,
        count: 2
    }
});
Block.createSpecialType({
    base: 1,
    destroytime: 1.5,
    explosionres: 30,
    renderlayer: 2,
    translucency: 0,
    sound: "stone"
}, "stone_slab");
IDRegistry.genBlockID("marbleSlab");
IDRegistry.genBlockID("doubleMarbleSlab");
BaseBlocks.createSlab("marbleSlab", [
    { name: "Marble Slab", texture: [["rp_marble", 0]], inCreative: true },
    { name: "Marble Brick Slab", texture: [["rp_marble_brick", 0]], inCreative: true },
], "stone_slab", BlockID.doubleMarbleSlab);
ToolAPI.registerBlockMaterial(BlockID.marbleSlab, "stone", 1, true);
BaseBlocks.createDoubleSlab("doubleMarbleSlab", [
    { name: "Marble Slab", texture: [["rp_marble", 0]], inCreative: false },
    { name: "Marble Brick Slab", texture: [["rp_marble_brick", 0]], inCreative: false },
], "stone", BlockID.marbleSlab);
ToolAPI.registerBlockMaterial(BlockID.doubleMarbleSlab, "stone", 1, true);
Item.addCreativeGroup("rpSlabs", Translation.translate("Slabs"), [
    BlockID.basaltSlab,
    BlockID.marbleSlab
]);
Recipes.addShaped({ id: BlockID.marbleSlab, count: 6, data: 0 }, [
    "xxx"
], ['x', BlockID.rp_marble, 0]);
Recipes.addShaped({ id: BlockID.marbleSlab, count: 6, data: 1 }, [
    "xxx"
], ['x', BlockID.marbleBrick, 0]);
VanillaRecipe.addStonecutterRecipe("stonecutter_marble_slab", {
    ingredients: [
        { item: "block:rp_marble" }
    ],
    result: {
        item: "block:marbleSlab",
        data: 0,
        count: 2
    }
});
VanillaRecipe.addStonecutterRecipe("stonecutter_marble_brick_slab", {
    ingredients: [
        {
            item: "block:marbleBrick",
            data: 0
        }
    ],
    result: {
        item: "block:marbleSlab",
        data: 1,
        count: 2
    }
});
Block.createSpecialType({
    base: 1,
    solid: true,
    destroytime: 3,
    explosionres: 15,
    lightopacity: 15,
    renderlayer: 2,
    translucency: 0,
    sound: "stone"
}, "ore");
IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
    { name: "Copper Ore", texture: [["ore_copper", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 2, true);
Block.setDestroyLevel("oreCopper", 2);
ToolLib.addBlockDropOnExplosion("oreCopper");
IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
    { name: "Tin Ore", texture: [["ore_tin", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 2, true);
Block.setDestroyLevel("oreTin", 2);
ToolLib.addBlockDropOnExplosion("oreTin");
IDRegistry.genBlockID("oreSilver");
Block.createBlock("oreSilver", [
    { name: "Silver Ore", texture: [["ore_silver", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreSilver, "stone", 3, true);
Block.setDestroyLevel("oreSilver", 3);
ToolLib.addBlockDropOnExplosion("oreSilver");
IDRegistry.genBlockID("oreTungsten");
Block.createBlock("oreTungsten", [
    { name: "Tungsten Ore", texture: [["ore_tungsten", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreTungsten, "stone", 3, true);
Block.setDestroyLevel("oreTungsten", 3);
ToolLib.addBlockDropOnExplosion("oreTungsten");
IDRegistry.genBlockID("oreNikolite");
Block.createBlock("oreNikolite", [
    { name: "Nikolite Ore", texture: [["ore_nikolite", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreNikolite, "stone", 3, true);
Block.registerDropFunction("oreNikolite", function (coords, blockID, blockData, level, enchant) {
    if (level > 2) {
        if (enchant.silk) {
            return [[blockID, 1, 0]];
        }
        ToolAPI.dropOreExp(coords, 2, 5, enchant.experience);
        var drop = [];
        var count = randomInt(4, 5) + randomInt(0, enchant.fortune);
        for (var i = 0; i < count; i++) {
            drop.push([ItemID.nikolite, 1, 0]);
        }
        return drop;
    }
    return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreNikolite");
IDRegistry.genBlockID("oreRuby");
Block.createBlock("oreRuby", [
    { name: "Ruby Ore", texture: [["ore_ruby", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreRuby, "stone", 3, true);
Block.registerDropFunction("oreRuby", function (coords, blockID, blockData, level, enchant) {
    if (level > 2) {
        if (enchant.silk) {
            return [[blockID, 1, 0]];
        }
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        var drop = [];
        var count = randomInt(1, 3);
        for (var i = 0; i < count; i++) {
            drop.push([ItemID.gemRuby, 1, 0]);
        }
        return ToolAPI.fortuneDropModifier(drop, enchant.fortune);
    }
    return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreRuby");
IDRegistry.genBlockID("oreSapphire");
Block.createBlock("oreSapphire", [
    { name: "Sapphire Ore", texture: [["ore_sapphire", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreSapphire, "stone", 3, true);
Block.registerDropFunction("oreSapphire", function (coords, blockID, blockData, level, enchant) {
    if (level > 2) {
        if (enchant.silk) {
            return [[blockID, 1, 0]];
        }
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        var drop = [];
        var count = randomInt(1, 3);
        for (var i = 0; i < count; i++) {
            drop.push([ItemID.gemSapphire, 1, 0]);
        }
        return ToolAPI.fortuneDropModifier(drop, enchant.fortune);
    }
    return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreSapphire");
IDRegistry.genBlockID("oreGreenSapphire");
Block.createBlock("oreGreenSapphire", [
    { name: "Sapphire Ore", texture: [["ore_green_sapphire", 0]], inCreative: true }
], "ore");
ToolAPI.registerBlockMaterial(BlockID.oreGreenSapphire, "stone", 3, true);
Block.registerDropFunction("oreGreenSapphire", function (coords, blockID, blockData, level, enchant) {
    if (level > 2) {
        if (enchant.silk) {
            return [[blockID, 1, 0]];
        }
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        var drop = [];
        var count = randomInt(1, 3);
        for (var i = 0; i < count; i++) {
            drop.push([ItemID.gemGreenSapphire, 1, 0]);
        }
        return ToolAPI.fortuneDropModifier(drop, enchant.fortune);
    }
    return [];
}, 3);
ToolLib.addBlockDropOnExplosion("oreGreenSapphire");
Item.addCreativeGroup("ores", Translation.translate("Ores"), [
    BlockID.oreCopper,
    BlockID.oreTin,
    BlockID.oreSilver,
    BlockID.oreTungsten,
    BlockID.oreNikolite,
    BlockID.oreRuby,
    BlockID.oreSapphire,
    BlockID.oreGreenSapphire
]);
var OreGeneration = {
    config: {
        oreGenCopper: __config__.getBool("ore_gen.copper"),
        oreGenTin: __config__.getBool("ore_gen.tin"),
        oreGenSilver: __config__.getBool("ore_gen.silver"),
        oreGenTungsten: __config__.getBool("ore_gen.tungsten"),
        oreGenNikolite: __config__.getBool("ore_gen.nikolite"),
        oreGenRuby: __config__.getBool("ore_gen.gems"),
        oreGenSapphire: __config__.getBool("ore_gen.gems"),
        oreGenGreenSapphire: __config__.getBool("ore_gen.gems")
    },
    randomCoords: function (random, chunkX, chunkZ, minHeight, maxHeight) {
        minHeight = minHeight || 0;
        maxHeight = maxHeight || 128;
        var x = chunkX * 16 + random.nextInt(16);
        var z = chunkZ * 16 + random.nextInt(16);
        var y = random.nextInt(maxHeight - minHeight + 1) + minHeight;
        return Vector(x, y, z);
    }
};
Callback.addCallback("PostLoaded", function () {
    for (var flag in OreGeneration.config) {
        if (OreGeneration.config[flag]) {
            OreGeneration.config[flag] = !Flags.addFlag(flag);
        }
    }
});
Callback.addCallback("GenerateChunk", function (chunkX, chunkZ, random) {
    if (OreGeneration.config.oreGenCopper) {
        for (var i = 0; i < 12; i++) {
            var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 10, 70);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreCopper, 0, 10, false, random.nextInt());
        }
    }
    if (OreGeneration.config.oreGenTin) {
        for (var i = 0; i < 10; i++) {
            var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 1, 64);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTin, 0, 9, false, random.nextInt());
        }
    }
    if (OreGeneration.config.oreGenSilver) {
        for (var i = 0; i < 4; i++) {
            var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 1, 32);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSilver, 0, 9, false, random.nextInt());
        }
    }
    if (OreGeneration.config.oreGenTungsten) {
        var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 1, 16);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTungsten, 0, 5, false, random.nextInt());
    }
    if (OreGeneration.config.oreGenNikolite) {
        for (var i = 0; i < 8; i++) {
            var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 1, 20);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreNikolite, 0, 8, false, random.nextInt());
        }
    }
    if (OreGeneration.config.oreGenRuby) {
        for (var i = 0; i < 6; i++) {
            var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 1, 48);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreRuby, 0, 6, false, random.nextInt());
        }
    }
    if (OreGeneration.config.oreGenSapphire) {
        for (var i = 0; i < 6; i++) {
            var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 1, 48);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSapphire, 0, 6, false, random.nextInt());
        }
    }
    if (OreGeneration.config.oreGenGreenSapphire) {
        for (var i = 0; i < 6; i++) {
            var coords = OreGeneration.randomCoords(random, chunkX, chunkZ, 1, 48);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreGreenSapphire, 0, 6, false, random.nextInt());
        }
    }
});
IDRegistry.genBlockID("blockCopper");
Block.createBlock("blockCopper", [
    { name: "Copper Block", texture: [["block_copper", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockCopper, "stone", 2, true);
Block.setDestroyLevel("blockCopper", 2);
Block.setDestroyTime(BlockID.blockCopper, 5);
ToolLib.addBlockDropOnExplosion("blockCopper");
IDRegistry.genBlockID("blockTin");
Block.createBlock("blockTin", [
    { name: "Tin Block", texture: [["block_tin", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockTin, "stone", 2, true);
Block.setDestroyLevel("blockTin", 2);
Block.setDestroyTime(BlockID.blockTin, 5);
ToolLib.addBlockDropOnExplosion("blockTin");
IDRegistry.genBlockID("blockSilver");
Block.createBlock("blockSilver", [
    { name: "Silver Block", texture: [["block_silver", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockSilver, "stone", 3, true);
Block.setDestroyLevel("blockSilver", 3);
Block.setDestroyTime(BlockID.blockSilver, 5);
ToolLib.addBlockDropOnExplosion("blockSilver");
IDRegistry.genBlockID("blockNikolite");
Block.createBlock("blockNikolite", [
    { name: "Nikolite Block", texture: [["block_nikolite", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockNikolite, "stone", 3, true);
Block.setDestroyLevel("blockNikolite", 3);
Block.setDestroyTime(BlockID.blockNikolite, 5);
ToolLib.addBlockDropOnExplosion("blockNikolite");
IDRegistry.genBlockID("blockRuby");
Block.createBlock("blockRuby", [
    { name: "Ruby Block", texture: [["block_ruby", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockRuby, "stone", 3, true);
Block.setDestroyLevel("blockRuby", 3);
Block.setDestroyTime(BlockID.blockRuby, 5);
ToolLib.addBlockDropOnExplosion("blockRuby");
IDRegistry.genBlockID("blockSapphire");
Block.createBlock("blockSapphire", [
    { name: "Sapphire Block", texture: [["block_sapphire", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockSapphire, "stone", 3, true);
Block.setDestroyLevel("blockSapphire", 3);
Block.setDestroyTime(BlockID.blockSapphire, 5);
ToolLib.addBlockDropOnExplosion("blockSapphire");
IDRegistry.genBlockID("blockGreenSapphire");
Block.createBlock("blockGreenSapphire", [
    { name: "Green Sapphire Block", texture: [["block_green_sapphire", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.blockGreenSapphire, "stone", 3, true);
Block.setDestroyLevel("blockGreenSapphire", 3);
Block.setDestroyTime(BlockID.blockGreenSapphire, 5);
ToolLib.addBlockDropOnExplosion("blockGreenSapphire");
Item.addCreativeGroup("blockResource", Translation.translate("Mineral Blocks"), [
    BlockID.blockCopper,
    BlockID.blockTin,
    BlockID.blockSilver,
    BlockID.blockTungsten,
    BlockID.blockNikolite,
    BlockID.blockRuby,
    BlockID.blockSapphire,
    BlockID.blockGreenSapphire
]);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.blockCopper, count: 1, data: 0 }, [
        "xxx",
        "xxx",
        "xxx"
    ], ['x', ItemID.ingotCopper, 0]);
    Recipes.addShaped({ id: BlockID.blockTin, count: 1, data: 0 }, [
        "xxx",
        "xxx",
        "xxx"
    ], ['x', ItemID.ingotTin, 0]);
    Recipes.addShaped({ id: BlockID.blockSilver, count: 1, data: 0 }, [
        "xxx",
        "xxx",
        "xxx"
    ], ['x', ItemID.ingotSilver, 0]);
    Recipes.addShaped({ id: BlockID.blockNikolite, count: 1, data: 0 }, [
        "xxx",
        "xxx",
        "xxx"
    ], ['x', ItemID.nikolite, 0]);
    Recipes.addShaped({ id: BlockID.blockSapphire, count: 1, data: 0 }, [
        "xxx",
        "xxx",
        "xxx"
    ], ['x', ItemID.gemSapphire, 0]);
    Recipes.addShaped({ id: BlockID.blockGreenSapphire, count: 1, data: 0 }, [
        "xxx",
        "xxx",
        "xxx"
    ], ['x', ItemID.gemGreenSapphire, 0]);
    Recipes.addShaped({ id: BlockID.blockRuby, count: 1, data: 0 }, [
        "xxx",
        "xxx",
        "xxx"
    ], ['x', ItemID.gemRuby, 0]);
    VanillaRecipe.addCraftingRecipe("ingot_copper", {
        type: "shapeless",
        ingredients: [
            { item: "block:blockCopper" }
        ],
        result: {
            item: "item:ingotCopper",
            count: 9
        }
    }, true);
    VanillaRecipe.addCraftingRecipe("ingot_tin", {
        type: "shapeless",
        ingredients: [
            { item: "block:blockTin" }
        ],
        result: {
            item: "item:ingotTin",
            count: 9
        }
    }, true);
    /*VanillaRecipe.addCraftingRecipe("ingot_bronze", {
      type: "shapeless",
      ingredients: [
        { item: "block:blockBronze" }
      ],
      result: {
        item: "item:ingotBronze",
        count: 9
      }
    }, true);*/
    VanillaRecipe.addCraftingRecipe("ingot_silver", {
        type: "shapeless",
        ingredients: [
            { item: "block:blockSilver" }
        ],
        result: {
            item: "item:ingotSilver",
            count: 9
        }
    }, true);
    VanillaRecipe.addCraftingRecipe("nikolite", {
        type: "shapeless",
        ingredients: [
            { item: "block:blockNikolite" }
        ],
        result: {
            item: "item:nikolite",
            count: 9
        }
    }, true);
    VanillaRecipe.addCraftingRecipe("gem_ruby", {
        type: "shapeless",
        ingredients: [
            { item: "block:blockRuby" }
        ],
        result: {
            item: "item:gemRuby",
            count: 9
        }
    }, true);
    VanillaRecipe.addCraftingRecipe("gem_sapphire", {
        type: "shapeless",
        ingredients: [
            { item: "block:blockSapphire" }
        ],
        result: {
            item: "item:gemSapphire",
            count: 9
        }
    }, true);
    VanillaRecipe.addCraftingRecipe("gem_green_sapphire", {
        type: "shapeless",
        ingredients: [
            { item: "block:blockGreenSapphire" }
        ],
        result: {
            item: "item:gemGreenSapphire",
            count: 9
        }
    }, true);
});
IDRegistry.genBlockID("rp_lamp");
Block.createBlock("rp_lamp", [
    { name: "White Lamp", texture: [["rp_lamp", 0]], inCreative: true },
    { name: "Orange Lamp", texture: [["rp_lamp", 1]], inCreative: true },
    { name: "Magenta Lamp", texture: [["rp_lamp", 2]], inCreative: true },
    { name: "Light Blue Lamp", texture: [["rp_lamp", 3]], inCreative: true },
    { name: "Yellow Lamp", texture: [["rp_lamp", 4]], inCreative: true },
    { name: "Lime Lamp", texture: [["rp_lamp", 5]], inCreative: true },
    { name: "Pink Lamp", texture: [["rp_lamp", 6]], inCreative: true },
    { name: "Gray Lamp", texture: [["rp_lamp", 7]], inCreative: true },
    { name: "Light Gray Lamp", texture: [["rp_lamp", 8]], inCreative: true },
    { name: "Cyan Lamp", texture: [["rp_lamp", 9]], inCreative: true },
    { name: "Purple Lamp", texture: [["rp_lamp", 10]], inCreative: true },
    { name: "Blue Lamp", texture: [["rp_lamp", 11]], inCreative: true },
    { name: "Brown Lamp", texture: [["rp_lamp", 12]], inCreative: true },
    { name: "Green Lamp", texture: [["rp_lamp", 13]], inCreative: true },
    { name: "Red Lamp", texture: [["rp_lamp", 14]], inCreative: true },
    { name: "Black Lamp", texture: [["rp_lamp", 15]], inCreative: true }
], "opaque");
Block.setDestroyTime(BlockID.rp_lamp, 2);
IDRegistry.genBlockID("rp_lamp_inverted");
Block.createBlock("rp_lamp_inverted", [
    { name: "White Inverted Lamp", texture: [["rp_lamp_on", 0]], inCreative: true },
    { name: "Orange Inverted Lamp", texture: [["rp_lamp_on", 1]], inCreative: true },
    { name: "Magenta Inverted Lamp", texture: [["rp_lamp_on", 2]], inCreative: true },
    { name: "Light Blue Inverted Lamp", texture: [["rp_lamp_on", 3]], inCreative: true },
    { name: "Yellow Inverted Lamp", texture: [["rp_lamp_on", 4]], inCreative: true },
    { name: "Lime Inverted Lamp", texture: [["rp_lamp_on", 5]], inCreative: true },
    { name: "Pink Inverted Lamp", texture: [["rp_lamp_on", 6]], inCreative: true },
    { name: "Gray Inverted Lamp", texture: [["rp_lamp_on", 7]], inCreative: true },
    { name: "Light Gray Inverted Lamp", texture: [["rp_lamp_on", 8]], inCreative: true },
    { name: "Cyan Inverted Lamp", texture: [["rp_lamp_on", 9]], inCreative: true },
    { name: "Purple Inverted Lamp", texture: [["rp_lamp_on", 10]], inCreative: true },
    { name: "Blue Inverted Lamp", texture: [["rp_lamp_on", 11]], inCreative: true },
    { name: "Brown Inverted Lamp", texture: [["rp_lamp_on", 12]], inCreative: true },
    { name: "Green Inverted Lamp", texture: [["rp_lamp_on", 13]], inCreative: true },
    { name: "Red Inverted Lamp", texture: [["rp_lamp_on", 14]], inCreative: true },
    { name: "Black Inverted Lamp", texture: [["rp_lamp_on", 15]], inCreative: true }
], {
    solid: true,
    destroytime: 2,
    explosionres: 5,
    lightlevel: 15,
    renderlayer: 2
});
Item.addCreativeGroup("rp_lamp", Translation.translate("Lamps"), [
    BlockID.rp_lamp,
]);
Item.addCreativeGroup("rp_lamp_inverted", Translation.translate("Inverted Lamps"), [
    BlockID.rp_lamp_inverted,
]);
Block.registerDropFunction("rp_lamp", function (coords, blockID, blockData, level) {
    return [];
});
Block.registerDropFunction("rp_lamp_inverted", function (coords, blockID, blockData, level) {
    return [];
});
Callback.addCallback("PreLoaded", function () {
    for (var i = 0; i < 16; i++) {
        Recipes.addShaped({ id: BlockID.rp_lamp, count: 1, data: i }, [
            "gxg",
            "gxg",
            "grg",
        ], ['x', ItemID.lumar, i, 'g', 102, -1, 'r', 331, 0]);
        Recipes.addShaped({ id: BlockID.rp_lamp_inverted, count: 1, data: i }, [
            "gxg",
            "gxg",
            "grg",
        ], ['x', ItemID.lumar, i, 'g', 102, -1, 'r', 76, 0]);
    }
});
var TileEntityLamp = /** @class */ (function () {
    function TileEntityLamp(isInverted) {
        this.defaultValues = {
            inverted: isInverted
        };
    }
    TileEntityLamp.prototype.getBlockID = function (isActive) {
        return isActive ? BlockID.rp_lamp_inverted : BlockID.rp_lamp;
    };
    TileEntityLamp.prototype.redstone = function (signal) {
        var region = this.blockSource;
        var active = (!this.data.inverted == signal.power > 0);
        var blockID = this.getBlockID(active);
        if (this.blockID != blockID) {
            this.selfDestroy();
            var blockData = region.getBlockData(this.x, this.y, this.z);
            region.setBlock(this.x, this.y, this.z, blockID, blockData);
            var tile = World.addTileEntity(this.x, this.y, this.z, region);
            tile.data.inverted = this.data.inverted;
        }
    };
    TileEntityLamp.prototype.destroyBlock = function (coords, player) {
        var blockID = this.getBlockID(this.data.inverted);
        var blockData = this.blockSource.getBlockData(coords.x, coords.y, coords.z);
        this.blockSource.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, blockID, 1, blockData);
    };
    return TileEntityLamp;
}());
TileEntity.registerPrototype(BlockID.rp_lamp, new TileEntityLamp(false));
TileEntity.registerPrototype(BlockID.rp_lamp_inverted, new TileEntityLamp(true));
Block.createSpecialType({
    destroytime: 0.05,
    explosionres: 0.5,
    renderlayer: 3,
}, "cable");
IDRegistry.genBlockID("blueWire");
Block.createBlock("blueWire", [
    { name: "Blue Alloy Wire", texture: [["blue_wire", 0]], inCreative: true }
], "cable");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.blueWire, count: 12, data: 0 }, [
        "aaa",
        "xxx",
        "aaa"
    ], ['x', ItemID.ingotBlue, 0, 'a', 35, -1]);
    Recipes.addShaped({ id: BlockID.blueWire, count: 12, data: 0 }, [
        "axa",
        "axa",
        "axa"
    ], ['x', ItemID.ingotBlue, 0, 'a', 35, -1]);
});
BT.registerWire(BlockID.blueWire, 100);
TileRenderer.setupWireModel(BlockID.blueWire, 0, 1 / 4, "bt-wire");
var MachineBase = /** @class */ (function (_super) {
    __extends(MachineBase, _super);
    function MachineBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MachineBase.prototype.getFacing = function () {
        return this.region.getBlockData(this);
    };
    MachineBase.prototype.setActive = function (isActive) {
        if (this.networkData.getBoolean("isActive") !== isActive) {
            this.networkData.putBoolean("isActive", isActive);
            this.networkData.sendChanges();
        }
    };
    MachineBase.prototype.onInit = function () {
        this.networkData.putInt("blockId", this.blockID);
        this.networkData.putInt("blockData", this.getFacing());
        this.networkData.sendChanges();
    };
    MachineBase.prototype.clientLoad = function () {
        var _this = this;
        this.renderModel();
        this.networkData.addOnDataChangedListener(function (data, isExternal) {
            _this.renderModel();
        });
    };
    MachineBase.prototype.clientUnload = function () {
        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
    };
    MachineBase.prototype.renderModel = function () {
        if (this.networkData.getBoolean("isActive")) {
            var blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
            var blockData = this.networkData.getInt("blockData");
            TileRenderer.mapAtCoords(this.x, this.y, this.z, blockId, blockData);
        }
        else {
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
        }
    };
    __decorate([
        BlockEngine.Decorators.ClientSide
    ], MachineBase.prototype, "renderModel", null);
    return MachineBase;
}(TileEntityBase));
/// <reference path="./core/MachineBase.ts" />
IDRegistry.genBlockID("rp_smelter");
Block.createBlock("rp_smelter", [
    { name: "Smelter", texture: [["rp_smelter", 0], ["rp_smelter", 0], ["rp_smelter_side", 0], ["rp_smelter_front", 0], ["rp_smelter_side", 0], ["rp_smelter_side", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_smelter, "stone", 1);
Block.setDestroyLevel(BlockID.rp_smelter, 1);
TileRenderer.setStandardModelWithRotation(BlockID.rp_smelter, 2, [["rp_smelter", 0], ["rp_smelter", 0], ["rp_smelter_side", 0], ["rp_smelter_front", 0], ["rp_smelter_side", 0], ["rp_smelter_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.rp_smelter, 2, [["rp_smelter", 0], ["rp_smelter", 0], ["rp_smelter_side", 0], ["rp_smelter_front", 1], ["rp_smelter_side", 0], ["rp_smelter_side", 0]]);
TileRenderer.setRotationFunction(BlockID.rp_smelter);
Recipes.addShaped({ id: BlockID.rp_smelter, count: 1, data: 0 }, [
    "xxx",
    "x x",
    "xxx"
], ['x', 45, -1]);
Callback.addCallback("PreLoaded", function () {
    // rp items
    SmelterRecipes.addRecipe({ id: ItemID.ingotRed, count: 1 }, [{ id: 265, count: 1 }, { id: 331, count: 4 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotRed, count: 1 }, [{ id: ItemID.ingotCopper, count: 1 }, { id: 331, count: 4 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBlue, count: 1 }, [{ id: ItemID.ingotSilver, count: 1 }, { id: ItemID.nikolite, count: 4 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 4 }, [{ id: ItemID.ingotTin, count: 1 }, { id: ItemID.ingotCopper, count: 3 }]);
    SmelterRecipes.addRecipe({ id: ItemID.siliconBoule, count: 1 }, [{ id: 12, count: 8 }, { id: 263, count: 8 }]);
    SmelterRecipes.addRecipe({ id: ItemID.waferRed, count: 1 }, [{ id: ItemID.waferSilicon, count: 1 }, { id: 331, count: 4 }]);
    SmelterRecipes.addRecipe({ id: ItemID.waferBlue, count: 1 }, [{ id: ItemID.waferSilicon, count: 1 }, { id: ItemID.nikolite, count: 4 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotCopper, count: 1 }, [{ id: ItemID.fineCopperWire, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 1 }, [{ id: ItemID.fineIronWire, count: 1 }]);
    // iron tools
    SmelterRecipes.addRecipe({ id: 265, count: 1 }, [{ id: 256, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 3 }, [{ id: 257, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 3 }, [{ id: 258, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 2 }, [{ id: 267, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 2 }, [{ id: 292, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 2 }, [{ id: 359, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 3 }, [{ id: ItemID.sickleIron, count: 1 }]);
    // golden tools
    SmelterRecipes.addRecipe({ id: 266, count: 2 }, [{ id: 283, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 1 }, [{ id: 284, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 3 }, [{ id: 285, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 3 }, [{ id: 286, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 2 }, [{ id: 294, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 3 }, [{ id: ItemID.sickleGold, count: 1 }]);
    // iron armor
    SmelterRecipes.addRecipe({ id: 265, count: 5 }, [{ id: 306, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 8 }, [{ id: 307, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 7 }, [{ id: 308, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 265, count: 4 }, [{ id: 309, count: 1 }]);
    // golden armor
    SmelterRecipes.addRecipe({ id: 266, count: 5 }, [{ id: 314, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 8 }, [{ id: 315, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 7 }, [{ id: 316, count: 1 }]);
    SmelterRecipes.addRecipe({ id: 266, count: 4 }, [{ id: 317, count: 1 }]);
    // other
    SmelterRecipes.addRecipe({ id: 265, count: 3 }, [{ id: 66, count: 8 }]); // rail
    SmelterRecipes.addRecipe({ id: 265, count: 3 }, [{ id: 101, count: 8 }]); // iron bars
    SmelterRecipes.addRecipe({ id: 265, count: 31 }, [{ id: 145, count: 1 }]); // anvil
    SmelterRecipes.addRecipe({ id: 265, count: 4 }, [{ id: 167, count: 1 }]); // iron trapdoor
    SmelterRecipes.addRecipe({ id: 265, count: 3 }, [{ id: 325, count: 1 }]); // bucket
    SmelterRecipes.addRecipe({ id: 265, count: 5 }, [{ id: 328, count: 1 }]); // minecart
    SmelterRecipes.addRecipe({ id: 265, count: 2 }, [{ id: 330, count: 1 }]); // iron door
    SmelterRecipes.addRecipe({ id: 265, count: 7 }, [{ id: 380, count: 1 }]); // cauldron
});
// mod compatibility
ModAPI.addAPICallback("ICore", function (api) {
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 2 }, [{ id: ItemID.bronzeSword, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 1 }, [{ id: ItemID.bronzeShovel, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 3 }, [{ id: ItemID.bronzePickaxe, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 3 }, [{ id: ItemID.bronzeAxe, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 2 }, [{ id: ItemID.bronzeHoe, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 6 }, [{ id: ItemID.wrenchBronze, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 5 }, [{ id: ItemID.bronzeHelmet, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 8 }, [{ id: ItemID.bronzeChestplate, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 7 }, [{ id: ItemID.bronzeLeggings, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotBronze, count: 4 }, [{ id: ItemID.bronzeBoots, count: 1 }]);
    SmelterRecipes.addRecipe({ id: ItemID.ingotTin, count: 2 }, [{ id: ItemID.cellEmpty, count: 1 }]);
});
var guiSmelter = new UI.StandartWindow({
    standard: {
        header: { text: { text: Translation.translate("Smelter") } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [
        { type: "bitmap", x: 636, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE },
        { type: "bitmap", x: 419, y: 150, bitmap: "fire_background", scale: GUI_SCALE }
    ],
    elements: {
        "progressScale": { type: "scale", x: 636, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE },
        "burningScale": { type: "scale", x: 419, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_SCALE },
        "slotSource1": { type: "slot", x: 502, y: 112 },
        "slotSource2": { type: "slot", x: 562, y: 112 },
        "slotSource3": { type: "slot", x: 502, y: 172 },
        "slotSource4": { type: "slot", x: 562, y: 172 },
        "slotFuel": { type: "slot", x: 410, y: 200 },
        "slotResult": { type: "slot", x: 720, y: 142 },
    }
});
Callback.addCallback("LevelLoaded", function () {
    MachineRegistry.updateGuiHeader(guiSmelter, "Smelter");
});
var Smelter = /** @class */ (function (_super) {
    __extends(Smelter, _super);
    function Smelter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            progress: 0,
            burn: 0,
            burnMax: 0
        };
        return _this;
    }
    Smelter.prototype.getScreenByName = function () {
        return guiSmelter;
    };
    Smelter.prototype.onInit = function () {
        StorageInterface.setSlotValidatePolicy(this.container, "slotFuel", function (name, id, amount, data) {
            return Recipes.getFuelBurnDuration(id, data) > 0;
        });
        this.container.setSlotAddTransferPolicy("slotResult", function () {
            return 0;
        });
    };
    Smelter.prototype.onTick = function () {
        StorageInterface.checkHoppers(this);
        var sourceItems = {};
        for (var i = 1; i <= 4; i++) {
            var slot = this.container.getSlot("slotSource" + i);
            if (slot.id > 0 && slot.data == 0) {
                sourceItems[slot.id] = sourceItems[slot.id] || 0;
                sourceItems[slot.id] += slot.count;
            }
        }
        if (this.data.burn > 0) {
            this.data.burn--;
        }
        var recipe = SmelterRecipes.getRecipe(sourceItems);
        if (recipe) {
            var resultSlot = this.container.getSlot("slotResult");
            if (resultSlot.id == recipe.result.id && resultSlot.count + recipe.result.count <= 64 || resultSlot.id == 0) {
                if (this.data.burn == 0) {
                    this.data.burn = this.data.burnMax = this.getFuel("slotFuel");
                }
                if (this.data.burn > 0 && this.data.progress++ >= 200) {
                    SmelterRecipes.performRecipe(recipe, this.container);
                    this.data.progress = 0;
                }
            }
        }
        if (!recipe || this.data.burn == 0) {
            this.data.progress = 0;
        }
        this.setActive(this.data.burn > 0);
        this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
        this.container.setScale("progressScale", this.data.progress / 200);
        this.container.sendChanges();
    };
    Smelter.prototype.getFuel = function (slotName) {
        var fuelSlot = this.container.getSlot(slotName);
        if (fuelSlot.id > 0) {
            var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
            if (burn) {
                if (LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
                    var empty = LiquidRegistry.getEmptyItem(fuelSlot.id, fuelSlot.data);
                    fuelSlot.id = empty.id;
                    fuelSlot.data = empty.data;
                    return burn;
                }
                fuelSlot.count--;
                this.container.validateSlot(slotName);
                return burn;
            }
        }
        return 0;
    };
    return Smelter;
}(MachineBase));
MachineRegistry.registerPrototype(BlockID.rp_smelter, new Smelter());
StorageInterface.createInterface(BlockID.rp_smelter, {
    slots: {
        "slotFuel": { input: true, side: "horizontal" },
        "slotSource1": { input: true, side: "up" },
        "slotSource2": { input: true, side: "up" },
        "slotSource3": { input: true, side: "up" },
        "slotSource4": { input: true, side: "up" },
        "slotResult": { output: true }
    }
});
/// <reference path="./MachineBase.ts" />
var BlulectricMachine = /** @class */ (function (_super) {
    __extends(BlulectricMachine, _super);
    function BlulectricMachine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0
        };
        return _this;
    }
    BlulectricMachine.prototype.getEnergyStorage = function () {
        return 0;
    };
    BlulectricMachine.prototype.isConductor = function (type) {
        return false;
    };
    BlulectricMachine.prototype.canReceiveEnergy = function (side, type) {
        return true;
    };
    BlulectricMachine.prototype.canExtractEnergy = function (side, type) {
        return true;
    };
    BlulectricMachine.prototype.energyReceive = function (type, amount, voltage) {
        var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
        this.data.energy += add;
        return add;
    };
    BlulectricMachine.prototype.energyTick = function (type, src) { };
    BlulectricMachine.prototype.chargeSlot = function (slotName) {
        this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot(slotName), "Eu", this.data.energy, 0);
    };
    BlulectricMachine.prototype.dischargeSlot = function (slotName) {
        var amount = this.getEnergyStorage() - this.data.energy;
        this.data.energy += ChargeItemRegistry.getEnergyFromSlot(this.container.getSlot(slotName), "Eu", amount, 0);
    };
    return BlulectricMachine;
}(MachineBase));
/// <reference path="../core/BlulectricMachine.ts" />
IDRegistry.genBlockID("rp_solar");
Block.createBlock("rp_solar", [
    { name: "Solar Panel", texture: [["rp_machine_bottom", 0], ["rp_solar", 0], ["rp_solar", 1], ["rp_solar", 1], ["rp_solar", 1], ["rp_solar", 1]], inCreative: true }
], "stone_slab");
ToolAPI.registerBlockMaterial(BlockID.rp_solar, "stone", 1);
Block.setDestroyLevel("rp_solar", 1);
Block.setBlockShape(BlockID.rp_solar, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.25, z: 1 }, 0);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.rp_solar, count: 1, data: 0 }, [
        "ooo",
        "oxo",
        "ooo"
    ], ['x', ItemID.ingotBlue, 0, 'o', ItemID.waferBlue, 0]);
});
var SolarPanel = /** @class */ (function (_super) {
    __extends(SolarPanel, _super);
    function SolarPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0,
            canSeeSky: false
        };
        return _this;
    }
    SolarPanel.prototype.canReceiveEnergy = function () {
        return false;
    };
    SolarPanel.prototype.onInit = function () {
        this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
    };
    SolarPanel.prototype.energyTick = function (type, src) {
        if (World.getThreadTime() % 100 == 0) {
            this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
        }
        if (this.data.canSeeSky && this.region.getLightLevel(this.x, this.y + 1, this.z) == 15) {
            src.add(2);
        }
    };
    SolarPanel.prototype.onItemUse = function () {
        return true;
    };
    return SolarPanel;
}(BlulectricMachine));
MachineRegistry.registerMachine(BlockID.rp_solar, new SolarPanel());
/// <reference path="../core/BlulectricMachine.ts" />
IDRegistry.genBlockID("rp_thermopile");
Block.createBlockWithRotation("rp_thermopile", [
    { name: "Thermopile", texture: [["rp_thermopile", 0], ["rp_thermopile", 0], ["rp_thermopile_side", 0], ["rp_thermopile_side", 1], ["rp_thermopile_side", 0], ["rp_thermopile_side", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_thermopile, "stone", 1);
Block.setDestroyLevel("rp_thermopile", 1);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.rp_thermopile, count: 1, data: 0 }, [
        "cac",
        "oxo",
        "cac"
    ], ['x', ItemID.ingotBlue, 0, 'o', ItemID.waferBlue, 0, 'a', 265, 0, 'c', ItemID.ingotCopper, 0]);
});
var blockHeatValues = { 0: -0.25, 8: -1.5, 9: -1.5, 10: 2, 11: 2, 79: -2, 174: -2 };
var Thermopile = /** @class */ (function (_super) {
    __extends(Thermopile, _super);
    function Thermopile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0,
            output: 0
        };
        return _this;
    }
    Thermopile.prototype.onInit = function () { };
    Thermopile.prototype.canReceiveEnergy = function () {
        return false;
    };
    Thermopile.prototype.getHeatValue = function (id) {
        return blockHeatValues[id] || 0;
    };
    Thermopile.prototype.calculateHeat = function (x, y, z) {
        var heat = this.getHeatValue(this.region.getBlockId(x, y, z));
        if (heat < 0)
            this.cold -= heat;
        else
            this.heat += heat;
    };
    Thermopile.prototype.energyTick = function (type, src) {
        if (World.getThreadTime() % 20 == 0) {
            this.cold = 0;
            this.heat = 0;
            this.calculateHeat(this.x - 1, this.y, this.z);
            this.calculateHeat(this.x + 1, this.y, this.z);
            this.calculateHeat(this.x, this.y, this.z - 1);
            this.calculateHeat(this.x, this.y, this.z + 1);
            this.data.output = Math.min(this.cold, this.heat) / 4;
            //Debug.m(this.data.output);
        }
        src.add(this.data.output);
    };
    Thermopile.prototype.onItemUse = function () {
        return true;
    };
    return Thermopile;
}(BlulectricMachine));
MachineRegistry.registerMachine(BlockID.rp_thermopile, new Thermopile());
/// <reference path="./BlulectricMachine.ts" />
var ProcessingMachine = /** @class */ (function (_super) {
    __extends(ProcessingMachine, _super);
    function ProcessingMachine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0,
            progress: 0
        };
        return _this;
    }
    ProcessingMachine.prototype.canExtractEnergy = function () {
        return false;
    };
    ProcessingMachine.prototype.getEnergyStorage = function () {
        return 2000;
    };
    ProcessingMachine.prototype.onInit = function () {
        this.container.setSlotAddTransferPolicy("slotResult", function () {
            return 0;
        });
    };
    ProcessingMachine.prototype.onTick = function () {
        StorageInterface.checkHoppers(this);
        this.dischargeSlot("slotEnergy");
    };
    return ProcessingMachine;
}(BlulectricMachine));
/// <reference path="../core/ProcessingMachine.ts" />
IDRegistry.genBlockID("bt_furnace");
Block.createBlock("bt_furnace", [
    { name: "Blulectric Furnace", texture: [["rp_machine_bottom", 0], ["bt_furnace_top", 0], ["bt_furnace_side", 0], ["bt_furnace_front", 0], ["bt_furnace_side", 0], ["bt_furnace_side", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.bt_furnace, "stone", 1);
Block.setDestroyLevel(BlockID.bt_furnace, 1);
TileRenderer.setStandardModelWithRotation(BlockID.bt_furnace, 2, [["rp_machine_bottom", 0], ["bt_furnace_top", 0], ["bt_furnace_side", 0], ["bt_furnace_front", 0], ["bt_furnace_side", 0], ["bt_furnace_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.bt_furnace, 2, [["rp_machine_bottom", 0], ["bt_furnace_top", 0], ["bt_furnace_side", 0], ["bt_furnace_front", 1], ["bt_furnace_side", 0], ["bt_furnace_side", 0]]);
TileRenderer.setRotationFunction(BlockID.bt_furnace);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.bt_furnace, count: 1, data: 0 }, [
        "xxx",
        "x x",
        "aba"
    ], ['x', 24, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0]);
});
var guiBTFurnace = new UI.StandartWindow({
    standard: {
        header: { text: { text: Translation.translate("Blulectric Furnace") } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [
        { type: "bitmap", x: 625, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE },
        { type: "bitmap", x: 425, y: 92, bitmap: "btstorage_small_background", scale: GUI_SCALE },
    ],
    elements: {
        "progressScale": { type: "scale", x: 625, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE },
        "btScale": { type: "scale", x: 425 + GUI_SCALE, y: 92 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "btstorage_small_scale", scale: GUI_SCALE },
        "slotSource": { type: "slot", x: 536, y: 136, size: 72 },
        "slotResult": { type: "slot", x: 720, y: 136, size: 72 },
    }
});
Callback.addCallback("LevelLoaded", function () {
    MachineRegistry.updateGuiHeader(guiBTFurnace, "Blulectric Furnace");
});
var BTFurnace = /** @class */ (function (_super) {
    __extends(BTFurnace, _super);
    function BTFurnace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BTFurnace.prototype.getScreenByName = function () {
        return guiBTFurnace;
    };
    BTFurnace.prototype.onTick = function () {
        _super.prototype.onTick.call(this);
        var sourceSlot = this.container.getSlot("slotSource");
        var resultSlot = this.container.getSlot("slotResult");
        var newActive = false;
        var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, sourceSlot.data, "iron");
        if (result && (resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0)) {
            if (this.data.energy >= 4) {
                this.data.energy -= 4;
                this.data.progress++;
                newActive = true;
            }
            if (this.data.progress >= 100) {
                sourceSlot.setSlot(sourceSlot.id, sourceSlot.count - 1, sourceSlot.data);
                sourceSlot.validate();
                resultSlot.setSlot(result.id, resultSlot.count + 1, result.data);
                this.data.progress = 0;
            }
        }
        else {
            this.data.progress = 0;
        }
        this.setActive(newActive);
        this.container.setScale("progressScale", this.data.progress / 100);
        this.container.setScale("btScale", this.data.energy / this.getEnergyStorage());
        this.container.sendChanges();
    };
    return BTFurnace;
}(ProcessingMachine));
MachineRegistry.registerMachine(BlockID.bt_furnace, new BTFurnace());
StorageInterface.createInterface(BlockID.bt_furnace, {
    slots: {
        "slotSource": { input: true },
        "slotResult": { output: true }
    }
});
/// <reference path="../core/ProcessingMachine.ts" />
IDRegistry.genBlockID("bt_smelter");
Block.createBlock("bt_smelter", [
    { name: "Blulectric Smelter", texture: [["rp_machine_bottom", 0], ["bt_smelter_top", 0], ["bt_smelter_side", 0], ["bt_smelter_front", 0], ["bt_smelter_side", 0], ["bt_smelter_side", 0]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.bt_smelter, "stone", 1);
Block.setDestroyLevel(BlockID.bt_smelter, 1);
TileRenderer.setStandardModelWithRotation(BlockID.bt_smelter, 2, [["rp_machine_bottom", 0], ["bt_smelter_top", 0], ["bt_smelter_side", 0], ["bt_smelter_front", 0], ["bt_smelter_side", 0], ["bt_smelter_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.bt_smelter, 2, [["rp_machine_bottom", 0], ["bt_smelter_top", 0], ["bt_smelter_side", 0], ["bt_smelter_front", 1], ["bt_smelter_side", 0], ["bt_smelter_side", 0]]);
TileRenderer.setRotationFunction(BlockID.bt_smelter);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.bt_smelter, count: 1, data: 0 }, [
        "xxx",
        "x x",
        "aba"
    ], ['x', 45, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0]);
});
var guiBTSmelter = new UI.StandartWindow({
    standard: {
        header: { text: { text: Translation.translate("Blulectric Smelter") } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [
        { type: "bitmap", x: 636, y: 146, bitmap: "furnace_bar_background", scale: GUI_SCALE },
        { type: "bitmap", x: 425, y: 92, bitmap: "btstorage_small_background", scale: GUI_SCALE },
    ],
    elements: {
        "progressScale": { type: "scale", x: 636, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_SCALE },
        "btScale": { type: "scale", x: 425 + GUI_SCALE, y: 92 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "btstorage_small_scale", scale: GUI_SCALE },
        "slotSource1": { type: "slot", x: 502, y: 112 },
        "slotSource2": { type: "slot", x: 562, y: 112 },
        "slotSource3": { type: "slot", x: 502, y: 172 },
        "slotSource4": { type: "slot", x: 562, y: 172 },
        "slotResult": { type: "slot", x: 720, y: 136, size: 72 },
    }
});
Callback.addCallback("LevelLoaded", function () {
    MachineRegistry.updateGuiHeader(guiBTSmelter, "Blulectric Smelter");
});
var BTSmelter = /** @class */ (function (_super) {
    __extends(BTSmelter, _super);
    function BTSmelter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BTSmelter.prototype.getScreenByName = function () {
        return guiBTSmelter;
    };
    BTSmelter.prototype.onTick = function () {
        _super.prototype.onTick.call(this);
        var sourceItems = {};
        for (var i = 1; i <= 4; i++) {
            var slot = this.container.getSlot("slotSource" + i);
            if (slot.id > 0 && slot.data == 0) {
                sourceItems[slot.id] = sourceItems[slot.id] || 0;
                sourceItems[slot.id] += slot.count;
            }
        }
        var recipe = SmelterRecipes.getRecipe(sourceItems);
        var newActive = false;
        if (recipe) {
            var resultSlot = this.container.getSlot("slotResult");
            if (resultSlot.id == recipe.result.id && resultSlot.count + recipe.result.count <= 64 || resultSlot.id == 0) {
                if (this.data.energy >= 4) {
                    this.data.energy -= 4;
                    this.data.progress++;
                    newActive = true;
                }
                if (this.data.progress >= 100) {
                    SmelterRecipes.performRecipe(recipe, this.container);
                    this.data.progress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
        }
        this.setActive(newActive);
        this.container.setScale("progressScale", this.data.progress / 100);
        this.container.setScale("btScale", this.data.energy / this.getEnergyStorage());
        this.container.sendChanges();
    };
    return BTSmelter;
}(ProcessingMachine));
MachineRegistry.registerMachine(BlockID.bt_smelter, new BTSmelter());
StorageInterface.createInterface(BlockID.bt_smelter, {
    slots: {
        "slotSource1": { input: true },
        "slotSource2": { input: true },
        "slotSource3": { input: true },
        "slotSource4": { input: true },
        "slotResult": { output: true }
    }
});
IDRegistry.genBlockID("rp_batbox");
Block.createBlock("rp_batbox", [
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0], ["rp_batbox_side", 0]], inCreative: true },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 1], ["rp_batbox_side", 1], ["rp_batbox_side", 1], ["rp_batbox_side", 1]], inCreative: false },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 2], ["rp_batbox_side", 2], ["rp_batbox_side", 2], ["rp_batbox_side", 2]], inCreative: false },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 3], ["rp_batbox_side", 3], ["rp_batbox_side", 3], ["rp_batbox_side", 3]], inCreative: false },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 4], ["rp_batbox_side", 4], ["rp_batbox_side", 4], ["rp_batbox_side", 4]], inCreative: false },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 5], ["rp_batbox_side", 5], ["rp_batbox_side", 5], ["rp_batbox_side", 5]], inCreative: false },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 6], ["rp_batbox_side", 6], ["rp_batbox_side", 6], ["rp_batbox_side", 6]], inCreative: false },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 7], ["rp_batbox_side", 7], ["rp_batbox_side", 7], ["rp_batbox_side", 7]], inCreative: false },
    { name: "Battery Box", texture: [["rp_machine_bottom", 0], ["rp_batbox_top", 0], ["rp_batbox_side", 8], ["rp_batbox_side", 8], ["rp_batbox_side", 8], ["rp_batbox_side", 8]], inCreative: true }
], "stone");
ToolAPI.registerBlockMaterial(BlockID.rp_batbox, "stone", 1);
Block.registerDropFunction("rp_batbox", function (coords, blockID, blockData, level) {
    return [];
});
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.rp_batbox, count: 1, data: 0 }, [
        "xpx",
        "xax",
        "aba"
    ], ['x', ItemID.btBattery, -1, 'a', 265, 0, 'b', ItemID.ingotBlue, 0, 'p', 5, -1]);
});
var guiBatBox = new UI.StandartWindow({
    standard: {
        header: { text: { text: Translation.translate("Battery Box") } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [
        { type: "bitmap", x: 530, y: 75, bitmap: "btstorage_background", scale: GUI_SCALE },
    ],
    elements: {
        "batteryIcon": { type: "image", x: 530 + 6 * GUI_SCALE, y: 75 - 7 * GUI_SCALE, bitmap: "battery_icon_off", scale: GUI_SCALE },
        "btScale": { type: "scale", x: 530 + GUI_SCALE, y: 75 + GUI_SCALE, direction: 1, value: 0.5, bitmap: "btstorage_scale", scale: GUI_SCALE },
        "slot1": { type: "slot", x: 650, y: 80 },
        "slot2": { type: "slot", x: 650, y: 172 },
    }
});
Callback.addCallback("LevelLoaded", function () {
    MachineRegistry.updateGuiHeader(guiBatBox, "Battery Box");
});
var BatBox = /** @class */ (function (_super) {
    __extends(BatBox, _super);
    function BatBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BatBox.prototype.getScreenByName = function () {
        return guiBatBox;
    };
    BatBox.prototype.getEnergyLevel = function () {
        return Math.floor(this.data.energy / this.getEnergyStorage() * 8);
    };
    BatBox.prototype.onInit = function () {
        this.container.setSlotAddTransferPolicy("slot1", function (container, name, id, amount, data, extra) {
            return ChargeItemRegistry.isValidItem(id, "Bt", 0) ? amount : 0;
        });
        this.container.setSlotAddTransferPolicy("slot2", function (container, name, id, amount, data, extra) {
            return ChargeItemRegistry.isValidStorage(id, "Bt", 0) ? amount : 0;
        });
    };
    BatBox.prototype.onTick = function () {
        var energyStorage = this.getEnergyStorage();
        this.chargeSlot("slot2");
        this.dischargeSlot("slot1");
        var energyLevel = this.getEnergyLevel();
        if (!this.remove && energyLevel != this.region.getBlockData(this)) {
            this.region.setBlock(this, this.blockID, energyLevel);
        }
        if (this.data.energy == this.getEnergyStorage()) {
            this.container.sendEvent("setBatteryIcon", "on");
        }
        else {
            this.container.sendEvent("setBatteryIcon", "off");
        }
        this.container.setScale("btScale", this.data.energy / energyStorage);
        this.container.sendChanges();
    };
    BatBox.prototype.getEnergyStorage = function () {
        return 64000;
    };
    BatBox.prototype.energyTick = function (type, src) {
        var output = Math.min(100, this.data.energy);
        this.data.energy += src.add(output) - output;
    };
    BatBox.prototype.destroyBlock = function (coords, player) {
        if (this.data.energy > 0) {
            var extra = new ItemExtraData().putInt("energy", this.data.energy);
            var blockData = this.getEnergyLevel();
            this.region.dropItem(coords.x + .5, coords.y + .5, coords.z + .5, this.blockID, 1, blockData, extra);
        }
        else {
            this.region.dropItem(coords.x + .5, coords.y + .5, coords.z + .5, this.blockID, 1, 0);
        }
    };
    BatBox.prototype.setBatteryIcon = function (container, window, content, data) {
        if (content) {
            content.elements["batteryIcon"].bitmap = "battery_icon_" + data;
        }
    };
    __decorate([
        BlockEngine.Decorators.ContainerEvent(Side.Client)
    ], BatBox.prototype, "setBatteryIcon", null);
    return BatBox;
}(BlulectricMachine));
MachineRegistry.registerMachine(BlockID.rp_batbox, new BatBox());
Block.registerPlaceFunction("rp_batbox", function (coords, item, block, player, region) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    region.setBlock(x, y, z, item.id, item.data);
    var tile = World.addTileEntity(x, y, z, region);
    if (item.extra) {
        tile.data.energy = item.extra.getInt("energy");
    }
    else {
        tile.data.energy = tile.getEnergyStorage() / 8 * item.data;
    }
});
/// <reference path="../core/BlulectricMachine.ts" />
IDRegistry.genBlockID("bt_transformer");
Block.createBlock("bt_transformer", [
    { name: "Blutricity Transformer", texture: [["bt_transformer_bottom", 0], ["bt_transformer_top", 0], ["bt_transformer_side", 0], ["bt_transformer_side", 0], ["bt_transformer_side", 1], ["bt_transformer_side", 1]], inCreative: true }
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.bt_transformer, "stone", 1);
Block.setDestroyLevel("bt_transformer", 1);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.bt_transformer, count: 1, data: 0 }, [
        "xxx",
        "cxc",
        "axa"
    ], ['x', 265, 0, 'a', ItemID.ingotBlue, 0, 'c', ItemID.copperCoil, 0]);
});
var TransformerRender;
(function (TransformerRender) {
    ICRender.getGroup("ic-wire").add(BlockID.bt_transformer, -1);
    var modelBoxes = [
        [0, 0, 0, 1, 1 / 8, 1],
        [1 / 8, 1 / 8, 1 / 16, 7 / 8, 7 / 8, 15 / 16],
        [0, 1 / 8, 3 / 8, 1, 1, 5 / 8]
    ];
    var render = TileRenderer.createBlockModel(BlockID.bt_transformer, 0, modelBoxes);
    BlockRenderer.setStaticICRender(BlockID.bt_transformer, 0, render);
    TileRenderer.setCollisionShape(BlockID.bt_transformer, 0, modelBoxes);
})(TransformerRender || (TransformerRender = {}));
var BTTransformer = /** @class */ (function (_super) {
    __extends(BTTransformer, _super);
    function BTTransformer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            energy: 0,
            electric_mode: false
        };
        return _this;
    }
    BTTransformer.prototype.canReceiveEnergy = function (side, type) {
        return this.data.electric_mode == (type == "Bt");
    };
    BTTransformer.prototype.canExtractEnergy = function (side, type) {
        return this.data.electric_mode != (type == "Bt");
    };
    BTTransformer.prototype.getEnergyStorage = function () {
        return 128;
    };
    BTTransformer.prototype.energyTick = function (type, src) {
        var output = this.data.energy;
        if (output > 0) {
            this.data.energy -= src.addPacket(this.data.electric_mode ? "Bt" : "Eu", output);
        }
    };
    BTTransformer.prototype.redstone = function (signal) {
        var mode = signal.power > 0;
        if (this.data.electric_mode != mode) {
            this.data.electric_mode = mode;
            this.rebuildGrid();
        }
    };
    BTTransformer.prototype.rebuildGrid = function () {
        this.energyNode.resetConnections();
        EnergyGridBuilder.buildGridForTile(this);
    };
    BTTransformer.prototype.onItemUse = function () {
        return true;
    };
    return BTTransformer;
}(BlulectricMachine));
MachineRegistry.registerMachine(BlockID.bt_transformer, new BTTransformer());
EnergyTileRegistry.addEnergyTypeForId(BlockID.bt_transformer, EU);
ItemRegistry.createItem("ingotRed", { name: "Red Alloy Ingot", icon: "ingot_red" });
ItemRegistry.createItem("ingotBlue", { name: "Blue Alloy Ingot", icon: "ingot_blue" });
ItemRegistry.createItem("ingotBronze", { name: "Bronze Ingot", icon: "ingot_bronze" });
ItemRegistry.createItem("ingotTin", { name: "Tin Ingot", icon: "ingot_tin" });
ItemRegistry.createItem("ingotCopper", { name: "Copper Ingot", icon: "ingot_copper" });
ItemRegistry.createItem("ingotSilver", { name: "Silver Ingot", icon: "ingot_silver" });
ItemRegistry.createItem("ingotTungsten", { name: "Tungsten Ingot", icon: "ingot_tungsten" });
Item.addCreativeGroup("ingot", Translation.translate("Ingots"), [
    ItemID.ingotRed,
    ItemID.ingotBlue,
    ItemID.ingotBronze,
    ItemID.ingotTin,
    ItemID.ingotCopper,
    ItemID.ingotSilver,
    ItemID.ingotTungsten
]);
ItemRegistry.createItem("nikolite", { name: "Nikolite", icon: "nikolite" });
ChargeItemRegistry.registerFlashItem(ItemID.nikolite, "Bt", 1000, 0);
ItemRegistry.createItem("gemRuby", { name: "Ruby", icon: "ruby" });
ItemRegistry.createItem("gemSapphire", { name: "Sapphire", icon: "sapphire" });
ItemRegistry.createItem("gemGreenSapphire", { name: "Green Sapphire", icon: "green_sapphire" });
Item.addCreativeGroup("gem", Translation.translate("Gems"), [
    ItemID.gemRuby,
    ItemID.gemSapphire,
    ItemID.gemGreenSapphire
]);
Callback.addCallback("PreLoaded", function () {
    Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);
    Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);
    Recipes.addFurnace(BlockID.oreSilver, ItemID.ingotSilver, 0);
});
ItemRegistry.createItem("canvas", { name: "Canvas", icon: "canvas" });
ItemRegistry.createItem("canvasBag", { name: "Canvas Bag", icon: "canvas_bag", stack: 1, category: ItemCategory.EQUIPMENT });
Item.registerIconOverrideFunction(ItemID.canvasBag, function (item, name) {
    return { name: "canvas_bag", meta: item.data };
});
BackpackRegistry.register(ItemID.canvasBag, {
    title: "Canvas Bag",
    slots: 27,
    inRow: 9,
    slotsCenter: true,
    useExtraData: true
});
for (var i = 1; i < 16; i++) {
    Item.addToCreative(ItemID.canvasBag, 1, i);
}
Item.addCreativeGroup("canvasBag", Translation.translate("Canvas Bag"), [ItemID.canvasBag]);
Recipes.addShaped({ id: ItemID.canvas, count: 1, data: 0 }, [
    "aaa",
    "axa",
    "aaa"
], ['x', 280, 0, 'a', 287, 0]);
Recipes.addShaped({ id: ItemID.canvasBag, count: 1, data: 0 }, [
    "aaa",
    "a a",
    "aaa"
], ['a', ItemID.canvas, 0]);
for (var i = 1; i < 16; i++) {
    Recipes.addShaped({ id: ItemID.canvasBag, count: 1, data: i }, [
        "aaa",
        "axa",
        "aaa"
    ], ['x', 351, COLOR_INDEX_TO_DYE_DATA[i], 'a', ItemID.canvas, 0]);
}
ItemRegistry.createItem("seedBag", { name: "Seed Bag", icon: "seed_bag", stack: 1, maxDamage: 576, category: ItemCategory.EQUIPMENT, inCreative: false });
Item.addToCreative(ItemID.seedBag, 1, 576);
Item.registerIconOverrideFunction(ItemID.seedBag, function (item, name) {
    return { name: "seed_bag", meta: (item.data < 576) ? 1 : 0 };
});
Recipes.addShaped({ id: ItemID.seedBag, count: 1, data: 0 }, [
    " s ",
    "a a",
    "aaa"
], ['a', ItemID.canvas, 0, 's', 287, 0]);
Item.registerNameOverrideFunction(ItemID.seedBag, function (item, name) {
    if (item.extra) {
        var id = 0;
        var count = 0;
        var container = SeedBag.getContainer(item.extra);
        if (container) {
            for (var i in container.slots) {
                var slot = container.getSlot(i);
                if (slot.id > 0) {
                    id = slot.id;
                    count += slot.count;
                }
            }
            if (count) {
                name += "\n§7" + Translation.translate(Item.getName(id)) + " * " + count;
            }
        }
    }
    return name;
});
Saver.addSavesScope("SeedBagScope", function read(scope) {
    SeedBag.nextUnique = scope.nextUnique || 1;
    if (!scope.format) {
        var containers = scope.containers || {};
        for (var key in containers) {
            containers[key] = new ItemContainer(containers[key]);
        }
        SeedBag.containers = containers;
    }
    else {
        SeedBag.containers = scope.containers || {};
    }
}, function save() {
    return {
        nextUnique: SeedBag.nextUnique,
        containers: SeedBag.containers,
        format: 1
    };
});
var SeedBag = {
    containers: {},
    nextUnique: 1,
    getContainer: function (extra) {
        if (extra) {
            return this.containers["d" + extra.getInt("container")];
        }
        return null;
    },
    decreaseCount: function (item, container, decreaseCount, player) {
        if (decreaseCount == 0)
            return;
        var storedCount = 0;
        for (var name in container.slots) {
            var slot = container.getSlot(name);
            if (slot.id > 0) {
                var count = Math.min(slot.count, decreaseCount);
                slot.count -= count;
                decreaseCount -= count;
                storedCount += slot.count;
                container.setSlot(name, slot.id, slot.count, slot.data);
                container.validateSlot(name);
            }
        }
        Entity.setCarriedItem(player, item.id, 1, 576 - storedCount, item.extra);
    },
    isValidItem: function (id, container) {
        if (!seeds[id])
            return false;
        for (var i in container.slots) {
            var slot = container.getSlot(i);
            if (slot.id > 0 && slot.id != id) {
                return false;
            }
        }
        return true;
    },
    setupContainer: function (container) {
        container.setClientContainerTypeName("seed_bag.ui");
        container.setGlobalAddTransferPolicy(function (container, name, id, amount, data, extra, player) {
            amount = SeedBag.isValidItem(id, container) ? amount : 0;
            if (SeedBag.isValidItem(id, container)) {
                amount = Math.min(amount, 64 - container.getSlot(name).count);
                var item = Entity.getCarriedItem(player);
                if (item.id == ItemID.seedBag)
                    Entity.setCarriedItem(player, item.id, 1, item.data - amount, item.extra);
                return amount;
            }
            return 0;
        });
        container.setGlobalGetTransferPolicy(function (container, name, id, amount, data, extra, player) {
            var item = Entity.getCarriedItem(player);
            if (item.id == ItemID.seedBag)
                Entity.setCarriedItem(player, item.id, 1, item.data + amount, item.extra);
            return amount;
        });
    },
    openGuiFor: function (item, player) {
        var client = Network.getClientForPlayer(player);
        if (!client) {
            return;
        }
        var extra = item.extra || new ItemExtraData();
        var containerID = extra.getInt("container");
        var container = this.containers["d" + containerID];
        if (!container) {
            containerID = this.nextUnique++;
            extra.putInt("container", containerID);
            container = this.containers["d" + containerID] = new ItemContainer();
            Entity.setCarriedItem(player, item.id, 1, item.data, extra);
        }
        if (!container.getClientContainerTypeName()) {
            this.setupContainer(container);
        }
        container.openFor(client, "seed_bag");
    }
};
SeedBag.gui = new UI.StandartWindow({
    standard: {
        header: { text: { text: Translation.translate("Seed Bag") } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [],
    elements: {
        "slot0": { type: "slot", x: 530, y: 120 },
        "slot1": { type: "slot", x: 590, y: 120 },
        "slot2": { type: "slot", x: 650, y: 120 },
        "slot4": { type: "slot", x: 530, y: 180 },
        "slot5": { type: "slot", x: 590, y: 180 },
        "slot6": { type: "slot", x: 650, y: 180 },
        "slot8": { type: "slot", x: 530, y: 240 },
        "slot9": { type: "slot", x: 590, y: 240 },
        "slot10": { type: "slot", x: 650, y: 240 }
    }
}),
    ItemContainer.registerScreenFactory("seed_bag.ui", function (container, name) {
        return SeedBag.gui;
    });
Callback.addCallback("LevelLoaded", function () {
    MachineRegistry.updateGuiHeader(SeedBag.gui, "Seed Bag");
});
Item.registerNoTargetUseFunction(ItemID.seedBag, function (item, player) {
    SeedBag.openGuiFor(item, player);
});
var seeds = { 295: 59, 391: 141, 392: 142, 458: 244 };
seeds[ItemID.flaxSeeds] = BlockID.flax;
Item.registerUseFunction("seedBag", function (coords, item, block, player) {
    if (item.extra && block.id == 60 && coords.side == 1) {
        var id = 0;
        var count = 0;
        var decreaseCount = 0;
        var container = SeedBag.getContainer(item.extra);
        var region = BlockSource.getDefaultForActor(player);
        if (container) {
            for (var name in container.slots) {
                var slot = container.getSlot(name);
                if (slot.id > 0) {
                    id = slot.id;
                    count += slot.count;
                    container.setSlot(name, slot.id, slot.count, slot.data);
                }
            }
        }
        if (count) {
            for (var x = coords.x - 2; x <= coords.x + 2; x++)
                for (var z = coords.z - 2; z <= coords.z + 2; z++) {
                    if (region.getBlockId(x, coords.y, z) == 60 && region.getBlockId(x, coords.y + 1, z) == 0) {
                        region.setBlock(x, coords.y + 1, z, seeds[id], 0);
                        decreaseCount++;
                    }
                    if (decreaseCount >= count) {
                        SeedBag.decreaseCount(item, container, decreaseCount, player);
                        return;
                    }
                }
            SeedBag.decreaseCount(item, container, decreaseCount, player);
        }
    }
});
ItemRegistry.createItem("lumar", { name: "Lumar", icon: "lumar", inCreative: false });
Item.registerIconOverrideFunction(ItemID.lumar, function (item, name) {
    return { name: "lumar", meta: item.data };
});
Item.addCreativeGroup("lumar", Translation.translate("Lumar"), [
    ItemID.lumar,
]);
var LumarNameEn = ["White Lumar", "Orange Lumar", "Magenta Lumar", "Light Blue Lumar", "Yellow Lumar", "Lime Lumar", "Pink Lumar", "Gray Lumar", "Light Gray Lumar", "Cyan Lumar", "Purple Lumar", "Blue Lumar", "Brown Lumar", "Green Lumar", "Red Lumar", "Black Lumar"];
var LumarNameRu = ["Белый светодиод", "Оранжевый светодиод", "Пурпурный светодиод", "Голубой светодиод", "Жёлтый светодиод", "Лаймовый светодиод", "Розовый светодиод", "Серый светодиод", "Светло-серый светодиод", "Бирюзовый светодиод", "Фиолетовый светодиод", "Синий светодиод", "Коричневый светодиод", "Зелёный светодиод", "Красный светодиод", "Чёрный светодиод"];
for (var i = 0; i < 16; i++) {
    Translation.addTranslation(LumarNameEn[i], { ru: LumarNameRu[i] });
    Item.addToCreative(ItemID.lumar, 1, i);
}
Item.registerNameOverrideFunction(ItemID.lumar, function (item, name) {
    return Translation.translate(LumarNameEn[item.data]);
});
for (var data = 0; data < 16; data++) {
    VanillaRecipe.addCraftingRecipe("lumar" + data, {
        type: "shaped",
        pattern: [
            "XG",
            "RX"
        ],
        key: {
            "X": {
                item: "dye",
                data: COLOR_INDEX_TO_DYE_DATA[data]
            },
            "R": { item: "redstone" },
            "G": { item: "glowstone_dust" }
        },
        result: {
            item: "item:lumar",
            count: 2,
            data: data
        }
    }, true);
}
ItemRegistry.createItem("siliconBoule", { name: "Silicon Boule", icon: "silicon_boule" });
ItemRegistry.createItem("waferSilicon", { name: "Silicon Wafer", icon: "wafer_silicon" });
ItemRegistry.createItem("waferRed", { name: "Red-Doped Wafer", icon: "wafer_red" });
ItemRegistry.createItem("waferBlue", { name: "Blue-Doped Wafer", icon: "wafer_blue" });
ItemRegistry.createItem("fineCopperWire", { name: "Fine Copper Wire", icon: "fine_copper_wire" });
ItemRegistry.createItem("fineIronWire", { name: "Fine Iron Wire", icon: "fine_iron_wire" });
ItemRegistry.createItem("copperCoil", { name: "Copper Coil", icon: "copper_coil" });
Callback.addCallback("PreLoaded", function () {
    addRecipeWithCraftingTool({ id: ItemID.waferSilicon, count: 16, data: 0 }, [{ id: ItemID.siliconBoule, data: 0 }], ItemID.handsawDiamond);
    addRecipeWithCraftingTool({ id: ItemID.fineCopperWire, count: 1, data: 0 }, [{ id: ItemID.ingotCopper, data: 0 }], ItemID.diamondDrawplate);
    addRecipeWithCraftingTool({ id: ItemID.fineIronWire, count: 1, data: 0 }, [{ id: 265, data: 0 }], ItemID.diamondDrawplate);
    VanillaRecipe.addCraftingRecipe("fine_copper_wire", {
        type: "shaped",
        tags: ["crafting_table"],
        pattern: [
            "AX",
        ],
        key: {
            "A": { item: "item:ingotCopper" },
            "X": { item: "item:diamondDrawplate" }
        },
        result: [
            { item: "item:fineCopperWire" },
            { item: "item:diamondDrawplate" }
        ]
    });
    VanillaRecipe.addCraftingRecipe("fine_iron_wire", {
        type: "shaped",
        tags: ["crafting_table"],
        pattern: [
            "AX",
        ],
        key: {
            "A": { item: "iron_ingot" },
            "X": { item: "item:diamondDrawplate" }
        },
        result: [
            { item: "item:fineIronWire" },
            { item: "item:diamondDrawplate" }
        ]
    });
    Recipes.addShaped({ id: ItemID.copperCoil, count: 1, data: 0 }, [
        "cxc",
        "x#x",
        "cxc"
    ], ['#', 265, 0, 'x', 101, 0, 'c', ItemID.fineCopperWire, 0]);
});
ItemRegistry.createItem("btBattery", { name: "BT Battery", icon: "bt_battery", stack: 1, inCreative: false });
ChargeItemRegistry.registerItem(ItemID.btBattery, "Bt", 16000, 100, 0, true);
Recipes.addShaped({ id: ItemID.btBattery, count: 1, data: Item.getMaxDamage(ItemID.btBattery) }, [
    "xcx",
    "xax",
    "xcx"
], ['x', ItemID.nikolite, 0, 'a', ItemID.ingotTin, 0, 'c', ItemID.ingotCopper, 0]);
ItemRegistry.createItem("handsawDiamond", { name: "Diamond Handsaw", icon: "handsaw_diamond", stack: 1, maxDamage: 1562, category: ItemCategory.EQUIPMENT });
ItemRegistry.createItem("diamondDrawplate", { name: "Diamond Drawplate", icon: "diamond_drawplate", stack: 1, category: ItemCategory.EQUIPMENT });
ItemRegistry.createItem("woolCard", { name: "Wool Card", icon: "wool_card", stack: 1, category: ItemCategory.EQUIPMENT });
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: ItemID.handsawDiamond, count: 1, data: 0 }, [
        "rrr",
        " aa",
        " dd"
    ], ['a', 265, 0, 'd', 264, 0, 'r', 280, 0]);
    Recipes.addShaped({ id: ItemID.diamondDrawplate, count: 1, data: 0 }, [
        " x ",
        "x#x",
        " x "
    ], ['#', 264, 0, 'x', 265, 0]);
    Recipes.addShaped({ id: ItemID.woolCard, count: 1, data: 0 }, [
        "#",
        "p",
        "s"
    ], ['#', ItemID.fineIronWire, 0, 'p', 5, -1, 's', 280, 0]);
    addRecipeWithCraftingTool({ id: VanillaItemID.string, count: 4, data: 0 }, [{ id: 35, data: -1 }], ItemID.woolCard);
    VanillaRecipe.addCraftingRecipe("string_from_wool", {
        type: "shaped",
        tags: ["crafting_table"],
        pattern: [
            "AX",
        ],
        key: {
            "A": { item: "wool" },
            "X": { item: "item:woolCard" }
        },
        result: [
            { item: "string", count: 4 },
            { item: "item:woolCard" }
        ]
    });
});
function addRecipeWithCraftingTool(result, ingredients, toolID) {
    ingredients.push({ id: toolID, data: -1 });
    Recipes.addShapeless(result, ingredients, function (api, field, result) {
        for (var i = 0; i < field.length; i++) {
            var item = field[i];
            if (item.id == toolID) {
                var maxDamage = Item.getMaxDamage(toolID);
                if (maxDamage > 0 && item.data++ >= maxDamage) {
                    item.id = item.count = item.data = 0;
                }
            }
            else {
                api.decreaseFieldSlot(i);
            }
        }
    });
}
ItemRegistry.createTool("athame", { name: "Athame", icon: "athame", material: { level: 0, durability: 50, damage: 3 } }, {
    onAttack: function (item, mob) {
        this.damage = Entity.getType(mob) == Native.EntityType.ENDERMAN ? 17 : 0;
        return false;
    }
});
VanillaRecipe.addCraftingRecipe("athame", {
    type: "shaped",
    pattern: [
        "X",
        "#"
    ],
    key: {
        "X": { item: "item:ingotSilver" },
        "#": { item: "stick" }
    },
    result: {
        item: "item:athame"
    }
}, true);
ItemRegistry.addToolMaterial("ruby", { durability: 500, level: 3, efficiency: 8, damage: 3, enchantability: 11, repairMaterial: ItemID.gemRuby });
ItemRegistry.addToolMaterial("sapphire", { durability: 500, level: 3, efficiency: 8, damage: 2, enchantability: 11, repairMaterial: ItemID.gemSapphire });
ItemRegistry.addToolMaterial("greenSapphire", { durability: 500, level: 3, efficiency: 8, damage: 2, enchantability: 11, repairMaterial: ItemID.gemGreenSapphire });
ItemRegistry.createTool("rubySword", { name: "Ruby Sword", icon: "ruby_sword", material: "ruby" }, ToolType.SWORD);
ItemRegistry.createTool("sapphireSword", { name: "Sapphire Sword", icon: "sapphire_sword", material: "sapphire" }, ToolType.SWORD);
ItemRegistry.createTool("greenSapphireSword", { name: "Green Sapphire Sword", icon: "green_sapphire_sword", material: "greenSapphire" }, ToolType.SWORD);
Item.addCreativeGroup("rp_swords", Translation.translate("Swords"), [
    ItemID.rubySword,
    ItemID.sapphireSword,
    ItemID.greenSapphireSword
]);
Recipes.addShaped({ id: ItemID.rubySword, count: 1, data: 0 }, [
    "a",
    "a",
    "b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sapphireSword, count: 1, data: 0 }, [
    "a",
    "a",
    "b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.greenSapphireSword, count: 1, data: 0 }, [
    "a",
    "a",
    "b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);
ItemRegistry.createTool("rubyShovel", { name: "Ruby Shovel", icon: "ruby_shovel", material: "ruby" }, ToolType.SHOVEL);
ItemRegistry.createTool("sapphireShovel", { name: "Sapphire Shovel", icon: "sapphire_shovel", material: "sapphire" }, ToolType.SHOVEL);
ItemRegistry.createTool("greenSapphireShovel", { name: "Green Sapphire Shovel", icon: "green_sapphire_shovel", material: "greenSapphire" }, ToolType.SHOVEL);
Item.addCreativeGroup("rp_shovels", Translation.translate("Shovels"), [
    ItemID.rubyShovel,
    ItemID.sapphireShovel,
    ItemID.greenSapphireShovel
]);
Recipes.addShaped({ id: ItemID.rubyShovel, count: 1, data: 0 }, [
    "a",
    "b",
    "b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sapphireShovel, count: 1, data: 0 }, [
    "a",
    "b",
    "b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.greenSapphireShovel, count: 1, data: 0 }, [
    "a",
    "b",
    "b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);
ItemRegistry.createTool("rubyPickaxe", { name: "Ruby Pickaxe", icon: "ruby_pickaxe", material: "ruby" }, ToolType.PICKAXE);
ItemRegistry.createTool("sapphirePickaxe", { name: "Sapphire Pickaxe", icon: "sapphire_pickaxe", material: "sapphire" }, ToolType.PICKAXE);
ItemRegistry.createTool("greenSapphirePickaxe", { name: "Green Sapphire Pickaxe", icon: "green_sapphire_pickaxe", material: "greenSapphire" }, ToolType.PICKAXE);
Item.addCreativeGroup("rp_pickaxes", Translation.translate("Pickaxes"), [
    ItemID.rubyPickaxe,
    ItemID.sapphirePickaxe,
    ItemID.greenSapphirePickaxe
]);
Recipes.addShaped({ id: ItemID.rubyPickaxe, count: 1, data: 0 }, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sapphirePickaxe, count: 1, data: 0 }, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.greenSapphirePickaxe, count: 1, data: 0 }, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);
ItemRegistry.createTool("rubyAxe", { name: "Ruby Axe", icon: "ruby_axe", material: "ruby" }, ToolType.AXE);
ItemRegistry.createTool("sapphireAxe", { name: "Sapphire Axe", icon: "sapphire_axe", material: "sapphire" }, ToolType.AXE);
ItemRegistry.createTool("greenSapphireAxe", { name: "Green Sapphire Axe", icon: "green_sapphire_axe", material: "greenSapphire" }, ToolType.AXE);
Item.addCreativeGroup("rp_axes", Translation.translate("Axes"), [
    ItemID.rubyAxe,
    ItemID.sapphireAxe,
    ItemID.greenSapphireAxe
]);
Recipes.addShaped({ id: ItemID.rubyAxe, count: 1, data: 0 }, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sapphireAxe, count: 1, data: 0 }, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.greenSapphireAxe, count: 1, data: 0 }, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);
ItemRegistry.createTool("rubyHoe", { name: "Ruby Hoe", icon: "ruby_hoe", material: "ruby" }, ToolType.HOE);
ItemRegistry.createTool("sapphireHoe", { name: "Sapphire Hoe", icon: "sapphire_hoe", material: "sapphire" }, ToolType.HOE);
ItemRegistry.createTool("greenSapphireHoe", { name: "Green Sapphire Hoe", icon: "green_sapphire_hoe", material: "greenSapphire" }, ToolType.HOE);
Item.addCreativeGroup("rp_hoes", Translation.translate("Hoes"), [
    ItemID.rubyHoe,
    ItemID.sapphireHoe,
    ItemID.greenSapphireHoe
]);
Recipes.addShaped({ id: ItemID.rubyHoe, count: 1, data: 0 }, [
    "aa",
    " b",
    " b"
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sapphireHoe, count: 1, data: 0 }, [
    "aa",
    " b",
    " b"
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.greenSapphireHoe, count: 1, data: 0 }, [
    "aa",
    " b",
    " b"
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);
var plants = [31, 37, 38, 59, 83, 106, 141, 142, 175, 244, BlockID.flax];
var ToolSickle = /** @class */ (function (_super) {
    __extends(ToolSickle, _super);
    function ToolSickle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolSickle.prototype.calcDestroyTime = function (item, coords, block, params, destroyTime) {
        var material = ToolAPI.getBlockMaterialName(block.id);
        if (material == "fibre" || material == "plant" || block.id == 30) {
            return 0;
        }
        return destroyTime;
    };
    ToolSickle.prototype.onDestroy = function (item, coords, block, player) {
        var region = WorldRegion.getForActor(player);
        var x = coords.x, y = coords.y, z = coords.z;
        var material = ToolAPI.getBlockMaterialName(block.id);
        if (material == "plant" && plants.indexOf(block.id) == -1) {
            for (var xx = x - 1; xx <= x + 1; xx++) {
                for (var yy = y - 1; yy <= y + 1; yy++) {
                    for (var zz = z - 1; zz <= z + 1; zz++) {
                        var block_1 = region.getBlock(xx, yy, zz);
                        if (ToolAPI.getBlockMaterialName(block_1.id) == "plant") {
                            region.destroyBlock(xx, yy, zz, true);
                        }
                    }
                }
            }
        }
        else if (plants.indexOf(block.id) != -1) {
            for (var xx = x - 2; xx <= x + 2; xx++) {
                for (var zz = z - 2; zz <= z + 2; zz++) {
                    var block_2 = region.getBlock(xx, y, zz);
                    if (plants.indexOf(block_2.id) != -1) {
                        region.destroyBlock(xx, y, zz, true);
                    }
                }
            }
        }
        return false;
    };
    return ToolSickle;
}(ItemTool));
ItemRegistry.registerItem(new ToolSickle("sickleWood", "Wood Sickle", { name: "sickle", meta: 0 }, "wood"));
ItemRegistry.registerItem(new ToolSickle("sickleStone", "Stone Sickle", { name: "sickle", meta: 1 }, "stone"));
ItemRegistry.registerItem(new ToolSickle("sickleIron", "Iron Sickle", { name: "sickle", meta: 2 }, "iron"));
ItemRegistry.registerItem(new ToolSickle("sickleGold", "Gold Sickle", { name: "sickle", meta: 3 }, "golden"));
ItemRegistry.registerItem(new ToolSickle("sickleDiamond", "Diamond Sickle", { name: "sickle", meta: 4 }, "diamond"));
ItemRegistry.registerItem(new ToolSickle("rubySickle", "Ruby Sickle", "ruby_sickle", "ruby"));
ItemRegistry.registerItem(new ToolSickle("sapphireSickle", "Sapphire Sickle", "sapphire_sickle", "sapphire"));
ItemRegistry.registerItem(new ToolSickle("greenSapphireSickle", "Green Sapphire Sickle", "green_sapphire_sickle", "greenSapphire"));
Item.addCreativeGroup("sickles", Translation.translate("Sickles"), [
    ItemID.sickleWood,
    ItemID.sickleStone,
    ItemID.sickleIron,
    ItemID.sickleGold,
    ItemID.sickleDiamond,
    ItemID.rubySickle,
    ItemID.sapphireSickle,
    ItemID.greenSapphireSickle
]);
Recipes.addShaped({ id: ItemID.sickleWood, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', 5, -1, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sickleStone, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', 4, -1, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sickleIron, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', 265, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sickleGold, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', 266, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sickleDiamond, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', 264, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.rubySickle, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', ItemID.gemRuby, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.sapphireSickle, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', ItemID.gemSapphire, 0, 'b', 280, 0]);
Recipes.addShaped({ id: ItemID.greenSapphireSickle, count: 1, data: 0 }, [
    " a ",
    "  a",
    "ba "
], ['a', ItemID.gemGreenSapphire, 0, 'b', 280, 0]);
ModAPI.registerAPI("RedCore", {
    Machine: MachineRegistry,
    SmelterRecipes: SmelterRecipes,
    World: OreGeneration,
    Integration: IntegrationAPI,
    requireGlobal: function (command) {
        return eval(command);
    }
});
Logger.Log("RedCore API shared.", "API");
ModAPI.addAPICallback("RecipeViewer", function (api) {
    var RecipeViewer = api.Core;
    if (RecipeViewer.addListByData) {
        RecipeViewer.addListByData(ItemID.lumar, 16, "item");
        RecipeViewer.addListByData(ItemID.canvasBag, 16, "item");
    }
    RecipeViewer.registerRecipeType("rp_smelter", {
        contents: {
            icon: BlockID.rp_smelter,
            drawing: [
                { type: "bitmap", x: 500, y: 222, bitmap: "furnace_bar_scale", scale: 6 },
            ],
            elements: {
                input0: { type: "slot", x: 240, y: 150, size: 120 },
                input1: { type: "slot", x: 360, y: 150, size: 120 },
                input2: { type: "slot", x: 240, y: 270, size: 120 },
                input3: { type: "slot", x: 360, y: 270, size: 120 },
                output0: { type: "slot", x: 652, y: 210, size: 120 },
            }
        },
        getList: function (id, data, isUsage) {
            var list = [];
            if (isUsage) {
                for (var i in SmelterRecipes.recipeData) {
                    var recipe = SmelterRecipes.recipeData[i];
                    for (var j in recipe.input) {
                        if (recipe.input[j].id == id) {
                            list.push({
                                input: recipe.input,
                                output: [recipe.result]
                            });
                        }
                    }
                }
            }
            else {
                for (var i in SmelterRecipes.recipeData) {
                    var recipe = SmelterRecipes.recipeData[i];
                    if (recipe.result.id == id) {
                        list.push({
                            input: recipe.input,
                            output: [recipe.result]
                        });
                    }
                }
            }
            return list;
        }
    });
});
