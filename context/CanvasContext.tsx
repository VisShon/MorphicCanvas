// #region Imports
import { 
    createContext, 
    ReactNode,
    MutableRefObject,
} from "react";

import { 
    Attributes, 
    initialize,
    selection,
    scale,
    copy,
    paste,
    remove,
    render,
    zoom,
} from "@/lib/fabric";

import {
    Canvas,
    FabricObject,
    Rect,
} from "fabric";

import { 
    useEffect, 
    useRef, 
    useState 
} from "react";
import { useShortcut } from "@/hooks/useShortcut";
// #endregion

// Create a context for the canvas state and actions
export const CanvasContext = createContext({} as {
    canvasRef: MutableRefObject<HTMLCanvasElement | undefined>,
    fabricRef: MutableRefObject<Canvas | undefined>,
    showMenu: boolean,
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
    attributes: Attributes,
    canvasObjects?: Record<string, string>,
    addRect: (canvas: Canvas) => void
});

// CanvasProvider component to wrap the application and provide canvas context
export function CanvasProvider({ children }: {
    children: ReactNode
}) {
    const [canvasObjects, setCanvasObjects] = useState([{}]);
    const [showMenu, setShowMenu] = useState(false);

    const [attributes, setAttributes] = useState<Attributes>({
        x: "",
        y: "",
        width: "",
        height: "",
        fill: "#000000"
    });

    const canvasRef = useRef<HTMLCanvasElement | undefined>();
    const fabricRef = useRef<Canvas | undefined>();

    // Initialize the canvas on component mount
    useEffect(() => {
        const canvas = initialize(
            fabricRef,
            canvasRef
        );

        FabricObject.prototype.transparentCorners = false;
        FabricObject.prototype.cornerColor = "#ff0000";
        FabricObject.prototype.cornerStyle = "rect";
        FabricObject.prototype.cornerStrokeColor = "#ff0000";
        FabricObject.prototype.cornerSize = 6;

        // Add event listeners for canvas interactions
        canvas.on("mouse:wheel", (event) => {
            zoom(
                event,
                canvas,
            );
        });

        canvas.on("object:scaling", (event) => {
            scale(
                event,
                setAttributes,
            );
        });

        canvas.on("selection:created", (event) => {
            selection(
                event,
                setAttributes,
            );
            setShowMenu(true);
        });

        return () => {
            canvas.dispose();
        }
    }, [canvasRef]);

    // Re-render the canvas when canvasObjects state changes
    useEffect(() => render(fabricRef), [canvasObjects]);

    // Define keyboard shortcuts for copy, paste, and remove actions
    useShortcut([
        ["mod+C", () => copy(fabricRef.current!)],
        ["mod+V", () => paste(fabricRef.current!)],
        ["mod+X", () => {
            copy(fabricRef.current!);
            remove(fabricRef.current!);
        }],
        ["mod+Backspace", () => remove(fabricRef.current!)],
    ]);

    // Function to add a rectangle to the canvas
    const addRect = async (canvas: Canvas) => {
        try {
            const rect = new Rect({
                height: 280,
                width: 200,
                fill: "#FF0000",
            });

            canvas?.add(rect);
            canvas?.requestRenderAll();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <CanvasContext.Provider value={{
            canvasRef,
            fabricRef,
            attributes,
            showMenu,
            setShowMenu,
            addRect
        }}>
            {children}
        </CanvasContext.Provider>
    );
}
