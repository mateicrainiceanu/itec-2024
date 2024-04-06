"use client";
import React from "react";
import axios from "axios";
import {useContext} from "react";
import {LoadingContext} from "@/app/LoadingContext";
import {UserContext} from "@/app/UserContext";

function Settings() {
	const setLoading = useContext(LoadingContext);
	const {user, setUser, getUserData} = useContext(UserContext);

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
			</div>
		</div>
	);
}

export default Settings;
