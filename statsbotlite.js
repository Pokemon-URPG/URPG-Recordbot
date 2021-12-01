const Discord = require("discord.js")
const Intents = Discord.Intents;
const Permissions = Discord.Permissions;
const logger = require("winston")
const fs = require("fs")
const ss = require("string-similarity");
//const { Endpoints } = Discord.Constants;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
})
logger.level = "debug"
// Initialize Discord Bot
var bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES], partials: ['MESSAGE', 'CHANNEL', 'REACTION'], allowedMentions: { parse: ['users', 'roles'], repliedUser: true } });
var badWords = ["fag", "retard", "cuck", "slut", "kys"];
var hardFossils = ["Kabuto", "Omanyte", "Lileep", "Anorith", "Cranidos", "Shieldon", "Archen", "Tirtouga", "Tyrunt", "Amaura"]
var otherFossils = ["Dracozolt", "Dracovish", "Arctozolt", "Arctovish", "Spiritomb", "Aerodactyl"];
var allFossils = hardFossils.concat(otherFossils);
var ranks = ["Easiest", "Simple", "Medium", "Hard", "Complex", "Demanding", "Merciless", "Stupefying", "Tier2", "Tier1"];
var rankVal = [4000, 7500, 15000, 25000, 35000, 47500, 0, 0, 0, 0];
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
var spellbinderRole = "561688333609074730";
var anonymousReportChannel = "545737721612730368";
var payDayLog;
var pickUpLog;
var tempStats;
var tempLinks;
var remindLog;
var codeLog;
var refLog;
var contentLog;
var setCodes;
var useLog;
var theHours;
var theHoursE;

bot.on("ready", async function() {
    logger.info("Connected")
    logger.info("Logged in as: ")
    logger.info(bot.user.username + " - (" + bot.user.id + ")")
})

bot.once("ready", async function () {
    var d = new Date();
    var timer = 7210000 - (d.getTime() % 7210000);
    bumpTime = setTimeout(function() {
        bumpServer();
    }, timer);
    payDayLog = await bot.channels.cache.get(botCommands).messages.fetch("658883162000195607");
    pickUpLog = await bot.channels.cache.get(botCommands).messages.fetch("658884961603944478");
    tempStats = await bot.channels.cache.get("531433553225842700").messages.fetch("709808598443884655");
    tempLinks = await bot.channels.cache.get("531433553225842700").messages.fetch("737015754272014357");
    remindLog = await bot.channels.cache.get("531433553225842700").messages.fetch("711453291892047892");
    codeLog = await bot.channels.cache.get("531433553225842700").messages.fetch("711651825291624518");
    refLog = await bot.channels.cache.get(botCommands).messages.fetch("741525510886260787");
    contentLog = await bot.channels.cache.get(botCommands).messages.fetch("741525512014397440");
    setCodes = await bot.channels.cache.get("531433553225842700").messages.fetch("751124446701682708");
    useLog = await bot.channels.cache.get("531433553225842700").messages.fetch("694759255689134101");
    theHours = await bot.channels.cache.get("531433553225842700").messages.fetch("853348686603223051");
    theHoursE = await bot.channels.cache.get("531433553225842700").messages.fetch("853349147032813578");
    if (remindLog.content.indexOf("Reminders:") == -1) { remindLog.edit("Reminders:"); }
    if (codeLog.content.indexOf("To Do:\n") == -1) {
        bot.channels.cache.get("531433553225842700").send(codeLog.content);
        codeLog.edit("To Do:");
    }
    setTimeout(function () {
        payDayReset();
        pickUpReset();
    }, ((979200000) - (d.getTime() % 604800000)) % 604800000);
    /*setTimeout(function () {
        weirrrrrReminder();
    }, ((784800000) - (d.getTime() % 604800000)) % 604800000);
    setTimeout(function () {
        weirrrrrReminderJ();
    }, ((99200000) - (d.getTime() % 43200000)) % 43200000);*/
    //}, ((871200000) - (d.getTime() % 604800000)) % 604800000);
    setTimeout(function () {
        codeRemind();
    }, ((100800000) - (d.getTime() % 86400000)) % 86400000);
    setTimeout(function () {
        randomRotations();
    }, ((108000000) - (d.getTime() % 86400000)) % 86400000);
    setTimeout(function () {
        dailyQ();
    }, ((147600000) - (d.getTime() % 86400000)) % 86400000);
    await remindStartup();
    //bot.channels.cache.get(botCommands).send("I have arisen!  Please help me set my DISBOARD bump notification timer with a `!d bump`.");
    bot.channels.cache.get("531433553225842700").send("I have arisen!");
    /*disBumpTime = setTimeout(function() {
        bumpNotification();
    }, 7200000);*/
    var memberMe = await bot.guilds.cache.get(urpgServer).members.fetch(bot.user);
    lowmessage = ",fixorder";
    await fixOrder(null, memberMe);
    statusMessage();
})

function statusMessage() {
    var allpokes = fs.readFileSync('Pokemon.txt', 'utf8').split('\n');
    var movelist = fs.readFileSync("rse.txt", "utf8").split("\n");
    var pokemon = allpokes[1 + Math.floor(Math.random() * (allpokes.length - 1))].split(",")[0];
    var activityNum = Math.floor(Math.random() * 98);
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
        case 46: activity = " fighting Cipher"; break;
        case 47: activity = " in a dancing competition"; break;
        case 48: activity = " befriending " + allpokes[Math.floor(Math.random() * allpokes.length)].split(",")[0]; break;
        case 49: activity = " battling " + allpokes[Math.floor(Math.random() * allpokes.length)].split(",")[0]; break;
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
        case 60: activity = " planeswalking"; break;
        case 61: activity = " performing in a musical"; break;
        case 62: activity = " dynamaxing"; break;
        case 63: activity = " mixing Pokéblocks"; break;
        case 64: activity = " making curry"; break;
        case 65: activity = " shopping at Celadon Department Store"; break;
        case 66: activity = " shopping at Goldenrod Department Store"; break;
        case 67: activity = " shopping at Lilycove Department Store"; break;
        case 68: activity = " shopping at Veilstone Department Store"; break;
        case 69: activity = " shopping at Shopping Mall Nine"; break;
        case 70: activity = " cycling"; break;
        case 71: activity = " modeling"; break;
        case 72: activity = " reviving a " + allFossils[Math.floor(Math.random() * allFossils.length)]; break;
        case 73: activity = " digging in the Underground"; break;
        case 74: activity = " tagging with graffiti"; break;
        case 75: activity = " relaxing in a hot spring"; break;
        case 76: activity = " training in the daycare"; break;
        case 77: activity = " eating in a cafe"; break;
        case 78: activity = " at the hair salon"; break;
        case 79: activity = " casting Brainstorm"; break;
        case 80: activity = " riding Corviknight taxi"; break;
        case 81: activity = " riding a Mamoswine"; break;
        case 82: activity = " mining"; break;
        case 83: activity = " miming"; break;
        case 84: activity = " playing hide and seek"; break;
        case 85: activity = " soaring on a Latios"; break;
        case 86: activity = " soaring on a Latias"; break;
        case 87: activity = " exploring a dark cave"; break;
        case 88: activity = " solving an ice puzzle"; break;
        case 89: activity = " examining the mural in Stow on Side"; break;
        case 90: activity = " delving away for a Treasure Cruise"; break;
        case 91: activity = " spelunking"; break;
        case 92: activity = " tightrope walking"; break;
        case 93: activity = " sounding an airhorn"; break;
        case 94: activity = " looking for Mirage Island"; break;
        case 95: activity = " ambushing Wimpod"; break;
        case 96: activity = " trespassing"; break;
        case 97: activity = " cackling evilly"; break;
    }
    bot.channels.cache.get("669306624925499412").send("Watching " + pokemon + activity);
    bot.user.setActivity(pokemon + activity, { type: 'WATCHING'});
    setTimeout(function() {
        statusMessage();
    }, duration)
}

function remindStartup() {
    for (var x = 1; x < remindLog.content.split("\n").length; x++) {
        remindTimer(remindLog.content.split("\n")[x].split(" ")[0], remindLog.content.split("\n")[x].split(" ")[1]);
    }
}

async function remindTimer(channelId, messageId) {
    if (bot.channels.cache.has(channelId)) {
        var theMessage = await bot.channels.cache.get(channelId).messages.fetch(messageId);
        var d = new Date();
        var timeToRemind = theMessage.createdTimestamp + (60000 * theMessage.content.split(" ")[1]) - d;
        if (timeToRemind < 1) { timeToRemind = 1; }
        setTimeout(function() {
            reminder(channelId, messageId);
        }, timeToRemind)
    }
    else {
        let newRemindLog = remindLog.content.split("\n")[0];
        for (let x = 1; x < remindLog.content.split("\n").length; x++) {
            if (remindLog.content.split("\n")[x].split(" ")[0] != channelId) {
                newRemindLog += "\n" + remindLog.content.split("\n")[x];
            }
        }
        await remindLog.edit(newRemindLog);
        await remindLog.edit("Reminders:");
        remindLog = await bot.channels.cache.get("531433553225842700").messages.fetch("711453291892047892");
    }
}

function remindInput(message) {
    if (lowmessage.indexOf(",remindme") == 0 && !isNaN(lowmessage.split(" ")[1]) && lowmessage.split(" ")[1].length > 0) {
        if (lowmessage.split(" ")[1] > 10080 && message.author.id != "135999597947387904") {
            message.channel.send("Since I can only accept so many reminders at a time, I will not take such a long reminder.  Perhaps you should just put it in your phone's calendar instead.");
            return;
        }
        if (!message.guild) {
            message.channel.send("I'm afraid I am not currently able to accept DM reminders. Please try in a guild channel or set an alternate form of reminder.");
            return;
        }
        var newRemindLog = remindLog.content + "\n" + message.channel.id + " " + message.id;
        if (newRemindLog.length > 2000) {
            message.channel.send("I'm sorry, my log of reminders is full.  I will attempt to remind you but it is possible I will forget by then.");
        }
        else {
            remindLog.edit(newRemindLog);
            message.react("👍");
        }
        remindTimer(message.channel.id, message.id);
    }
}

async function reminder(channelId, messageId) {
    var theMessage = await bot.channels.cache.get(channelId).messages.fetch(messageId);
    var commandLength = theMessage.content.split(" ")[0].length + theMessage.content.split(" ")[1].length + 2;
    //bot.channels.cache.get(channelId).send("<@" + theMessage.author.id + "> " + theMessage.content.substring(commandLength));
    theMessage.reply(theMessage.content.substring(commandLength))
    var newLog = remindLog.content.split("\n")[0];
    for (var x = 1; x < remindLog.content.split("\n").length; x++) {
        if (remindLog.content.split("\n")[x].indexOf(messageId) == -1) { newLog += "\n" + remindLog.content.split("\n")[x]; }
    }
    remindLog.edit(newLog);
}

function codeRemind() {
    bot.channels.cache.get("531433553225842700").send("<@135999597947387904>\n" + codeLog.content);
    setTimeout(function () {
        codeRemind();
    }, 86400000);
}

function codeEdit(message) {
    if (message.author.id == "135999597947387904" && lowmessage.indexOf(",code") == 0) {
        if (lowmessage.indexOf(",codeadd ") == 0) {
            codeLog.edit(codeLog.content + "\n" + message.content.split(",codeadd ")[1]);
            message.react("👍");
        }
        if (lowmessage.indexOf(",coderemove ") == 0 && !isNaN(lowmessage.split(" ")[1])) {
            newCodeLog = codeLog.content.split("\n")[0];
            for (var x = 1; x < codeLog.content.split("\n").length; x++) {
                if (x != message.content.split(" ")[1]) {
                    newCodeLog +="\n" + codeLog.content.split("\n")[x];
                }
                else {
                    message.channel.send(codeLog.content.split("\n")[x] + " removed from reminders!");
                }
            }
            codeLog.edit(newCodeLog);
        }
    }
}

async function refEdit(message, messageMember) {
    if (lowmessage.indexOf(",refadd ") == 0 && messageMember.roles.cache.has(refRole)) {
        await refLog.edit(refLog.content + "\n" + refLog.content.split("\n").length + ". " + message.cleanContent.split(",refadd ")[1]);
	refLog = await bot.channels.cache.get(botCommands).messages.fetch("741525510886260787");
        message.react("👍");
    }
    if (lowmessage.indexOf(",refremove ") == 0 && !isNaN(lowmessage.split(" ")[1]) && (messageMember.roles.cache.has(seniorRefRole) || messageMember.roles.cache.has("584764993044611075"))) {
        newRefLog = refLog.content.split("\n")[0];
        var found = false;
        for (var x = 1; x < refLog.content.split("\n").length; x++) {
            if (x != message.content.split(" ")[1]) {
                if (!found) { newRefLog += "\n" + refLog.content.split("\n")[x]; }
                else {
                    newRefLog += "\n" 
                    var newNum = refLog.content.split("\n")[x].split(". ")[0] - 1;
                    newRefLog += newNum + refLog.content.split("\n")[x].substring(refLog.content.split("\n")[x].indexOf(". ")); }
            }
            else {
                message.channel.send(refLog.content.split("\n")[x] + " removed from reminders!");
                found = true;
            }
        }
        await refLog.edit(newRefLog);
	refLog = await bot.channels.cache.get(botCommands).messages.fetch("741525510886260787");
    }
    if (lowmessage.indexOf(",reflist") == 0) {
        message.channel.send(refLog.content)
    }
}

async function contentEdit(message, messageMember) {
    if (lowmessage.indexOf(",contentadd ") == 0 && messageMember.roles.cache.has("456993685679243286")) {
        await contentLog.edit(contentLog.content + "\n" + contentLog.content.split("\n").length + ". " + message.cleanContent.split(",contentadd ")[1]);
	contentLog = await bot.channels.cache.get(botCommands).messages.fetch("741525512014397440");
        message.react("👍");
    }
    if (lowmessage.indexOf(",contentremove ") == 0 && !isNaN(lowmessage.split(" ")[1]) && (messageMember.roles.cache.has("584764993044611075"))) {
        newContentLog = contentLog.content.split("\n")[0];
        var found = false;
        for (var x = 1; x < contentLog.content.split("\n").length; x++) {
            if (x != message.content.split(" ")[1]) {
                if (!found) { newContentLog += "\n" + contentLog.content.split("\n")[x]; }
                else {
                    newContentLog += "\n" 
                    var newNum = contentLog.content.split("\n")[x].split(". ")[0] - 1;
                    newContentLog += newNum + contentLog.content.split("\n")[x].substring(contentLog.content.split("\n")[x].indexOf(". ")); }
            }
            else {
                message.channel.send(contentLog.content.split("\n")[x] + " removed from reminders!");
                found = true;
            }
        }
        await contentLog.edit(newContentLog);
	contentLog = await bot.channels.cache.get(botCommands).messages.fetch("741525512014397440");
    }
    if (lowmessage.indexOf(",contentlist") == 0) {
        message.channel.send(contentLog.content)
    }
}

async function payDay(message, messageMember) {
    if (lowmessage.indexOf(",payday") == 0 && (messageMember.roles.cache.has(refRole) || messageMember.roles.cache.has(judgeRole))) {
        let payments = message.mentions.users;
        var output = "";
	var newLog = `${payDayLog.content}`;
        for(const [key, value] of payments) { //for...of will be synchronous, reduces API queuing
            var payMember = await message.channel.guild.members.fetch(key);
            if (payDayLog.mentions.users.has(key)) { // Can utilise message.mentions for this check too
                output += `${payMember.displayName} has already received a Pay Day bonus this week.`; //Template literals
            }
            else {
                newLog += ` ${value}`; // Template literals
                output += `${payMember.displayName} receives a Pay Day bonus for this **(+$500)**.`; //Template literals
            }
            output += "\n";
        }
        message.channel.send(output);
        //await bot.channels.cache.get("531433553225842700").send("```" + payDayLog.content + "```");
        await payDayLog.edit(newLog);
	payDayLog = await bot.channels.cache.get(botCommands).messages.fetch("658883162000195607");
    }
}

async function payDayReset() {
    let oldPayDay = payDayLog.cleanContent;
    bot.channels.cache.get(logsChannel).send("Pay Day reset.  Previously:\n\n" + oldPayDay);
    await payDayLog.edit("Those who have gotten Pay Day this week:\n");
    payDayLog = await bot.channels.cache.get(botCommands).messages.fetch("658883162000195607");
}

async function pickUp(message, messageMember) {
    if (lowmessage.indexOf(",pickup") == 0 && (messageMember.roles.cache.has(refRole) || messageMember.roles.cache.has(judgeRole))) {
        let payments = message.mentions.users;
        var output = "";
	var newLog = `${pickUpLog.content}`;
        for(const [key, value] of payments) { //for...of will be synchronous, reduces API queuing
            var payMember = await message.channel.guild.members.fetch(key);
            if (pickUpLog.mentions.users.has(key)) { // Can utilise message.mentions for this check too
                output += `${payMember.displayName} has already received a Pickup bonus this week.`; //Template literals
            }
            else {
                newLog += ` ${value}`; // Template literals
                output += `${payMember.displayName} receives a Pickup bonus for this **(+Item)**.`; //Template literals
            }
            output += "\n";
        }
        message.channel.send(output);
        //await bot.channels.cache.get("531433553225842700").send("```" + pickUpLog.content + "```");
	await pickUpLog.edit(newLog);
    	pickUpLog = await bot.channels.cache.get(botCommands).messages.fetch("658884961603944478");
    }
}

async function pickUpReset() {
    let oldPickUp = pickUpLog.cleanContent;
    bot.channels.cache.get(logsChannel).send("Pickup reset.  Previously:\n\n" + oldPickUp);
    await pickUpLog.edit("Those who have gotten Pickup this week:\n");
    pickUpLog = await bot.channels.cache.get(botCommands).messages.fetch("658884961603944478");
}

function weirrrrrReminder() {
    bot.channels.cache.get(logsChannel).send("WEIRRRRR Roll the JOBSSSSSS <@140308490609623041> <@406543085464584202>");
}

function weirrrrrReminderJ() {
    bot.channels.cache.get(logsChannel).send("Work on the thing 😉 <@140308490609623041>");
    /*var d = new Date();
    if (d.getUTCDate() < 2 || d.getUTCDate() > 8) { return; }
    bot.channels.cache.get(logsChannel).send("WEIRRRRR Judge the WAGESSSSSS (do judge wages) <@140308490609623041>");*/
}

function randomRotations() {
    var thisIsRich = new Discord.MessageEmbed().setImage("http://orig00.deviantart.net/9efc/f/2016/094/1/8/urpg_comic_1__random_rotations_by_wintervines-d9xqnfz.png");
    bot.channels.cache.get("531433553225842700").send({ content: "<@135867398241648640> <@135999597947387904>", embeds: [thisIsRich] });
    setTimeout(function () {
        randomRotations();
    }, 86400000);
}

function dailyQ() {
    bot.channels.cache.get("596371445311995927").send("Post the Daily Question <@&910028587879526400>");
    setTimeout(function () {
        dailyQ();
    }, 86400000);
}

async function bumpServer() {
    var discordCenter = await bot.users.fetch("509430136442191873");
    if (discordCenter.presence != null && discordCenter.presence.status != "offline") { bot.channels.cache.get("590150047279087617").send("dc!bump"); }
    bumpTime = setTimeout(function() {
        bumpServer();
    }, 7205000);
}

function bumpNotification() {
    bot.channels.cache.get(botCommands).send("DISBOARD bump ready.  The command is `!d bump`.");
    disBumpTime = setTimeout(function() {
        bumpNotification();
    }, 3600000);
}

function badWordsReporter(message, messageMember, isEdit) {
    if (message.author.bot || message.channel.id == "690427377012047902") {return;}
    lowmessage = lowmessage.replace(/cofag/g, "").replace(/leafage/g, "").replace(/skys/g, "").replace(/reffag/g, "").replace(/refage/g, "");
    var badWordsLog = "";
    var reporting = false;
    for (let i = 0; i < badWords.length; i++) {
        if (lowmessage.indexOf(badWords[i]) != -1) {
            reporting = true;
            break;
        }
    }
    if (reporting) {
        badWordsLog += messageMember.displayName;
        badWordsLog += " said the following here <";
        badWordsLog += message.url;
        badWordsLog += ">: ```";
        badWordsLog += message.cleanContent;
        badWordsLog += "```";
        badWordsLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setTitle("Questionable Content:").addField(messageMember.displayName + " (" + message.author.id + ")", message.channel + ": " + message.content).setColor('RED');
        bot.channels.cache.get(logsChannel).send({ embeds: [badWordsLog] });
    }
}

async function linkCleaner(message, messageMember) {
    if (!messageMember.roles.cache.has("456993685679243286") && lowmessage.indexOf("http") != -1 && lowmessage.indexOf("urpg") == -1 && !message.author.bot) {
        message.delete();
        var cleaningMessage = await message.channel.send("<@" + messageMember.id + "> please become a member before posting links here.  To become a member, start by requesting a starter here https://forum.pokemonurpg.com/showthread.php?tid=1722. Your starter can be any nonlegendary Pokémon that evolves, including Type: Null.");
        setTimeout(function() {
            selfCleaner(cleaningMessage);
        }, 30000);
    }
}

function selfCleaner(message) {
    message.delete();
}

