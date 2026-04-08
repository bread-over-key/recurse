interface LabelType {

	name: string
	labels: string[]

}

const taskLabel: LabelType = {
	name: "task",
	labels: ["info", "task", "branch", "file", "task group"]
}


const taskGroupLabel: LabelType = {
	name: "task group",
	labels: ["info", "task", "branch", "file", "task group"]
}

const researchLabel: LabelType = {
	name: "research",
	labels: ["info", "research", "result", "branch", "link", "file", "research group"]
}

const researchGroupLabel: LabelType = {
	name: "research group",
	labels: ["info", "research", "result", "branch", "link", "file", "research group"]
}

export const labelTypes: LabelType[] = [

	taskLabel, researchLabel, taskGroupLabel, researchGroupLabel

]
