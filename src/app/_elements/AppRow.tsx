import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import StatusIndicator from "./StatusIndicator";
import Link from "next/link";

interface RowData {
	id: number;
	name: string;
	endpoint: string;
	status: number;
}

interface Props{
    data: RowData
}

function AppRow({data}: Props) {
	return (
		<tr className="h-10">
            <td><StatusIndicator status={data.status} /></td>
			<td className="font-bold">{data.name}</td>
			<td>{data.endpoint}</td>
			<td>
				<Link href={"/dash/dev/app/" + data.id}>
					<BsFillArrowRightCircleFill/>
				</Link>
			</td>
		</tr>
	);
}

export default AppRow;
