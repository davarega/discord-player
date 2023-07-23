const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: "playerStart",

	execute(client, queue, track) {
		if (!track.requestedBy) track.requestedBy = client.user;

		const embed = new EmbedBuilder()
			.setAuthor({ name: "Starting playing...", iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
			.setTitle(`${track.title || 'Unknown Title'}`)
			.setURL(`${track.url}`)
			.setThumbnail(`${track.thumbnail}`)
			.addFields(
				{ name: 'Author', value: track.author, inline: true },
				{ name: "Duration", value: `${track.duration}`, inline: true },
				{ name: 'volume', value: `\`${queue.node.volume}%\``, inline: false },
				{ name: 'Progress', value: `${queue.node.createProgressBar()}` }
			);

		return queue.metadata.send({ embeds: [embed] });
	},
};