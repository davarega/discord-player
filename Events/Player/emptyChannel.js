const {EmbedBuilder } = require('discord.js');

module.exports = {
	name: "emptyChannel",

	async execute(client, queue, track) {
		const embed = new EmbedBuilder().setDescription("I left the channel due to **channel inactivity**");
		return queue.metadata
			.send({embeds: [embed]})
			.then((m) => setTimeout(() => m.delete(), 150000));
	}
}