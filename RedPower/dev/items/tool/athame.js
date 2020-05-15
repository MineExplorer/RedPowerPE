IDRegistry.genItemID("athame");
Item.createItem("athame", "Athame", {name: "athame", meta: 0}, {stack: 1});

ToolAPI.registerSword(ItemID.athame, {level: 0, durability: 50, damage: 3}, {
	damage: 0,
	onAttack: function(item, mob){
		this.damage = Entity.getType(mob) == Native.EntityType.ENDERMAN ? 17 : 0;
		return false;
	}
});

Recipes.addShaped({id: ItemID.athame, count: 1, data: 0}, [
	"a",
	"b"
], ['a', ItemID.ingotSilver, 0, 'b', 280, 0]);