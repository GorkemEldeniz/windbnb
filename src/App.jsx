import SearchBar from "./components/SerchBar";
import Card from "./components/Card";
import Grid from "./components/Grid";
import { getContext } from "./Context";
import NotFound from "./components/NotFound";

function App() {
	const { hotels } = getContext();

	return (
		<>
			<SearchBar />
			<Grid>
				{hotels.length !== 0 ? (
					hotels.map((el, index) => <Card key={index} {...el} />)
				) : (
					<NotFound />
				)}
			</Grid>
		</>
	);
}

export default App;
