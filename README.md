# Personal Discord Bot
This repo contains my personal discord bot, that I have written for my Discord Servers.
This **might** not be the Discord Bot for you, but feel free to fork or just use it.

## Motivation
As I have said, this bot is my helper on the servers, because I don't really want to rely on other bots on the market, and I wanted to do this just for fun as a small project. I don't plan on making this really community focused, but I'll try to keep the code fairly easy to understand and scale.

## Stack
JavaScript. I could've used TypeScript, but I didn't feel like doing too much just for this.


## Features
The bot includes:
- Welcome and Leave Embeds
- Reaction Roles
- Moderation
- Logging
- idk yet.

## Setup
1. Create an application at the [Discord Developer Portal](https://discord.com/developers/applications), add a bot, and turn on the **Server Members Intent** and **Message Content Intent**.
2. Invite it with permission to kick, ban, timeout, manage messages, manage roles, view the audit log, and send embeds.
3. Copy `.env.example` to `.env` and fill in the token, guild id, and channel ids.
4. Add reaction role rules in `src/config.js`. Each entry is a message id, an emoji, and a role id. The bot's role needs to sit above the roles it assigns.
5. Run `npm install`, then `npm start`.

Moderation commands (registered to `GUILD_ID` on startup): `/kick`, `/ban`, `/unban`, `/timeout`, `/clear`. Bans, unbans, deleted messages, and edited messages go to the log channel. Kicks, timeouts, and clears are logged from the command.
