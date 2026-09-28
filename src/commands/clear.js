const { EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const { sendLog } = require("../log");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete recent messages in this channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("How many messages to delete (1-100)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100),
    ),

  async execute(interaction) {
    if (!interaction.channel?.bulkDelete) {
      await interaction.reply({
        content: "I can't delete messages here.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const amount = interaction.options.getInteger("amount");
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const deleted = await interaction.channel.bulkDelete(amount, true);
    await interaction.editReply(`Deleted ${deleted.size} messages.`);

    const embed = new EmbedBuilder()
      .setColor(0x9b59b6)
      .setTitle("Messages cleared")
      .addFields(
        { name: "Channel", value: `${interaction.channel}`, inline: true },
        { name: "Moderator", value: interaction.user.tag, inline: true },
        { name: "Deleted", value: `${deleted.size}`, inline: true },
      )
      .setTimestamp();

    await sendLog(interaction.client, embed);
  },
};
