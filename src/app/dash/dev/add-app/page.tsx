"use client";
import React, {useContext, useState} from "react";
import FormElement from "@/app/_elements/FormComponent";
import axios from "axios";
import { LoadingContext } from "@/app/LoadingContext";

function AddApp() {
	const [data, setData] = useState({name: "", description: "", homepage: "", endpoint: "", status: 0});
  const setLoading = useContext(LoadingContext)

	function handleChange(e: any) {
		setData((prevData) => ({...prevData, [e.target.name]: e.target.value}));
	}

	function handleSubmit() {
    setLoading(true)
		axios
			.post("/api/apps/add", data)
			.then((resp) => {
				if(resp.status === 200) {
          window.location.replace("/dash")
        }
			})
			.catch((error) => {
        alert("There was an error")
        setLoading(false);
			});
	}

	return (
		<div className="text-center text-white max-w-xl mx-auto">
			<h1 className="text-xl my-2 font-mono">Add your app</h1>
			<hr />

			<h2 className="my-4 font-mono">General app Data</h2>
			<FormElement name="name" label="App-Name" handleChange={handleChange} value={data.name}></FormElement>
			<FormElement
				name="description"
				label="Short-Desc"
				handleChange={handleChange}
				value={data.description}></FormElement>
			<FormElement
				name="homepage"
				label="Users can access your app at..."
				handleChange={handleChange}
				value={data.homepage}></FormElement>

			<h2 className="my-4 font-mono">Endpoint-Data</h2>

			<FormElement
				name="endpoint"
				label="We can check your app status at ..."
				handleChange={handleChange}
				value={data.endpoint}></FormElement>
			<p className="my-2">You can always add more endpoints to your app from the app meniu.
			</p>
			<button className="rounded-xl ml-auto p-2 bg-purple-600 hover:bg-purple-500 w-full" onClick={handleSubmit}>Save</button>
		</div>
	);
}

export default AddApp;
