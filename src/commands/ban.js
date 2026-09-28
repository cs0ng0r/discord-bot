const { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option.setName("user").setDescription("User to ban").setRequired(true),
    )
    .addStringOption((option) => option.setName("reason").setDescription("Reason"))
    .addIntegerOption((option) =>
      option
        .setName("delete_days")
        .setDescription("Delete their messages from the last 0-7 days")
        .setMinValue(0)
        .setMaxValue(7),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user", true);
    const reason = interaction.options.getString("reason") ?? "No reason given";
    const deleteDays = interaction.options.getInteger("delete_days") ?? 0;

    try {
      await interaction.guild.members.ban(user.id, {
        reason,
        deleteMessageSeconds: deleteDays * 86400,
      });
    } catch {
      await interaction.reply({ content: "I can't ban that user.", flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.reply({ content: `Banned ${user.tag}.`, flags: MessageFlags.Ephemeral });
  },
};
