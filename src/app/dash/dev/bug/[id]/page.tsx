"use client";
import axios from "axios";
import React, {useEffect, useState} from "react";

function BugDetView({params}: {params: {id: number}}) {
	const [bugData, setBugData] = useState({
		title: "",
		description: "",
		url: "",
		reportersEmail: "",
	});

	useEffect(() => {
		axios
			.get("/api/bug/" + params.id)
			.then((res) => {
				setBugData(res.data);                
			})
			.catch();
	}, []);

    function handleSolve(){
        axios.delete("/api/bug/"+params.id).then(res => {
            window.location.replace("/dash")
        })
    }

	return (
		<div className="max-w-xl mx-auto font-mono">
			<h1 className="text-center text-xl">Bug details </h1>
			<h2 className="font-bold text-lg">Title</h2>
			<p className="font-white">{bugData.title}</p>
			<h2 className="font-bold text-lg">Description</h2>
			<p>{bugData.description}</p>
			<h2 className="font-bold text-lg">URL</h2>
			<p>{bugData.url}</p>
            <button className="w-full bg-gray-800 hover:bg-gray-600 p-2 my-2 rounded-lg" onClick={handleSolve}>Solve Bug</button>
		</div>
	);
}

export default BugDetView;
