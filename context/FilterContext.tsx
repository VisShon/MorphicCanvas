// #region Imports
import { 
    createContext, 
    ReactNode,
    Reducer, 
    Dispatch,
    useReducer,
} from "react"

import { PrimaryFilter } from "@/constants/filters"
import { useRouter } from "next/router"
import { NextURL } from "next/dist/server/web/next-url"
// #endregion
export interface State {
	primary_filter:PrimaryFilter|null,
	filterset: Map<string,string|string[]>,
};

export enum ActionType {
	SETPRIMARY="SETPRIMARY",
	ADDFILTER="ADDFILTER",
	REMOVEFILTER="REMOVEFILTER",
	RESETFILTER="RESETFILTER",
};

export interface Action {
	type:ActionType,
	payload: {
		key: string,
		value:string|string[]
	}
};


export const FilterContext = createContext({} as {
	state:State,
	dispatch:Dispatch<Action>,
	search:(value:string)=>void,
	filter:()=>void,
	checkboxHandler:(option:string,checked:boolean,value:string)=>void,
	radioHandler:(option:string,checked:boolean,value:string)=>void,
})


export function FilterProvider({children}:{
    children:ReactNode
}) {

	const router = useRouter()
	
    const reducer = (state: State, action: Action) => {

		switch (action.type) {

			case ActionType.SETPRIMARY:
				return {
					...state,
					primary_filter:action.payload.key as PrimaryFilter|null
				}

			case ActionType.ADDFILTER:
				state.filterset.set(action.payload.key,action.payload.value)
				return {
					...state,
				}

			case ActionType.REMOVEFILTER:
				state.filterset.delete(action.payload.key)
				return {
					...state,
				}
		
			case ActionType.RESETFILTER:
				return {
					primary_filter:null,
					filterset:new Map<string,string|string[]>(),
					company:null,
					fetchsize:0
				}
			default:
				return state
		}
	};


	const filter = ():void => {
		const query = {
			primary_filter:state.primary_filter||"",
			...Object.fromEntries(state.filterset)
		}

		dispatch({
			type: ActionType.RESETFILTER,
			payload:{
				key:"",
				value:""
			}
		})
		
		router.push({
			pathname:"/",
			query
		})
		
	}

	const search = (value:string):void => {
		const url = new NextURL(`/search`)
		url.searchParams.set("value",encodeURIComponent(value))
		router.push(url)
	}


	const checkboxHandler = (option:string,checked:boolean,value:string):void => {
		const currentValues = state.filterset.get(option) as string[] || [];

		if (checked) {
			if (!currentValues.includes(value)) {
				dispatch({
					type: ActionType.ADDFILTER,
					payload: {
						key: option,
						value: [...currentValues, value]
					}
				});
			}
		} else {
			const filteredValues = currentValues.filter(item => item !== value);
			dispatch({
				type: ActionType.ADDFILTER,
				payload: {
					key: option,
					value: filteredValues
				}
			});
		}
	}

	const radioHandler = (option:string,checked:boolean,value:string):void => {
		console.log(option,checked,value);
		if(checked)
			dispatch({
				type: ActionType.ADDFILTER,
				payload:{
					key:option,
					value
				}
			})
	}

	

	const [state, dispatch] = useReducer<Reducer<State,Action>>(
		reducer, 
		{
			primary_filter: null,
			filterset: new Map<string,string|string[]>([["fetch_options","50"],["companies","google"],["members",["about"]]]),
		}
	);

	return (
		<FilterContext.Provider value={{
			state,
            dispatch,
			search,
			filter,
			checkboxHandler,
			radioHandler
		}}>
			{children}
		</FilterContext.Provider>
	)
}