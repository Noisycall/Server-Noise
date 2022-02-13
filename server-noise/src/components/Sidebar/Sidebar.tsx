import * as React from "react";
import "./sidebar.css";
import { useState } from "react";
import pages from "../../utility/pages";

const Sidebar = () => {
	const [hidden, setHidden] = useState(false);
	function HideButton() {
		return (
			<button
				onClick={() => {
					setHidden(!hidden);
				}}
			>
				Hide Show
			</button>
		);
	}
	return (
		<nav
			id="sidebar"
			className={`${hidden ? "sidebar--hidden" : ""} flex flex-col`}
		>
			{pages.map((page) => {
				return <button className="sidebar__button">{page[1]}</button>;
			})}
			<HideButton />
		</nav>
	);
};
export default Sidebar;
