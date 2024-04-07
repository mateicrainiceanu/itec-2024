import Bug from "@/app/api/_lib/models/bugs";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Link from "next/link";

function DevBugs() {

    const [bugs, setBugs] = useState([])

    useEffect(()=> {
        axios.get("/api/user/bugs").then(response => {
            setBugs(response.data)
        }).catch(err => {alert("Error")})
    }, [])

	return (
		<div>
			<div className="my-2">
				<div className="w-full text-center">
					<h2 className="text-xl font-mono bold">! BUGS !</h2>
					<p>Users have reported the following problems with your apps...</p>

					<table className="w-full">
						<thead>
							<tr className="h-10 bg-gray-800">
								<td>Title</td>
								<td>More</td>
							</tr>
						</thead>
						<tbody>
							{bugs.map((bug: Bug) => (
								<tr key ={bug.id} className="h-10">
									<td>{bug.title}</td>
									<td><Link href={"/dash/dev/bug/"+bug.id}><BsArrowRightCircleFill /></Link></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default DevBugs;
