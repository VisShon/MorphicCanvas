// #region Imports
import { useShortcut } from "@/hooks/useShortcut"
import { useMouse } from "@/hooks/useMouse"

import { 
	useContext, 
	useState, 
	useEffect, 
	useRef 
} from "react"

import Image from "next/image"
import PrimaryButton from "./others/PrimaryButton"
import ActionBar from "./others/ActionBar"
import RadioButton from "./others/RadioButton"
import CheckBox from "./others/CheckBox"


import { FilterSet } from "../../constants/filters"
import Backdrop from "./others/Backdrop"

import { 
	FilterContext,
	ActionType 
} from "@/context/FilterContext"

import GlobalSearch from "../GlobalSearch"
import { Filter } from "../../constants/filters"
import { PrimaryFilter } from "@/constants/filters"
// #endregion

export interface DialogParams {
	open?:boolean,
	users:any[]
}


function SearchDialog({open=false,users}:DialogParams) {

	const {
		state,
		dispatch,
		checkboxHandler,
		radioHandler
	} = useContext(FilterContext)

	const dialogRef = useRef<HTMLDialogElement>(null)
	
	const [isOpen,setIsOpen] = useState<boolean>(false)
	const [mod,setMod] = useState<string>("Ctrl")

	useShortcut([
		["mod+K", () => setIsOpen(prev => !prev)],
		["Escape", () => {
			setIsOpen(false)
		}],
	])

	useMouse({
		combination:"mousedown", 
		handler: (e) => {
			if(!dialogRef.current?.contains(e.target as Node))
				setIsOpen(false)
		},
	})


	useEffect(()=>{
		if( 
			typeof window !== "undefined" 
			? navigator.userAgent.toUpperCase().indexOf("MAC") >= 0
			:false
		) setMod("⌘")

	},[navigator.userAgent])


	return (
		<>

			<dialog 
				ref={dialogRef}
				className="absolute w-[40em] top-32 bg-grey-dark  p-6 rounded-2xl my-16 text-chalk text-xl overflow-hidden animate-modal shadow-lg transition-all delay-150 ease-in-out z-10 h-max"
				open={open||isOpen}
			>

				<GlobalSearch 
					isOpen={isOpen}
					users={users}
				/>

				<section className="flex gap-4  transition-all delay-200 ease-in-out ">
					
					<section className="w-[50%] min-w-[24rem] flex flex-col gap-2 transition-all delay-150 ease-in-out relative z-10 max-h-[12em]">
						{
							Object.keys(FilterSet).map((filter:string,i:number)=>(
								<PrimaryButton
									key={i}
									icon={FilterSet[filter as PrimaryFilter].img}
									name={filter}
									state={state}
									action={()=>{
										dispatch({
											type: ActionType.SETPRIMARY,
											payload:{
												key:filter,
												value:""
											}
										})	
									}}
									
								/>
							))
						}
					</section>
			
					{
						state.primary_filter?
						<fieldset className="w-[50%] flex flex-col gap-2 transition-all delay-150 ease-in-out relative z-10 max-h-[12em] overflow-y-scroll">
							{
								(() => {
									
									const options = FilterSet[state.primary_filter!]

									if (!options) return null

									return(
										options.fieldset.map((field: { filter: string, value: string }, id: number) => (
											options.type === "radio" ? (
												<RadioButton
													key={id}
													name={field.filter}
													state={state}
													value={field.value}
													action={radioHandler}
												/>
											) : (
												<CheckBox
													key={id}
													name={field.filter}
													state={state}
													value={field.value}
													action={checkboxHandler}
												/>
											)
										))
									)
								})()
							}
						</fieldset>:
						<Backdrop/>
					}
					
				</section>

				{state.primary_filter&&<ActionBar/>}
				
			</dialog>


			<div
				className="fixed left-8 top-8 select-none flex gap-5 bg-white p-2 px-4 w-[40%] min-w-fill rounded-xl text-[1rem] font-semibold text-grey-super-light cursor-pointer shadow font-nunito z-50"
			>

				<Image
					fetchPriority="high"
					src="/morphic.svg"
					alt="search"
					width={80}
					height={80}
				/>

				<button
					id="CommandPallete" 
					onClick={()=>setIsOpen(true)}
					className="p-3 py-1 w-[90%] flex items-center gap-2 rounded-lg bg-chalk border-[1px] active:border-[2px] active:shadow-md active:bg-white border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100">
					<Image
					 	fetchPriority="high"
						src="/search.svg"
						alt="search"
						width={20}
						height={20}
					/>

					<p>
						Type to begin search
					</p>
					
				</button>

				<button
					onClick={()=>setIsOpen(true)}
					className=" font-bold font-space text-xl flex items-center gap-2 rounded-lg bg-chalk active:border-[1px] active:shadow-lg active:bg-white border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100">

					<p className="bg-concrete  px-3 border-grey-super-light border-[1px] rounded-md text-grey-dark">
						{mod}
					</p>+
					<p className="bg-concrete  px-3 border-grey-super-light border-[1px] rounded-md text-grey-dark">K</p>

				</button>
				
			</div>
		</>
	)
}


export default SearchDialog