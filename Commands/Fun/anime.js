const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');
const { default: axios } = require('axios');
const { logHandler } = require('../../Handlers/logHandler');

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
		logHandler("1", interaction.user.tag, interaction.commandName);

		const { options, user } = interaction;
		const value = options.getString("tag");
		const embed = new EmbedBuilder();

		try {
			const response = await axios.get(`https://nekos.best/api/v2/waifu`);
			const data = await response.data.results[0];

			embed.setTitle(`Random ${value.charAt(0).toUpperCase()}${value.slice(1)} Image`)
				.setURL(`${data.source_url}`)
				.setImage(`${data.url}`)
				.setTimestamp()
				.setFooter({ text: `Request by ${user.tag} ` });

			logHandler("3", user.tag, interaction.commandName, value);
			return interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.log(error);
			embed.setColor('Red').setDescription("⛔ | Something went wrong...");

			logHandler("4", interaction.user.tag, interaction.commandName, error);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		};
	}
}