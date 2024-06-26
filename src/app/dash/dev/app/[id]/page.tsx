"use client";
import StatusIndicator from "@/app/_elements/StatusIndicator";
import Endpoint from "@/app/api/_lib/models/endpoint";
import {LoadingContext} from "@/app/LoadingContext";
import axios from "axios";
import Link from "next/link";
import {BsFillArrowRightCircleFill} from "react-icons/bs";
import React, {useContext, useEffect, useState} from "react";
import EndpointAdd from "./EndpointAdd";
import {UserContext} from "@/app/UserContext";
import Graph from "./Graph";

function AppDetailedView({params, onlyDetails}: {params: {id: string}; onlyDetails?: boolean}) {
	const [appData, setAppData] = useState({name: "", homepage: "", status: "", description: "", endpoints: []});
	const setLoading = useContext(LoadingContext);
	const {user} = useContext(UserContext);
	const [showAdd, setShowAdd] = useState(false);

	useEffect(() => {
		setLoading(appData.endpoints.length === 0);

		setTimeout(getData, appData.endpoints.length === 0 ? 0 : user.timeInterval);
	}, [appData, user.timeInterval]);

	function getData() {
		axios
			.get("/api/apps/" + params.id)
			.then((response) => {
				setAppData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				alert("an error occured");
				window.location.replace("/dash");
			});
	}

	return (
		<div className="max-w-xl mx-auto">
			{!onlyDetails && <h1 className="text-center font-mono text-2xl">Your app: </h1>}
			<p className="font-mono my-1">Name: {appData.name}</p>
			<p className="font-mono my-1">Homepage: {appData.homepage}</p>
			<p className="font-mono my-1">Description: {appData.description}</p>
			<p className="font-mono my-1 flex">
				Status <StatusIndicator status={Number(appData.status)} />
			</p>

			{!onlyDetails && (
				<div>
					{showAdd ? (
						<EndpointAdd
							appId={Number(params.id)}
							getData={getData}
							close={() => {
								setShowAdd(false);
							}}></EndpointAdd>
					) : (
						<button
							className="p-2 rounded-lg w-full bg-gray-800 hover:bg-gray-600 font-mono text-bold text-center my-2"
							onClick={() => {
								setShowAdd(true);
							}}>
							Add Endpoint
						</button>
					)}

					<table className="w-full text-center">
						<thead className="bg-gray-800 font-bold h-10">
							<tr>
								<td>Endpoint</td>
								<td>Status</td>
							</tr>
						</thead>
						<tbody>
							{appData.endpoints.map((endpt: Endpoint) => (
								<tr key={endpt.id} className="h-10">
									<td>{endpt.url}</td>
									<td className="text-center  pt-3">
										<div className="flex">
											<StatusIndicator status={endpt.status} />
											<Link href={"/dash/dev/endpoint/" + endpt.id}>
												<BsFillArrowRightCircleFill className="ms-5" />
											</Link>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default AppDetailedView;
