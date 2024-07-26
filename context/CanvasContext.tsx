// #region Imports
import { 
	createContext, 
	ReactNode,
	Reducer, 
	Dispatch,
	useReducer,
	MutableRefObject,
} from "react"

import { 
	Attributes, 
	initialize ,
    selection,
	scale,
	// update,
	remove,
	render,
	zoom,
	move,
	createTextNote,
	createMemberCard
} from "@/lib/fabric"

import {
	Canvas,
	ModifiedEvent,
	FabricObject,
	util,
	Rect,
	Point,
} from "fabric"

import { 
	useEffect, 
	useRef, 
	useState 
} from "react"

// #endregion


export const CanvasContext = createContext({} as {
	canvasRef:MutableRefObject<HTMLCanvasElement|undefined>,
	fabricRef:MutableRefObject<Canvas|undefined>,
	
	shapeRef:MutableRefObject<FabricObject|undefined>,
	selectedShapeRef:MutableRefObject<FabricObject|undefined>,
	activeObjectRef:MutableRefObject<FabricObject|undefined>,

	isDrawing:boolean,
	isEditing:boolean,

	attributes:Attributes,
	canvasObjects?:Record<string,string>,
	addRect: (canvas:Canvas) => void
})


export function CanvasProvider({children}:{
    children:ReactNode
}) {

	const [canvasObjects,setCanvasObjects] = useState([{}])


	const [isDrawing,setIsDrawing] = useState(false)
	const [isEditing,setIsEditing] = useState(false)
	const [attributes,setAttributes] = useState<Attributes>({
		x:"",
		y:"",
		width:"",
		height:"",
		fill:"#000000"
	})


	const canvasRef = useRef<HTMLCanvasElement|undefined>()
	const fabricRef = useRef<Canvas|undefined>()

	const shapeRef = useRef<FabricObject|undefined>()
	const selectedShapeRef = useRef<FabricObject|undefined>()
	const activeObjectRef = useRef<FabricObject|undefined>()


	// can implement local storage key value string for storing objects state
	// implement delete with useShortcut

	

	useEffect(()=>{
		const canvas = initialize(
			fabricRef,
			canvasRef
		)

		FabricObject.prototype.transparentCorners = false;
		FabricObject.prototype.cornerColor = "#ff0000";
		FabricObject.prototype.cornerStyle = "rect";
		FabricObject.prototype.cornerStrokeColor = "#ff0000";
		FabricObject.prototype.cornerSize = 6;

		canvas.on("mouse:wheel", (event) => {
			zoom(
				event,
				canvas,
			)
		})

		canvas.on("object:scaling", (event) => {
			scale(
				event,
				setAttributes,
			)
		})

		canvas.on("selection:created", (event) => {
			selection(
				event,
				isEditing,
				setAttributes,
			)
		})

		canvas.on("object:moving", (event) => {
			move(
				event
			)
		})
 
		

		// canvas.on("object:modified", (event) => {
		// 	update(
		// 		event
		// 	)
		// })


		// window.addEventListener("keydown", (e) =>
		// 	handleKeyDown({
		// 		e,
		// 		canvas: fabricRef.current,
		// 		undo,
		// 		redo,
		// 		syncShapeInStorage,
		// 		deleteShapeFromStorage,
		// 	})
		// );

		return () => {
			canvas.dispose()
		}

	},[canvasRef])

	useEffect(()=>render(
		fabricRef,
		activeObjectRef
	),[canvasObjects])


	const addRect = async (canvas:Canvas) => {
		try{
			const rect = new Rect({
				height: 280,
				width: 200,
				fill: "#FF0000",
			})
	
			await canvas?.add(rect)
			await canvas?.requestRenderAll()
	
			console.log("added",rect)
		}catch(e){
			console.log(e)
		}
	}

	return (
		<CanvasContext.Provider value={{
            canvasRef,
			fabricRef,

			shapeRef,
			selectedShapeRef,
			activeObjectRef,

			isDrawing,
			isEditing,
			attributes,

			// canvasObjects
			addRect
		}}>
			{children}
		</CanvasContext.Provider>
	)
}