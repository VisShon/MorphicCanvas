// #region Imports
import { 
    createContext, 
    ReactNode,
    Reducer, 
    Dispatch,
    useReducer,
} from "react";

import { PrimaryFilter } from "@/constants/filters"; // Importing custom filter constants
import { useRouter } from "next/router"; // Importing useRouter for routing
// #endregion

// Define the State interface to manage the filter state
export interface State {
    primary_filter: PrimaryFilter | null,
    filterset: Map<string, string | string[]>,
}

// Define Action Types for the reducer
export enum ActionType {
    SETPRIMARY = "SETPRIMARY",
    ADDFILTER = "ADDFILTER",
    REMOVEFILTER = "REMOVEFILTER",
    RESETFILTER = "RESETFILTER",
}

// Define Action interface for dispatching actions
export interface Action {
    type: ActionType,
    payload: {
        key: string,
        value: string | string[]
    }
}

// Create a context for the filter state and actions
export const FilterContext = createContext({} as {
    state: State,
    dispatch: Dispatch<Action>,
    filter: () => void,
    checkboxHandler: (option: string, checked: boolean, value: string) => void,
    radioHandler: (option: string, checked: boolean, value: string) => void,
});

// FilterProvider component to wrap the application and provide filter context
export function FilterProvider({ children }: {
    children: ReactNode
}) {
    const router = useRouter();

    // Reducer function to handle state changes based on action types
    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case ActionType.SETPRIMARY:
                return {
                    ...state,
                    primary_filter: action.payload.key as PrimaryFilter | null
                };

            case ActionType.ADDFILTER:
                state.filterset.set(action.payload.key, action.payload.value);
                return {
                    ...state,
                };

            case ActionType.REMOVEFILTER:
                state.filterset.delete(action.payload.key);
                return {
                    ...state,
                };

            case ActionType.RESETFILTER:
                return {
                    primary_filter: null,
                    filterset: new Map<string, string | string[]>(),
                };

            default:
                return state;
        }
    }

    // Function to apply the filters and reset the filter state
    const filter = (): void => {
        const query = {
            ...Object.fromEntries(state.filterset)
        };

        dispatch({
            type: ActionType.RESETFILTER,
            payload: {
                key: "",
                value: ""
            }
        });

        router.push({
            pathname: "/",
            query
        });
    }

    // Handler for checkbox filter changes
    const checkboxHandler = (option: string, checked: boolean, value: string): void => {
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

    // Handler for radio button filter changes
    const radioHandler = (option: string, checked: boolean, value: string): void => {
        if (checked)
            dispatch({
                type: ActionType.ADDFILTER,
                payload: {
                    key: option,
                    value
                }
            });
    }

    // Initialize state and dispatch using useReducer
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
        reducer, 
        {
            primary_filter: null,
            filterset: new Map<string, string | string[]>(
                [
                    ["page", "1"],
                    ["company", "mozilla"],
                ]
            ),
        }
    );

    return (
        <FilterContext.Provider value={{
            state,
            dispatch,
            filter,
            checkboxHandler,
            radioHandler
        }}>
            {children}
        </FilterContext.Provider>
    );
}
