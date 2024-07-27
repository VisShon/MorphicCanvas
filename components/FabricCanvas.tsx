import {MutableRefObject, useContext, useEffect, useMemo} from "react"
import { CanvasContext } from "@/context/CanvasContext"
import { createNameCard } from "@/lib/namecard"


function FabricCanvas({users}:{users:any}) {

	const {
		fabricRef,
		canvasRef,
	} = useContext(CanvasContext)

	const memoizedUsers = useMemo(()=>users,[users])

	useEffect(()=>{

		if (fabricRef.current) {
            fabricRef.current.clear()
        }

		const cardWidth = 300
		const cardHeight = 350

		memoizedUsers.forEach((user:any,index:number)=>{
			

			const left = 200+Math.floor(index/2) * (cardWidth+20) // 20 for spacing
			const top = 200+Math.floor(index%2) * (cardHeight+20) 

			createNameCard(
				user.avatar_url,
				user.name,
				user.login,
				user.bio,
				user.email,
				user.followers,
				user.public_repos,
				user.public_gists,
				user.html_url,
				left,
				top,
				fabricRef
			)
		})

	}, [memoizedUsers,fabricRef])

	return (
		<>
			<canvas
				ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
			/>
		</>
	)
}

export default FabricCanvas