import { MutableRefObject } from "react"
import {
	Canvas,
	ModifiedEvent,
	FabricObject,
	util,
	Point,
	TPointerEventInfo,
	TEvent,
	TPointerEvent,
} from "fabric"


export interface Attributes {
	x:string,
	y:string,
	height: string,
	width: string,
	fill: string,
}

// initialize the canvas componenet
export const initialize = (
	fabricRef:MutableRefObject<Canvas|undefined>,
	canvas:MutableRefObject<HTMLCanvasElement|undefined>
) => {
	fabricRef.current = new Canvas(
		canvas.current,
		{
			width: canvas.current?.clientWidth,
			height: canvas.current?.clientHeight,
		}
	)
	return fabricRef.current
}

// selection on canvas handler
export const selection = (
	event: Partial<TEvent<TPointerEvent>> & {
		selected: FabricObject[];
	},
	isEditing: boolean,
	setAttributes:React.Dispatch<React.SetStateAction<Attributes>>
) => {

	if(isEditing) return
	if(!event.e?.target) return

	const selected:FabricObject = event?.selected[0]

	if(selected){

		const scaledWidth = selected?.scaleX ? 
		selected?.width! * selected?.scaleX : 
		selected?.width
							
		const scaledHeight = selected?.scaleY ? 
		selected?.height! * selected?.scaleY :
		selected?.height

		setAttributes({
			x:selected.getX().toString() || "",
			y:selected.getY().toString() || "",

			width:  scaledWidth.toString() || "",
			height: scaledHeight.toString() || "",

			fill: selected?.fill?.toString() || "",
		})

	}

}

// scale handler for notes and member components
export const scale = (
	event: ModifiedEvent,
	setAttributes:React.Dispatch<React.SetStateAction<Attributes>>
) => {

	const selected = event.target

	const scaledWidth = selected?.scaleX ? 
	selected?.width! * selected?.scaleX : 
	selected?.width
						
	const scaledHeight = selected?.scaleY ? 
	selected?.height! * selected?.scaleY :
	selected?.height

	setAttributes(prev => ({
		...prev,
		width: scaledWidth.toString() || "",
		height: scaledHeight.toString() || "",
	}))

}

// handle delete event
export const remove = (
	e:KeyboardEvent,
	canvas: Canvas,
  	deleteFromStorage: (obj:FabricObject) => void
) => {
	if (e.key === "Backspace" || e.key === "Delete") {

		const active = canvas.getActiveObjects()
	
		if (active?.length > 0) {
			active.forEach((obj: FabricObject) => {
				canvas.remove(obj)
			})
		}

		canvas.discardActiveObject()
		canvas.requestRenderAll()
	}
}

// render handler
export const render = (
	fabricRef:MutableRefObject<Canvas|undefined>,
	// canvasObjects:any,
	activeObject:any,
) => {
	fabricRef.current?.clear()

	// canvasObjects.forEach((data:any)=>{
	// 	util.enlivenObjects(
	// 		[data],
	// 		{
	// 			reviver: (serializedObject,instance)=>{
	// 				if (activeObject.current?.objectId === data.objectId)
	// 					fabricRef.current?.setActiveObject(instance as FabricObject)

	// 				fabricRef.current?.add(instance as FabricObject)
	// 			}
	// 		}
	// 	)
		
	// })

	fabricRef.current?.renderAll()
	
}

//Zoom handler
export const zoom = (
	event: TPointerEventInfo<WheelEvent>,
	canvas:Canvas
) => {
	
	event.e.preventDefault()

	const delta = event?.e.deltaY
	let zoom = canvas.getZoom()

	const min = 0.5
	const max = 1
	const step = 0.01

	zoom = Math.min(
				Math.max(
					min,
					zoom + delta * step
				),
				max
			)
	

	canvas.zoomToPoint( 
		new Point(
			event.e.offsetX,
			event.e.offsetY
		),
		zoom
	)

	event.e.stopPropagation()
}

// restric moement within canvas
export const move = (
	event:ModifiedEvent
) => {
	if(!event.target) return
	const canvas = event.target.canvas!

	event.target.setCoords()

	if (event.target.left)
		event.target.left = Math.max(
			0,
			Math.min(
			event.target.left,
				canvas.width - event.target.getScaledWidth()
			)
		)
	
	if (event.target.top)
		event.target.top = Math.max(
			0,
			Math.min(
				event.target.top,
				canvas.height - event.target.getScaledHeight()
			)
		)
}


export const createTextNote = () => {}


export const createMemberCard = () => {}



// // update shape in storage when asset is modified
// export const update = (
// 	event: ModifiedEvent,
// ) => {
// 	if(!event.target) return
// 	syncLocal(event.target)
// }

// // update shape in storage when path is created when in freeform mode
// export const handlePathCreated = ({
// 	options,
// 	syncLocal,
//   }: CanvasPathCreated) => {
// 	// get path object
// 	const path = options.path;
// 	if (!path) return;
  
// 	// set unique id to path object
// 	path.set({
// 	  objectId: uuid4(),
// 	});
  
// 	// sync shape in storage
// 	syncLocal(path);
//   };
  