export const labels = {

	task: "task",
	info_markdown: "info (markdown)",
	branch_task: "branch task",
	file: "file",
	task_group: "task group",
	code: "code",
	pyhical_component_task: "physical component - task",

	research: "research",
	result: "result",
	branch_research: "branch research",
	link: "link",
	research_group: "research group",

}

interface LabelType {

	name: string
	labels: string[]

}

const taskLabel: LabelType = {
	name: "task",
	labels: ["info (markdown)", "task", "branch task", "file", "pyhical component - task", "theoretical component - task", "code"]
}
const taskBranchLabel: LabelType = {
	name: "branch task",
	labels: ["task", "task group", "result"]
}
const branchFailedLabel: LabelType = {
	name: "branch failed",
	labels: []
}

const physicalComponentTaskLabel: LabelType = {
	name: "pyhical component - task",
	labels: ["task", "pyhical component - task", "theoretical component - task"]
}
const theoreticalComponentTaskType = {
	name: "theoretical component - task",
	labels: ["task", "pyhical component - task", "theoretical component - task"]
}

// research

const researchLabel: LabelType = {
	name: "research",
	labels: ["info (markdown)", "research", "result", "branch research", "link", "file", "research group", "code"]
}

const researchBranchLabel: LabelType = {
	name: "branch research",
	labels: ["research", "research group", "result"]
}

const theoreticalComponentResearchLabel: LabelType = {
	name: "theoretical component - research",
	labels: ["research", "theoretical component - research", "physical component - research"]
}

const physicalComponentResearchLabel: LabelType = {
	name: "physical component - research",
	labels: ["research", "theoretical component - research", "physical component - research"]
}

export const labelTypes: LabelType[] = [

	taskLabel, researchLabel, physicalComponentTaskLabel, theoreticalComponentTaskType, theoreticalComponentResearchLabel,
	researchBranchLabel, taskBranchLabel, branchFailedLabel, physicalComponentResearchLabel
]
