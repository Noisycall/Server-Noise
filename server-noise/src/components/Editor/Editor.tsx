import * as React from "react";
import "./editor.css";
import EditorJS, { API } from "@editorjs/editorjs";
import DragDrop from "editorjs-drag-drop";
import RawTool from "@editorjs/raw";
import * as EditorJSStyle from "editorjs-style";
import { useEffect, useState } from "react";
const Editor = () => {
	let [data, setData] = useState({} as any);
	useEffect(() => {
		const editor = new EditorJS({
			autofocus: true,
			inlineToolbar: true,
			tools: {
				raw: RawTool,
				style: EditorJSStyle.StyleInlineTool,
			},
			onReady: () => {
				new DragDrop(editor);
			},
			onChange: (api: API, event: CustomEvent) => {
				api.saver.save().then((output) => {
					setData(output);
				});
			},
		});
	}, []);
	return (
		<div className="editor__container">
			<div id="editorjs" className="editor" />
			<div>{JSON.stringify(data)}</div>
		</div>
	);
};
export default Editor;
