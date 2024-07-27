
import { useContext, useRef } from "react"
import { CanvasContext } from "@/context/CanvasContext"
import {useMouse} from "@/hooks/useMouse"
import { BiCopy, BiPaste, BiCut, BiTrashAlt } from "react-icons/bi"
import { FiType } from "react-icons/fi"
import { 
	paste,
	copy,
	remove,
	addText,
	changeTextSize
 } from "@/lib/fabric"


function TextMenu() {

	const menuRef = useRef<HTMLDivElement|null>(null)

	const { 
		fabricRef, 
		showMenu, 
		setShowMenu,
		attributes
	} = useContext(CanvasContext)

	useMouse({
		combination:"mousedown", 
		handler: (e) => {
			if(
				!fabricRef.current?._activeObject&&
				!menuRef.current?.contains(e.target as Node)
			)
				setShowMenu(false)
		},
	})

	return (
		<>
			{
				showMenu&&
				<div 
					className="fixed flex items-center bg-gray-800 text-white rounded-lg shadow-md animate-modal transition-all delay-150 ease-in-out z-60"
					style={{
						left:`${attributes.x}px`,
						top:`${attributes.y}px`
					}}
					ref={menuRef}
				>

					<select 
						className="bg-gray-800 border-none text-white hover:bg-gray-700 active:bg-gray-600 disabled:bg-gray-400 disabled:text-gray-200 rounded-l-lg p-2" 
						onChange={
							(e)=>changeTextSize(fabricRef.current!,e.target.value)
						}
					>
						<option value="SMALL">Small</option>
						<option value="MEDIUM">Medium</option>
						<option value="LARGE">Large</option>
					</select>

					<button
						onClick={(e)=>
							addText(
								e,
								fabricRef.current!
							)
						} 
						className="px-4 p-2 transition-all delay-150 ease-in-out hover:bg-gray-700 active:bg-gray-600 disabled:bg-gray-400 rounded" 
					>
						<FiType size={20} />
					</button>

					<button
						onClick={()=>copy(fabricRef.current!)} 
						className="px-4 p-2 transition-all delay-150 ease-in-out hover:bg-gray-700 active:bg-gray-600 disabled:bg-gray-400 rounded" 
					>
						<BiCopy size={20} />
					</button>

					<button
						onClick={()=>paste(fabricRef.current!)} 
						className="px-4 p-2 transition-all delay-150 ease-in-out hover:bg-gray-700 active:bg-gray-600 disabled:bg-gray-400 rounded" 
					>
						<BiPaste size={20} />
					</button>

					<button
						onClick={()=>{
							copy(fabricRef.current!)
							remove(fabricRef.current!)
						}} 
						className="px-4 p-2 transition-all delay-150 ease-in-out hover:bg-gray-700 active:bg-gray-600 disabled:bg-gray-400 rounded" 
					>
						<BiCut size={20} />
					</button>

					<button
						onClick={()=>remove(fabricRef.current!)} 
						className="pl-4 p-2 transition-all delay-150 ease-in-out px-4 hover:bg-purple-600 active:bg-purple-500 disabled:bg-gray-400 rounded bg-purple-700 " 
					>
						<BiTrashAlt size={20} />
					</button>
				</div>
			}
		</>
	)
}

export default TextMenu