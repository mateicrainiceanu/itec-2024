import React from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

function StatusIndicator({status}: {status: number}) {
	return <i className=" ms-2 ">
		{status === 0 && <BsCheckCircleFill className="text-green-500" />}
		{status === 1 && <BsExclamationCircleFill className="text-yellow-500" />}
		{status === 2 && <BsXCircleFill className="text-red-500" />}
		</i>;
}

export default StatusIndicator;
