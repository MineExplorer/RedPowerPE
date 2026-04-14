BlockRegistry.createBlockWithRotation("rp_project_table", [
	{name: "Project Table", texture: [["rp_project_table_bottom", 0], ["rp_project_table_top", 0], ["rp_project_table_side", 0], ["rp_project_table_front", 0], ["rp_project_table_side", 0], ["rp_project_table_side", 0]], inCreative: true},
], "machine");
BlockRegistry.setBlockMaterial(BlockID.rp_project_table, "stone", 1);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.rp_project_table, count: 1, data: 0}, [
		"sss",
		"p#p",
		"pcp"
	], ['#', VanillaBlockID.crafting_table, -1, 's', VanillaBlockID.stone, 0, 'p', VanillaBlockID.planks, -1, 'c', VanillaBlockID.chest, -1]);
});

const guiProjectTable = MachineRegistry.createInventoryWindow("Project Table", {
    elements: {
        "progressArrow": { type: "button", x: 665, y: 104, bitmap: "arrow_bar_background", scale: GUI_SCALE, clicker: {
            onClick: () => {
                RecipeViewer?.RecipeTypeRegistry.openRecipePage("workbench");
            }
        }},
        "slotInput0": { type: "slot", x: 460, y: 40 },
        "slotInput1": { type: "slot", x: 520, y: 40 },
        "slotInput2": { type: "slot", x: 580, y: 40 },
        "slotInput3": { type: "slot", x: 460, y: 100 },
        "slotInput4": { type: "slot", x: 520, y: 100 },
        "slotInput5": { type: "slot", x: 580, y: 100 },
        "slotInput6": { type: "slot", x: 460, y: 160 },
        "slotInput7": { type: "slot", x: 520, y: 160 },
        "slotInput8": { type: "slot", x: 580, y: 160 },
        "slotResult": { type: "slot", x: 760, y: 100, visual: true, clicker: {
            onClick: function(_, container: ItemContainer) {
                container.sendEvent("craft", {allAtOnce: false});
            },
            onLongClick: function(_, container: ItemContainer) {
                container.sendEvent("craft", {allAtOnce: true});
            }
        }},
        "buttonClear": {type: "button", x: 645, y: 40, bitmap: "project_table_clear_button", bitmap2: "project_table_clear_button_touched", scale: GUI_SCALE, clicker: {
            onClick: function(_, container: ItemContainer) {
                container.sendEvent("clearGrid", {});
            }
        }},
        "slot0": { type: 'slot', x: 370, y: 250 },
        "slot1": { type: 'slot', x: 430, y: 250 },
        "slot2": { type: 'slot', x: 490, y: 250 },
        "slot3": { type: 'slot', x: 550, y: 250 },
        "slot4": { type: 'slot', x: 610, y: 250 },
        "slot5": { type: 'slot', x: 670, y: 250 },
        "slot6": { type: 'slot', x: 730, y: 250 },
        "slot7": { type: 'slot', x: 790, y: 250 },
        "slot8": { type: 'slot', x: 850, y: 250 },
        "slot9": { type: 'slot', x: 370, y: 310 },
        "slot10": { type: 'slot', x: 430, y: 310 },
        "slot11": { type: 'slot', x: 490, y: 310 },
        "slot12": { type: 'slot', x: 550, y: 310 },
        "slot13": { type: 'slot', x: 610, y: 310 },
        "slot14": { type: 'slot', x: 670, y: 310 },
        "slot15": { type: 'slot', x: 730, y: 310 },
        "slot16": { type: 'slot', x: 790, y: 310 },
        "slot17": { type: 'slot', x: 850, y: 310 }
    }
});

class ProjectTable extends TileEntityBase {
    defaultValues = { 
        recipeChecked: false
    };

    getScreenByName(): UI.IWindow {
        return guiProjectTable;
    }

