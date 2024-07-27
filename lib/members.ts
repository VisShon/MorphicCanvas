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

		// let {data:members} = await axios.get(`https://api.github.com/orgs/${company}/members`,{
		// 	params:{
		// 		page:page
		// 	}
		// })


		// const promises = members.map(async(member:any,i:number)=>{
		// 	const {data:user} =  await axios.get(member.url)

		// 	let userdata:User = {
		// 		id:user?.id,
		// 		node_id:user?.node_id,
		// 	}

		// 	for (let key of filterset){
		// 		if(key in user)
		// 			userdata[key]=user[key]
		// 	}

		// 	return userdata
		// })

		const promises = sample.map(async(member:any,i:number)=>{
			let userdata:User = {
				id:member?.id,
				node_id:member?.node_id,
				name:member?.name,
				avatar_url:member?.avatar_url
			}

			for (let key of filterset){
				if(key in member)
					userdata[key]=member[key]
			}

			return userdata
		})

		const res = await Promise.all(promises)

		return {
			data:res,
			error:undefined,
			isPending:false
		}
		
	}
	catch(error:unknown){
		return {
			data:undefined,
			error,
			isPending
		}
		
	}
}