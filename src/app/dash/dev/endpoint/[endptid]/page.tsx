"use client";
import axios from "axios";
import React, {useEffect, useState} from "react";
import StatusIndicator from "@/app/_elements/StatusIndicator";

function EndPointInfo({params}: {params: {endptid: string}}) {
	const [checks, setChecks] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios
			.get("/api/endpoint/" + params.endptid)
			.then((response) => {
				setChecks(response.data);
			})
			.catch((error) => {
				alert("Error occured");
			});
	}

	return (
		<div className="max-width-xl mx-auto">
			<div className="flex">
				<button className="rounded-lg m-3 p-2 bg-blue-800 hover:bg-blue-600" onClick={() => {}}>
					Show faults
				</button>
				<div className="ms-auto">
					<input type="date" className="rounded-lg m-3 p-2" />
					<button className="rounded-lg m-3 p-2 bg-blue-800 hover:bg-blue-600">Go To Date</button>
				</div>
			</div>

			<table className="w-full">
				<thead>
					<tr className="h-10 bg-gray-800">
						<td>Status</td>
						<td>Date</td>
						<td>Code</td>
					</tr>
				</thead>
				<tbody>
					{checks.map((check: any, i) => (
						<tr key={i} className="h-10">
							<td>
								<StatusIndicator status={check.status}></StatusIndicator>
							</td>
							<td>{String(check.date).replace("T", " ").slice(0, 19)}</td>
							<td>{check.code}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default EndPointInfo;