function stats(message) {
    if (lowmessage.indexOf(",stats") == 0 || lowmessage.indexOf("'s statsbot") != -1) {
        let oldmessage = " " + lowmessage.replace(/'s statsbot/g, " ").replace(/’/g, "'") + " ";
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
        if (oldmessage.indexOf("axion ") != -1) { message.channel.send("\nAxion's stats: https://sites.google.com/view/urpgaxion/trainer-stats") }
        if (oldmessage.indexOf("izuru ") != -1) { message.channel.send("\nIzuru's stats: http://www.pokemoncrossroads.com/forum/showthread.php?18030-Izuru-s-Stats&p=279688&viewfull=1#post279688") }
        if (oldmessage.indexOf("fenris ") != -1 || oldmessage.includes("raikaris")) { message.channel.send("\nRaikaris' stats: https://forum.pokemonurpg.com/showthread.php?tid=9983") }
        if ((oldmessage.indexOf("reneescarted ") != -1) || (oldmessage.indexOf("renee ") != -1) || (oldmessage.indexOf("renée ") != -1)) { message.channel.send("\nRenéeScarted's stats: https://forum.pokemonurpg.com/showthread.php?tid=10261&pid=127856#pid127856") }
        if (oldmessage.indexOf("lychee ") != -1) { message.channel.send("\nLychee's stats: http://forum.pokemonurpg.com/showthread.php?tid=8369") }
        if ((oldmessage.indexOf("swift") != -1) || (oldmessage.indexOf("gallade ") != -1)) { message.channel.send("\nSwiftGallade46's stats: http://swiftgallade.freeforums.net/thread/2/pokemon-especially-gallade") }
        if (oldmessage.indexOf("zolar ") != -1) { message.channel.send("\nZolar's stats: http://evilgeniusclub.proboards.com/thread/70/pokemon-numbered-list") }
        if (oldmessage.indexOf("pidge ") != -1) { message.channel.send("\nPidge's stats: https://www.tapatalk.com/groups/pidge/pidge-f3/") }
        if ((oldmessage.indexOf("k'sa") != -1) || (oldmessage.indexOf("ksariya ") != -1)) { message.channel.send("\nK'sariya's stats: https://ksariya.urpgstats.com/") }
        if ((oldmessage.indexOf("saur ") != -1)) { message.channel.send("\nSaur's stats: https://forum.pokemonurpg.com/showthread.php?tid=10333") }
        if ((oldmessage.indexOf("dekrueger ") != -1) || (oldmessage.indexOf(" dk ") != -1)) { message.channel.send("\nDeKrueger's stats: http://forum.pokemonurpg.com/showthread.php?tid=9235&pid=116946#pid116946") }
        if ((oldmessage.indexOf("darkness ruler ") != -1) || (oldmessage.indexOf(" dr ") != -1) || (oldmessage.indexOf("darknessruler ") != -1)) { message.channel.send("\nDarknessRuler's stats: http://w11.zetaboards.com/DarknessRuler/topic/9170207/1/") }
        if ((oldmessage.indexOf("mako ") != -1) || (oldmessage.indexOf("morru ") != -1) || (oldmessage.indexOf("magnum ") != -1)) { message.channel.send("\nMako's stats: http://morrumagnumurpg.proboards.com/thread/2/pok-mon") }
        if ((oldmessage.indexOf("velo ") != -1) || (oldmessage.indexOf("jello ") != -1) || (oldmessage.indexOf(" vj ") != -1)) { message.channel.send("\nVeloJello's stats: https://velojellourpg.wordpress.com/") }
        if ((oldmessage.indexOf("weir") != -1) || (oldmessage.indexOf("gold ") != -1)) { message.channel.send("\nGold's stats: https://gold.urpgstats.com/pokemon/") }
        if (oldmessage.includes("nitro")) { message.channel.send("Nitro's stats: https://forum.pokemonurpg.com/showthread.php?tid=11039"); }
        if ((oldmessage.indexOf("ralin") != -1) || (oldmessage.indexOf("jack ") != -1)) { message.channel.send("\nJack's stats: https://jackurpg.wordpress.com/") }
        if ((oldmessage.indexOf("syn ") != -1) || (oldmessage.indexOf("synthesis ") != -1)) { message.channel.send("\nSynthesis's stats: http://synthesisurpg.proboards.com/thread/2/re-current-pokemon") }
        if ((oldmessage.indexOf("evan ") != -1) || (oldmessage.indexOf("evanfardreamer ") != -1)) { message.channel.send("\nEvanfardreamer's stats: http://forum.pokemonurpg.com/showthread.php?tid=9387") }
        if (oldmessage.indexOf("dash ") != -1) { message.channel.send("\nDash's stats: http://dashurpgstats.proboards.com/thread/1/pokemon") }
        if (oldmessage.indexOf(" ash ") != -1) { message.channel.send("\nAsh K.'s stats: http://ashkstatsurpg.proboards.com/thread/23/pok-mon-index") }
        if ((oldmessage.indexOf(" fd ") != -1) || (oldmessage.indexOf("fierce deity ") != -1) || (oldmessage.indexOf("fierce diety ") != -1)) { message.channel.send("\nFierce Deity's stats: <http://fd-stats.proboards.com/thread/4/slaves?page=1>") }
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
        if (oldmessage.indexOf("ataro ") != -1) { message.channel.send("\nAtaro's stats (ARCHIVE): https://web.archive.org/web/20180712151054/http://s4.zetaboards.com/rustyrefbotataro/topic/8274811/1") }
        if ((oldmessage.indexOf("magik ") != -1) || (oldmessage.indexOf("magikchicken ") != -1) || (oldmessage.indexOf("magik chicken ") != -1)) { message.channel.send("\nMagikchicken's stats: http://forum.pokemonurpg.com/showthread.php?tid=9237") }
        if ((oldmessage.indexOf("neon ") != -1) || (oldmessage.indexOf("neonsands ") != -1) || (oldmessage.indexOf("neonsand ") != -1)) { message.channel.send("\nNeonsands's stats: https://pokemonurpg.com/archive/general.394/trainers-stats.401/the-stats-of-neonsands.60099.html") }
        if ((oldmessage.indexOf("felly ") != -1) || (oldmessage.indexOf("mistral ") != -1)) { message.channel.send("\nFelly's stats: https://mistralurpg.wordpress.com/pokemon/") }
        if ((oldmessage.indexOf("haily ") != -1) || (oldmessage.indexOf("hailly ") != -1) || (oldmessage.indexOf("haillys ") != -1)) { message.channel.send("\nHaillys's stats (ARCHIVE): https://pokemonurpg.com/archive/pxr/105-General/108-Trainers-Stats/16320-Haillys-s-Stats/") }
        if ((oldmessage.indexOf("volt ") != -1) || (oldmessage.indexOf("voltaire ") != -1) || (oldmessage.indexOf("voltaire magneton ") != -1) || (oldmessage.indexOf("voltchen magneton ") != -1) || (oldmessage.indexOf(" vm ") != -1)) { message.channel.send("\nVoltaire Magneton's stats: https://forum.pokemonurpg.com/showthread.php?tid=10310") }
        if ((oldmessage.indexOf(" qe ") != -1) || (oldmessage.indexOf(" se ") != -1) || (oldmessage.indexOf(" sinnoheevee ") != -1) || (oldmessage.indexOf(" sinnoh eevee ") != -1) || (oldmessage.indexOf(" queen eevee ") != -1)) { message.channel.send("\nSinnoh Eevee's stats: https://www.tapatalk.com/groups/sinnoheevee/current-pokemon-t1.html#p1") }
        if ((oldmessage.indexOf("princess crow ") != -1) || (oldmessage.indexOf(" pc ") != -1) || (oldmessage.indexOf("hannah ") != -1)) { message.channel.send("\nPrincess Crow's stats: http://princesscrow.proboards.com/thread/2/pokemon-list-1") }
        if ((oldmessage.indexOf(" pv ") != -1) || (oldmessage.indexOf("vultan ") != -1) || (oldmessage.indexOf("artist ") != -1)) { message.channel.send("\nPrinceVultan's stats: https://princevultan.wixsite.com/urpg") }
        if ((oldmessage.indexOf("julio ") != -1) || (oldmessage.indexOf("juliorain ") != -1)) { message.channel.send("\njuliorain's stats: https://juliorain.wordpress.com/") }
        if ((oldmessage.indexOf("maxichel kigahen ") != -1) || (oldmessage.indexOf("mikey ") != -1) || (oldmessage.indexOf("mikey57 ") != -1)) { message.channel.send("\nMikey57's stats: https://mikey57urpg.wordpress.com/") }
        if ((oldmessage.indexOf("elrond ") != -1)) { message.channel.send("\nElrond's stats: https://pokemonurpg.com/stats/Elrond") }
        if ((oldmessage.indexOf(" soul ") != -1) || (oldmessage.indexOf("soulmaster ") != -1) || (oldmessage.indexOf(" sm ") != -1)) { message.channel.send("\nSoulmaster's stats: http://soulmasterurpgf.proboards.com/thread/2/pokemon-own") }
        if ((oldmessage.indexOf("winter ") != -1) || (oldmessage.indexOf(" wv ") != -1) || (oldmessage.indexOf("wintervines ") != -1)) { message.channel.send("\nWinterVines's stats: http://frozenchains.proboards.com/thread/5") }
        if ((oldmessage.indexOf("siles ") != -1) || (oldmessage.indexOf("siless ") != -1)) { message.channel.send("\nSiless's stats: http://silessurpg.proboards.com/thread/1/silesss-stats") }
        if ((oldmessage.indexOf("w32 ") != -1) || (oldmessage.indexOf("coravint ") != -1)) { message.channel.send("\nW32Coraviant's stats: https://w32coravint-urpg.neocities.org/") }
        if (oldmessage.indexOf(" sou ") != -1) { message.channel.send("\nSou's stats: http://soucleife.proboards.com/thread/2/pokemon-stats") }
        if (oldmessage.indexOf("trainer17 ") != -1 || oldmessage.includes("t17")) { message.channel.send("\nTrainer17's stats: http://kingofwakanda.proboards.com") }
        if ((oldmessage.indexOf("captaindude ") != -1) || (oldmessage.indexOf(" cd ") != -1)) { message.channel.send("\nCaptainDude's stats: http://captaindudeurpg.proboards.com/board/1") }
        if ((oldmessage.indexOf("mandl27 ") != -1) || (oldmessage.indexOf("mandl ") != -1) || (oldmessage.indexOf(" mand ") != -1) || (oldmessage.indexOf(" ml ") != -1)) { message.channel.send("\nMandL27's stats: https://forum.pokemonurpg.com/showthread.php?tid=10294") }
        if (oldmessage.indexOf("sapahn") != -1 || oldmessage.includes(" sap ") || lowmessage.includes(" sapa ")) { message.channel.send("\nSapahn's stats: https://sapahnurpg.wordpress.com/") }
        if (oldmessage.indexOf("fortree ") != -1) { message.channel.send("\nAsh K.'s Fortree Gym stats: http://ashkstatsurpg.proboards.com/thread/65/fortree-city-gym-2015") }
        if (oldmessage.indexOf(" after ") != -1) { message.channel.send("\nAfter's stats: https://forum.pokemonurpg.com/showthread.php?tid=10215") }
        if ((oldmessage.indexOf("viper ") != -1) || (oldmessage.indexOf(" pv ") != -1) || (oldmessage.indexOf("pokéviper") != -1)) { message.channel.send("\nPokeViper's stats: http://pokeviperbadass.proboards.com/") }
        if ((oldmessage.indexOf("shock") != -1) || (oldmessage.indexOf("3600") != -1)) { message.channel.send("\nShock3600's stats: https://shock3600stats.weebly.com/") }
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
        if (oldmessage.indexOf("jamesbwa") != -1) { message.channel.send("\nJamesbwa's stats: https://forum.pokemonurpg.com/showthread.php?tid=10570") }
        if (oldmessage.indexOf("camper") != -1) { message.channel.send("\nImTheRealCamper's stats: https://forum.pokemonurpg.com/showthread.php?tid=10552") }
        if (oldmessage.indexOf("quig") != -1) { message.channel.send("\nQuigzerz's stats: https://forum.pokemonurpg.com/showthread.php?tid=10511") }
        if (oldmessage.indexOf("namielle") != -1) { message.channel.send("\nNamielle's stats: https://forum.pokemonurpg.com/showthread.php?tid=10478") }
        if (oldmessage.indexOf("atomic") != -1) { message.channel.send("\nAtomicX160's stats: https://forum.pokemonurpg.com/showthread.php?tid=10481") }
        if ((oldmessage.indexOf("freeze") != -1) || (oldmessage.indexOf("thunder") != -1)) { message.channel.send("FreezeThunder's stats: https://forum.pokemonurpg.com/showthread.php?tid=10428") }
        if ((oldmessage.indexOf("powar") != -1) || (oldmessage.indexOf("torterra") != -1)) { message.channel.send("PowarTheTorterra's stats: https://forum.pokemonurpg.com/showthread.php?tid=10364") }
        if ((oldmessage.indexOf(" atf") != -1) || (oldmessage.indexOf("americantreef") != -1)) { message.channel.send("AmericanTreeFrog's stats: https://forum.pokemonurpg.com/showthread.php?tid=9689") }
        if ((oldmessage.indexOf(" la ") != -1) || (oldmessage.indexOf("loyal") != -1) || (oldmessage.indexOf("arcanine") != -1) || (oldmessage.indexOf("mikey94028") != -1) || (oldmessage.indexOf("mikey ") != -1)) { message.channel.send("Loyal Arcanine's stats: https://forum.pokemonurpg.com/showthread.php?tid=9265") }
        if ((oldmessage.indexOf("jr") != -1) || (oldmessage.indexOf("junior") != -1) || (oldmessage.indexOf("pieandchips") != -1)) { message.channel.send("The Jr Trainer's stats: https://forum.pokemonurpg.com/showthread.php?tid=9255") }
        if (oldmessage.indexOf("mt. chimney") != -1) { message.channel.send("Shock3600's Mt. Chimney Gym stats: https://shock3600stats.weebly.com/mt-chimney-gym.html") }
        if (oldmessage.indexOf("rocco") != -1) { message.channel.send("Rocco's stats: https://forum.pokemonurpg.com/showthread.php?tid=10583") }
        if ((oldmessage.indexOf("volcan") != -1) || (oldmessage.indexOf(" vf ") != -1)) { message.channel.send("VolcanFlame's stats: https://forum.pokemonurpg.com/showthread.php?tid=10586&pid=134054#pid134054") }
        if ((oldmessage.indexOf("frozenchaos") != -1) || (oldmessage.indexOf(" fc ") != -1)) { message.channel.send("FrozenChaos' stats: https://forum.pokemonurpg.com/showthread.php?tid=10584") }
        if (oldmessage.indexOf("ravioli") != -1) { message.channel.send("raviolikid's stats: https://forum.pokemonurpg.com/showthread.php?tid=10604") }
        if (oldmessage.indexOf("josiez") != -1) { message.channel.send("josiez's stats: https://forum.pokemonurpg.com/showthread.php?tid=10603") }
        if ((oldmessage.indexOf("james ") != -1 || oldmessage.indexOf("rinage") != -1)) { message.channel.send("AiJames' stats: https://forum.pokemonurpg.com/showthread.php?tid=10611&pid=134755#pid134755") }
        if (oldmessage.indexOf("plum") != -1) { message.channel.send("Plum's stats: https://forum.pokemonurpg.com/showthread.php?tid=10663"); }
        if ((oldmessage.indexOf(" ml ") != -1 || oldmessage.indexOf("mlou") != -1) || oldmessage.includes("gaius")) { message.channel.send("mlouden03's stats: https://gaiusvibritannia.proboards.com/thread/6/urpg-stats"); }
        if (oldmessage.indexOf("lavender") != -1) { message.channel.send("juliorain's Lavender Town Gym stats: https://juliorain.wordpress.com/lavender-town-gym/"); }
        if ((oldmessage.indexOf("beemo") != -1 || oldmessage.indexOf("crimson rose") != -1 || oldmessage.indexOf("cress") != -1)) { message.channel.send("ExistentialBeemo's stats: https://existentialbeemo.proboards.com/"); }
        if ((oldmessage.indexOf("eternus") != -1 || oldmessage.indexOf(" situs ") != -1 || oldmessage.indexOf("kanga") != -1)) { message.channel.send("Eternus Situs' stats: https://forum.pokemonurpg.com/showthread.php?tid=10726"); }
        if ((oldmessage.indexOf(" bdra ") != -1 || oldmessage.indexOf("bdra97") != -1)) { message.channel.send("BDra97's stats: https://forum.pokemonurpg.com/showthread.php?tid=10707"); }
        if (oldmessage.indexOf(" asha ") != -1) { message.channel.send("Asha_Kaideem's stats: https://forum.pokemonurpg.com/showthread.php?tid=10699"); }
        if (oldmessage.indexOf("sambi") != -1) { message.channel.send("Sambipom's stats: https://forum.pokemonurpg.com/showthread.php?tid=10819"); }
        if (oldmessage.indexOf("sakura") != -1) { message.channel.send("Sakura's stats: https://forum.pokemonurpg.com/showthread.php?tid=10859"); }
        if (oldmessage.indexOf("bmk") != -1) { message.channel.send("bmkmb's stats: https://forum.pokemonurpg.com/showthread.php?tid=10379"); }
        if (oldmessage.indexOf("yumpy") != -1) { message.channel.send("Yumpy's stats: https://forum.pokemonurpg.com/showthread.php?tid=10865"); }
        if (oldmessage.indexOf("praetor") != -1) { message.channel.send("Praetor's stats: https://forum.pokemonurpg.com/showthread.php?tid=10905"); }
        if (oldmessage.indexOf("kumo") != -1) { message.channel.send("Kumo's stats: https://forum.pokemonurpg.com/showthread.php?tid=10907"); }
        if (oldmessage.indexOf("marshmallow") != -1) { message.channel.send("Marshmallow's stats: https://forum.pokemonurpg.com/showthread.php?tid=10912"); }
        if (oldmessage.indexOf("lycanwarrior91") != -1 || oldmessage.includes(" lycan ")) { message.channel.send("Lycanwarrior91's stats: https://forum.pokemonurpg.com/showthread.php?tid=10911"); }
        if (oldmessage.indexOf("petuh") != -1) { message.channel.send("Petuh's stats: https://sites.google.com/view/petuuuhhh/home"); }
        if (oldmessage.includes("subzero") || oldmessage.includes("songbirb")) { message.channel.send("Subzero Songbirb's stats: https://forum.pokemonurpg.com/showthread.php?tid=10954"); }
        if (oldmessage.includes("zeit")) { message.channel.send("Zeitgeist's stats: https://forum.pokemonurpg.com/showthread.php?tid=10963&pid=143350#pid143350"); }
        if (oldmessage.includes("silas")) { message.channel.send("Silas's stats: https://forum.pokemonurpg.com/showthread.php?tid=10983"); }
        if (oldmessage.includes("beanie") || oldmessage.includes("pudge")) { message.channel.send("beaniepudge's stats: https://forum.pokemonurpg.com/showthread.php?tid=11024"); }
        if (oldmessage.includes("mailmeharry")) { message.channel.send("mailmeharry's stats: https://forum.pokemonurpg.com/showthread.php?tid=11027"); }
        if (oldmessage.includes("taither")) { message.channel.send("Taither's stats (ARCHIVE): https://web.archive.org/web/20180711194626/http://w11.zetaboards.com/Taither/topic/7969379/1/"); }
        if (oldmessage.includes("haze")) { message.channel.send("Hazeduse's stats: https://forum.pokemonurpg.com/showthread.php?tid=10807"); }
        if (oldmessage.includes("sally")) { message.channel.send("Sally_stitches55's stats: https://forum.pokemonurpg.com/showthread.php?tid=11066"); }
        if (oldmessage.includes("fuzzy")) { message.channel.send("FuzzyDwarf's stats: https://forum.pokemonurpg.com/showthread.php?tid=11058"); }
    	if (oldmessage.includes("foxes")) { message.channel.send("FoxesAndSlumber's stats: https://forum.pokemonurpg.com/showthread.php?tid=11102"); }
    	if (oldmessage.includes("hikaruizumi")) { message.channel.send("HikaruIzumi's stats: https://hikaruizumistats.proboards.com/"); }
    	if (oldmessage.includes("darkhorse")) { message.channel.send("darkhorseborhous's stats: https://forum.pokemonurpg.com/showthread.php?tid=11100"); }
    	if (oldmessage.includes("evanescent")) { message.channel.send("Evanescent's stats: https://forum.pokemonurpg.com/showthread.php?tid=11108"); }
    	if (oldmessage.includes("proto")) { message.channel.send("TheProtobabe's stats (ARCHIVE): https://web.archive.org/web/20180711130731/http://w11.zetaboards.com/The_RP_Junk_Drawer/topic/8669039/1/"); }
    	if (oldmessage.includes("feng")) { message.channel.send("Feng's stats (ARCHIVE): https://pokemonurpg.com/archive/general.394/trainers-stats.401/_.61772.html"); }
        for (var x = 1; x < tempStats.content.split("\n").length; x++) {
            if (oldmessage.indexOf(tempStats.content.split("\n")[x].split(" ")[0].toLowerCase()) != -1) { message.channel.send(tempStats.content.split("\n")[x].split(" ")[0] + "'s stats: " + tempStats.content.split("\n")[x].split(" ")[1]); }
        }
    }
}

function rse(message) {
    if (lowmessage.indexOf(",rse ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("rse.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("rse.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\n")
        const desiredmove = lowmessage.substring(5)
        var bestGuess = 0;
        var diff = -1;
        for (let x = 0; x < moves.length; x += 2) {
            if (ss.compareTwoStrings(moves[x].split(" | ")[0].toLowerCase(), desiredmove) > diff) {
                bestGuess = x;
                diff = ss.compareTwoStrings(moves[x].split(" | ")[0].toLowerCase(), desiredmove);
            }
        }
        message.channel.send(moves[bestGuess] + "\n" + moves[bestGuess + 1])
    }
}

function dppt(message) {
    if (lowmessage.indexOf(",dppt ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("dppt.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("dppt.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\n\n")
        const desiredmove = lowmessage.substring(6)
        var bestGuess = 0;
        var diff = -1;
        for (let x = 0; x < moves.length; x ++) {
            if (ss.compareTwoStrings(moves[x].split(" | ")[0].toLowerCase(), desiredmove) > diff) {
                bestGuess = x;
                diff = ss.compareTwoStrings(moves[x].split(" | ")[0].toLowerCase(), desiredmove);
            }
        }
        message.channel.send(moves[bestGuess])
    }
}

function oras(message) {
    if (lowmessage.indexOf(",oras ") == 0) {
        let movelist = ""

        try { movelist = fs.readFileSync("oras.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("oras.txt not found!")
            else { throw err }
        }

        const moves = movelist.split("\n")
        const desiredmove = lowmessage.substring(6)
        var bestGuess = 0;
        var diff = -1;
        for (let x = 0; x < moves.length; x += 2) {
            if (ss.compareTwoStrings(moves[x].split(" | ")[0].toLowerCase(), desiredmove) > diff) {
                bestGuess = x;
                diff = ss.compareTwoStrings(moves[x].split(" | ")[0].toLowerCase(), desiredmove);
            }
        }
        message.channel.send(moves[bestGuess] + "\n" + moves[bestGuess + 1])
    }
}

function rankList(pokemonList, channel) {
    pokemonList += ", ";
    while (pokemonList.indexOf("*") != -1) {
        pokemonList = pokemonList.replace("*" + pokemonList.split("*")[1] + "*, ", "");
    }
    while (pokemonList.indexOf("__") != -1) {
        pokemonList = pokemonList.replace("__" + pokemonList.split("__")[1] + "__, ", "");
    }
    for (var x = 0; x < hardFossils.length; x++) {
        pokemonList = pokemonList.replace(hardFossils[x] + ", ", "");
    }
    var initialList = "🙉" + pokemonList.replace(/, /g, "🙉");
    var numberedList = initialList;
    var x = 1;
    while (numberedList.indexOf("🙉") != numberedList.lastIndexOf("🙉")) {
        numberedList = numberedList.replace("🙉", "\n" + x + ". ");
        x++;
    }
    numberedList = numberedList.replace("🙉", "");
    channel.send(numberedList);
}

function pokeRank(pokemon) {
    let pokemonlist = "";
    try { pokemonlist = fs.readFileSync("ranks.txt", "utf8") } catch (err) {
        if (err.code === "ENOENT") { message.channel.send("Sorry, my rank file seems to be missing!"); pokemonlist = "\n\n\n\n\n\n\n\n\n\n" } else { throw err }
    }
    pokemonArray = pokemonlist.replace(/\n/g, ",").replace(/\*/g, "").replace(/_/g, "");
    var bestGuess = ss.findBestMatch(pokemon, pokemonArray.toLowerCase().split(", ")).bestMatchIndex;
    /*var diff = -1;
    for (var x = 0; x < pokemonArray.length; x++) {
        if (ss.compareTwoStrings(pokemonArray[x], pokemon) > diff) {
            bestGuess = x;
            diff = ss.compareTwoStrings(pokemonArray[x], pokemon);
        }
    }*/
    for (var i = 0; i < pokemonlist.split("\n").length; i++) {
        if (pokemonlist.split("\n")[i].indexOf(pokemonArray.split(", ")[bestGuess]) != -1) {
            var rankNum = i;
        }
    }
    return [pokemonArray.split(", ")[bestGuess], rankNum];
}

function hpType(message) {
    if (lowmessage.indexOf(",hp ") == 0) {
        let pokelist = ""

        try { pokelist = fs.readFileSync("HiddenPower.txt", "utf8") } catch (err) {
            if (err.code === "ENOENT") message.channel.send("HiddenPower.txt not found!")
            else { throw err }
        }

        const pokes = pokelist.split("\n")
        const desiredpoke = lowmessage.substring(4).replace("-a", "-alola").replace("-g", "-galar");
        var bestGuess = 0;
        var diff = -1;
        for (let x = 0; x < pokes.length; x ++) {
            if (ss.compareTwoStrings(pokes[x].split("/")[0].toLowerCase(), desiredpoke) > diff) {
                bestGuess = x;
                diff = ss.compareTwoStrings(pokes[x].split("/")[0].toLowerCase(), desiredpoke);
            }
        }
        var theMessage = "I'd give " + pokes[bestGuess].split("/")[0] + " Hidden Power " + pokes[bestGuess].split("/")[1] + "!";
        if (pokes[bestGuess].split("/")[2].includes("No")) {
            theMessage += "\nI wouldn't use Hidden Power on it very often though...";
        }
        if (pokes[bestGuess].split("/")[0] == "Greninja") {
            theMessage += "\nI would send it here <https://forum.pokemonurpg.com/showthread.php?tid=10219>!";
        }
        message.channel.send(theMessage);
    }
}

function hpCommand(interaction) {
    const desiredpoke = interaction.options.getString('pokemon').replace("-a", "-alola").replace("-g", "-galar");
    let pokelist = ""

    try { pokelist = fs.readFileSync("HiddenPower.txt", "utf8") } catch (err) {
        if (err.code === "ENOENT") message.channel.send("HiddenPower.txt not found!")
        else { throw err }
    }

    const pokes = pokelist.split("\n")
    var bestGuess = 0;
    var diff = -1;
    for (let x = 0; x < pokes.length; x ++) {
        if (ss.compareTwoStrings(pokes[x].split("/")[0].toLowerCase(), desiredpoke) > diff) {
            bestGuess = x;
            diff = ss.compareTwoStrings(pokes[x].split("/")[0].toLowerCase(), desiredpoke);
        }
    }
    var theMessage = "I'd give " + pokes[bestGuess].split("/")[0] + " Hidden Power " + pokes[bestGuess].split("/")[1] + "!";
    if (pokes[bestGuess].split("/")[2].includes("No")) {
        theMessage += "\nI wouldn't use Hidden Power on it very often though...";
    }
    /*if (pokes[bestGuess].split("/")[0] == "Greninja") {
        theMessage += "\nI would send it here <https://forum.pokemonurpg.com/showthread.php?tid=10219>!";
    }*/
    interaction.reply(theMessage);
}

function pokeVal(pokemon) {
    if (pokemon.toLowerCase() == "Ninjask" || pokemon.toLowerCase() == "Shedinja") {
        return 4000;
    }
    var fullData = pokeRank(pokemon);
    var value = rankVal[fullData[1]];
    var martList = fs.readFileSync("mart.txt", "utf8");
    var berryList = fs.readFileSync("berry.txt", "utf8");
    if (martList.includes(fullData[0])) {
        value = martList.substring(martList.indexOf(fullData[0])).split("$")[1].split("\n")[0].replace(",", "") - 1 + 1;
    }
    if (hardFossils.some(element => element.toLowerCase() === fullData[0].toLowerCase()) || otherFossils.some(element => element.toLowerCase() === fullData[0].toLowerCase())) {
        value -= 15000;
    }
    if (berryList.includes(fullData[0] + " -")) {
        for (var x = 0; x < berryList.split("\n").length; x++) {
            if (berryList.split("\n")[x].includes(fullData[0] + " -")) {
                value = berryList.split("\n")[x].split("- ")[1].split(" (")[0].replace(",", "") - 0;
                switch(berryList.split("\n")[x].split(" (")[1].split(" ")[0]) {
                    case "Normal": value += 2500; break;
                    case "Super": value += 5000; break;
                    case "Hyper": value += 10000; break;
                }
            }
        }
    }
    return value;
}

function tradeVal(message) {
    if (message.content.toLowerCase().indexOf(",value ") == 0) {
        var theList = message.content.substring(7).split(", ");
        var tms = fs.readFileSync("TMs.txt", "utf8").split("\n");
        var value = pokeVal(theList[0].toLowerCase()) - 0;
        var fulldoc = pokeRank(theList[0].toLowerCase())[0] + " $" + value;
        var doc = [];
        var found = false;
        if (theList.length > 1) {
            if (!isNaN(theList[1])) {
                value += (theList[1] * 500);
                fulldoc += "\n" + theList[1] + " evolution item(s): $" + (theList[1] * 500);
            }
            else {
                for (var y = 0; y < tms.length; y++) {
                    if (tms[y].includes("/") && tms[y].split("/")[1].toLowerCase() == theList[1].toLowerCase()) {
                        value += (tms[y].split("/")[2].replace(/\$/, "").replace(/,/, "") - 0);
                        fulldoc += "\n" + tms[y].split("/")[0] + " " + tms[y].split("/")[1] + " – " + tms[y].split("/")[2];
                        found = true;
                    }
                }
                if (!found) {
                    value += 4000;
                    fulldoc += "\n" + theList[1] + " – $4,000";
                }
                found = false;
            }
            for (var x = 2; x < theList.length; x++) {
                for (var y = 0; y < tms.length; y++) {
                    if (tms[y].includes("/") && tms[y].split("/")[1].toLowerCase() == theList[x].toLowerCase()) {
                        value += (tms[y].split("/")[2].replace(/\$/, "").replace(/,/, "") - 0);
                        fulldoc += "\n" + tms[y].split("/")[0] + " " + tms[y].split("/")[1] + " – " + tms[y].split("/")[2];
                        found = true;
                    }
                }
                if (!found) {
                    value += 4000;
                    fulldoc += "\n" + theList[x] + " – $4,000";
                }
                found = false;
                if (fulldoc.length >= 1000) {
                    doc.push(fulldoc);
                    fulldoc = "";
                }
            }
        }
        if (fulldoc.length > 0) {
            doc.push(fulldoc);
        }
        var max = Math.ceil((value * 1.2 + 2000) / 500) * 500;
        var min = Math.floor(((value - 2000) / 1.2) / 500) * 500;
        var theMessage = new Discord.MessageEmbed().setTitle("Value: $" + value + ". Legal trade range: $" + min + "-$" + max).setColor('GREEN');
        for (var i = 0; i < doc.length; i++) {
            theMessage.addField("Full Calculation (" + (i-1+2) + "/" + doc.length + ")", doc[i]);
        }
        message.channel.send({ embeds: [theMessage] });
    }
}

function rank(message) {
    if (lowmessage.indexOf(",rank ") == 0 || lowmessage.indexOf(",ranklist") == 0) {
        if (lowmessage.split(" ")[1]) {
            if (lowmessage.indexOf("nidoran") != -1 && lowmessage.indexOf("nidoran-") == -1 && lowmessage.indexOf("male") == -1) {
                themessage = "Female Nidoran rank Simple!\nFemale Nidoran can also be be found in the Pokemart for $7,500!\nTrade value: $7,500\nMale Nidoran is rank Medium!\nTrade value: $15,000"
                message.channel.send(themessage)
                return
            }
            if (lowmessage.includes("calyrex") && !lowmessage.includes("rider")) {
                message.channel.send("Calyrex is rank Complex!\nTrade value: $35,000\nCalyrex-Rider is rank Tier1!");
                return;
            }
            if (lowmessage.includes("zygarde") && !lowmessage.includes("0%")) {
                message.channel.send("Zygarde-10% is rank Complex!\nTrade value: $35,000\nZygarde-50% is rank Tier2!");
                return;
            }
	
	    if (lowmessage.includes("Ninjask")) {
		message.channel.send("Ninjask's value is $4,000.  See `,rank Nincada` for how to obtain.");
		return;
	    }
	    if (lowmessage.includes("Shedinja")) {
		message.channel.send("Shedinja's value is $4,000.  See `,rank Nincada` for how to obtain.");
		return;
	    }
            var found = false;
            let pokemonlist = "";
            try { pokemonlist = fs.readFileSync("ranks.txt", "utf8") } catch (err) {
                if (err.code === "ENOENT") { message.channel.send("Sorry, my rank file seems to be missing!"); pokemonlist = "\n\n\n\n\n\n\n\n\n\n" } else { throw err }
            }
            var pokemonlists = pokemonlist.split("\n");
            var rankpoke = lowmessage.split(" ")[1];
            if (rankpoke.indexOf("easiest") != -1) {
                if (lowmessage.indexOf(",ranklist") == 0) {
                    rankList(pokemonlists[0], message.channel);
                    return;
                }
                message.channel.send(pokemonlists[0])
                found = true
                return;
            }
            if (rankpoke.indexOf("simple") != -1) {
                if (lowmessage.indexOf(",ranklist") == 0) {
                    rankList(pokemonlists[1], message.channel);
                    return;
                }
                message.channel.send(pokemonlists[1] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                found = true
                return;
            }
            if (rankpoke.indexOf("medium") != -1) {
                if (lowmessage.indexOf(",ranklist") == 0) {
                    rankList(pokemonlists[2], message.channel);
                    return;
                }
                message.channel.send(pokemonlists[2] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                found = true
                return;
            }
            if (rankpoke.indexOf("hard") != -1) {
                if (lowmessage.indexOf(",ranklist") == 0) {
                    rankList(pokemonlists[3], message.channel);
                    return;
                }
                message.channel.send(pokemonlists[3] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                found = true
                return;
            }
            if (rankpoke.indexOf("complex") != -1) {
                if (lowmessage.indexOf(",ranklist") == 0) {
                    rankList(pokemonlists[4], message.channel);
                    return;
                }
                message.channel.send(pokemonlists[4] + "\nItalicized Pokémon are also available in the Pokémart and underlined Pokémon are also availabe in the Berry Store!")
                found = true
                return;
            }
            if (rankpoke.indexOf("demanding") != -1) {
                if (lowmessage.indexOf(",ranklist") == 0) {
                    rankList(pokemonlists[5], message.channel);
                    return;
                }
                message.channel.send(pokemonlists[5] + "\nUnderlined Pokémon are also available in the Berry Store!")
                found = true
                return;
            }
            if (rankpoke.indexOf("merciless") != -1) {
                message.channel.send(pokemonlists[6])
                return;
            }
            if (rankpoke.indexOf("stupefying") != -1) {
                message.channel.send(pokemonlists[7])
                return;
            }
            if (rankpoke.indexOf("legendary") != -1) {
                message.channel.send("Tier 2:\n" + pokemonlists[8] + "\n\nTier 1:\n" + pokemonlists[9])
                found = true
                return;
            }
            if (rankpoke.indexOf("tier1") != -1 || rankpoke.indexOf("t1") != -1) {
                message.channel.send(pokemonlists[9])
                found = true
                return;
            }
            if (rankpoke.indexOf("tier2") != -1 || rankpoke.indexOf("t2") != -1) {
                message.channel.send(pokemonlists[8])
                found = true
                return;
            }
            if (lowmessage.indexOf(",ranklist") == 0) {
                message.channel.send("Rank not recognized.  Please use either Easiest, Simple, Medium, Hard, Complex, Demanding, Legendary, Tier1, T1, Tier2, or T2.")
                return;
            }
            rankpoke = pokeRank(lowmessage.split(",rank ")[1]);
            /*let pokemonlist = ""
            try { pokemonlist = fs.readFileSync("ranks.txt", "utf8") } catch (err) {
                if (err.code === "ENOENT") { message.channel.send("Sorry, my rank file seems to be missing!"); pokemonlist = "\n\n\n\n\n\n\n\n\n\n" } else { throw err }
            }
            const pokemonlists = pokemonlist.split("\n")
            let themessage = ""
            for (let x = 0; x < pokemonlists.length; x++) {
                if (rankpoke.indexOf("nidoran") != -1) {
                    themessage = "Female Nidoran is a Simple! You'll need to have your story or art pass at a Simple rank!\nFemale Nidoran can also be be found in the Pokemart for $9,000!\nMale Nidoran is a Medium! You'll need to have your story or art pass at Medium rank!\nTrade value: $7,500"
                    message.channel.send(themessage)
                    found = true
                    return
                }
                /*if (rankpoke == "muk") {
                    message.channel.send("That's a Complex! You'll need to write 30,000-40,000 characters or have your art pass at Complex rank!")
                    found = true
                    break
                }
                if (rankpoke == "abra") {
                    message.channel.send("That's a Demanding! You'll need to have your story or art pass at Demanding rank!\nYou can also find it in the Berry Store!\nTrade value: $47,500");
                    found = true
                    return
                }*/
                //if (pokemonlists[x].toLowerCase().indexOf(rankpoke) != -1) {
            //var x = rankpoke[1];
            var themessage = rankpoke[0] + " is rank " + ranks[rankpoke[1]] + "!";
            var value = pokeVal(rankpoke[0]);
                    /*if (x == 0) {
                        themessage += "That's an Easiest! You'll need to have your story or art pass at Easiest rank!";
                        value = 4000;
                    }
                    if (x == 1) {
                        themessage += "That's a Simple! You'll need to have your story or art pass at Simple rank!";
                        value = 7500;
                    }
                    if (x == 2) {
                        themessage += "That's a Medium! You'll need to have your story or art pass at Medium rank!";
                        value = 15000;
                    }
                    if (x == 3) {
                        themessage += "That's a Hard! You'll need to have your story or art pass at Hard rank!";
                        value = 25000;
                    }
                    if (x == 4) {
                        themessage += "That's a Complex! You'll need to have your story or art pass at Complex rank!";
                        value = 35000;
                    }
                    if (x == 5) {
                        themessage += "That's a Demanding! You'll need to have your story or art pass at Demanding rank!";
                        value = 47500;
                    }
                    if (x == 6) themessage = "That's a Merciless! You'll need to write 55,000-65,000 characters or have your art pass at Merciless rank!"
                    if (x == 7) themessage = "That's a Stupefying! You'll need to write 65,000-75,000 characters or have your art pass at Stupefying rank!"
                    if (x == 8) themessage = "That's a Tier 2 Legendary! You'll need to earn the equivalent of $250,000 through your stories or art!"
                    if (x == 9) themessage = "That's a Tier 1 Legendary! You'll need to earn the equivalent of $500,000 through your stories or art!"*/
                    found = true
                    try { pokemonlist = fs.readFileSync("mart.txt", "utf8") } catch (err) {
                        if (err.code === "ENOENT") { message.channel.send("Sorry, my mart file seems to be missing!"); pokemonlist = "\n\n\n\n\n\n\n\n\n\n" } else { throw err }
                    }
                    if (pokemonlist.toLowerCase().indexOf(rankpoke[0].toLowerCase()) != -1) {
                        themessage += "\nYou can also find it in the Pokemart";
                        let price = pokemonlist.substring(pokemonlist.toLowerCase().indexOf(rankpoke[0].toLowerCase()) + rankpoke[0].length + 3).split("\n")[0];
                        themessage += " for " + price + "!";
                        //value = 0;
                    }
                    if (hardFossils.some(element => element.toLowerCase() === rankpoke[0].toLowerCase()) || otherFossils.some(element => element.toLowerCase() === rankpoke[0].toLowerCase())) {
                        themessage += "\nYou can also find it in the Underground!";
                        //value -= 15000;
                    }
                    try { pokemonlist = fs.readFileSync("berry.txt", "utf8") } catch (err) {
                        if (err.code === "ENOENT") { message.channel.send("Sorry, my berry store file seems to be missing!"); pokemonlist = "\n\n\n\n\n\n\n\n\n\n" } else { throw err }
                    }
                    if (pokemonlist.toLowerCase().indexOf(rankpoke[0].toLowerCase()) != -1) { themessage += "\nYou can also find it in the Berry Store for $" + pokemonlist.substring(pokemonlist.toLowerCase().lastIndexOf(rankpoke[0].toLowerCase()) + rankpoke[0].length + 3).split("\n")[0].split("\n")[0] + "!";}
                    if (value > 0) { themessage += "\nTrade value: $" + value.toLocaleString(); }
                    message.channel.send(themessage)
                /*}
            }
            if (!found) {
                message.channel.send("I'm sorry, I was unable to find " + message.cleanContent.split(" ")[1] + ". If you were searching a Pokémon, please ensure it is unevolved and that you spelled it right.  If you were searching a rank, the categories are Easiest, Simple, Medium, Hard, Complex, Demanding, Legendary, tier1 or t1, and tier2 or t2.")
            }*/
        }
    }
}

function ruleset(message) {
    if(lowmessage.indexOf(",rules ") == 0)
    {
        lowmessage = lowmessage.split(",rules ")[1];
        var theRules = "";
        if(lowmessage.indexOf("casual") != -1) {
            if (!isNaN(lowmessage.split(" ")[1]) && lowmessage.split(" ")[1].length > 0) {
                theRules += lowmessage.split(" ")[1] + "v" + lowmessage.split(" ")[1];
            }
            else {
                theRules += "6v6";
            }
            theRules += "\nPublic Box\nStandard Rules"
            if (message.channel.name.includes("terrain")) {
                var terrain = Math.floor(Math.random() * 4);
                theRules += "\nRandom Terrain (";
                switch (terrain) {
                    case 0: theRules += "Misty Terrain"; break;
                    case 1: theRules += "Electric Terrain"; break;
                    case 2: theRules += "Psychic Terrain"; break;
                    case 3: theRules += "Grassy Terrain"; break;
                }
                theRules += ")";
            }
            /*else {
                theRules += " and Terrain";
            }*/
            theRules += "\nRoll for first send\nUnless otherwise stated, trainers will be using their default boxes and not excluding anything.";
            message.channel.send(theRules);
        }
        if(lowmessage.indexOf("ppr") == 0) message.channel.send("6v6\nPublic Preview\nStandard Rules\nRoll for first send");
        if(lowmessage.indexOf("hidden") == 0) message.channel.send("6v6\nPrivate Preview\nStandard Rules");
        if(lowmessage.indexOf("competitive") == 0) message.channel.send("6v6\nPrivate Preview\nStandard Rules\nNo Legendary Pokémon\nHelds On\nMega/Z Allowed");
        if(lowmessage.indexOf("e4") == 0 || lowmessage.indexOf("elite") != -1) message.channel.send("6 vs 6\nPrivate Full or Private Preview\nItems Allowed\nStandard Rules\nNo Legendary Pokemon\nDefender’s Choice: Dynamax Allowed OR Mega & Z Allowed, No Duplicate Species, No Duplicate Items, Weather, Terrain");
        if(lowmessage.indexOf("ld") == 0) message.channel.send("4 VS. 4+\nPrivate Full or Preview\nItems Optional\nStandard Rules\nNo Legendary Pokémon\nMega, Z, Dyanamax Optional\nDuplicate Items and Species Optional\nStarting Weather and Terrain Optional");
        if(lowmessage.indexOf("ashrandoms") == 0) message.channel.send("6v6\nPublic Box (Roll your 6 and use that as your Box)\nStandard Rules\nHelds On\nRandom Weather and Terrain\nMegas allowed if *both* trainers roll a Mega they can use\nRoll for first send\n\nAny changes?");
        if(lowmessage.indexOf("fortree") == 0) message.channel.send("6v6\nPublic Box\nVolcano Terrain\nSun\nHolds On\nStandard Rules\nNo Duplicate Species\nNo Legendary Pokémon\nMegas Allowed\nChallenger Sends First");
        if(lowmessage.indexOf("ashmockfire") == 0) message.channel.send("6v6\nPublic Box\nSnow Terrain\nSun\nHolds On\nStandard Rules\nNo Duplicate Species\nNo Legendary Pokémon\nMegas Allowed\nChallenger Sends First\n\n**__Owned Legal Pokémon:__**\nFires: Arcanine, Blaziken, Camerupt, Centiskorch, Chandelure, Charizard, Cinderace, Coalossal, Delphox, Flareon, Houndoom, Magmortar, Marowak-Alola, Ninetales-Kanto, Numel, Talonflame, Torkoal, Turtonator, Volcarona\nWC: Leafeon, Salamence, Solrock"); //Gym Leader's Box will be Arcanine, Blaziken, Chandelure, Charizard, Cinderace, Delphox, Flareon, Houndoom, Marowak (Alola), Numel, Salamence, Talonflame, Torkoal, Turtonator, Volcarona.  Yours may be whatever you wish.");
        if(lowmessage.indexOf("ashmockdragon") == 0) message.channel.send("6v6\nPublic Box\nPower Plant Terrain\nRain\nHolds On\nStandard Rules\nNo Duplicate Species\nNo Legendary Pokémon\nMegas Allowed\nChallenger Sends First\n\n**__Owned Legal Pokémon:__**\nDragons: Altaria, Appletun, Dracovish, Dracozolt, Dragalge, Dragapult, Dragonite, Drampa, Druddigon, Duraludon, Exeggutor-A, Flapple, Flygon, Garchomp, Goodra, Haxorus, Hydreigon, Kingdra, Kommo-o, Noivern, Salamence, Turtonator, Tyrantrum, Zygarde-10%\nWC: Ampharos, Charizard, Sceptile"); //Gym Leader's Box will be Altaria, Charizard, Dragalge, Dragapult, Dragonite, Drampa, Druddigon, Exeggutor (Alola), Flygon, Garchomp, Goodra, Haxorus, Hydreigon, Kingdra, Kommo-o, Noivern, Turtonator, Tyrantrum, Salamence.  Yours may be whatever you wish.");
        if(lowmessage.indexOf("ashmockpsychic") == 0) message.channel.send("6v6\nPublic Box\nDojo Terrain\nSun\nHolds On\nStandard Rules\nNo Duplicate Species\nNo Legendary Pokémon\nMegas Allowed\nChallenger Sends First\n\n**__Owned Legal Pokémon:__**\nAlakazam, Delphox, Espeon, Gallade, Gardevoir, Indeedee-Female, Lunatone, Medicham, Metagross, Mr. Mime-Kanto, Oranguru, Orbeetle, Sigilyph, Slowking, Solrock, Starmie, Swoobat, Xatu\nWC: Mienshao, Ninetales-Kanto");
        if(lowmessage.indexOf("mt. chimney") == 0) message.channel.send("4v4-6v6\nPublic Box\nSnow Terrain\nSun\nHelds On\nStandard Rules\nNo Duplicate Species\nZ/Mega/Duplicate Items Challenger Dependant\nChallenger Sends First");
        if(lowmessage.indexOf("canalave") == 0) message.channel.send("Canalave City Gym.\nTM 128 – Gyro Ball.\n4v4 or 6v6\nPublic Box\nStandard Rules\nNo Legendary Pokémon\nDuplicate Items and Mega Evolutions may be toggled depending on the challenger\nHelds On\nSandstorm Weather\nChallenger Sends First");
        if(lowmessage.indexOf("battle dome") == 0) message.channel.send("6v6\nPrivate Doubles\nHelds On\nNo Starting Weather\nDefault Terrain\nStandard Rules\nNo Legendary Pokémon\nDefender’s Choice: Duplicate Items/Species, Preview vs Full, Mega/Z-Move/Dynamax Allowed (at least one must be on, Dynamax cannot be off with others off)\nGold: Dome Brains make a pool of 8 Pokemon, and can send as if the battle were Private Open with those Pokemon (their items and abilities must still be sent at the start).");
        if(lowmessage.indexOf("maylee") == 0) message.channel.send("6v6 Private Full\nStandard Rules\nNo Legendary Pokémon\nHelds on\nMega/Z Allowed\n\nIf both battlers agree, the following rules may be changed: Mega Evolution/Z-Moves/Duplicate Items/Duplicate Species, Helds off instead of on, Preview instead of Full");
        if(lowmessage.indexOf("battle tag") == 0) message.channel.send("6v6\nPublic Box\nStandard Rules\nUnique Helds\nNo Legendary Pokémon\nRoll for first send\nUnless otherwise stated, trainers will be using their default boxes and not excluding anything.\n\nBattlers automatically rent the following items (but must specify Mega Stone and Z Crystal beforehand to use them): Life Orb, Leftovers, Expert Belt, Weakness Policy, Lum Berry, Focus Sash, Sitrus Berry, Choice Scarf, Red Card, a Mega Stone, a Z Crystal, Mega/Z/Dynamax Bracelet.\n\nThe two participants may agree to use any of the following rules instead.\n\nPrivate\nPreview/Full\nHelds Off, No Duplicate Species, Megas Disallowed, Z-Moves Disallowed, Legends Allowed");
        if(lowmessage.indexOf("lavender") == 0) message.channel.send("6v6\nPublic Box\nSingles or Doubles\nUnique Holds\nStandard Rules\nNo Duplicate Species\nNo Legendary Pokémon\nMegas Allowed\nZ-Moves Allowed\nChallenger Sends First");
        if(lowmessage.indexOf("monsu") == 0) message.channel.send("Monsu Island Gym\nNight Badge\n6v6 Public Box\nStandard Clauses\n-Megas Allowed\nUnique Holds\nNo Duplicate Species\nNo Legendary Pokémon\nChallenger Sends First\nTM83: Thief. Gym Pokémon know Thief if they're able to learn it via TM");
        if(lowmessage.indexOf("shock") == 0) message.channel.send("6v6\nPublic Box\nStandard Rules\nHelds On\nMegas Allowed\nRoll for first send\nUnless otherwise stated, trainers will be using their default boxes and not excluding anything.");
        if(lowmessage.indexOf("ffa") == 0) message.channel.send("SM Private Full\nNo Holds\nNo Sleep Moves (Barring Rest)\nEVA/ACC Clauses\nNo OHKO/Imprison/Dyanamax\nPerish Song Fails\nPerish Body banned\nHit All - Hit One\nEncore Fails\nAttract Fails\nRage Powder/Follow Me/Spotlight Fails\nRedirects On\nIllusion Pokémon disguises as a random Pokémon from the National Pokédex\nImposter, Download, and Intimidate select a random participating Pokémon\nNot sending or forfeiting results in KO at the beginning of the turn");
        if(lowmessage.indexOf("randomize") == 0) {
            var numPok = Math.floor(Math.random() * 5) + 2;
            var gen = Math.floor(Math.random() * 3);
            var format = Math.floor(Math.random() * 3);
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
            var weather = Math.floor(Math.random() * 5);
            var terrain = Math.floor(Math.random() * 22);
    	    var pc = Math.floor(Math.random() * 2);
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
            if (lowmessage.indexOf("-box") != -1) {format = Math.floor(Math.random() * 2) + 1;}
            else if (lowmessage.indexOf("box") != -1) {format = 0;}
            else if (lowmessage.indexOf("full") != -1) {format = 1;}
            else if (lowmessage.indexOf("preview") != -1) {format = 2;}
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
            else if (lowmessage.indexOf("weather") != -1 && weather == 0) {weather = Math.floor(Math.random() * 4) + 1;}
            if (lowmessage.indexOf("-terrain") != -1) {terrain = 0;}
            else if (lowmessage.indexOf("distortion") != -1) {terrain = 15;}
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
                case 0: rules += "Box\n"; break;
                case 1: rules += "Full\n"; break;
                case 2: rules += "Preview\n"; break;
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
    	    if (pc == 0) {rules += "Power Construct Disallowed\n";}
            if (items == 0) {
                switch(mzmax) {
                    case 0: rules += "Megas Allowed\n"; break;
                    case 2: rules += "Z-Moves Allowed\n"; break;
                    case 3: rules += "Megas, Z-Moves, Dynamax Disallowed\n"; break;
                    case 4: rules += "Dynamax Allowed\n"; break;
                }
            }
            //if (mzmax != 4) {rules += "Dynamax Clause\n"}
            if (leg == 0) {rules += "No Legendary Pokémon\n";}
            switch(weather) {
                case 0: rules += "No Starting Weather\n"; break;
                case 1: rules += "Sun\n"; break;
                case 2: rules += "Rain\n"; break;
                case 3: rules += "Sandstorm\n"; break;
                case 4: rules += "Hail\n"; break;
                case 5: rules += "Fog\n"; break;
            }
            switch(terrain) {
                case 0: rules += "Building Terrain\n"; break;
                case 1: rules += "Cave Terrain\n"; break;
                case 2: rules += "Snow Terrain\n"; break;
                case 3: rules += "Sand Terrain\n"; break;
                case 4: rules += "Tall Grass Terrain\n"; break;
                case 5: rules += "Ocean Terrain\n"; break;
                case 6: rules += "Volcano Terrain\n"; break;
                case 7: rules += "Burial Grounds Terrain\n"; break;
                case 8: rules += "Soaring Terrain\n"; break;
                case 9: rules += "Space Terrain\n"; break;
                case 10: rules += "Deep Forest Terrain\n"; break;
                case 11: rules += "Swamp Terrain\n"; break;
                case 12: rules += "Dojo Terrain\n"; break;
                case 13: rules += "Factory Terrain\n"; break;
                case 14: rules += "Power Plant Terrain\n"; break;
                case 15: rules += "Distortion World Terrain\n"; break;
                case 16: rules += "Prairie Terrain\n"; break;
                case 17: rules += "Ultra Space Terrain\n"; break;
                case 18: rules += "Grassy Terrain\n"; break;
                case 19: rules += "Misty Terrain\n"; break;
                case 20: rules += "Electric Terrain\n"; break;
                case 21: rules += "Psychic Terrain\n"; break;
            }
            message.channel.send(rules);
            /*if (message.channel.id == "135914249456320513") { message.channel.send("Reminder that this channel should be using Sunny weather."); }
            if (message.channel.id == "135869907349929985") { message.channel.send("Reminder that this channel should be using Rainy weather."); }
            if (message.channel.id == "136219179899420672") { message.channel.send("Reminder that this channel should be using Sandy weather."); }
            if (message.channel.id == "136247121203560450") { message.channel.send("Reminder that this channel should be using Hail weather."); }*/
        }
    }
}

function randWeather(message) {
    if (lowmessage.indexOf(",weather") == 0) {
        let weather = Math.floor(Math.random() * 5);
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
    if (lowmessage.indexOf(",terrain") == 0 || (lowmessage.indexOf(",active") == 0 && lowmessage.includes("terrain"))) {
        let terrain = Math.floor(Math.random() * 22);
        if (lowmessage.includes("passive")) { terrain = Math.floor(Math.random() * 18)}
        if (lowmessage.includes("active")) { terrain = 18 + Math.floor(Math.random() * 4); }
        switch(terrain) {
            case 0: message.channel.send("Building Terrain"); break;
            case 1: message.channel.send("Cave Terrain"); break;
            case 2: message.channel.send("Snow Terrain"); break;
            case 3: message.channel.send("Sand Terrain"); break;
            case 4: message.channel.send("Tall Grass Terrain"); break;
            case 5: message.channel.send("Ocean Terrain"); break;
            case 6: message.channel.send("Volcano Terrain"); break;
            case 7: message.channel.send("Burial Grounds Terrain"); break;
            case 8: message.channel.send("Soaring Terrain"); break;
            case 9: message.channel.send("Space Terrain"); break;
            case 10: message.channel.send("Deep Forest Terrain"); break;
            case 11: message.channel.send("Swamp Terrain"); break;
            case 12: message.channel.send("Dojo Terrain"); break;
            case 13: message.channel.send("Factory Terrain"); break;
            case 14: message.channel.send("Power Plant Terrain"); break;
            case 15: message.channel.send("Distortion World Terrain"); break;
            case 16: message.channel.send("Prairie Terrain"); break;
            case 17: message.channel.send("Ultra Space Terrain"); break;
            case 18: message.channel.send("Grassy Terrain"); break;
            case 19: message.channel.send("Misty Terrain"); break;
            case 20: message.channel.send("Electric Terrain"); break;
            case 21: message.channel.send("Psychic Terrain"); break;
        }
    }
}

function randAttribute(message) {
    if (lowmessage.indexOf(",attribute") == 0) {
        let weather = Math.floor(Math.random() * 5);
        switch(weather) {
            case 0: message.channel.send("Cool"); break;
            case 1: message.channel.send("Beauty"); break;
            case 2: message.channel.send("Cute"); break;
            case 3: message.channel.send("Smart"); break;
            case 4: message.channel.send("Tough"); break;
        }
    }
}

function randomizeList(message) {
    if (lowmessage.indexOf(",reorder") == 0 && lowmessage.indexOf("\n") != lowmessage.lastIndexOf("\n")) {
        var theList = message.content.split("\n");
        theList.shift();
        var theMessage = "";
        while (theList.length > 0) {
            var i = Math.floor(Math.random() * theList.length);
            theMessage += theList[i];
            theList.splice(i, 1);
            if (theList.length > 0) { theMessage += "\n"; }
        }
        message.channel.send(theMessage);
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
        if((rank == "Master")||(rank == "Hyper")) contestlog += ("$5,000 + " + rank + " " + attribute + " Ribbon [/b][img]" + ribbon + "[/img]\n\n and () get $4,000\n\n and () get $3,000\n\n and () get $2,000\n\n");
        if((rank == "Super")||(rank == "Normal")) contestlog += ("$4,000 + " + rank + " " + attribute + " Ribbon [/b][img]" + ribbon + "[/img]\n\n and () get $3,000\n\n and () get $2,000\n\n and () get $1,000\n\n");
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
        var allpokes = fs.readFileSync('Pokemon.txt', 'utf8');
        var theList = allpokes.toLowerCase().split('\n');
        allpokes = allpokes.split('\n');
        for (var i = 0; i < theList.length; i++) { theList[i] = theList[i].split(",")[0]; }
        var x = ss.findBestMatch(pokemon, theList).bestMatchIndex;
        /*for(var x = 0; x < allpokes.length; x++)
        {
            if(pokemon.toLowerCase() == allpokes[x].split('/')[0].toLowerCase())
            {*/
        var srdamage = 12.5;
        switch(allpokes[x].split(',')[1])
        {
            case "FR": srdamage *= 2; break;
            case "I": srdamage *= 2; break;
            case "FI": srdamage /= 2; break;
            case "GD": srdamage /= 2; break;
            case "FL": srdamage *= 2; break;
            case "B": srdamage *= 2; break;
            case "S": srdamage /= 2; break;
            
        }
        switch(allpokes[x].split(',')[2])
        {
            case "FR": srdamage *= 2; break;
            case "I": srdamage *= 2; break;
            case "FI": srdamage /= 2; break;
            case "GD": srdamage /= 2; break;
            case "FL": srdamage *= 2; break;
            case "B": srdamage *= 2; break;
            case "S": srdamage /= 2; break;
            
        }
        var srMessage = allpokes[x].split(',')[0];
        srMessage += " would take ";
        srMessage += srdamage;
        srMessage += "% damage, which is ";
        var damage = Math.floor((srdamage * allpokes[x].split(',')[3]) / 100);
        srMessage += damage + " HP damage!"
        message.channel.send(srMessage);
        return;
            /*}
        }
        message.channel.send("I'm afraid " + pokemon + " is not in my types database.  Check that you spelled it correct, and remember my research in the Galar region isn't yet complete.");*/
    }
}

function effectiveness(message) {
    if(lowmessage.indexOf(",effective ") == 0)
    {
        var pokemon = lowmessage.split(",effective ")[1];
        //var fs = require('fs');
        var allpokes = fs.readFileSync('Pokemon.txt', 'utf8');
        var theList = allpokes.toLowerCase().split('\n');
        allpokes = allpokes.split('\n');
        for (var i = 0; i < theList.length; i++) { theList[i] = theList[i].split(",")[0]; }
        var x = ss.findBestMatch(pokemon, theList).bestMatchIndex;
        /*for(var x = 0; x < allpokes.length; x++)
        {
            if(pokemon.toLowerCase() == allpokes[x].split('/')[0].toLowerCase())
            {*/
        var damage = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        switch(allpokes[x].split(',')[1])
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
        switch(allpokes[x].split(',')[2])
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
        
        var effectiveMessage = 'Before abilities, ' + allpokes[x].split(',')[0] + ' would take:\n'
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
            /*}
        }
        message.channel.send("I'm afraid " + pokemon + " is not in my types database.  Check that you spelled it correct, and remember my research in the Galar region isn't yet complete.");*/
    }
}

function effectivenessCommand(interaction) {
    let pokemon = interaction.options.getString('pokemon');
    //var fs = require('fs');
    var allpokes = fs.readFileSync('Pokemon.txt', 'utf8');
    var theList = allpokes.toLowerCase().split('\n');
    allpokes = allpokes.split('\n');
    for (var i = 0; i < theList.length; i++) { theList[i] = theList[i].split(",")[0]; }
    var x = ss.findBestMatch(pokemon, theList).bestMatchIndex;
    /*for(var x = 0; x < allpokes.length; x++)
    {
        if(pokemon.toLowerCase() == allpokes[x].split('/')[0].toLowerCase())
        {*/
    var damage = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    switch(allpokes[x].split(',')[1])
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
    switch(allpokes[x].split(',')[2])
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
    
    var effectiveMessage = 'Before abilities, ' + allpokes[x].split(',')[0] + ' would take:\n'
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
    if (interaction.channelId == botCommands) { interaction.reply(effectiveMessage); }
    else { interaction.reply({ content: effectiveMessage, ephemeral: true }); }
    return;
        /*}
    }
    message.channel.send("I'm afraid " + pokemon + " is not in my types database.  Check that you spelled it correct, and remember my research in the Galar region isn't yet complete.");*/
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
        var allpokes = fs.readFileSync('Pokemon.txt', 'utf8').split('\n');
        var covers = [0, 0, 0, 0, 0, 0]
        for(var x = 0; x < allpokes.length; x++)
        {
            var damage = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1]
            switch(allpokes[x].split(',')[1])
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
            switch(allpokes[x].split(',')[2])
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
        var pokemonList = lowmessage.split(",beatup ")[1];
        var pokemon = pokemonList.split(", ");
        for (var i = 0; i < pokemon.length; i++) {
            if (!isNaN(pokemon[i])) {
                var beatUpBP = Math.floor(((pokemon[i] - 99) / 2) / 10) + 5;
                message.channel.send("A Pokémon with a base URPG Attack stat of " + pokemon[i] + " would have a base " + beatUpBP + " power Beat Up!");
            }
            else {
                var allpokes = fs.readFileSync('Pokemon.txt', 'utf8');
                var theList = allpokes.toLowerCase().split('\n');
                allpokes = allpokes.split('\n');
                for (var j = 0; j < theList.length; j++) { theList[j] = theList[j].split("/")[0]; }
                var x = ss.findBestMatch(pokemon[i], theList).bestMatchIndex;
                /*var found = false;
                for(var x = 0; x < allpokes.length; x++) {
                    if(pokemon[i].toLowerCase() == allpokes[x].split('/')[0].toLowerCase()) {*/
                var beatUpBP = Math.floor(((allpokes[x].split(',')[4] - 99) / 2) / 10) + 5;
                message.channel.send(allpokes[x].split(',')[0] + " would have a base " + beatUpBP + " power Beat Up!");
                found = true;
                        /*break;
                    }
                }
                if (!found) { message.channel.send("I'm afraid " + pokemon[i] + " is not in my base stats database.  Make sure you spelled it right and remember that my research in the Galar region isn't yet complete, but I can give you the base power from its URPG attack stat with `,beatup 299` or similar."); }*/
            }
        }
    }
}

function clauses(message) {
    if (lowmessage.indexOf(",clause") == 0) {
        //var clauses = lowmessage.split(" ");
        //for (var i = 0; i < clauses.length; i++) {
        var theMessage = new Discord.MessageEmbed().setTitle("Battle Types and Rules:");
    	if (lowmessage.includes("standard")) { theMessage.addField("Standard Clauses:", "Shorthand for Sleep, Freeze, OHKO, Accuracy, Evasion, Imprison Clauses as well as Dynamax, Z-Moves, Megas, and Power Construct disallowed and default weather and terrain.  For more information on any of theses, see the appropriate `,clause` help (and you can include multiple in the same command)."); }
        if (lowmessage.indexOf("public") != -1) { theMessage.addField("Public:", "All Pokemon and moves are sent in the public chat. A dice is rolled to determine who sends first unless the battlers agree on one trainer to send first. A gym leader can choose who sends first.\nIt is important to note that in battle modes in which you select your moves in the chat or thread, you must alternate sending your Pokemon and moves first. After a battler sends their Pokemon out first, the other battler sends their Pokemon and move. Afterwards, the person who sent their Pokemon first sends their move second. Then battlers take turns alternating sending first. If a single Pokemon is knocked out in a turn, replacing that Pokemon does not count as sending first or second, so the alternation of sending first continues normally. If both Pokemon are knocked out in a single turn, then the battlers select their Pokemon as though they are continuing alternating. Sending implied moves, such as continuing Outrage, recharging for Hyper Beam, and a battler sending their last remaining Pokemon still count for alternating sending first or second."); }
        if (lowmessage.indexOf("private")!= -1) { theMessage.addField("Private:", "All Pokemon and moves are sent privately to the referee."); }
        if (lowmessage.indexOf("gsc") != -1) { theMessage.addField("GSC:", "AAll Pokemon have no abilities (excluding Truant/Defeatist/Slow Start on Slakoth/Slaking/Archen/Archeops/Regigigas respectively). Whether a move is physical or special is determined by its type."); }
        if (lowmessage.indexOf(" rse") != -1) { theMessage.addField("RSE:", "Pokemon have abilities. Whether a move is physical or special is determined by its type."); }
        if (lowmessage.indexOf("sm") != -1) { theMessage.addField("SM:", "All mechanics function as per the latest game."); }
        if (lowmessage.indexOf("full") != -1) { theMessage.addField("Full:", "A complete team of Pokemon, with abilities and held items, is sent to the referee prior to the battle. Leads are selected after the team is sent."); }
        if (lowmessage.indexOf("preview") != -1) { theMessage.addField("Preview:", "A complete team of Pokemon, with abilities and held items, is sent to the referee prior to the battle. The referee will reveal both teams before leads are selected."); }
        //if (lowmessage.indexOf("open") != -1) { theMessage.addField("Open:", "Pokemon are sent during the battle – teams are not predetermined. **NOW DEFUNCT: See `,clause box` for the current version.**"); }
        if (lowmessage.indexOf("box") != -1 || lowmessage.includes("open")) { theMessage.addField("Box:", "Trainers send their full stats or a subset (of any size) of their Pokémon to use to the ref (i.e. “all”, “not Meowth”, “Bulbasaur, Charmander, Squirtle, Pikachu”). The ref will then announce those selections and the trainers battle as if those were the Pokémon they own, choosing which of those Pokémon as they go and sending gender, item, and ability when the Pokémon is first sent out."); }
        if (lowmessage.indexOf("double") != -1) { theMessage.addField("Double Battle:", "In a Double Battle, each trainer has two Pokemon out at the same time. Not compatible with Public. When Pokemon are knocked out, if the battler has more Pokemon available in their party, they must send Pokemon to replace them at the end of the turn.\nEach Pokemon is able to target any other Pokemon on the field, including its own ally. However, there are moves that affect multiple Pokemon at once. These moves can be found by clicking here. When a move hits more than one Pokemon at once, its base power is reduced to 75% of its original value. Furthermore, each instance of the move hitting a Pokemon requires its own accuracy roll, if the move is less than 100% accurate. Likewise, the secondary effects of moves that target multiple Pokemon require an individual roll for each target that is hit.\nWhen Reflect, Light Screen, and Aurora Veil are used in a Double Battle, they benefit both Pokemon on the side it is used. However, instead of halving damage like in Single Battles, the damage is reduced by 1/3 instead."); }
        if (lowmessage.indexOf("multi") != -1) { theMessage.addField("Multi Battle:", "This is a Double Battle, but you are teamed with another battler. Each battler only controls one Pokemon at a time. Each battler must send the same amount of Pokemon. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("triple") != -1) { theMessage.addField("Triple Battle:", "Three Pokemon are used at the same time by both sides. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("rotation") != -1) { theMessage.addField("Rotation Battle:", "Three Pokemon are sent at the same time by both sides, but one Pokemon must be sent as the front Pokemon, while the other two are on standby. Only the front Pokemon can attack, and it is also the target of all attacks. However, a player may rotate any of their standby Pokemon to the front and attack with it the same turn. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("wonder") != -1 || lowmessage.indexOf("launcher") != -1) { theMessage.addField("Wonder Launcher:", "Battlers are able to use special points to purchase items during the battle to use on their Pokemon. Each battler starts with 0 points, and each battler gains 1 point at the end of each turn. If a battler has 14 unused points, they will gain no additional points until they uses some. When an item is purchased, it must be used immediately. When an item is purchased and used, the battler forgoes their move that turn to use the item, and the opponent is aware of the use of the item. Items that increase a Pokemon’s stat stages or critical hit stages and ‘Urge Items’ can only be used on a controlled active Pokemon. Revive and Max Revive can only be used on fainted Pokemon. The rest of the items can be used on any Pokemon in the battler’s party. If a battler purchases an item that is unable to do anything for the battler’s current party, the item will do nothing, and points will still be lost. Effects and prices of items can be found here: https://bulbapedia.bulbagarden.net/wiki/Wonder_Launcher"); }
        if (lowmessage.indexOf("gameboy") != -1) { theMessage.addField("Gameboy:", "Each battler selects up to four moves for each of their Pokemon for the battle before it begins. This rule is only compatible with battle modes in which you must send your Pokemon and moves privately to the ref."); }
        if (lowmessage.indexOf("sky") != -1) { theMessage.addField("Sky Battle:", "Each battler may only use Pokemon that qualify for Sky Battles, generally Flying and Levitating Pokemon, though not all. A complete list of Gen 1-8 mechanics/eligibility can be found here: https://docs.google.com/document/d/1SbviFnTGezheNfPHtdAtNcSaRjxuNeP3Yk4ywD7HPXU/edit?usp=sharing\n*Not a valid rule for gym battles.*"); }
        if (lowmessage.indexOf("inverse") != -1) { theMessage.addField("Inverse Battle:", "Type effectiveness is reversed for the battle. 4x becomes 1/4x, 2x becomes 1/2x and vice versa. Immunities are treated as 2x super effective (the other type still applies, if there is one).\n*Not a valid rule for gym battles.*"); }
        if (lowmessage.indexOf("sleep") != -1 || lowmessage.indexOf("slp") != -1) { theMessage.addField("Sleep Clause:", "Only one Pokemon per side may be put to sleep at a time by the opponent. Any additional attempts will fail. Rest does not count towards Sleep Clause."); }
        if (lowmessage.indexOf("freeze") != -1 || lowmessage.indexOf("frz") != -1) { theMessage.addField("Freeze Clause:", "Only one Pokemon per side may be frozen. Any additional freeze chances will fail."); }
        if (lowmessage.indexOf("ohko") != -1) { theMessage.addField("No OHKO Moves:", "Fissure, Guillotine, Horn Drill, and Sheer Cold may not be selected."); }
        if (lowmessage.indexOf("acc") != -1) { theMessage.addField("Accuracy Clause:", "Moves that have a 100% chance of lowering accuracy will not lower accuracy. Other effects like damage from Mud-Slap will still occur. If a Z-Effect would lower an opponent’s Accuracy, this effect is not applied, however the move is still considered a Z-Move for all other purposes."); }
        if (lowmessage.indexOf("eva") != -1) { theMessage.addField("Evasion Clause:", "Moves that increase evasion directly, Double Team and Minimize, will fail. If a Z-Effect would raise the user’s Evasion, this effect is not applied, however the move is still considered a Z-Move for all other purposes."); }
        if (lowmessage.indexOf("species") != -1) { theMessage.addField("Species Clause:", "Each battler may not send more than one of a single species of Pokemon, defined by Pokedex number."); }
        if (lowmessage.indexOf("item clause") != -1 || lowmessage.indexOf("itemc") != -1) { theMessage.addField("Item Clause:", "Each battler may not equip more than one of a single type of item, defined by its name."); }
        if (lowmessage.indexOf("mega") != -1) { theMessage.addField("Megas Clause:", "Battlers may not Mega Evolve their Pokemon. Mega Stones are still permitted as held items."); }
        if (lowmessage.indexOf("legend") != -1) { theMessage.addField("Legends Clause:", "Battlers may not use Legendary Pokemon."); }
        if (lowmessage.indexOf("zm") != -1 || lowmessage.indexOf("z-m") != -1) { theMessage.addField("Z-Moves Clause:", "Battles may not use Z-Moves. Z-Crystals are still permitted as held items."); }
        if (lowmessage.indexOf("imprison") != -1) { theMessage.addField("Imprison Clause:", "Fully prevents Imprison from being used. Referees must prompt battlers to choose a new move if Imprison is selected. Imprison may not be selected by Sleep Talk/Metronome/Assist, and will cause a reroll if rolled. Imprison Clause is automatically turned on for any Gym, Battle Frontier, or Elite Four/Champion matches. This may not be removed. Imprison Clause may be turned off for Casual Battles, as well as Street League Gyms."); }
        if (lowmessage.indexOf("dynamax") != -1) { theMessage.addField("Dynamax Clause:", "Disallows Dynamaxing. Dynamax is a mechanic where a Pokemon grows in size for 3 turns, doubling its max HP, and all moves change into Max Moves. Max moves are stronger moves than their regular counterparts, and provide a boost or weather/terrain effect. Gigantimax has been rolled into Dynamax for URPG; a Gigantimax Pokemon may use either Dynamaxed moves, or their Gigantimax move, at any time for the 3 turn duration. Dynamax may not be used in the same battle as either Mega or Z-Moves."); }
	message.channel.send({ embeds: [theMessage] });
    }
}

function links(message) {
    if (lowmessage.indexOf(",calc") == 0) { message.channel.send("https://pokemonurpg.com/pokemonurpg-dot-com/calcs/battlev3.html"); }
    if (lowmessage.indexOf(",info") == 0) { message.channel.send("https://pokemonurpg.com/info/"); }
    if (lowmessage.indexOf(",forum") == 0) { message.channel.send("https://forum.pokemonurpg.com/"); }
    if (lowmessage.indexOf(",mart") == 0) { message.channel.send("http://forum.pokemonurpg.com/showthread.php?tid=1682"); }
    if (lowmessage.indexOf(",berry") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1686"); }
    if (lowmessage.indexOf(",starterarchive") == 0 || lowmessage.indexOf(",startarchive") == 0 || lowmessage.indexOf(",starterlist") == 0 || lowmessage.indexOf(",startlist") == 0) { message.channel.send("https://web.archive.org/web/20171105045154/https://forums.bulbagarden.net/index.php?threads/list-of-chosen-starters.174783/"); } 
    else if (lowmessage.indexOf(",start") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1722"); }
    if (lowmessage.indexOf(",bmgarchive") == 0) { message.channel.send("https://pokemonurpg.com/archive/urpg.html"); }
    if (lowmessage.indexOf(",pxrarchive") == 0) { message.channel.send("https://pokemonurpg.com/archive/pxr/\nNote: There is one known issue with the CSS, at least in Chrome (probably in other browsers as well) because PXR serves its CSS files over HTTP instead of HTTPS. You can make the pages appear correctly by clicking on the little shield on the right side of the URL bar and click \"Load unsafe scripts\""); }
    if (lowmessage.indexOf(",refund") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=7975"); }
    if (lowmessage.indexOf(",gen8") == 0 || lowmessage.indexOf(",galar") == 0) { message.channel.send("Original: <https://docs.google.com/document/d/17LL_-ncndCe4dZfrMwovYJKaTT4em7WBitLmK_AA1AM/edit>\nIoA: <https://docs.google.com/document/d/1z_stsUXEeimGa6kjdkQdcdCdxWkIFdvdaP8psxzt6k0/edit?usp=sharing>\nCT: <https://docs.google.com/document/d/1XrQ6G0FOEr4OBFXUMECvPovydTj_oiqMXSs7TJbQ_hc/edit?usp=sharing>"); }
    if (lowmessage.indexOf(",ioa") == 0) { message.channel.send("https://docs.google.com/document/d/1z_stsUXEeimGa6kjdkQdcdCdxWkIFdvdaP8psxzt6k0/edit?usp=sharing"); }
    if (lowmessage.indexOf(",ct") == 0) { message.channel.send("https://docs.google.com/document/d/1XrQ6G0FOEr4OBFXUMECvPovydTj_oiqMXSs7TJbQ_hc/edit?usp=sharing"); }
    if (lowmessage.indexOf(",nukem") == 0) { message.channel.send("https://pokemonurpg.com/info/general/project-nukem/"); }
    if (lowmessage.indexOf(",refpedia") == 0) { message.channel.send("https://pokemonurpg.com/info/battles/reffing-encyclopedia/"); }
    if (lowmessage.indexOf(",gym") == 0) { message.channel.send("https://pokemonurpg.com/info/battles/champion-elite-four-gym-leaders/"); }
    if (lowmessage.indexOf(",updategym") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=4417"); }
    if (lowmessage.indexOf(",chartrse") == 0) { message.channel.send("https://docs.google.com/spreadsheets/d/1ImPbiw8B_hhC6bmQD8BJarJR9SIoq7rTUWCrWc2iKWo/edit#gid=38422135"); }
    if (lowmessage.indexOf(",chartoras") == 0) { message.channel.send("https://docs.google.com/spreadsheets/d/1fFEREf42ZNBkesU0GbNPH9veIFGp0xDxxgIdqVufz7Q/edit#gid=38422135"); }
    if (lowmessage.indexOf(",chartdppt") == 0) { message.channel.send("https://docs.google.com/spreadsheets/d/19n2yGw38xVqak0GTVjB4dN4M1k_Ix7WEnUsufT9uRes/edit?usp=sharing"); }
    if (lowmessage.indexOf(",chartterrain") == 0) { message.channel.send({ embeds: [new Discord.MessageEmbed().setImage("https://media.discordapp.net/attachments/275674541915766796/737905447910113400/unknown.png")] }); }
    if (lowmessage.indexOf(",priority") == 0) { message.channel.send({ embeds: [new Discord.MessageEmbed().setImage("https://media.discordapp.net/attachments/362761745275551744/802346860408864808/unknown.png")] }); }
    if (lowmessage.indexOf(",job") == 0) { message.channel.send("https://forum.pokemonurpg.com/forumdisplay.php?fid=122"); }
    if (lowmessage.indexOf(",nervous") == 0) { message.channel.send("https://docs.google.com/document/d/1CG-djhjuUixajoyGeVcbx7Tfsb3XS50LA1UBSYAljOI/edit?usp=sharing"); }
    if (lowmessage.indexOf(",underground") == 0 || lowmessage.indexOf(",ug") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1720"); }
    if (lowmessage.indexOf(",judgepedia") == 0) { message.channel.send("https://pokemonurpg.com/info/contests/judging-encyclopedia/"); }
    if (lowmessage.indexOf(",recruit") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=9944" /*"https://forum.pokemonurpg.com/showthread.php?tid=11075"*/); }
    if (lowmessage.indexOf(",mentor") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=9898"); }
    if (lowmessage.indexOf(",legendlog") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=7034"); }
    if (lowmessage.indexOf(",legendlist") == 0) { message.channel.send("https://pokemonurpg.com/info/general/legendary-list/"); }
    if (lowmessage.indexOf(",fensketchfetch") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=9796"); }
    if (lowmessage.indexOf(",trade") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1717"); }
    if (lowmessage.indexOf(",parkshop") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=1701"); }
    else if (lowmessage.indexOf(",park") == 0) { message.channel.send("https://forum.pokemonurpg.com/forumdisplay.php?fid=73"); }
    if (lowmessage.indexOf(",tierlist") == 0) { message.channel.send("https://docs.google.com/spreadsheets/d/19oUWIgeaXLa6u1Rrumrb6-5rT3hAf3Scg5DWBwllNzQ/edit#gid=0"); }
    if (lowmessage.indexOf(",goldstudy") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=11095"); }
    if (lowmessage.indexOf(",chartadv") == 0) { message.channel.send("https://docs.google.com/spreadsheets/d/1iyB5DucEpkFCtdo41A0s3Cw0dTgYXJfH35zt6F-QDZQ/edit?usp=sharing"); }
    if (lowmessage.indexOf(",hiddenpower") == 0) { message.channel.send("https://forum.pokemonurpg.com/showthread.php?tid=10218"); }
    if (lowmessage.indexOf(",chartvalue") == 0) { message.channel.send("https://docs.google.com/spreadsheets/d/1qiv1avIUXhtLB-z9-Pd6dl0Ub4mc58KDhPHprgbDaHI/edit"); }
    if (lowmessage.indexOf(",gmt") == 0) { message.channel.send(new Date().toString()); }
    for (var x = 1; x < tempLinks.content.split("\n").length; x++) {
        if (lowmessage.indexOf("," + tempLinks.content.split("\n")[x].split(" ")[0]) == 0) { message.channel.send(tempLinks.content.split("\n")[x].split(" ")[1]); }
    }
}

function wildcards(message) {
    if (lowmessage.indexOf(",wc") == 0) { lowmessage = lowmessage.replace(/,wc/, ",wildcard"); }
    if (lowmessage.indexOf(",wildcard ") == 0) {
        var wclist = "";
        switch (lowmessage.split(" ") [1]){
            case "normal": wclist = "Clefable, Azumarill, Granbull"; break;
            case "grass": wclist = "Crustle, Comfey, Sudowoodo"; break;
            case "fire": wclist = "Leafeon, Darmanitan-Galar (Zen Mode only), Salamence, Solrock"; break;
            case "water": wclist = "Dragalge, Beartic, Hoenn Fossils, Masquerain"; break;
            case "electric": wclist = "Porygon Line, Golurk, Probopass"; break;
            case "ice": wclist = "Quagsire, Slowbro-Kanto, Slowking-Kanto, Kingdra, Empoleon"; break;
            case "fighting": wclist = "Metagross, Electivire, Incineroar"; break;
            case "poison": wclist = "Gliscor, Accelgor, Breloom"; break;
            case "ground": wclist = "Duraludon, Tyranitar, Cacturne"; break;
            case "flying": wclist = "Volcarona, Sirfetch'd, Decidueye"; break;
            case "psychic": wclist = "Ninetales-Kanto, Darmanitan-Unova (Zen Mode only), Mienshao, Golduck"; break;
            case "bug": wclist = "Kabutops, Flygon, Drapion, Falinks"; break;
            case "rock": wclist = "Sableye, Torterra, Galar Fossils (only two at a time), Steelix"; break;
            case "dragon": wclist = "Charizard, Gyarados, Ampharos, Sceptile"; break;
            case "ghost": wclist = "Rotom (only two at a time), Houndoom, Kecleon"; break;
            case "steel": wclist = "Blastoise, Vikavolt, Dhelmise"; break;
            case "dark": wclist = "Gengar, Gyarados, Gothitelle"; break;
            case "fairy": wclist = "Delphox, Altaria, Blissey Line"; break;
            default: wclist = "Normal: Clefable, Azumarill, Granbull\nGrass: Crustle, Comfey, Sudowoodo\nFire: Leafeon, Darmanitan-Galar (Zen Mode only), Salamence, Solrock\nWater: Dragalge, Beartic, Hoenn Fossils, Masquerain\nElectric: Porygon Line, Golurk, Probopass\nIce: Quagsire, Slowbro-Kanto, Slowking-Kanto, Kingdra, Empoleon\nFighting: Metagross, Electivire, Incineroar\nPoison: Gliscor, Accelgor, Breloom\nGround: Duraludon, Tyranitar, Cacturne\nFlying: Volcarona, Sirfetch'd, Decidueye\nPsychic: Ninetales-Kanto, Darmanitan-Unova (Zen Mode only), Mienshao, Golduck\nBug: Kabutops, Flygon, Drapion, Falinks\nRock: Sableye, Torterra, Galar Fossils (only two at a time), Steelix\nDragon: Charizard, Gyarados, Ampharos, Sceptile\nGhost: Rotom (only two at a time), Houndoom, Kecleon\nSteel: Blastoise, Vikavolt, Dhelmise\nDark: Gengar, Gyarados, Gothitelle\nFairy: Delphox, Altaria, Blissey Line";
        }
        message.channel.send(wclist);
    }
    else if (lowmessage.indexOf(",wildcard") == 0) { message.channel.send("Normal: Clefable, Azumarill, Granbull\nGrass: Crustle, Comfey, Sudowoodo\nFire: Leafeon, Darmanitan-Galar (Zen Mode only), Salamence, Solrock\nWater: Dragalge, Beartic, Hoenn Fossils, Masquerain\nElectric: Porygon Line, Golurk, Probopass\nIce: Quagsire, Slowbro-Kanto, Slowking-Kanto, Kingdra, Empoleon\nFighting: Metagross, Electivire, Incineroar\nPoison: Gliscor, Accelgor, Breloom\nGround: Duraludon, Tyranitar, Cacturne\nFlying: Volcarona, Sirfetch'd, Decidueye\nPsychic: Ninetales-Kanto, Darmanitan-Unova (Zen Mode only), Mienshao, Golduck\nBug: Kabutops, Flygon, Drapion, Falinks\nRock: Sableye, Torterra, Galar Fossils (only two at a time), Steelix\nDragon: Charizard, Gyarados, Ampharos, Sceptile\nGhost: Rotom (only two at a time), Houndoom, Kecleon\nSteel: Blastoise, Vikavolt, Dhelmise\nDark: Gengar, Gyarados, Gothitelle\nFairy: Delphox, Altaria, Blissey Line"); }
}

function wildcardsCommand(interaction) {
    let type = interaction.options.getString('type');
    let wclist = "";
    switch (type){
        case "normal": wclist = "Clefable, Azumarill, Granbull"; break;
        case "grass": wclist = "Crustle, Comfey, Sudowoodo"; break;
        case "fire": wclist = "Leafeon, Darmanitan-Galar (Zen Mode only), Salamence, Solrock"; break;
        case "water": wclist = "Dragalge, Beartic, Hoenn Fossils, Masquerain"; break;
        case "electric": wclist = "Porygon Line, Golurk, Probopass"; break;
        case "ice": wclist = "Quagsire, Slowbro-Kanto, Slowking-Kanto, Kingdra, Empoleon"; break;
        case "fighting": wclist = "Metagross, Electivire, Incineroar"; break;
        case "poison": wclist = "Gliscor, Accelgor, Breloom"; break;
        case "ground": wclist = "Duraludon, Tyranitar, Cacturne"; break;
        case "flying": wclist = "Volcarona, Sirfetch'd, Decidueye"; break;
        case "psychic": wclist = "Ninetales-Kanto, Darmanitan-Unova (Zen Mode only), Mienshao, Golduck"; break;
        case "bug": wclist = "Kabutops, Flygon, Drapion, Falinks"; break;
        case "rock": wclist = "Sableye, Torterra, Galar Fossils (only two at a time), Steelix"; break;
        case "dragon": wclist = "Charizard, Gyarados, Ampharos, Sceptile"; break;
        case "ghost": wclist = "Rotom (only two at a time), Houndoom, Kecleon"; break;
        case "steel": wclist = "Blastoise, Vikavolt, Dhelmise"; break;
        case "dark": wclist = "Gengar, Gyarados, Gothitelle"; break;
        case "fairy": wclist = "Delphox, Altaria, Blissey Line"; break;
        case null: wclist = "Normal: Clefable, Azumarill, Granbull\nGrass: Crustle, Comfey, Sudowoodo\nFire: Leafeon, Darmanitan-Galar (Zen Mode only), Salamence, Solrock\nWater: Dragalge, Beartic, Hoenn Fossils, Masquerain\nElectric: Porygon Line, Golurk, Probopass\nIce: Quagsire, Slowbro-Kanto, Slowking-Kanto, Kingdra, Empoleon\nFighting: Metagross, Electivire, Incineroar\nPoison: Gliscor, Accelgor, Breloom\nGround: Duraludon, Tyranitar, Cacturne\nFlying: Volcarona, Sirfetch'd, Decidueye\nPsychic: Ninetales-Kanto, Darmanitan-Unova (Zen Mode only), Mienshao, Golduck\nBug: Kabutops, Flygon, Drapion, Falinks\nRock: Sableye, Torterra, Galar Fossils (only two at a time), Steelix\nDragon: Charizard, Gyarados, Ampharos, Sceptile\nGhost: Rotom (only two at a time), Houndoom, Kecleon\nSteel: Blastoise, Vikavolt, Dhelmise\nDark: Gengar, Gyarados, Gothitelle\nFairy: Delphox, Altaria, Blissey Line";
    }
    if (type || interaction.channelId == botCommands) { interaction.reply(wclist); }
    else { interaction.reply({ content: wclist, ephemeral: true }); }
    return;
}

/*function fairyGIF(message) {
    if (lowmessage.indexOf(",") == 0 && lowmessage.indexOf("fairy") != -1 && message.channel.id == botCommands && !message.author.bot) {
        message.channel.send({
            embed: {
                thumbnail: {
                    url: 'https://cdn.discordapp.com/attachments/135864828240592896/559960120398839809/Fairy_Pokemon.gif'
                }
            }
        })
    }
}*/

function anonymousReport(message) {
    if (lowmessage.indexOf("noreply:") == 0 || lowmessage.indexOf("no reply:") == 0) {
        var anonReport = "Anonymous Report:```"
        anonReport += message.content;
        anonReport += "```"
        bot.channels.cache.get(anonymousReportChannel).send(anonReport);
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
        bot.channels.cache.get(anonymousReportChannel).send(anonReport);
        message.author.send("Thank you for your report!  It has been sent to the staff team for review.  When they have a reply, I'll pass it back to you!");
    }
}

function help(message) {
    if (lowmessage.indexOf(",help") == 0) {
        if (lowmessage.includes("value")) {
            message.channel.send("Calculate trade values!  Syntax: begin with `,value ` then the name of the unevolved form.  If it needs evo items, follow that with the number of evo items.  Then list each EM and HA it has (**excluding** HMs), with exact formatting for TMs, in any order.  Separate terms with `, `.  Example: `,value Riolu, 1, Ice Punch, BM High Jump Kick, Bulk Up, HA Justified, Blaze Kick`.  If a move does not show up with TM## before it and is supposed to be a TM on that Pokémon, double check formatting.  Anything that's not formatted **exactly** correct (case insensitive) will be treated as a daycare move.");
        }
        else if (lowmessage.indexOf("addstat") != -1) {
            message.channel.send("Use `,addstat NAME LINK` to have `,stats NAME` pull up `NAME's stats: LINK`.");
        }
        else if (lowmessage.indexOf("stat") != -1) {
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
            message.channel.send("`,mentionrefs`, `,mentionjudges`, `,mentioncurators`, `,mentiongraders`, `,mentionrangers`, or `,mentionarbiters`: Pings the applicable role.  Required role: Applicable section senior.\n`,mentionforumffa`: Pings Forum FFA role.  Required role: Forum FFA Host.\n`,mentionffa` or `!ffa -p`: Pings everyone who wants to be notified about FFAs. Required role: Referee. Required channel: <#136222872371855360>, <#269634154101080065>, or <#653328600170364953>\n`,mentioncoordinators`: Pings everyone who wishes to be notified about contests happening. Required role: Judge.\n`,mentionroyales`: Pings everyone who wishes to be notified about Battle Royales happening. Required role: Referee.\n`,mentionjob`: Pings job role for the various weekly reminders. Required role: Content Upkeeper.\n`,mentionstaff`: Pings staff if something needs addressing quickly.  Required role: Member.\n`,mentioncontentupkeeper`, `,mentiongamedesign`, `,mentionevents`, `,mentiontechnicalteam`: Pings the respective team if something of theirs needs addressing.  Required role: Member.\n\n**Notes about all mention functions:**\nMention everyone permission allows use of a ping without the mentioned role.\nYou may put a message after the ping command and it will be copied after the ping, so that looking at mentions will directly show that information.");
        }
        else if (lowmessage.indexOf("profession") != -1 || lowmessage.indexOf("ref") != -1 || lowmessage.indexOf("judge") != -1) {
            message.channel.send("`,payday @MEMBER1 @MEMBER2...`: Lets you know which of the mentioned members has received Pay Day this week, and adds all others to the log of who has. Required role: Referee or Judge.\n`,pickup @MEMBER1 @MEMBER2...`: Exactly the same as `,payday` but for Pickup.\n`,pin MESSAGEID`, `,unpin MESSAGEID`: Pins/unpins message with ID MESSAGEID in this channel. Required role/channel: Referee in battle chat or Judge in contest chat.\n`,refadd ISSUE`: report an issue such as Infohub description or calc error.  Required role: referee.\n`,refremove NUMBER`: Removes the NUMBERth issue from the ref issues.  Required role: Senior Referee or Content Upkeeper.")
        }
        else if (lowmessage.indexOf("staff") != -1 || lowmessage.indexOf("mod") != -1 || lowmessage.indexOf("auth") != -1 || lowmessage.indexOf("restrict") != -1) {
            message.channel.send("**Restricted Commands:**\nAll `,mention` functions: See `,help mention` for more info.\nRef or Judge specific commands: See `,help profession`.\n`,anonreply # message`: Sends a reply to the `reply:` anonymous report with the given number. Required channel: staff or any in Teams & Projects.\n`,publicarchive` `,privatearchive`: Archives the channel, putting it in the archive category and removes access to all non-staff. Use `,archive public` or `,publicarchive` for public channels and `,archive private`, or `,privatearchive` for private channels. Required role: content-upkeeper\n`,contestboss`: Creates the temporary rooms for a contest boss. Required role: Death Eater.\n`,reftest`, `,judgetest`, or `,rangertest`: Creates a temporary test channel. If the command contains a mention, also adds that member to the channel. Required role: Appropriate section senior.\n`,end`: Deletes a temporary channel. Only works in a temporary channel and requires the same role required to create that channel.\n`,fixorder`: Resets profession chat order. Required role: content-upkeeper Manage Channels permission. I will automatically run this on startup as well.\n`,pkmnspoilerseason THING-TO-SPOIL`: changes the name of <#440004235635982336> to #spoilers-THING-TO-SPOIL and removes pkmnspoilers role from everyone. Required role: content-upkeeper or Manage Channels permission.\n`,otherspoilerseason THING-TO-SPOIL`: changes the name of <#597314223483387905> to #spoilers-THING-TO-SPOIL and removes otherspoilers role from everyone. Required role: content-upkeeper or Manage Channels permission.\n`,newdiscussion CHANNEL-NAME`: Creates a new staff discussion channel with the given name. Required channel: staff.\n`,newproject CHANNEL-NAME`: Creates a new project discussion channel with the given name. Required channel: Any in the Teams & Projects category.");
        }
        else if (lowmessage.indexOf("role") != -1) {
            message.channel.send("Command moved to Kauri. See `!help role` for more info."); //message.channel.send("**Self-assignable roles:**\npkmnspoilers: Access to <#440004235635982336>.\notherspoilers: Access to <#597314223483387905>.\nffa: Pings for Discord FFAs.\nforumffa: Pings for Forum FFAs and Forum FFA turns.\ncoordinator: Pings for contests.\n\nSend `,role ROLE` (i.e. `,role ffa`) to add or remove yourself from any of these roles. Spoiler role will automatically be reset when it changes to spoilers for a different thing.");
        }
        else if (lowmessage.indexOf("link") != -1) {
            message.channel.send("`,forum`: Link to URPG's forums\n`,start`: Link to the starter request thread\n`,mart`: Link to the Pokémart thread\n`,berry`: Link to the Berry Store thread\n`,calc`: Link to the reffing calculator\n`,chartrse`, `,chartdppt`, `,chartoras`: Link to the Google Sheets for the respective contest type\n`,chartterrain`: Image with the basic description of each terrain.\n`,info`: Link to the Infohub\n`,bmgarchive`: Link to the archives of the BMG URPG section.\n`,pxrarchive`: Link to the archives of the PXR URPG section.\n`,refund`: Link to the Refund Thread.\n`,gen8` or `,galar`: Link to each of the changelogs since gen 8 release.\n`,ioa`: Link to just the Isle of Armor changelog.\n`,nukem`, `,refpedia`, `,gym`: Links to respective Infohub topics.\n`,updategym`: Link to Apply for or Update a Gym thread.\n`,starterlist`: Link the Web Archive of the List of Chosen Starters.\nIf you have any suggestions for other links I should have, please @ Ash K. or use `,addlink ALIAS LINK` to add it yourself.");
        }
        else if (lowmessage.indexOf("random") != -1 || lowmessage.indexOf("weather") != -1 || lowmessage.indexOf("terrain") != -1) {
            message.channel.send("Send `,rules randomize` with any number of the following to fix certain conditions and randomize all other rules. Ones with a `-` specifically avoid that rule, while ones without specifically force that rule. For clauses, this means `-` turns the clause off.\nAccepted inputs: 2, 3, 4, 5, 6, -gsc, gsc, rse, -sm, sm, public, private, -box, full, box, preview, single, double, -triple, triple, -rotation, rotation, -items, items, -launcher, launcher, -sky, sky, -inverse, inverse, -slp, -sleep, slp, sleep, -frz, -freeze, frz, freeze, -ohko, ohko, -acc, acc, -eva, eva, -itemc, itemc, -species, species, -mega, mega, -z, zmove, -legend, legend, -weather, weather, sun, rain, sandstorm, hail, fog, -terrain, distortion\nSend `,weather` or `,terrain` and I will give you just a random weather or terrain, respectively. For `,weather`, you may add `-fog` and/or `-no` to exclude Fog and/or No Starting Weather, respectively.  For `,terrain`, you may add `active` or `passive` to get only the appropriate type.");
        }
        else if (lowmessage.indexOf("rule") != -1) {
            message.channel.send("Use `,rules RULESET` to bring up a specific ruleset:\ncasual: Typical ruleset for casual battles. Add a number to change the battle size, default 6v6.\nppr: Similar but Public Preview (for randoms)\nhidden: Similar but Private Preview\ncompetitive: More serious battle rules\ne4: Official rules for any Elite Four or Champion battle\nld: Official rules for any Legend Defender battle\nashrandoms: Ash's preferred ruleset for randoms\nfortree: Fortree Gym default rules\nashmockfire, ashmockdragon, ashmockpsychic: Ash's rules for a mock gym of that type (treated as a normal battle for pay and such)\nmt. chimney, canalave, battle dome, lavender: Other leaders' gym rules.  To get yours added, please message Ash with your rules formatted like this ```javascript\nif(lowmessage.indexOf(\"fortree\") == 0) message.channel.send(\"6v6\\nSM Public Box\\nVolcano Terrain\\nSun\\nHolds On\\nSleep/Freeze/OHKO/Accuracy/Evasion/Species/Imprison/Dynamax Clauses\\nNo Legendary Pokémon\\nNo Z-Moves\\nChallenger Sends First\");```\nmaylee: Rules for the Maylee battle event\nffa: Typical FFA ruleset\nrandomize: Randomized rule set among legal rulesets. See `,help randomize` for more information on how to fix certain conditions.");
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
        else if (lowmessage.indexOf("sleep") != -1 || lowmessage.indexOf("talk") != -1) {
            message.channel.send("Send `,sleeptalk MOVELIST` and I will attempt to return a numbered list, as well as a rolled move from that list.  Currently accepted move separators: `,` or `, ` or `Normal Moves: ` or `TMs: ` or `HMs: ` or `BMs: ` or `MTs: ` or `SMs: `.  If you would like to request additional deliniators, please mention them to Ash. Note that Discord message limit is 2000 characters and I may be unable to help with movesets too large.")
        }
        else if (lowmessage.indexOf("magic") != -1 || lowmessage.indexOf("mtg") != -1) {
            message.channel.send("In <#401543302710689793>, via DM, or in any message starting with `,mtg`, I will attempt to parse cards.  [[CARDNAME|SETCODE]] will give an image of CARDNAME from SETCODE and [[CARDNAME|SETCODE|NUMBER]] will give an embed with CARDNAME #NUMBER in SETCODE.  For both of these, the parameters must be exact (though the latter isn't case sensitive).  Multiple cards in the same message should all be parsed.");
        }
        else if (lowmessage.indexOf("avatar") != -1) {
            message.channel.send("Send `,avatar @PERSON` to get PERSON's avatar URL, `,avatar ID` to get the avatar URL of the person with ID, or just `,avatar` to get your own.");
        }
        else if (lowmessage.indexOf("reorder") != -1) {
            message.channel.send("If you start with `,reorder`, each line after will be reordered randomly.");
        }
        else if (lowmessage.indexOf("remind") != -1) {
            message.channel.send("Say `,remindme NUMBER MESSAGE` and I will tell you MESSAGE in NUMBER minutes in the same channel.  Note that I can only store a limited number of reminders at a time and anything above that will only work if it's short enough.  If your reminder is successfully stored, I will react with 👍.  If it's not, I will tell you.  Any reminders over a week will be rejected to be curteous to storage.")
        }
        else {
            var toSend = message.author;
            if (message.channel.id == botCommands) { toSend = bot.channels.cache.get(botCommands); }
            toSend.send({ embeds: [new Discord.MessageEmbed().setTitle("Functions").setColor('GREEN').addField("Informational Commands:", "`,stats`: Stats links for any number of URPG members.\n`,rank`: How to acquire Pokémon in URPG.\n`,rse`, `,dppt`, and `,oras`: Contest information for moves.\n`,clause`: Info on a particular battle rule.\n`,effective`: Effectiveness of each type against a given gen 1-7 Pokémon.\n`,coverage type1 type2...`: Number of recognized Pokémon/forms hit at each effecitveness by the given types.\n`,beatup PKMN1, STAT1, STAT2, PKMN2...`: I will tell you the BP of a Beat Up from a gen 1-7 Pokémon or by its URPG Attack stat! Multiple entries need to be separated by `, `.\n`,sr`: Damage from Stealth Rock to a given Pokémon (not rounded).\n`,contestlog`: Outputs a template for a judge log of the given type, rank, and attribute.\n`,hp`: Recommended Hidden Power type for a given Pokémon (as of gen 7).\n`,wildcard`: List of all allowed wildcards, or `,wildcard TYPE` for only TYPE's wildcards.\n`,weather`, `,terrain`, or `,attribute`: Generate a random rule of that type.\n`,terrain active` will only pick from the four active Terrains.").setFooter("See `,help COMMAND` for more detailed information on any specific COMMAND.").addField("Additional Commands", "To pull up specific battle rules, see `,help rule` for available options.\nQuick access to various InfoHub and forum pages, see `,help link` for a list.\nI convert base stats to their URPG equivalents, see `,help convert` for syntax.\nFor the requirements and syntax to mention a role, see `,help mention`\nFor other commands that require being a referee or judge, see `,help profession`\nFor commands that require any other role, see `,help restricted`\nI have very basic <:magic:570848392633122817> card fetching ability, see `,help magic` for syntax.\nSend `,avatar @PERSON` to get PERSON's avatar URL, `,avatar ID` to get the avatar URL of the person with ID, or just `,avatar` to get your own.\nI can number and/or roll a Sleep Talk list, see `,help sleeptalk` for the details.\nIf you start with `,reorder`, each line after will be reordered randomly.\nUse `,addstat NAME LINK` to have `,stats NAME` pull up `NAME's stats: LINK`.\nFor information about setting reminders, see `,help remind`.").addField("Other functions:", "Send me a direct message beginning with `noreply:` and I'll relay your feedback anonymously to staff.\nSend me a direct message beginning with `reply:` and I'll send your feedback to staff along with a way for them to respond (but no way to find who sent the message directly).\nI keep records of members leaving the server, majorly edited messages, deleted messages, and messages with potential offensive content.\nI add <:ffa_gg:246070314163896320> to applicable messages in FFA chats!\nI bump our server with Discord Center and remind you to bump it with DISBOARD!\nIf you have any suggestions for new or improved fucntions, please <@135999597947387904>. If you're curious, you can see my full code pinned in <#420675341036814337>.")] });
            //toSend.send("**Informational commands:**\n`,stats`: Stats links for any number of URPG members.\n`,rank`: How to acquire Pokémon in URPG.\n`,rse`, `,dppt`, and `,oras`: Contest information for moves.\n`,clause`: Info on a particular battle rule.\n`,effective`: Effectiveness of each type against a given gen 1-7 Pokémon.\n`,coverage type1 type2...`: Number of recognized Pokémon/forms hit at each effecitveness by the given types.\n`,beatup PKMN` or `,beatup STAT`: I will tell you the BP of a Beat Up from a gen 1-7 Pokémon or by its URPG Attack stat!\n`,sr`: Damage from Stealth Rock to a given Pokémon (not rounded).\n`,contestlog`: Outputs a template for a judge log of the given type, rank, and attribute.\n`,hp`: Recommended Hidden Power type for a given Pokémon.\n`,wildcard`: List of all allowed wildcards, or `,wildcard TYPE` for only TYPE's wildcards.\nSee `,help COMMAND` for more detailed information on any specific COMMAND.\n\n**For other commands, please see the following:**\n`,help link`; `,help convert`; `,help mention`; `,help profession`; `,help restricted`; `,help magic`; `,help avatar`; `,help sleeptalk`; `,help reorder`; `,help addstat`; `,help remind`\n\n**Other functions:**\nSend me a direct message beginning with `noreply:` and I'll relay your feedback anonymously to staff.\nSend me a direct message beginning with `reply:` and I'll send your feedback to staff along with a way for them to respond (but no way to find who sent the message directly).\nI keep records of members leaving the server, majorly edited messages, deleted messages, and messages with potential offensive content.\nI add <:ffa_gg:246070314163896320> to applicable messages in FFA chats!\nI bump our server with Discord Center and remind you to bump it with DISBOARD!\nIf you have any suggestions for new or improved fucntions, please @ Ash K. If you're curious, you can see my full code pinned in <#420675341036814337>.");
        }
    }
}

function ffaGG(message) {
    if ((message.channel.id == "136222872371855360" || message.channel.id == "269634154101080065") && lowmessage.indexOf("and") != -1 && lowmessage.substring(lowmessage.indexOf("and")).indexOf("out") != -1) {
        message.react(message.channel.guild.emojis.cache.get("246070314163896320"));
    }
}

function role(message, messageMember) {
    if (lowmessage.indexOf(",role") == 0 || lowmessage.indexOf(",spoiler") == 0 || lowmessage == ",ffa" || lowmessage.indexOf(",s ") == 0 || lowmessage.indexOf(",otherspoiler") == 0) {
        if ((lowmessage.indexOf(",s ") == 0 || lowmessage.indexOf("spoiler") != -1) && (lowmessage.indexOf("pkmn") != -1 || lowmessage.indexOf("pokemon") != -1 || lowmessage.indexOf("pokémon") != -1)) {
            if (messageMember.roles.cache.has("440004078219558912")) {
                messageMember.roles.remove(message.channel.guild.roles.cache.get("440004078219558912"));
                message.channel.send("Pokémon spoilers role removed!")
            }
            else {
                messageMember.roles.add(message.channel.guild.roles.cache.get("440004078219558912"));
                message.channel.send("Pokémon spoilers role added!")
            }
        }
        else if ((lowmessage.indexOf(",s ") == 0 || lowmessage.indexOf("spoiler") != -1) && lowmessage.indexOf("other") != -1) {
            if (messageMember.roles.cache.has("597313962798874626")) {
                messageMember.roles.remove(message.channel.guild.roles.cache.get("597313962798874626"));
                message.channel.send("Other spoilers role removed!")
            }
            else {
                messageMember.roles.add(message.channel.guild.roles.cache.get("597313962798874626"));
                message.channel.send("Other spoilers role added!")
            }
        }
        else if (lowmessage.indexOf("spoiler") != -1 || lowmessage.indexOf(",s ") == 0) {
            message.channel.send("Please specify if you would like spoilers for the next Pokémon game (`,spoiler pokemon`) or for the current other topic (`,spoiler other`)");
        }
        else if (lowmessage.indexOf(",role coordinator") == 0) {
            if (messageMember.roles.cache.has("552232839861633046")) {
                messageMember.roles.remove(message.channel.guild.roles.cache.get("552232839861633046"));
                message.channel.send("Coordinator role removed!");
            }
            else {
                messageMember.roles.add(message.channel.guild.roles.cache.get("552232839861633046"));
                message.channel.send("Coordinator role added!");
            }
        }
        else if (lowmessage.indexOf(",role forumffa") == 0) {
            if (messageMember.roles.cache.has("507342482988859402")) {
                messageMember.roles.remove(message.channel.guild.roles.cache.get("507342482988859402"));
                message.channel.send("Forum FFA role removed!");
            }
            else {
                messageMember.roles.add(message.channel.guild.roles.cache.get("507342482988859402"));
                message.channel.send("Forum FFA role added!");
            }
        }
        else if (lowmessage.indexOf(",role ffa") == 0 || lowmessage == ",ffa") {
            if (messageMember.roles.cache.has("575087931824275466")) {
                messageMember.roles.remove(message.channel.guild.roles.cache.get("575087931824275466"));
                message.channel.send("FFA role removed!");
            }
            else {
                messageMember.roles.add(message.channel.guild.roles.cache.get("575087931824275466"));
                message.channel.send("FFA role added!");
            }
        }
        else {
            message.channel.send("I'm afraid either that role doesn't exist or you can't assign it to yourself.  The current self-assignable roles are `pokemon spoiler` (access to <#440004235635982336>), `other spoiler` (access <#597314223483387905>), `ffa` (being pinged for Discord FFAs), `coordinator` (being pinged for contests looking for players), and `forumffa` (being pinged for Forum FFAs starting or turns being posted).")}
    }
}

async function memberRole(message, messageMember) {
    if (lowmessage.indexOf(",member") == 0 && (messageMember.roles.cache.has("135868852092403713") || messageMember.roles.cache.has("244600394733322242") || messageMember.roles.cache.has("457003662217052163"))) {
        if (message.mentions.users.size != 0) {
            let newMember = await message.channel.guild.members.fetch(message.mentions.users.first().id)
            await newMember.roles.add(message.channel.guild.roles.cache.get("456993685679243286"));
            await message.channel.send("Member role applied!");
        }
        else { message.channel.send("Please include a mention for the person you would like to give the member role to.")}
    }
}

function magicCardFetcher(message) {
    if ((message.channel.id == "401543302710689793" || !message.channel.guild || lowmessage.indexOf(",mtg") == 0) && (lowmessage.indexOf("[[") != -1 && lowmessage.lastIndexOf("]]") != -1 && lowmessage.indexOf("|") != -1)) {
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
        cardName = cardName.toLowerCase().replace(/û/g, "%C3%BB").replace(/,/g, "").replace(/\./g, "").replace(/\'/g, "").replace(/`/g, "").replace(/®/g, "").replace(/:registered:/, "").replace(/"/g, "").replace(/\?/g, "%3F").replace(/!/g, "").replace(/ /g, "-");
        channel.send("https://scryfall.com/card/" + cardSet.toLowerCase() +"/" + cardNumber + "/" + cardName + "?utm_source=discord");
        fetched = true;
    }
    if (cardName == "Mine, Mine, Mine" || cardName == "Incoming" || cardName == "Kill! Destroy") {cardName += "!";}
    cardSet = cardSet.toUpperCase();
    for (var x = 1; x < setCodes.content.split("\n").length; x++) {
        cardSet = cardSet.replace(setCodes.content.split("\n")[x].split(" ")[0], setCodes.content.split("\n")[x].split(" ")[1]);
    }
    cardName = cardName.replace(/ /g, "%2B").replace(/,/g, "%252C").replace(/\./, "%252E").replace(/û/g, "u").replace(/\'/g, "%2527").replace(/`/g, "%2527").replace(/®/g, "%25C2%25AE").replace(/:registered:/g, "%25C2%25AE").replace(/&/g, "%2526").replace(/"/g, "%2522").replace(/!/g, "%2521").replace(/\?/g, "%253F").replace(/<showcase>/gi, "%253Cshowcase%253E").replace(/\[showcase]/gi, "%253Cshowcase%253E").replace(/\(showcase\)/gi, "%253Cshowcase%253E").replace(/ showcase/gi, " %253Cshowcase%253E").replace(/<borderless>/gi, "%253Cborderless%253E").replace(/\[borderless]/gi, "%253Cborderless%253E").replace(/\(borderless\)/gi, "%253Cborderless%253E").replace(/ borderless/gi, " %253Cborderless%253E").replace(/</g, "%253C").replace(/>/g, "%253E");
    if (!fetched) {channel.send("https://cdn1.mtggoldfish.com/images/gf/" + cardName + "%2B%255B" + cardSet + "%255D.jpg"); }
    if (input.indexOf("]]") != input.lastIndexOf("]]")) { magicCardPoster(input.substring(input.indexOf("]]") + 2), channel); } 
}

function tempChannelReporter(message, messageMember) {
    var attaches = [...message.attachments.values()];
    var attachnames = "";
    var attachmessage = "";
    for (i = 0; i < attaches.length; i++) {
        if (i == attaches.length -1 && i != 0) {attachnames += "and ";}
        attachnames += attaches[i].proxyURL
        if (i != attaches.length -1 && attaches.length != 2) {attachnames += ", ";}
        if (i != attaches.length -1 && attaches.length == 2) {attachnames += " ";}
    }
    if (attaches.length > 1) {attachmessage = " with attachments " + attachnames;}
    if (attaches.length == 1) {attachmessage = " with an attachment " + attachnames;}
    var theMessage = messageMember.displayName + ": " + message.cleanContent + attachmessage;
    if (message.embeds.length > 0 && message.content.length == 0) {
        theMessage = message.embeds[0];
    }
    if (message.channel.parentId == contestBossCategory && message.channel.id != contestBossChannel && message.channel.id != warRoomChannel) {
        if (message.channel.name.indexOf("war") != -1) {
            bot.channels.cache.get(warRoomChannel).send(theMessage);
        }
        if (message.channel.name.indexOf("boss") != -1) {
            bot.channels.cache.get(contestBossChannel).send(theMessage);
        }
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(spellbinderRole)) {message.channel.delete();}
    }
    if (message.channel.name == "judge-test") {
        bot.channels.cache.get(judgeTestChannel).send(theMessage);
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(chiefJudgeRole)) {message.channel.delete();}
    }
    if (message.channel.name == "ref-test") {
        bot.channels.cache.get(refTestChannel).send(theMessage);
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(seniorRefRole)) {message.channel.delete();}
    }
    if (message.channel.name == "ranger-test") {
        bot.channels.cache.get(rangerTestChannel).send(theMessage);
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(eliteRangerRole)) {message.channel.delete();}
    }
}

async function tempChannelWebhook(message, messageMember) {
    var whid = null;
    if (message.channel.name == "ref-test") {
        whid = "725292904326889472";
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(seniorRefRole)) {message.channel.delete();}
    }
    if (message.channel.name == "judge-test") {
        whid = "725293681107533904";
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(chiefJudgeRole)) {message.channel.delete();}
    }
    if (message.channel.name == "ranger-test") {
        whid = "725294189146800169";
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(eliteRangerRole)) {message.channel.delete();}
    }
    if (message.channel.parentId == contestBossCategory && message.channel.id != contestBossChannel && message.channel.id != warRoomChannel) {
        if (message.channel.name.includes("war")) {
            whid = "725302999441997834";
        }
        if (message.channel.name.includes("boss")) {
            whid = "725302276817813514";
        }
        if (message.content.indexOf(",end") == 0 && messageMember.roles.cache.has(spellbinderRole)) {message.channel.delete();}
    }
    if (!whid) { return; }
    var whl = await message.channel.guild.fetchWebhooks();
    var wh = await whl.get(whid);
    await wh.send({ content: message.content, username: message.member.displayName, avatarURL: message.author.displayAvatarURL(), embeds: message.embeds || [] });
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

/*async function mention(message, messageMember) {
    if ((lowmessage.indexOf(",mentionrefs") == 0 || lowmessage.indexOf(",mention refs") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(seniorRefRole))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(13); }
        else { messageContent = message.content.substring(12); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get(refRole).setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get(refRole)}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get(refRole).setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionjudges") == 0 || lowmessage.indexOf(",mention judges") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(chiefJudgeRole))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(15); }
        else { messageContent = message.content.substring(14); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get(judgeRole).setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get(judgeRole)}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get(judgeRole).setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentioncurators") == 0 || lowmessage.indexOf(",mention curators") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has("419775555488186369"))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(17); }
        else { messageContent = message.content.substring(16); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("312119111750647809").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("312119111750647809")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("312119111750647809").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentiongraders") == 0 || lowmessage.indexOf(",mention graders") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has("419636334982987777"))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(16); }
        else { messageContent = message.content.substring(15); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("312118803616235523").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("312118803616235523")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("312118803616235523").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionrangers") == 0 || lowmessage.indexOf(",mention rangers") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(eliteRangerRole))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(16); }
        else { messageContent = message.content.substring(15); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("312119050484449280").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("312119050484449280")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("312119050484449280").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionarbiters") == 0 || lowmessage.indexOf(",mention arbiters") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has("533356631455694849"))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(17); }
        else { messageContent = message.content.substring(16); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("533356018005180416").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("533356018005180416")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("533356018005180416").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionforumffa") == 0 || lowmessage.indexOf(",mention forumffa") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has("507342993028808707"))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(17); }
        else { messageContent = message.content.substring(16); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("507342482988859402").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("507342482988859402")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("507342482988859402").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentioncoordinator") == 0 || lowmessage.indexOf(",mention coordinator") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(judgeRole))) {
        var commandLength = 19;
        if (lowmessage.indexOf(",mention ") == 0) { commandLength += 1; }
        if (lowmessage.indexOf("coordinators") < commandLength) { commandLength += 1; }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("552232839861633046").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("552232839861633046")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("552232839861633046").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionadv") == 0 || lowmessage.indexOf(",mention adv") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(judgeRole))) {
        var commandLength = 11;
        if (lowmessage.indexOf(",mention ") == 0) { commandLength += 1; }
        if (lowmessage.indexOf("advanced") < commandLength) { commandLength += 5; }
        if (lowmessage.indexOf("coordinators") < commandLength) { commandLength += 12; }
        else if (lowmessage.indexOf("coordinator") < commandLength) { commandLength += 11; }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("552232839861633046").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("806290347479007304")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("552232839861633046").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionroyale") == 0 || lowmessage.indexOf(",mention royale") == 0 || lowmessage.indexOf(",mentionbattleroyale") == 0 || lowmessage.indexOf(",mention battleroyale") == 0 || lowmessage.indexOf(",mention battle royale") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(refRole))) {
        var commandLength = 14;
        if (lowmessage.indexOf(",mention ") == 0) { commandLength += 1; }
        if (lowmessage.indexOf("battle") < commandLength) { commandLength += 6; }
        if (lowmessage.indexOf("battle ") < commandLength) { commandLength += 1; }
        if (lowmessage.indexOf("royales") < commandLength) { commandLength += 1; }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("686613182902435891").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("686613182902435891")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("686613182902435891").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionleaders") == 0 || lowmessage.indexOf(",mention leaders") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(seniorRefRole))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(16); }
        else { messageContent = message.content.substring(15); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("444947885893746698").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("444947885893746698")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("444947885893746698").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionelites") == 0 || lowmessage.indexOf(",mention elites") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(seniorRefRole))) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(15); }
        else { messageContent = message.content.substring(14); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("444947868835381263").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("444947868835381263")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("444947868835381263").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionffa") == 0 || lowmessage.indexOf("!ffa -p") == 0 || lowmessage.indexOf(",mention ffa") == 0) && (message.channel.id == "136222872371855360" || message.channel.id == "269634154101080065" || message.channel.id == "653328600170364953") && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has(refRole))) {
        var theMessage = "";
        if (lowmessage.indexOf(",mention ") == 0) { lowmessage = lowmessage.replace(",mention ", ",mention"); }
        if (lowmessage.indexOf(",mentionffa") == 0) { theMessage = message.content.substring(11); }
        else { theMessage = message.content.substring(7); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("575087931824275466").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("575087931824275466")}${theMessage}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("575087931824275466").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionstaff") == 0 || lowmessage.indexOf(",mention staff") == 0) && messageMember.roles.cache.has("456993685679243286")) {
        var messageContent = "";
        if (lowmessage.indexOf(",mention ") == 0) { messageContent = message.content.substring(14); }
        else { messageContent = message.content.substring(13); }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("135868852092403713").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("135868852092403713")}${messageContent}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("135868852092403713").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentioncontentupkeep") == 0 || lowmessage.indexOf(",mention contentupkeep") == 0 || lowmessage.indexOf(",mention content upkeep") == 0 || lowmessage.indexOf(",mention content-upkeeper") == 0) && messageMember.roles.cache.has("456993685679243286")) {
        var commandLength = 21;
        if (lowmessage.indexOf(",mention ") == 0) {
            lowmessage = lowmessage.replace(",mention ", ",mention");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentioncontent upkeep") != -1) {
            lowmessage.replace(",mentioncontent upkeep", ",mentioncontentupkeep");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentioncontent-upkeep") != -1) {
            lowmessage.replace(",mentioncontent-upkeep", ",mentioncontentupkeep");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentioncontentupkeeper") != -1) {
            lowmessage.replace(",mentioncontentupkeeper", ",mentioncontentupkeep");
            commandLength += 2;
        }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764993044611075").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("584764993044611075")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764993044611075").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentiongamedesign") == 0 || lowmessage.indexOf(",mention gamedesign") == 0 || lowmessage.indexOf(",mention game design") == 0 || lowmessage.indexOf(",mention game-design") == 0) && messageMember.roles.cache.has("456993685679243286")) {
        var commandLength = 18
        if (lowmessage.indexOf(",mention ") == 0) {
            lowmessage = lowmessage.replace(",mention ", ",mention");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentiongame design") != -1) {
            lowmessage.replace(",mentiongame design", ",mentiongamedesign");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentiongame-design") != -1) {
            lowmessage.replace(",mentiongame-design", ",mentiongamedesign");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentiongamedesigner") != -1) {
            lowmessage.replace(",mentiongamedesigner", ",mentiongamedesign");
            commandLength += 2;
        }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584765105414078464").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("584765105414078464")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584765105414078464").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionevent") == 0 || lowmessage.indexOf(",mention event") == 0) && messageMember.roles.cache.has("456993685679243286")) {
        var commandLength = 14;
        if (lowmessage.indexOf(",mention ") == 0) {
            lowmessage = lowmessage.replace(",mention ", ",mention");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentionevents") != -1) {
            lowmessage.replace(",mentionevents", ",mentionevent");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentionevent coordinator") != -1) {
            lowmessage.replace(",mentionevent coordinator", ",mentionevent");
            commandLength += 12;
        }
        if (lowmessage.indexOf(",mentionevent-coordinator") != -1) {
            lowmessage.replace(",mentionevent-coordinator", ",mentionevent");
            commandLength += 12;
        }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentionjob") == 0 || lowmessage.indexOf(",mention job") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) || messageMember.roles.cache.has("584764993044611075"))) {
        var commandLength = 12;
        if (lowmessage.indexOf(",mention ") == 0) {
            lowmessage = lowmessage.replace(",mention ", ",mention");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentionjobs") == 0) {
            lowmessage.replace(",mentionjobs", ",mentionjob");
            commandLength += 1;
        }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("699364314427031612")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825").setMentionable(false);
    }
    if ((lowmessage.indexOf(",mentiontechnicalteam") == 0 || lowmessage.indexOf(",mention technicalteam") == 0 || lowmessage.indexOf(",mention technical team") == 0 || lowmessage.indexOf(",mention technical-team") == 0) && messageMember.roles.cache.has("456993685679243286")) {
        var commandLength = 21;
        if (lowmessage.indexOf(",mention ") == 0) {
            lowmessage = lowmessage.replace(",mention ", ",mention");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentiontechnical team") != -1) {
            lowmessage.replace(",mentiontechnical team", ",mentiontechnicalteam");
            commandLength += 1;
        }
        if (lowmessage.indexOf(",mentiontechnical-team") != -1) {
            lowmessage.replace(",mentiontechnical-team", ",mentiontechnicalteam");
            commandLength += 1;
        }
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825").setMentionable(true);
        await message.channel.send(`${bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825")}${message.content.substring(commandLength)}`);
        //await bot.guilds.cache.get(urpgServer).roles.cache.get("584764766921293825").setMentionable(false);
    }
}*/

async function mention(interaction) {
    const mentions = interaction.options.getRole('mentions');
    let theMessage = "";
    if (interaction.options.getString('message')) {
        theMessage = " " + interaction.options.getString('message');
    }
    let hasPermission = false;
    if (interaction.member.permissions.has("MENTION_EVERYONE")) {
        hasPermission = true;
    }
    else if ((mentions.id == refRole.id || mentions.id == "444947885893746698" || mentions.id == "444947868835381263") && interaction.member.roles.cache.has(seniorRefRole)) {
        hasPermission = true;
    }
    else if (mentions.id == judgeRole.id && interaction.member.roles.cache.has(chiefJudgeRole)) {
        hasPermission = true;
    }
    else if (mentions.id == "312119111750647809" && interaction.member.roles.cache.has("419775555488186369")) {
        hasPermission = true;
    }
    else if (mentions.id == "312118803616235523" && interaction.member.roles.cache.has("419636334982987777")) {
        hasPermission = true;
    }
    else if (mentions.id == "312119050484449280" && interaction.member.roles.cache.has(eliteRangerRole)) {
        hasPermission = true;
    }
    else if (mentions.id == "533356018005180416" && interaction.member.roles.cache.has("533356631455694849")) {
        hasPermission = true;
    }
    else if (mentions.id == "507342482988859402" && interaction.member.roles.cache.has("507342993028808707")) {
        hasPermission = true;
    }
    else if ((mentions.id == "552232839861633046" || mentions.id == "806290347479007304") && interaction.member.roles.cache.has(judgeRole)) {
        hasPermission = true;
    }
    else if (mentions.id == "686613182902435891" && interaction.member.roles.cache.has(refRole)) {
        hasPermission = true;
    }
    else if (mentions.id == "575087931824275466" && interaction.member.roles.cache.has(refRole) && interaction.channelId == "653328600170364953") {
        hasPermission = true;
    }
    else if ((mentions.id == "135868852092403713" || mentions.id == "584764993044611075" || mentions.id == "584765105414078464" || mentions.id == "584764766921293825" || mentions.id == "584764766921293825") && interaction.member.roles.cache.has("456993685679243286")) {
        hasPermission = true;
    }
    else if (mentions.id == "699364314427031612" && interaction.member.roles.cache.has("584764993044611075")) {
        hasPermission = true;
    }
    if (!hasPermission) {
        interaction.reply({ content: "You do not have permission to mention this role. If you believe this is in error, please report it to Ash K.", ephemeral: true});
        return;
    }
    else {
        interaction.reply({ content: "Processing" });
        interaction.channel.send({ content: "<@&" + mentions.id + ">" + theMessage, allowedMentions: { "roles": [mentions.id] } });
        return;
    }
}

async function archiver(message, messageMember) {
    /*if (lowmessage.includes(",") && lowmessage.includes("archive") && message.channel.name.includes("app")) && (messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || messageMember.roles.cache.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.cache.get(urpgServer).channels.cache.get("592609023661178890"));
        await message.channel.permissionOverwrites.set({
            overwrites: [
                {
                    id: message.channel.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135868852092403713",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
    else*/ if ((lowmessage == ",archive public" || lowmessage == ",public archive" || lowmessage == ",publicarchive") && (messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || messageMember.roles.cache.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.cache.get(urpgServer).channels.cache.get("592609023661178890"));
        await message.channel.permissionOverwrites.set({
            overwrites: [
                {
                    id: message.channel.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135868852092403713",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
    else if ((lowmessage == ",disciplinaryarchive" || lowmessage == ",disciplinary archive" || lowmessage.indexOf(",archive disciplin") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || messageMember.roles.cache.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.cache.get(urpgServer).channels.cache.get("432291722492379136"));
        await message.channel.permissionOverwrites.set({
            overwrites: [
                {
                    id: message.channel.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135868852092403713",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
    else if ((lowmessage == ",sectionalarchive" || lowmessage == ",sectionarchive" || lowmessage == ",archive section") && (messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || messageMember.roles.cache.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.cache.get(urpgServer).channels.cache.get("729845430736650352"));
        await message.channel.permissionOverwrites.set({
            overwrites: [
                {
                    id: message.channel.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135868852092403713",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
    else if ((lowmessage == ",applicationsarchive" || lowmessage == ",appsarchive" || lowmessage.indexOf(",archive app") == 0) && (messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || messageMember.roles.cache.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.cache.get(urpgServer).channels.cache.get("729843009226670080"));
        await message.channel.permissionOverwrites.set({
            overwrites: [
                {
                    id: message.channel.guild.id,
                    denied: ['VIEW_CHANNEL']
                },
                {
                    id: "135868852092403713",
                    allowed: ['VIEW_CHANNEL']    
                }
            ]
        })
    }
    else if ((lowmessage == ",teamsarchive" || lowmessage == ",teamarchive" || lowmessage == ",archive team") && (messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || messageMember.roles.cache.has("584764993044611075"))) {
        await message.channel.setParent(bot.guilds.cache.get(urpgServer).channels.cache.get("729845561951387708"));
        await message.channel.permissionOverwrites.set({
            overwrites: [
                {
                    id: message.channel.guild.id,
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

async function contestBoss(message, messageMember) {
    if (lowmessage.indexOf(",contestboss") == 0 && messageMember.roles.cache.has(spellbinderRole)) {
        var bossroom = await message.channel.guild.createChannel("contest-boss", { type: 'text', permissionOverwrites: [{
            id: message.channel.guild.id,
            deny: ['VIEW_CHANNEL']
        }]})
        await bossroom.setParent(contestBossCategory);
        await bossroom.createOverwrite(spellbinderRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        var warroom = await message.channel.guild.createChannel("war-room", { type: 'text', permissionOverwrites: [{
            id: message.channel.guild.id,
            deny: ['VIEW_CHANNEL']
        }]})
        await warroom.setParent(contestBossCategory);
        await warroom.createOverwrite(spellbinderRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
    }
}

async function judgeTest(message, messageMember) {
    if (lowmessage.indexOf(",judgetest") == 0 && messageMember.roles.cache.has(chiefJudgeRole)) {
        var testroom = await message.channel.guild.channels.create("judge-test", { 
	type: 'text',
	parent: "376809774282571779",
	permissionOverwrites: [
	    {
            	id: message.channel.guild.id,
            	deny: ['VIEW_CHANNEL']
            },
	],
	})
        await testroom.setParent("376809774282571779");
        await testroom.createOverwrite(chiefJudgeRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.users.size != 0) {
            await testroom.createOverwrite(message.mentions.users.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
}

async function refTest(message, messageMember) {
    if (lowmessage.indexOf(",reftest") == 0 && messageMember.roles.cache.has(seniorRefRole)) {
        var testroom = await message.channel.guild.channels.create("ref-test", { 
	type: 'text',
	parent: "376809774282571779",
	permissionOverwrites: [
	    {
            	id: message.channel.guild.id,
            	deny: ['VIEW_CHANNEL']
            },
	],
	})
        await testroom.setParent("376809774282571779");
        await testroom.createOverwrite(seniorRefRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.users.size != 0) {
            await testroom.createOverwrite(message.mentions.users.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
}

async function rangerTest(message, messageMember) {
    if (lowmessage.indexOf(",rangertest") == 0 && messageMember.roles.cache.has(eliteRangerRole)) {
        var testroom = await message.channel.guild.createChannel("ranger-test", { type: 'text', permissionOverwrites: [{
            id: message.channel.guild.id,
            deny: ['VIEW_CHANNEL']
        }]})
        await testroom.setParent("376809774282571779");
        await testroom.createOverwrite(eliteRangerRole, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        if (message.mentions.users.size != 0) {
            await testroom.createOverwrite(message.mentions.users.first(), {
                VIEW_CHANNEL: true
            })
        }
    }
}

async function newDiscussion(message) {
    if (message.channel.id == staffChannel && lowmessage.indexOf(",newdiscussion") == 0) {
        var newChannel = await message.channel.guild.createChannel(message.content.split(" ")[1], { type: 'text', permissionOverwrites: [{
            id: message.channel.guild.id,
            deny: ['VIEW_CHANNEL']
        }]});
        await newChannel.setParent("553338242401959966");
        await newChannel.createOverwrite("135865553423302657", {
            VIEW_CHANNEL: true
        })
        await newChannel.createOverwrite("135868852092403713", {
            VIEW_CHANNEL: true
        })
        await message.channel.send("Channel <#" + newChannel.id + "> successfully created!");
    }
}

async function newProject(message) {
    if (message.channel.parentId == "443857882937819146" && lowmessage.indexOf(",newproject") == 0) {
        var newChannel = await message.channel.guild.createChannel(message.content.split(" ")[1], { type: 'text', permissionOverwrites: [{
            id: message.channel.guild.id,
            deny: ['VIEW_CHANNEL']
        }]});
        await newChannel.setParent("443857882937819146");
        await newChannel.createOverwrite(message.author.id, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        await newChannel.createOverwrite("135868852092403713", {
            VIEW_CHANNEL: true
        })
        await message.channel.send("Channel <#" + newChannel.id + "> successfully created!");
    }
}

async function newGame(message) {
    if (message.channel.parentId == "" && lowmessage.indexOf(",newgame") == 0) {
        var newChannel = await message.channel.guild.createChannel(message.content.split(" ")[1], { type: 'text', permissionOverwrites: [{
            id: message.channel.guild.id,
            deny: ['VIEW_CHANNEL']
        }]});
        await newChannel.setParent("358436351194038272");
        await newChannel.createOverwrite(message.author.id, {
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true
        })
        await newChannel.createOverwrite("135868852092403713", {
            VIEW_CHANNEL: true
        })
        await message.channel.send("Channel <#" + newChannel.id + "> successfully created!");
    }
}


async function fixOrder(channel, messageMember) {
    if (lowmessage.indexOf(",fixorder") == 0 && (messageMember.roles.cache.has("584764993044611075") || messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))) {
        /*await bot.channels.cache.get(judgeTestChannel).setPosition(1);//judgingtest
        await bot.channels.cache.get(judgingChiefsChannel).setPosition(1);//judgingchiefs
        await bot.channels.cache.get("293899148112035840").setPosition(1);//judgingyou
        await bot.channels.cache.get("533356212377354260").setPosition(1);//arbiters
        await bot.channels.cache.get(rangerTestChannel).setPosition(1);//rangertest
        await bot.channels.cache.get("651141055236014090").setPosition(1);//privaterolling2
        await bot.channels.cache.get("563508268820070400").setPosition(1);//privaterolling1
        await bot.channels.cache.get(eliteRangersChannel).setPosition(1);//eliterangers
        await bot.channels.cache.get("136694015285264384").setPosition(1);//rangers
        await bot.channels.cache.get(refTestChannel).setPosition(1);//reftest
        await bot.channels.cache.get(seniorRefChannel).setPosition(1);//seniorref
        await bot.channels.cache.get("322151372453838848").setPosition(1);//refs
        await bot.channels.cache.get("406933479062765571").setPosition(1);//techteam*/
	var theList = await bot.channels.cache.get("531433553225842700").messages.fetch("797678460314451978");
	var channels = [];
	for (var x = 1; x < theList.content.split("\n").length; x++) {
		await channels.push(theList.content.split("\n")[x]);
	}
	await fixOrderChannel(channels);
    }
}

async function fixOrderChannel(channels, channel) {
	await bot.channels.cache.get(channels.shift()).setPosition(0);
	if (channels.length > 0) {
		setTimeout(function () {
			fixOrderChannel(channels, channel);
		}, 2000);
	}
	else {
		if (channel != null) { await channel.send("Reordering complete!"); }
	}
}

async function pkmnSpoilerSeason(message, messageMember) {
    if ((lowmessage.indexOf(",pkmnspoilerseason ") == 0 || lowmessage.indexOf(",spoilerseasonpkmn ") == 0) && (messageMember.roles.cache.has("584764993044611075") || messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))) {
        await message.channel.guild.members.fetch();
        var spoilers = await [...bot.guilds.cache.get(urpgServer).roles.cache.get("440004078219558912").members.values()];
        for (i = 0; i < spoilers.length; i++) {
            await spoilers[i].roles.remove(message.channel.guild.roles.cache.get("440004078219558912"));
        }
        await bot.channels.cache.get("440004235635982336").setName("💭spoilers-" + message.cleanContent.split(" ")[1]);
        await message.channel.send("Pokémon spoiler season now set to <#440004235635982336>.");
    }
}

async function otherSpoilerSeason(message, messageMember) {
    if ((lowmessage.indexOf(",otherspoilerseason ") == 0 || lowmessage.indexOf(",spoilerseasonother ") == 0) && (messageMember.roles.cache.has("584764993044611075") || messageMember.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))) {
        await message.channel.guild.members.fetch();
        var spoilers = await [...bot.guilds.cache.get(urpgServer).roles.cache.get("597313962798874626").members.values()];
        for (i = 0; i < spoilers.length; i++) {
            await spoilers[i].roles.remove(message.channel.guild.roles.cache.get("597313962798874626"));
        }
        await bot.channels.cache.get("597314223483387905").setName("💭spoilers-" + message.cleanContent.split(" ")[1]);
        await message.channel.send("Other spoiler season now set to <#597314223483387905>.");
    }
}

async function anonymousReply(message) {
    if ((message.channel.id == staffChannel || message.channel.parentId == "443857882937819146") && message.content.indexOf(",anonreply") == 0) {
        const anonToReplyTo = message.content.split(" ");
        //const dm = await message.client.rest.makeRequest("get", Endpoints.Channel(anonToReplyTo[1]), true);
        //const dmChannel = await message.client.rest.methods.createDM(dm.recipients[0]);
	const dmChannel = await bot.channels.fetch(anonToReplyTo[1]);
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
    if (lowmessage.indexOf(",dex ") == 0 || lowmessage.indexOf(",d ") == 0 || lowmessage.indexOf(",move ") == 0 || lowmessage.indexOf(",item ") == 0 || lowmessage.indexOf(",role ") == 0 || lowmessage.indexOf(",ability ") == 0 || lowmessage.indexOf(",metronome") == 0 || lowmessage.indexOf(",eot") == 0 || lowmessage.indexOf(",veto") == 0 || lowmessage.indexOf(",speed") == 0 || lowmessage.indexOf(",ladder") == 0 || lowmessage.indexOf(",elo") == 0 || lowmessage.indexOf(",weight ") == 0 || lowmessage.indexOf(",learnset") == 0) {
        message.channel.send("This command is handled by my colleague, <@574745413773426688>, who is more responsive to `!` than `,`.  See `!help` or `!help COMMAND` for more info.");
    }
    if (lowmessage == ",archive") {
        message.channel.send("To put this channel in the public archive, please use `,publicarchive`.  To put this channel in the private archive, please use `,privatearchive`.  To see the old forum archives, please use `,bmgarchive` or `,pxrarchive`.");
    }
}

async function substituteBot(channel) {
    kauri = await bot.users.fetch("574745413773426688");
    if ((((kauri.presence != null && kauri.presence.status == "offline") || !channel.guild || channel.guild.id != urpgServer) && lowmessage.indexOf("!d ") == 0) || (lowmessage.indexOf("//roll-sides") == 0 && !isNaN(lowmessage.split("//roll-sides")[1].split("-dice")[0]) && !isNaN(lowmessage.split("//roll-sides")[1].split("-dice")[1])) || (lowmessage.indexOf("//roll-dice") == 0 && !isNaN(lowmessage.split("//roll-dice")[1].split("-sides")[0]) && !isNaN(lowmessage.split("//roll-dice")[1].split("-sides")[1]))) {
        var dieToRoll;
        var results;
        if (lowmessage.indexOf("!d") == 0) {
            dieToRoll = lowmessage.split(" ");
            results = "<@574745413773426688> seems to be offline.  As your substitute dice roller, I decree you have rolled ";
        }
        else {
            if (lowmessage.indexOf("//roll-dice") == 0) {
                dieToRoll = lowmessage.split("//roll-dice")[1].split("-sides")[0] + "d" + lowmessage.split("//roll-dice")[1].split("-sides")[1];
            }
            else {
                dieToRoll = lowmessage.split("//roll-sides")[1].split("-dice")[1] + "d" + lowmessage.split("//roll-sides")[1].split("-dice")[0];
            }
            results = "Not many still cling to the ancient ways.  Those who do can always find a friend.  You have rolled "
        }
        for (var x = 1; x < dieToRoll.length; x++) {
            dieToRoll[x] = dieToRoll[x].replace(/, /g, " ").replace(/,/g, "d");
            var rollResults = "";
            if (!isNaN(dieToRoll[x]) && dieToRoll[x] > 1) {
                var roll = Math.floor(Math.random() * dieToRoll[x]) + 1;
                rollResults += "a " + roll + " on a d" + dieToRoll[x];
            }
            else if (dieToRoll[x].indexOf("d") != -1 && !isNaN(dieToRoll[x].split("d")[0]) && !isNaN(dieToRoll[x].split("d")[1])) {
                for (var y = 0; y < dieToRoll[x].split("d")[0]; y++) {
                    var roll = Math.floor(Math.random() * dieToRoll[x].split("d")[1]) + 1;
                    rollResults += roll
                    if (y < dieToRoll[x].split("d")[0] -1) {results += ", ";}
                }
                rollResults += " on " + dieToRoll[x].split("d")[0] + "d" + dieToRoll[x].split("d")[1];
            }
            if (rollResults != "") {
                if (results.length > 101) {results += " and ";}
                results += rollResults;
            }
        }
        if (results != "<@574745413773426688> seems to be offline.  As your substitute dice roller, I decree you have rolled ") { channel.send(results); }
    }
}

async function pinMessage(message) {
    //if ((lowmessage.indexOf(",pin") == 0 && !isNaN(lowmessage.split(" ")[1])) && ((message.channel.parentId == "358430499146039299" && messageMember.roles.cache.has(refRole)) || (message.channel.parentId == "358433546492444675" && messageMember.roles.cache.has(judgeRole)))) {
    theMessage = await message.channel.messages.fetch(lowmessage.split(" ")[1]);
    await theMessage.pin();
    //}
}

async function unpinMessage(message) {
    if ((lowmessage.indexOf(",unpin") == 0 && !isNaN(lowmessage.split(" ")[1])) && ((message.channel.parentId == "358430499146039299" && messageMember.roles.cache.has(refRole)) || (message.channel.parentId == "358433546492444675" && messageMember.roles.cache.has(judgeRole)))) {
        theMessage = await message.channel.messages.fetch(lowmessage.split(" ")[1]);
        await theMessage.unpin();
        await message.react("👍");
    }
}

async function deleteReporter(message) {
    if (message.partial) {
        return;
    }
    if (!message.channel.guild) {return;}
    if (!message.channel.guild.available) {return;}
    if (!message.author) {return;}
    if (message.channel.guild.id != urpgServer) {return;}
    if (message.author.id == "461133571034316810") {return;}
    var channelToNotify = logsChannel;
    if (message.channel.id == logsChannel && message.author.id == "531429270451519490") {
        await message.channel.send("One of my logs was deleted from here.");
        return;
    }
    if (message.channel.id == "690427377012047902") {channelToNotify = judgeTestChannel;}
    if (message.channel.id == botsChannel) {return;}
    if (message.channel.id == seniorRefChannel) {channelToNotify = refTestChannel;}
    if (message.channel.id == judgingChiefsChannel) {channelToNotify = judgeTestChannel;}
    if (message.channel.id == eliteRangersChannel) {channelToNotify = rangerTestChannel;}
    if (message.channel.id == "745806753312014454") {channelToNotify = "695205185181450281";}
    if (message.channel.name == "judge-test") {channelToNotify = judgeTestChannel;}
    if (message.channel.name == "ref-test") {channelToNotify = refTestChannel;}
    if (message.channel.name == "ranger-test") {channelToNotify = rangerTestChannel;}
    if (message.channel.parentId == contestBossCategory && message.channel.id != contestBossChannel && message.channel.id != warRoomChannel) {
        if (message.channel.name.indexOf("war") != -1) {
            channelToNotify = warRoomChannel;
        }
        if (message.channel.name.indexOf("boss") != -1) {
            channelToNotify = contestBossChannel;
        }
    }
    const entry = await message.channel.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    let user = ""
    var botDeleterNotFound = false;
    if (entry && entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
        user = entry.executor;
    } else {
        if (message.channel.id == "552715426979905547") {return;}
        user = message.author;
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
    var attaches = [...message.attachments.values()];
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
        deleteLog += user.username;
    }
    if (message.cleanContent != "") {
        deleteLog += ": ```";
        deleteLog += message.cleanContent.replace(/```/g, "​`​`​`​");
        deleteLog += "```";
    }
    messageMember = await message.channel.guild.members.fetch(message.author);
    var deleteMember = await message.channel.guild.members.fetch(user);
    if (attaches.length == 0) {
        if (messageMember.id == deleteMember.id) { deleteLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()); }
        else { deleteLog = new Discord.MessageEmbed().setAuthor(messageMember.displayName + " (" + messageMember.id + ")", messageMember.user.displayAvatarURL()).setFooter("Deleted by " + deleteMember.displayName + " (" + deleteMember.id + ")", deleteMember.user.displayAvatarURL()); }
    }
    if (message.content.length < 1024) { deleteLog.addField("Deletion", "<#" + message.channel + ">: " + message.content) }
    else { deleteLog.addField("Deletion", "<#" + message.channel + ">: " + message.content.substring(0, 1000)).addField("Deletion cont.", "<#" + message.channel + ">: " + message.content.substring(1000))}
    /*if (message.embeds.length > 0) {
        bot.channels.cache.get(channelToNotify).send()
    }*/
    bot.channels.cache.get(channelToNotify).send({ embeds: [deleteLog] });
}

async function avatar(message) {
    if (lowmessage.indexOf(",avatar") == 0) {
        if (message.mentions.users.size != 0) {
            message.channel.send(message.mentions.users.first().displayAvatarURL({size: 1024, dynamic: true}));
        }
        else if (!isNaN(lowmessage.split(" ")[1])) { 
            var target = await bot.users.fetch(lowmessage.split(" ")[1]);
            await message.channel.send(target.displayAvatarURL({size: 1024, dynamic: true}));
        }
        else {
            message.channel.send(message.author.displayAvatarURL({size: 1024, dynamic: true}));
        }
    }
}

async function avatarCommand(interaction) {
    let target = interaction.options.getUser('user')
    if (!target) {
        target = interaction.user;
    }
    interaction.reply(target.displayAvatarURL({size: 1024, dynamic: true}));
}

async function sleepTalk(message) {
    if (lowmessage.indexOf(",sleeptalk") == 0) {
        var list = true;
        var roll = true;
        var commandLength = 11;
        if (lowmessage.indexOf(",sleeptalkroll") == 0) {
            list = false;
            commandLength += 4;
        }
        if (lowmessage.indexOf(",sleeptalklist") == 0) {
            roll = false;
            commandLength += 4;
        }
        var initialList = "🙉" + message.cleanContent.substring(commandLength).replace(/\n/g, "").replace(/\r/g, "").replace(/, /g, "🙉").replace(/,/g, "🙉").replace(/TMs: /gi, "🙉").replace(/HMs: /gi, "🙉").replace(/BMs: /gi, "🙉").replace(/MTs: /gi, "🙉").replace(/SMs: /gi, "🙉").replace(/Normal Moves: /gi, "").replace(/Taught Moves: /gi, "🙉").replace(/Level-Up Moves: /gi, "").replace(/Levelup Moves: /gi, "").replace(/Level Up Moves: /gi, "").replace(/EMs: /gi, "🙉").replace(/EM(s): /gi, "🙉").replace(/Extra Moves: /gi, "🙉").replace(/Extra Move(s): /gi, "🙉").replace();
        var numberedList = initialList;
        var x = 1;
        while (numberedList.indexOf("🙉") != -1) {
            numberedList = numberedList.replace("🙉", "\n" + x + ". ");
            x++;
        }
        var rollNum = Math.floor(Math.random() * (x - 1)) + 1;
        if (numberedList.length <= 2000) {
            if (list) {await message.channel.send(numberedList);}
            if (roll) {await message.channel.send("There is your numbered list, and if you would like a roll I rolled a " + rollNum + " on a d" + (x - 1) + ", which by my count is " + initialList.split("🙉")[rollNum] + "!");}
        }
        else {
            await message.channel.send("I'm afraid your list is too long to fit in Discord at " + numberedList.length + " characters after formatting, but I counted " + (x - 1) + " moves and rolled a " + rollNum + ", which by my count is " + initialList.split("🙉")[rollNum] + "!");
        }
    }
}

async function raidBan(message, messageMember) {
    kauri = await bot.users.fetch("574745413773426688");
    if (kauri.presence != null && kauri.presence.status != "offline") { return; }
    if (messageMember.roles.cache.size > 1) { return; }
    if (message.mentions.users.size > 5) {
        messageMember.guild.members.ban(message.author, {
            days: 1,
            reason: "Mention spam from non-member"
        });
    }
    const count = message.channel.messages.filter(m => m.author.id === message.author.id && m.createdTimestamp > Date.now() - 2000).size;
    if(count > 5) messageMember.guild.members.ban(message.author, {
        days: 1,
        reason: "Message spam from non-member"
    });
}

/*function fixingThings(message) {
    if ()
}*/

function channelHandle(channel) {
    if (channel.id == botCommands) {return;}
    channel.createOverwrite("409821978887979019", {
        VIEW_CHANNEL: false
    })
}

function resetStats(message) {
    if (message.author.id == "135999597947387904" && lowmessage == ",resetstats") {
        tempStats.edit("Trainers who need to be added properly:");
    }
}

function formatStats(message) {
    if (message.author.id == "135999597947387904" && lowmessage == ",formatstats") {
        var theMessage = "";
        for (var x = 1; x < tempStats.content.split("\n").length; x++) {
            theMessage += "if (oldmessage.includes(\"" + tempStats.content.split("\n")[x].split(" ")[0].toLowerCase() + "\")) { message.channel.send(\"" + tempStats.content.split("\n")[x].split(" ")[0] + "'s stats: <" + tempStats.content.split("\n")[x].split(" ")[1] + ">\"); }\n";
        }
        message.channel.send(theMessage);
    }
}

async function updateStats(message, messageMember) {
    if (lowmessage.indexOf(",addstat") == 0 && message.content.split(" ").length == 3) {
        await tempStats.edit(tempStats.content + "\n" + message.content.split(" ")[1] + " " + message.content.split(" ")[2]);
        tempStats = await bot.channels.cache.get("531433553225842700").messages.fetch("709808598443884655");
        message.react("👍");
    }
}

async function updateSets(message) {
    if (lowmessage.indexOf(",addset") == 0 && message.content.split(" ").length == 3) {
        await setCodes.edit(setCodes.content + "\n" + message.content.split(" ")[1].toUpperCase() + " " + message.content.split(" ")[2].toUpperCase());
        setCodes = await bot.channels.cache.get("531433553225842700").messages.fetch("751124446701682708");
        message.react("👍");
    }
}

function resetLinks(message) {
    if (message.author.id == "135999597947387904" && lowmessage == ",resetlinks") {
        tempLinks.edit("Additional Links:");
    }
}

function formatLinks(message) {
    if (message.author.id == "135999597947387904" && lowmessage == ",formatlinks") {
        var theMessage = "";
        for (var x = 1; x < tempLinks.content.split("\n").length; x++) {
            theMessage += "if (lowmessage.indexOf(\"," + tempLinks.content.split("\n")[x].split(" ")[0].toLowerCase() + "\") == 0) { message.channel.send(\"<" + tempLinks.content.split("\n")[x].split(" ")[1] + ">\"); }\n";
        }
        message.channel.send(theMessage);
    }
}

async function updateLinks(message, messageMember) {
    if (lowmessage.indexOf(",addlink") == 0 && message.content.split(" ").length == 3) {
        await tempLinks.edit(tempLinks.content + "\n" + message.content.split(" ")[1] + " " + message.content.split(" ")[2]);
        tempLinks = await bot.channels.cache.get("531433553225842700").messages.fetch("737015754272014357");
    }
}

async function multiply(message) {
    if (message.content.toLowerCase().indexOf(",mult") == 0 && !isNaN(message.content.split(" ")[1]) && !isNaN(message.content.split(" ")[2])) {
        message.channel.send(message.content.split(" ")[1] + " * " + message.content.split(" ")[2] + " = " + (message.content.split(" ")[1] * message.content.split(" ")[2]));
    }
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function checker(message) {
    var d = new Date();
    if (message.content.indexOf(",") == 0 && d.getDate() == 1 && d.getMonth() == 3) {
        if (useLog.content.includes(message.author.id)) {
            var num = useLog.content.split(message.author.id + " ")[1].split("\n")[0];
            if (isNaN(num)) {
                useLog.channel.send("Error: " + num + ": message.url");
            }
            else {
                sleep(num * 1000);
                var newUseLog = useLog.content.replace(message.author.id + " " + num, message.author.id + " " + (num - 0 + 1));
                await useLog.edit(newUseLog);
                useLog = await bot.channels.cache.get("531433553225842700").messages.fetch("694759255689134101");
            }
        }
        else {
            var newUseLog = useLog.content + "\n" + message.author.id + " 1";
            await useLog.edit(newUseLog);
            useLog = await bot.channels.cache.get("531433553225842700").messages.fetch("694759255689134101");
        }
    }
}

async function setHours(message) {
    if (message.author.id == "214573974208643083" && message.content.toLowerCase().indexOf(",sethours ") == 0 && !isNaN(message.content.split(" ")[1]) && !isNaN(message.content.split(" ")[2])) {
        await theHours.edit (theHours.content.split("\n")[0] + "\n" + message.content.split(" ")[1] + "\n" + message.content.split(" ")[2]);
        theHours =  await bot.cache.channels.get("531433553225842700").messages.fetch("853348686603223051");
    }
    if (message.author.id == "214573974208643083" && message.content.toLowerCase().indexOf(",sethoursend ") == 0 && !isNaN(message.content.split(" ")[1]) && !isNaN(message.content.split(" ")[2])) {
        await theHoursE.edit (theHoursE.content.split("\n")[0] + "\n" + message.content.split(" ")[1] + "\n" + message.content.split(" ")[2]);
        theHoursE =  await bot.cache.channels.get("531433553225842700").messages.fetch("853349147032813578");
    }
}

function goToBed(message) {
    if (message.author.id == "214573974208643083") {
        var n = new Date().getDay();
        var hours = theHours.content.split("\n");
	    if (n == 0 || n == 6) {
	        hours = theHoursE.content.split("\n");
	    }
        var d = new Date().getHours();
        if (d >= hours[1] && d < hours[2]) {
            message.author.send("Get some sleep! Being awake is fun, but you'll have a better day tomorrow if you're rested.");
        }
    }
}

async function codeTester(message) {
    if (message.author.id == "135999597947387904" && message.content.indexOf(",eval ") == 0) {
        message.channel.send("```javascript\n" + eval(message.content.substring(6)) + "```");
    }
}

bot.on('error', console.error);

bot.on("messageCreate", async function(message) {
    if (message.partial) {
        // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try {
            await message.fetch();
        } catch (error) {
            logger.error('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }
    lowmessage = message.content.toLowerCase();

    await checker(message);

    await stats(message);

    await rse(message);

    await dppt(message);

    await oras(message);

    await rank(message);

    await ruleset(message);

    await contestLog(message);

    await hpType(message);

    await stealthRock(message);

    await effectiveness(message);

    await coverage(message);

    await beatUp(message);

    await clauses(message);

    await links(message);

    await wildcards(message);

    await help(message);

    await ffaGG(message);

    await magicCardFetcher(message);

    await statConverter(message);

    await randWeather(message);

    await randTerrain(message);

    await randAttribute(message);

    await wrongBot(message);

    //await avatar(message);

    await substituteBot(message.channel);

    await sleepTalk(message);

    await randomizeList(message);

    await resetStats(message);

    await formatStats(message);

    await resetLinks(message);

    await formatLinks(message);

    await remindInput(message);

    await codeEdit(message);

    await codeTester(message);

    await updateSets(message);

    await tradeVal(message);

    await multiply(message);

    await setHours(message);

    await goToBed(message);

    if (!message.channel.guild) {
    	
        await anonymousReport(message);

        return;
    }

    if (message.channel.guild.id != urpgServer) {return;}

    if (message.system || !message.channel.guild.members.cache.has(message.author)) {return;}

    let messageMember = await message.channel.guild.members.fetch(message.author);

    await tempChannelWebhook(message, messageMember);

    await refEdit(message, messageMember);
	
    await contentEdit(message, messageMember);

    //await mention(message, messageMember);

    await archiver(message, messageMember);

    await contestBoss(message, messageMember);

    await judgeTest(message, messageMember);

    await refTest(message, messageMember);

    await rangerTest(message, messageMember);

    await newDiscussion(message);

    await newProject(message);

    await fixOrder(message.channel, messageMember);

    await pkmnSpoilerSeason(message, messageMember);

    await otherSpoilerSeason(message, messageMember);

    await anonymousReply(message);

    await payDay(message, messageMember);

    await pickUp(message, messageMember);

    //await pinMessage(message, messageMember);

    await unpinMessage(message, messageMember);

    await updateStats(message, messageMember);

    await updateLinks(message, messageMember);

    await linkCleaner(message, messageMember);

    await badWordsReporter(message, messageMember, false);
})

bot.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case 'mention':
        await mention(interaction);
        break;
        case 'avatar':
        await avatarCommand(interaction);
        break;
        case 'hiddenpower':
        await hpCommand(interaction);
        break;
        case 'wildcard':
        await wildcardsCommand(interaction);
        break;
    }
})

bot.on("messageDelete", async function(message) {
    //if (message.partial) { message.fetch(); }
    deleteReporter(message);
})

bot.on("messageDeleteBulk", async function(messages) {
    messages.forEach(async function(value, key) {
        //if (value.partial) { value.fetch(); }
        await deleteReporter(value);
    });
})

bot.on("messageUpdate", async function(oldMessage, newMessage) {
    let diff = 0;
    if (newMessage.partial) {
        // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try {
            newMessage = await newMessage.fetch();
            //diff = ss.compareTwoStrings(oldMessage.content, newMessage.content);
        } catch (error) {
            logger.error('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }
    else {
        diff = ss.compareTwoStrings(oldMessage.content, newMessage.content);
    }
    //if (oldMessage.partial) { return; }
    ffaGG(newMessage);
    var channelToNotify = logsChannel;
    if (!newMessage.channel.guild && ((!oldMessage.partial && oldMessage.content.toLowerCase().indexOf("noreply:") == 0) || (!oldMessage.partial && oldMessage.content.toLowerCase().indexOf("no reply:") == 0) || newMessage.content.toLowerCase().indexOf("noreply:") == 0 || newMessage.content.toLowerCase().indexOf("no reply:") == 0 || (!oldMessage.partial && oldMessage.content.toLowerCase().indexOf("reply:") == 0) || newMessage.content.toLowerCase().indexOf("reply:") == 0)) {
        var editLog = "An anonymous report";
        if (newMessage.content.toLowerCase().indexOf("reply:") == 0) {
            editLog += " from "
            editLog += newMessage.channel.id;
        }
        editLog += " has been edited to say the following: ```";
        editLog += newMessage.cleanContent;
        editLog += "```";
        bot.channels.cache.get(anonymousReportChannel).send(editLog);
        return;
    }
    if (!newMessage.channel.guild) {return;}
    if (!newMessage.channel.guild.available) {return;}
    if (newMessage.channel.guild.id != urpgServer) {return;}
    if (!newMessage.author) {return;}
    if (newMessage.author.bot) {
        if (!oldMessage.partial && newMessage.author.id == bot.user.id && oldMessage.content != newMessage.content) {
            bot.channels.cache.get("695205182971052103").send({ embeds: [new Discord.MessageEmbed().setThumbnail(bot.user.displayAvatarURL()).setTitle("Edited message from " + bot.user.displayName + " (" + oldMessage.author.id + ")").addField("Channel:", oldMessage.channel).addField("Original Message:", oldMessage.content).addField("New Message:", newMessage.content).setColor('BLUE')] });
        }
        return;
    }
    var temp = false;
    if (newMessage.channel.name == "judge-test") {
        channelToNotify = judgeTestChannel;
        temp = true;
    }
    if (newMessage.channel.name == "ref-test") {
        channelToNotify = refTestChannel;
        temp = true;
    }
    if (newMessage.channel.name == "ranger-test") {
        channelToNotify = rangerTestChannel;
        temp = true;
    }
    if (newMessage.channel.parentId == contestBossCategory && newMessage.channel.id != contestBossChannel && newMessage.channel.id != warRoomChannel) {
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
    		if (newMessage.channel.id == seniorRefChannel) {channelToNotify = refTestChannel;}
    		if (newMessage.channel.id == judgingChiefsChannel) {channelToNotify = judgeTestChannel;}
    		if (newMessage.channel.id == eliteRangersChannel) {channelToNotify = rangerTestChannel;}
    		if (newMessage.channel.id == botsChannel) {return;}
            if (newMessage.channel.id == "690427377012047902") {channelToNotify = judgeTestChannel;}
            if (newMessage.channel.id == "745806753312014454") {channelToNotify = "695205185181450281";}
    		var deleteLog = ""
            if (temp) {
                deleteLog += await message.channel.guild.members.fetch(message.author).displayName + "'s message saying \"" + newMessage.cleanContent + "\"";
            }
            else { deleteLog += newMessage.url; }
            if (oldMessage.partial) {
                messageMember = await newMessage.channel.guild.members.fetch(newMessage.author);
                deleteLog = new Discord.MessageEmbed().setThumbnail(messageMember.user.displayAvatarURL()).setTitle("Uncached edited message from " + messageMember.displayName + " (" + newMessage.author.id + ")").addField("Channel:", "<#" + newMessage.channel + ">").setColor('BLUE').setURL(newMessage.url);
                if (newMessage.content.length < 1024) { deleteLog.addField("New Message:", newMessage.content) }
                else { deleteLog.addField("New Message:", newMessage.content.substring(0, 1000)).addField("New Message cont.:", newMessage.content.substring(1000))}
            }
    		else if (oldMessage.content && newMessage.content) {
                deleteLog += await " used to say: ```" + oldMessage.cleanContent.replace(/```/g, "​`​`​`​") + "```";
                messageMember = await oldMessage.channel.guild.members.fetch(oldMessage.author);
                deleteLog = new Discord.MessageEmbed().setThumbnail(messageMember.user.displayAvatarURL()).setTitle("Edited message from " + messageMember.displayName + " (" + oldMessage.author.id + ")").addField("Channel:", "<#" + oldMessage.channel.id + ">").setColor('BLUE').setURL(newMessage.url);
                if (oldMessage.content.length < 1024) { deleteLog.addField("Original Message:", oldMessage.content) }
                else { deleteLog.addField("Original Message:", oldMessage.content.substring(0, 1000)).addField("Original Message cont.:", oldMessage.content.substring(1000))}
                if (newMessage.content.length < 1024) { deleteLog.addField("New Message:", newMessage.content) }
                else { deleteLog.addField("New Message:", newMessage.content.substring(0, 1000)).addField("New Message cont.:", newMessage.content.substring(1000))}
            }
            else {
                deleteLog = new Discord.MessageEmbed().setThumbnail(messageMember.user.displayAvatarURL()).setTitle("Edited textless message from " + messageMember.displayName + " (" + newMessage.author.id + ")").addField("Channel:", "<#" + newMessage.channel + ">").setColor('BLUE').setURL(newMessage.url);
                if (newMessage.content.length < 1024) { deleteLog.addField("New Message:", newMessage.content) }
                else { deleteLog.addField("New Message:", newMessage.content.substring(0, 1000)).addField("New Message cont.:", newMessage.content.substring(1000))}
            }
    		await bot.channels.cache.get(channelToNotify).send({ embeds: [deleteLog] });
    	}
    }
})

bot.on("guildMemberRemove", async function(member) {
    if (member.guild.id != urpgServer) {return;}
    var leaveLog = "Member ";
    leaveLog += member.displayName;
    if (member.roles.cache.size > 1) {
        leaveLog += " with roles "
        member.roles.cache.forEach(function(value, key) {
            leaveLog += value.name + " ";
        });
    }
    const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    const entry2 = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first())
    if (entry != null && (entry.target.id === member.id) && (entry.createdTimestamp > (Date.now() - 5000))) {
        leaveLog += " was banned by ";
        leaveLog += entry.executor.username;
    }
    else if (entry2 != null && (entry2.target.id === member.id) && (entry2.createdTimestamp > (Date.now() - 5000))) {
        leaveLog += " was kicked by ";
        leaveLog += entry2.executor.username;
    }
    else {leaveLog += " has left."}
    bot.channels.cache.get(logsChannel).send(leaveLog);
})

bot.on("messageReactionAdd", async function(messageReaction, user) {
    if (messageReaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await messageReaction.fetch();
		} catch (error) {
			logger.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
    if (messageReaction.message.channel.guild.id != urpgServer) {return;}
    var reactMember = await messageReaction.message.channel.guild.members.fetch(user);
    if (messageReaction.emoji.name == "📌" && ((messageReaction.message.channel.parentId == "358430499146039299" && ReactMember.roles.cache.has(refRole)) || (messageReaction.message.channel.parentId == "358433546492444675" && reactMember.roles.cache.has(judgeRole)))) {
        pinMessage(messageReaction.message);
    }
})

/*bot.on("channelCreate", function(channel) {
    if (channel.type == "GUILD_TEXT" && channel.guild.id == urpgServer) {
        channelHandle(channel);
    }
})

/*bot.on("channelUpdate", function(oldChannel, newChannel) {
    if (oldChannel.type == "GUILD_TEXT" && oldChannel.guild.id == urpgServer && !newChannel.permissionOverwrites.has("409821978887979019") && newChannel.permissionOverwrites.has(newChannel.guild.id) && newChannel.permissionOverwrites.get(newChannel.guild.id).deny % 2048 < 512) {
        channelHandle(newChannel);
    }
})*/

bot.on("presenceUpdate", function(oldPresence, newPresence) {
    if (newPresence.userId == "631014834057641994") {
        if (newPresence.status == "offline") {
            bot.channels.cache.get("531433553225842700").send("<@135999597947387904>, <@" + newPresence.userId + "> appears to be offline.");
        }
    }
})

bot.login(process.env.token)
