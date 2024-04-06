import React from "react";

interface Props {
	name: string;
    type?: string;
    label: string
	handleChange: (e: any) => void;
	value: string | number;
}

function FormElement({name, type, label, handleChange, value}: Props) {
	return (
		<>
			<label className="" htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				value={value}
				type={type || "text"}
                onChange={handleChange}
				className="w-full my-2 h-8 py-4 px-5 text-black rounded-lg text-center"
			/>
		</>
	);
}

export default FormElement;

