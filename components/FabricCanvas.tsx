import {MutableRefObject, useContext} from "react"
import { CanvasContext } from "@/context/CanvasContext"
import NameCard from "./NameCard"
import html2canvas from "html2canvas"
import {FabricImage} from "fabric"


function FabricCanvas({users}:{users:any}) {

	const {
		fabricRef,
		canvasRef,
		addRect
	} = useContext(CanvasContext)

	const convertToImage = async() => {
		const elements = document.getElementsByName("nameCard")
		elements.forEach(async (element) => {
			if (element) {
				const canvas = await html2canvas(element)
				const imgData = canvas.toDataURL('image/png')
				var img = await FabricImage.fromURL(imgData,{},{
					left: 100,
					top: 100,
					angle: 0,
					opacity: 1
				})
				fabricRef.current?.add(img);
				fabricRef.current?.renderAll();
			}
		})
	}
	  
	  

	return (
		<>
			<button 
				className="border-2 p-4 bg-white ml-4"
				onClick={convertToImage}>
				Convert to Image
			</button>

			{users.map((user:any,i:number)=>
				<NameCard
					avatar_url={user.avatar_url}
					name={user.name}
					login={user.login}
					bio={user.bio}
					email={user.email}
					followers={user.followers}
					public_repos={user.public_repos}
					public_gists={user.public_gists}
				/>
			)}

			<canvas
				// className="border-4 border-black bg-white rounded-lg "
				ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
			/>
		</>
	)
}

export default FabricCanvas