import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./Context/index";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ContextProvider>
);
