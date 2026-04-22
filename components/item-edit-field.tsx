import useItemContext from "@/providers/item-provider";
import TextField from "@mui/material/TextField";

export default function ItemEditField({ value, onChange }:
	{
		value: string,
		onChange: (e: any) => void
	}) {

	const { itemContext } = useItemContext();

	return <TextField
		label={"item name"}
		value={value ?? ""}
		onChange={onChange}
		multiline
		maxRows={10}
		sx={{border: itemContext?.selectedItem ? '1px solid #c99e28' : 'none'}}
	></TextField>


}
