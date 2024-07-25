// #region Imports
import { useContext,useState,useRef,useEffect } from "react";
import { FilterContext} from "@/context/FilterContext";
import Image from "next/image";
// #endregion


function GlobalSearch({isOpen}:{isOpen:boolean}) {

    const [value, setValue] = useState<string>("");
    const searchElement = useRef<HTMLInputElement>(null);

    const {
		search
	} = useContext(FilterContext)

	useEffect(() => {
		if (searchElement.current&&isOpen) {
			searchElement.current.focus();
		}
	}, [isOpen]);

	return (
		<form
			action="#"
			onSubmit={()=>search(value.toLowerCase())} 
			className="relative flex items-center gap-2  text-grey-light font-medium mb-4 z-10 text-[1.1rem]">

			<Image
				className="absolute left-10"
				src="/search.svg"
				fetchPriority="high"
				alt="search"
				width={20} height={20}
			/>

			<input 
				className=" bg-chalk border-[2px] pl-20 focus:outline-none clear-none p-4 w-full rounded-lg  border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100 "
				value={value}
				ref={searchElement}
				autoFocus
				onChange={(e)=>setValue(e.target.value.toLowerCase())}
				type="search"
				placeholder={`Try typing "username"...`}
			/>
					
		</form>
	)
};

export default GlobalSearch;