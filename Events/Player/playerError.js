const { EmbedBuilder } = require('discord.js');
const { logHandler } = require('../../Handlers/logHandler');

module.exports = {
	name: "playerError",

	async execute(client, queue, track) {
		const embed = new EmbedBuilder()
			.setTitle("An error occured while playing")
			.setDescription(`Reason: \`⛔ | Something went wrong... Please try again.\``)
			.setColor('Red');

		logHandler("9", track.requestedBy, "", track.title, console.error);
		return queue.metadata.send({ embeds: [embed] }).catch(console.error);
	}
}