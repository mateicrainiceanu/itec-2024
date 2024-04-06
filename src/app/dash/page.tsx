"use client";

import React, {useContext, useEffect} from "react";
import {UserContext} from "../UserContext";
import DevDash from "./_dev/DevDash";

function Dash() {
	const {user} = useContext(UserContext);

	return <div>{user.role === 1 && <DevDash/>}</div>;
}

export default Dash;
