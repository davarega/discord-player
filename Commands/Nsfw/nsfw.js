const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nsfw")
		.setDescription("NSFW commands.")
		.setNSFW(true)
		.addStringOption((option) =>
			option.setName("tag")
				.setDescription("NSFW tags list.")
				.setRequired(true)
				.addChoices(
					{ name: 'waifu', value: 'waifu' },
					{ name: 'ass', value: 'ass' },
					{ name: 'ecchi', value: 'ecchi' },
					{ name: 'ero', value: 'ero' },
					{ name: 'hentai', value: 'hentai' },
					{ name: 'milf', value: 'milf' },
					{ name: 'oral', value: 'oral' },
					{ name: 'paizuri', value: 'paizuri' },
				)
		),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		console.log(`[Log] ${interaction.user.tag} is trying to use the ${interaction.commandName} command`);

		const { channel, options } = interaction;
		const value = options.getString("tag");
		const embed = new EmbedBuilder();

		if (!channel.nsfw)
			return interaction.reply({ content: "🔞 | This command can only be used on nsfw channels." });

		const params = {
			included_tags: `${value}`,
			is_nsfw: true
		};

		try {
			const response = await axios.get('https://api.waifu.im/search', { params });
			const data = await response.data.images[0];

			embed.setTitle(`Random NSFW ${value.charAt()} Image`)
				.setURL(`${data.url}`)
				.setDescription(`Source : ${data.source}`)
				.setImage(`${data.url}`)
				.setTimestamp()
				.setFooter({ text: `💓 ${data.favorites} ` });

			return interaction.reply({ embeds: [embed] });
		} catch (err) {
			console.log(err);
			embed.setColor('Red').setDescription("⛔ | Something went wrong...");
			return interaction.reply({ embeds: [embed], ephemeral: true });
		};
	}
}