// #region Imports
import { useEffect } from "react"
// #endregion

export type KeyBinding = {
	combination:string, 
	handler: (event: Event) => void,
}


export function useMouse( keybinding: KeyBinding){
	useEffect(() => {
		const {combination, handler} = keybinding
		document.documentElement.addEventListener(combination, (event)=>handler(event))
		return () => document.documentElement.removeEventListener("keydown", handler)
	},[keybinding])
}