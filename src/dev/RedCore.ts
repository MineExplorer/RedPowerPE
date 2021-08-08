ModAPI.registerAPI("RedCore", {
	Machine: MachineRegistry,
	SmelterRecipes: SmelterRecipes,
	World: WorldDecorator,
	Config: RedConfig,
	Integration: IntegrationAPI,
	requireGlobal: function(command: string) {
		return eval(command);
	}
});

Logger.Log("RedCore API shared.", "API");