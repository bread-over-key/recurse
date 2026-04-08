import { Item } from "@/types/item";
import { useState } from "react";

export default function useItem() {

	const [selectedItem, setSelectedItem] = useState<Item>()

	return {

		selectedItem,
		setSelectedItem
	}
}
