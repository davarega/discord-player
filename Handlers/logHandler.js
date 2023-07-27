require('colors');

function logHandler(msg, user = "undefined", command = "undefined", query = "none", err = "none") {
	const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
	const logger = `[${str.slice(0, 18)}] `.yellow;

	var messages = [
		`user: ${user.green} command: ${command.cyan} query: ${query.blue} error: ${err.red}`,
		`user: ${user.green} is trying to use command: ${command.cyan}`,
		`user: ${user.green} successfully used command: ${command.cyan}`,
		`user: ${user.green} successfully search: ${query.blue}, in command: ${command.cyan}`,
		`user: ${user.green} failed to use command: ${command.cyan}, because: ${query.red}`,
		`user: ${user.green} searching query: ${query.cyan}`,
		`user: ${user.green} now playing: ${query.cyan}`,
		`user: ${user.green} skip the song: ${query.cyan}`,
		`user: ${user.green} deleting queue, because: ${query.cyan}`,
		`user: ${user.green} failed to search: ${query.cyan}, Error: ${err.red}`,
		`user: ${user.green} failed to skip the music: ${query.cyan}, Error: ${err.red}`,
		`user: ${user.green}, now playing music, query: ${command.cyan}, source url: ${query.blue}`
	];

	console.log(logger + messages[msg]);
};

module.exports = { logHandler };