const { CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = require('../../index');
const { useMainPlayer } = require('discord-player');
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
		console.log(`[Log] ${interaction.user.tag} is trying to use the ${interaction.commandName} command`);
		
		await interaction.deferReply();
		const query = interaction.options.getString("query");
		const embed = new EmbedBuilder();

		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) {
			embed.setColor('Red').setDescription("You need to be in a voice channel to play music!");
			return interaction.followUp({ embeds: [embed], ephemeral: true });
		}
		if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
			embed.setColor('Red').setDescription("You must be in the same voice channel as me");
			return interaction.followUp({ embeds: [embed], ephemeral: true });
		}

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
			return interaction.followUp({embeds: [embed]})
		} catch(error) {
			console.log(error);
			embed.setColor('Red').setDescription("⛔ | Something went wrong... Please try again.");
			return interaction.followUp({embeds: [embed], ephemeral: true});
		}
	}
}