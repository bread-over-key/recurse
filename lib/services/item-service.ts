import { labelTypes } from "../label-types";

export function getTypeSubTypes(type: string) {

	return labelTypes.find(labelType => labelType.name === type)?.labels;

}
