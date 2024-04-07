"use client";
import {TablePagination, Switch} from "@mui/material";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import StatusIndicator from "@/app/_elements/StatusIndicator";
import {LoadingContext} from "@/app/LoadingContext";
import {UserContext} from "@/app/UserContext";
import Graph from "../../app/[id]/Graph";

function EndPointInfo({params}: {params: {endptid: string}}) {
	const setLoading = useContext(LoadingContext);
	const {user} = useContext(UserContext);

	const [checks, setChecks] = useState([]);

	const [showFaulty, setShowFaulty] = useState(false);

	const [lim, setLim] = useState(0);
	const [counter, setCounter] = useState(100);

	const [date, setDate] = useState(new Date(Date.now()).toISOString().slice(0, 10));
	const [autoref, setAutoref] = useState(true);

	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		setLoading(true);
	}, []);

	useEffect(() => {
		setTimeout(getData, !checks.length ? 0 : user.timeInterval);
	}, [checks, user.timeInterval, autoref, showFaulty]);

	function getData() {
		if (autoref) {
			axios
				.post("/api/endpoint/" + params.endptid, {faults: showFaulty, date: date, limit: lim, counter: counter})
				.then((response) => {
					setChecks(response.data.queryresult);
					setTotalPages(response.data.count);
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				})
				.catch((error) => {
					alert("Error occured");
					setLoading(false);
				});
		}
	}

	function showOnlyFault() {
		setAutoref(true);
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
			<Graph data={checks.splice(0,25)}></Graph>
			<div className="flex flex-wrap">
				<button
					className={
						"rounded-lg m-3 p-2 " +
						(showFaulty ? "bg-gray-800 hover:bg-black-gray" : "bg-green-800 hover:bg-green-gray")
					}
					onClick={() => {
						showOnlyFault();
						setLoading(true);
					}}>
					Show only faults
				</button>
				<button className="rounded-lg m-3 p-2 bg-red-800 hover:bg-red-600" onClick={deleteEp}>
					Delete Endpoint
				</button>
				<div className="bg-gray-200 my-auto mx-auto px-1 rounded-xl w-fixed">
					<TablePagination
						component="div"
						count={totalPages}
						page={page}
						onPageChange={(event: any, newPage: number) => {
							setPage(newPage);
						}}
						rowsPerPage={counter}
						onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
							setCounter(parseInt(event.target.value, 10));
						}}
					/>
				</div>
				<div className="bg-yellow-600 my-auto p-1 rounded-lg">
					<span>Auto-Refresh</span>
					<Switch
						color="secondary"
						onChange={() => {
							setAutoref((prevData) => !prevData);
						}}
						checked={autoref}
					/>
				</div>
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
					<button
						className="rounded-lg m-3 p-2 bg-blue-800 hover:bg-blue-600"
						onClick={() => {
							setLoading(true);
							setAutoref(true);
							getData();
						}}>
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
					{checks.slice(page * counter, (page + 1) * counter).map((check: any, i) => (
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
