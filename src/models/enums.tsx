export enum PackageType {
	Document,
	ValueGoods,
	Food,
	Fragile,
}

export function enumToArray<T>(value: any, withAutoSpace = true) {
	return Object.keys(value)
		.filter((e) => !isNaN(+e))
		.map((o) => {
			return {
				id: +o,
				name: withAutoSpace
					? value[o].replace(/([A-Z])/g, " $1").trim()
					: value[o],
			};
		});
}
