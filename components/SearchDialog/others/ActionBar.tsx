import { useContext } from "react";
import { 
	FilterContext,
	ActionType 
} from "@/context/FilterContext";

function ActionBar() {

	const {
		dispatch,
		filter
	} = useContext(FilterContext)

	return (
		<section className="flex mt-4 gap-4 justify-end items-end justify-self-end transition delay-200 ease-in-out ">

			<button
				onClick={()=>dispatch({
					type: ActionType.RESETFILTER,
					payload:{
						key:"",
						value:""
					}
				})}
				className="p-2 px-4 bg-white hover:bg-chalk-dark rounded-lg text-blue-dark font-bold text-[1rem] transition-all ease-in-out delay-50"
			>
				Reset all filters
			</button>

			<button
				onClick={filter}
				className="p-2 px-4 bg-blue-main hover:bg-blue-dark rounded-lg  font-bold text-[1rem] transition-all ease-in-out delay-50"
			>
				Show Results
			</button>
			
		</section>
	)
};

export default ActionBar;