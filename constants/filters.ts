export type PrimaryFilter = "Member Details"|"Page"|"Company"
export type FilterType = "radio"|"checkbox"

export interface Filter {
	type:FilterType,
	img:string,
	fieldset:{
		filter:string,
		value:string
	}[]
}


export const FilterSet:Record<PrimaryFilter,Filter>={
	"Member Details":{
		type: "checkbox",
		img:"/member.svg",
		fieldset: [
			{
				filter: "Username",
				value: "login"
			},

			{
				filter: "Bio",
				value: "bio"
			},

			{
				filter: "Email",
				value: "email"
			},

			{
				filter: "Followers",
				value: "followers"
			},

			{
				filter: "Repos",
				value: "public_repos"
			},

			{
				filter: "Gists",
				value: "public_gists"
			}
		]
	},

	"Page":{
		type: "radio",
		img:"/option.svg",
		fieldset: [
			{
				filter: "1",
				value: "1"
			},

			{
				filter: "2",
				value: "2"
			},

			{
				filter: "3",
				value: "3"
			},

			{
				filter: "4",
				value: "4"
			},
		]
	},
	
	"Company":{
		type: "radio",
		img:"/org.svg",
		fieldset: [
			{
				filter: "Mozilla",
				value: "mozilla"
			},

			{
				filter: "Google",
				value: "google"
			},

			{
				filter: "Microsoft",
				value: "microsoft"
			},

			{
				filter: "Apple",
				value: "apple"
			},

		]
	}
}