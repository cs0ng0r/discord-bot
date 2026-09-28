const { EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const { sendLog } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option.setName("user").setDescription("Member to timeout").setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("minutes")
        .setDescription("Length in minutes (0 removes the timeout)")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(40320),
    )
    .addStringOption((option) => option.setName("reason").setDescription("Reason")),

  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const minutes = interaction.options.getInteger("minutes");
    const reason = interaction.options.getString("reason") ?? "No reason given";

    if (!member) {
      await interaction.reply({
        content: "That user isn't in this server.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (!member.moderatable) {
      await interaction.reply({
        content: "I can't timeout that member.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await member.timeout(minutes === 0 ? null : minutes * 60 * 1000, reason);

    const action =
      minutes === 0
        ? `Removed timeout from ${member.user.tag}.`
        : `Timed out ${member.user.tag} for ${minutes} minutes.`;
    await interaction.reply({ content: action, flags: MessageFlags.Ephemeral });

    const embed = new EmbedBuilder()
      .setColor(0xf1c40f)
      .setTitle(minutes === 0 ? "Timeout removed" : "Member timed out")
      .addFields(
        { name: "User", value: `${member.user.tag} (${member.id})`, inline: true },
        { name: "Moderator", value: interaction.user.tag, inline: true },
        { name: "Duration", value: minutes === 0 ? "Removed" : `${minutes} minutes`, inline: true },
        { name: "Reason", value: reason },
      )
      .setTimestamp();

    await sendLog(interaction.client, embed);
  },
};
