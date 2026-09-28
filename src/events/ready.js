const { Events, REST, Routes } = require("discord.js");
const config = require("../config");

module.exports = {
  name: "ready",

  register(client) {
    client.once(Events.ClientReady, async (readyClient) => {
      console.log(`Logged in as ${readyClient.user.tag}`);

      if (!config.guildId) {
        console.warn("GUILD_ID is not set, skipping slash command registration.");
        return;
      }

      if (!readyClient.guilds.cache.has(config.guildId)) {
        console.error(`The bot is not in guild ${config.guildId}. Invite it, then restart.`);
        return;
      }

      const body = [...readyClient.commands.values()].map((command) => command.data.toJSON());
      const rest = new REST().setToken(config.token);

      try {
        await rest.put(Routes.applicationGuildCommands(readyClient.user.id, config.guildId), {
          body,
        });
      } catch (err) {
        if (err.code === 50001) {
          const invite = `https://discord.com/oauth2/authorize?client_id=${readyClient.user.id}&scope=bot%20applications.commands&permissions=1099780155526`;
          console.error(
            "Missing access while registering commands. Re-invite the bot with the applications.commands scope:",
          );
          console.error(invite);
          return;
        }

        console.error("Failed to register commands:", err);
        return;
      }

      console.log(`Registered ${body.length} commands.`);
    });
  },
};
