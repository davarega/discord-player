const { default: axios } = require("axios");
const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Sending meme image."),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		console.log(`[Log] ${interaction.user.tag} is trying to use the ${interaction.commandName} command`);

		const embed = new EmbedBuilder();

		try {
			const response = await axios.get('https://meme-api.com/gimme');
			const data = await response.data;

			embed.setTitle(`${data.title}`)
				.setURL(`${data.postLink}`)
				.setImage(`${data.url}`)
				.setTimestamp()
				.setFooter({ text: `👍🏼 ${data.ups} 💬 null ` });

			return interaction.reply({ embeds: [embed] });
		} catch (err) {
			console.log(err);
			embed.setColor('Red').setDescription("⛔ | Something went wrong...");
			return interaction.reply({ embeds: [embed], ephemeral: true });
		};
	}
};