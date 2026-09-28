const { Events } = require("discord.js");
const config = require("../config");

function emojiMatches(ruleEmoji, emoji) {
  return ruleEmoji === emoji.name || ruleEmoji === emoji.id || ruleEmoji === emoji.toString();
}

async function handle(reaction, user, add) {
  if (user.bot) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch {
      return;
    }
  }

  if (!reaction.message.guild) return;

  const rule = config.reactionRoles.find(
    (entry) =>
      String(entry.messageId) === reaction.message.id && emojiMatches(entry.emoji, reaction.emoji),
  );
  if (!rule) return;

  const member = await reaction.message.guild.members.fetch(user.id).catch(() => null);
  if (!member) return;

  const update = add ? member.roles.add(rule.roleId) : member.roles.remove(rule.roleId);
  await update.catch((err) => {
    console.error(`Reaction role failed for ${user.tag}: ${err.message}`);
  });
}

module.exports = {
  name: "reactions",

  register(client) {
    client.on(Events.MessageReactionAdd, (reaction, user) => handle(reaction, user, true));
    client.on(Events.MessageReactionRemove, (reaction, user) => handle(reaction, user, false));
  },
};
