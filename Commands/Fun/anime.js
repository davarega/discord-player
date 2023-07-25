const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("anime")
		.setDescription("NSFW commands.")
		.addStringOption((option) =>
			option.setName("tag")
				.setDescription("Select a tag for the image.")
				.setRequired(true)
				.addChoices(
					{ name: 'waifu', value: 'waifu' },
					{ name: 'neko', value: 'neko' },
					{ name: 'kitsune', value: 'kitsune' },
					{ name: 'husbando', value: 'husbando' }
				)
		),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		console.log(`[Log] ${interaction.user.tag} is trying to use the ${interaction.commandName} command`);

		const value = interaction.options.getString("tag");
		const embed = new EmbedBuilder();

		try {
			const response = await axios.get(`https://nekos.best/api/v2/waifu`);
			const data = await response.data.results[0];

			embed.setTitle(`Random ${value.charAt(0).toUpperCase()}${value.slice(1)} Image`)
				.setURL(`${data.source_url}`)
				.setImage(`${data.url}`)
				.setTimestamp()
				.setFooter({ text: `Request by ${interaction.user.tag} ` });

			return interaction.reply({ embeds: [embed] });
		} catch (err) {
			console.log(err);
			embed.setColor('Red').setDescription("⛔ | Something went wrong...");
			return interaction.reply({ embeds: [embed], ephemeral: true });
		};
	}
}