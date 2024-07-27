// #region Imports
import { useContext,useState,useRef,useEffect,useDeferredValue } from "react"
import Image from "next/image"
import { CanvasContext } from '@/context/CanvasContext';
import { createNameCard } from "@/lib/namecard";
// #endregion


function GlobalSearch({isOpen,users}:{isOpen:boolean,users:any[]}) {

	const {fabricRef} = useContext(CanvasContext)

    const [searchParam, setSearchparam] = useState<string>("")
	const defferedSearch = useDeferredValue<string>(searchParam)

    const searchElement = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (searchElement.current&&isOpen) {
			searchElement.current.focus()
		}
	}, [isOpen])


	useEffect(()=>{

		if (fabricRef.current) {
			fabricRef.current.clear()
		}

		const filtered = users?.filter((user)=>
			user?.login?.toLowerCase().includes(defferedSearch) ||
			user?.name?.toLowerCase().includes(defferedSearch) ||
			user?.email?.toLowerCase().includes(defferedSearch)
		)


		filtered?.forEach((user:any,index:number)=>{
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
				index,
				fabricRef
			)
		})

	}, [users,fabricRef,defferedSearch])



	return (
		<div
			className="relative flex items-center gap-2  text-grey-light font-medium mb-4 z-10 text-[1.1rem]"
		>

			<Image
				className="absolute left-10"
				src="/search.svg"
				fetchPriority="high"
				alt="search"
				width={20} height={20}
			/>

			<input 
				className=" bg-chalk border-[2px] pl-20 focus:outline-none clear-none p-4 w-full rounded-lg  border-chalk-dark hover:border-blue-main transition-all ease-in-out delay-100 "
				value={searchParam}
				ref={searchElement}
				autoFocus
				onChange={(e)=>setSearchparam(e.target.value.toLowerCase())}
				type="search"
				placeholder={`Try typing "username"...`}
			/>
					
		</div>
	)
}

export default GlobalSearch