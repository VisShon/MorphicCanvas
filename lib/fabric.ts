// #region Imports
import { MutableRefObject } from "react";
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
} from "fabric";
// #endregion

// Define the Attributes interface for shape properties
export interface Attributes {
    x: string,
    y: string,
    height: string,
    width: string,
    fill: string,
}

// Function to initialize the Fabric.js canvas
export const initialize = (
    fabricRef: MutableRefObject<Canvas | undefined>,
    canvas: MutableRefObject<HTMLCanvasElement | undefined>
) => {
    fabricRef.current = new Canvas(
        canvas.current,
        {
            width: 1850,
            height: 1100,
            backgroundColor: "#FFFFFF",
            zoom: 0.5,
        }
    );

    return fabricRef.current;
}

// Function to handle the selection of objects on the canvas
export const selection = (
    event: Partial<TEvent<TPointerEvent>> & {
        selected: FabricObject[]
    },
    setAttributes: React.Dispatch<React.SetStateAction<Attributes>>
) => {
    if (!event.e?.target) return;

    const selected: FabricObject = event?.selected[0];

    if (selected) {
        const scaledWidth = selected?.scaleX ? 
        selected?.width! * selected?.scaleX : 
        selected?.width;
                            
        const scaledHeight = selected?.scaleY ? 
        selected?.height! * selected?.scaleY :
        selected?.height;

        setAttributes({
            x: selected.getX().toString() || "",
            y: selected.getY().toString() || "",
            width:  scaledWidth.toString() || "",
            height: scaledHeight.toString() || "",
            fill: selected?.fill?.toString() || "",
        });
    }
}

// Function to handle scaling of objects on the canvas
export const scale = (
    event: ModifiedEvent,
    setAttributes: React.Dispatch<React.SetStateAction<Attributes>>
) => {
    const selected = event.target;

    const scaledWidth = selected?.scaleX ? 
    selected?.width! * selected?.scaleX : 
    selected?.width;
                        
    const scaledHeight = selected?.scaleY ? 
    selected?.height! * selected?.scaleY :
    selected?.height;

    setAttributes(prev => ({
        ...prev,
        width: scaledWidth.toString() || "",
        height: scaledHeight.toString() || "",
    }));
}

// Function to render the canvas
export const render = (
    fabricRef: MutableRefObject<Canvas | undefined>,
) => {
    fabricRef.current?.clear();
    fabricRef.current?.renderAll();
}

// Function to handle zooming on the canvas
export const zoom = (
    event: TPointerEventInfo<WheelEvent>,
    canvas: Canvas
) => {
    event.e.preventDefault();

    const delta = event?.e.deltaY;
    let zoom = canvas.getZoom();

    canvas.zoomToPoint( 
        new Point(
            event.e.offsetX,
            event.e.offsetY
        ),
        Math.min( 
            Math.max(0.2, zoom + delta * 0.01), 
            1
        )
    );

    event.e.stopPropagation();
}

// Function to remove selected objects from the canvas
export const remove = (
    canvas: Canvas,
) => {
    const active = canvas.getActiveObjects();

    if (active?.length > 0) {
        active.forEach((obj: FabricObject) => {
            canvas.remove(obj);
        });
    }

    canvas.discardActiveObject();
    canvas.requestRenderAll();
}

// Function to copy selected objects on the canvas
export const copy = (
    canvas: Canvas,
) => {
    const active = canvas.getActiveObjects();
    
    if (active?.length > 0) {
        const objectArray = active.map((object) => object.toObject());
        localStorage.setItem("copied", JSON.stringify(objectArray));
    }
}

// Function to paste copied objects onto the canvas
export const paste = (
    canvas: Canvas,
) => {
    const copiedData = localStorage.getItem("copied");

    if (copiedData) {
        try {
            const objectArray = JSON.parse(copiedData);
            util.enlivenObjects(
                objectArray,
                {
                    reviver: (record, instance) => {
                        const obj = instance as FabricObject;

                        obj.set({
                            left: obj.left + 20,
                            top: obj.top + 20,
                        });
                        
                        canvas.add(obj);
                        canvas.renderAll();
                    }
                }
            );
            canvas.renderAll();
        } catch (e) {
            console.log(e);
        }
    }
}

// Function to handle keyboard events for copy, paste, and delete
export const keyDown = (
    event: KeyboardEvent,
    canvas: Canvas,
) => {
    if ((event?.ctrlKey || event?.metaKey) && event.key === "c")
        copy(canvas);

    if ((event?.ctrlKey || event?.metaKey) && event.key === "v")
        paste(canvas);

    if ((event?.ctrlKey || event?.metaKey) && event.key === "x") {
        copy(canvas);
        remove(canvas);
    }

    if (event.key === "Backspace" || event.key === "Delete")
        remove(canvas);
}

// Function to export the canvas as an image
export const exportImg = (
    canvas: Canvas
) => {
    const active = canvas.getActiveObjects();
    
    let images: string[] = active.map((object) => {
        return object.toDataURL();
    });

    return images;
}

// Function to save the images
export const save = (images:string[]) => {
	const link = document.createElement("a")
	document.body.appendChild(link)
	images.forEach(async(image)=>{
		link.href = image
		link.download = "img"
		link.click()
	})
	document.body.removeChild(link)
}

// Function to add a text box to the canvas
export const addText = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    canvas: Canvas
) => {
    const box = new Textbox("text", {
        left: event.clientX,
        top: event.clientY,
        width: 200,
        fontSize: 18,
        fill: "#20282D",
        fontFamily: "Nunito"
    });
    canvas.add(box);
    canvas.renderAll();
}

// Function to change the size of selected text objects on the canvas
export const changeTextSize = (
    canvas: Canvas,
    size: string
) => {
    const active = canvas.getActiveObjects();
    active.forEach((object) => {
        switch (size) {
            case "SMALL":
                return object.set({
                    fontSize: 18,
                });
            case "MEDIUM":
                return object.set({
                    fontSize: 24,
                });
            case "LARGE":
                return object.set({
                    fontSize: 32,
                });
            default:
                return;
        }
    });
    canvas.renderAll();
}
