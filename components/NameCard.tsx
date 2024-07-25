export default function ResultCard({name}:{name:string}) {
	return (
		<li className="p-6 rounded-xl bg-white shadow-sm font-semibold hover:shadow-md hover:scale-120 transition-all delay-120 ease-in-out">
			{name}
		</li>
	)
};
