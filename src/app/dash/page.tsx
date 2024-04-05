"use client";

import React, {useContext, useEffect} from "react";
import {UserContext} from "../UserContext";

function Dash() {
	const {user} = useContext(UserContext);

	return <div>page</div>;
}

export default Dash;
