import discord
from discord.ext import commands

class AutoMod(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author == self.bot.user:
            return
        if message.author.bot:
            return
        if message.content == "bad word":
            await message.delete()
            await message.channel.send(f"{message.author.mention}, you can't say that word here.")
            return
        
async def setup(bot):
    await bot.add_cog(AutoMod(bot))