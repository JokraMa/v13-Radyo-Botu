const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const radyolar = require("../radyolar.json");
module.exports = {
    name:"oynatılan",
    description: 'Şuanda oynatılan radyoyu gösterir',
    options:[],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const fm = {
            "kralPop": "Kral Pop",
            "kralFm": "Kral FM",
            "powerFm": "Power FM",
            "bestFm": "Best FM",
            "fenomen": "Fenomen"
        }
     interaction.reply({embeds:[{description:`Şuanda ${fm[db.get("radyo")]} çalıyor`}]});
      
}
};