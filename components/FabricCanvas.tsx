import {MutableRefObject, useContext} from 'react'
import { CanvasContext } from '@/context/CanvasContext'

function FabricCanvas() {

	const {
		fabricRef,
		canvasRef,


	} = useContext(CanvasContext)

	return (
		<>

			<canvas 
				className="border-4 border-black bg-white rounded-lg w-[50%] h-[50%]"
				ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
			/>
		</>
	)
}

export default FabricCanvas