const mongoose = require('mongoose');

module.exports = {
	name: "ready",
	once: true,

	async execute(client, interaction) {
		await mongoose.connect(process.env.MONGO_DB || "");
		if(mongoose.connect)
		console.log("[MONGODB] Database connected!");

		client.user.setActivity("Maintenance!");
		console.log(`${client.user.username} is online now!`);
	}
}