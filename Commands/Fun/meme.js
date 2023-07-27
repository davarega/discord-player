const { default: axios } = require("axios");
const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { logHandler } = require("../../Handlers/logHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Sending meme image."),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		logHandler("1", interaction.user.tag, interaction.commandName);

		const embed = new EmbedBuilder();

		try {
			const response = await axios.get('https://meme-api.com/gimme');
			const data = await response.data;

			embed.setTitle(`${data.title}`)
				.setURL(`${data.postLink}`)
				.setImage(`${data.url}`)
				.setTimestamp()
				.setFooter({ text: `👍🏼 ${data.ups} 💬 0 ` });

			logHandler("2", interaction.user.tag, interaction.commandName);
			return interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.log(error);
			embed.setColor('Red').setDescription("⛔ | Something went wrong...");

			logHandler("4", interaction.user.tag, interaction.commandName, error);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		};
	}
};