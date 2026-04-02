const RedCore = {
	Machine: MachineRegistry,
	SmelterRecipes: SmelterRecipes,
	World: WorldDecorator,
	Integration: IntegrationAPI,
	requireGlobal: function(command: string) {
		return eval(command);
	}
}

ModAPI.registerAPI("RedCore", RedCore);

Logger.Log("RedCore API shared.", "API");