import {MutableRefObject, useContext, useEffect} from "react"
import { CanvasContext } from "@/context/CanvasContext"
import { createNameCard } from "@/lib/namecard"


function FabricCanvas() {

	const {
		canvasRef,
	} = useContext(CanvasContext)

	return (
		<>
			<canvas
				ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
			/>
		</>
	)
}

export default FabricCanvas