const discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config");

if (!config.token) {
  console.error("Missing DISCORD_TOKEN in .env");
  process.exit(1);
}

const client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMembers,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.MessageContent,
    discord.GatewayIntentBits.GuildMessageReactions,
    discord.GatewayIntentBits.GuildModeration,
  ],
  partials: [
    discord.Partials.Message,
    discord.Partials.Channel,
    discord.Partials.Reaction,
    discord.Partials.User,
  ],
});

client.commands = new discord.Collection();

const commandsPath = path.join(__dirname, "commands");
for (const file of fs.readdirSync(commandsPath).filter((name) => name.endsWith(".js"))) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
for (const file of fs.readdirSync(eventsPath).filter((name) => name.endsWith(".js"))) {
  require(path.join(eventsPath, file)).register(client);
}

client.login(config.token);
