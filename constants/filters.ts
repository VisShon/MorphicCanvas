export type PrimaryFilter = "Member Details"|"Max Results"|"Company";
export type FilterType = "radio"|"checkbox";

export interface Filter {
	type:FilterType,
	img:string,
	fieldset:{
		filter:string,
		value:string
	}[]
};


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
				filter: "Name",
				value: "name"
			},

			{
				filter: "Bio",
				value: "bio"
			},

			{
				filter: "Avatar",
				value: "avatar_url"
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

	"Max Results":{
		type: "radio",
		img:"/option.svg",
		fieldset: [
			{
				filter: "50",
				value: "50"
			},

			{
				filter: "100",
				value: "100"
			},

			{
				filter: "500",
				value: "500"
			},

			{
				filter: "1000",
				value: "1000"
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
};