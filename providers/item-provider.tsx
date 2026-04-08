"use client"
import useItemSelection from "@/hooks/useItemSelection";
import { createContext, useContext } from "react";

const ItemContext = createContext<ReturnType<typeof useItemSelection> | undefined>(undefined);

export function ItemProvider(
	{ children }: { children: React.ReactNode }) {

	const itemHook = useItemSelection();
	return <ItemContext.Provider value={itemHook} >
		{children}
	</ItemContext.Provider>

}

export default function useItemContext() {

	const itemContext = useContext(ItemContext);

	return {
		itemContext
	}

}
