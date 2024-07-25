// #region Imports
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { State } from "@/context/FilterContext";
import { useEffect, useState } from "react";
// #endregion


export interface PrimaryButtonParams {
	action:()=>void,
	icon:string | StaticImport,
	name:string,
	state:State
};

function PrimaryButton({action,icon,name,state}:PrimaryButtonParams) {
	
	const isSelected = (state.primary_filter===name)
	const ButtonVariants = {
		select: "bg-blue-main border-blue-main",
		deselect: "bg-grey-light border-grey-light"
	};

	const namekey= name!.toLowerCase()
						.replace(/\s/g, "_")

	return (
		<button 
			className={` ${ButtonVariants[isSelected?"select":"deselect"]} p-4 h-[4rem] flex justify-between items-center rounded-lg w-full font-medium border-2 hover:border-blue-main  transition-all ease-in-out delay-50 text-[1.1rem]`}
			onClick={action}
		>

			<div className="flex items-center gap-4">
				<Image
					className="bg-white rounded-full object-fill p-3"
					src={icon}
					fetchPriority="high"
					width={50}
					height={50}
					alt={name}
				/>
				<p>{name}</p>
			</div>


			<section className="flex w-[20%] justify-end">
				{
					!isSelected&&state.filterset.size>0&&
					<p className="rounded-full bg-blue-light w-max-content px-4 ">
						{
							Array.isArray(state.filterset.get(namekey))?
							state.filterset.get(namekey)?.length:
							state.filterset.get(namekey)
						}
					</p>
				}
				<Image
					src={"/arrowRight.svg"}
					fetchPriority="high"
					width={20}
					height={20}
					alt={name}
				/>
			</section>

		</button>
	)
};


export default PrimaryButton;