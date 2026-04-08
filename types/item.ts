export interface Item{

	id: number,
	title: string,
	type: string,
	done: boolean,
	collapsed: boolean,
	parentId?: number,
	children?: Item[],

	archiveId?: number,


}
