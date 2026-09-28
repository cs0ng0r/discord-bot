const { EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const { sendLog } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option.setName("user").setDescription("Member to kick").setRequired(true),
    )
    .addStringOption((option) => option.setName("reason").setDescription("Reason")),

  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") ?? "No reason given";

    if (!member) {
      await interaction.reply({
        content: "That user isn't in this server.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (!member.kickable) {
      await interaction.reply({
        content: "I can't kick that member.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await member.kick(reason);
    await interaction.reply({ content: `Kicked ${member.user.tag}.`, flags: MessageFlags.Ephemeral });

    const embed = new EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle("Member kicked")
      .addFields(
        { name: "User", value: `${member.user.tag} (${member.id})`, inline: true },
        { name: "Moderator", value: interaction.user.tag, inline: true },
        { name: "Reason", value: reason },
      )
      .setTimestamp();

    await sendLog(interaction.client, embed);
  },
};
