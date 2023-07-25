const { useQueue } = require("discord-player");
const { SlashCommandBuilder, CommandInteraction } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("skip")
	.setDescription("Skip a song."),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		console.log(`[Log] ${interaction.user.tag} is trying to use the ${interaction.commandName} command`);
		
		await interaction.deferReply();
		const { guild, member } = interaction;
		const queue = useQueue(guild.id);

		if (!member.voice.channel) {
			return interaction.followUp({ content: 'You must be in a voice channel to use this command', ephemeral: true });
		}
		
		if(!queue) {
			return interaction.followUp({content: "Nothing to skip.", ephemeral: true})
		}

		queue.node.skip();
		return interaction.followUp('skipping song!');
	}
}