// #region Imports
import Image from "next/image"
// #endregion

function Backdrop() {
	return(
		<>
			<div className="flex ml-4 flex-col w-[66%] z-10 gap-4 text-chalk text-[1.1rem] font-normal selection-none transition delay-200 ease-in-out">

				<section className="flex items-center gap-3 bg-grey-dark p-4 rounded-lg w-[100%]  border-2 border-grey-light shadow-md ">
					<Image
						className="rounded-full bg-charcoal w-[3rem] h-[3rem] p-3"
						src="/bulb.svg"
						width={22} height={22}
						alt="suggestion"
					/>
					<p className="w-[85%] text-[1.1rem]">
						Search with specific filters to find more ! Meta + Click for going to github.
					</p>
				</section>
				
			</div>

		
			<Image
				className="absolute bottom-0 right-0 object-cover z-0 transition delay-200 ease-in-out"
				src="/command-search-bg.svg"
				fetchPriority="high"
				alt="command-search-bg"
				width={400} 
				height={500}
			/>

		</>
	)
}

export default Backdrop