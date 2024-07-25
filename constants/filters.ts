export type PrimaryFilter = "Members"|"Companies"|"Fetch Options";
export type FilterType = "radio"|"checkbox";

export interface Filter {
	type:FilterType,
	fieldset:{
		filter:string,
		value:string
	}[]
};


export const FilterSet:Record<PrimaryFilter,Filter>={
	"Members":{
		type: "checkbox",
		fieldset: [
			{
				filter: "About",
				value: "about"
			},

			{
				filter: "Repos",
				value: "public_repos"
			},

			{
				filter: "Gists",
				value: "public_gists"
			},

			{
				filter: "Organizations",
				value: "organizations"
			},
		]
	},

	"Fetch Options":{
		type: "radio",
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
	
	"Companies":{
		type: "radio",
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