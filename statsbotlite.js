const Discord = require("discord.js")
const logger = require("winston")
const fs = require("fs")
const ss = require("string-similarity");
const { Endpoints } = require("discord.js/src/util/Constants");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
})
logger.level = "debug"
// Initialize Discord Bot
var bot = new Discord.Client({ disableEveryone: true })
var badWords = [" fag", "fag ", "retard", "cuck", "slut", "kys", "trigger"];
var bumpTime;
var disBumpTime = null;
var lowmessage;
var botCommands = "409818526313086976";
var urpgServer = "135864828240592896";
var logsChannel = "545384090044727296";
var refRole = "243949285438259201";
var judgeRole = "243950906683424768";
var refTestChannel = "261370056246689792";
var judgeTestChannel = "294334136355651584";
var rangerTestChannel = "253364200955445248";
var botsChannel = "254207242780409857";
var seniorRefChannel = "136595690980638720";
var judgingChiefsChannel = "294333921200701450";
var eliteRangersChannel = "524695540995325971";
var contestBossCategory = "530600551763673088";
var contestBossChannel = "386804780615335947";
var warRoomChannel = "386808630709714954";
var staffChannel = "135870064573284352";
var seniorRefRole = "358431855743336448";
var chiefJudgeRole = "358435669372305408";
var eliteRangerRole = "419636474825277450";
var deathEaterRole = "561688333609074730";
var anonymousReportChannel = "545737721612730368";
var payDayLog;

bot.on("ready", async function() {
    logger.info("Connected")
    logger.info("Logged in as: ")
    logger.info(bot.user.username + " - (" + bot.user.id + ")")
    var d = new Date();
    var timer = 7210000 - (d.getTime() % 7210000);
    bumpTime = setTimeout(function() {
        bumpServer();
    }, timer);
    payDayLog = await bot.channels.get(botCommands).fetchMessage("658883162000195607");
    setTimeout(function () {
        payDayReset();
    }, ((864000000) - (d.getTime() % 604800000)) % 604800000);
    bot.channels.get(botCommands).send("I have arisen!  Please help me set my DISBOARD bump notification timer with a `!d bump`.");
    disBumpTime = setTimeout(function() {
        bumpNotification();
    }, 7200000);
    var memberMe = await bot.guilds.get(urpgServer).fetchMember(bot.user);
    lowmessage = ",fixorder";
    await fixOrder(null, memberMe);
    statusMessage();
})

function statusMessage() {
    var allpokes = fs.readFileSync('Pokemon.txt', 'utf8').split('\r\n');
    var movelist = fs.readFileSync("rse.txt", "utf8").split("\r\n");
    var pokemon = allpokes[Math.floor(Math.random() * allpokes.length)].split("/")[0];
    var activityNum = Math.floor(Math.random() * 60);
    let duration = Math.floor(Math.random() * 600000)
    //if you're reading this, don't spoil the surprise of the weird ones please.  But feel free to suggest additional options!
    switch (activityNum) {
        case 0: activity = " in a battle"; break;
        case 1: activity = " in a contest"; break;
        case 2: activity = " in the national park"; break;
        case 3: activity = " playing Magic"; break;
        case 4: activity = " exploring Kanto"; break;
        case 5: activity = " exploring Johto"; break;
        case 6: activity = " exploring Hoenn"; break;
        case 7: activity = " exploring Sinnoh"; break;
        case 8: activity = " exploring Unova"; break;
        case 9: activity = " exploring Kalos"; break;
        case 10: activity = " exploring Alola"; break;
        case 11: activity = " exploring Galar"; break;
        case 12: activity = " taking over the world"; break;
        case 13: activity = " exploring Ransei"; break;
        case 14: activity = " exploring Fiore"; break;
        case 15: activity = " exploring Orre"; break;
        case 16: activity = " being caught by a trainer"; break;
        case 17: activity = " being released by a trainer"; break;
        case 18: activity = " catching a trainer"; break;
        case 19: activity = " battling a gym"; break;
        case 20: activity = " battling the elite four"; break;
        case 21: activity = " battling the champion"; break;
        case 22: activity = " exploring Enigma Ruins"; break;
        case 23: activity = " exploring Mt. Deckbi"; break;
        case 24: activity = " exploring Sandy Beach"; break;
        case 25: activity = " exploring The Woods"; break;
        case 26: activity = " exploring Great Lakes"; break;
        case 27: activity = " exploring Botanical Gardens"; break;
        case 28: activity = " exploring Wildflower Prairie"; break;
        case 29: activity = " exploring Outer Heavens"; break;
        case 30: activity = " exploring Abandoned Power Plant"; break;
        case 31: activity = " exploring Meteor Valley"; break;
        case 32: activity = " exploring Mt. Oktori"; break;
        case 33: activity = " exploring Ruined Palace"; break;
        case 34: activity = " eating poffins"; break;
        case 35: activity = " training"; break;
        case 36: activity = " watching anime"; break;
        case 37: activity = " fighting Team Rocket"; break;
        case 38: activity = " fighting Team Aqua"; break;
        case 39: activity = " fighting Team Magma"; break;
        case 40: activity = " fighting Team Galactic"; break;
        case 41: activity = " fighting Team Plasma"; break;
        case 42: activity = " fighting Team Flare"; break;
        case 43: activity = " fighting Team Skull"; break;
        case 44: activity = " fighting Team Yell"; break;
        case 45: activity = " fighting Team Snagem"; break;
        case 46: activity = " fighting Team Cipher"; break;
        case 47: activity = " in a dancing competition"; break;
        case 48: activity = " befriending " + allpokes[Math.floor(Math.random() * allpokes.length)].split("/")[0]; break;
        case 49: activity = " battling " + allpokes[Math.floor(Math.random() * allpokes.length)].split("/")[0]; break;
        case 50: activity = " using " + movelist[Math.floor(Math.random() * (movelist.length / 2)) * 2].split(" | ")[0]; break;
        case 51: activity = " learning " + movelist[Math.floor(Math.random() * (movelist.length / 2)) * 2].split(" | ")[0]; break;
        case 52: activity = " examining a type chart"; break;
        case 53: activity = " playing Baseball"; break;
        case 54: activity = " fishing"; break;
        case 55: activity = " cooking"; break;
        case 56: activity = " assisting a Pokémon Ranger"; break;
        case 57: activity = " studying"; break;
        case 58: activity = " in a raid"; break;
        case 59: activity = " ignoring me"; break;
    }
    bot.channels.get("669306624925499412").send("Watching " + pokemon + activity);
    bot.user.setActivity(pokemon + activity, { type: 'WATCHING'});
    setTimeout(function() {
        statusMessage();
    }, duration)
}

async function payDay(message, messageAuthor) {
    if (lowmessage.indexOf(",payday") == 0 && (messageAuthor.roles.has(refRole) || messageAuthor.roles.has(judgeRole))) {
        let payments = message.mentions.users;
        for(const [key, value] of payments) { //for...of will be synchronous, reduces API queuing
            if (payDayLog.mentions.users.has(key)) { // Can utilise message.mentions for this check too
                await message.channel.send(`${value} has already received a Pay Day bonus this week.`); //Template literals
            }
            else {
                var newLog = `${payDayLog.content} ${value}`; // Template literals
                await payDayLog.edit(newLog);
                await message.channel.send(`${value} receives a Pay Day bonus for this.`); //Template literals
            }
        }
    }
}

function payDayReset() {
    let oldPayDay = payDayLog.cleanContent;
    bot.channels.get(logsChannel).send("Pay Day reset.  Previously:\n\n" + oldPayDay);
    payDayLog.edit("Those who have gotten Pay Day this week:\n");
}

function bumpServer() {
    bot.channels.get("590150047279087617").send("dc!bump");
    bumpTime = setTimeout(function() {
        bumpServer();
    }, 7205000);
}

function bumpNotification() {
    bot.channels.get(botCommands).send("DISBOARD bump ready.  The command is `!d bump`.");
    disBumpTime = setTimeout(function() {
        bumpNotification();
    }, 3600000);
}

function badWordsReporter(message, messageAuthor, isEdit) {
    var badWordsLog = "";
    for (let i = 0; i < badWords.length; i++) {
        if ((lowmessage.indexOf(badWords[i]) != -1 || lowmessage.indexOf("fag") == 0) && !message.author.bot && badWordsLog == "") {
            badWordsLog += messageAuthor.displayName;
            badWordsLog += " said the following here <";
            badWordsLog += message.url;
            badWordsLog += ">: ```";
            badWordsLog += message.cleanContent;
            badWordsLog += "```";
        }
    }
    if (badWordsLog != "") {bot.channels.get(logsChannel).send(badWordsLog);}
}

