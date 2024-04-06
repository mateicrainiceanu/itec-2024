import Link from "next/link";
import React from "react";
import AppsView from "./AppsView";

function DevDash() {
	return (
		<div className="text-white max-w-6xl mx-auto">
			<div className="">
				<h1 className=" text-center font-mono text-2xl">Developer - Dashboard</h1>
				<div className="my-2">
					<div className="w-full flex">
						<h2 className="text-xl font-mono bold">My Apps</h2>
						<Link className="rounded-xl ml-auto p-3 bg-gray-600 hover:bg-gray-500" href="/dash/dev/add-app">
							Add app
						</Link>
					</div>
				</div>
				<AppsView></AppsView>
			</div>
		</div>
	);
}

export default DevDash;
