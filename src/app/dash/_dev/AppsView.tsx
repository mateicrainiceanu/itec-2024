import AppRow from "@/app/_elements/AppRow";
import axios from "axios";
import React, {useEffect, useState} from "react";

function AppsView() {
	const [apps, setApps] = useState([]);

	useEffect(() => {
		axios
			.get("/api/apps")
			.then((response) => {
                setApps(response.data)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
					{apps.map((app, i) => <AppRow key={i} data={app}/>)}
				</tbody>
			</table>
		</div>
	);
}

export default AppsView;
