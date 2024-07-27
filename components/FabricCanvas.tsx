import {MutableRefObject, useContext, useEffect} from "react"
import { CanvasContext } from "@/context/CanvasContext"
import html2canvas from "html2canvas"
import {FabricImage} from "fabric"


function FabricCanvas({users}:{users:any}) {

	const {
		fabricRef,
		canvasRef,
		addRect
	} = useContext(CanvasContext)

	useEffect(()=>{
		(async()=>{
			const elements = document.getElementsByName("nameCard")
			elements.forEach(async (element) => {
				if (element) {
					const canvas = await html2canvas(element,{
						allowTaint: true,
						useCORS:true,
					})
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
		})()
	}, [users])

	  

	return (
		<>
			<canvas
				ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
			/>
		</>
	)
}

export default FabricCanvas