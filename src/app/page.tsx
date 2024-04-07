"use client";
import axios from "axios";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "./LoadingContext";
import App from "./api/_lib/models/apps";

export default function Home() {
	const [apps, setApps] = useState([]);
	const setLoading = useContext(LoadingContext);

	useEffect(() => {
		setLoading(true);
	}, []);

	useEffect(() => {
		setTimeout(getData, !apps.length ? 1000 : 0);
	}, [apps]);

	function getData() {
		axios
			.get("/api/apps/random")
			.then((response) => {
				setApps(response.data);
			})
			.catch((error) => {
				alert(error);
			});
		setLoading(false);
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="font-mono text-5xl font-bold my-5">AppStats</h1>
			<p className="font-mono">See live stats about your favorite website</p>
			<div className="w-full">
				<table className="w-full">
					<thead>
						<tr>
							<td>Homepage</td>
							<td>Status</td>
							<td>Report Bug</td>
						</tr>
					</thead>
					<tbody>
						{apps.map((app: App, i) => (
							<tr key={i} className={"h-10"}>
								<td>{app.homepage}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
