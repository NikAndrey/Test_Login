import React from "react";
import SignInForm from "./AuthForm";
import Footer from "./Footer";
import Logo from "./Logo";

export default function LeftContainer() {
	return (
		<div className="left">
			<Logo />
			<div className="form">
				<SignInForm />
			</div>
			<Footer />
		</div>
	);
}
