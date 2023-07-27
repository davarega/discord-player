const { useQueue } = require("discord-player");
const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const { logHandler } = require("../../Handlers/logHandler");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("skip")
	.setDescription("Skip a song."),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		logHandler("1", interaction.user.tag, interaction.commandName);
		
		const { guild, member } = interaction;
		const queue = useQueue(guild.id);

		if (!member.voice.channel) {
			logHandler("4", interaction.user.tag, interaction.commandName, "user not in voice channel");
			return interaction.reply({ content: 'You must be in a voice channel to use this command', ephemeral: true });
		};

		if (guild.members.me.voice.channelId && member.voice.channelId !== guild.members.me.voice.channelId) {
			logHandler("4", interaction.user.tag, interaction.commandName, "user and bot not in the same voice channel");
			return interaction.reply({ content: "You must be in the same voice channel as me", ephemeral: true });
		};
		
		if(!queue) {
			logHandler("4", interaction.user.tag, interaction.commandName, "nothing to skip");
			return interaction.reply({content: "Nothing to skip.", ephemeral: true})
		};

		try {
			queue.node.skip();
			logHandler("7", interaction.user.tag, "", queue.currentTrack.title);
			return interaction.reply('skipping song!');
		} catch(error) {
			logHandler("10", interaction.user.tag, "", queue.currentTrack.title, error);
		};
	}
};