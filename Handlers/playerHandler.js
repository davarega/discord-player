const fs = require('fs');
// const { useMainPlayer } = require('discord-player');
// const player = useMainPlayer();

function loadPlayer(client, player) {
	const files = fs.readdirSync(`./Events/Player`).filter((file) => file.endsWith(".js"));
	for (const file of files) {
		const event = require(`../Events/Player/${file}`);

		player.events.on(event.name, event.execute.bind(null, client));
	}
}

module.exports = { loadPlayer }