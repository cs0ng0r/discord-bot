import discord
from discord.ext import commands
from dotenv import load_dotenv
import os
import asyncio

# Load environment variables
load_dotenv()

TOKEN = os.getenv('TOKEN')

# Initialize bot
bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())


@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}')


async def load_cogs():
    # Load all cogs in the `cogs` folder
    for filename in os.listdir('./cogs'):
        if filename.endswith('.py') and filename != '__init__.py':
            await bot.load_extension(f'cogs.{filename[:-3]}')


async def main():
    # Load cogs and run the bot
    await load_cogs()
    await bot.start(TOKEN)


# Run the main function
asyncio.run(main())
