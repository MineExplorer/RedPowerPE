interface OldRecipeContents {
    icon: Tile | number;
    description?: string;
    params?: UI.BindingsSet;
    drawing?: UI.DrawingElements[];
    elements: {
        [key: string]: Partial<UI.UIElement>;
    };
}

interface OldRecipeTypeProperty {
    title?: string;
    contents: OldRecipeContents;
    recipeList?: RecipePattern[];
    getList?: (id: number, data: number, isUsage: boolean) => RecipePattern[];
    getAllList?: () => RecipePattern[];
    onOpen?: (elements: java.util.HashMap<string, UI.Element>, recipe: RecipePattern) => void;
}

declare class OldRecipeType extends RecipeType {
    private readonly recipeList;
    private readonly funcs;
    constructor(obj: OldRecipeTypeProperty);
    getAllList(): RecipePattern[];
    getList(id: number, data: number, isUsage: boolean): RecipePattern[];
    onOpen(elements: java.util.HashMap<string, UI.Element>, recipe: RecipePattern): void;
}

interface RecipeTE {
    type: "grid" | "line" | "not_shape";
    recipe: any;
    ingridients: {
        [char: string]: ItemInstance;
    };
    result: ItemInstance;
}

declare class Core {
    static registerRecipeType(key: string, obj: OldRecipeTypeProperty): void;
    static getIOFromTEWorkbench(recipe: RecipeTE, cols: number): RecipePattern;
    static registerTEWorkbenchRecipeType(sid: string, contents: OldRecipeContents, recipes: RecipeTE[]): void;
    static removeDuplicate: (item1: ItemInfo, index: number, array: ItemInfo[]) => boolean;
    static getName(id: number, data?: number): string;
    static addList(id: number, data: number, type?: "block" | "item"): void;
    static addListByData(id: number, data: number, type?: "block" | "item"): void;
    static openRecipePage(key: string, container: UI.Container): void;
    static putButtonOnNativeGui(screen: string, key: string): void;
}

interface ItemInfo {
    id: number;
    data: number;
    name: string;
    type: "block" | "item";
}

declare class ItemList {
    private static list;
    static get(): ItemInfo[];
    static getItemType(id: number): "block" | "item";
    static addToList(id: number, data: number, type?: "block" | "item"): void;
    static addToListByData(id: number, data: number | number[], type?: "block" | "item"): void;
    static addVanillaItems(): void;
    static addModItems(): void;
    static getName(id: number, data?: number): string;
    static setup(): void;
}

declare interface LiquidInstance {
    liquid: string;
    amount: number;
}

declare interface RecipePattern {
    input?: ItemInstance[];
    output?: ItemInstance[];
    inputLiq?: LiquidInstance[];
    outputLiq?: LiquidInstance[];
    [key: string]: any;
}

declare abstract class RecipeType {

    constructor(name: string, icon: number | Tile, content: {params?: UI.BindingsSet, drawing?: UI.DrawingSet, elements: {[key: string]: object}});

    setDescription(text: string): this;
    setTankLimit(limit: number | {[key: string]: number}): this;

    abstract getAllList(): RecipePattern[];
    getList(id: number, data: number, isUsage: boolean): RecipePattern[];
    onOpen(elements: java.util.HashMap<string, UI.Element>, recipe: RecipePattern): void;

}

declare class RecipeTypeRegistry {
    public register(key: string, recipeType: RecipeType): void;
    public openRecipePage(key: string): void;
}