require("dotenv").config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.GUILD_ID,
  welcomeChannelId: process.env.WELCOME_CHANNEL_ID,
  leaveChannelId: process.env.LEAVE_CHANNEL_ID,
  logChannelId: process.env.LOG_CHANNEL_ID,
  reactionRoles: [
    { messageId: "1549852626324295761", emoji: "✅", roleId: "1548778706309349393" },
  ],
};
