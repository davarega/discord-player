const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { logHandler } = require('../../Handlers/logHandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pong!"),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @returns 
	 */
	async execute(interaction) {
		logHandler("1", interaction.user.tag, interaction.commandName);

		interaction.reply({ content: "Pong!" })
		return logHandler("2", interaction.user.tag, interaction.commandName);
	}
}