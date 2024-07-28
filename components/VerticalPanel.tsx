import { useShortcut } from "@/hooks/useShortcut"
import { CanvasContext } from "@/context/CanvasContext"
import { exportImg, save } from "@/lib/fabric"
import Image from "next/image"
import {
	useState,
	useContext
} from "react"



function VerticalPanel() {

	const { fabricRef } = useContext(CanvasContext)
	const [show,setShow] = useState<boolean>(false)
	const [images,setImages] = useState<string[]>([])

	useShortcut([
		["mod+S", () => {
			setShow(true)
			const res = exportImg(fabricRef.current!)
			setImages(res)
		}],
	])

	return (
		<>
			
			{
				show&&
				<div className="fixed right-8 top-10 p-2 select-none flex flex-col items-center gap-5 bg-white min-w-[4em] h-[92%] min-h-fill rounded-xl text-[0.85rem] font-semibold text-grey-super-light cursor-pointer shadow font-nunito group animate-modal z-10 ">
					<button 
						className="absolute -top-2 -left-2 z-20 rounded-full p-2 w-[1.8rem] h-[1.8rem] text-[0.75rem] bg-white border-2 border-slate-200 animate-modal hidden hover:shadow-md group-hover:flex items-center duration-200 trasition-all ease-in-out" 
						onClick={()=>setShow(prev=>!prev)}
						>
							X
					</button>


					<div className=" flex flex-col overflow-y-scroll gap-2">
						{
							images.map((img,i)=>(
								<Image
									key={i}
									src={img}
									height={80}
									width={80}
									alt="img"
								/>
							))
						}
					</div>
					
					<button 
						className="absolute bottom-4 p-2 bg-slate-100 text-charcoal hover:shadow-md border-[1.2px] border-charcoal transition-all delay-150 active:border-blue-main ease-in-out rounded-lg"
						onClick={()=>images?save(images):""}
					>
						Export
					</button>
				</div>
			}
		</>
	)
}

export default VerticalPanel