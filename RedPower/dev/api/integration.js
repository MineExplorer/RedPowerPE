var IntegrationAPI = {
	registerPlant: function(id){
		plants.push(id);
	},
	registerSeeds: function(item, block){
		seeds[item] = block;
	}
}