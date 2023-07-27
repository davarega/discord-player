const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');
const { default: axios } = require('axios');
const { logHandler } = require('../../Handlers/logHandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nsfw")
		.setDescription("NSFW commands.")
		.addStringOption((option) =>
			option.setName("tag")
				.setDescription("NSFW tags list.")
				.setRequired(true)
				.addChoices(
					{ name: 'waifu', value: 'waifu' },
					{ name: 'milf', value: 'milf' },
					{ name: 'ecchi', value: 'ecchi' },
					{ name: 'ero', value: 'ero' },
					{ name: 'ass', value: 'ass' },
					{ name: 'hentai', value: 'hentai' },
					{ name: 'oral', value: 'oral' },
					{ name: 'paizuri', value: 'paizuri' },
				)
		),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		logHandler("1", interaction.user.tag, interaction.commandName);

		const { channel, options, user } = interaction;
		const value = options.getString("tag");
		const embed = new EmbedBuilder();

		if (!channel.nsfw) {
			logHandler("4", interaction.user.tag, interaction.commandName, "user no in nsfw channel");
			return interaction.reply({ content: "🔞 | This command can only be used on nsfw channels." });
		};

		const params = {
			included_tags: `${value}`,
			is_nsfw: true
		};

		try {
			const response = await axios.get('https://api.waifu.im/search', { params });
			const data = await response.data.images[0];

			embed.setTitle(`Random NSFW ${value.charAt(0).toUpperCase()}${value.slice(1)} Image`)
				.setURL(`${data.url}`)
				.setDescription(`Source : ${data.source}`)
				.setImage(`${data.url}`)
				.setTimestamp()
				.setFooter({ text: `💓 ${data.favorites} ` });

			logHandler("3", user.tag, interaction.commandName, value);
			return interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.log(error);
			embed.setColor('Red').setDescription("⛔ | Something went wrong...");

			logHandler("4", interaction.user.tag, interaction.commandName, error);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		};
	}
};