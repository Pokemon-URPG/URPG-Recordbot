const Discord = require("discord.js")
const logger = require("winston")
const auth = require("./auth.json")
const fs = require("fs")
const ss = require("string-similarity");


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
})
logger.level = "debug"
// Initialize Discord Bot
var bot = new Discord.Client()

bot.on("ready", function() {
    logger.info("Connected")
    logger.info("Logged in as: ")
    logger.info(bot.user.username + " - (" + bot.user.id + ")")
})

bot.on('error', console.error);

/*bot.on("disconnect", function(event) {
    var d = new Date()
    console.log(event.reason + "\ncode: " + event.code + "\ntime: " + d.getHours() + ":" + d.getMinutes())
    bot.connect()
})*/

bot.on("message", function(message) {
    let lowmessage = message.content.toLowerCase()
    if ((lowmessage.indexOf(",") == 0 || lowmessage.indexOf("statsbot") != -1 || message.channel.type == "dm") && lowmessage.indexOf("stats") != -1 && lowmessage.indexOf("?") == -1) {
        let oldmessage = lowmessage
        lowmessage = ""
        let tempMessage = ""
        for (let x = 0; x < oldmessage.length; x++) {
            if ((oldmessage[x] == "’") || (oldmessage[x] == "‘")) { tempMessage += "'" } else { tempMessage += oldmessage[x] }
        }
    	if (oldmessage.indexOf(",stats") == 0) { tempMessage += "'s stats"; }
        oldmessage = tempMessage
        if ((oldmessage.indexOf("gray's stats") != -1) || (oldmessage.indexOf("gray nine's stats") != -1) || (oldmessage.indexOf("gray 9's stats") != -1) || (oldmessage.indexOf("gn's stats") != -1) || (oldmessage.indexOf("g9's stats") != -1) || (oldmessage.indexOf("gmg's stats") != -1) || (oldmessage.indexOf("gm's stats") != -1)) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9849&pid=122945#pid122945") }
        if ((oldmessage.indexOf("jacen's stats") != -1) || (oldmessage.indexOf("jacenboy's stats") != -1) || (oldmessage.indexOf("jacen boy's stats") != -1)) { message.channel.send("\nhttp://urpg.jacenboy.com/pokes.php") }
        if (oldmessage.indexOf("rick's stats") != -1) { message.channel.send("\nhttps://urpg-rick.weebly.com/") }
        if ((oldmessage.indexOf("john's stats") != -1) || (oldmessage.indexOf("johnbdm's stats") != -1)) { message.channel.send("\nhttps://urpg-rick.weebly.com/") }
        if ((oldmessage.indexOf("blue's stats") != -1) || (oldmessage.indexOf("towel's stats") != -1)) { message.channel.send("\nhttps://www.tapatalk.com/groups/fuzzyhat_and_friends/the-atmospelago-f8/") }
        if ((oldmessage.indexOf("chainy's stats") != -1) || (oldmessage.indexOf("chain's stats") != -1) || (oldmessage.indexOf("reaction01's stats") != -1) || (oldmessage.indexOf("chainey's stats") != -1) || (oldmessage.indexOf("reaction's stats") != -1)) { message.channel.send("\nhttp://frozenchains.proboards.com/thread/82/pokemon-roster") }
        if (oldmessage.indexOf("smiles's stats") != -1) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=2175&pid=42539#pid42539") }
        if (oldmessage.indexOf("jake's stats") != -1) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9339") }
        if (oldmessage.indexOf("airik's stats") != -1) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=7362&pid=100381#pid100381") }
        if (oldmessage.indexOf("fusion's stats") != -1) { message.channel.send("\nhttp://fossilfusionurpg.proboards.com/post/3/thread") }
        if (oldmessage.indexOf("bee's stats") != -1) { message.channel.send("\nhttp://kingofcybertron.proboards.com/thread/15?page=1") }
        if (oldmessage.indexOf("roulette's stats") != -1) { message.channel.send("\nhttp://rdstatsfasho.proboards.com/post/3/thread") }
        if (oldmessage.indexOf("elamite's stats") != -1) { message.channel.send("\nhttp://krummhorn.boards.net/thread/1?page=1") }
        if (oldmessage.indexOf("commba's stats") != -1) { message.channel.send("\nhttp://w11.zetaboards.com/CommBAURPG/topic/7546474/1/") }
        if (oldmessage.indexOf("axion's stats") != -1) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=3987") }
        if (oldmessage.indexOf("izuru's stats") != -1) { message.channel.send("\nhttp://www.pokemoncrossroads.com/forum/showthread.php?18030-Izuru-s-Stats&p=279688&viewfull=1#post279688") }
        if (oldmessage.indexOf("fenris's stats") != -1) { message.channel.send("\nhttp://fenris-urpg.freeforums.net/thread/6/pokemon-number") }
        if ((oldmessage.indexOf("reneescarted's stats") != -1) || (oldmessage.indexOf("renee's stats") != -1) || (oldmessage.indexOf("renée's stats") != -1)) { message.channel.send("\nhttps://forum.pokemonurpg.com/showthread.php?tid=10261&pid=127856#pid127856") }
        if (oldmessage.indexOf("lychee's stats") != -1) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=8369") }
        if ((oldmessage.indexOf("swift's stats") != -1) || (oldmessage.indexOf("gallade's stats") != -1)) { message.channel.send("\nhttp://swiftgallade.freeforums.net/thread/2/pokemon-especially-gallade") }
        if (oldmessage.indexOf("zolar's stats") != -1) { message.channel.send("\nhttp://evilgeniusclub.proboards.com/thread/70/pokemon-numbered-list") }
        if (oldmessage.indexOf("pidge's stats") != -1) { message.channel.send("\nhttps://www.tapatalk.com/groups/pidge/pidge-f3/") }
        if ((oldmessage.indexOf("k'sa's stats") != -1) || (oldmessage.indexOf("k'sariya's stats") != -1)) { message.channel.send("\nhttps://ksariya.urpgstats.com/") }
        if ((oldmessage.indexOf("bulbasaur's stats") != -1) || (oldmessage.indexOf("eric's stats") != -1)) { message.channel.send("\nhttp://www.pokemoncrossroads.com/forum/showthread.php?2987-These-aren-t-Bulbasaur-s-URPG-Stats") }
        if (oldmessage.indexOf("dekrueger's stats") != -1) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9235&pid=116946#pid116946") }
        if ((oldmessage.indexOf("darkness ruler's stats") != -1) || (oldmessage.indexOf("dr's stats") != -1) || (oldmessage.indexOf("darknessruler's stats") != -1)) { message.channel.send("\nhttp://w11.zetaboards.com/DarknessRuler/topic/9170207/1/") }
        if ((oldmessage.indexOf("mako's stats") != -1) || (oldmessage.indexOf("morru's stats") != -1) || (oldmessage.indexOf("magnum's stats") != -1)) { message.channel.send("\nhttp://morrumagnumurpg.proboards.com/thread/2/pok-mon") }
        if ((oldmessage.indexOf("velo's stats") != -1) || (oldmessage.indexOf("jello's stats") != -1) || (oldmessage.indexOf("vj's stats") != -1)) { message.channel.send("\nhttps://velojellourpg.wordpress.com/") }
        if ((oldmessage.indexOf("weir's stats") != -1) || (oldmessage.indexOf("weirlind's stats") != -1) || (oldmessage.indexOf("weirlind120's stats") != -1) || (oldmessage.indexOf("gold's stats") != -1) || (oldmessage.indexOf("rrr's stats") != -1)) { message.channel.send("\nhttps://gold.urpgstats.com/pokemon/") }
        if (oldmessage.indexOf("nitro's stats") != -1) { message.channel.send("\nhttp://w11.zetaboards.com/nitro/topic/8043094/1/?x=0") }
        if ((oldmessage.indexOf("ralin's stats") != -1) || (oldmessage.indexOf("ralinocity's stats") != -1) || (oldmessage.indexOf("jack's stats") != -1)) { message.channel.send("\nhttps://jackurpg.wordpress.com/") }
        if ((oldmessage.indexOf("syn's stats") != -1) || (oldmessage.indexOf("synthesis's stats") != -1)) { message.channel.send("\nhttp://synthesisurpg.proboards.com/thread/2/re-current-pokemon") }
        if ((oldmessage.indexOf("evan's stats") != -1) || (oldmessage.indexOf("evanfardreamer's stats") != -1)) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9387") }
        if (oldmessage.indexOf("dash's stats") != -1) { message.channel.send("\nhttp://dashurpgstats.proboards.com/thread/1/pokemon"); oldmessage = "" }
        if ((oldmessage.indexOf("ash's stats") != -1) || (oldmessage.indexOf("ash k's stats") != -1) || (oldmessage.indexOf("ash k.'s stats") != -1)) { message.channel.send("\nhttp://ashkstatsurpg.proboards.com/thread/23/pok-mon-index") }
        if ((oldmessage.indexOf("fd's stats") != -1) || (oldmessage.indexOf("fierce deity's stats") != -1) || (oldmessage.indexOf("fierce diety's stats") != -1)) { message.channel.send("\nhttp://fd-stats.proboards.com/thread/4/slaves?page=1") }
        if ((oldmessage.indexOf("xali's stats") != -1) || (oldmessage.indexOf("xalipeno's stats") != -1) || (oldmessage.indexOf("xalipeño's stats") != -1)) { message.channel.send("\nhttp://jalapenowarrior.proboards.com/thread/17?page=1") }
        if (oldmessage.indexOf("seppe's stats") != -1) { message.channel.send("\nhttp://seppeurpg.proboards.com/thread/2/owned") }
        if ((oldmessage.indexOf("ori's stats") != -1) || (oldmessage.indexOf("oribhel's stats") != -1)) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9869") }
        if ((oldmessage.indexOf("jonas's stats") != -1) || (oldmessage.indexOf("jonastank's stats") != -1)) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9820") }
        if ((oldmessage.indexOf("menegoth's stats") != -1) || (oldmessage.indexOf("mene's stats") != -1)) { message.channel.send("\nhttp://menegothstats.freeforums.net/thread/2/pok-mon") }
        if (oldmessage.indexOf("liam's stats") != -1) { message.channel.send("\nhttp://s15.zetaboards.com/The_Stats_of_Liam/topic/7891449/1/") }
        if ((oldmessage.indexOf("team evolution's stats") != -1) || (oldmessage.indexOf("charmander4lyf's stats") != -1) || (oldmessage.indexOf("ketamine's stats") != -1)) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9307") }
        if ((oldmessage.indexOf("monbrey's stats") != -1) || (oldmessage.indexOf("mon's stats") != -1)) { message.channel.send("\nhttp://urpg.monbrey.com.au/stats/pokemon.php") }
        if ((oldmessage.indexOf("caite's stats") != -1) || (oldmessage.indexOf("caite-chan's stats") != -1) || (oldmessage.indexOf("caite chan's stats") != -1)) { message.channel.send("\nhttp://caitechan.proboards.com/thread/2") }
        if ((oldmessage.indexOf("gun's stats") != -1) || (oldmessage.indexOf("gun6's stats") != -1) || (oldmessage.indexOf("gun 6's stats") != -1)) { message.channel.send("\nhttp://www.pokemoncrossroads.com/forum/showthread.php?16180-Gun6-s-Stats") }
        if (oldmessage.indexOf("ataro's stats") != -1) { message.channel.send("\nhttp://s4.zetaboards.com/rustyrefbotataro/topic/8274811/1/") }
        if ((oldmessage.indexOf("magik's stats") != -1) || (oldmessage.indexOf("magikchicken's stats") != -1) || (oldmessage.indexOf("magik chicken's stats") != -1)) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=9237") }
        if ((oldmessage.indexOf("neon's stats") != -1) || (oldmessage.indexOf("neonsands's stats") != -1) || (oldmessage.indexOf("neonsand's stats") != -1)) { message.channel.send("\nhttps://pokemonurpg.com/archive/general.394/trainers-stats.401/the-stats-of-neonsands.60099.html") }
        if ((oldmessage.indexOf("felly's stats") != -1) || (oldmessage.indexOf("mistral's stats") != -1)) { message.channel.send("\nhttps://mistralurpg.wordpress.com/pokemon/") }
        if ((oldmessage.indexOf("haily's stats") != -1) || (oldmessage.indexOf("hailly's stats") != -1) || (oldmessage.indexOf("haillys's stats") != -1)) { message.channel.send("\nhttp://www.pokemoncrossroads.com/forum/showthread.php?16320-Haillys-s-Stats") }
        if ((oldmessage.indexOf("volt's stats") != -1) || (oldmessage.indexOf("voltaire's stats") != -1) || (oldmessage.indexOf("voltaire magneton's stats") != -1) || (oldmessage.indexOf("voltchen magneton's stats") != -1)) { message.channel.send("\nhttp://www.pokemoncrossroads.com/forum/showthread.php?6711-NEW-VoltChen-Magneton-s-Stats") }
        if ((oldmessage.indexOf("qe's stats") != -1) || (oldmessage.indexOf("se's stats") != -1) || (oldmessage.indexOf("sinnoheevee's stats") != -1) || (oldmessage.indexOf("sinnoh eevee's stats") != -1) || (oldmessage.indexOf("queen eevee's stats") != -1)) { message.channel.send("\nhttps://www.tapatalk.com/groups/sinnoheevee/current-pokemon-t1.html#p1") }
        if ((oldmessage.indexOf("princess crow's stats") != -1) || (oldmessage.indexOf("pc's stats") != -1) || (oldmessage.indexOf("hannah's stats") != -1)) { message.channel.send("\nhttp://princesscrow.proboards.com/thread/2/pokemon-list-1") }
        if ((oldmessage.indexOf("pv's stats") != -1) || (oldmessage.indexOf("vultan's stats") != -1) || (oldmessage.indexOf("artist's stats") != -1)) { message.channel.send("\nhttp://s13.zetaboards.com/Prince_Vultan/topic/9093369/1/") }
        if ((oldmessage.indexOf("julio's stats") != -1) || (oldmessage.indexOf("juliorain's stats") != -1) || (oldmessage.indexOf("julio rain's stats") != -1)) { message.channel.send("\nhttps://juliorain.wordpress.com/") }
        if ((oldmessage.indexOf("maxichel kigahen's stats") != -1) || (oldmessage.indexOf("mikey's stats") != -1) || (oldmessage.indexOf("mikey57's stats") != -1) || (oldmessage.indexOf("mikey 57's stats") != -1)) { message.channel.send("\nhttp://forum.pokemonurpg.com/showthread.php?tid=6289") }
        if ((oldmessage.indexOf("elrond 2.0's stats") != -1) || (oldmessage.indexOf("elrond's stats") != -1)) { message.channel.send("\nhttps://pokemonurpg.com/stats/Elrond") }
        if ((oldmessage.indexOf("soul's stats") != -1) || (oldmessage.indexOf("soul master's stats") != -1) || (oldmessage.indexOf("soulmaster's stats") != -1) || (oldmessage.indexOf("sm's stats") != -1)) { message.channel.send("\nhttp://soulmasterurpgf.proboards.com/thread/2/pokemon-own") }
        if ((oldmessage.indexOf("winter's stats") != -1) || (oldmessage.indexOf("wv's stats") != -1) || (oldmessage.indexOf("wintervines's stats") != -1)) { message.channel.send("\nhttp://frozenchains.proboards.com/thread/5") }
        if ((oldmessage.indexOf("siles's stats") != -1) || (oldmessage.indexOf("siless's stats") != -1)) { message.channel.send("\nhttp://silessurpg.proboards.com/thread/1/silesss-stats") }
        if ((oldmessage.indexOf("w32's stats") != -1) || (oldmessage.indexOf("coravint's stats") != -1)) { message.channel.send("\nhttps://project-507nm.neocities.org/pokemonlist.html") }
        if (oldmessage.indexOf("sou's stats") != -1) { message.channel.send("\nhttp://soucleife.proboards.com/thread/2/pokemon-stats") }
        if (oldmessage.indexOf("trainer17's stats") != -1) { message.channel.send("\nhttp://kingofcybertron.proboards.com/thread/35/pokemon-team?page=1") }
        if ((oldmessage.indexOf("captaindude's stats") != -1) || (oldmessage.indexOf("cd's stats") != -1)) { message.channel.send("\nhttp://captaindudeurpg.proboards.com/board/1") }
        if ((oldmessage.indexOf("mandl27's stats") != -1) || (oldmessage.indexOf("mandl's stats") != -1) || (oldmessage.indexOf("mand's stats") != -1) || (oldmessage.indexOf("ml's stats") != -1)) { message.channel.send("\nhttps://forum.pokemonurpg.com/showthread.php?tid=10276") }
    }
    if (message.content.indexOf(",rse ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("rse.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("rse.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\r\n")
        const desiredmove = lowmessage.split(",rse ")[1]
        for (let x = 0; x < moves.length; x += 2) {
            if (moves[x].split(" | ")[0].toLowerCase() == desiredmove) message.channel.send(moves[x] + "\n" + moves[x + 1])
        }
    }

    if (message.content.indexOf(",dppt ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("dppt.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("dppt.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\r\n\r\n")
        const desiredmove = lowmessage.split(",dppt ")[1]
        for (let x = 0; x < moves.length; x++) {
            if (moves[x].split(" | ")[0].toLowerCase() == desiredmove) message.channel.send(moves[x])
        }
    }

    if (message.content.indexOf(",oras ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("oras.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("oras.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\r\n")
        const desiredmove = lowmessage.split(",oras ")[1]
        for (let x = 0; x < moves.length; x += 2) {
            if (moves[x].split(" | ")[0].toLowerCase() == desiredmove) message.channel.send(moves[x] + "\n" + moves[x + 1])
        }
    }

    // rank lookup
    if (lowmessage.indexOf(",rank ") == 0) {
        if (lowmessage.split(" ")[1]) {
            const rankpoke = lowmessage.split(" ")[1]
            let pokemonlist = ""
            try { pokemonlist = fs.readFileSync("ranks.txt", "utf8") } catch (err) {
                if (err.code === "ENOENT") { message.channel.send("Sorry, my rank file seems to be missing!"); pokemonlist = "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n" } else { throw err }
            }
            const pokemonlists = pokemonlist.split("\r\n")
            let themessage = ""
            for (let x = 0; x < pokemonlists.length; x++) {
                if (rankpoke.indexOf("nidoran") != -1) {
                    themessage = "Female Nidoran is a Simple! You'll need to write 5,000-10,000 characters or have your art pass at a Simple rank!\nFemale Nidoran can also be be found in the Pokemart!\nMale Nidoran is a Medium! You'll need to write 10,000-20,000 characters or have your art pass at Medium rank!"
                    message.channel.send(themessage)
                    break
                }
                if (rankpoke.indexOf("muk") != -1) {
                    message.channel.send("That's a Complex! You'll need to write 30,000-40,000 characters or have your art pass at Complex rank!")
                    break
                }
                if (rankpoke.indexOf("abra") != -1) {
                    message.channel.send("That's a Complex! You'll need to write 30,000-40,000 characters or have your art pass at Complex rank!")
                    break
                }
                if (rankpoke.indexOf("easiest") != -1) {
                    message.channel.send(pokemonlists[0])
                    break
                }
                if (rankpoke.indexOf("simple") != -1) {
                    message.channel.send(pokemonlists[1])
                    break
                }
                if (rankpoke.indexOf("medium") != -1) {
                    message.channel.send(pokemonlists[2])
                    break
                }
                if (rankpoke.indexOf("hard") != -1) {
                    message.channel.send(pokemonlists[3])
                    break
                }
                if (rankpoke.indexOf("complex") != -1) {
                    message.channel.send(pokemonlists[4])
                    break
                }
                if (rankpoke.indexOf("demanding") != -1) {
                    message.channel.send(pokemonlists[5])
                    break
                }
                if (rankpoke.indexOf("merciless") != -1) {
                    message.channel.send(pokemonlists[6])
                    break
                }
                if (rankpoke.indexOf("stupefying") != -1) {
                    message.channel.send(pokemonlists[7])
                    break
                }
                if (rankpoke.indexOf("legendary") != -1) {
                    message.channel.send(pokemonlists[8])
                    break
                }
                if (pokemonlists[x].toLowerCase().indexOf(rankpoke) != -1) {
                    if (x == 0) themessage = "That's an Easiest! You'll need to write 3,000-5,000 characters or have your art pass at Easiest rank!"
                    if (x == 1) themessage = "That's a Simple! You'll need to write 5,000-10,000 characters or have your art pass at Simple rank!"
                    if (x == 2) themessage = "That's a Medium! You'll need to write 10,000-20,000 characters or have your art pass at Medium rank!"
                    if (x == 3) themessage = "That's a Hard! You'll need to write 20,000-30,000 characters or have your art pass at Hard rank!"
                    if (x == 4) themessage = "That's a Complex! You'll need to write 30,000-40,000 characters or have your art pass at Complex rank!"
                    if (x == 5) themessage = "That's a Demanding! You'll need to write 40,000-55,000 characters or have your art pass at Demanding rank!"
                    if (x == 6) themessage = "That's a Merciless! You'll need to write 55,000-65,000 characters or have your art pass at Merciless rank!"
                    if (x == 7) themessage = "That's a Stupefying! You'll need to write 65,000-75,000 characters or have your art pass at Stupefying rank!"
                    if (x == 8) themessage = "That's a Legendary! You'll need to earn the equivalent of $500,000 through your stories or art!"
                    if (x == 9) themessage = "That's mine!"
                    try { pokemonlist = fs.readFileSync("mart.txt", "utf8") } catch (err) {
                        if (err.code === "ENOENT") { message.channel.send("Sorry, my mart file seems to be missing!"); pokemonlist = "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n" } else { throw err }
                    }
                    if (pokemonlist.toLowerCase().indexOf(rankpoke) != -1) { themessage += "\nYou can also find it in the Pokemart!" }
                    try { pokemonlist = fs.readFileSync("berry.txt", "utf8") } catch (err) {
                        if (err.code === "ENOENT") { message.channel.send("Sorry, my berry store file seems to be missing!"); pokemonlist = "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n" } else { throw err }
                    }
                    if (pokemonlist.toLowerCase().indexOf(rankpoke) != -1) { themessage += "\nYou can also find it in the Berry Store!" }
                    message.channel.send(themessage)
                    break
                }
            }
        }
    }

    if (lowmessage.indexOf(",calc") == 0) { message.channel.send("https://pokemonurpg.com/calcs/battlev3.html"); }
    if (lowmessage.indexOf(",info") == 0) { message.channel.send("https://pokemonurpg.com/info/"); }
    if (lowmessage.indexOf(",forum") == 0) { message.channel.send("https://forum.pokemonurpg.com/"); }
    if (lowmessage.indexOf(",mart") == 0) { message.channel.send("http://forum.pokemonurpg.com/showthread.php?tid=1682"); }
    if (lowmessage.indexOf(",berry") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1686"); }

    if (message.guild === null) {
    	if (lowmessage.indexOf("noreply:") == 0 || lowmessage.indexOf("no reply:") == 0) {
    		var anonReport = "Anonymous Report:```"
    		anonReport += message.content;
    		anonReport += "```"
    		bot.channels.get("545737721612730368").send(anonReport);
    		message.author.send("Thank you for your report!  It has been sent to the staff team for review.");
    	}
    	/*if (lowmessage.indexOf("noreplymods:") == 0 || lowmessage.indexOf("noreply mods:") == 0 || lowmessage.indexOf("no reply mods:") == 0) {
    		var anonReport = "Anonymous Report:```"
    		anonReport += message.content;
    		anonReport += "```"
    		bot.channels.get("384871044676190210").send(anonReport);
    		message.author.send("Thank you for your report!  It has been sent to the mod team for review.");
    	}
    	if (lowmessage.indexOf("noreplyash:") == 0 || lowmessage.indexOf("noreply ash:") == 0 || lowmessage.indexOf("no reply ash:") == 0) {
    		var anonReport = "Anonymous Report:```"
    		anonReport += message.content;
    		anonReport += "```"
    		bot.users.get("135999597947387904").send(anonReport);
    		message.author.send("Thank you for your report!  It has been sent to the Ash for review.");
    	}
    	if (lowmessage.indexOf("noreplyksariya:") == 0 || lowmessage.indexOf("noreply ksariya:") == 0 || lowmessage.indexOf("no reply ksariya:") == 0) {
    		var anonReport = "Anonymous Report:```"
    		anonReport += message.content;
    		anonReport += "```"
    		bot.users.get("140309419270340609").send(anonReport);
    		message.author.send("Thank you for your report!  It has been sent to the K'sariya for review.");
    	}
    	if (lowmessage.indexOf("noreplyelrond:") == 0 || lowmessage.indexOf("noreply elrond:") == 0 || lowmessage.indexOf("no reply elrond:") == 0) {
    		var anonReport = "Anonymous Report:```"
    		anonReport += message.content;
    		anonReport += "```"
    		bot.users.get("138655409018896384").send(anonReport);
    		message.author.send("Thank you for your report!  It has been sent to the Elrond for review.");
    	}*/
    	if (lowmessage.indexOf("reply:") == 0) {
    		var anonReport = "Anonymous Report from ";
    		anonReport += message.channel.id;
    		anonReport += ":```"
    		anonReport += message.content;
    		anonReport += "```Send ,anonreply_"
            anonReport += message.channel.id;
            anonReport += "_MESSAGE in <#135870064573284352> and I'll send MESSAGE back."
    		bot.channels.get("545737721612730368").send(anonReport);
            message.author.send("Thank you for your report!  It has been sent to the staff team for review.  When they have a reply, I'll pass it back to you!");
    		//bot.channels.get("254207242780409857").createMessageCollector
    	}
    }
    else {
    	if (message.channel.id == 409818526313086976 || message.channel.id == 254207242780409857) {
    		if (lowmessage.indexOf(",help") == 0) {
    			if (lowmessage.indexOf("stat") != -1) {
    				message.channel.send("Send either `,stats NAME` or a message containing `NAME's stats` and either starting with `,` or containing `statsbot` and I will link you to their stats!  I accept some commonly used nicknames.  If you know of stats that I don't, please @ Ash K. with the username and link and they will be added.");
    			}
    			else if (lowmessage.indexOf("rank") != -1) {
    				message.channel.send("Send `,rank POKÉMON` and I'll tell you what rank `POKÉMON` is in art and stories, as well as if it's in the Pokémart or Berry Store!  Alternatively, if you send `,rank RANK` I'll tell you all the Pokémon that are RANK in art and stories!")
    			}
    			else if (lowmessage.indexOf("rse") != -1) {
    				message.channel.send("Send `,rse MOVE` and I'll tell you what `MOVE` does in RSE Contests!");
    			}
    			else if (lowmessage.indexOf("dppt") != -1) {
    				message.channel.send("Send `,dppt MOVE` and I'll tell you what `MOVE` does in DPPt Contests!");
    			}
	    		else if (lowmessage.indexOf("oras") != -1) {
    				message.channel.send("Send `,oras MOVE` and I'll tell you what `MOVE` does in ORAS Contests!");
    			}
                else if (lowmessage.indexOf("mention") != -1) {
                    message.channel.send("`,mentionrefs`, `,mentionjudges`, `,mentioncurators`, `,mentiongraders`, `,mentionrangers`, or `mentionarbiters`: Pings the applicable role with a message.  Doing so requires either being a senior of that section or the permission to mention everyone.\n`,mentionffa`: Pings Forum FFA role with a message.  Doing so requires either Forum FFA Host role or mention everyone permission.\n`,mentionmembers`: Pings member role with a message.  Doing so requires mention everyone permission.")
                }
	    		else if (lowmessage.indexOf(",help help") == 0) {
    				message.channel.send("Send `,help` to get the general help command or send `,help COMMAND` for more info on how to use `COMMAND`.  Please note that all help commands only work in <#409818526313086976> to reduce spam.")
    			}
    			else {
    				var helpMessage = "**Commands:**\n`,stats NAME`: Get a link to a NAME's stats.\n`,rank POKÉMON`: Figure out how to acquire POKÉMON in URPG (please note it will not be an exhaustive list and will not include how to acquire pre-evolutions)\n`,rank RANK`: I'll tell you all the Pokémon that are RANK in art and stories!\n`,rse MOVE` or `,dppt MOVE` or `,oras MOVE`: Contest move lookups for their respective contest types.\n`,spoiler` or `,rank spoiler`: Give or remove spoilers role from yourself, which gives access to the spoilers chat.\n`,info`: Get a link to URPG's Infohub.\n`,forum`: Get a link to URPG's forums.\n`,calc`: Get a link to the online reffing calculator.\n`,mart`: Get a link to the Pokémart.\n`,berry`: Get a link to the Berry Store.\n`,help`: Display this message.\n`,help COMMAND`: Display a quick summary of how to use COMMAND and what it does.\n\n**Additional features:**\nI accept anonymous feedback!  Send me a direct message beginning with `noreply:` or `no reply:` and I will relay your message to staff.\nIf you instead begin an anonymous report with `reply:`, I will relay your message and leave a way for staff to respond.  *I relay only the ID of the DM channel between you and me, not your user ID or other information a human can use to identify you*.\nI keep records of deleted messages, majorly edited messages, and members leaving the server.\nI add <:ffa_gg:246070314163896320> to applicable messages in FFA chats!\nI assist in mentioning roles!  See `,help mention` for more info.  Doing so requires specific roles.\nI archive chats as needed!  A moderator can call `,archive` to do so for that chat.\n\n**Note:** All commands are case insensitive.  If you have a suggestion for additional features, feel free to message Ash K. with your idea!";
	    			message.channel.send(helpMessage);
    			}
    		}
    	}
    	/*if (lowmessage.indexOf("hippopotomonstrosesquipedaliophobia") != -1 && !message.author.bot) {
    		message.delete();
    		var contextMessage = "Message deleted for containing a questionable phrase after https://discordapp.com/channels/";
    		contextMessage += message.guild.id;
    		contextMessage += "/";
    		contextMessage += message.channel.id;
    		contextMessage += "/";
    		//contextMessage += channel.fetchMessages({ limit: 1, before: deletedMessage.id }); //NOTE TO SELF: This still needs to properly convert to message ID
    		bot.channels.get("254207242780409857").send(contextMessage);
    	}*/
    	/*if (lowmessage.indexOf(",mention") == 0 && message.author.id == 135999597947387904) {
    		bot.guilds.get("135864828240592896").roles.get("444947836476325889").setMentionable(true).then(bot.channels.get("254207242780409857").send(`${bot.guilds.get("135864828240592896").roles.get("444947836476325889")}`)).then(bot.guilds.get("135864828240592896").roles.get("444947836476325889").setMentionable(false));
    	}*/
        if ((message.channel.id == "136222872371855360" || message.channel.id == "269634154101080065") && lowmessage.indexOf("and") != -1 && lowmessage.indexOf("out") != -1 && lowmessage.indexOf("and") < lowmessage.indexOf("out")) {
            message.react(message.guild.emojis.get("246070314163896320"));
        }
        if (lowmessage.indexOf(",role spoiler") == 0 || lowmessage.indexOf(",spoiler") == 0) {
            if (message.member.roles.has("440004078219558912")) {
                message.member.removeRole(message.guild.roles.get("440004078219558912"));
                message.channel.send("Spoilers role removed!")
            }
            else {
                message.member.addRole(message.guild.roles.get("440004078219558912"));
                message.channel.send("Spoilers role added!")
            }
        }
    }
    if (message.channel.id == 135870064573284352 && lowmessage.indexOf(",anonreply") == 0) {
    	const anonReply = lowmessage.split("_");
    	bot.channels.get(anonReply[1]).send(anonReply[2]);
    }
})

bot.on("message", async function(message){
    var lowmessage = message.content.toLowerCase();
    if (message.guild === null) {return;}
    if (message.guild.id != "135864828240592896") {return;}
    //message.channel.send(`This is a test: ${message.member.roles.some(role => role.id == 444947836476325889)}`)
    if (lowmessage.indexOf(",mentionrefs") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("358431855743336448"))) {
        await bot.guilds.get("135864828240592896").roles.get("243949285438259201").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("243949285438259201")}${lowmessage.split(",mentionrefs")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("243949285438259201").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionjudges") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("358435669372305408"))) {
        await bot.guilds.get("135864828240592896").roles.get("243950906683424768").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("243950906683424768")}${lowmessage.split(",mentionjudges")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("243950906683424768").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentioncurators") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("419775555488186369"))) {
        await bot.guilds.get("135864828240592896").roles.get("312119111750647809").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("312119111750647809")}${lowmessage.split(",mentioncurators")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("312119111750647809").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentiongraders") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("419636334982987777"))) {
        await bot.guilds.get("135864828240592896").roles.get("312118803616235523").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("312118803616235523")}${lowmessage.split(",mentiongraders")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("312118803616235523").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionrangers") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("419636474825277450"))) {
        await bot.guilds.get("135864828240592896").roles.get("312119050484449280").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("312119050484449280")}${lowmessage.split(",mentionrangers")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("312119050484449280").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionarbiters") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("533356631455694849"))) {
        await bot.guilds.get("135864828240592896").roles.get("533356018005180416").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("533356018005180416")}${lowmessage.split(",mentionarbiters")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("533356018005180416").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionffa") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("507342993028808707"))) {
        await bot.guilds.get("135864828240592896").roles.get("507342482988859402").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("507342482988859402")}${lowmessage.split(",mentionarbiters")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("507342482988859402").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionmembers") == 0 && message.member.hasPermission("MENTION_EVERYONE")) {
        await bot.guilds.get("135864828240592896").roles.get("456993685679243286").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("456993685679243286")}${lowmessage.split(",mentionarbiters")[1]}`);
        bot.guilds.get("135864828240592896").roles.get("456993685679243286").setMentionable(false);
    }
    if (lowmessage == ",archive" && message.member.hasPermission("MANAGE_CHANNELS")) {
        await message.channel.setParent(bot.guilds.get("135864828240592896").channels.get("432291722492379136"));
        message.channel.lockPermissions();
    }
    if (lowmessage.indexOf(",records available") == 0 && message.member.hasPermission("MANAGE_SERVER")) {
        await message.channel.send("Be right back!");
        await bot.destroy();
        await bot.login(auth.token);
        message.channel.send("I'm back!  Did you miss me?");
    }
})
/* var logChannel = bot.channels.get("254207242780409857")
bot.on('messageDelete', function (author, content, channel) {
	bot.sendMessage({to: 254207242780409857, message: content + " by " + author + " in " + channel + " was deleted.")
})*/

/* bot.on('messageDelete', function(message){
  bot.log(`a message saying ${message.cleanContent} was deleted from channel: ${message.channel.name} at ${new Date()}`);
  //client.channels.get("CHANNEL_ID").send(`A message saying "${message.cleanContent}" has been deleted at ${new Date()}`)
  //deletedMessage = `A message saying "${message.cleanContent}" has been deleted at ${new Date()}`
  bot.sendMessage({to: 254207242780409857, message: `a message saying ${message.cleanContent} was deleted from channel: ${message.channel.name} at ${new Date()}`})
});*/

bot.on("messageDelete", async function(message) {
    // bot.log(`a message saying ${message.cleanContent} was deleted.`);
    // client.channels.get("CHANNEL_ID").send(`A message saying "${message.cleanContent}" has been deleted at ${new Date()}`)
    // deletedMessage = `A message saying "${message.cleanContent}" has been deleted at ${new Date()}`
    // var removedMessage = Object.keys(message.d);
    //const testing = Object.keys(message);
    // var channelOfMessage = bot.channels[message.d.channel_id]
    //const channelOfMessage = message.channel.id
    // bot.sendMessage({to: "254207242780409857", message: `A message saying ${removedMessage} was deleted.`});
    /* var notice = "A message in #";
  notice += channelOfMessage;
  notice += " was deleted.";*/
    //if (channelOfMessage == 261370056246689792) { bot.channels.get("136595690980638720").send("Someone deleted a message from <#261370056246689792>.") } else {
    //    bot.channels.get("254207242780409857").send(`Keys: ${testing}`); 
    if (message.guild === null) {return;}
    if (!message.guild.available) {return;}
    if (message.guild.id != 135864828240592896) {return;}
    if (message.author.id == "461133571034316810") {return;}
    var channelToNotify = "545384090044727296";
    if (message.channel.id == 261370056246689792) {channelToNotify = "136595690980638720";}
    if (message.channel.id == 294334136355651584) {channelToNotify = "294333921200701450";}
    if (message.channel.id == 384871044676190210) {channelToNotify = "384871044676190210";}
    if (message.channel.id == 253364200955445248) {channelToNotify = "524695540995325971";}
    if (message.channel.id == 254207242780409857) {channelToNotify = "254207242780409857";}
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else { 
        user = message.author.username
    }
    var deleteLog = "The following message by ";
    deleteLog += message.author.username;
    deleteLog += " was deleted from <#";
    deleteLog += message.channel.id;
    /*if (message.author.bot) {
        deleteLog += ">: ```"
    } else {*/
        deleteLog += "> by ";
        deleteLog += user;
        deleteLog += ": ```";
    //}
    deleteLog += message.cleanContent;
    deleteLog += "```";
    //channelToNotify = "254207242780409857";
    bot.channels.get(channelToNotify).send (deleteLog);
    /*if (channelOfMessage == 261370056246689792) { bot.channels.get("136595690980638720").send("Someone deleted a message from <#261370056246689792>.") } else {
        bot.channels.get("545384090044727296").send(`A <#${channelOfMessage}> message has been deleted.`)
    }*/
})

bot.on("messageUpdate", function(oldMessage, newMessage) {
    var channelToNotify = "545384090044727296";
    const diff = ss.compareTwoStrings(oldMessage.content, newMessage.content);
    if (oldMessage.guild === null && (oldMessage.content.toLowerCase().indexOf("noreply:") == 0 || oldMessage.content.toLowerCase().indexOf("no reply:") == 0 || newMessage.content.toLowerCase().indexOf("noreply:") == 0 || newMessage.content.toLowerCase().indexOf("no reply:") == 0 || oldMessage.content.toLowerCase().indexOf("reply:") == 0 || newMessage.content.toLowerCase().indexOf("reply:") == 0)) {
        var editLog = "An anonymous report";
        if (newMessage.content.toLowerCase().indexOf("reply:") == 0) {
            editLog += " from "
            editLog += newMessage.channel.id;
        }
        editLog += " has been edited to say the following: ```";
        editLog += newMessage.cleanContent;
        editLog += "```";
        bot.channels.get("545737721612730368").send(editLog);
        return;
    }
    if (!oldMessage.guild.available) {return;}
    if (oldMessage.guild.id != 135864828240592896) {return;}
    if (oldMessage.author.bot) {return;}
    if (diff <= .8 || oldMessage.channel.id == 261370056246689792 || oldMessage.channel.id == 294334136355651584) {
    	if (newMessage.content.length > 5 || oldMessage.content.length > 5 || oldMessage.channel.id == 261370056246689792 || oldMessage.channel.id == 294334136355651584) {
    		if (oldMessage.channel.id == 261370056246689792) {channelToNotify = "136595690980638720";}
    		if (oldMessage.channel.id == 294334136355651584) {channelToNotify = "294333921200701450";}
    		if (oldMessage.channel.id == 384871044676190210) {channelToNotify = "384871044676190210";}
    		if (oldMessage.channel.id == 253364200955445248) {channelToNotify = "524695540995325971";}
    		if (oldMessage.channel.id == 254207242780409857) {channelToNotify = "254207242780409857";}
    		var deleteLog = newMessage.url;
    		/*deleteLog += " by ";
    		deleteLog += message.author.username;
    		deleteLog += " was deleted from <#";
    		deleteLog += message.channel.id;*/
    		deleteLog += " used to say: ```";
    		deleteLog += oldMessage.cleanContent;
    		deleteLog += "```";
    		//deleteLog += diff;
    		//channelToNotify = "254207242780409857";
    		bot.channels.get(channelToNotify).send (deleteLog);
    	}
    }
    /*if (channelOfMessage == 261370056246689792) { bot.channels.get("136595690980638720").send("Someone deleted a message from <#261370056246689792>.") } else {
        bot.channels.get("545384090044727296").send(`A <#${channelOfMessage}> message has been deleted.`)
    }*/
})

/* bot.on('messageUpdate', function(oldMessage, newMessage){
	bot.sendMessage({to: "254207242780409857", message: `A message saying ${oldMessage} has been edited to say ${newMessage}.`});
})*/

/* bot.on('messageDelete', async (message) => {
  /*const logs = message.guild.channels.find(channel => channel.name === "logs");
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('logs', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
  }  
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }
  logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
})*/

bot.on("guildMemberRemove", function(member) {
    var left = bot.users.get(member.id)
    bot.channels.get("545384090044727296").send(`Member ${left.username} has left.`)
//    if (member.roles.prototype.size != 0) {}
})

bot.login(auth.token)
