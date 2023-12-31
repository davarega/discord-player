const { CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');
const { logHandler } = require('../../Handlers/logHandler');
const player = useMainPlayer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Play a song.")
		.addStringOption((option) =>
			option.setName("query").setDescription("Query a song.").setRequired(true)),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		logHandler("1", interaction.user.tag, interaction.commandName);
		
		await interaction.deferReply();
		const query = interaction.options.getString("query");
		const embed = new EmbedBuilder();

		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) {
			embed.setColor('Red').setDescription("You need to be in a voice channel to play music!");

			logHandler("4", interaction.user.tag, interaction.commandName, "user not in voice channel");
			return interaction.followUp({ embeds: [embed], ephemeral: true });
		};

		if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
			embed.setColor('Red').setDescription("You must be in the same voice channel as me");

			logHandler("4", interaction.user.tag, interaction.commandName, "user and bot not in the same voice channel");
			return interaction.followUp({ embeds: [embed], ephemeral: true });
		};

		try {
			const url = await player.search(query);
			await player.play(voiceChannel, url, {
				nodeOptions: {
					metadata: interaction.channel,
					leaveOnEndCooldown: 30000,
					leaveOnEmptyCooldown: 30000,
					volume: 50
				},
			});

			embed.setDescription(`**${url._data.playlist ? url._data.playlist.title : url._data.tracks[0].title}** has been added to the queue!`)
			
			logHandler("5", interaction.user.tag, "", query);
			return interaction.followUp({embeds: [embed]})
		} catch(error) {
			logHandler("9", interaction.user.tag, "", query, error);
			console.log(error);
			embed.setColor('Red').setDescription("⛔ | Something went wrong... Please try again.");
			
			return interaction.followUp({embeds: [embed], ephemeral: true});
		};
	}
};