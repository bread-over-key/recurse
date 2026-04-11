import TextField from "@mui/material/TextField";

export default function ItemEditField({ value, onChange }:
	{
		value: string,
		onChange: (e: any) => void
	}) {

	return <TextField
		label={"item name"}
		value={value ?? ""}
		onChange={onChange}
		multiline
		maxRows={10}
	></TextField>


}
