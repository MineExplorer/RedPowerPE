LIBRARY({
	name: "VanillaRecipe",
	version: 1,
	shared: false,
	api: "CoreEngine"
});

let MOD_PREFIX = "mod_";

let VanillaRecipe = {
	resource_path: null,
	
	setResourcePath: function(path) {
		this.resource_path = path + "/definitions/recipe/";
		this.resetRecipes();
	},

	getFileName(recipeName) {
		return MOD_PREFIX + recipeName + ".json";
	},
	
	getFilePath(recipeName) {
		return this.resource_path + this.getFileName(recipeName);
	},

	resetRecipes: function() {
		let files = FileTools.GetListOfFiles(this.resource_path, "json");
		for (let i in files) {
			let file = files[i];
			if (file.getName().startsWith(MOD_PREFIX)) {
				file.delete();
			}
		}
	},

	getNumericID: function(stringID) {
		let stringArray = stringID.split(":");
		if (stringArray.length == 1) {
			return VanillaItemID[stringID] || VanillaBlockID[stringID];
		}
		if (stringArray[0] == "item") return ItemID[stringArray[1]];
		if (stringArray[0] == "block") return BlockID[stringArray[1]];
		return false;
	},
	
	convertToVanillaID: function(stringID) {
		let newID = "";
		if (!this.getNumericID(stringID)) {
			Logger.Log("Invalid vanilla recipe entry id " + stringID, "ERROR");
			return null;
		}
		stringID = stringID.replace(":", "_");
		let wasLowerCase = false;
		for (let i = 0; i < stringID.length; i++) {
			if (stringID[i] == stringID[i].toUpperCase()) {
				if (wasLowerCase && stringID[i] != "_") newID += "_";
				newID += stringID[i].toLowerCase();
				wasLowerCase = false;
			} else {
				newID += stringID[i];
				wasLowerCase = true;
			}
		}
		return "minecraft:" + newID;
	},
	
	generateBlankFile: function(recipeName) {
		let path = __packdir__ + "assets/definitions/recipe/" + this.getFileName(recipeName);
		FileTools.WriteText(path, '{"type": "crafting_shaped", "tags": []}');
	},
	
	generateJSONRecipe: function(name, obj) {
		this.generateBlankFile(name);
		FileTools.WriteJSON(this.getFilePath(name), obj, true);
	},
	
	addCraftingRecipe: function(name, obj) {
		obj.type = "crafting_" + obj.type;
		if (!obj.tags) obj.tags = [ "crafting_table" ];
		
		let items = obj.key || obj.ingredients;
		for (let i in items) {
			let item = this.convertToVanillaID(items[i].item);
			items[i].item = item;
			if (!item) return;
		}
		obj.result.item = this.convertToVanillaID(obj.result.item);
		if (!obj.result.item) return;
		
		this.generateJSONRecipe(name, obj);
	},
	
	addStonecutterRecipe: function(name, obj) {
		obj.type = "shapeless";
		obj.tags = [ "stonecutter" ];
		obj.priority = obj.priority || 0;
		this.addCraftingRecipe(name, obj);
	},
	
	addFurnaceRecipe: function(name, obj) {
		obj.type = "furnace_recipe";
		obj.input.item = this.convertToVanillaID(obj.input.item);
		obj.output.item = this.convertToVanillaID(obj.output.item);
		if (obj.input.item && obj.output.item) {
			this.generateJSONRecipe(name, obj);
		}
	}
}

EXPORT("VanillaRecipe", VanillaRecipe);
