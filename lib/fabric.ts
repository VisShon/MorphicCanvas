// #region Imports
import { MutableRefObject } from "react"
import {
	Canvas,
	ModifiedEvent,
	FabricObject,
	Point,
	TPointerEventInfo,
	TEvent,
	TPointerEvent,
	Textbox,
	util
} from "fabric"
// #endregion

export interface Attributes {
	x:string,
	y:string,
	height: string,
	width: string,
	fill: string,
}

export const initialize = (
	fabricRef:MutableRefObject<Canvas|undefined>,
	canvas:MutableRefObject<HTMLCanvasElement|undefined>
) => {
	fabricRef.current = new Canvas(
		canvas.current,
		{
			width: 1850,
			height: 1100,
			backgroundColor: "#FFFFFF",
			zoom: 0.5,
		}
	)

	console.log(fabricRef.current)
	return fabricRef.current
}

export const selection = (
	event: Partial<TEvent<TPointerEvent>> & {
		selected: FabricObject[]
	},

	setAttributes:React.Dispatch<React.SetStateAction<Attributes>>
) => {

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

export const render = (
	fabricRef:MutableRefObject<Canvas|undefined>,
) => {
	fabricRef.current?.clear()
	fabricRef.current?.renderAll()
}

export const zoom = (
	event: TPointerEventInfo<WheelEvent>,
	canvas:Canvas
) => {
	
	event.e.preventDefault()

	const delta = event?.e.deltaY
	let zoom = canvas.getZoom()

	canvas.zoomToPoint( 
		new Point(
			event.e.offsetX,
			event.e.offsetY
		),
		Math.min( 
			Math.max(0.2, zoom + delta * 0.01), 
			1
		)
	)

	event.e.stopPropagation()
}

export const remove = (
	canvas: Canvas,
) => {
	const active = canvas.getActiveObjects()

	if (active?.length > 0) {
		active.forEach((obj: FabricObject) => {
			canvas.remove(obj)
		})
	}

	canvas.discardActiveObject()
	canvas.requestRenderAll()
}

export const copy = (
	canvas: Canvas,
) => {
	const active = canvas.getActiveObjects()
	
	if (active?.length > 0) {
		const objectArray = active.map((object)=> object.toObject())
		localStorage.setItem("copied",JSON.stringify(objectArray))
	}
}

export const paste = (
	canvas: Canvas,
) => {
	
	const copiedData = localStorage.getItem("copied")

	if(copiedData){

		try{
			const objectArray = JSON.parse(copiedData)
			util.enlivenObjects(
				objectArray,
				{
					reviver: (record,instance) => {

						const obj = instance as FabricObject

						obj.set({
							left:obj.left+20,
							top:obj.top+20,
						})
						
						canvas.add(obj)
						canvas.renderAll()
					}
				}
			)
			canvas.renderAll()
		}
		catch(e){
			console.log(e)
		}

	}
}

export const keyDown = (
	event: KeyboardEvent,
	canvas: Canvas,

) => {

	if ((event?.ctrlKey || event?.metaKey) && event.key === "c")
		copy(canvas)

	if ((event?.ctrlKey || event?.metaKey) && event.key === "v")
		paste(canvas)

	if ((event?.ctrlKey || event?.metaKey) && event.key === "x"){
		copy(canvas)
		remove(canvas)
	}

	if (event.key === "Backspace" || event.key === "Delete")
		remove(canvas)

}

export const exportImg = (
	canvas:Canvas
) => {
	const active = canvas.getActiveObjects()
	
	let images:string[] = active.map((object)=>{
		return object.toDataURL()
	})

	return images
}

export const addText = (
	event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	canvas:Canvas
) => {
	const box = new Textbox("text",{
		left:event.clientX,
		top:event.clientY,
		width: 200,
		fontSize:18,
		fill:"#20282D",
		fontFamily:"Nunito"
	})
	canvas.add(box)
	canvas.renderAll()
}

export const changeTextSize = (
	canvas:Canvas,
	size:string
) => {
	const active = canvas.getActiveObjects()
	active.forEach((object)=>{
		switch(size){
			case "SMALL":
				return object.set({
					fontSize:18,
				})
			case "MEDIUM":
				return object.set({
					fontSize:24,
				})
			case "LARGE":
				return object.set({
					fontSize:32,
				})
			default:
				return
		}
	})
	canvas.renderAll()
}