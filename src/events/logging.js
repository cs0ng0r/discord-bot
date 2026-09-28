const { AuditLogEvent, EmbedBuilder, Events } = require("discord.js");
const { sendLog } = require("../log");

async function findModerator(guild, type, targetId) {
  const logs = await guild.fetchAuditLogs({ type, limit: 5 }).catch(() => null);
  if (!logs) return null;

  const entry = logs.entries.find(
    (item) => item.target?.id === targetId && Date.now() - item.createdTimestamp < 15000,
  );

  return entry?.executor ?? null;
}

module.exports = {
  name: "logging",

  register(client) {
    client.on(Events.MessageDelete, async (message) => {
      if (!message.guild || message.author?.bot) return;

      const embed = new EmbedBuilder()
        .setColor(0xfee75c)
        .setTitle("Message deleted")
        .setDescription(message.content?.slice(0, 4000) || "*no text content*")
        .addFields(
          { name: "Author", value: message.author?.tag ?? "Unknown", inline: true },
          { name: "Channel", value: `${message.channel}`, inline: true },
        )
        .setTimestamp();

      await sendLog(message.client, embed);
    });

    client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
      if (!newMessage.guild || newMessage.author?.bot) return;
      if (oldMessage.content === newMessage.content) return;

      const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle("Message edited")
        .setURL(newMessage.url)
        .addFields(
          { name: "Author", value: newMessage.author?.tag ?? "Unknown", inline: true },
          { name: "Channel", value: `${newMessage.channel}`, inline: true },
          { name: "Before", value: oldMessage.content?.slice(0, 1024) || "*unknown*" },
          { name: "After", value: newMessage.content?.slice(0, 1024) || "*empty*" },
        )
        .setTimestamp();

      await sendLog(newMessage.client, embed);
    });

    client.on(Events.GuildBanAdd, async (ban) => {
      const moderator = await findModerator(ban.guild, AuditLogEvent.MemberBanAdd, ban.user.id);
      const embed = new EmbedBuilder()
        .setColor(0xed4245)
        .setTitle("Member banned")
        .setDescription(`${ban.user.tag} (${ban.user.id})`)
        .addFields(
          { name: "Moderator", value: moderator?.tag ?? "Unknown", inline: true },
          { name: "Reason", value: ban.reason ?? "No reason given" },
        )
        .setTimestamp();

      await sendLog(ban.client, embed);
    });

    client.on(Events.GuildBanRemove, async (ban) => {
      const moderator = await findModerator(ban.guild, AuditLogEvent.MemberBanRemove, ban.user.id);
      const embed = new EmbedBuilder()
        .setColor(0x57f287)
        .setTitle("Member unbanned")
        .setDescription(`${ban.user.tag} (${ban.user.id})`)
        .addFields({ name: "Moderator", value: moderator?.tag ?? "Unknown", inline: true })
        .setTimestamp();

      await sendLog(ban.client, embed);
    });
  },
};
