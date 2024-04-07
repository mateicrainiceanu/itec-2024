/* App.js */
import Check from "@/app/api/_lib/models/checks";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import {useEffect, useState} from "react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Graph({data}: {data: Array<Check>}) {


	function getDataPointsArrayItem(i: number, status: number) {
		return {x: i, y: status};
	}

	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "dark1", // "light1", "dark1", "dark2"
		title: {
			text: "Live evolution",
		},
		axisY: {
			title: "Error-Status",
			prefix: "Status",
		},
		axisX: {
			title: "Call",
			interval: 1,
		},
		data: [
			{
				type: "line",
				dataPoints: data.map((entry, i) => {
                    return {x: i+1, y:entry.status}
                }),
			}
		],
	};
	return (
		<div>
			<CanvasJSChart options={options} />
		</div>
	);
}

// {
// 				type: "line",
//              endppointId: 1
// 				dataPoints: [
// 					{x: 1, y: 0},
// 					{x: 2, y: 1},
// 					{x: 3, y: 1},
// 					{x: 4, y: 1},
// 					{x: 5, y: 1},
// 					{x: 6, y: 1},
// 					{x: 7, y: 1},
// 					{x: 8, y: 1},
// 					{x: 9, y: 1},
// 					{x: 10, y: 2},
// 				],
// 			},
