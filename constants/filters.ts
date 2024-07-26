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
				filter: "5",
				value: "5"
			},

			{
				filter: "10",
				value: "10"
			},

			{
				filter: "20",
				value: "20"
			},

			{
				filter: "50",
				value: "50"
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