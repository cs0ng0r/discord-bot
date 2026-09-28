const { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option.setName("user").setDescription("User to unban").setRequired(true),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user", true);

    try {
      await interaction.guild.members.unban(user.id);
    } catch {
      await interaction.reply({
        content: "I couldn't unban that user.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.reply({ content: `Unbanned ${user.tag}.`, flags: MessageFlags.Ephemeral });
  },
};
