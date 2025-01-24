import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error('Error: DISCORD_TOKEN is not defined in .env');
  process.exit(1);
}

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Bot ready event
client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});


// Log in to Discord
client.login(token).catch((err) => {
  console.error('Failed to log in:', err);
});
