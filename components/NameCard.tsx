import { FaUsers, FaBook, FaCodeBranch } from "react-icons/fa"

export default function NameCard({
	avatar_url,
	name,
	login,
	bio,
	email,
	followers,
	public_repos,
	public_gists,
}:{
	avatar_url:string|null,
	name:string|null,
	login:string|null,
	bio:string|null,
	email:string|null,

	followers:number|null,
	public_repos:number|null,
	public_gists:number|null,
}) {
	return (
		<div className="bg-white rounded-lg border-2 p-6 h-[30vh] flex flex-col justify-between  select-none absolute bottom-[-99999999px]" name="nameCard">

			<div className="flex justify-center">
				<img
					crossOrigin="anonymous"
					className="rounded-full border-4 border-white"
					src={avatar_url ? avatar_url : "https://via.placeholder.com/80"}
					alt={`${name ? name : "User"}"s avatar`}
					style={{ width: "120px", height: "120px" }}
				/>
			</div>

			<div className="text-center mt-4">
				{login && <h2 className="text-3xl font-semibold text-gray-800">{login}</h2>}
				{name && <h2 className="text-md font-semibold text-gray-800">{name}</h2>}
				{bio && <p className="text-gray-500">'{bio}'</p>}
				{email && <p className="text-gray-500">{email}</p>}
			</div>

			<div className="flex justify-center mt-8">
				{followers>0 &&
					<div className="text-center mx-4 bg-slate-100 rounded-full h-[5rem] w-[5rem] p-2 flex flex-col gap-1  justify-center items-center">
						<>
							<FaUsers className="inline-block text-gray-700 " />						
							<p className="text-gray-700 font-semibold text-[1rem]">{followers}</p>
						</>
					</div>
				}

				{public_repos>0 && 
					<div className="text-center mx-4 bg-slate-100 rounded-full h-[5rem] w-[5rem] p-2 flex flex-col gap-1 justify-center items-center">
						<>
							<FaBook className="inline-block text-gray-700" />
							<p className="text-gray-700 font-semibold text-[1rem]">{public_repos}</p>
						</>
					</div>
				}

				{public_gists>0 && 
					<div className="text-center mx-4 bg-slate-100 rounded-full h-[5rem] w-[5rem] p-2 flex flex-col gap-1 justify-center items-center">
						<>
							<FaCodeBranch  className="inline-block text-gray-700 " />
							<p className="text-gray-700 font-semibold text-[1rem]">{public_gists}</p>
						</>
					</div>
				}
			</div>
		</div>
	)
};
