const { useQueue } = require("discord-player");
const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const { logHandler } = require("../../Handlers/logHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leave")
		.setDescription("Clear the track queue and remove the bot from voice channel."),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @returns 
	 */
	async execute(interaction) {
		logHandler("1", interaction.user.tag, interaction.commandName);

		const { member, user, guild } = interaction;

		if (!member.voice.channel) {
			logHandler("4", interaction.user.tag, interaction.commandName, "user not in voice channel");
			return interaction.reply({ content: 'You must be in a voice channel to use this command', ephemeral: true });
		};

		if (guild.members.me.voice.channelId && member.voice.channelId !== guild.members.me.voice.channelId) {
			logHandler("4", interaction.user.tag, interaction.commandName, "user and bot not in the same voice channel");
			return interaction.reply({ content: "You must be in the same voice channel as me", ephemeral: true });
		};

		const queue = useQueue(guild.id);
		if (!queue) {
			logHandler("4", interaction.user.tag, interaction.commandName, "bot not in voice channel");
			return interaction.reply({ content: `❌ | I am **not** in a voice channel`, ephemeral: true });
		};

		try {
			queue.delete();

			const embed = new EmbedBuilder()
				.setAuthor({ name: "Stop playing...", iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
				.setDescription(`**✅ Leaving channel**\n\nCleared the track queue and left voice channel.\nTo play more music, use the **\`/play\`** command!`);

				logHandler("8", interaction.user.tag, "", "leave");;
			return interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.log(error);
			embed.setColor('Red').setDescription("⛔ | Something went wrong...");

			logHandler("4", interaction.user.tag, interaction.commandName, error);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		};
	}
};