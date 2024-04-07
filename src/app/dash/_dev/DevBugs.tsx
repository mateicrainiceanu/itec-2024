import React from "react";
import { useState } from "react";

function DevBugs() {

    const [bugs, setBugs] = useState([])

	return (
		<div>
			<div className="my-2">
				<div className="w-full text-center">
					<h2 className="text-xl font-mono bold">! BUGS !</h2>
					<p>Users have reported the following problems with your apps...</p>
				</div>
			</div>
		</div>
	);
}

export default DevBugs;
