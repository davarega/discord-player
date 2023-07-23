const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: "emptyQueue",

	async execute(client, queue, track) {
		const embed = new EmbedBuilder().setDescription(`\`📛\` | **Queue has been:** \`Ended\``);
		return queue.metadata.send({ embeds: [embed] });
	}
}