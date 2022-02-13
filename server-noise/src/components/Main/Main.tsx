import * as React from "react";
import "./main.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
const Main = ({ children }) => {
	return (
		<div>
			<div className="sticky">
				<Header />
			</div>
			<div className="inline-flex min-w-full">
				<Sidebar />
				<main
					style={{
						overflowY: "scroll",
						maxHeight: `calc(100vh - var(--header-height)`,
						scrollbarWidth: "none",
						width: "100%",
					}}
				>
					{children}
				</main>
			</div>
		</div>
	);
};
export default Main;
