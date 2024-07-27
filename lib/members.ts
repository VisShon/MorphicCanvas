import { 
	Member, 
	User 
} from "@/constants/response"
import axios from "axios"

export const getMembers = async(
	[company,filterset,max="5",search]:[string,Array<keyof User>,string,string]
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
				per_page:max,
				// page:1
			}
		})

		console.log(members, "potty")


		const filtered = search ?
								members.filter(
									(member:Member) => member["login"].toLowerCase().includes(search.toLowerCase())
								):
								members

		console.log(filtered, "potty")
		

		const promises = filtered.map(async(member:any,i:number)=>{
			const {data:user} =  await axios.get(member.url)

			let userdata:User = {
				id:user?.id,
				node_id:user?.node_id,
			}

			for (let key of filterset){
				if(key in user)
					userdata[key]=user[key]
			}

			return userdata
		})

		console.log(promises, "potty")


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