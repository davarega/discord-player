const { EmbedBuilder } = require('discord.js');
const { logHandler } = require('../../Handlers/logHandler');

module.exports = {
	name: "playerStart",

	execute(client, queue, track) {

		try {
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

			logHandler("11", track.requestedBy, track.title, track.url);
			return queue.metadata.send({ embeds: [embed] });
		} catch(error) {
			logHandler("9", track.requestedBy, "", track.title, error);
		}
	},
};