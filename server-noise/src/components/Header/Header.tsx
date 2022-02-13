import * as React from "react";
import "./header.css";
import { StaticImage } from "gatsby-plugin-image";
import pages from "../../utility/pages";

const Header = () => {
	return (
		<nav id="header">
			<StaticImage
				src={"../../images/logo.png"}
				alt={"logo"}
				style={{
					maxHeight: "80%",
					width: "auto",
					margin: "auto 0",
					transition: "none",
				}}
				objectFit="contain"
			/>
			{pages.map((page) => {
				return (
					<button>
						<a href={page[0]}>{page[1]}</a>
					</button>
				);
			})}
		</nav>
	);
};
export default Header;
