"use client";
import React, {useEffect, useState} from "react";
import AppDetailedView from "@/app/dash/dev/app/[id]/page";
import FormElement from "@/app/_elements/FormComponent";
import axios from "axios";

function Report({params}: {params: {appid: number}}) {
	const [bugData, setBugData] = useState({
		title: "",
		description: "",
		url: "",
		reportersEmail: "",
	});

	function handleChange(e: any) {
		setBugData((prevData) => ({...prevData, [e.target.name]: e.target.value}));
	}

	function handleSubmit() {
		axios
			.post("/api/bug/report", {...bugData, appId: params.appid})
			.then((response) => {
				alert("OK");
				window.location.replace("/");
			})
			.catch((error) => {
				alert("There was an error");
			});
	}

	return (
		<div>
			<h1 className="text-center font-mono text-2xl">Report a bug...</h1>
			<AppDetailedView params={{id: String(params.appid)}} onlyDetails={true} />

			<div className="max-w-xl mx-auto my-5">
				<FormElement
					name="title"
					label="Shortly name the bug"
					handleChange={handleChange}
					value={bugData.title}></FormElement>
				<div className="my-1">
					<p className="text-md">Describe the problem that you have encounterd...</p>
					<textarea
						className="w-full rounded-lg my-1 text-black p-2"
						name="description"
						id=""
						rows={5}
						onChange={handleChange}
						value={bugData.description}></textarea>
				</div>
				<FormElement
					name="url"
					label="Insert URL (app link where error ecounterd)"
					handleChange={handleChange}
					value={bugData.url}></FormElement>
				<FormElement
					name="reportersEmail"
					label="Your Email (optional)"
					handleChange={handleChange}
					value={bugData.reportersEmail}></FormElement>

				<button className="w-full p-2 rounded-lg hover:bg-purple-400 bg-purple-600 my-2" onClick={handleSubmit}>
					Report Bug
				</button>
			</div>
		</div>
	);
}

export default Report;
