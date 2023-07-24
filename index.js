const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { SpotifyExtractor, SoundCloudExtractor, YouTubeExtractor } = require('@discord-player/extractor');
require('dotenv').config();

const { loadCommands } = require('./Handlers/commandHandler');
const { loadEvents } = require('./Handlers/eventHandler');
const { loadPlayer } = require('./Handlers/playerHandler');

const client = new Client({
	intents: [Object.keys(GatewayIntentBits)],
	partials: [Object.keys(Partials)]
});

const player = new Player(client);

client.commands = new Collection();

player.extractors.loadDefault();
player.extractors.register(YouTubeExtractor, {});
player.extractors.register(SpotifyExtractor, {});
// player.extractors.register(SoundCloudExtractor, {});

module.exports = client;
// module.exports.player = player;

client.login(process.env.TOKEN).then(() => {
	loadCommands(client);
	loadEvents(client);
	loadPlayer(client, player);
});