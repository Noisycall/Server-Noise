import React from "react";
import "./src/css/index.css";
import Main from "./src/components/Main/Main";

export const wrapPageElement = ({ element, props }) => {
	return <Main>{element}</Main>;
};
