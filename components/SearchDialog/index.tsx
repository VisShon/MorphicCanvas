// #region Imports
import { useShortcut } from "@/hooks/useShortcut";

import { 
	useContext, 
	useState, 
	useEffect, 
	useRef 
} from "react";

import Image from "next/image";
import PrimaryButton from "./others/PrimaryButton";
import ActionBar from "./others/ActionBar";
import RadioButton from "./others/RadioButton";
import CheckBox from "./others/CheckBox";


import { FilterSet, PrimaryFilter, Filter } from "../../constants/filters";
import Backdrop from "./others/Backdrop";

import { 
	FilterContext,
	ActionType 
} from "@/context/FilterContext";

import { useMouse } from "@/hooks/useMouse";
import GlobalSearch from "../GlobalSearch";
// #endregion

export interface DialogParams {
	open?:boolean,
};


function SearchDialog({open=false}:DialogParams) {

	const {
		state,
		dispatch,
		checkboxHandler,
		radioHandler
	} = useContext(FilterContext)

	const dialogRef = useRef<HTMLDialogElement>(null)
	
	const [isOpen,setIsOpen] = useState<boolean>(false);
	const [mod,setMod] = useState<string>("Ctrl");

	useShortcut([
		["mod+K", () => setIsOpen(prev => !prev)],
		["Escape", () => {
			setIsOpen(false);
		}],
	]);

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

	},[navigator.userAgent]);


	return (
		<>

			<dialog 
				ref={dialogRef}
				className="absolute w-[40em] top-32 bg-grey-dark  p-6 rounded-2xl my-16 text-chalk text-xl overflow-hidden animate-modal shadow-lg transition-all delay-150 ease-in-out z-10 h-max"
				open={open||isOpen}
			>

				<GlobalSearch 
					isOpen={isOpen}
				/>

				<section className="flex gap-4  transition-all delay-200 ease-in-out ">
					
					<section className="w-[50%] min-w-[24rem] flex flex-col gap-2 transition-all delay-150 ease-in-out relative z-10">
						<PrimaryButton
							icon="/member.svg"
							name="Members"
							state={state}
							action={()=>{
								dispatch({
									type: ActionType.SETPRIMARY,
									payload:{
										key:"Members",
										value:""
									}
								})	
							}}
							
						/>

						<PrimaryButton
							icon="/org.svg"
							name="Companies"
							state={state}
							action={()=>{
								dispatch({
									type: ActionType.SETPRIMARY,
									payload:{
										key:"Companies",
										value:""
									}
								})
							}}
						/>

						<PrimaryButton
							icon="/option.svg"
							name="Fetch Options"
							state={state}
							action={()=>{
								dispatch({
									type: ActionType.SETPRIMARY,
									payload:{
										key:"Fetch Options",
										value:""
									}
								})
							}}
						/>

					</section>
			
					{
						state.primary_filter?
						<fieldset className="w-[50%] flex flex-col gap-2 transition-all delay-150 ease-in-out relative z-10">
							{
								(() => {
									
									const options = FilterSet[state.primary_filter!]

									if (!options) return null;

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
				className="fixed top-8 select-none flex gap-5 bg-white p-2 px-4 min-h-[2em] w-[50%] min-w-fill rounded-xl text-[1.1rem] font-semibold text-grey-super-light cursor-pointer shadow font-nunito z-0"
			>

				<Image
					fetchPriority="high"
					src="/morphic.svg"
					alt="search"
					width={100}
					height={100}
				/>

				<button
					id="CommandPallete" 
					onClick={()=>setIsOpen(true)}
					className="p-3 w-[90%] flex items-center gap-2 rounded-lg bg-chalk border-[1px] active:border-[2px] active:shadow-md active:bg-white border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100">
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
					className="p-1 font-bold font-space text-xl flex items-center gap-2 rounded-lg bg-chalk active:border-[1px] active:shadow-lg active:bg-white border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100">

					<p className="bg-concrete p-1 px-3 border-grey-super-light border-[1px] rounded-md text-grey-dark">
						{mod}
					</p>+
					<p className="bg-concrete p-1 px-3 border-grey-super-light border-[1px] rounded-md text-grey-dark">K</p>

				</button>
				
			</div>
		</>
	)
};


export default SearchDialog