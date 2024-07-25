// #region Imports
import { 
	Html, 
	Head, 
	Main, 
	NextScript 
} from "next/document";
// #endregion

export default function Document() {
	return (
		<Html lang="en">

			<Head>
				{/* <title>Morphic</title> */}
				<meta name="description" content="Vishnu Shon" />
			</Head>

			
			<body>
				<Main />
				<NextScript />
			</body>
			
		</Html>
	);
};
