const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pong!"),

	async execute(interaction) {
		console.log(`[Log] ${interaction.user.tag} is trying to use the ${interaction.commandName} command`);
		
		return interaction.reply({ content: "Pong!" });
	}
}