"use client";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "./LoadingContext";
import App from "./api/_lib/models/apps";
import StatusIndicator from "./_elements/StatusIndicator";
import Link from "next/link";

export default function Home() {
	const [apps, setApps] = useState([]);
	const setLoading = useContext(LoadingContext);

	useEffect(() => {
		setLoading(true);
	}, []);

	useEffect(() => {
		if (apps.length) {
			setLoading(false);
		}
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
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="font-mono text-5xl font-bold my-5">AppStats</h1>
			<p className="font-mono">See live stats about your the laatest apps on our website...</p>
			<div className="w-full">
				<table className="w-full my-5">
					<thead>
						<tr className="h-10 bg-gray-800">
							<td>Homepage</td>
							<td>Status</td>
							<td>Report Bug</td>
						</tr>
					</thead>
					<tbody>
						{apps.map((app: App, i) => (
							<tr key={i} className={"h-10"}>
								<td>{app.homepage}</td>
								<td className="">
									<StatusIndicator status={app.status}></StatusIndicator>
								</td>
								<td>
									<Link
										className="p-2 bg-indigo-600 hover:bg-indigo-800 my-1 mx-auto rounded-lg"
										href={`/bug/report/${app.id}`}>
										Report Bug
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
