const {
    Client,
    Events,
    GatewayIntentBits,
    EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
    ],
});

client.on("ready", () => {
    client.user.setActivity("Yur Yamper", { type: "WATCHING" });
    console.log("Listo!");
});

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

let prefix = process.env.PREFIX;
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || !message.guild) return;
    if (message.author.bot) return;
    const cont = message.content.split(" ").slice(1);
    const args = cont.join(" ");

    // Comandos de voz
    if (message.content.startsWith(prefix + "info")) {
        const exampleEmbed = new EmbedBuilder()
            .setDescription(`# Hola Malditos Mancos
      |Comandos|
      |----------------|
      `);
        message.reply({ embeds: [exampleEmbed] });
    }

    // Comandos de voz - Llamas
    if (message.content.startsWith(prefix + "inop")) {
        // Checking if the message author is in a voice channel.
        if (!message.member.voice.channel)
            return message.reply("You must be in a voice channel.");
        // Checking if the bot is in a voice channel.
        if (message.guild.me.voice.channel)
            return message.reply("I'm already playing.");

        // Joining the channel and creating a VoiceConnection.
        message.member.voice.channel.join().then((VoiceConnection) => {
            // Playing the music, and, on finish, disconnecting the bot.
            VoiceConnection.play("./audios/llamas/inoperante.mp3").on("finish", () =>
                VoiceConnection.disconnect()
            );
        });
    }
});

client.login(process.env.TOKEN);
