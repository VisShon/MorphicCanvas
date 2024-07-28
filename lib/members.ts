import { 
	Member, 
	User 
} from "@/constants/response"
import axios from "axios"
import sample from "@/sample.json"


export const getMembers = async(
	[company,filterset,page="1"]:[string,Array<keyof User>,string]
):Promise<{
		data:any,
		error:unknown|undefined,
		isPending:boolean,
	}>=>{

	let isPending = true

	if(!company)
		return {
			data:undefined,
			error:"No company",
			isPending:false
		} 

	try {

		let {data:members} = await axios.get(`https://api.github.com/orgs/${company}/members`,{
			params:{
				page:page,
				per_page:6
			}
		})


		if(
			!(filterset?.includes("bio")||
			filterset?.includes("email")||
			filterset?.includes("followers")||
			filterset?.includes("public_repos")||
			filterset?.includes("public_gists"))||
			!filterset
		){
			
			let res = members.map((member:Member) => {
				return {
					id:member?.id,
					node_id:member?.node_id,
					login:member?.login,
					avatar_url:member?.avatar_url,
					html_url:member?.html_url,
				}
			})


			return {
				data:res,
				error:undefined,
				isPending:false
			}

		}


		const promises = members.map(async(member:any,i:number)=>{

			let userdata:User = {
				id:member?.id,
				node_id:member?.node_id,
				login:member?.login,
				avatar_url:member?.avatar_url,
				html_url:member?.html_url,
			}

			const {data:user} =  await axios.get(member.url)
	
			for (let key of filterset){
				if(key in user)
					userdata[key]=user[key]
			}

			return userdata
		})


		const res = await Promise.all(promises)
		console.log(res)

		return {
			data:res,
			error:undefined,
			isPending:false
		}
		
	}
	catch(error:unknown){
		console.log(error)
		return {
			data:undefined,
			error,
			isPending
		}
		
	}
}