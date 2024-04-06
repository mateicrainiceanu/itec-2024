"use client";
import moment from "moment";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import StatusIndicator from "@/app/_elements/StatusIndicator";
import {LoadingContext} from "@/app/LoadingContext";
import {UserContext} from "@/app/UserContext";

function EndPointInfo({params}: {params: {endptid: string}}) {
	const setLoading = useContext(LoadingContext);
	const {user} = useContext(UserContext);

	const [checks, setChecks] = useState([]);

	const [showFaulty, setShowFaulty] = useState(false);

	const [date, setDate] = useState(new Date(Date.now()).toISOString().slice(0, 10));

	useEffect(() => {
		setLoading(checks.length === 0);

		setTimeout(getData, !checks.length ? 0 : user.timeInterval);
	}, [checks, user.timeInterval]);

	function getData() {
		axios
			.post("/api/endpoint/" + params.endptid, {faults: showFaulty, date: date})
			.then((response) => {
				setChecks(response.data);
			})
			.catch((error) => {
				alert("Error occured");
			});
	}

	function showOnlyFault() {
		setShowFaulty((prevData) => !prevData);
	}

	function deleteEp() {
		axios
			.delete("/api/endpoint/" + params.endptid + "/delete")
			.then((response) => {
				window.location.replace("/dash");
			})
			.catch((error) => {
				alert("there was an error");
			});
	}

	return (
		<div className="max-width-xl mx-auto">
			<div className="flex">
				<button
					className={
						"rounded-lg m-3 p-2 " +
						(showFaulty ? "bg-gray-800 hover:bg-black-gray" : "bg-green-800 hover:bg-green-gray")
					}
					onClick={showOnlyFault}>
					Show only faults
				</button>
				<button className="rounded-lg m-3 p-2 bg-red-800 hover:bg-red-600" onClick={deleteEp}>
					Delete Endpoint
				</button>
				<div className="ms-auto">
					<input
						type="date"
						className="rounded-lg m-3 p-2 bg-gray-500"
						name="date"
						value={date}
						onChange={(e: any) => {
							setDate(e.target.value);
						}}
					/>
					<button className="rounded-lg m-3 p-2 bg-blue-800 hover:bg-blue-600" onClick={getData}>
						Go To Date
					</button>
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
