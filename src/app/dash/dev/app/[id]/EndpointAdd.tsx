import React, {useState} from "react";
import FormElement from "@/app/_elements/FormComponent";
import axios from "axios";
import {BsXCircleFill} from "react-icons/bs";

function EndpointAdd({appId, getData, close}: {appId: number; getData: () => void; close: () => void}) {
	const [value, setValue] = useState("");

	function handleSubmit() {
		axios
			.post("/api/endpoint/add", {url: value, appId: appId})
			.then((response) => {
				setValue("");
				getData();
			})
			.catch((err) => {
				alert("Error");
			});
	}

	return (
		<div className="p-5 bg-gray-800 my-5 rouned-lg relative">
			<button className="absolute top-5 right-5" onClick={close}>
				<BsXCircleFill />
			</button>
			<div className="w-full h-full">
				<h4 className="font-mono text-bold text-center">Add new endpoint</h4>
				<FormElement
					name="endpoint"
					label="We can check your app at..."
					handleChange={(e: any) => {
						setValue(e.target.value);
					}}
					value={value}></FormElement>
				<div className="w-full ">
					<button className="rounded-xl p-2 bg-gray-600 hover:bg-gray-500 w-full" onClick={handleSubmit}>
						Add endpoint
					</button>
				</div>
			</div>
		</div>
	);
}

export default EndpointAdd;
