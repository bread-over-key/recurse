import { Item } from "@/types/item";
import { useState } from "react";

export default function useItem() {

	const [selectedItem, setSelectedItem] = useState<Item>()
	const [reparent, setReparent] = useState(false)

	return {

		selectedItem,
		setSelectedItem,
		reparent, 
		setReparent
	}
}
