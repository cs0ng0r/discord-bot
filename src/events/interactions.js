const { Events, MessageFlags } = require("discord.js");

module.exports = {
  name: "interactions",

  register(client) {
    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        const payload = { content: "Something went wrong.", flags: MessageFlags.Ephemeral };
        if (interaction.replied || interaction.deferred) await interaction.followUp(payload);
        else await interaction.reply(payload);
      }
    });
  },
};