    onInit(): void {
        StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
            if (name.match(/slotInput[0-8]/)) {
                this.data.recipeChecked = false;
            }
            return true;
        });
        this.container.setGlobalGetTransferPolicy((container, name, id, amount, data) => {
            if (name.match(/slotInput[0-8]/)) {
                this.data.recipeChecked = false;
            }
            return amount;
        });
        this.container.setWorkbenchFieldPrefix("slotInput");

        delete this.liquidStorage;
    }

    onTick(): void {
        StorageInterface.checkHoppers(this);

        if (!this.data.recipeChecked) {
            const result = Recipes.getRecipeResult(this.container);
            if (result) {
                this.container.setSlot("slotResult", result.id, result.count, result.data, result.extra);
            } else {
                this.container.setSlot("slotResult", 0, 0, 0);
            }
            this.data.recipeChecked = true;
        }

        this.container.sendChanges();
    }
    
    destroy(): boolean {
        this.container.clearSlot("slotResult");
        return false;
    }

    provideRecipe(playerUid: number, allAtOnce: boolean): void {
        const recipe = Recipes.getRecipeByField(this.container, "");
        while(recipe) {
            const result = Recipes.provideRecipeForPlayer(this.container, "", playerUid);
            if (result) {
                new PlayerActor(playerUid).addItemToInventory(result.id, result.count, result.data !== -1 ? result.data : 0, result.extra || null, true);
                this.refillItems();
            }
            const newRecipe = Recipes.getRecipeByField(this.container, "");
            if (newRecipe !== recipe) {
                if (newRecipe) {
                    const result = newRecipe.getResult();
                    this.container.setSlot("slotResult", result.id, result.count, result.data, result.extra);
                } else {
                    this.container.setSlot("slotResult", 0, 0, 0);
                }
                break;
            }
            if (!allAtOnce) {
                break;
            }
        }
        this.container.sendChanges();
    }

    refillItems(): void {
        for (let i = 0; i < 9; i++) {
            const inputSlot = this.container.getSlot("slotInput" + i);
            if (inputSlot.id != 0 && inputSlot.count < Item.getMaxStack(inputSlot.id, inputSlot.data)) {
                for (let j = 0; j < 18; j++) {
                    const slot = this.container.getSlot("slot" + j);
                    if (slot.id == inputSlot.id && (slot.data == inputSlot.data || 
                        inputSlot.count == 0 && (inputSlot.data == -1 || inputSlot.data > 0 && Item.getMaxDamage(slot.id) > 0)) // allow damaged items to be replaced
                    ) {
                        inputSlot.setSlot(slot.id, inputSlot.count + 1, slot.data, slot.extra);
                        slot.count--;
                        slot.validate();
                        slot.markDirty();
                        break;
                    }
                }
            }
            inputSlot.validate();
            inputSlot.markDirty();
        }
    }

    clearGridForPlayer(playerUid: number): void {
        this.container.clearSlot("slotResult");
        let player: PlayerActor;
        for (let i = 0; i < 9; i++) {
            const inputSlot = this.container.getSlot("slotInput" + i);
            if (inputSlot.id == 0) continue;
            
            this.addItemToBuffer(inputSlot);
            if (inputSlot.count > 0) {
                player ??= new PlayerActor(playerUid);
                player.addItemToInventory(inputSlot.id, inputSlot.count, inputSlot.data, inputSlot.extra || null, true);
            }
            inputSlot.clear();
        }
    }

    addItemToBuffer(item: ItemInstance) {
        // merge stacks first, than fill empty slots
        for (let j = 0; j < 18; j++) {
            const bufferSlot = this.container.getSlot("slot" + j);
            if (bufferSlot.id == item.id && bufferSlot.data == item.data) {
                StorageInterface.addItemToSlot(item, bufferSlot);
                bufferSlot.markDirty();
                if (item.count == 0)
                    break;
            }
        }
        if (item.count == 0)
            return;
        for (let j = 0; j < 18; j++) {
            const bufferSlot = this.container.getSlot("slot" + j);
            if (bufferSlot.id == 0) {
                StorageInterface.addItemToSlot(item, bufferSlot);
                bufferSlot.markDirty();
                if (item.count == 0)
                    break;
            }
        }
    }

    getRecipeEntries(): Nullable<Recipes.RecipeEntry[]> {
        const recipe = Recipes.getRecipeByField(this.container, "");
        if (!recipe)
            return null;

        const javaEntries = recipe.getEntryCollection().toArray();
        const entryArray: Recipes.RecipeEntry[] = [];
        for (let i = 0; i < javaEntries.length; i++) {
            entryArray.push(javaEntries[i]);
        }
        return entryArray;
    }

    @BlockEngine.Decorators.ContainerEvent(Side.Server, "craft")
    onCraft(packetData: {allAtOnce: boolean}, client: NetworkClient) {
        this.provideRecipe(client.getPlayerUid(), packetData.allAtOnce);
    }

    @BlockEngine.Decorators.ContainerEvent(Side.Server, "clearGrid")
    onClearGrid(packetData: {}, client: NetworkClient) {
        this.clearGridForPlayer(client.getPlayerUid());
        this.container.sendChanges();
    }
}

MachineRegistry.registerPrototype(BlockID.rp_project_table, new ProjectTable());

StorageInterface.createInterface(BlockID.rp_project_table, {
    slots: {
        "slot^0-17": {input: true}
    }
});