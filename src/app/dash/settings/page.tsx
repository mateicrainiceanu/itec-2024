"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useContext} from "react";
import {LoadingContext} from "@/app/LoadingContext";
import {UserContext} from "@/app/UserContext";

function Settings() {
	const setLoading = useContext(LoadingContext);
	const {user, setUser, getUserData} = useContext(UserContext);

	const [time, setTime] = useState(user.timeInterval / 1000);

	useEffect(() => {
		setTime(user.timeInterval/1000)
	}, [user]);

	function devSigup() {
		setLoading(true);
		axios
			.get("/api/user/enroll-dev")
			.then((response) => {
				console.log(response);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleTIChange() {
		axios
			.post("/api/user/time-interval", {timeint: time})
			.then((response) => {
				alert("Changed");
			})
			.catch((error) => {
				alert("error");
			});
	}

	return (
		<div className="container mx-10 text-center">
			<div className="max-w-xl mx-auto">
				<h1 className="text-2xl font-mono my-5">Settings</h1>
				{user.role === 0 && (
					<button
						onClick={devSigup}
						className="rounded-md w-full my-4 bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Become a dev
					</button>
				)}

				<div className="text-center">
					<p className="my-2">Refresh Interval (seconds)</p>

					<input
						type="number"
						className="m-2 p-2 rounded-lg bg-gray-800"
						min={1}
						max={60}
						value={time}
						onChange={(e: any) => {
							setTime(e.target.value);
						}}
					/>
					<button className=" rounded-lg p-2 w-full bg-gray-900 hover:bg-gray-600" onClick={handleTIChange}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default Settings;
