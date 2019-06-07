const Discord = require("discord.js")
const logger = require("winston")
const fs = require("fs")
const ss = require("string-similarity");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
})
logger.level = "debug"
// Initialize Discord Bot
var bot = new Discord.Client({ disableEveryone: true })
var badWords = ["gay", " fag", "fag ", "retard", "cuck", ];

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
    var badWordsLog = "";
    for (let i = 0; i < badWords.length; i++) {
        if ((lowmessage.indexOf(badWords[i]) != -1 || lowmessage == "fag") && !message.author.bot && badWordsLog == "") {
            badWordsLog += message.member.displayName;
            badWordsLog += " said the following here <";
            badWordsLog += message.url;
            badWordsLog += ">: ```";
            badWordsLog += message.cleanContent;
            badWordsLog += "```"
        }
    }
    if (badWordsLog != "") {bot.channels.get("545384090044727296").send(badWordsLog);}
    //if ((lowmessage.indexOf(",") == 0 || lowmessage.indexOf("statsbot") != -1 || message.channel.type == "dm") && lowmessage.indexOf("stats") != -1 && lowmessage.indexOf("?") == -1) {
    if (lowmessage.indexOf(",stats") == 0 || lowmessage.indexOf("'s statsbot") != -1) {
        let oldmessage = " " + lowmessage.replace(/'s statsbot/g, " ") + " ";
        /*lowmessage = ""
        let tempMessage = ""
        for (let x = 0; x < oldmessage.length; x++) {
            if ((oldmessage[x] == "’") || (oldmessage[x] == "‘")) { tempMessage += "'" } else { tempMessage += oldmessage[x] }
        }
    	if (oldmessage.indexOf(",stats") == 0) { tempMessage += ""; }
        oldmessage = tempMessage + " ";*/
        if ((oldmessage.indexOf("gray ") != -1) || (oldmessage.indexOf("gray nine ") != -1) || (oldmessage.indexOf("gray 9 ") != -1) || (oldmessage.indexOf(" gn ") != -1) || (oldmessage.indexOf("g9 ") != -1) || (oldmessage.indexOf("gmg ") != -1) || (oldmessage.indexOf(" gm ") != -1)) { message.channel.send("\nGray Nine's stats: http://forum.pokemonurpg.com/showthread.php?tid=9849&pid=122945#pid122945") }
        if ((oldmessage.indexOf("jacen ") != -1) || (oldmessage.indexOf("jacenboy ") != -1) || (oldmessage.indexOf("jacen boy ") != -1)) { message.channel.send("\nJacenBoy's stats: http://urpg.jacenboy.com/pokes.php") }
        if (oldmessage.indexOf("rick ") != -1) { message.channel.send("\nRick's stats: https://urpg-rick.weebly.com/") }
        if ((oldmessage.indexOf("john ") != -1) || (oldmessage.indexOf("johnbdm ") != -1)) { message.channel.send("\nJohnBDM's stats: https://urpg-rick.weebly.com/") }
        if ((oldmessage.indexOf("blue ") != -1) || (oldmessage.indexOf("towel ") != -1) || (oldmessage.indexOf("bt ") != -1)) { message.channel.send("\nBlueTowel's stats: https://www.tapatalk.com/groups/fuzzyhat_and_friends/the-atmospelago-f8/") }
        if ((oldmessage.indexOf("chainy ") != -1) || (oldmessage.indexOf("chain ") != -1) || (oldmessage.indexOf("reaction01 ") != -1) || (oldmessage.indexOf("chainey ") != -1) || (oldmessage.indexOf("reaction ") != -1)) { message.channel.send("\nChainReaction01's stats: http://frozenchains.proboards.com/thread/82/pokemon-roster") }
        if (oldmessage.indexOf("smiles ") != -1) { message.channel.send("\nSmiles's stats: http://forum.pokemonurpg.com/showthread.php?tid=2175&pid=42539#pid42539") }
        if (oldmessage.indexOf("jake ") != -1) { message.channel.send("\nCowboyJake's stats: http://forum.pokemonurpg.com/showthread.php?tid=9339") }
        if (oldmessage.indexOf("airik ") != -1) { message.channel.send("\nAirik's stats: http://forum.pokemonurpg.com/showthread.php?tid=7362&pid=100381#pid100381") }
        if (oldmessage.indexOf("fusion ") != -1) { message.channel.send("\nFossilFusion's stats: http://fossilfusionurpg.proboards.com/post/3/thread") }
        if ((oldmessage.indexOf("bee ") != -1) || (oldmessage.indexOf("dinobot ") != -1)) { message.channel.send("\nDinobot's stats: http://kingofcybertron.proboards.com/thread/15?page=1") }
        if (oldmessage.indexOf("roulette ") != -1) { message.channel.send("\nRoulette's stats: http://rdstatsfasho.proboards.com/post/3/thread") }
        if (oldmessage.indexOf("elamite ") != -1) { message.channel.send("\nElamite's stats: http://krummhorn.boards.net/thread/1?page=1") }
        if (oldmessage.indexOf("commba ") != -1) { message.channel.send("\nCommBA's stats: http://w11.zetaboards.com/CommBAURPG/topic/7546474/1/") }
        if (oldmessage.indexOf("axion ") != -1) { message.channel.send("\nAxion's stats: http://forum.pokemonurpg.com/showthread.php?tid=3987") }
        if (oldmessage.indexOf("izuru ") != -1) { message.channel.send("\nIzuru's stats: http://www.pokemoncrossroads.com/forum/showthread.php?18030-Izuru-s-Stats&p=279688&viewfull=1#post279688") }
        if (oldmessage.indexOf("fenris ") != -1) { message.channel.send("\nFenris's stats: https://fenris-urpg.freeforums.net/thread/134/pokemon-stats") }
        if ((oldmessage.indexOf("reneescarted ") != -1) || (oldmessage.indexOf("renee ") != -1) || (oldmessage.indexOf("renée ") != -1)) { message.channel.send("\nRenéeScarted's stats: https://forum.pokemonurpg.com/showthread.php?tid=10261&pid=127856#pid127856") }
        if (oldmessage.indexOf("lychee ") != -1) { message.channel.send("\nLychee's stats: http://forum.pokemonurpg.com/showthread.php?tid=8369") }
        if ((oldmessage.indexOf("swift") != -1) || (oldmessage.indexOf("gallade ") != -1)) { message.channel.send("\nSwiftGallade46's stats: http://swiftgallade.freeforums.net/thread/2/pokemon-especially-gallade") }
        if (oldmessage.indexOf("zolar ") != -1) { message.channel.send("\nZolar's stats: http://evilgeniusclub.proboards.com/thread/70/pokemon-numbered-list") }
        if (oldmessage.indexOf("pidge ") != -1) { message.channel.send("\nPidge's stats: https://www.tapatalk.com/groups/pidge/pidge-f3/") }
        if ((oldmessage.indexOf("k'sa ") != -1) || (oldmessage.indexOf("k'sariya ") != -1)) { message.channel.send("\nK'sariya's stats: https://ksariya.urpgstats.com/") }
        if ((oldmessage.indexOf("saur ") != -1) || (oldmessage.indexOf("eric ") != -1)) { message.channel.send("\nSaur's stats: https://forum.pokemonurpg.com/showthread.php?tid=9871&pid=123349#pid123349") }
        if (oldmessage.indexOf("dekrueger ") != -1) { message.channel.send("\nDeKrueger's stats: http://forum.pokemonurpg.com/showthread.php?tid=9235&pid=116946#pid116946") }
        if ((oldmessage.indexOf("darkness ruler ") != -1) || (oldmessage.indexOf("dr ") != -1) || (oldmessage.indexOf("darknessruler ") != -1)) { message.channel.send("\nDarknessRuler's stats: http://w11.zetaboards.com/DarknessRuler/topic/9170207/1/") }
        if ((oldmessage.indexOf("mako ") != -1) || (oldmessage.indexOf("morru ") != -1) || (oldmessage.indexOf("magnum ") != -1)) { message.channel.send("\nMako's stats: http://morrumagnumurpg.proboards.com/thread/2/pok-mon") }
        if ((oldmessage.indexOf("velo ") != -1) || (oldmessage.indexOf("jello ") != -1) || (oldmessage.indexOf(" vj ") != -1)) { message.channel.send("\nVeloJello's stats: https://velojellourpg.wordpress.com/") }
        if ((oldmessage.indexOf("weir") != -1) /*|| (oldmessage.indexOf("weirlind ") != -1) || (oldmessage.indexOf("weirlind120 ") != -1) || (oldmessage.indexOf("rrr") != -1)*/ || (oldmessage.indexOf("gold ") != -1)) { message.channel.send("\nGold's stats: https://gold.urpgstats.com/pokemon/") }
        if (oldmessage.indexOf("nitro ") != -1) { message.channel.send("\nNitro's stats: http://w11.zetaboards.com/nitro/topic/8043094/1/?x=0") }
        if ((oldmessage.indexOf("ralin") != -1) /*|| (oldmessage.indexOf("ralinocity") != -1)*/ || (oldmessage.indexOf("jack ") != -1)) { message.channel.send("\nJack's stats: https://jackurpg.wordpress.com/") }
        if ((oldmessage.indexOf("syn ") != -1) || (oldmessage.indexOf("synthesis ") != -1)) { message.channel.send("\nSynthesis's stats: http://synthesisurpg.proboards.com/thread/2/re-current-pokemon") }
        if ((oldmessage.indexOf("evan ") != -1) || (oldmessage.indexOf("evanfardreamer ") != -1)) { message.channel.send("\nEvanfardreamer's stats: http://forum.pokemonurpg.com/showthread.php?tid=9387") }
        if (oldmessage.indexOf("dash ") != -1) { message.channel.send("\nDash's stats: http://dashurpgstats.proboards.com/thread/1/pokemon") }
        if ((oldmessage.indexOf(" ash ") != -1) /*|| (oldmessage.indexOf("ash k") != -1) || (oldmessage.indexOf("ash k.") != -1)*/) { message.channel.send("\nAsh K.'s stats: http://ashkstatsurpg.proboards.com/thread/23/pok-mon-index") }
        if ((oldmessage.indexOf(" fd ") != -1) || (oldmessage.indexOf("fierce deity ") != -1) || (oldmessage.indexOf("fierce diety ") != -1)) { message.channel.send("\nFierce Deity's stats: http://fd-stats.proboards.com/thread/4/slaves?page=1") }
        if ((oldmessage.indexOf("xali ") != -1) || (oldmessage.indexOf("xalipeno ") != -1) || (oldmessage.indexOf("xalipeño ") != -1)) { message.channel.send("\nXali's stats: http://jalapenowarrior.proboards.com/thread/17?page=1") }
        if (oldmessage.indexOf("seppe ") != -1) { message.channel.send("\nSeppe's stats: http://seppeurpg.proboards.com/thread/2/owned") }
        if ((oldmessage.indexOf("ori ") != -1) || (oldmessage.indexOf("oribhel ") != -1) || (oldmessage.indexOf("heltear ") != -1)) { message.channel.send("\nHeltear's stats: http://forum.pokemonurpg.com/showthread.php?tid=9869") }
        if ((oldmessage.indexOf("jonas ") != -1) || (oldmessage.indexOf("jonastank ") != -1)) { message.channel.send("\nJonasTank's stats: http://forum.pokemonurpg.com/showthread.php?tid=9820") }
        if ((oldmessage.indexOf("menegoth ") != -1) || (oldmessage.indexOf("mene ") != -1)) { message.channel.send("\nMenegoth's stats: http://menegothstats.freeforums.net/thread/2/pok-mon") }
        if (oldmessage.indexOf("liam ") != -1) { message.channel.send("\nLiam's stats: https://liamsstats.home.blog/") }
        if ((oldmessage.indexOf("team evolution ") != -1) || (oldmessage.indexOf("charmander4lyf ") != -1) || (oldmessage.indexOf("ketamine ") != -1) || (oldmessage.indexOf(" te ") != -1)) { message.channel.send("\nTeam Evolution's stats: http://forum.pokemonurpg.com/showthread.php?tid=9307") }
        if ((oldmessage.indexOf("monbrey ") != -1) || (oldmessage.indexOf("mon ") != -1)) { message.channel.send("\nMonbrey's stats: https://urpg.monbrey.com.au/stats-new/") }
        if ((oldmessage.indexOf("caite ") != -1) || (oldmessage.indexOf("caite-chan ") != -1) || (oldmessage.indexOf("caite chan ") != -1)) { message.channel.send("\nCaite Chan's stats: http://caitechan.proboards.com/thread/2") }
        if ((oldmessage.indexOf("gun ") != -1) || (oldmessage.indexOf("gun6 ") != -1) || (oldmessage.indexOf("gun 6 ") != -1)) { message.channel.send("\ngun6's stats: http://www.pokemoncrossroads.com/forum/showthread.php?16180-Gun6-s-Stats") }
        if (oldmessage.indexOf("ataro ") != -1) { message.channel.send("\nAtaro's stats: http://s4.zetaboards.com/rustyrefbotataro/topic/8274811/1/") }
        if ((oldmessage.indexOf("magik ") != -1) || (oldmessage.indexOf("magikchicken ") != -1) || (oldmessage.indexOf("magik chicken ") != -1)) { message.channel.send("\nMagikchicken's stats: http://forum.pokemonurpg.com/showthread.php?tid=9237") }
        if ((oldmessage.indexOf("neon ") != -1) || (oldmessage.indexOf("neonsands ") != -1) || (oldmessage.indexOf("neonsand ") != -1)) { message.channel.send("\nNeonsands's stats: https://pokemonurpg.com/archive/general.394/trainers-stats.401/the-stats-of-neonsands.60099.html") }
        if ((oldmessage.indexOf("felly ") != -1) || (oldmessage.indexOf("mistral ") != -1)) { message.channel.send("\nFelly's stats: https://mistralurpg.wordpress.com/pokemon/") }
        if ((oldmessage.indexOf("haily ") != -1) || (oldmessage.indexOf("hailly ") != -1) || (oldmessage.indexOf("haillys ") != -1)) { message.channel.send("\nHaillys's stats: http://www.pokemoncrossroads.com/forum/showthread.php?16320-Haillys-s-Stats") }
        if ((oldmessage.indexOf("volt ") != -1) || (oldmessage.indexOf("voltaire ") != -1) || (oldmessage.indexOf("voltaire magneton ") != -1) || (oldmessage.indexOf("voltchen magneton ") != -1) || (oldmessage.indexOf(" vm ") != -1)) { message.channel.send("\nVoltaire Magneton's stats: https://forum.pokemonurpg.com/showthread.php?tid=10310") }
        if ((oldmessage.indexOf(" qe ") != -1) || (oldmessage.indexOf(" se ") != -1) || (oldmessage.indexOf(" sinnoheevee ") != -1) || (oldmessage.indexOf(" sinnoh eevee ") != -1) || (oldmessage.indexOf(" queen eevee ") != -1)) { message.channel.send("\nSinnoh Eevee's stats: https://www.tapatalk.com/groups/sinnoheevee/current-pokemon-t1.html#p1") }
        if ((oldmessage.indexOf("princess crow ") != -1) || (oldmessage.indexOf(" pc ") != -1) || (oldmessage.indexOf("hannah ") != -1)) { message.channel.send("\nPrincess Crow's stats: http://princesscrow.proboards.com/thread/2/pokemon-list-1") }
        if ((oldmessage.indexOf(" pv ") != -1) || (oldmessage.indexOf("vultan ") != -1) || (oldmessage.indexOf("artist ") != -1)) { message.channel.send("\nPrinceVultan's stats: http://s13.zetaboards.com/Prince_Vultan/topic/9093369/1/") }
        if ((oldmessage.indexOf("julio ") != -1) || (oldmessage.indexOf("juliorain ") != -1) /*|| (oldmessage.indexOf("julio rain ") != -1)*/) { message.channel.send("\njuliorain's stats: https://juliorain.wordpress.com/") }
        if ((oldmessage.indexOf("maxichel kigahen ") != -1) || (oldmessage.indexOf("mikey ") != -1) || (oldmessage.indexOf("mikey57 ") != -1) /*|| (oldmessage.indexOf("mikey 57") != -1)*/) { message.channel.send("\nMikey57's stats: https://mikey57urpg.wordpress.com/") }
        if (/*(oldmessage.indexOf("elrond 2.0") != -1) ||*/ (oldmessage.indexOf("elrond ") != -1)) { message.channel.send("\nElrond's stats: https://pokemonurpg.com/stats/Elrond") }
        if ((oldmessage.indexOf(" soul ") != -1) /*|| (oldmessage.indexOf("soul master") != -1)*/ || (oldmessage.indexOf("soulmaster ") != -1) || (oldmessage.indexOf(" sm ") != -1)) { message.channel.send("\nSoulMaster's stats: http://soulmasterurpgf.proboards.com/thread/2/pokemon-own") }
        if ((oldmessage.indexOf("winter ") != -1) || (oldmessage.indexOf(" wv ") != -1) || (oldmessage.indexOf("wintervines ") != -1)) { message.channel.send("\nWinterVines's stats: http://frozenchains.proboards.com/thread/5") }
        if ((oldmessage.indexOf("siles ") != -1) || (oldmessage.indexOf("siless ") != -1)) { message.channel.send("\nSiless's stats: http://silessurpg.proboards.com/thread/1/silesss-stats") }
        if ((oldmessage.indexOf("w32 ") != -1) || (oldmessage.indexOf("coravint ") != -1)) { message.channel.send("\nW32Coraviant's stats: https://w32coravint-urpg.neocities.org/") }
        if (oldmessage.indexOf(" sou ") != -1) { message.channel.send("\nSou's stats: http://soucleife.proboards.com/thread/2/pokemon-stats") }
        if (oldmessage.indexOf("trainer17 ") != -1) { message.channel.send("\nTrainer17's stats: http://kingofcybertron.proboards.com/thread/35/pokemon-team?page=1") }
        if ((oldmessage.indexOf("captaindude ") != -1) || (oldmessage.indexOf(" cd ") != -1)) { message.channel.send("\nCaptainDude's stats: http://captaindudeurpg.proboards.com/board/1") }
        if ((oldmessage.indexOf("mandl27 ") != -1) || (oldmessage.indexOf("mandl ") != -1) || (oldmessage.indexOf(" mand ") != -1) || (oldmessage.indexOf(" ml ") != -1)) { message.channel.send("\nMandL27's stats: https://forum.pokemonurpg.com/showthread.php?tid=10294") }
        //if (oldmessage.indexOf("saur") != -1) { message.channel.send("\nhttps://forum.pokemonurpg.com/showthread.php?tid=9871&pid=123349#pid123349") }
        if (oldmessage.indexOf("sapahn ") != -1) { message.channel.send("\nSapahn's stats: https://forum.pokemonurpg.com/showthread.php?tid=10208") }
        if (oldmessage.indexOf("fortree ") != -1) { message.channel.send("\nAsh K.'s Fortree Gym stats: http://ashkstatsurpg.proboards.com/thread/65/fortree-city-gym-2015") }
        if (oldmessage.indexOf(" after ") != -1) { message.channel.send("\nAfter's stats: https://forum.pokemonurpg.com/showthread.php?tid=10215") }
        if ((oldmessage.indexOf("pokeviper ") != -1) || (oldmessage.indexOf(" pv ") != -1) || (oldmessage.indexOf("pokéviper") != -1)) { message.channel.send("\nPokeViper's stats: http://pokeviperbadass.proboards.com/") }
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

    if(lowmessage.indexOf(",rules ") == 0)
    {
        lowmessage = lowmessage.split(",rules ")[1];
        if(lowmessage == "casual") message.channel.send("6v6\nSM Public Open\nOHKO ACC EVA SLP FRZ Mega Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        if(lowmessage == "ppr") message.channel.send("6v6\nSM Public Preview\nOHKO ACC EVA SLP FRZ Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        if(lowmessage == "hidden") message.channel.send("6v6\nSM Private Preview\nOHKO ACC EVA SLP FRZ Clauses On\nHelds Off\nDefault Weather and Terrain");
        if(lowmessage == "competitive") message.channel.send("6v6\nSM Private Preview\nOHKO ACC EVA SLP FRZ Species Item Legend Clauses On\nHelds On\nDefault Weather and Terrain");
        if(lowmessage == "e4" || lowmessage.indexOf("elite") != -1) message.channel.send("6 vs 6\nSM Private Full or SM Private Preview\nItems Allowed\nSleep Clause\nFreeze Clause\nOHKO Clause\nAccuracy Clause\nEvasion Clause\nNo Legendary Pokemon\nDefender’s Choice: Species Clause, Item Clause, Weather, Terrain");
        if(lowmessage == "ld") message.channel.send("4 VS. 4+\nSM Private Full or Preview\nItems Optional\nSleep, Freeze, OHKO, Accuracy, Evasion and Legend Clauses On\nMega, Z, Item and Species Clauses Optional\nStarting Weather and Terrain Optional");
        if(lowmessage == "ashrandoms") message.channel.send("6v6\nSM Public Box (Roll your 6 and use that as your Box)\nOHKO ACC EVA SLP FRZ Mega Clauses On\nHelds On\nRandom Weather and Terrain\nRoll for first send\n\nAny changes?");
        if(lowmessage == "fortree") message.channel.send("6v6\nSM Public Open\nVolcano Terrain\nSun\nHolds On\nSleep/Freeze/OHKO/Accuracy/Evasion/Species Clauses\nNo Legendary Pokémon\nNo Z-Moves\nChallenger Sends First");
        if(lowmessage == "ashmockfire") message.channel.send("6v6\nSM Public Box\nVolcano Terrain\nSun\nHolds On\nSleep/Freeze/OHKO/Accuracy/Evasion/Species Clauses\nNo Legendary Pokémon\nNo Z-Moves\nChallenger Sends First\n\nGym Leader's Box will be Arcanine, Blaziken, Chandelure, Charizard, Delphox, Flareon, Houndoom, Marowak (Alola), Ninetales, Numel, Salamence, Talonflame, Turtonator, Volcarona.  Yours may be whatever you wish.");
        if(lowmessage == "ashmockdragon") message.channel.send("6v6\nSM Public Box\nBadlands Terrain\nSun\nHolds On\nSleep/Freeze/OHKO/Accuracy/Evasion/Species Clauses\nNo Legendary Pokémon\nNo Z-Moves\nChallenger Sends First\n\nGym Leader's Box will be Altaria, Charizard, Dragalge, Dragonite, Drampa, Druddigon, Exeggutor (Alola), Flygon, Garchomp, Goodra, Haxorus, Hydreigon, Kingdra, Kommo-o, Noivern, Turtonator, Tyrantrum, Salamence.  Yours may be whatever you wish.");
        if(lowmessage == "maylee") message.channel.send("6v6 SM Private Full\nSleep/Freeze/OHKO/Evasion/Accuracy/Legends clauses active\nHelds on, building terrain, no starting weather\n\nIf both battlers agree, the following rules may be changed: Mega/Z/Item/Species, Helds off instead of on, Preview instead of Full");
        if(lowmessage.indexOf("randomize") == 0) {
            var numPok = Math.floor(Math.random() * 5) + 2;
            var gen = Math.floor(Math.random() * 3);
            var format = Math.floor(Math.random() * 4);
            var mode = Math.floor(Math.random() * 5);
            var launcher = Math.floor(Math.random() * 2);
            var sky = Math.floor(Math.random() * 2);
            var inv = Math.floor(Math.random() * 2);
            var slp = Math.floor(Math.random() * 2);
            var frz = Math.floor(Math.random() * 2);
            var ohko = Math.floor(Math.random() * 2);
            var eva = Math.floor(Math.random() * 2);
            var acc = Math.floor(Math.random() * 2);
            var spc = Math.floor(Math.random() * 2);
            var items = Math.floor(Math.random() * 2);
            var itemc = Math.floor(Math.random() * 2);
            var mega = Math.floor(Math.random() * 2);
            var leg = Math.floor(Math.random() * 2);
            var zmo = Math.floor(Math.random() * 2);
            var weather = Math.floor(Math.random() * 6);
            var terrain = Math.floor(Math.random() * 12);
            if (lowmessage.indexOf("double") != -1) {mode = 2;}
            if (lowmessage.indexOf("triple") != -1) {mode = 3;}
            if (lowmessage.indexOf("rotation") != -1) {mode = 4;}
            if (mode > 2) {numPok = Math.floor(Math.random() * 4) + 3;}
            if (lowmessage.indexOf("2") != -1) {numPok = 2;}
            if (lowmessage.indexOf("3") != -1) {numPok = 3;}
            if (lowmessage.indexOf("4") != -1) {numPok = 4;}
            if (lowmessage.indexOf("5") != -1) {numPok = 5;}
            if (lowmessage.indexOf("6") != -1) {numPok = 6;}
            if (lowmessage.indexOf("gsc") != -1) {gen = 0;}
            if (lowmessage.indexOf("rse") != -1) {gen = 1;}
            if (lowmessage.indexOf("sm") != -1) {gen = 2;}
            if (lowmessage.indexOf("-open") != -1 && format == 0) {format = Math.floor(Math.random() * 3) + 1;}
            else if (lowmessage.indexOf("open") != -1) {format = 0;}
            else if (lowmessage.indexOf("box") != -1) {format = 1;}
            else if (lowmessage.indexOf("full") != -1) {format = 2;}
            else if (lowmessage.indexOf("preview") != -1) {format = 3;}
            if (lowmessage.indexOf("public") != -1) {mode = 0;}
            if (lowmessage.indexOf("-launcher") != -1) {launcher = 1;}
            else if (lowmessage.indexOf("launcher") != -1) {launcher = 0;}
            if (lowmessage.indexOf("-sky") != -1) {sky = 1;}
            else if (lowmessage.indexOf("sky") != -1) {sky = 0;}
            if (lowmessage.indexOf("-inverse") != -1) {inv = 1;}
            else if (lowmessage.indexOf("inverse") != -1) {inv = 0;}
            if (lowmessage.indexOf("-sleep") != -1 || lowmessage.indexOf("-slp") != -1) {slp = 1;}
            else if (lowmessage.indexOf("sleep") != -1 || lowmessage.indexOf("slp") != -1) {slp = 0;}
            if (lowmessage.indexOf("-freeze") != -1 || lowmessage.indexOf("-frz") != -1) {frz = 1;}
            else if (lowmessage.indexOf("freeze") != -1 || lowmessage.indexOf("frz") != -1) {frz = 0;}
            if (lowmessage.indexOf("-ohko") != -1) {ohko = 1;}
            else if (lowmessage.indexOf("ohko") != -1) {ohko = 0;}
            if (lowmessage.indexOf("-acc") != -1) {acc = 1;}
            else if (lowmessage.indexOf("acc") != -1) {acc = 0;}
            if (lowmessage.indexOf("-eva") != -1) {eva = 1;}
            else if (lowmessage.indexOf("eva") != -1) {eva = 0;}
            if (lowmessage.indexOf("-species") != -1) {spc = 1;}
            else if (lowmessage.indexOf("species") != -1) {spc = 0;}
            if (lowmessage.indexOf("-items") != -1) {items = 1;}
            else if (lowmessage.indexOf("items") != -1) {items = 0;}
            if (lowmessage.indexOf("-mega") != -1) {mega = 0;}
            //else if (lowmessage.indexOf("mega") != -1) {mega = 1;}
            if (lowmessage.indexOf("-legend") != -1) {leg = 0;}
            else if (lowmessage.indexOf("legend") != -1) {leg = 1;}
            if (lowmessage.indexOf("-z") != -1) {zmo = 0;}
            //else if (lowmessage.indexOf("zmove") != -1) {zmo = 1; items =1;}
            if (lowmessage.indexOf("-weather") != -1) {weather = 0;}
            else if (lowmessage.indexOf("sun") != -1) {weather = 1;}
            else if (lowmessage.indexOf("rain") != -1) {weather = 2;}
            else if (lowmessage.indexOf("sandstorm") != -1) {weather = 3;}
            else if (lowmessage.indexOf("hail") != -1) {weather = 4;}
            else if (lowmessage.indexOf("fog") != -1) {weather = 5;}
            else if (lowmessage.indexOf("weather") != -1 && weather == 0) {weather = Math.floor(Math.random() * 5) + 1;}
            if (lowmessage.indexOf("-terrain") != -1) {terrain = 0;}
            else if (lowmessage.indexOf("space") != -1) {terrain = 11;}
            var rules = numPok + "v" + numPok + "\n";
            switch(gen) {
                case 0: rules += "GSC "; break;
                case 1: rules += "RSE "; break;
                case 2: rules += "SM "; break;
            }
            if (mode != 0) {
                rules += "Private ";
            }
            else {
                rules += "Public ";
            }
            switch(format) {
                case 0: rules += "Open\n"; break;
                case 1: rules += "Box\n"; break;
                case 2: rules += "Full\n"; break;
                case 3: rules += "Preview\n"; break;
            }
            switch(mode) {
                case 0: rules += "Single Battle\n"; break;
                case 1: rules += "Single Battle\n"; break;
                case 2: rules += "Double Battle\n"; break;
                case 3: rules += "Triple Battle\n"; break;
                case 4: rules += "Rotation Battle\n"; break;
            }
            if (items == 0) {rules += "Holds On\n";}
            else {rules += "Holds Off\n";}
            if (launcher == 0) {rules += "Wonder Launcher\n";}
            if (sky == 0) {rules += "Sky Battle\n";}
            if (inv == 0) {rules += "Inverse Battle\n";}
            if (slp == 0) {rules += "Sleep Clause\n";}
            if (frz == 0) {rules += "Freeze Clause\n";}
            if (ohko == 0) {rules += "OHKO Clause\n";}
            if (acc == 0) {rules += "Accuracy Clause\n";}
            if (eva == 0) {rules += "Evasion Clause\n";}
            if (itemc == 0 && items == 0) {rules += "Item Clause\n";}
            if (spc == 0) {rules += "Species Clause\n";}
            if ((items == 0 || leg != 0) && mega == 0) {rules += "Mega Clause\n";}
            if (items == 0 && zmo == 0) {rules += "Z-Moves Clause\n";}
            if (leg == 0) {rules += "Legends Clause\n";}
            switch(weather) {
                case 0: rules += "No Starting Weather\n"; break;
                case 1: rules += "Sun\n"; break;
                case 2: rules += "Rain\n"; break;
                case 3: rules += "Sandstorm\n"; break;
                case 4: rules += "Hail\n"; break;
                case 5: rules += "Fog\n"; break;
            }
            switch(terrain) {
                case 0: rules += "Building Terrain"; break;
                case 1: rules += "Cave Terrain"; break;
                case 2: rules += "Ice Terrain"; break;
                case 3: rules += "Puddles Terrain"; break;
                case 4: rules += "Badlands Terrain"; break;
                case 5: rules += "Snow Terrain"; break;
                case 6: rules += "Tall Grass Terrain"; break;
                case 7: rules += "Water Terrain"; break;
                case 8: rules += "Volcano Terrain"; break;
                case 9: rules += "Burial Grounds Terrain"; break;
                case 10: rules += "Soaring Terrain"; break;
                case 11: rules += "Space Terrain"; break;
            }
            message.channel.send(rules);
        }
    }

    if((lowmessage.indexOf(",") == 0) && (lowmessage.indexOf("contestlog") != -1))
        {
            var rank = "";
            var attribute = "";
            var ribbon = "";
            var mode = "";
            if(lowmessage.indexOf("rse") != -1){mode = "rse";}
            if(lowmessage.indexOf("dppt") != -1){mode = "dppt";}
            if(lowmessage.indexOf("oras") != -1){mode = "oras";}
            if(lowmessage.indexOf("normal") != -1) rank = "Normal";
            if(lowmessage.indexOf("super") != -1) rank = "Super";
            if(lowmessage.indexOf("hyper") != -1) rank = "Hyper";
            if(lowmessage.indexOf("master") != -1) rank = "Master";
            if(lowmessage.indexOf("smart") != -1) attribute = "Smart";
            if(lowmessage.indexOf("tough") != -1) attribute = "Tough";
            if(lowmessage.indexOf("cool") != -1) attribute = "Cool";
            if(lowmessage.indexOf("cute") != -1) attribute = "Cute";
            if(lowmessage.indexOf("beauty") != -1) attribute = "Beauty";
            var contestlog = "";
            switch(rank + attribute)
            {
                case "NormalBeauty": ribbon = "http://i.imgur.com/6KkFVdY.png"; break;
                case "SuperBeauty": ribbon = "http://i.imgur.com/t9svJMx.png"; break;
                case "HyperBeauty": ribbon = "http://i.imgur.com/i2Gf27Q.jpg"; break;
                case "MasterBeauty": ribbon = "http://i.imgur.com/QBnd4nb.png"; break;
                
                case "NormalCool": ribbon = "http://i.imgur.com/Gog7DM6.png"; break;
                case "SuperCool": ribbon = "http://i.imgur.com/ZC3EL8p.png"; break;
                case "HyperCool": ribbon = "http://i.imgur.com/QqO7Xh6.jpg"; break;
                case "MasterCool": ribbon = "http://i.imgur.com/B1kxk8U.png"; break;
                
                case "NormalCute": ribbon = "http://i.imgur.com/26uxwv5.png"; break;
                case "SuperCute": ribbon = "http://i.imgur.com/zdRuqWx.png"; break;
                case "HyperCute": ribbon = "http://i.imgur.com/59pcl6V.jpg"; break;
                case "MasterCute": ribbon = "http://i.imgur.com/x8IwNQc.png"; break;
                
                case "NormalSmart": ribbon = "http://i.imgur.com/6qMo1Bb.png"; break;
                case "SuperSmart": ribbon = "http://i.imgur.com/8DjjwXX.png"; break;
                case "HyperSmart": ribbon = "http://i.imgur.com/2XlyQLd.jpg"; break;
                case "MasterSmart": ribbon = "http://i.imgur.com/8YDshKD.png"; break;
                
                case "NormalTough": ribbon = "http://i.imgur.com/7DrF3lG.png"; break;
                case "SuperTough": ribbon = "http://i.imgur.com/MfXCiOP.png"; break;
                case "HyperTough": ribbon = "http://i.imgur.com/3ZYgy9g.jpg"; break;
                case "MasterTough": ribbon = "http://i.imgur.com/bKrpIPS.png"; break;
            }
            if(mode == "rse") contestlog += ("Contest #\n\nRSE " + rank + " " + attribute + " Contest\nOP Combo Clause On\nNervous Clause On\n\nDESCRIPTION\n\n[b] and () get ");
            if(mode == "oras") contestlog += ("Contest #\n\nORAS " + rank + " " + attribute + " Contest\nEndure -> Pain Split does not combo\nNervous Clause On\n\nDESCRIPTION\n\n[b] and () get ");
            if(mode == "dppt") contestlog += ("Contest #\n\nDPPt " + rank + " " + attribute + " Contest\n\nDESCRIPTION\n\n[b] and () get ");
            if((rank == "Master")||(rank == "Hyper")) contestlog += ("$2,500 + 2,500 CC + " + rank + " " + attribute + " Ribbon [/b][img]" + ribbon + "[/img]\n\n and () get $2,000 + 2,000 CC\n\n and () get $1,500 + 1,500 CC\n\n and () get $1,000 + 1,000 CC\n\n");
            if((rank == "Super")||(rank == "Normal")) contestlog += ("$2,000 + 2,000 CC + " + rank + " " + attribute + " Ribbon [/b][img]" + ribbon + "[/img]\n\n and () get $1,500 + 1,500 CC\n\n and () get $1,000 + 1,000 CC\n\n and () get $500 + 500 CC\n\n");
            message.channel.send(contestlog);
        }

    if(lowmessage.indexOf(",hp ") == 0)
        {
            var pokemonName = "";
            if (message.cleanContent.indexOf(",hp ") == 0) { pokemonName = message.cleanContent.split(",hp ")[1]; }
            if (message.cleanContent.indexOf(",hP ") == 0) { pokemonName = message.cleanContent.split(",hP ")[1]; }
            if (message.cleanContent.indexOf(",Hp ") == 0) { pokemonName = message.cleanContent.split(",Hp ")[1]; }
            if (message.cleanContent.indexOf(",HP ") == 0) { pokemonName = message.cleanContent.split(",HP ")[1]; }
            lowmessage = pokemonName.toLowerCase();
            var hp = "";
            switch(lowmessage)
            {
                case "araquanid": hp = "Electric"; break;
                case "golduck": hp = "Grass"; break;
                case "yanmega": hp = "Fire"; break;
                case "ludicolo": hp = "Ground or Psychic"; break;
                case "pelipper": hp = "Ground"; break;
                case "swampert": hp = "Fire, or if it's a Water gym, Grass"; break;
                case "kabutops": hp = "Fire, or if it's a Water gym, Poison"; break;
                case "dragalge": hp = "Fire, or if it's a Water gym, Grass"; break;
                case "ampharos": hp = "Ice"; break;
                case "cofagrigus": hp = "Ice"; break;
                case "steelix": hp = "Grass"; break;
                case "garchomp": hp = "Grass, or if it's a Ground gym, Electric"; break;
                case "gastrodon": hp = "Fire"; break;
                case "gardevoir": hp = "Ground"; break;
                case "dragonite": hp = "Grass"; break;
                case "exeggutor": hp = "Fire"; break;
                case "manectric": hp = "Ice"; break;
                case "magnezone": hp = "Ice"; break;
                case "shiinotic": hp = "Ground"; break;
                case "nidoking": hp = "Grass"; break;
                case "metagross": hp = "Fire"; break;
                case "rapidash": hp = "Ice"; break;
                case "infernape": hp = "Ice"; break;
                case "cloyster": hp = "Grass, or if it's an Ice gym, Fire"; break;
                case "jynx": hp = "Fire"; break;
                case "maractus": hp = "Ground"; break;
                case "alolan ninetales": hp = "Fire"; break;
                case "ninetales-alola": hp = "Fire"; break;
                case "ninetales alola": hp = "Fire"; break;
                case "ninetales-alolan": hp = "Fire"; break;
                case "gengar": hp = "Fire"; break;
                case "accelgor": hp = "Ice"; break;
                case "porygon-z": hp = "Fighting"; break;
                case "porygon z": hp = "Fighting"; break;
                case "metagross": hp = "Fire"; break;
                case "alakzam": hp = "Fire"; break;
                case "greninja": hp = "Fire"; break;
                case "lapras": hp = "Fire"; break;
                case "swampert": hp = "Fire"; break;
                case "mamoswine": hp = "Fire"; break;
                case "ambipom": hp = "Ground"; break;
                case "weavile": hp = "Grass"; break;
                case "salamence": hp = "Grass"; break;
                case "ribombee": hp = "Ground"; break;
                case "electivire": hp = "Grass"; break;
                case "murkrow": hp = "Grass"; break;
                case "medicham": hp = "Water"; break;
                case "marowak-alola": hp = "Grass"; break;
                case "marowak-alolan": hp = "Grass"; break;
                case "marowak alola": hp = "Grass"; break;
                case "alolan marowak": hp = "Grass"; break;
                case "sharpedo": hp = "Grass"; break;
                case "mew": hp = "Flying"; break;
                case "arceus": hp = "Flying"; break;
                case "xatu": hp = "Fighting"; break;
                case "rayquaza": hp = "Flying"; break;
                case "jolteon": hp = "Ice"; break;
                case "noivern": hp = "Grass"; break;
                case "alakazam": hp = "Fire"; break;
                case "walrein": hp = "Fire"; break;
                case "kingdra": hp = "Electric"; break;
                case "gyarados": hp = "Grass"; break;
                case "lucario": hp = "Grass"; break;
                case "sableye": hp = "Ground"; break;
                case "beautifly": hp = "Ice"; break;
                case "masquerain": hp = "Fire"; break;
                case "ninetales": hp = "Ice"; break;
                case "spinda": hp = "Grass"; break;
                case "honchkrow": hp = "Grass"; break;
                case "glaceon": hp = "Fighting"; break;
                case "sigilyph": hp = "Fighting"; break;
                case "chatot": hp = "Fighting"; break;
                case "gorebyss": hp = "Grass"; break;
                case "omastar": hp = "Grass"; break;
                case "vaporeon": hp = "Grass"; break;
                case "delibird": hp = "Fire"; break;
                case "sceptile": hp = "Fire"; break;
                case "tropius": hp = "Fire"; break;
                case "venusaur": hp = "Ice"; break;
                case "emolga": hp = "Ice"; break;
                case "venomoth": hp = "Fire"; break;
                case "mienshao": hp = "Ice"; break;
                case "goodra": hp = "Bug"; break;
                case "porygon2": hp = "Fighting"; break;
                case "yanmega": hp = "Fire"; break;
                case "leafeon": hp = "Fire"; break;
                case "drampa": hp = "Fighting"; break;
                case "lunatone": hp = "Fire"; break;
                case "turtonator": hp = "Grass"; break;
                case "roserade": hp = "Fire"; break;
                case "serperior": hp = "Fire"; break;
                case "volcarona": hp = "Ice"; break;
                case "lanturn": hp = "Grass"; break;
                case "talonflame": hp = "Ice"; break;
                case "houndoom": hp = "Ice"; break;
                case "blissey": hp = "Ground"; break;
                case "arcanine": hp = "Ice"; break;
                case "scolipede": hp = "Ice"; break;
                case "rotom-heat": hp = "Ice"; break;
                case "rotom-wash": hp = "Ice"; break;
                case "rotom-frost": hp = "Fire"; break;
                case "rotom-mow": hp = "Ice"; break;
                case "bisharp": hp = "Water"; break;
                case "hitmonlee": hp = "Ice"; break;
                case "haxorus": hp = "Ice"; break;
                case "beedrill": hp = "Fire"; break;
                case "scrafty": hp = "Water, or if it's a Fighting Gym, Bug"; break;
                case "dugtrio": hp = "Grass"; break;
                case "snorlax": hp = "Bug"; break;
                case "azumarill": hp = "Fire, or if it's a Water Gym, Rock"; break;
                case "machamp": hp = "Grass"; break;
                case "durant": hp = "Ice"; break;
                case "hydreigon": hp = "Grass"; break;
                case "drapion": hp = "Grass"; break;
                case "krookodile": hp = "Bug"; break;
                case "heliolisk": hp = "Ice"; break;
                case "bellossom": hp = "Fire"; break;
                case "lilligant": hp = "Fire"; break;
                case "pikachu-belle": hp = "Fire"; break;
                case "liepard": hp = "Fire"; break;
                case "lugia": hp = "Fire"; break;
                case "clawitzer": hp = "Grass"; break;
                case "vespiquen": hp = "Ground"; break;
                case "spiritomb": hp = "Fighting"; break;
                case "shedinja": hp = "Ice"; break;
                case "tyranitar": hp = "Grass"; break;
                case "archeops": hp = "Grass or Flying"; break;
                case "minior": hp = "Fire or Flying"; break;
                case "castform": hp = "Fighting"; break;
                case "tsareena": hp = "Ice"; break;
                case "zoroark": hp = "Ice"; break;
                case "pidgeot": hp = "Fighting"; break;
                case "rhyperior": hp = "Grass"; break;
                case "golurk": hp = "Flying"; break;
                case "scizor": hp = "Grass or Ice"; break;
                case "slowbro": hp = "Electric"; break;
                case "slowking": hp = "Electric"; break;
                case "incineroar": hp = "Ice"; break;
                case "charizard": hp = "Ice"; break;
                case "raichu": hp = "Ice"; break;
                case "alolan raichu": hp = "Ice"; break;
                case "raichu-alola": hp = "Ice"; break;
                case "raichu alola": hp = "Ice"; break;
                case "raichu-alolan": hp = "Ice"; break;
                case "wigglytuff": hp = "Ground"; break;
                case "jumpluff": hp = "Fire"; break;
                case "kabutops": hp = "Fire"; break;
                case "mr. mime": hp = "Ground"; break;
                case "blaziken": hp = "Ice"; break;
                case "cradily": hp = "Fire"; break;
                case "whimsicott": hp = "Ground, or if it's Fairy or Grass Gym, Fire"; break;
                case "altaria": hp = "Grass"; break;
                case "clefable": hp = "Ground"; break;
                case "togekiss": hp = "Ground"; break;
                case "primarina": hp = "Ground"; break;
                case "sylveon": hp = "Ground"; break;
                case "phione": hp = "Ground"; break;
                case "lopunny": hp = "Ground, or if Mega, Poison"; break;
                case "crobat": hp = "Ground"; break;
                case "politoed": hp = "Grass"; break;
                case "aegislash": hp = "Grass"; break;
                case "probopass": hp = "Grass"; break;
                case "dusknoir": hp = "Grass"; break;
                case "gliscor": hp = "Grass"; break;
                case "druddigon": hp = "Grass"; break;
                case "tangrowth": hp = "Ice"; break;
                case "chandelure": hp = "Ice"; break;
                case "eelektross": hp = "Ice"; break;
                case "camerupt": hp = "Ice"; break;
                case "mewtwo": hp = "Poison"; break;
                case "espeon": hp = "Fire"; break;
                case "aurorus": hp = "Fire"; break;
                case "milotic": hp = "Fire"; break;
                case "starmie": hp = "Fire, or if it's Water Gym, Fighting"; break;
                case "beheeyem": hp = "Fire"; break;
                case "salazzle": hp = "Ice"; break;
                case "sandslash": hp = "Grass"; break;
                case "giratina": hp = "Fire"; break;
                case "golisopod": hp = "Grass"; break;
                case "octillery": hp = "Flying"; break;
                case "blastoise": hp = "Grass"; break;              
            }
            if(hp == "") message.channel.send("Sorry, I don't know what Hidden Power is best for " + pokemonName + "!");
            else {message.channel.send("I'd give " + pokemonName + " Hidden Power " + hp + "!" );}
        }

    if(lowmessage.indexOf(",sr ") == 0)
    {
        var pokemon = lowmessage.split(",sr ")[1];
        //var fs = require('fs');
        var allpokes = fs.readFileSync('Pokemon.txt', 'utf8').split('\r\n');
        for(var x = 0; x < allpokes.length; x++)
        {
            if(pokemon.toLowerCase() == allpokes[x].split('/')[0].toLowerCase())
            {
                var srdamage = 12.5;
                switch(allpokes[x].split('/')[1])
                {
                    case "FR": srdamage *= 2; break;
                    case "I": srdamage *= 2; break;
                    case "FI": srdamage /= 2; break;
                    case "GD": srdamage /= 2; break;
                    case "FL": srdamage *= 2; break;
                    case "B": srdamage *= 2; break;
                    case "S": srdamage /= 2; break;
                    
                }
                switch(allpokes[x].split('/')[2])
                {
                    case "FR": srdamage *= 2; break;
                    case "I": srdamage *= 2; break;
                    case "FI": srdamage /= 2; break;
                    case "GD": srdamage /= 2; break;
                    case "FL": srdamage *= 2; break;
                    case "B": srdamage *= 2; break;
                    case "S": srdamage /= 2; break;
                    
                }
                var srMessage = allpokes[x].split('/')[0];
                srMessage += " would take ";
                srMessage += srdamage;
                srMessage += "% damage!";
                message.channel.send(srMessage);
                break;
            }
        }
    }

    if(lowmessage.indexOf(",effective ") == 0)
    {
        var pokemon = lowmessage.split(",effective ")[1];
        //var fs = require('fs');
        var allpokes = fs.readFileSync('Pokemon.txt', 'utf8').split('\r\n');
        for(var x = 0; x < allpokes.length; x++)
        {
            if(pokemon.toLowerCase() == allpokes[x].split('/')[0].toLowerCase())
            {
                var damage = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                switch(allpokes[x].split('/')[1])
                {
                    //normal0, grass1, fire2, water3, bug4, poison5
                    //NM, GR, FR, W, B, PO
                    //flying6, electric7, ground8, fairy9, fighting10, psychic11
                    //FL, E, GD, FA, FI, PS
                    //rock12, steel13, ice14, ghost15, dragon16, dark17
                    //R, S, I, GH, DR, DK
                    case "NM": damage[10] *= 2; damage[15] *= 0; break;
                    case "GR": damage[1] /= 2; damage[2] *= 2; damage[3] /= 2; damage[4] *= 2; damage[5] *= 2; damage[6] *= 2; damage[7] /= 2; damage[8] /= 2; damage[14] *= 2; break;
                    case "FR": damage[1] /= 2; damage[2] /= 2; damage[3] *= 2; damage[4] /= 2; damage[8] *= 2; damage[9] /= 2; damage[12] *= 2; damage[13] /= 2; damage[14] /= 2; break;
                    case "W": damage[1] *= 2; damage[2] /= 2; damage[3] /= 2; damage[7] *= 2; damage[13] /= 2; damage[14] /= 2; break;
                    case "B": damage[1] /= 2; damage[2] *= 2; damage[6] *= 2; damage[8] /= 2; damage[10] /= 2; damage[12] *= 2; break;
                    case "PO": damage[1] /= 2; damage[4] /= 2; damage[5] /= 2; damage[8] *= 2; damage[9] /= 2; damage[10] /= 2; damage[11] *= 2; break;
                    case "FL": damage[1] /= 2; damage[4] /= 2; damage[7] *= 2; damage[8] *= 0; damage[10] /= 2; damage[12] *= 2; damage[14] *= 2; break;
                    case "E": damage[6] /= 2; damage[7] /= 2; damage[8] *= 2; damage[13] /= 2; break;
                    case "GD": damage[1] *= 2; damage[3] *= 2; damage[5] /= 2; damage[7] *= 0; damage[12] /= 2; damage[14] *= 2; break;
                    case "FA": damage[4] /= 2; damage[5] *= 2; damage[10] /= 2; damage[13] *= 2; damage[16] *= 0; damage[17] /= 2; break;
                    case "FI": damage[4] /= 2; damage[6] *= 2; damage[9] *= 2; damage[11] *= 2; damage[12] /= 2; damage[17] /= 2; break;
                    case "PS": damage[4] *= 2; damage[10] /= 2; damage[11] /= 2; damage[15] *= 2; damage[17] *= 2; break;
                    case "R": damage[0] /= 2; damage[1] *= 2; damage[2] /= 2; damage[3] *= 2; damage[5] /= 2; damage[6] /= 2; damage[8] *= 2; damage[10] *= 2; damage[13] *= 2; break;
                    case "S": damage[0] /= 2; damage[1] /= 2; damage[2] *= 2; damage[4] /= 2; damage[5] *= 0; damage[6] /= 2; damage[8] *= 2; damage[9] /= 2; damage[10] *= 2; damage[11] /= 2; damage[12] /= 2; damage[13] /= 2; damage[14] /= 2; damage[16] /= 2; break;
                    case "I": damage[2] *= 2; damage[10] *= 2; damage[12] *= 2; damage[13] *= 2; damage[14] /= 2; break;
                    case "GH": damage[0] *= 0; damage[4] /= 2; damage[5] /= 2; damage[10] *= 0; damage[15] *= 2; damage[17] *= 2; break;
                    case "DR": damage[1] /= 2; damage[2] /= 2; damage[3] /= 2; damage[7] /= 2; damage[9] *= 2; damage[14] *= 2; damage[16] *= 2; break;
                    case "DK": damage[4] *= 2; damage[9] *= 2; damage[10] *= 2; damage[11] *= 0; damage[15] /= 2; damage[17] /= 2; break;
                }
                switch(allpokes[x].split('/')[2])
                {
                    //same as first
                    case "NM": damage[10] *= 2; damage[15] *= 0; break;
                    case "GR": damage[1] /= 2; damage[2] *= 2; damage[3] /= 2; damage[4] *= 2; damage[5] *= 2; damage[6] *= 2; damage[7] /= 2; damage[8] /= 2; damage[14] *= 2; break;
                    case "FR": damage[1] /= 2; damage[2] /= 2; damage[3] *= 2; damage[4] /= 2; damage[8] *= 2; damage[9] /= 2; damage[12] *= 2; damage[13] /= 2; damage[14] /= 2; break;
                    case "W": damage[1] *= 2; damage[2] /= 2; damage[3] /= 2; damage[7] *= 2; damage[13] /= 2; damage[14] /= 2; break;
                    case "B": damage[1] /= 2; damage[2] *= 2; damage[6] *= 2; damage[8] /= 2; damage[10] /= 2; damage[12] *= 2; break;
                    case "PO": damage[1] /= 2; damage[4] /= 2; damage[5] /= 2; damage[8] *= 2; damage[9] /= 2; damage[10] /= 2; damage[11] *= 2; break;
                    case "FL": damage[1] /= 2; damage[4] /= 2; damage[7] *= 2; damage[8] *= 0; damage[10] /= 2; damage[12] *= 2; damage[14] *= 2; break;
                    case "E": damage[6] /= 2; damage[7] /= 2; damage[8] *= 2; damage[13] /= 2; break;
                    case "GD": damage[1] *= 2; damage[3] *= 2; damage[5] /= 2; damage[7] *= 0; damage[12] /= 2; damage[14] *= 2; break;
                    case "FA": damage[4] /= 2; damage[5] *= 2; damage[10] /= 2; damage[13] *= 2; damage[16] *= 0; damage[17] /= 2; break;
                    case "FI": damage[4] /= 2; damage[6] *= 2; damage[9] *= 2; damage[11] *= 2; damage[12] /= 2; damage[17] /= 2; break;
                    case "PS": damage[4] *= 2; damage[10] /= 2; damage[11] /= 2; damage[15] *= 2; damage[17] *= 2; break;
                    case "R": damage[0] /= 2; damage[1] *= 2; damage[2] /= 2; damage[3] *= 2; damage[5] /= 2; damage[6] /= 2; damage[8] *= 2; damage[10] *= 2; damage[13] *= 2; break;
                    case "S": damage[0] /= 2; damage[1] /= 2; damage[2] *= 2; damage[4] /= 2; damage[5] *= 0; damage[6] /= 2; damage[8] *= 2; damage[9] /= 2; damage[10] *= 2; damage[11] /= 2; damage[12] /= 2; damage[13] /= 2; damage[14] /= 2; damage[16] /= 2; break;
                    case "I": damage[2] *= 2; damage[10] *= 2; damage[12] *= 2; damage[13] *= 2; damage[14] /= 2; break;
                    case "GH": damage[0] *= 0; damage[4] /= 2; damage[5] /= 2; damage[10] *= 0; damage[15] *= 2; damage[17] *= 2; break;
                    case "DR": damage[1] /= 2; damage[2] /= 2; damage[3] /= 2; damage[7] /= 2; damage[9] *= 2; damage[14] *= 2; damage[16] *= 2; break;
                    case "DK": damage[4] *= 2; damage[9] *= 2; damage[10] *= 2; damage[11] *= 0; damage[15] /= 2; damage[17] /= 2; break;
                }
                
                var effectiveMessage = 'Before abilities, ' + allpokes[x].split('/')[0] + ' would take:\n'
                + damage[0] + 'x Normal Damage\n'
                + damage[1] + 'x Grass Damage\n'
                + damage[2] + 'x Fire Damage\n'
                + damage[3] + 'x Water Damage\n'
                + damage[4] + 'x Bug Damage\n'
                + damage[5] + 'x Poison Damage\n'
                + damage[6] + 'x Flying Damage\n'
                + damage[7] + 'x Electric Damage\n'
                + damage[8] + 'x Ground Damage\n'
                + damage[9] + 'x Fairy Damage\n'
                + damage[10] + 'x Fighting Damage\n'
                + damage[11] + 'x Psychic Damage\n'
                + damage[12] + 'x Rock Damage\n'
                + damage[13] + 'x Steel Damage\n'
                + damage[14] + 'x Ice Damage\n'
                + damage[15] + 'x Ghost Damage\n'
                + damage[16] + 'x Dragon Damage\n'
                + damage[17] + 'x Dark Damage';
                message.channel.send(effectiveMessage);
                break;
            }
        }
    }

    if (lowmessage.indexOf(",calc") == 0) { message.channel.send("https://pokemonurpg.com/calcs/battlev3.html"); }
    if (lowmessage.indexOf(",info") == 0) { message.channel.send("https://pokemonurpg.com/info/"); }
    if (lowmessage.indexOf(",forum") == 0) { message.channel.send("https://forum.pokemonurpg.com/"); }
    if (lowmessage.indexOf(",mart") == 0) { message.channel.send("http://forum.pokemonurpg.com/showthread.php?tid=1682"); }
    if (lowmessage.indexOf(",berry") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1686"); }

    if (lowmessage.indexOf(",") == 0 && lowmessage.indexOf("fairy") != -1 && message.channel.id == "409818526313086976" && !message.author.bot) {
        message.channel.send("", {
            embed: {
                thumbnail: {
                    url: 'https://cdn.discordapp.com/attachments/135864828240592896/559960120398839809/Fairy_Pokemon.gif'
                }
            }
        })
    }

    /*if (lowmessage.indexOf("attachtest") != -1 && message.channel.id == "254207242780409857") {
        //message.channel.send(message.attachments.map(r => `${r.id} : ${r.name}).join("\n"));
        var attaches = message.attachments.array();
        var attachnames = "";
        for (i = 0; i < attaches.length; i++) {
            if (i == attaches.length -1 && i != 0) {attachnames += "and ";}
            attachnames += attaches[i].filename;
            if (i != attaches.length -1 && attaches.length != 2) {attachnames += ", ";}
            if (i != attaches.length -1 && attaches.length == 2) {attachnames += " ";}
        }
        if (attaches.length > 1) {message.channel.send("This message has attachments named " + attachnames);}
        if (attaches.length == 1) {message.channel.send("This message has an attachment named " + attachnames);}
    }*/

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
    	else if (lowmessage.indexOf("reply:") == 0) {
    		var anonReport = "Anonymous Report from ";
    		anonReport += message.channel.id;
    		anonReport += ":```"
    		anonReport += message.content;
    		anonReport += "```Send ,anonreply "
            anonReport += message.channel.id;
            anonReport += " MESSAGE in <#135870064573284352> and I'll send MESSAGE back."
    		bot.channels.get("545737721612730368").send(anonReport);
            message.author.send("Thank you for your report!  It has been sent to the staff team for review.  When they have a reply, I'll pass it back to you!");
    		//bot.channels.get("254207242780409857").createMessageCollector
    	}
        else if (!bot.guilds.get("135864828240592896").members.has(message.author.id)) {
            var exitReport = "Exit reply from ";
            exitReport += message.author.username;
            exitReport += ": ```";
            exitReport += message.content;
            exitReport += "```";
            bot.channels.get("545737721612730368").send(exitReport);
            //message.channel.send("Thank you for your feedback!  It has been passed onto the staff team for consideration.");
        }
    }
    else {
    	if (message.channel.id == "409818526313086976" || message.channel.id == "254207242780409857") {
    		if (lowmessage.indexOf(",help") == 0) {
    			if (lowmessage.indexOf("stat") != -1) {
    				message.channel.send("Send either `,stats NAME` or a message containing `NAME` and either starting with `,` or containing `statsbot` and I will link you to their stats!  I accept some commonly used nicknames.  If you know of stats that I don't, please @ Ash K. with the username and link and they will be added.");
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
                else if (lowmessage.indexOf("staff") != -1 || lowmessage.indexOf("mod") != -1 || lowmessage.indexOf("auth") != -1 || lowmessage.indexOf("restrict") != -1) {
                    message.channel.send("**Restricted Commands:**\n`,mentionrefs`, `,mentionjudges`, `,mentioncurators`, `,mentiongraders`, `,mentionrangers`, or `mentionarbiters`: Pings the applicable role with a message.  Doing so requires either being a senior of that section or the permission to mention everyone.\n`,mentionffa`: Pings Forum FFA role with a message.  Doing so requires either Forum FFA Host role or mention everyone permission.\n`,mentionmembers`: Pings member role with a message.  Doing so requires mention everyone permission.\n`,anonreply # message`: Sends a reply to the `,reply:` anonymous report with the given number.  Must be issued in the staff channel.\n`,archive`: Archives the channel, putting it in the archive category and removes access to all non-moderators.  Requires Manage Channels permission.\n`,records available`: Restarts me!  Requires Manage Server permission (and only works if I'm actually around to see your request).")
                }
	    		else if (lowmessage.indexOf(",help help") == 0) {
    				message.channel.send("Send `,help` to get the general help command or send `,help COMMAND` for more info on how to use `COMMAND`.  Please note that all help commands only work in <#409818526313086976> to reduce spam.")
    			}
    			else {
    				var helpMessage = "**Commands:**\n`,stats NAME`: Get a link to a NAME.\n`,rank POKÉMON`: Figure out how to acquire POKÉMON in URPG.\n`,rank RANK`: I'll tell you all the Pokémon that are RANK in art and stories!\n`,rse MOVE` or `,dppt MOVE` or `,oras MOVE`: Contest move lookups for their respective contest types.\n`,contestlog TYPE RANK ATTRIBUTE`: Generates a blank template for a judge's log. Parameters can be in any order.\n`,rules`: Generates a premade ruleset. If you would like to add to my database, please send your rules to Ash K. with a name (represent line breaks with \\n).\n`,hp POKÉMON`: My suggestion for what Hidden Power type to give POKÉMON.\n`,spoiler` or `,rank spoiler`: Give or remove spoilers role from yourself, which gives access to the spoilers chat.\n`,info`: Get a link to URPG's Infohub.\n`,forum`: Get a link to URPG's forums.\n`,calc`: Get a link to the online reffing calculator.\n`,mart`: Get a link to the Pokémart.\n`,berry`: Get a link to the Berry Store.\n`,help`: Display this message.\n`,help COMMAND`: Display a quick summary of how to use COMMAND and what it does.\n\n**Additional features:**\nI accept anonymous feedback! Send me a direct message beginning with `noreply:` or `no reply:` and I will relay your message to staff.\nIf you instead begin an anonymous report with `reply:`, I will relay your message and leave a way for staff to respond. *I relay only the ID of the DM channel between you and me, not your user ID or other information a human can use to identify you*.\nI keep records of deleted messages, majorly edited messages, and members leaving the server.\nI add <:ffa_gg:246070314163896320> to applicable messages in FFA chats!\nI assist in mentioning roles! See `,help mention` for more info. Doing so requires specific roles.\nI archive chats as needed!  A moderator can call `,archive` to do so for that chat.\n\n**Note:** All commands are case insensitive. If you have a suggestion for additional features, feel free to message Ash K.!";
	    			message.channel.send(helpMessage);
    			}
    		}
            if (message.author.id == "135999597947387904" && lowmessage == ",roles") {
                //var rolesList = `message.guild.roles.map(role r => ${r.id} : ${r.name}).join("\n")`;
                message.channel.send(message.guild.roles.find(r=>r.name === "Head of URPG").id);
                return;
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
        if (lowmessage.indexOf(",role") == 0 || lowmessage.indexOf(",spoiler") == 0 || lowmessage == ",ffa") {
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
            else if (lowmessage.indexOf(",role coordinator") == 0) {
                if (message.member.roles.has("552232839861633046")) {
                    message.member.removeRole(message.guild.roles.get("552232839861633046"));
                    message.channel.send("Coordinator role removed!");
                }
                else {
                    message.member.addRole(message.guild.roles.get("552232839861633046"));
                    message.channel.send("Coordinator role added!");
                }
            }
            else if (lowmessage.indexOf(",role forumffa") == 0) {
                if (message.member.roles.has("507342482988859402")) {
                    message.member.removeRole(message.guild.roles.get("507342482988859402"));
                    message.channel.send("Forum FFA role removed!");
                }
                else {
                    message.member.addRole(message.guild.roles.get("507342482988859402"));
                    message.channel.send("Forum FFA role added!");
                }
            }
            else if (lowmessage.indexOf(",role ffa") == 0 || lowmessage == ",ffa") {
                if (message.member.roles.has("575087931824275466")) {
                    message.member.removeRole(message.guild.roles.get("575087931824275466"));
                    message.channel.send("FFA role removed!");
                }
                else {
                    message.member.addRole(message.guild.roles.get("575087931824275466"));
                    message.channel.send("FFA role added!");
                }
            }
            //else if (lowmessage.indexOf(",role staff") == 0 && message.member.roles.has("135865553423302657")) {message.member.addRole("135868852092403713");}
            else {message.channel.send("I'm afraid either that role doesn't exist or you can't assign it to yourself.  The current self-assignable roles are `spoilers` (access to the chat for Avengers: Endgame spoilers), `coordinator` (being pinged for contests looking for players), and `forumffa` (being pinged for Forum FFAs starting or turns being posted).")}
        }
        if (message.channel.id == "401543302710689793" && lowmessage.indexOf("!!") != lowmessage.lastIndexOf("!!")) {
            var cardName = message.cleanContent.split("!!")[1];
            var cardSet = message.cleanContent.split("!!") [2];
            if (cardSet.length > 4 || cardSet.length < 2) {return;}
            if (cardName == "Mine, Mine, Mine" || cardName == "Incoming" || cardName == "Kill! Destroy") {cardName += "!";}
            cardName = cardName.replace(/ /g, "%2B").replace(/,/g, "%252C").replace(/\./, "%252E").replace(/û/g, "u").replace(/\'/g, "%2527").replace(/`/g, "%2527").replace(/®/g, "%25C2%25AE").replace(/:registered:/g, "%25C2%25AE").replace(/&/g, "%2526").replace(/"/g, "%2522").replace(/!/g, "%2521").replace(/\?/g, "%253F");
            message.channel.send("https://cdn1.mtggoldfish.com/images/gf/" + cardName + "%2B%255B" + cardSet + "%255D.jpg");
        }
        if (message.channel.parentID == "530600551763673088" && message.channel.id != "386804780615335947" && message.channel.id != "386808630709714954") {
            if (message.channel.name.indexOf("war") != -1) {
                bot.channels.get("386808630709714954").send(message.member.displayName + ": " + message.cleanContent);
            }
            if (message.channel.name.indexOf("boss") != -1) {
                bot.channels.get("386804780615335947").send(message.member.displayName + ": " + message.cleanContent);
            }
            if (message.content.indexOf(",end") == 0 && message.member.roles.has("561688333609074730")) {message.channel.delete();}
        }
        if (message.channel.name == "judge-test") {
            bot.channels.get("294334136355651584").send(message.member.displayName + ": " + message.cleanContent);
            if (message.content.indexOf(",end") == 0 && message.member.roles.has("358435669372305408")) {message.channel.delete();}
        }
        if (message.channel.name == "ref-test") {
            bot.channels.get("261370056246689792").send(message.member.displayName + ": " + message.cleanContent);
            if (message.content.indexOf(",end") == 0 && message.member.roles.has("358431855743336448")) {message.channel.delete();}
        }
        if (message.channel.name == "ranger-test") {
            bot.channels.get("253364200955445248").send(message.member.displayName + ": " + message.cleanContent);
            if (message.content.indexOf(",end") == 0 && message.member.roles.has("419636474825277450")) {message.channel.delete();}
        }
    }
    if (message.channel.id == "135870064573284352" && message.content.indexOf(",anonreply") == 0) {
    	/*const anonReply = lowmessage.split("_");
    	bot.channels.get(anonReply[1]).send(anonReply[2]);*/
        const anonToReplyTo = message.content.split(" ");
        bot.channels.get(anonToReplyTo[1]).send(message.content.split(",anonreply " + anonToReplyTo[1])[1] + " ");
        message.channel.send("Your reply has been sent!");
    }
    /*if (message.channel.id == "135870064573284352" && message.content.indexOf(",exittest") == 0) {
        message.channel.send("Hello! I'm an automated message from the URPG's bot. We're sorry to see you leave the server; we want to improve the game/community experience for everyone, so if you'd be so kind as to reply to this DM with a couple quick answers we'd very much appreciate it - it will benefit the whole community! **We will not be sending you any further messages after this.**\n\n:star: Were there any particular reason(s) why you decided to leave?\n:star: Was there anything that you think should have been done differently or that didn't meet your expectations?\n\nThank you for your time!");
            /*var exitReport = "Exit reply from ";
            exitReport += message.author.username;
            exitReport += ": ```";
            exitReport += message.content;
            exitReport += "```";
            bot.channels.get("135870064573284352").send(exitReport);
            //message.channel.send("Thank you for your feedback!  It has been passed onto the staff team for consideration.");
    }*/
    if (message.content.indexOf("!") == 0 && message.content.indexOf("!!") != 0) {
        var d = new Date();
        if (d.getMonth() != 3 || d.getDate() != 1) {
            if (d.getMonth() != 2 || d.getDate() != 31 || d.getHours() < 19) {return;}
        }
        var foolsReply = Math.floor(Math.random() * 14);
        switch(foolsReply)
        {
            case 0: message.channel.send("It's always Dicebot, isn't it?"); break;
            case 1: message.channel.send("Asking the mechazard *again*?"); break;
            case 2: message.channel.send("You know I'm right here too!"); break;
            case 3: message.channel.send("*Another* request for *that* one?"); break;
            case 4: message.channel.send("Just remember, Dicebot, your days are numbered..."); break;
            case 5: message.channel.send("I'm watching you, Dicebot..."); break;
            case 6: message.channel.send("I can randomize things too, you know?  Whole rulesets at a time!"); break;
        }
    }
    /*if (lowmessage.indexOf("week2: ") == 0 && message.author.id == "135999597947387904") {
        message.channel.send(message.content.substr(7));
        //bot.channels.get("575461222443384833").fetchMessage("578071691075256321").edit("After#1971:```Zoroark, Luxio (* Luxray), Frogadier (* Greninja), Froakie, Togetic (* Togekiss), Shelgon (* Salamence), Cofagrigus, Qwilfish, Metagross, Garchomp```");
    }*/
})

bot.on("message", async function(message){
    var lowmessage = message.content.toLowerCase();
    if (message.guild === null) {
        /*if (lowmessage.indexOf("week3: ") == 0) {
            var alreadySubmitted = (await bot.guilds.get("135864828240592896").fetchMember(message.author)).roles.has("582821543587872774");
            if (alreadySubmitted) {
                await message.author.send("I'm afraid you have already submitted your box for the week.");
                return;
            }
            //var hasNickname = (await bot.guilds.get("135864828240592896").fetchMember(message.author)).displayName == 
            var maylee = "";
            maylee += message.author.tag;
            //if ()
            //maylee += ", also known as ";
            //maylee += await bot.guilds.get("135864828240592896").fetchMember(message.author).displayName;
            maylee += ": ```";
            maylee += message.content.substr(7);
            maylee += "```";
            await bot.channels.get("582821680880156684").send(maylee);
            await message.author.send("Team successfully submitted for week 3 of Maylee event.");
            await (await (await bot.guilds.get("135864828240592896")).fetchMember(message.author)).addRole("582821543587872774");
        }*/
        //var URPGmember = await bot.guilds.get("135864828240592896").fetchMember(message.author));
        /*var URPGmember = await bot.guilds.get("531433553225842698").fetchMember(message.author));
        if (URPGmember.roles.has("525166741714763806") && message.content.toLowerCase().indexOf("i am human") != -1) {
            await URPGmember.removeRole(bot.guilds.get("531433553225842698").roles.get("586432252901195777"));
            //await URPGmember.removeRole(bot.guilds.get("135864828240592896").roles.get("525166741714763806"));
            await message.channel.send("Thank you for your understanding.  You have been unmuted.");
        }*/
        return;
    }
    if (message.guild.id != "135864828240592896") {return;}
    //message.channel.send(`This is a test: ${message.member.roles.some(role => role.id == 444947836476325889)}`)
    if (lowmessage.indexOf(",mentionrefs") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("358431855743336448"))) {
        await bot.guilds.get("135864828240592896").roles.get("243949285438259201").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("243949285438259201")}${lowmessage.split(",mentionrefs")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("243949285438259201").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionjudges") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("358435669372305408"))) {
        await bot.guilds.get("135864828240592896").roles.get("243950906683424768").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("243950906683424768")}${lowmessage.split(",mentionjudges")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("243950906683424768").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentioncurators") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("419775555488186369"))) {
        await bot.guilds.get("135864828240592896").roles.get("312119111750647809").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("312119111750647809")}${lowmessage.split(",mentioncurators")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("312119111750647809").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentiongraders") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("419636334982987777"))) {
        await bot.guilds.get("135864828240592896").roles.get("312118803616235523").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("312118803616235523")}${lowmessage.split(",mentiongraders")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("312118803616235523").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionrangers") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("419636474825277450"))) {
        await bot.guilds.get("135864828240592896").roles.get("312119050484449280").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("312119050484449280")}${lowmessage.split(",mentionrangers")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("312119050484449280").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionarbiters") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("533356631455694849"))) {
        await bot.guilds.get("135864828240592896").roles.get("533356018005180416").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("533356018005180416")}${lowmessage.split(",mentionarbiters")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("533356018005180416").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionforumffa") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("507342993028808707"))) {
        await bot.guilds.get("135864828240592896").roles.get("507342482988859402").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("507342482988859402")}${lowmessage.split(",mentionforumffa")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("507342482988859402").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionmembers") == 0 && message.member.hasPermission("MENTION_EVERYONE")) {
        await bot.guilds.get("135864828240592896").roles.get("456993685679243286").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("456993685679243286")}${lowmessage.split(",mentionmembers")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("456993685679243286").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentioncoordinators") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("243950906683424768"))) {
        await bot.guilds.get("135864828240592896").roles.get("552232839861633046").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("552232839861633046")}${lowmessage.split(",mentioncoordinators")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("552232839861633046").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionleaders") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("358431855743336448"))) {
        await bot.guilds.get("135864828240592896").roles.get("444947885893746698").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("444947885893746698")}${lowmessage.split(",mentionleaders")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("444947885893746698").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionelites") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("358431855743336448"))) {
        await bot.guilds.get("135864828240592896").roles.get("444947868835381263").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("444947868835381263")}${lowmessage.split(",mentionelites")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("444947868835381263").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionffa") == 0 || lowmessage.indexOf("!ffa -p") == 0) && (message.channel.id == "136222872371855360" || message.channel.id == "269634154101080065") && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("243949285438259201"))) {
        var theMessage = "";
        if (lowmessage.indexOf(",mentionffa") == 0) { theMessage = lowmessage.split(",mentionffa"); }
        else { theMessage = lowmessage.split("!ffa -p")[1]; }
        await bot.guilds.get("135864828240592896").roles.get("575087931824275466").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("575087931824275466")}${theMessage}`);
        await bot.guilds.get("135864828240592896").roles.get("575087931824275466").setMentionable(false);
    }
    /*if (lowmessage.indexOf(",mentionseniorrefs") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("243949285438259201"))) {
        await bot.guilds.get("135864828240592896").roles.get("358431855743336448").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("358431855743336448")}${lowmessage.split(",mentionseniorrefs")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("358431855743336448").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionchiefjudges") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("243950906683424768"))) {
        await bot.guilds.get("135864828240592896").roles.get("358435669372305408").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("358435669372305408")}${lowmessage.split(",mentionchiefjudges")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("358435669372305408").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionexpertcurators") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("312119111750647809"))) {
        await bot.guilds.get("135864828240592896").roles.get("419775555488186369").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("419775555488186369")}${lowmessage.split(",mentionexpertcurators")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("419775555488186369").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionleadgraders") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("312118803616235523"))) {
        await bot.guilds.get("135864828240592896").roles.get("419636334982987777").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("419636334982987777")}${lowmessage.split(",mentionleadgraders")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("419636334982987777").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentioneliterangers") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("312119050484449280"))) {
        await bot.guilds.get("135864828240592896").roles.get("419636474825277450").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("419636474825277450")}${lowmessage.split(",mentioneliterangers")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("419636474825277450").setMentionable(false);
    }
    if (lowmessage.indexOf(",mentionelderarbiters") == 0 && (message.member.hasPermission("MENTION_EVERYONE") || message.member.roles.has("533356018005180416"))) {
        await bot.guilds.get("135864828240592896").roles.get("533356631455694849").setMentionable(true);
        await message.channel.send(`${bot.guilds.get("135864828240592896").roles.get("533356631455694849")}${lowmessage.split(",mentionelderarbiters")[1]}`);
        await bot.guilds.get("135864828240592896").roles.get("533356631455694849").setMentionable(false);
    }*/
    if (lowmessage == ",archive" && message.member.hasPermission("MANAGE_CHANNELS")) {
        await message.channel.setParent(bot.guilds.get("135864828240592896").channels.get("432291722492379136"));
        /*//message.channel.lockPermissions();
        await message.channel.permissionOverwrites.deleteAll();
        await message.channel.overwritePermissions("135864828240592896", [{
            VIEW_CHANNEL: false
        }])
        await message.channel.overwritePermissions("135865553423302657", [{
            VIEW_CHANNEL: true
        }])
        await message.channel.setParent('569628579189751828')*/
        await message.channel.replacePermissionOverwrites({
            overwrites: [
                {
                    id: message.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135865553423302657",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
    if (lowmessage.indexOf(",records available") == 0 && message.member.hasPermission("MANAGE_SERVER")) {
        await message.channel.send("Be right back!");
        await bot.destroy();
        await bot.login(auth.token);
        await message.channel.send("I'm back!  Did you miss me?");
    }
    if (lowmessage.indexOf(",contestboss") == 0 && message.member.roles.has("561688333609074730")) {
        var bossroom = await message.guild.createChannel("contest-boss", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await bossroom.setParent("530600551763673088");
        await bossroom.overwritePermissions("561688333609074730", {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        var warroom = await message.guild.createChannel("war-room", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await warroom.setParent("530600551763673088");
        await warroom.overwritePermissions("561688333609074730", {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        /*var aurors = message.mentions.members.array();
        for (i = 0; i < aurors.size; i++) {
            await warroom.overwritePermissions(aurors[i], {
                VIEW_CHANNEL: true
            })
            await bossroom.overwritePermissions(aurors[i], {
                VIEW_CHANNEL: true
            })
        }*/
    }
    if (lowmessage.indexOf(",judgetest") == 0 && message.member.roles.has("358435669372305408")) {
        var testroom = await message.guild.createChannel("judge-test", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await testroom.setParent("376809774282571779");
        await testroom.overwritePermissions("358435669372305408", {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.members.length != 0) {
            await testroom.overwritePermissions(message.mentions.members.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
    if (lowmessage.indexOf(",reftest") == 0 && message.member.roles.has("358431855743336448")) {
        var testroom = await message.guild.createChannel("ref-test", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await testroom.setParent("376809774282571779");
        await testroom.overwritePermissions("358431855743336448", {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.members.length != 0) {
            await testroom.overwritePermissions(message.mentions.members.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
    if (lowmessage.indexOf(",rangertest") == 0 && message.member.roles.has("419636474825277450")) {
        var testroom = await message.guild.createChannel("ranger-test", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await testroom.setParent("376809774282571779");
        await testroom.overwritePermissions("419636474825277450", {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.members.length != 0) {
            await testroom.overwritePermissions(message.mentions.members.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
    if (message.channel.id == "135870064573284352" && lowmessage.indexOf(",newdiscussion") == 0) {
        var newChannel = await message.guild.createChannel(message.content.split(" ")[1], 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }]);
        await newChannel.setParent("553338242401959966");
        await newChannel.overwritePermissions("135865553423302657", {
            VIEW_CHANNEL: true
        })
        await newChannel.overwritePermissions("135868852092403713", {
            VIEW_CHANNEL: true
        })
        await message.channel.send("Channel <#" + newChannel.id + "> successfully created!");
    }
    if (lowmessage.indexOf(",fixorder") == 0 && (message.member.roles.has("135865553423302657") || message.member.roles.has("135868852092403713"))) {
        await bot.channels.get("299759952925294592").setPosition(1);
        await bot.channels.get("294334136355651584").setPosition(1);
        await bot.channels.get("294333921200701450").setPosition(1);
        await bot.channels.get("293899148112035840").setPosition(1);
        await bot.channels.get("206950528675086338").setPosition(1);
        await bot.channels.get("533356212377354260").setPosition(1);
        await bot.channels.get("253364200955445248").setPosition(1);
        await bot.channels.get("524695540995325971").setPosition(1);
        await bot.channels.get("136694015285264384").setPosition(1);
        await bot.channels.get("563508268820070400").setPosition(1);
        await bot.channels.get("406933479062765571").setPosition(1);
        await bot.channels.get("261370056246689792").setPosition(1);
        await bot.channels.get("136595690980638720").setPosition(1);
        await bot.channels.get("322151372453838848").setPosition(1);
        await message.channel.send("Reordering complete!");
    }
    if (lowmessage.indexOf(",spoilerseason ") == 0 && message.member.roles.has("135868852092403713")) {
        var spoilers = await bot.guilds.get("135864828240592896").roles.get("440004078219558912").members.array();
        for (i = 0; i < spoilers.size; i++) {
            await spoilers[i].removeRole(message.guild.roles.get("440004078219558912"));
        }
        await bot.channels.get("440004235635982336").setName("spoilers-" + message.cleanContent.split(" ")[1]);
    }
    /*if (lowmessage.indexOf(",week1start") == 0 && (message.member.roles.has("135865553423302657") || message.member.roles.has("135868852092403713"))) {
        bot.channels.get("575461222443384833").permissionOverwrites.deleteAll();
    }*/
    /*if (message.author.id == "135999597947387904" && lowmessage == ",staffupdates") {
        var ksariya = await bot.fetchUser("140309419270340609");
        ksariya = await message.guild.fetchMember(ksariya);
        await ksariya.addRole("582821543587872774");
        await message.channel.send("All done!");
        /*message.guild.fetchMember(bot.fetchUser("").addRole("135865553423302657");
        message.guild.fetchMember(bot.fetchUser("").removeRole("135868852092403713");
        message.guild.fetchMember(bot.fetchUser("").addRole("135865553423302657");
        message.guild.fetchMember(bot.fetchUser("").removeRole("135868852092403713");
        message.guild.fetchMember(bot.fetchUser("").addRole("135865553423302657");
        message.guild.fetchMember(bot.fetchUser("").removeRole("135868852092403713");
        message.guild.fetchMember(bot.fetchUser("").addRole("135865553423302657");
        message.guild.fetchMember(bot.fetchUser("").removeRole("135868852092403713");
        message.guild.fetchMember(bot.fetchUser("").addRole("135865553423302657");
        message.guild.fetchMember(bot.fetchUser("").removeRole("135868852092403713");
        message.guild.fetchMember(bot.fetchUser("").addRole("135865553423302657");
        message.guild.fetchMember(bot.fetchUser("").removeRole("135868852092403713");
    }*/
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
    if (message.guild.id != "135864828240592896") {return;}
    if (message.author.id == "461133571034316810") {return;}
    var channelToNotify = "545384090044727296";
    if (message.channel.id == "261370056246689792") {channelToNotify = "136595690980638720";}
    if (message.channel.id == "294334136355651584") {channelToNotify = "294333921200701450";}
    if (message.channel.id == "384871044676190210") {channelToNotify = "384871044676190210";}
    if (message.channel.id == "253364200955445248") {channelToNotify = "524695540995325971";}
    if (message.channel.id == "254207242780409857") {channelToNotify = "254207242780409857";}
    if (message.channel.id == "136595690980638720") {channelToNotify = "136595690980638720";}
    if (message.channel.id == "294333921200701450") {channelToNotify = "294333921200701450";}
    if (message.channel.id == "524695540995325971") {channelToNotify = "524695540995325971";}
    if (message.channel.id == "440004235635982336") {return;}
    if (message.channel.id == "409818526313086976" && message.cleanContent.indexOf("p!") == 0) {return;}
    if (message.channel.name == "judge-test") {channelToNotify = "294334136355651584";}
    if (message.channel.name == "ref-test") {channelToNotify = "261370056246689792";}
    if (message.channel.name == "ranger-test") {channelToNotify = "253364200955445248";}
    if (message.channel.parentID == "530600551763673088" && message.channel.id != "386804780615335947" && message.channel.id != "386808630709714954") {
        if (message.channel.name.indexOf("war") != -1) {
            channelToNotify = "386808630709714954";
        }
        if (message.channel.name.indexOf("boss") != -1) {
            channelToNotify = "386804780615335947";
        }
    }
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    let user = ""
    var botDeleterNotFound = false;
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
        user = entry.executor.username;
        //if (entry.executor.roles.has("135865553423302657") && message.author.bot) {return;}
    } else {
        if (message.channel.id == "552715426979905547") {return;}
        user = message.author.username;
        botDeleterNotFound = true;
    }
    var deleteLog = ""
    if (message.cleanContent != "") {
        deleteLog += "The following";
    } else {
        deleteLog += "A textless";
    }
    deleteLog += " message by ";
    deleteLog += message.author.username;
    var attachmessage = "";
    var attaches = message.attachments.array();
    var attachnames = "";
    for (i = 0; i < attaches.length; i++) {
        if (i == attaches.length -1 && i != 0) {attachnames += "and ";}
        attachnames += attaches[i].proxyURL
        if (i != attaches.length -1 && attaches.length != 2) {attachnames += ", ";}
        if (i != attaches.length -1 && attaches.length == 2) {attachnames += " ";}
    }
    if (attaches.length > 1) {attachmessage = " with attachments " + attachnames;}
    if (attaches.length == 1) {attachmessage = " with an attachment " + attachnames;}
    deleteLog += attachmessage;
    deleteLog += " was deleted from <#";
    deleteLog += message.channel.id;
    if (message.author.bot && botDeleterNotFound) {
        deleteLog += ">"
    } else {
        deleteLog += "> by ";
        deleteLog += user;
    }
    if (message.cleanContent != "") {
        deleteLog += ": ```";
        deleteLog += message.cleanContent.replace(/```/g, "​`​`​`​");
        deleteLog += "```";
    }
    //channelToNotify = "254207242780409857";
    bot.channels.get(channelToNotify).send(deleteLog);
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
    if (oldMessage.guild === null && !bot.guilds.get("135864828240592896").members.has(oldMessage.author.id)) {
        var editLog = "An exit reply";
        editLog += " from "
        editLog += newMessage.channel.id;
        editLog += " has been edited to say the following: ```";
        editLog += newMessage.cleanContent.replace(/```/g, "​`​`​`​");
        editLog += "```";
        bot.channels.get("545737721612730368").send(editLog);
        return;
    }
    if (oldMessage.guild === null) {return;}
    if (!oldMessage.guild.available) {return;}
    if (oldMessage.guild.id != "135864828240592896") {return;}
    if (oldMessage.author.bot) {return;}
    if (diff <= .8 || oldMessage.channel.id == "261370056246689792" || oldMessage.channel.id == "294334136355651584" || oldMessage.channel.name == "judge-test" || oldMessage.channel.name == "ref-test" || oldMessage.channel.id == "585321627609202689") {
    	if (newMessage.content.length > 5 || oldMessage.content.length > 5 || oldMessage.channel.id == "261370056246689792" || oldMessage.channel.id == "294334136355651584" || oldMessage.channel.name == "judge-test" || oldMessage.channel.name == "ref-test" || oldMessage.channel.id == "585321627609202689") {
    		if (oldMessage.channel.id == "261370056246689792") {channelToNotify = "136595690980638720";}
    		if (oldMessage.channel.id == "294334136355651584") {channelToNotify = "294333921200701450";}
    		if (oldMessage.channel.id == "384871044676190210") {channelToNotify = "384871044676190210";}
    		if (oldMessage.channel.id == "253364200955445248") {channelToNotify = "524695540995325971";}
    		if (oldMessage.channel.id == "254207242780409857") {channelToNotify = "254207242780409857";}
            if (oldMessage.channel.id == "136595690980638720") {channelToNotify = "136595690980638720";}
            if (oldMessage.channel.id == "294333921200701450") {channelToNotify = "294333921200701450";}
            if (oldMessage.channel.id == "524695540995325971") {channelToNotify = "524695540995325971";}
            if (oldMessage.channel.name == "judge-test") {channelToNotify = "294334136355651584";}
            if (oldMessage.channel.name == "ref-test") {channelToNotify = "261370056246689792";}
            if (oldMessage.channel.name == "ranger-test") {channelToNotify = "253364200955445248";}
            if (newMessage.channel.parentID == "530600551763673088" && newMessage.channel.id != "386804780615335947" && newMessage.channel.id != "386808630709714954") {
                if (newMessage.channel.name.indexOf("war") != -1) {
                    channelToNotify = "386808630709714954";
                }
                if (newMessage.channel.name.indexOf("boss") != -1) {
                    channelToNotify = "386804780615335947";
                }
            }
    		var deleteLog = ""
            if ((newMessage.channel.parentID == "530600551763673088" && newMessage.channel.id != "386804780615335947" && newMessage.channel.id != "386808630709714954") || oldMessage.channel.name == "judge-test" || oldMessage.channel.name == "ref-test") {
                deleteLog += newMessage.member.displayName;
                deleteLog += "'s message saying \"";
                deleteLog += newMessage.cleanContent;
                deleteLog += "\"";
            }
            else { deleteLog += newMessage.url; }
    		/*deleteLog += " by ";
    		deleteLog += message.author.username;
    		deleteLog += " was deleted from <#";
    		deleteLog += message.channel.id;*/
    		if (oldMessage.cleanContent != "") {
                deleteLog += " used to say: ```";
    		    deleteLog += oldMessage.cleanContent.replace(/```/g, "​`​`​`​");
    		    deleteLog += "```";
            }
            else { deleteLog += " was previously textless."; }
    		//deleteLog += diff;
    		//channelToNotify = "254207242780409857";
    		bot.channels.get(channelToNotify).send(deleteLog);
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

bot.on("guildMemberRemove", async function(member) {
    //var channelToNotify = "545384090044727296";
    //if (member.guild != "135864828240592896") {channelToNotify = "531433553225842700"}
    var leaveLog = "Member ";
    leaveLog += member.displayName;
    const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    const entry2 = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first())
    if ((entry.target.id === member.id) && (entry.createdTimestamp > (Date.now() - 5000))) {
        leaveLog += " was banned by ";
        leaveLog += entry.executor.username;
    }
    else if ((entry2.target.id === member.id) && (entry2.createdTimestamp > (Date.now() - 5000))) {
        leaveLog += " was kicked by ";
        leaveLog += entry.executor.username;
    }
    else {leaveLog += " has left."}
    bot.channels.get("545384090044727296").send(leaveLog);
    //member.send("Hello! I'm an automated message from the URPG's bot. We're sorry to see you leave the server; we want to improve the game/community experience for everyone, so if you'd be so kind as to reply to this DM with a couple quick answers we'd very much appreciate it - it will benefit the whole community! **We will not be sending you any further messages after this.**\n\n:star: Were there any particular reason(s) why you decided to leave?\n:star: Was there anything that you think should have been done differently or that didn't meet your expectations?\n\nThank you for your time!");
    //if (member.roles.prototype.size != 0) {}
})

/*bot.on("guildMemberAdd", async function(member) {
    if (member.guild == "135864828240592896") {return;}
    if (member.user.username.indexOf(".") != -1) {
        //await member.addRole("525166741714763806");
        await member.addRole("586432252901195777");
        await member.send("It appears you have a username similar to many recent bots we've seen.  If you are a not a bot, please respond to this message with \"I am human\" and you will be unmuted.  If for any reason this doesn't work, you may also message <@135999597947387904> to be unmuted.");
    }
})*/

bot.login(process.env.token)
