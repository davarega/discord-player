const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: "error",

	async execute(client, queue, track) {
		const embed = new EmbedBuilder()
			.setTitle("An error occured while playing")
			.setDescription(`Reason: \`${error.message}\``)
			.setColor(Colors.Red);

		return queue.metadata.send({ embeds: [embed] }).catch(console.error);
	}
}