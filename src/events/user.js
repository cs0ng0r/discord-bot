const { EmbedBuilder, Events } = require("discord.js");
const config = require("../config");

async function sendEmbed(client, channelId, embed) {
  if (!channelId) return;

  const channel = await client.channels.fetch(channelId).catch((err) => {
    console.error(`Couldn't fetch channel ${channelId}: ${err.message}`);
    return null;
  });

  if (!channel?.isTextBased()) return;
  await channel.send({ embeds: [embed] });
}

module.exports = {
  name: "userEvents",

  register(client) {
    client.on(Events.GuildMemberAdd, async (member) => {
      const embed = new EmbedBuilder()
        .setColor(0x57f287)
        .setTitle("Welcome")
        .setDescription(`${member} joined the server.\nMember #${member.guild.memberCount}`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

      await sendEmbed(client, config.welcomeChannelId, embed);
    });

    client.on(Events.GuildMemberRemove, async (member) => {
      const embed = new EmbedBuilder()
        .setColor(0xed4245)
        .setTitle("Goodbye")
        .setDescription(
          `**${member.user.tag}** left the server.\nNow ${member.guild.memberCount} members.`,
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

      await sendEmbed(client, config.leaveChannelId, embed);
    });
  },
};
