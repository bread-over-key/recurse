interface LabelType {

	name: string
	labels: string[]

}

const taskLabel: LabelType = {
	name: "task",
	labels: ["info (markdown)", "task", "branch task", "file", "task group", "code"]
}
const taskBranchLabel: LabelType = {
	name: "branch task",
	labels: ["task", "task group", "result"]
}
const branchFailedLabel: LabelType = {
	name: "branch failed",
	labels: []
}

const taskGroupLabel: LabelType = {
	name: "task group",
	labels: ["task", "task group"]
}

// research

const researchLabel: LabelType = {
	name: "research",
	labels: ["info (markdown)", "research", "result", "branch research", "link", "file", "research group", "code"]
}

const researchBranchLabel: LabelType = {
	name: "branch research",
	labels: ["research",  "research group", "result"]
}

const researchGroupLabel: LabelType = {
	name: "research group",
	labels: ["research", "research group"]
}

export const labelTypes: LabelType[] = [

	taskLabel, researchLabel, taskGroupLabel, researchGroupLabel,
	researchBranchLabel, taskBranchLabel, branchFailedLabel
]
