namespace RedConfig {
    export function getBool(name: string): boolean {
		return __config__.getBool(name);
	}

	export function getInt(name: string): number {
		return __config__.getNumber(name).intValue();
	}

	export function getFloat(name: string): number {
		return __config__.getNumber(name).floatValue();
	}
}