function stats(message) {
    if (lowmessage.indexOf(",stats") == 0 || lowmessage.indexOf("'s statsbot") != -1) {
        let oldmessage = " " + lowmessage.replace(/'s statsbot/g, " ") + " ";
        if ((oldmessage.indexOf("gray ") != -1) || (oldmessage.indexOf("gray nine ") != -1) || (oldmessage.indexOf("gray 9 ") != -1) || (oldmessage.indexOf(" gn ") != -1) || (oldmessage.indexOf("g9 ") != -1) || (oldmessage.indexOf("gmg ") != -1) || (oldmessage.indexOf(" gm ") != -1)) { message.channel.send("\nGray Nine's stats: http://forum.pokemonurpg.com/showthread.php?tid=9849&pid=122945#pid122945") }
        if ((oldmessage.indexOf("jacen ") != -1) || (oldmessage.indexOf("jacenboy ") != -1) || (oldmessage.indexOf("jacen boy ") != -1)) { message.channel.send("\nJacenBoy's stats: http://urpg.jacenboy.com/pokes.php") }
        if (oldmessage.indexOf("rick ") != -1) { message.channel.send("\nRick's stats: https://urpg-rick.weebly.com/") }
        if ((oldmessage.indexOf("john ") != -1) || (oldmessage.indexOf("johnbdm ") != -1)) { message.channel.send("\nJohnBDM's stats: https://urpg-rick.weebly.com/") }
        if ((oldmessage.indexOf("blue ") != -1) || (oldmessage.indexOf("towel ") != -1) || (oldmessage.indexOf("bt ") != -1)) { message.channel.send("\nBlueTowel's stats: https://www.tapatalk.com/groups/fuzzyhat_and_friends/the-atmospelago-f8/") }
        if ((oldmessage.indexOf("chainy ") != -1) || (oldmessage.indexOf("chain ") != -1) || (oldmessage.indexOf("reaction01 ") != -1) || (oldmessage.indexOf("chainey ") != -1) || (oldmessage.indexOf("reaction ") != -1)) { message.channel.send("\nChainReaction01's stats: http://frozenchains.proboards.com/thread/82/pokemon-roster") }
        if (oldmessage.indexOf("smiles ") != -1) { message.channel.send("\nSmiles's stats: http://forum.pokemonurpg.com/showthread.php?tid=2175&pid=42539#pid42539") }
        if (oldmessage.indexOf("bean") != -1) { message.channel.send("\nBeanMachine's stats: http://forum.pokemonurpg.com/showthread.php?tid=9339") }
        if (oldmessage.indexOf("airik ") != -1) { message.channel.send("\nAirik's stats: http://forum.pokemonurpg.com/showthread.php?tid=7362&pid=100381#pid100381") }
        if (oldmessage.indexOf("fusion ") != -1) { message.channel.send("\nFossilFusion's stats: http://fossilfusionurpg.proboards.com/post/3/thread") }
        if ((oldmessage.indexOf("bee ") != -1) || (oldmessage.indexOf("dinobot ") != -1)) { message.channel.send("\nDinobot's stats: http://kingofcybertron.proboards.com/thread/15?page=1") }
        if (oldmessage.indexOf("roulette ") != -1) { message.channel.send("\nRoulette's stats: http://rdstatsfasho.proboards.com/post/3/thread") }
        if (oldmessage.indexOf("elamite ") != -1) { message.channel.send("\nElamite's stats: http://krummhorn.boards.net/thread/1?page=1") }
        if (oldmessage.indexOf("commba ") != -1) { message.channel.send("\nCommBA's stats: http://w11.zetaboards.com/CommBAURPG/topic/7546474/1/") }
        if (oldmessage.indexOf("axion ") != -1) { message.channel.send("\nAxion's stats: http://forum.pokemonurpg.com/showthread.php?tid=3987") }
        if (oldmessage.indexOf("izuru ") != -1) { message.channel.send("\nIzuru's stats: http://www.pokemoncrossroads.com/forum/showthread.php?18030-Izuru-s-Stats&p=279688&viewfull=1#post279688") }
        if (oldmessage.indexOf("fenris ") != -1) { message.channel.send("\nFenris's stats: https://fenris-urpg.freeforums.net/thread/138/pokemon-stats") }
        if ((oldmessage.indexOf("reneescarted ") != -1) || (oldmessage.indexOf("renee ") != -1) || (oldmessage.indexOf("renée ") != -1)) { message.channel.send("\nRenéeScarted's stats: https://forum.pokemonurpg.com/showthread.php?tid=10261&pid=127856#pid127856") }
        if (oldmessage.indexOf("lychee ") != -1) { message.channel.send("\nLychee's stats: http://forum.pokemonurpg.com/showthread.php?tid=8369") }
        if ((oldmessage.indexOf("swift") != -1) || (oldmessage.indexOf("gallade ") != -1)) { message.channel.send("\nSwiftGallade46's stats: http://swiftgallade.freeforums.net/thread/2/pokemon-especially-gallade") }
        if (oldmessage.indexOf("zolar ") != -1) { message.channel.send("\nZolar's stats: http://evilgeniusclub.proboards.com/thread/70/pokemon-numbered-list") }
        if (oldmessage.indexOf("pidge ") != -1) { message.channel.send("\nPidge's stats: https://www.tapatalk.com/groups/pidge/pidge-f3/") }
        if ((oldmessage.indexOf("k'sa") != -1) || (oldmessage.indexOf("ksariya ") != -1)) { message.channel.send("\nK'sariya's stats: https://ksariya.urpgstats.com/") }
        if ((oldmessage.indexOf("saur ") != -1) || (oldmessage.indexOf("eric ") != -1)) { message.channel.send("\nSaur's stats: https://forum.pokemonurpg.com/showthread.php?tid=10333") }
        if ((oldmessage.indexOf("dekrueger ") != -1) || (oldmessage.indexOf(" dk ") != -1)) { message.channel.send("\nDeKrueger's stats: http://forum.pokemonurpg.com/showthread.php?tid=9235&pid=116946#pid116946") }
        if ((oldmessage.indexOf("darkness ruler ") != -1) || (oldmessage.indexOf(" dr ") != -1) || (oldmessage.indexOf("darknessruler ") != -1)) { message.channel.send("\nDarknessRuler's stats: http://w11.zetaboards.com/DarknessRuler/topic/9170207/1/") }
        if ((oldmessage.indexOf("mako ") != -1) || (oldmessage.indexOf("morru ") != -1) || (oldmessage.indexOf("magnum ") != -1)) { message.channel.send("\nMako's stats: http://morrumagnumurpg.proboards.com/thread/2/pok-mon") }
        if ((oldmessage.indexOf("velo ") != -1) || (oldmessage.indexOf("jello ") != -1) || (oldmessage.indexOf(" vj ") != -1)) { message.channel.send("\nVeloJello's stats: https://velojellourpg.wordpress.com/") }
        if ((oldmessage.indexOf("weir") != -1) || (oldmessage.indexOf("gold ") != -1)) { message.channel.send("\nGold's stats: https://gold.urpgstats.com/pokemon/") }
        if (oldmessage.indexOf("nitro ") != -1) { message.channel.send("\nNitro's stats: http://w11.zetaboards.com/nitro/topic/8043094/1/?x=0") }
        if ((oldmessage.indexOf("ralin") != -1) || (oldmessage.indexOf("jack ") != -1)) { message.channel.send("\nJack's stats: https://jackurpg.wordpress.com/") }
        if ((oldmessage.indexOf("syn ") != -1) || (oldmessage.indexOf("synthesis ") != -1)) { message.channel.send("\nSynthesis's stats: http://synthesisurpg.proboards.com/thread/2/re-current-pokemon") }
        if ((oldmessage.indexOf("evan ") != -1) || (oldmessage.indexOf("evanfardreamer ") != -1)) { message.channel.send("\nEvanfardreamer's stats: http://forum.pokemonurpg.com/showthread.php?tid=9387") }
        if (oldmessage.indexOf("dash ") != -1) { message.channel.send("\nDash's stats: http://dashurpgstats.proboards.com/thread/1/pokemon") }
        if (oldmessage.indexOf(" ash ") != -1) { message.channel.send("\nAsh K.'s stats: http://ashkstatsurpg.proboards.com/thread/23/pok-mon-index") }
        if ((oldmessage.indexOf(" fd ") != -1) || (oldmessage.indexOf("fierce deity ") != -1) || (oldmessage.indexOf("fierce diety ") != -1)) { message.channel.send("\nFierce Deity's stats: http://fd-stats.proboards.com/thread/4/slaves?page=1") }
        if ((oldmessage.indexOf("xali ") != -1) || (oldmessage.indexOf("xalipeno ") != -1) || (oldmessage.indexOf("xalipeño ") != -1)) { message.channel.send("\nXali's stats: http://jalapenowarrior.proboards.com/thread/17?page=1") }
        if (oldmessage.indexOf("seppe ") != -1) { message.channel.send("\nSeppe's stats: http://seppeurpg.proboards.com/thread/2/owned") }
        if ((oldmessage.indexOf("ori ") != -1) || (oldmessage.indexOf("oribhel ") != -1) || (oldmessage.indexOf("heltear ") != -1)) { message.channel.send("\nHeltear's stats: http://forum.pokemonurpg.com/showthread.php?tid=9869") }
        if ((oldmessage.indexOf("jonas ") != -1) || (oldmessage.indexOf("jonastank ") != -1)) { message.channel.send("\nJonasTank's stats: http://forum.pokemonurpg.com/showthread.php?tid=9820") }
        if ((oldmessage.indexOf("menegoth ") != -1) || (oldmessage.indexOf("mene ") != -1)) { message.channel.send("\nMenegoth's stats: http://menegothstats.freeforums.net/thread/2/pok-mon") }
        if (oldmessage.indexOf("liam ") != -1) { message.channel.send("\nLiam's stats: https://liamsstats.home.blog/") }
        if ((oldmessage.indexOf("team evolution ") != -1) || (oldmessage.indexOf("charmander4lyf ") != -1) || (oldmessage.indexOf("ketamine ") != -1) || (oldmessage.indexOf(" te ") != -1)) { message.channel.send("\nTeam Evolution's stats: http://forum.pokemonurpg.com/showthread.php?tid=9307") }
        if ((oldmessage.indexOf("monbrey ") != -1) || (oldmessage.indexOf(" mon ") != -1) || (oldmessage.indexOf("monbray") != -1)) { message.channel.send("\nMonbrey's stats: https://urpg.monbrey.com.au/") }
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
        if ((oldmessage.indexOf("julio ") != -1) || (oldmessage.indexOf("juliorain ") != -1)) { message.channel.send("\njuliorain's stats: https://juliorain.wordpress.com/") }
        if ((oldmessage.indexOf("maxichel kigahen ") != -1) || (oldmessage.indexOf("mikey ") != -1) || (oldmessage.indexOf("mikey57 ") != -1)) { message.channel.send("\nMikey57's stats: https://mikey57urpg.wordpress.com/") }
        if ((oldmessage.indexOf("elrond ") != -1)) { message.channel.send("\nElrond's stats: https://pokemonurpg.com/stats/Elrond") }
        if ((oldmessage.indexOf(" soul ") != -1) || (oldmessage.indexOf("soulmaster ") != -1) || (oldmessage.indexOf(" sm ") != -1)) { message.channel.send("\nSoulMaster's stats: http://soulmasterurpgf.proboards.com/thread/2/pokemon-own") }
        if ((oldmessage.indexOf("winter ") != -1) || (oldmessage.indexOf(" wv ") != -1) || (oldmessage.indexOf("wintervines ") != -1)) { message.channel.send("\nWinterVines's stats: http://frozenchains.proboards.com/thread/5") }
        if ((oldmessage.indexOf("siles ") != -1) || (oldmessage.indexOf("siless ") != -1)) { message.channel.send("\nSiless's stats: http://silessurpg.proboards.com/thread/1/silesss-stats") }
        if ((oldmessage.indexOf("w32 ") != -1) || (oldmessage.indexOf("coravint ") != -1)) { message.channel.send("\nW32Coraviant's stats: https://w32coravint-urpg.neocities.org/") }
        if (oldmessage.indexOf(" sou ") != -1) { message.channel.send("\nSou's stats: http://soucleife.proboards.com/thread/2/pokemon-stats") }
        if (oldmessage.indexOf("trainer17 ") != -1) { message.channel.send("\nTrainer17's stats: http://kingofcybertron.proboards.com/thread/35/pokemon-team?page=1") }
        if ((oldmessage.indexOf("captaindude ") != -1) || (oldmessage.indexOf(" cd ") != -1)) { message.channel.send("\nCaptainDude's stats: http://captaindudeurpg.proboards.com/board/1") }
        if ((oldmessage.indexOf("mandl27 ") != -1) || (oldmessage.indexOf("mandl ") != -1) || (oldmessage.indexOf(" mand ") != -1) || (oldmessage.indexOf(" ml ") != -1)) { message.channel.send("\nMandL27's stats: https://forum.pokemonurpg.com/showthread.php?tid=10294") }
        if (oldmessage.indexOf("sapahn ") != -1) { message.channel.send("\nSapahn's stats: https://sapahnurpg.wordpress.com/") }
        if (oldmessage.indexOf("fortree ") != -1) { message.channel.send("\nAsh K.'s Fortree Gym stats: http://ashkstatsurpg.proboards.com/thread/65/fortree-city-gym-2015") }
        if (oldmessage.indexOf(" after ") != -1) { message.channel.send("\nAfter's stats: https://forum.pokemonurpg.com/showthread.php?tid=10215") }
        if ((oldmessage.indexOf("pokeviper ") != -1) || (oldmessage.indexOf(" pv ") != -1) || (oldmessage.indexOf("pokéviper") != -1)) { message.channel.send("\nPokeViper's stats: http://pokeviperbadass.proboards.com/") }
        if ((oldmessage.indexOf("shock") != -1) || (oldmessage.indexOf("3600") != -1)) { message.channel.send("\nShock3600's stats: https://forum.pokemonurpg.com/showthread.php?tid=10434") }
        if (oldmessage.indexOf("best ") != -1) { message.channel.send("\nTheVeryBest's stats: https://forum.pokemonurpg.com/showthread.php?tid=10447&pid=130885#pid130885") }
        if (oldmessage.indexOf("louise") != -1) { message.channel.send("\nlouise's stats: https://forum.pokemonurpg.com/showthread.php?tid=10448&pid=130898#pid130898") }
        if ((oldmessage.indexOf("luck") != -1) || (oldmessage.indexOf(" lg ") != -1)) { message.channel.send("\nLuckgandor's stats: https://forum.pokemonurpg.com/showthread.php?tid=9250") }
        if (oldmessage.indexOf("reciver") != -1) { message.channel.send("ReciverSquad's stats: https://forum.pokemonurpg.com/showthread.php?tid=10479") }
        if ((oldmessage.indexOf("harry") != -1) || (oldmessage.indexOf("kim") != -1)) { message.channel.send("\nHKim's stats: https://forum.pokemonurpg.com/showthread.php?tid=10041") }
        if (oldmessage.indexOf("celadon ") != -1) { message.channel.send("\nsapahn's Celadon Gym stats: https://sapahnurpg.wordpress.com/celadon-city-gym/") }
        if ((oldmessage.indexOf("turtwig") != -1)) { message.channel.send("\nTurtwig A's stats: https://forum.pokemonurpg.com/showthread.php?tid=9332") }
        if ((oldmessage.indexOf("rokaido") != -1) || (oldmessage.indexOf("speedy") != -1)) { message.channel.send("\nRokaido's stats: https://forum.pokemonurpg.com/showthread.php?tid=10518&pid=132268#pid132268") }
        if ((oldmessage.indexOf("reaper") != -1) || (oldmessage.indexOf("exar kun") != -1)) { message.channel.send("\nExar Kun's stats: http://reaperofthesouls.proboards.com/board/1/general-board") }
        if (oldmessage.indexOf("woobum") != -1) { message.channel.send("\nWoobums' stats: https://forum.pokemonurpg.com/showthread.php?tid=10551") }
        if (oldmessage.indexOf("james") != -1) { message.channel.send("\nJamesbwa's stats: https://forum.pokemonurpg.com/showthread.php?tid=10570") }
        if (oldmessage.indexOf("camper") != -1) { message.channel.send("\nImTheRealCamper's stats: https://forum.pokemonurpg.com/showthread.php?tid=10552") }
        if (oldmessage.indexOf("quig") != -1) { message.channel.send("\nQuigzerz's stats: https://forum.pokemonurpg.com/showthread.php?tid=10511") }
        if (oldmessage.indexOf("namielle") != -1) { message.channel.send("\nNamielle's stats: https://forum.pokemonurpg.com/showthread.php?tid=10478") }
        if (oldmessage.indexOf("atomic") != -1) { message.channel.send("\nAtomicX160's stats: https://forum.pokemonurpg.com/showthread.php?tid=10481") }
        if ((oldmessage.indexOf("freeze") != -1) || (oldmessage.indexOf("thunder") != -1)) { message.channel.send("FreezeThunder's stats: https://forum.pokemonurpg.com/showthread.php?tid=10428") }
        if ((oldmessage.indexOf("powar") != -1) || (oldmessage.indexOf("torterra") != -1)) { message.channel.send("PowarTheTorterra's stats: https://forum.pokemonurpg.com/showthread.php?tid=10364") }
        if ((oldmessage.indexOf(" atf") != -1) || (oldmessage.indexOf("americantreef") != -1)) { message.channel.send("AmericanTreeFrog's stats: https://forum.pokemonurpg.com/showthread.php?tid=9689") }
        if ((oldmessage.indexOf(" la ") != -1) || (oldmessage.indexOf("loyal") != -1) || (oldmessage.indexOf("arcanine") != -1) || (oldmessage.indexOf("mikey94028") != -1) || (oldmessage.indexOf("mikey ") != -1)) { message.channel.send("Loyal Arcanine's stats: https://forum.pokemonurpg.com/showthread.php?tid=9265") }
        if ((oldmessage.indexOf("jr") != -1) || (oldmessage.indexOf("junior") != -1) || (oldmessage.indexOf("pieandchips") != -1)) { message.channel.send("The Jr Trainer's stats: https://forum.pokemonurpg.com/showthread.php?tid=9255") }
        if (oldmessage.indexOf("mt. chimney") != -1) { message.channel.send("Shock3600's Mt. Chimney Gym stats: http://rebrand.ly/shock3600gym") }
        if (oldmessage.indexOf("rocco") != -1) { message.channel.send("Rocco's stats: https://forum.pokemonurpg.com/showthread.php?tid=10583") }
        if ((oldmessage.indexOf("volcan") != -1) || (oldmessage.indexOf(" vf ") != -1)) { message.channel.send("VolcanFlame's stats: https://forum.pokemonurpg.com/showthread.php?tid=10586&pid=134054#pid134054") }
        if ((oldmessage.indexOf("frozenchaos") != -1) || (oldmessage.indexOf(" fc ") != -1)) { message.channel.send("FrozenChaos' stats: https://forum.pokemonurpg.com/showthread.php?tid=10584") }
        if (oldmessage.indexOf("ravioli") != -1) { message.channel.send("raviolikid's stats: https://forum.pokemonurpg.com/showthread.php?tid=10604") }
        if (oldmessage.indexOf("josiez") != -1) { message.channel.send("josiez's stats: https://forum.pokemonurpg.com/showthread.php?tid=10603") }
    }
}

function rse(message) {
    if (lowmessage.indexOf(",rse ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("rse.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("rse.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\r\n")
        const desiredmove = lowmessage.substring(5)
        for (let x = 0; x < moves.length; x += 2) {
            if (moves[x].split(" | ")[0].toLowerCase() == desiredmove) message.channel.send(moves[x] + "\n" + moves[x + 1])
        }
    }
}

function dppt(message) {
    if (lowmessage.indexOf(",dppt ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("dppt.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("dppt.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\r\n\r\n")
        const desiredmove = lowmessage.substring(6)
        for (let x = 0; x < moves.length; x++) {
            if (moves[x].split(" | ")[0].toLowerCase() == desiredmove) message.channel.send(moves[x])
        }
    }
}

function oras(message) {
    if (lowmessage.indexOf(",oras ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("oras.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("oras.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\r\n")
        const desiredmove = lowmessage.substring(6)
        for (let x = 0; x < moves.length; x += 2) {
            if (moves[x].split(" | ")[0].toLowerCase() == desiredmove) message.channel.send(moves[x] + "\n" + moves[x + 1])
        }
    }
}

function rank(message) {
    if (lowmessage.indexOf(",rank ") == 0) {
        if (lowmessage.split(" ")[1]) {
            var found = false;
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
                    found = true
                    return
                }
                if (rankpoke == "muk") {
                    message.channel.send("That's a Complex! You'll need to write 30,000-40,000 characters or have your art pass at Complex rank!")
                    found = true
                    break
                }
                if (rankpoke == "abra") {
                    message.channel.send("That's a Complex! You'll need to write 30,000-40,000 characters or have your art pass at Complex rank!")
                    found = true
                    break
                }
                if (rankpoke.indexOf("easiest") != -1) {
                    message.channel.send(pokemonlists[0] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                    found = true
                    break
                }
                if (rankpoke.indexOf("simple") != -1) {
                    message.channel.send(pokemonlists[1] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                    found = true
                    break
                }
                if (rankpoke.indexOf("medium") != -1) {
                    message.channel.send(pokemonlists[2] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                    found = true
                    break
                }
                if (rankpoke.indexOf("hard") != -1) {
                    message.channel.send(pokemonlists[3] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                    found = true
                    break
                }
                if (rankpoke.indexOf("complex") != -1) {
                    message.channel.send(pokemonlists[4] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                    found = true
                    break
                }
                if (rankpoke.indexOf("demanding") != -1) {
                    message.channel.send(pokemonlists[5] + "\nUnderlined Pokémon are also available in the Berry Store!")
                    found = true
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
                    message.channel.send("Tier 2:\n" + pokemonlists[8] + "\n\nTier 1:\n" + pokemonlists[9])
                    found = true
                    break
                }
                if (rankpoke.indexOf("tier1") != -1 || rankpoke.indexOf("t1") != -1) {
                    message.channel.send(pokemonlists[9])
                    found = true
                    break
                }
                if (rankpoke.indexOf("tier2") != -1 || rankpoke.indexOf("t2") != -1) {
                    message.channel.send(pokemonlists[8])
                    found = true
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
                    if (x == 8) themessage = "That's a Tier 2 Legendary! You'll need to earn the equivalent of $250,000 through your stories or art!"
                    if (x == 9) themessage = "That's a Tier 1 Legendary! You'll need to earn the equivalent of $500,000 through your stories or art!"
                    found = true
                    try { pokemonlist = fs.readFileSync("mart.txt", "utf8") } catch (err) {
                        if (err.code === "ENOENT") { message.channel.send("Sorry, my mart file seems to be missing!"); pokemonlist = "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n" } else { throw err }
                    }
                    if (pokemonlist.toLowerCase().indexOf(rankpoke) != -1) {
                        themessage += "\nYou can also find it in the Pokemart";
                        let price = pokemonlist.substring(pokemonlist.toLowerCase().indexOf(rankpoke) + rankpoke.length + 3).split("\r\n")[0];
                        themessage += " for " + price + "!";
                    }
                    try { pokemonlist = fs.readFileSync("berry.txt", "utf8") } catch (err) {
                        if (err.code === "ENOENT") { message.channel.send("Sorry, my berry store file seems to be missing!"); pokemonlist = "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n" } else { throw err }
                    }
                    if (pokemonlist.toLowerCase().indexOf(rankpoke) != -1) { themessage += "\nYou can also find it in the Berry Store!" }
                    message.channel.send(themessage)
                    break
                }
            }
            if (!found) {
                message.channel.send("I'm sorry, I was unable to find " + message.cleanContent.split(" ")[1] + ". If you were searching a Pokémon, please ensure it is unevolved and that you spelled it right.  If you were searching a rank, the categories are Easiest, Simple, Medium, Hard, Complex, Demanding, and Legendary.")
            }
        }
    }
}

function ruleset(message) {
    if(lowmessage.indexOf(",rules ") == 0)
    {
        lowmessage = lowmessage.split(",rules ")[1];
        if(lowmessage.indexOf("casual") != -1 && lowmessage.indexOf("2") != -1) message.channel.send("2v2\nSM Public Open\nOHKO ACC EVA SLP FRZ Dynamax Imprison Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        else if(lowmessage.indexOf("casual") != -1 && lowmessage.indexOf("3") != -1) message.channel.send("3v3\nSM Public Open\nOHKO ACC EVA SLP FRZ Dynamax Imprison Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        else if(lowmessage.indexOf("casual") != -1 && lowmessage.indexOf("4") != -1) message.channel.send("4v4\nSM Public Open\nOHKO ACC EVA SLP FRZ Dynamax Imprison Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        else if(lowmessage.indexOf("casual") != -1 && lowmessage.indexOf("5") != -1) message.channel.send("5v5\nSM Public Open\nOHKO ACC EVA SLP FRZ Dynamax Imprison Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        else if(lowmessage.indexOf("casual") == 0) message.channel.send("6v6\nSM Public Open\nOHKO ACC EVA SLP FRZ Dynamax Imprison Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        if(lowmessage.indexOf("ppr") == 0) message.channel.send("6v6\nSM Public Preview\nOHKO ACC EVA SLP FRZ Dynamax Imprison Clauses On\nHelds Off\nDefault Weather and Terrain\nRoll for first send");
        if(lowmessage.indexOf("hidden") == 0) message.channel.send("6v6\nSM Private Preview\nOHKO ACC EVA SLP FRZ Dynamax Imprison Clauses On\nHelds Off\nDefault Weather and Terrain");
        if(lowmessage.indexOf("competitive") == 0) message.channel.send("6v6\nSM Private Preview\nOHKO ACC EVA SLP FRZ Species Item Legend Dynamax Imprison Clauses On\nHelds On\nDefault Weather and Terrain");
        if(lowmessage.indexOf("e4") == 0 || lowmessage.indexOf("elite") != -1) message.channel.send("6 vs 6\nSM Private Full or SM Private Preview\nItems Allowed\nSleep Clause\nFreeze Clause\nOHKO Clause\nAccuracy Clause\nEvasion Clause\nImprison Clause\nNo Legendary Pokemon\nDefender’s Choice: Dyanamax Clause OR Mega & Z Clauses, Species Clause, Item Clause, Weather, Terrain");
        if(lowmessage.indexOf("ld") == 0) message.channel.send("4 VS. 4+\nSM Private Full or Preview\nItems Optional\nSleep, Freeze, OHKO, Accuracy, Evasion, Imprison, and Legend Clauses On\nMega, Z, Dyanamax, Item and Species Clauses Optional\nStarting Weather and Terrain Optional");
        if(lowmessage.indexOf("ashrandoms") == 0) message.channel.send("6v6\nSM Public Box (Roll your 6 and use that as your Box)\nOHKO ACC EVA SLP FRZ Imprison Dynamax Mega Clauses On\nHelds On\nRandom Weather and Terrain\nRoll for first send\n\nAny changes?");
        if(lowmessage.indexOf("fortree") == 0) message.channel.send("6v6\nSM Public Open\nVolcano Terrain\nSun\nHolds On\nSleep/Freeze/OHKO/Accuracy/Evasion/Species/Imprison/Dynamax Clauses\nNo Legendary Pokémon\nNo Z-Moves\nChallenger Sends First");
        if(lowmessage.indexOf("ashmockfire") == 0) message.channel.send("6v6\nSM Public Box\nVolcano Terrain\nSun\nHolds On\nSleep/Freeze/OHKO/Accuracy/Evasion/Species/Imprison/Dynamax Clauses\n~~No Legendary Pokémon~~ \nNo Z-Moves\nChallenger Sends First\n\nGym Leader's Box will be Arcanine, Blaziken, Chandelure, Charizard, Cinderace, Delphox, Flareon, Houndoom, Marowak (Alola), Numel, Salamence, Talonflame, Torkoal, Turtonator, Volcarona.  Yours may be whatever you wish.");
        if(lowmessage.indexOf("ashmockdragon") == 0) message.channel.send("6v6\nSM Public Box\nBadlands Terrain\nSun\nHolds On\nSleep/Freeze/OHKO/Accuracy/Evasion/Species/Imprison/Dynamax Clauses\n~~No Legendary Pokémon~~\nNo Z-Moves\nChallenger Sends First\n\nGym Leader's Box will be Altaria, Charizard, Dragalge, Dragapult, Dragonite, Drampa, Druddigon, Exeggutor (Alola), Flygon, Garchomp, Goodra, Haxorus, Hydreigon, Kingdra, Kommo-o, Noivern, Turtonator, Tyrantrum, Salamence.  Yours may be whatever you wish.");
        if(lowmessage.indexOf("maylee") == 0) message.channel.send("6v6 SM Private Full\nSleep/Freeze/OHKO/Evasion/Accuracy/Legends clauses active\nHelds on, building terrain, no starting weather\n\nIf both battlers agree, the following rules may be changed: Mega/Z/Item/Species, Helds off instead of on, Preview instead of Full");
        if(lowmessage.indexOf("ffa") == 0) message.channel.send("SM Private Full\nNo Holds\nNo Sleep Moves (Barring Rest)\nEVA/ACC/OHKO/Imprison/Dyanamax Clauses\nPerish Song Fails\nPerish Body banned\nHit All - Hit One\nEncore Fails\nAttract Fails\nRage Powder/Follow Me/Spotlight Fails\nRedirects On\nIllusion Pokémon disguises as a random Pokémon from the National Pokédex\nImposter, Download, and Intimidate select a random participating Pokémon\nNot sending or forfeiting results in KO at the beginning of the turn");
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
            var imp = Math.floor(Math.random() * 2);
            //var mega = Math.floor(Math.random() * 2);
            var leg = Math.floor(Math.random() * 2);
            //var zmo = Math.floor(Math.random() * 2);
            //var dyna = Math.floor(Math.random() * 2);
            var mzmax = Math.floor(Math.random() * 5);
            var weather = Math.floor(Math.random() * 6);
            var terrain = Math.floor(Math.random() * 12);
            if (lowmessage.indexOf("-dynamax") != -1) {
                if (lowmessage.indexOf("-mega") != -1) {
                    if (lowmessage.indexOf("-z") != -1) {mzmax = 3;}
                    else if (lowmessage.indexOf("zmo") != -1) {mzmax = 2;}
                    else {mzmax = Math.floor(Math.random() * 2) + 2;}
                }
                else if (lowmessage.indexOf("mega") != -1) {
                    if (lowmessage.indexOf("-z") != -1) {mzmax = 0;}
                    else if (lowmessage.indexOf("zmo") != -1) {mzmax = 1;}
                    else {mzmax = Math.floor(Math.random() * 2);}
                }
                else {
                    if (lowmessage.indexOf("-z") != -1) {mzmax = Math.floor(Math.random() * 2) * 3;}
                    else if (lowmessage.indexOf("zmo") != -1) {mzmax = Math.floor(Math.random() * 2) + 1;}
                    else {mzmax = Math.floor(Math.random() * 4);}
                }
            }
            else if (lowmessage.indexOf("dynamax") != -1) {mzmax = 4;}
            if (lowmessage.indexOf("single") != -1) {mode = Math.floor(Math.random() * 2);}
            if (lowmessage.indexOf("double") != -1) {mode = 2;}
            if (lowmessage.indexOf("-triple") != -1) {
                if (lowmessage.indexOf("-rotation") != -1) {mode = Math.floor(Math.random() * 3);}
                else {
                    mode = Math.floor(Math.random() * 4);
                    if (mode == 3) {mode = 4;}
                }
            }
            else if (lowmessage.indexOf("triple") != -1) {mode = 3;}
            if (lowmessage.indexOf("-rotation") != -1) {
                if (lowmessage.indexOf("-triple") == -1) {mode = Math.floor(Math.random() * 4);}
            }
            else if (lowmessage.indexOf("rotation") != -1) {mode = 4;}
            if (lowmessage.indexOf("2") != -1) {numPok = 2;}
            if (mode > 2) {numPok = Math.floor(Math.random() * 4) + 3;}
            if (lowmessage.indexOf("3") != -1) {numPok = 3;}
            if (lowmessage.indexOf("4") != -1) {numPok = 4;}
            if (lowmessage.indexOf("5") != -1) {numPok = 5;}
            if (lowmessage.indexOf("6") != -1) {numPok = 6;}
            if (lowmessage.indexOf("-gsc") != -1) {gen = Math.floor(Math.random() * 2) + 1;}
            else if (lowmessage.indexOf("gsc") != -1) {gen = 0;}
            if (lowmessage.indexOf("-rse") != -1) {gen = Math.floor(Math.random() * 2) * 2;}
            if (lowmessage.indexOf("rse") != -1) {gen = 1;}
            if (lowmessage.indexOf("-sm") != -1) {gen = Math.floor(Math.random() * 2);}
            else if (lowmessage.indexOf("sm") != -1) {gen = 2;}
            if (lowmessage.indexOf("-open") != -1) {format = Math.floor(Math.random() * 3) + 1;}
            else if (lowmessage.indexOf("open") != -1) {format = 0;}
            else if (lowmessage.indexOf("box") != -1) {format = 1;}
            else if (lowmessage.indexOf("full") != -1) {format = 2;}
            else if (lowmessage.indexOf("preview") != -1) {format = 3;}
            if (lowmessage.indexOf("public") != -1) {mode = 0;}
            if (lowmessage.indexOf("private") != -1) {mode = Math.floor(Math.random() * 4) + 1;}
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
            if (lowmessage.indexOf("-itemc") != -1) {itemc = 1;}
            else if (lowmessage.indexOf("itemc") != -1) {itemc = 0;}
            if (lowmessage.indexOf("-species") != -1) {spc = 1;}
            else if (lowmessage.indexOf("species") != -1) {spc = 0;}
            if (lowmessage.indexOf("-items") != -1) {items = 1;}
            else if (lowmessage.indexOf("items") != -1) {items = 0;}
            if (lowmessage.indexOf("-imprison") != -1) {imp = 1;}
            else if (lowmessage.indexOf("imprison") != -1) {imp = 0;}
            //if (lowmessage.indexOf("-mega") != -1) {mega = 0;}
            //else if (lowmessage.indexOf("mega") != -1) {mega = 1;}
            if (lowmessage.indexOf("-legend") != -1) {leg = 0;}
            else if (lowmessage.indexOf("legend") != -1) {leg = 1;}
            //if (lowmessage.indexOf("-z") != -1) {zmo = 0;}
            //else if (lowmessage.indexOf("zmove") != -1) {zmo = 1;}
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
            if (imp == 0) {rules += "Imprison Clause\n";}
            if (items == 0) {
                switch(mzmax) {
                    case 0: rules += "Z-Moves Clause\n"; break;
                    case 2: rules += "Mega Clause\n"; break;
                    case 3: rules += "Mega Clause\nZ-Moves Clause\n"; break;
                    case 4: rules += "Mega Clause\nZ-Moves Clause\n"; break;
                }
            }
            if (mzmax != 4) {rules += "Dynamax Clause\n"}
            //if (leg == 0) {rules += "Legends Clause\n";}
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
}

function randWeather(message) {
    if (lowmessage.indexOf(",weather") == 0) {
        let weather = Math.floor(Math.random() * 6);
        if (lowmessage.indexOf("-fog") != -1 && lowmessage.indexOf("-no") != -1) {weather = Math.floor(Math.random() * 4 + 1);}
        else if (lowmessage.indexOf("-fog") != -1) {weather = Math.floor(Math.random() * 5);}
        else if (lowmessage.indexOf("-no") != -1) {weather = Math.floor(Math.random() * 5 + 1);}
        switch(weather) {
            case 0: message.channel.send("No Starting Weather"); break;
            case 1: message.channel.send("Sun"); break;
            case 2: message.channel.send("Rain"); break;
            case 3: message.channel.send("Sandstorm"); break;
            case 4: message.channel.send("Hail"); break;
            case 5: message.channel.send("Fog"); break;
        }
    }
}

function randTerrain(message) {
    if (lowmessage.indexOf(",terrain") == 0) {
        let terrain = Math.floor(Math.random() * 12);
        switch(terrain) {
            case 0: message.channel.send("Building Terrain"); break;
            case 1: message.channel.send("Cave Terrain"); break;
            case 2: message.channel.send("Ice Terrain"); break;
            case 3: message.channel.send("Puddles Terrain"); break;
            case 4: message.channel.send("Badlands Terrain"); break;
            case 5: message.channel.send("Snow Terrain"); break;
            case 6: message.channel.send("Tall Grass Terrain"); break;
            case 7: message.channel.send("Water Terrain"); break;
            case 8: message.channel.send("Volcano Terrain"); break;
            case 9: message.channel.send("Burial Grounds Terrain"); break;
            case 10: message.channel.send("Soaring Terrain"); break;
            case 11: message.channel.send("Space Terrain"); break;
        }
    }
}

function contestLog(message) {
    if((lowmessage.indexOf(",") == 0) && (lowmessage.indexOf("contestlog") != -1)) {
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
        switch(rank + attribute) {
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
}

function hiddenPower(message) {
    if(lowmessage.indexOf(",hp ") == 0)
        {
            var pokemonName = "";
            if (message.cleanContent.indexOf(",hp ") == 0) { pokemonName = message.cleanContent.split(",hp ")[1]; }
            if (message.cleanContent.indexOf(",hP ") == 0) { pokemonName = message.cleanContent.split(",hP ")[1]; }
            if (message.cleanContent.indexOf(",Hp ") == 0) { pokemonName = message.cleanContent.split(",Hp ")[1]; }
            if (message.cleanContent.indexOf(",HP ") == 0) { pokemonName = message.cleanContent.split(",HP ")[1]; }
            lowmessage = pokemonName.toLowerCase();
            var hp = "";
            switch(lowmessage) {
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
                case "absol": hp = "Grass"; break;             
            }
            if(hp == "") message.channel.send("Sorry, I don't know what Hidden Power is best for " + pokemonName + "!");
            else {message.channel.send("I'd give " + pokemonName + " Hidden Power " + hp + "!" );}
        }
}

function stealthRock(message) {
    if(lowmessage.indexOf(",sr ") == 0)
    {
        var pokemon = lowmessage.split(",sr ")[1];
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
                return;
            }
        }
        message.channel.send("I'm afraid " + pokemon + " is not in my types database.  Check that you spelled it correct, and remember my research in the Galar region isn't yet complete.");
    }
}

function effectiveness(message) {
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
                return;
            }
        }
        message.channel.send("I'm afraid " + pokemon + " is not in my types database.  Check that you spelled it correct, and remember my research in the Galar region isn't yet complete.");
    }
}

function coverage(message) {
    if(lowmessage.indexOf(",coverage ") == 0)
    {
        var types = lowmessage.split(" ");
        for (var i = 1; i < types.length; i++) {
            switch (types[i]) {
                case "normal": types[i] = 0; break;
                case "grass": types[i] = 1; break;
                case "fire": types[i] = 2; break;
                case "water": types[i] = 3; break;
                case "bug": types[i] = 4; break;
                case "poison": types[i] = 5; break;
                case "flying": types[i] = 6; break;
                case "electric": types[i] = 7; break;
                case "ground": types[i] = 8; break;
                case "fairy": types[i] = 9; break;
                case "fighting": types[i] = 10; break;
                case "psychic": types[i] = 11; break;
                case "rock": types[i] = 12; break;
                case "steel": types[i] = 13; break;
                case "ice": types[i] = 14; break;
                case "ghost": types[i] = 15; break;
                case "dragon": types[i] = 16; break;
                case "dark": types[i] = 17; break;
                default: types[i] = 18; break;
            }
        }
        //var fs = require('fs');
        var allpokes = fs.readFileSync('Pokemon.txt', 'utf8').split('\r\n');
        var covers = [0, 0, 0, 0, 0, 0]
        for(var x = 0; x < allpokes.length; x++)
        {
            var damage = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1]
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
            var effective = -1
            for (var i = 1; i < types.length; i++) {
                if (damage[types[i]] > effective) { effective = damage[types[i]]; }
            }
            switch (effective) {
                case -1: message.channel.send("It seems that none of the types you entered were valid. Please format as `,coverage type1 type2 type3...` and be sure they're all spelled correctly."); return;
                case 0: covers[0]++; break;
                case 0.25: covers[1]++; break;
                case 0.5: covers[2]++; break;
                case 1: covers[3]++; break;
                case 2: covers[4]++; break;
                case 4: covers[5]++; break;
            }
        }
        var coverMessage = "That spread will hit:";
        if (covers[5] != 0) { coverMessage += "\n" + covers[5] + " Pokémon for quaruple damage"; }
        if (covers[4] != 0) { coverMessage += "\n" + covers[4] + " Pokémon for double damage"; }
        if (covers[3] != 0) { coverMessage += "\n" + covers[3] + " Pokémon for neutral damage"; }
        if (covers[2] != 0) { coverMessage += "\n" + covers[2] + " Pokémon for half damage"; }
        if (covers[1] != 0) { coverMessage += "\n" + covers[1] + " Pokémon for quarter damage"; }
        if (covers[0] != 0) { coverMessage += "\n" + covers[0] + " Pokémon for no damage"; }
        message.channel.send(coverMessage);
    }
}

function beatUp(message) {
    if(lowmessage.indexOf(",beatup ") == 0)
    {
        var pokemon = lowmessage.split(",beatup ")[1];
        if (!isNaN(pokemon)) {
            var beatUpBP = Math.floor(((pokemon - 99) / 2) / 10) + 5;
            message.channel.send("A Pokémon with a base URPG Attack stat of " + pokemon + " would have a base " + beatUpBP + " power Beat Up!");
            return;
        }
        //var fs = require('fs');
        var allpokes = fs.readFileSync('Pokemon.txt', 'utf8').split('\r\n');
        for(var x = 0; x < allpokes.length; x++)
        {
            if(pokemon.toLowerCase() == allpokes[x].split('/')[0].toLowerCase())
            {
                var beatUpBP = Math.floor(((allpokes[x].split('/')[4] - 99) / 2) / 10) + 5;
                message.channel.send(allpokes[x].split('/')[0] + " would have a base " + beatUpBP + " power Beat Up!");
                return;
            }
        }
        message.channel.send("I'm afraid " + pokemon + " is not in my base stats database.  My research in the Galar region isn't yet complete, but I can give you the base power from its URPG attack stat with `,beatup 299` or similar.");
    }
}

function clauses(message) {
    if (lowmessage.indexOf(",clause") == 0) {
        //var clauses = lowmessage.split(" ");
        //for (var i = 0; i < clauses.length; i++) {
        if (lowmessage.indexOf("public") != -1) { message.channel.send("Public: All Pokemon and moves are sent in the public chat. A dice is rolled to determine who sends first unless specified otherwise.\nIt is important to note that in battle modes in which you select your moves in the chat or thread, you must alternate sending your Pokemon and moves first. The battlers can agree on who sends his/her Pokemon first, or the ref can roll to see who gets to decide. Gym leaders are allowed to force the challenger to send first. After a battler sends his/her Pokemon out first, the other battler sends his/her Pokemon and move. Afterwards, the person who sent his/her Pokemon first sends their move second. Then battlers take turns alternating sending first. If a single Pokemon is knocked out in a turn, the battler replaces that Pokemon, but this does not count as sending first or second, so the alternation of sending first continues normally. If both Pokemon are knocked out in a single turn, then the battlers select their Pokemon as though they are continuing alternating. Sending implied moves, such as continuing Outrage, recharging for Hyper Beam, and a battler sending his/her last remaining Pokemon still count for alternating sending first or second."); }
        if (lowmessage.indexOf("private")!= -1) { message.channel.send("Private: All Pokemon and moves are sent privately to the referee."); }
        if (lowmessage.indexOf("gsc") != -1) { message.channel.send("GSC: All Pokemon have no abilities (excluding Truant/Defeatist/Slow Start on Slaking/Archeops/Regigigas respectively). Whether a move is physical or special is determined by its type."); }
        if (lowmessage.indexOf(" rse") != -1) { message.channel.send("RSE: Pokemon have abilities. Whether a move is physical or special is determined by its type."); }
        if (lowmessage.indexOf("sm") != -1) { message.channel.send("SM: All mechanics function as per the latest game."); }
        if (lowmessage.indexOf("full") != -1) { message.channel.send("Full: A complete team of Pokemon, with abilities and held items, is sent to the referee prior to the battle. Leads are selected after the team is sent."); }
        if (lowmessage.indexOf("preview") != -1) { message.channel.send("Preview: A complete team of Pokemon, with abilities and held items, is sent to the referee prior to the battle. The referee will reveal both teams before leads are selected."); }
        if (lowmessage.indexOf("open") != -1) { message.channel.send("Open: Pokemon are sent during the battle – teams are not predetermined."); }
        if (lowmessage.indexOf("box") != -1) { message.channel.send("Box: Trainers send their full stats or a subset (of any size) of their Pokémon to use to the ref (i.e. “all”, “not Meowth”, “Bulbasaur, Charmander, Squirtle, Pikachu”). The ref will then announce those selections and the trainers battle as if those were the Pokémon they own, choosing which of those Pokémon as they go and sending gender, item, and ability when the Pokémon is first sent out."); }
        if (lowmessage.indexOf("double") != -1) { message.channel.send("Double Battle: In a Double Battle, each trainer has two Pokemon out at the same time. When Pokemon are knocked out, if the battler has more Pokemon available in his/her party, he/she must send Pokemon to replace them at the end of the turn.\nEach Pokemon is able to target any other Pokemon on the field, including its own ally. However, there are moves that affect multiple Pokemon at once. These moves can be found by clicking here. When a move hits more than one Pokemon at once, its base power is reduced to 75% of its original value. Furthermore, each instance of the move hitting a Pokemon requires its own accuracy roll, if the move is less than 100% accurate. Likewise, the secondary effects of moves that target multiple Pokemon require an individual roll for each target that is hit.\nWhen Reflect, Light Screen, and Aurora Veil are used in a Double Battle, they benefit both Pokemon on the side it is used. However, instead of halving damage like in Single Battles, the damage is reduced by 1/3 instead.\nThis rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("multi") != -1) { message.channel.send("Multi Battle: This is a Double Battle, but you are teamed with another battler. Each battler only controls one Pokemon at a time. Each battler must send the same amount of Pokemon. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("triple") != -1) { message.channel.send("Triple Battle: Three Pokemon are used at the same time by both sides. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("rotation") != -1) { message.channel.send("Rotation Battle: Three Pokemon are sent at the same time by both sides, but one Pokemon must be sent as the front Pokemon, while the other two are on standby. Only the front Pokemon can attack, and it is also the target of all attacks. However, a player may rotate any of his/her standby Pokemon to the front and attack with it the same turn. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("wonder") != -1 || lowmessage.indexOf("launcher") != -1) { message.channel.send("Wonder Launcher: When the Wonder Launcher is enabled, battlers are able to use special points to purchase items during the battle to use on his/her Pokemon. Each battler starts with 0 points, and each battler gains 1 point at the end of each turn. If a battler has 14 unused points, he/she will gain no additional points until he/she uses some. The list of purchasable items can be found by clicking here. When an item is purchased, it must be used immediately. Battlers cannot buy items and store them for later use. When an item is purchased and used, the battler forgoes his/her move that turn to use the item, and the opponent is aware of the use of the item. Items that increase a Pokemon’s stat stages or critical hit stages and ‘Urge Items’ can only be used on a controlled active Pokemon. Revive and Max Revive can only be used on fainted Pokemon. The rest of the items can be used on any Pokemon in the battler’s party. If a battler purchases an item that is unable to do anything for the battler’s current party, the item will do nothing, and points will still be lost. In-depth information of the effects of items can be found here: https://bulbapedia.bulbagarden.net/wiki/Wonder_Launcher for prices."); }
        if (lowmessage.indexOf("gameboy") != -1) { message.channel.send("Gameboy Clause: Each battler selects up to four moves for each of their Pokemon for the battle before it begins. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("sky") != -1) { message.channel.send("Sky Battle: Each battler may only use Pokemon that qualify for Sky Battles, generally Flying and Levitating Pokemon, though not all. A complete list can be found here: https://bulbapedia.bulbagarden.net/wiki/Sky_Battle#Eligible_Pok.C3.A9mon\n*Not a valid rule for gym battles.*"); }
        if (lowmessage.indexOf("inverse") != -1) { message.channel.send("Inverse Battle: Type effectiveness is reversed for the battle. 4x becomes 1/4x, 2x becomes 1/2x and vice versa. Immunities are treated as 2x super effective (the other type still applies, if there is one).\n*Not a valid rule for gym battles.*"); }
        if (lowmessage.indexOf("sleep") != -1 || lowmessage.indexOf("slp") != -1) { message.channel.send("Sleep Clause: Only one Pokemon per side may be put to sleep at a time by the opponent. Any additional attempts will fail. Rest does not count towards Sleep Clause."); }
        if (lowmessage.indexOf("freeze") != -1 || lowmessage.indexOf("frz") != -1) { message.channel.send("Freeze Clause: Only one Pokemon per side may be frozen. Any additional freeze chances will fail."); }
        if (lowmessage.indexOf("ohko") != -1) { message.channel.send("OHKO Clause: OHKO moves: Fissure, Guillotine, Horn Drill, and Sheer Cold will always fail."); }
        if (lowmessage.indexOf("acc") != -1) { message.channel.send("Accuracy Clause: Moves that have a 100% chance of lowering accuracy will not lower accuracy. Other effects like damage from Mud-Slap will still occur. If a Z-Effect would lower an opponent’s Accuracy, this effect is not applied, however the move is still considered a Z-Move for all other purposes."); }
        if (lowmessage.indexOf("eva") != -1) { message.channel.send("Evasion Clause: Moves that increase evasion directly, Double Team and Minimize, will fail. If a Z-Effect would raise the user’s Evasion, this effect is not applied, however the move is still considered a Z-Move for all other purposes."); }
        if (lowmessage.indexOf("species") != -1) { message.channel.send("Species Clause: Each battler may not send more than one of a single species of Pokemon, defined by Pokedex number."); }
        if (lowmessage.indexOf("item clause") != -1 || lowmessage.indexOf("itemc") != -1) { message.channel.send("Item Clause: Each battler may not equip more than one of a single type of item, defined by its name."); }
        if (lowmessage.indexOf("mega") != -1) { message.channel.send("Megas Clause: Battlers may not Mega Evolve their Pokemon. Mega Stones are still permitted as held items."); }
        if (lowmessage.indexOf("legend") != -1) { message.channel.send("Legends Clause: Battlers may not use Legendary Pokemon."); }
        if (lowmessage.indexOf("zm") != -1 || lowmessage.indexOf("z-m") != -1) { message.channel.send("Z-Moves Clause: Battles may not use Z-Moves. Z-Crystals are still permitted as held items."); }
        if (lowmessage.indexOf("imprison") != -1) { message.channel.send("Imprison Clause: Fully prevents Imprison from being used. Referees must prompt battlers to choose a new move if Imprison is selected. Imprison may not be selected by Sleep Talk/Metronome/Assist, and will cause a reroll if rolled. Imprison Clause is automatically turned on for any Gym, Battle Frontier, or Elite Four/Champion matches. This may not be removed. Imprison Clause may be turned off for Casual Battles, as well as Street League Gyms."); }
        if (lowmessage.indexOf("dynamax") != -1) { message.channel.send("Dynamax Clause: Disallows Dynamaxing. Dynamax is a mechanic where a Pokemon grows in size for 3 turns, doubling its max HP, and all moves change into Max Moves. Max moves are stronger moves than their regular counterparts, and provide a boost or weather/terrain effect. Gigantimax has been rolled into Dynamax for URPG; a Gigantimax Pokemon may use either Dynamaxed moves, or their Gigantimax move, at any time for the 3 turn duration. Dynamax may not be used in the same battle as either Mega or Z-Moves."); }
    }
}

function links(message) {
    if (lowmessage.indexOf(",calc") == 0) { message.channel.send("https://pokemonurpg.com/pokemonurpg-dot-com/calcs/battlev3.html"); }
    if (lowmessage.indexOf(",info") == 0) { message.channel.send("https://pokemonurpg.com/info/"); }
    if (lowmessage.indexOf(",forum") == 0) { message.channel.send("https://forum.pokemonurpg.com/"); }
    if (lowmessage.indexOf(",mart") == 0) { message.channel.send("http://forum.pokemonurpg.com/showthread.php?tid=1682"); }
    if (lowmessage.indexOf(",berry") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1686"); }
    if (lowmessage.indexOf(",start") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1722"); }
    if (lowmessage.indexOf(",bmgarchive") == 0) { message.channel.send("https://pokemonurpg.com/archive/urpg.html"); }
    if (lowmessage.indexOf(",pxrarchive") == 0) { message.channel.send("https://pokemonurpg.com/archive/pxr/\nNote: There is one known issue with the CSS, at least in Chrome (probably in other browsers as well) because PXR serves its CSS files over HTTP instead of HTTPS. You can make the pages appear correctly by clicking on the little shield on the right side of the URL bar and click \"Load unsafe scripts\""); }
    if (lowmessage.indexOf(",refund") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=7975"); }
    if (lowmessage.indexOf(",gen8") == 0 || lowmessage.indexOf(",galar") == 0) { message.channel.send("https://docs.google.com/document/d/1hZFqQJa3i6YlqehIJFeQ0b5NqUAuISHW7PdLV3wNUF0/edit#"); }
    if (lowmessage.indexOf(",nukem") == 0) { message.channel.send("https://pokemonurpg.com/info/general/project-nukem/"); }
    if (lowmessage.indexOf(",refpedia") == 0) { message.channel.send("https://pokemonurpg.com/info/battles/reffing-encyclopedia/"); }
    if (lowmessage.indexOf(",gym") == 0) { message.channel.send("https://pokemonurpg.com/info/battles/champion-elite-four-gym-leaders/"); }
    if (lowmessage.indexOf(",updategym") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=4417"); }
}

function wildcards(message) {
    if (lowmessage.indexOf(",wc") == 0) { lowmessage = lowmessage.replace(/,wc/, ",wildcard"); }
    if (lowmessage.indexOf(",wildcard ") == 0) {
        var wclist = "";
        switch (lowmessage.split(" ") [1]){
            case "normal": wclist = "Clefable, Azumarill, Granbull"; break;
            case "grass": wclist = "Crustle, Comfey, Sudowoodo"; break;
            case "fire": wclist = "Salamence, Leafeon, Darmanitan-Galar (Zen Mode only), Solrock"; break;
            case "water": wclist = "Dragalge, Beartic, Hoenn Fossils"; break;
            case "electric": wclist = "Porygon Line, Golurk, Probopass"; break;
            case "ice": wclist = "Quagsire, Slowpoke Line, Kingdra, Empoleon"; break;
            case "fighting": wclist = "Metagross, Electivire, Incineroar"; break;
            case "poison": wclist = "Gliscor, Accelgor, Breloom"; break;
            case "ground": wclist = "Duraludon, Tyranitar, Cacturne"; break;
            case "flying": wclist = "Volcarona, Sirfetch'd, Decidueye"; break;
            case "psychic": wclist = "Ninetales-Kanto, Darmanitan-Unova (Zen Mode only), Mienshao, Noctowl"; break;
            case "bug": wclist = "Kabutops, Flygon, Falinks"; break;
            case "rock": wclist = "Sableye, Torterra, Steelix"; break;
            case "dragon": wclist = "Charizard, Gyarados, Ampharos, Sceptile"; break;
            case "ghost": wclist = "Rotom, Houndoom, Kecleon"; break;
            case "steel": wclist = "Blastoise, Vikavolt, Dhelmise"; break;
            case "dark": wclist = "Gengar, Gyarados, Gothitelle"; break;
            case "fairy": wclist = "Delphox, Altaria, Blissey Line"; break;
            default: wclist = "Normal: Clefable, Azumarill, Granbull\nGrass: Crustle, Comfey, Sudowoodo\nFire: Salamence, Leafeon, Darmanitan-Galar (Zen Mode only), Solrock\nWater: Dragalge, Beartic, Hoenn Fossils\nElectric: Porygon Line, Golurk, Probopass\nIce: Quagsire, Slowpoke Line, Kingdra, Empoleon\nFighting: Metagross, Electivire, Incineroar\nPoison: Gliscor, Accelgor, Breloom\nGround: Duraludon, Tyranitar, Cacturne\nFlying: Volcarona, Sirfetch'd, Decidueye\nPsychic: Ninetales-Kanto, Darmanitan-Unova (Zen Mode only), Mienshao, Noctowl\nBug: Kabutops, Flygon, Falinks\nRock: Sableye, Torterra, Steelix\nDragon: Charizard, Gyarados, Ampharos, Sceptile\nGhost: Rotom, Houndoom, Kecleon\nSteel: Blastoise, Vikavolt, Dhelmise\nDark: Gengar, Gyarados, Gothitelle\nFairy: Delphox, Altaria, Blissey Line";
        }
        message.channel.send(wclist);
    }
    else if (lowmessage.indexOf(",wildcard") == 0) { message.channel.send("Normal: Clefable, Azumarill, Granbull\nGrass: Crustle, Comfey, Sudowoodo\nFire: Salamence, Leafeon, Darmanitan-Galar (Zen Mode only), Solrock\nWater: Dragalge, Beartic, Hoenn Fossils\nElectric: Porygon Line, Golurk, Probopass\nIce: Quagsire, Slowpoke Line, Kingdra, Empoleon\nFighting: Metagross, Electivire, Incineroar\nPoison: Gliscor, Accelgor, Breloom\nGround: Duraludon, Tyranitar, Cacturne\nFlying: Volcarona, Sirfetch'd, Decidueye\nPsychic: Kanto-Ninetales, Darmanitan (Zen Mode only), Mienshao, Noctowl\nBug: Kabutops, Flygon, Falinks\nRock: Sableye, Torterra, Steelix\nDragon: Charizard, Gyarados, Ampharos, Sceptile\nGhost: Rotom, Houndoom, Kecleon\nSteel: Blastoise, Vikavolt, Dhelmise\nDark: Gengar, Gyarados, Gothitelle\nFairy: Delphox, Altaria, Blissey Line"); }
}

function fairyGIF(message) {
    if (lowmessage.indexOf(",") == 0 && lowmessage.indexOf("fairy") != -1 && message.channel.id == botCommands && !message.author.bot) {
        message.channel.send("", {
            embed: {
                thumbnail: {
                    url: 'https://cdn.discordapp.com/attachments/135864828240592896/559960120398839809/Fairy_Pokemon.gif'
                }
            }
        })
    }
}

function anonymousReport(message) {
    if (lowmessage.indexOf("noreply:") == 0 || lowmessage.indexOf("no reply:") == 0) {
        var anonReport = "Anonymous Report:```"
        anonReport += message.content;
        anonReport += "```"
        bot.channels.get(anonymousReportChannel).send(anonReport);
        message.author.send("Thank you for your report!  It has been sent to the staff team for review.");
    }
    else if (lowmessage.indexOf("reply:") == 0) {
        var anonReport = "Anonymous Report from ";
        anonReport += message.channel.id;
        anonReport += ":```"
        anonReport += message.content;
        anonReport += "```Send ,anonreply "
        anonReport += message.channel.id;
        anonReport += " MESSAGE in <#135870064573284352> and I'll send MESSAGE back."
        bot.channels.get(anonymousReportChannel).send(anonReport);
        message.author.send("Thank you for your report!  It has been sent to the staff team for review.  When they have a reply, I'll pass it back to you!");
    }
}

function help(message) {
    if (lowmessage.indexOf(",help") == 0) {
        if (lowmessage.indexOf("stat") != -1) {
            message.channel.send("Send either `,stats` and then any number of usernames or recognized nicknames and I will link you to each of their stats! If you know of stats or nicknames that I don't, please @ Ash K. with the username and/or nickname and link and they will be added.");
        }
        else if (lowmessage.indexOf("rank") != -1) {
            message.channel.send("Send `,rank POKÉMON` and I'll tell you what rank `POKÉMON` is in art and stories, as well as if it's in the Pokémart or Berry Store!  Alternatively, if you send `,rank RANK` I'll tell you all the Pokémon that are RANK in art and stories!");
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
            message.channel.send("`,mentionrefs`, `,mentionjudges`, `,mentioncurators`, `,mentiongraders`, `,mentionrangers`, or `,mentionarbiters`: Pings the applicable role.  Required role: Applicable section senior.\n`,mentionforumffa`: Pings Forum FFA role.  Required role: Forum FFA Host.\n`,mentionffa` or `!ffa -p`: Pings everyone who wants to be notified about FFAs. Required role: Referee. Required channel: <#136222872371855360>, <#269634154101080065>, or <#653328600170364953>\n`,mentioncoordinators`: Pings everyone who wishes to be notified about contests happening. Required role: Judge.\n`,mentionmembers`: Pings member role with a message.  Required role: No role allows this.\n`,mentionstaff`: Pings staff if something needs addressing quickly.  Required role: Member.\n`,mentioncontentupkeeper`, `,mentiongamedesign`, `,mentionevents`, `,mentiontechnicalteam`: Pings the respective team if something of theirs needs addressing.  Required role: Member.\n\n**Notes about all mention functions:**\nMention everyone permission allows use of a ping without the mentioned role.\nYou may put a message after the ping command and it will be copied after the ping, so that looking at mentions will directly show that information.");
        }
        else if (lowmessage.indexOf("profession") != -1 || lowmessage.indexOf("ref") != -1 || lowmessage.indexOf("judge") != -1) {
            message.channel.send("`,payday @MEMBER1 @MEMBER2...`: Lets you know which of the mentioned members has received Pay Day this week, and adds all others to the log of who has. Required role: Referee or Judge.\n`,pin MESSAGEID`, `,unpin MESSAGEID`: Pins/unpins message with ID MESSAGEID in this channel. Required role/channel: Referee in battle chat or Judge in contest chat.")
        }
        else if (lowmessage.indexOf("staff") != -1 || lowmessage.indexOf("mod") != -1 || lowmessage.indexOf("auth") != -1 || lowmessage.indexOf("restrict") != -1) {
            message.channel.send("**Restricted Commands:**\nAll `,mention` functions: See `,help mention` for more info.\nRef or Judge specific commands: See `,help profession`.\n`,anonreply # message`: Sends a reply to the `reply:` anonymous report with the given number. Required channel: staff or any in Teams & Projects.\n`,archive`: Archives the channel, putting it in the archive category and removes access to all non-staff. Use `,archive public` or `,publicarchive` for public channels and `,archive`, `,archive private`, or `,privatearchive` for private channels. Required role: content-upkeeper\n`,contestboss`: Creates the temporary rooms for a contest boss. Required role: Death Eater.\n`,reftest`, `,judgetest`, or `,rangertest`: Creates a temporary test channel. If the command contains a mention, also adds that member to the channel. Required role: Appropriate section senior.\n`,end`: Deletes a temporary channel. Only works in a temporary channel and requires the same role required to create that channel.\n`,fixorder`: Resets profession chat order. Required role: content-upkeeper.\n`,pkmnspoilerseason THING-TO-SPOIL`: changes the name of <#440004235635982336> to #spoilers-THING-TO-SPOIL and removes pkmnspoilers role from everyone. Required role: content-upkeeper or Manage Channels permission.\n`,otherspoilerseason THING-TO-SPOIL`: changes the name of <#597314223483387905> to #spoilers-THING-TO-SPOIL and removes otherspoilers role from everyone. Required role: content-upkeeper or Manage Channels permission.\n`,newdiscussion CHANNEL-NAME`: Creates a new staff discussion channel with the given name. Required channel: staff.\n`,newproject CHANNEL-NAME`: Creates a new project discussion channel with the given name. Required channel: Any in the Teams & Projects category.");
        }
        else if (lowmessage.indexOf("role") != -1) {
            message.channel.send("Command moved to Kauri. See `!help role` for more info."); //message.channel.send("**Self-assignable roles:**\npkmnspoilers: Access to <#440004235635982336>.\notherspoilers: Access to <#597314223483387905>.\nffa: Pings for Discord FFAs.\nforumffa: Pings for Forum FFAs and Forum FFA turns.\ncoordinator: Pings for contests.\n\nSend `,role ROLE` (i.e. `,role ffa`) to add or remove yourself from any of these roles. Spoiler role will automatically be reset when it changes to spoilers for a different thing.");
        }
        else if (lowmessage.indexOf("link") != -1) {
            message.channel.send("`,forum`: Link to URPG's forums\n`,start`: Link to the starter request thread\n`,mart`: Link to the Pokémart thread\n`,berry`: Link to the Berry Store thread\n`,calc`: Link to the reffing calculator\n`,info`: Link to the Infohub\n`,bmgarchive`: Link to the archives of the BMG URPG section.\n`,pxrarchive`: Link to the archives of the PXR URPG section.\n`,refund`: Link to the Refund Thread.\n`,gen8` or `,galar`: Link to the Generation 8 Public Changelog.\n`,nukem`, `,refpedia`, `,gym`: Links to respective Infohub topics.\n`,updategym`: Link to Apply for or Update a Gym thread.\nIf you have any suggestions for other links I should have, please @ Ash K.");
        }
        else if (lowmessage.indexOf("random") != -1 || lowmessage.indexOf("weather") != -1 || lowmessage.indexOf("terrain") != -1) {
            message.channel.send("Send `,rules randomize` with any number of the following to fix certain conditions and randomize all other rules. Ones with a `-` specifically avoid that rule, while ones without specifically force that rule. For clauses, this means `-` turns the clause off.\nAccepted inputs: 2, 3, 4, 5, 6, -gsc, gsc, rse, -sm, sm, public, private, -open, open, full, box, preview, single, double, -triple, triple, -rotation, rotation, -items, items, -launcher, launcher, -sky, sky, -inverse, inverse, -slp, -sleep, slp, sleep, -frz, -freeze, frz, freeze, -ohko, ohko, -acc, acc, -eva, eva, -itemc, itemc, -species, species, -mega, mega, -z, zmove, -legend, legend, -weather, weather, sun, rain, sandstorm, hail, fog, -terrain, space\nSend `,weather` or `,terrain` and I will give you just a random weather or terrain, respectively. For `,weather`, you may add `-fog` and/or `-no` to exclude Fog and/or No Starting Weather, respectively.");
        }
        else if (lowmessage.indexOf("rule") != -1) {
            message.channel.send("Use `,rules RULESET` to bring up a specific ruleset:\ncasual: Typical ruleset for casual battles\nppr: Similar but Public Preview (for randoms)\nhidden: Similar but Private Preview\ncompetitive: More serious battle rules\ne4: Official rules for any Elite Four or Champion battle\nld: Official rules for any Legend Defender battle\nashrandoms: Ash's preferred ruleset for randoms\nfortree: Fortree Gym default rules\nashmockfire: Ash's rules for a mock Fire gym (treated as a normal battle for pay and such)\nashmockdragon: Same as above but for Dragon\nmaylee: Rules for the Maylee battle event\nffa: Typical FFA ruleset\nrandomize: Randomized rule set among legal rulesets. See `,help randomize` for more information on how to fix certain conditions.");
        }
        else if (lowmessage.indexOf("effective") != -1) {
            message.channel.send("Send `,effective POKÉMON` and I'll list the effectiveness of each type against POKÉMON!");
        }
        else if (lowmessage.indexOf("log") != -1) {
            message.channel.send("Send `,contestlog RANK ATTRIBUTE TYPE` and I'll generate a blank log for a contest matching those criteria. The parameters can be in any order.");
        }
        else if (lowmessage.indexOf("sr") != -1) {
            message.channel.send("Send `,sr POKÉMON` and I'll tell you how much damage Stealth Rock would do to POKÉMON! Note that this will **not** be rounded to accurately reflect exact HP values.");
        }
        else if (lowmessage.indexOf("hp") != -1) {
            message.channel.send("Send `,hp POKÉMON` and I'll suggest Hidden Power type(s) for POKÉMON. Note that it is form-sensitive for Pokémon like Pikachu or Rotom that have different movesets in different forms and is not a complete list.");
        }
        else if (lowmessage.indexOf("clause") != -1) {
            message.channel.send("Send `,clause RULE1 RULE2 RULE3...` and I'll tell you what each of those rules do here in URPG! Rules can be in any order and some common nicknames (like `frz`) are accepted.");
        }
        else if (lowmessage.indexOf("convert") != -1) {
            message.channel.send("Send `,converthp BASEHP` to convert BASEHP to URPG HP.\nSend `,convertother BASESTAT` to convert BASESTAT to the URPG non-HP equivalent.\nSend `,convert BASEHP/BASEATT/BASEDEF/BASESPATT/BASESPDEF/BASESPEED` to convert the full stat spread to URPG stats.  Must use `/` or `.` between each number. Do not include anything after the listed commands.");
        }
        else if (lowmessage.indexOf("magic") != -1 || lowmessage.indexOf("mtg") != -1) {
            message.channel.send("In <#401543302710689793>, via DM, or in any message starting with `,mtg`, I will attempt to parse cards.  [[CARDNAME|SETCODE]] will give an image of CARDNAME from SETCODE and [[CARDNAME|SETCODE|NUMBER]] will give an embed with CARDNAME #NUMBER in SETCODE.  For both of these, the parameters must be exact (though the latter isn't case sensitive).  Multiple cards in the same message should all be parsed.")
        }
        else if (lowmessage.indexOf("avatar") != -1) {
            message.channel.send("Send `,avatar @PERSON` to get PERSON's avatar URL, `,avatar ID` to get the avatar URL of the person with ID (must be in this server), or just `,avatar` to get your own.");
        }
        else {
            message.channel.send("**Informational commands:**\n`,stats`: Stats links for any number of URPG members.\n`,rank`: How to acquire Pokémon in URPG.\n`,rse`, `,dppt`, and `,oras`: Contest information for moves.\n`,clause`: Info on a particular battle rule.\n`,effective`: Effectiveness of each type against a given gen 1-7 Pokémon.\n`,coverage type1 type2...`: Number of recognized Pokémon/forms hit at each effecitveness by the given types.\n`,beatup PKMN` or `,beatup STAT`: I will tell you the BP of a Beat Up from a gen 1-7 Pokémon or by its URPG Attack stat!\n`,sr`: Damage from Stealth Rock to a given Pokémon (not rounded).\n`,contestlog`: Outputs a template for a judge log of the given type, rank, and attribute.\n`,hp`: Recommended Hidden Power type for a given Pokémon.\n`,wildcard`: List of all allowed wildcards, or `,wildcard TYPE` for only TYPE's wildcards.\nSee `,help COMMAND` for more detailed information on any specific COMMAND.\n\n**For other commands, please see the following:**\n`,help link`; `,help convert`; `,help mention`; `,help profession`; `,help restricted`; `,help magic`; `,help avatar`\n\n**Other functions:**\nSend me a direct message beginning with `noreply:` and I'll relay your feedback anonymously to staff.\nSend me a direct message beginning with `reply:` and I'll send your feedback to staff along with a way for them to respond (but no way to find who sent the message directly).\nI keep records of members leaving the server, majorly edited messages, deleted messages, and messages with potential offensive content.\nI add <:ffa_gg:246070314163896320> to applicable messages in FFA chats!\nI bump our server with Discord Center and remind you to bump it with DISBOARD!\nIf you have any suggestions for new or improved fucntions, please @ Ash K. If you're curious, you can see my full code pinned in <#420675341036814337>.");
        }
    }
}

function ffaGG(message) {
    if ((message.channel.id == "136222872371855360" || message.channel.id == "269634154101080065") && lowmessage.indexOf("and") != -1 && lowmessage.substring(lowmessage.indexOf("and")).indexOf("out") != -1) {
        message.react(message.guild.emojis.get("246070314163896320"));
    }
}

function role(message, messageAuthor) {
    if (lowmessage.indexOf(",role") == 0 || lowmessage.indexOf(",spoiler") == 0 || lowmessage == ",ffa" || lowmessage.indexOf(",s ") == 0 || lowmessage.indexOf(",otherspoiler") == 0) {
        if ((lowmessage.indexOf(",s ") == 0 || lowmessage.indexOf("spoiler") != -1) && (lowmessage.indexOf("pkmn") != -1 || lowmessage.indexOf("pokemon") != -1 || lowmessage.indexOf("pokémon") != -1)) {
            if (messageAuthor.roles.has("440004078219558912")) {
                messageAuthor.removeRole(message.guild.roles.get("440004078219558912"));
                message.channel.send("Pokémon spoilers role removed!")
            }
            else {
                messageAuthor.addRole(message.guild.roles.get("440004078219558912"));
                message.channel.send("Pokémon spoilers role added!")
            }
        }
        else if ((lowmessage.indexOf(",s ") == 0 || lowmessage.indexOf("spoiler") != -1) && lowmessage.indexOf("other") != -1) {
            if (messageAuthor.roles.has("597313962798874626")) {
                messageAuthor.removeRole(message.guild.roles.get("597313962798874626"));
                message.channel.send("Other spoilers role removed!")
            }
            else {
                messageAuthor.addRole(message.guild.roles.get("597313962798874626"));
                message.channel.send("Other spoilers role added!")
            }
        }
        else if (lowmessage.indexOf("spoiler") != -1 || lowmessage.indexOf(",s ") == 0) {
            message.channel.send("Please specify if you would like spoilers for the next Pokémon game (`,spoiler pokemon`) or for the current other topic (`,spoiler other`)");
        }
        else if (lowmessage.indexOf(",role coordinator") == 0) {
            if (messageAuthor.roles.has("552232839861633046")) {
                messageAuthor.removeRole(message.guild.roles.get("552232839861633046"));
                message.channel.send("Coordinator role removed!");
            }
            else {
                messageAuthor.addRole(message.guild.roles.get("552232839861633046"));
                message.channel.send("Coordinator role added!");
            }
        }
        else if (lowmessage.indexOf(",role forumffa") == 0) {
            if (messageAuthor.roles.has("507342482988859402")) {
                messageAuthor.removeRole(message.guild.roles.get("507342482988859402"));
                message.channel.send("Forum FFA role removed!");
            }
            else {
                messageAuthor.addRole(message.guild.roles.get("507342482988859402"));
                message.channel.send("Forum FFA role added!");
            }
        }
        else if (lowmessage.indexOf(",role ffa") == 0 || lowmessage == ",ffa") {
            if (messageAuthor.roles.has("575087931824275466")) {
                messageAuthor.removeRole(message.guild.roles.get("575087931824275466"));
                message.channel.send("FFA role removed!");
            }
            else {
                messageAuthor.addRole(message.guild.roles.get("575087931824275466"));
                message.channel.send("FFA role added!");
            }
        }
        else {
            message.channel.send("I'm afraid either that role doesn't exist or you can't assign it to yourself.  The current self-assignable roles are `pokemon spoiler` (access to <#440004235635982336>), `other spoiler` (access <#597314223483387905>), `ffa` (being pinged for Discord FFAs), `coordinator` (being pinged for contests looking for players), and `forumffa` (being pinged for Forum FFAs starting or turns being posted).")}
    }
}

async function memberRole(message, messageAuthor) {
    if (lowmessage.indexOf(",member") == 0 && (messageAuthor.roles.has("135868852092403713") || messageAuthor.roles.has("244600394733322242") || messageAuthor.roles.has("457003662217052163"))) {
        if (message.mentions.users.size != 0) {
            let newMember = await message.guild.fetchMember(message.mentions.users.first().id)
            await newMember.addRole(message.guild.roles.get("456993685679243286"));
            await message.channel.send("Member role applied!");
        }
        else { message.channel.send("Please include a mention for the person you would like to give the member role to.")}
    }
}

function magicCardFetcher(message) {
    if ((message.channel.id == "401543302710689793" || message.guild === null || lowmessage.indexOf(",mtg") == 0) && (lowmessage.indexOf("[[") != -1 && lowmessage.lastIndexOf("]]") != -1 && lowmessage.indexOf("|") != -1)) {
        magicCardPoster(message.cleanContent, message.channel);
    }
}

function magicCardPoster(input, channel) {
    var request = input.replace(/\[\[/g, "🦌🦌").replace(/\|/g, "🦌🦌").replace(/]]/g, "🦌🦌");
    if (request.split("🦌🦌").length < 2) {return;}
    var cardName = request.split("🦌🦌")[1];
    var cardSet = request.split("🦌🦌")[2];
    var fetched = false;
    if (cardSet.length > 5 || cardSet.length < 2) {return;}
    if (request.split("🦌🦌")[3].length > 0 && !isNaN(request.split("🦌🦌")[3]) && request.split("🦌🦌")[3].indexOf(" ") == -1) {
        var cardNumber = request.split("🦌🦌")[3];
        cardName = cardName.replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-");
        channel.send("https://scryfall.com/card/" + cardSet.toLowerCase() +"/" + cardNumber + "/" + cardName.toLowerCase() + "?utm_source=discord");
        fetched = true;
    }
    if (cardName == "Mine, Mine, Mine" || cardName == "Incoming" || cardName == "Kill! Destroy") {cardName += "!";}
    cardName = cardName.replace(/ /g, "%2B").replace(/,/g, "%252C").replace(/\./, "%252E").replace(/û/g, "u").replace(/\'/g, "%2527").replace(/`/g, "%2527").replace(/®/g, "%25C2%25AE").replace(/:registered:/g, "%25C2%25AE").replace(/&/g, "%2526").replace(/"/g, "%2522").replace(/!/g, "%2521").replace(/\?/g, "%253F");
    if (!fetched) { channel.send("https://cdn1.mtggoldfish.com/images/gf/" + cardName + "%2B%255B" + cardSet.toUpperCase() + "%255D.jpg"); }
    if (input.indexOf("]]") != input.lastIndexOf("]]")) { magicCardPoster(input.substring(input.indexOf("]]") + 2), channel); } 
}

function tempChannelReporter(message, messageAuthor) {
    if (message.channel.parentID == contestBossCategory && message.channel.id != contestBossChannel && message.channel.id != warRoomChannel) {
        if (message.channel.name.indexOf("war") != -1) {
            bot.channels.get(warRoomChannel).send(messageAuthor.displayName + ": " + message.cleanContent);
        }
        if (message.channel.name.indexOf("boss") != -1) {
            bot.channels.get(contestBossChannel).send(messageAuthor.displayName + ": " + message.cleanContent);
        }
        if (message.content.indexOf(",end") == 0 && messageAuthor.roles.has(deathEaterRole)) {message.channel.delete();}
    }
    if (message.channel.name == "judge-test") {
        bot.channels.get(judgeTestChannel).send(messageAuthor.displayName + ": " + message.cleanContent);
        if (message.content.indexOf(",end") == 0 && messageAuthor.roles.has(chiefJudgeRole)) {message.channel.delete();}
    }
    if (message.channel.name == "ref-test") {
        bot.channels.get(refTestChannel).send(messageAuthor.displayName + ": " + message.cleanContent);
        if (message.content.indexOf(",end") == 0 && messageAuthor.roles.has(seniorRefRole)) {message.channel.delete();}
    }
    if (message.channel.name == "ranger-test") {
        bot.channels.get(rangerTestChannel).send(messageAuthor.displayName + ": " + message.cleanContent);
        if (message.content.indexOf(",end") == 0 && messageAuthor.roles.has(eliteRangerRole)) {message.channel.delete();}
    }
}

function statConverter(message) {
    if (lowmessage.indexOf(",convert") == 0) {
        lowmessage = lowmessage.replace(/\./g, "/");
        if (lowmessage.indexOf(",converthp") == 0 && !isNaN(lowmessage.substring(10))) {
            var urpghp = lowmessage.substring(10) * 2 + 204;
            message.channel.send(lowmessage.substring(10) + " base HP would be " + urpghp + " URPG HP!");
        }
        else if (lowmessage.indexOf(",convertother") == 0 && !isNaN(lowmessage.substring(13))) {
            var urpgstat = lowmessage.substring(13) * 2 + 99;
            message.channel.send(lowmessage.substring(13) + " base non-HP stat would be " + urpgstat + " URPG stat!");
        }
        else if (!isNaN(lowmessage.substring(9).split("/")[0]) && !isNaN(lowmessage.substring(9).split("/")[1]) && !isNaN(lowmessage.substring(9).split("/")[2]) && !isNaN(lowmessage.substring(9).split("/")[3]) && !isNaN(lowmessage.substring(9).split("/")[4]) && !isNaN(lowmessage.substring(9).split("/")[5])) {
            var urpghp = lowmessage.substring(9).split("/")[0] * 2 + 204;
            var urpgatt = lowmessage.substring(9).split("/")[1] * 2 + 99;
            var urpgdef = lowmessage.substring(9).split("/")[2] * 2 + 99;
            var urpgspatt = lowmessage.substring(9).split("/")[3] * 2 + 99;
            var urpgspdef = lowmessage.substring(9).split("/")[4] * 2 + 99;
            var urpgspeed = lowmessage.substring(9).split("/")[5] * 2 + 99;
            message.channel.send("That would be URPG stats of " + urpghp + "/" + urpgatt + "/" + urpgdef + "/" + urpgspatt + "/" + urpgspdef + "/" + urpgspeed + "!");
        }
        else { message.channel.send("Formatting not recognized, please try one of the following.\nSend `,converthp BASEHP` to convert BASEHP to URPG HP.\nSend `,convertother BASESTAT` to convert BASESTAT to the URPG non-HP equivalent.\nSend `,convert BASEHP/BASEATT/BASEDEF/BASESPATT/BASESPDEF/BASESPEED` to convert the full stat spread to URPG stats.  Must use `/` or `.` between each number. Do not include anything after the listed commands.")}            
    }
}

async function mention(message, messageAuthor) {
    if ((lowmessage.indexOf(",mentionrefs") == 0 || lowmessage.indexOf(",mention refs") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has(seniorRefRole))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get(refRole).setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get(refRole)}${message.content.substring(12)}`);
        await bot.guilds.get(urpgServer).roles.get(refRole).setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionjudges") == 0 || lowmessage.indexOf(",mention judges") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has(chiefJudgeRole))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get(judgeRole).setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get(judgeRole)}${message.content.substring(14)}`);
        await bot.guilds.get(urpgServer).roles.get(judgeRole).setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentioncurators") == 0 || lowmessage.indexOf(",mention curators") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has("419775555488186369"))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("312119111750647809").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("312119111750647809")}${message.content.substring(16)}`);
        await bot.guilds.get(urpgServer).roles.get("312119111750647809").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentiongraders") == 0 || lowmessage.indexOf(",mention graders") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has("419636334982987777"))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("312118803616235523").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("312118803616235523")}${message.content.substring(15)}`);
        await bot.guilds.get(urpgServer).roles.get("312118803616235523").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionrangers") == 0 || lowmessage.indexOf(",mention rangers") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has(eliteRangerRole))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("312119050484449280").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("312119050484449280")}${message.content.substring(15)}`);
        await bot.guilds.get(urpgServer).roles.get("312119050484449280").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionarbiters") == 0 || lowmessage.indexOf(",mention arbiters") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has("533356631455694849"))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("533356018005180416").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("533356018005180416")}${message.content.substring(16)}`);
        await bot.guilds.get(urpgServer).roles.get("533356018005180416").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionforumffa") == 0 || lowmessage.indexOf(",mention forumffa") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has("507342993028808707"))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("507342482988859402").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("507342482988859402")}${message.content.substring(16)}`);
        await bot.guilds.get(urpgServer).roles.get("507342482988859402").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionmembers") == 0 || lowmessage.indexOf(",mention members") == 0) && messageAuthor.hasPermission("MENTION_EVERYONE")) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("456993685679243286").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("456993685679243286")}${message.content.substring(15)}`);
        await bot.guilds.get(urpgServer).roles.get("456993685679243286").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentioncoordinators") == 0 || lowmessage.indexOf(",mention coordinators") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has(judgeRole))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("552232839861633046").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("552232839861633046")}${message.content.substring(20)}`);
        await bot.guilds.get(urpgServer).roles.get("552232839861633046").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionleaders") == 0 || lowmessage.indexOf(",mention leaders") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has(seniorRefRole))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("444947885893746698").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("444947885893746698")}${message.content.substring(15)}`);
        await bot.guilds.get(urpgServer).roles.get("444947885893746698").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionelites") == 0 || lowmessage.indexOf(",mention elites") == 0) && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has(seniorRefRole))) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("444947868835381263").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("444947868835381263")}${message.content.substring(14)}`);
        await bot.guilds.get(urpgServer).roles.get("444947868835381263").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionffa") == 0 || lowmessage.indexOf("!ffa -p") == 0 || lowmessage.indexOf(",mention ffa") == 0) && (message.channel.id == "136222872371855360" || message.channel.id == "269634154101080065" || message.channel.id == "653328600170364953") && (messageAuthor.hasPermission("MENTION_EVERYONE") || messageAuthor.roles.has(refRole))) {
        var theMessage = "";
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        if (lowmessage.indexOf(",mentionffa") == 0) { theMessage = message.content.substring(11); }
        else { theMessage = message.content.substring(7); }
        await bot.guilds.get(urpgServer).roles.get("575087931824275466").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("575087931824275466")}${theMessage}`);
        await bot.guilds.get(urpgServer).roles.get("575087931824275466").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionstaff") == 0 || lowmessage.indexOf(",mention staff") == 0) && messageAuthor.roles.has("456993685679243286")) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        await bot.guilds.get(urpgServer).roles.get("135868852092403713").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("135868852092403713")}${message.content.substring(13)}`);
        await bot.guilds.get(urpgServer).roles.get("135868852092403713").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentioncontentupkeep") == 0 || lowmessage.indexOf(",mention contentupkeep") == 0 || lowmessage.indexOf(",mention content upkeep") == 0 || lowmessage.indexOf(",mention content-upkeeper") == 0) && messageAuthor.roles.has("456993685679243286")) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        if (lowmessage.indexOf(",mentioncontent upkeep") != -1) { lowmessage.replace(/,mentioncontent upkeep/, ",mentioncontentupkeep"); }
        if (lowmessage.indexOf(",mentioncontent-upkeep") != -1) { lowmessage.replace(/,mentioncontent-upkeep/, ",mentioncontentupkeep"); }
        if (lowmessage.indexOf(",mentioncontentupkeeper") != -1) { lowmessage.replace(/,mentioncontentupkeeper/, ",mentioncontentupkeep"); }
        await bot.guilds.get(urpgServer).roles.get("584764993044611075").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("584764993044611075")}${message.content.substring(21)}`);
        await bot.guilds.get(urpgServer).roles.get("584764993044611075").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentiongamedesign") == 0 || lowmessage.indexOf(",mention gamedesign") == 0 || lowmessage.indexOf(",mention game design") == 0 || lowmessage.indexOf(",mention game-design") == 0) && messageAuthor.roles.has("456993685679243286")) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        if (lowmessage.indexOf(",mentiongame design") != -1) { lowmessage.replace(/,mentiongame design/, ",mentiongamedesign"); }
        if (lowmessage.indexOf(",mentiongame-design") != -1) { lowmessage.replace(/,mentiongame-design/, ",mentiongamedesign"); }
        if (lowmessage.indexOf(",mentiongamedesigner") != -1) { lowmessage.replace(/,mentiongamedesigner/, ",mentiongamedesign"); }
        await bot.guilds.get(urpgServer).roles.get("584765105414078464").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("584765105414078464")}${message.content.substring(18)}`);
        await bot.guilds.get(urpgServer).roles.get("584765105414078464").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionevent") == 0 || lowmessage.indexOf(",mention event") == 0) && messageAuthor.roles.has("456993685679243286")) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        if (lowmessage.indexOf(",mentionevent coordinator") != -1) { lowmessage.replace(/,mentionevent coordinator/, ",mentionevent"); }
        if (lowmessage.indexOf(",mentionevent-coordinator") != -1) { lowmessage.replace(/,mentionevent-coordinator/, ",mentionevent"); }
        if (lowmessage.indexOf(",mentionevents") != -1) { lowmessage.replace(/,mentionevents/, ",mentionevent"); }
        await bot.guilds.get(urpgServer).roles.get("584764766921293825").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("584764766921293825")}${message.content.substring(14)}`);
        await bot.guilds.get(urpgServer).roles.get("584764766921293825").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentiontechnicalteam") == 0 || lowmessage.indexOf(",mention technicalteam") == 0 || lowmessage.indexOf(",mention technical team") == 0 || lowmessage.indexOf(",mention technical-team") == 0) && messageAuthor.roles.has("456993685679243286")) {
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(/,mention /, ",mention"); }
        if (lowmessage.indexOf(",mentiontechnical team") != -1) { lowmessage.replace(/,mentiontechnical team/, ",mentiontechnicalteam"); }
        if (lowmessage.indexOf(",mentiontechnical-team") != -1) { lowmessage.replace(/,mentiontechnical-team/, ",mentiontechnicalteam"); }
        await bot.guilds.get(urpgServer).roles.get("584764766921293825").setMentionable(true);
        await message.channel.send(`${bot.guilds.get(urpgServer).roles.get("584764766921293825")}${message.content.substring(21)}`);
        await bot.guilds.get(urpgServer).roles.get("584764766921293825").setMentionable(false);
    }
}

async function archiver(message, messageAuthor) {
    if ((lowmessage == ",archive public" || lowmessage == ",publicarchive") && (messageAuthor.hasPermission("MANAGE_CHANNELS") || messageAuthor.roles.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.get(urpgServer).channels.get("432291722492379136"));
        await message.channel.replacePermissionOverwrites({
            overwrites: [
                {
                    id: message.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135868852092403713",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
    else if ((lowmessage == ",archive" || lowmessage == ",private archive" || lowmessage == ",archive private") && (messageAuthor.hasPermission("MANAGE_CHANNELS") || messageAuthor.roles.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.get(urpgServer).channels.get("432291722492379136"));
        await message.channel.replacePermissionOverwrites({
            overwrites: [
                {
                    id: message.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135868852092403713",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
}

async function contestBoss(message, messageAuthor) {
    if (lowmessage.indexOf(",contestboss") == 0 && messageAuthor.roles.has(deathEaterRole)) {
        var bossroom = await message.guild.createChannel("contest-boss", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await bossroom.setParent(contestBossCategory);
        await bossroom.overwritePermissions(deathEaterRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        var warroom = await message.guild.createChannel("war-room", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await warroom.setParent(contestBossCategory);
        await warroom.overwritePermissions(deathEaterRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
    }
}

async function judgeTest(message, messageAuthor) {
    if (lowmessage.indexOf(",judgetest") == 0 && messageAuthor.roles.has(chiefJudgeRole)) {
        var testroom = await message.guild.createChannel("judge-test", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await testroom.setParent("376809774282571779");
        await testroom.overwritePermissions(chiefJudgeRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.users.size != 0) {
            await testroom.overwritePermissions(message.mentions.users.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
}

async function refTest(message, messageAuthor) {
    if (lowmessage.indexOf(",reftest") == 0 && messageAuthor.roles.has(seniorRefRole)) {
        var testroom = await message.guild.createChannel("ref-test", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await testroom.setParent("376809774282571779");
        await testroom.overwritePermissions(seniorRefRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.users.size != 0) {
            await testroom.overwritePermissions(message.mentions.users.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
}

async function rangerTest(message, messageAuthor) {
    if (lowmessage.indexOf(",rangertest") == 0 && messageAuthor.roles.has(eliteRangerRole)) {
        var testroom = await message.guild.createChannel("ranger-test", 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }])
        await testroom.setParent("376809774282571779");
        await testroom.overwritePermissions(eliteRangerRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.users.size != 0) {
            await testroom.overwritePermissions(message.mentions.users.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
}

async function newDiscussion(message) {
    if (message.channel.id == staffChannel && lowmessage.indexOf(",newdiscussion") == 0) {
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
}

async function newProject(message) {
    if (message.channel.parentID == "443857882937819146" && lowmessage.indexOf(",newproject") == 0) {
        var newChannel = await message.guild.createChannel(message.content.split(" ")[1], 'text', [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL']
        }]);
        await newChannel.setParent("443857882937819146");
        await newChannel.overwritePermissions(message.author.id, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        await newChannel.overwritePermissions("135868852092403713", {
            VIEW_CHANNEL: true
        })
        await message.channel.send("Channel <#" + newChannel.id + "> successfully created!");
    }
}

async function fixOrder(channel, messageAuthor) {
    if (lowmessage.indexOf(",fixorder") == 0 && (messageAuthor.roles.has("584764993044611075") || messageAuthor.hasPermission("MANAGE_CHANNELS"))) {
        await bot.channels.get(judgeTestChannel).setPosition(1);//judgingtest
        await bot.channels.get(judgingChiefsChannel).setPosition(1);//judgingchiefs
        await bot.channels.get("293899148112035840").setPosition(1);//judgingyou
        await bot.channels.get("533356212377354260").setPosition(1);//arbiters
        await bot.channels.get(rangerTestChannel).setPosition(1);//rangertest
        await bot.channels.get("651141055236014090").setPosition(1);//privaterolling2
        await bot.channels.get("563508268820070400").setPosition(1);//privaterolling1
        await bot.channels.get(eliteRangersChannel).setPosition(1);//eliterangers
        await bot.channels.get("136694015285264384").setPosition(1);//rangers
        await bot.channels.get(refTestChannel).setPosition(1);//reftest
        await bot.channels.get("652208449555267591").setPosition(1);//SwSh
        await bot.channels.get("652207797848637453").setPosition(1);//dynamax
        await bot.channels.get(seniorRefChannel).setPosition(1);//seniorref
        await bot.channels.get("322151372453838848").setPosition(1);//refs
        await bot.channels.get("406933479062765571").setPosition(1);//techteam
        if (channel != null) { await channel.send("Reordering complete!"); }
    }
}

async function pkmnSpoilerSeason(message, messageAuthor) {
    if ((lowmessage.indexOf(",pkmnspoilerseason ") == 0 || lowmessage.indexOf(",spoilerseasonpkmn ") == 0) && (messageAuthor.roles.has("584764993044611075") || messageAuthor.hasPermission("MANAGE_CHANNELS"))) {
        await message.guild.fetchMembers();
        var spoilers = await bot.guilds.get(urpgServer).roles.get("440004078219558912").members.array();
        for (i = 0; i < spoilers.size; i++) {
            await spoilers[i].removeRole(message.guild.roles.get("440004078219558912"));
        }
        await bot.channels.get("440004235635982336").setName("spoilers-" + message.cleanContent.split(" ")[1]);
        await message.channel.send ("Pokémon spoiler season now set to <#440004235635982336>.");
    }
}

async function otherSpoilerSeason(message, messageAuthor) {
    if ((lowmessage.indexOf(",otherspoilerseason ") == 0 || lowmessage.indexOf(",spoilerseasonother ") == 0) && (messageAuthor.roles.has("584764993044611075") || messageAuthor.hasPermission("MANAGE_CHANNELS"))) {
        await message.guild.fetchMembers();
        var spoilers = await bot.guilds.get(urpgServer).roles.get("597313962798874626").members.array();
        for (i = 0; i < spoilers.size; i++) {
            await spoilers[i].removeRole(message.guild.roles.get("597313962798874626"));
        }
        await bot.channels.get("597314223483387905").setName("spoilers-" + message.cleanContent.split(" ")[1]);
        await message.channel.send ("Other spoiler season now set to <#597314223483387905>.");
    }
}

async function anonymousReply(message) {
    if ((message.channel.id == staffChannel || message.channel.parentID == "443857882937819146") && message.content.indexOf(",anonreply") == 0) {
        const anonToReplyTo = message.content.split(" ");
        const dm = await message.client.rest.makeRequest("get", Endpoints.Channel(anonToReplyTo[1]), true);
        const dmChannel = await message.client.rest.methods.createDM(dm.recipients[0]);
        dmChannel.send(message.content.split(",anonreply " + anonToReplyTo[1] + " ")[1]);
        message.channel.send("Your reply has been sent!");
    }
}

async function disboardTimer(message) {
    if (message.author.id == "302050872383242240" && message.embeds[0].description.toLowerCase().indexOf("bump done") != -1) {
        clearTimeout(disBumpTime);
        disBumpTime = setTimeout(function() {
            bumpNotification();
        }, 7200000);
    }
    if (message.author.id == "302050872383242240" && message.embeds[0].description.toLowerCase().indexOf("please wait another") != -1) {
        var disTime = message.embeds[0].description.toLowerCase().slice(message.embeds[0].description.toLowerCase().indexOf("please wait another")).split(" ")[3];
        clearTimeout(disBumpTime);
        disBumpTime = setTimeout(function() {
            bumpNotification();
        }, 60000 * disTime);
    }
}

function wrongBot(message) {
    if (lowmessage.indexOf(",dex ") == 0 || lowmessage.indexOf(",d ") == 0 || lowmessage.indexOf(",move ") == 0 || lowmessage.indexOf(",item ") == 0 || lowmessage.indexOf(",role ") == 0 || lowmessage.indexOf(",ability ") == 0 || lowmessage.indexOf(",metronome") == 0 || lowmessage.indexOf(",eot") == 0 || lowmessage.indexOf(",veto") == 0 || lowmessage.indexOf(",speed") == 0 || lowmessage.indexOf(",ladder") == 0 || lowmessage.indexOf(",elo") == 0 || lowmessage.indexOf(",weight ") == 0) {
        message.channel.send("This command is handled by my colleague, <@574745413773426688>, who is more responsive to `!` than `,`.  See `!help` or `!help COMMAND` for more info.");
    }
}

async function substituteBot(channel) {
    kauri = await bot.fetchUser("574745413773426688");
    if ((kauri.presence.status == "offline" || channel.guild == null || channel.guild.id != urpgServer) && lowmessage.indexOf("!d ") == 0) {
        var dieToRoll = lowmessage.split(" ");
        var results = "<@574745413773426688> seems to be offline.  As your substitute dice roller, I decree you have rolled ";
        for (var x = 1; x < dieToRoll.length; x++) {
            dieToRoll[x] = dieToRoll[x].replace(/, /g, " ").replace(/,/g, "d");
            if (!isNaN(dieToRoll[x]) && dieToRoll[x] > 1) {
                var roll = Math.floor(Math.random() * dieToRoll[x]);
                results += "a " + roll + " on a d" + dieToRoll[x];
            }
            else if (dieToRoll[x].indexOf("d") != -1 && !isNaN(dieToRoll[x].split("d")[0]) && !isNaN(dieToRoll[x].split("d")[1])) {
                for (var y = 0; y < dieToRoll[x].split("d")[0]; y++) {
                    var roll = Math.floor(Math.random() * dieToRoll[x].split("d")[1]);
                    results += roll
                    if (y < dieToRoll[x].split("d")[0] -1) {results += ", ";}
                }
                results += " on " + dieToRoll[x].split("d")[0] + "d" + dieToRoll[x].split("d")[1];
            }
            if (x < dieToRoll.length - 1) {results += " and ";}
        }
        channel.send(results);
    }
}

async function pinMessage(message, messageAuthor) {
    if ((lowmessage.indexOf(",pin") == 0 && !isNaN(lowmessage.split(" ")[1])) && ((message.channel.parentID == "358430499146039299" && messageAuthor.roles.has(refRole)) || (message.channel.parentID == "358433546492444675" && messageAuthor.roles.has(judgeRole)))) {
        theMessage = await message.channel.fetchMessage(lowmessage.split(" ")[1]);
        await theMessage.pin();
    }
}

async function unpinMessage(message, messageAuthor) {
    if ((lowmessage.indexOf(",unpin") == 0 && !isNaN(lowmessage.split(" ")[1])) && ((message.channel.parentID == "358430499146039299" && messageAuthor.roles.has(refRole)) || (message.channel.parentID == "358433546492444675" && messageAuthor.roles.has(judgeRole)))) {
        theMessage = await message.channel.fetchMessage(lowmessage.split(" ")[1]);
        await theMessage.unpin();
    }
}

async function deleteReporter(message) {
    if (message.guild === null) {return;}
    if (!message.guild.available) {return;}
    if (message.guild.id != urpgServer) {return;}
    if (message.author.id == "461133571034316810") {return;}
    var channelToNotify = logsChannel;
    if (message.channel.id == logsChannel && message.author.id == "531429270451519490") {
        await message.channel.send("One of my logs was deleted from here.");
        return;
    }
    if (message.channel.id == refTestChannel) {channelToNotify = seniorRefChannel;}
    if (message.channel.id == judgeTestChannel) {channelToNotify = judgingChiefsChannel;}
    if (message.channel.id == rangerTestChannel) {channelToNotify = eliteRangersChannel;}
    if (message.channel.id == botsChannel) {channelToNotify = botsChannel;}
    if (message.channel.id == seniorRefChannel) {channelToNotify = seniorRefChannel;}
    if (message.channel.id == judgingChiefsChannel) {channelToNotify = judgingChiefsChannel;}
    if (message.channel.id == eliteRangersChannel) {channelToNotify = eliteRangersChannel;}
    if (message.channel.id == botCommands && message.cleanContent.indexOf("p!") == 0) {return;}
    if (message.channel.name == "judge-test") {channelToNotify = judgeTestChannel;}
    if (message.channel.name == "ref-test") {channelToNotify = refTestChannel;}
    if (message.channel.name == "ranger-test") {channelToNotify = rangerTestChannel;}
    if (message.channel.parentID == contestBossCategory && message.channel.id != contestBossChannel && message.channel.id != warRoomChannel) {
        if (message.channel.name.indexOf("war") != -1) {
            channelToNotify = warRoomChannel;
        }
        if (message.channel.name.indexOf("boss") != -1) {
            channelToNotify = contestBossChannel;
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
    deleteLog += " (id ";
    deleteLog += message.author.id;
    deleteLog += ")";
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
    bot.channels.get(channelToNotify).send(deleteLog);
}

async function avatar(message) {
    if (lowmessage.indexOf(",avatar") == 0) {
        if (message.mentions.users.size != 0) {
            message.channel.send(message.mentions.users.first().displayAvatarURL);
        }
        else if (!isNaN(lowmessage.split(" ")[1])) { 
            var target = await bot.fetchUser(lowmessage.split(" ")[1]);
            await message.channel.send(target.displayAvatarURL);
        }
        else {
            message.channel.send(message.author.displayAvatarURL);
        }
    }
}

async function sleepTalk(message) {
    if (lowmessage.indexOf(",sleeptalk ") == 0) {
        var initialList = "🙉" + message.cleanContent.substring(11).replace(/\n/g, "🙉").replace(/\r/g, "🙉").replace(/, /g, "🙉").replace(/,/g, "🙉").replace(/TMs: /g, "🙉").replace(/HMs: /g, "🙉").replace(/BMs: /g, "🙉").replace(/MTs: /g, "🙉").replace(/SMs: /g, "🙉").replace(/Normal Moves: /g, "");
        var numberedList = initialList;
        var x = 1;
        while (numberedList.indexOf("🙉") != -1) {
            numberedList.replace(/🙉/, x + ". ");
            x++;
        }
        var roll = Math.floor(Math.random() * (x - 1));
        await message.channel.send(numberedList);
        await message.channel.send("There is your numbered list, and if you would like a roll I rolled a " + roll + " on a d" + (x - 1) + ", which by my count is " + initialList.split("🙉")[roll] + "!");
    }
}

bot.on('error', console.error);

bot.on("message", async function(message) {
    lowmessage = message.content.toLowerCase();

    await disboardTimer(message);

    await stats(message);

    await rse(message);

    await dppt(message);

    await oras(message);

    await rank(message);

    await ruleset(message);

    await contestLog(message);

    await hiddenPower(message);

    await stealthRock(message);

    await effectiveness(message);

    await coverage(message);

    await beatUp(message);

    await clauses(message);

    await links(message);

    await wildcards(message);

    await fairyGIF(message);

    await help(message);

    await ffaGG(message);

    await magicCardFetcher(message);

    await statConverter(message);

    await randWeather(message);

    await randTerrain(message);

    await wrongBot(message);

    await avatar(message);

    await substituteBot(message.channel);

    await sleepTalk(message);

    if (message.guild === null) {
    	
        await anonymousReport(message);

        return;
    }

    if (message.guild.id != urpgServer) {return;}

    let messageAuthor = await message.guild.fetchMember(message.author);

    await badWordsReporter(message, messageAuthor, false);

    await tempChannelReporter(message, messageAuthor);

    await mention(message, messageAuthor);

    await archiver(message, messageAuthor);

    await contestBoss(message, messageAuthor);

    await judgeTest(message, messageAuthor);

    await refTest(message, messageAuthor);

    await rangerTest(message, messageAuthor);

    await newDiscussion(message);

    await newProject(message);

    await fixOrder(message.channel, messageAuthor);

    await pkmnSpoilerSeason(message, messageAuthor);

    await otherSpoilerSeason(message, messageAuthor);

    await anonymousReply(message);

    await payDay(message, messageAuthor);

    await pinMessage(message, messageAuthor);

    await unpinMessage(message, messageAuthor);
})

bot.on("messageDelete", async function(message) {
    deleteReporter(message);
})

bot.on("messageDeleteBulk", async function(messages) {
    messages.forEach(async function(value, key) {
        await deleteReporter(value);
    });
})

bot.on("messageUpdate", async function(oldMessage, newMessage) {
    var channelToNotify = logsChannel;
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
        bot.channels.get(anonymousReportChannel).send(editLog);
        return;
    }
    if (oldMessage.guild === null) {return;}
    if (!oldMessage.guild.available) {return;}
    if (oldMessage.guild.id != urpgServer) {return;}
    if (oldMessage.author.bot) {return;}
    var temp = false;
    if (oldMessage.channel.name == "judge-test") {
        channelToNotify = judgeTestChannel;
        temp = true;
    }
    if (oldMessage.channel.name == "ref-test") {
        channelToNotify = refTestChannel;
        temp = true;
    }
    if (oldMessage.channel.name == "ranger-test") {
        channelToNotify = rangerTestChannel;
        temp = true;
    }
    if (newMessage.channel.parentID == contestBossCategory && newMessage.channel.id != contestBossChannel && newMessage.channel.id != warRoomChannel) {
        if (newMessage.channel.name.indexOf("war") != -1) {
            channelToNotify = warRoomChannel;
            temp = true;
        }
        if (newMessage.channel.name.indexOf("boss") != -1) {
            channelToNotify = contestBossChannel;
            temp = true;
        }
    }
    if (diff <= .8 || temp) {
    	if (newMessage.content.length > 5 || oldMessage.content.length > 5 || temp) {
    		if (oldMessage.channel.id == refTestChannel) {channelToNotify = seniorRefChannel;}
    		if (oldMessage.channel.id == judgeTestChannel) {channelToNotify = judgingChiefsChannel;}
    		if (oldMessage.channel.id == rangerTestChannel) {channelToNotify = eliteRangersChannel;}
    		if (oldMessage.channel.id == botsChannel) {channelToNotify = botsChannel;}
            if (oldMessage.channel.id == seniorRefChannel) {channelToNotify = seniorRefChannel;}
            if (oldMessage.channel.id == judgingChiefsChannel) {channelToNotify = judgingChiefsChannel;}
            if (oldMessage.channel.id == eliteRangersChannel) {channelToNotify = eliteRangersChannel;}
    		var deleteLog = ""
            if (temp) {
                deleteLog += await message.guild.fetchMember(message.author).displayName + "'s message saying \"" + newMessage.cleanContent + "\"";
            }
            else { deleteLog += newMessage.url; }
    		if (oldMessage.cleanContent != "") {
                deleteLog += await " used to say: ```" + oldMessage.cleanContent.replace(/```/g, "​`​`​`​") + "```";
            }
            else { deleteLog += await " was previously textless."; }
    		await bot.channels.get(channelToNotify).send(deleteLog);
    	}
    }
})

bot.on("guildMemberRemove", async function(member) {
    var leaveLog = "Member ";
    leaveLog += member.displayName;
    const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    const entry2 = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first())
    if (entry != null && (entry.target.id === member.id) && (entry.createdTimestamp > (Date.now() - 5000))) {
        leaveLog += " was banned by ";
        leaveLog += entry.executor.username;
    }
    else if (entry2 != null && (entry2.target.id === member.id) && (entry2.createdTimestamp > (Date.now() - 5000))) {
        leaveLog += " was kicked by ";
        leaveLog += entry.executor.username;
    }
    else {leaveLog += " has left."}
    bot.channels.get(logsChannel).send(leaveLog);
})

bot.login(process.env.token)
