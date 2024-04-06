import AppRow from "@/app/_elements/AppRow";
import {UserContext} from "@/app/UserContext";
import {useContext} from "react";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { LoadingContext } from "@/app/LoadingContext";

function AppsView() {
	const [apps, setApps] = useState([]);
	const {user} = useContext(UserContext);
	const setLoading = useContext(LoadingContext)

	useEffect(() => {
		setLoading(apps.length===0)

		setTimeout(updateData, (apps.length === 0 ? 0 :user.timeInterval));
	}, [apps, user.timeInterval]);
	
	async function updateData() {
		setLoading(false)
		console.log("updating...");
		
		await axios
			.get("/api/apps")
			.then((response) => {
				setApps(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="w-full">
			<table className="w-full tabel-auto text-center">
				<thead className="font-bold bg-gray-800">
					<tr className="h-10">
						<td></td>
						<td>Name</td>
						<td>Endpoint</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{apps.map((app, i) => (
						<AppRow key={i} data={app} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AppsView;
