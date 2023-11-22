// Started 11.21.2023
// Created by SATRIENCE

// Useful for archiving every piece of historical data from a specific array of games.

// node_modules
// variables
// functions
// startup

require("dotenv").config();
const noblox = require("noblox.js");
const fs = require("fs")

const places = process.env.PLACEIDS // The place IDs you want to cache information for, separated by commas.
const token = process.env.TOKEN // .ROBLOXSECURITY Cookie / Token


async function startNoblox() {
	const currentUser = await noblox.setCookie(`${token}`);
	console.log(
		new Date(),
		`| index.js |`,
		`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`
	);

	// Do everything else, calling functions and the like.
	
}

startNoblox()