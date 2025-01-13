import discord
from discord.ext import commands
from dotenv import load_dotenv
import os

# Load the environment variables from the .env file
load_dotenv()

# Retrieve the token from the environment variables
TOKEN = os.getenv('TOKEN')

bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}')

@bot.command()
async def ping(ctx):
    await ctx.send('Pong!')

bot.run(TOKEN)
