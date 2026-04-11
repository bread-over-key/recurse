"use client"

import CodeViewer from "@/components/code-block"
import { LinkDisplay } from "@/components/link-display";
import Markdown from "@/components/markdown";

const js_code = `
# test md

some text

- hello
- hi
`;export default function Page() {

	return <div>
		<Markdown content={js_code}></Markdown>
		<LinkDisplay href={"https://www.youtube.com/"}/>
	</div>

}
