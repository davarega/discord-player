const { CommandInteraction } = require('discord.js');
module.exports = {
	name: "interactionCreate",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {*} client 
	 */
	async execute(interaction, client) {

		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);

			if (!command)
				return interaction.reply({ content: "Outdated command! Please check in later.", ephemeral: true });

			// Developer Commands
			if(command.developer && interaction.user.id !== "529274140801105920" && interaction.guild.id !== "876346848686788658")
				return interaction.reply({ content: "This command is only available to the developer.", ephemeral: true });

			command.execute(interaction, client);
		}
	}
}