const config = require("./config");

async function sendLog(client, embed) {
  if (!config.logChannelId) return;

  const channel = await client.channels.fetch(config.logChannelId).catch((err) => {
    console.error(`Couldn't fetch log channel: ${err.message}`);
    return null;
  });

  if (!channel?.isTextBased()) return;

  await channel.send({ embeds: [embed] }).catch((err) => {
    console.error(`Failed to send log: ${err.message}`);
  });
}

module.exports = { sendLog };
