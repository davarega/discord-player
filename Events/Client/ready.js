const mongoose = require('mongoose');
require('colors');

module.exports = {
	name: "ready",
	once: true,

	async execute(client, interaction) {
		await mongoose.connect(process.env.MONGO_DB || "");
		if (mongoose.connect)
			console.log("[MONGODB]".green + " Database connected!");

		client.user.setActivity("Maintenance!");
		console.log(`${client.user.username} is online now!`);

		client.guilds.cache.map(guild => {
			console.log(`${guild.name} | ${guild.id}`);
		});
	}
}