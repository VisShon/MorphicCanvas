// #region Imports
import { State } from "@/context/FilterContext";
import Image from "next/image";
// #endregion

export interface CheckBoxParams {
	name:string,
	value:string,
	state:State,
	action:Function,
};

function CheckBox({
	name,
	action,
	value,
	state
}:CheckBoxParams) {

	const namekey= state
						.primary_filter!
						.toLowerCase()
						.replace(/\s/g, "_")

	return (
		<label 
			className="bg-grey-light h-full p-3 flex justify-start items-center rounded-lg w-full  hover:bg-sea-green transition-all ease-in-out delay-50 text-[1.1rem]"
            htmlFor={name} 
        >

			<div className="relative flex items-center mr-4 rounded-full cursor-pointer">

				<input 
					className={`before:content[""] peer relative h-7 w-7 cursor-pointer appearance-none rounded-lg border border-gray-900/10 bg-green-light p-0 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-light before:opacity-0 before:transition-opacity hover:before:opacity-0`}
                    type="checkbox"
					checked={state.filterset.get(namekey)?.includes(value)} 
					onChange={(e)=>action(
						state.primary_filter?.toLowerCase().replace(/\s/g, "_"),
						e.target.checked,
						value
					)}
					id={name} 
                />

				<span
					className="absolute transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 ">
					<Image
						src="/tick.svg"
						fetchPriority="high"
						width={100}
						height={100}
						alt={name}
					/>
				</span>


			</div>

			<p>
				{name}
			</p>

		</label>
	)
};

export default CheckBox;