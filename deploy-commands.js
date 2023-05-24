const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
	new SlashCommandBuilder().setName('avatar').setDescription("Pull up a larger version of someone's avatar (if available)").addUserOption(option =>
		option.setName('user')
			.setDescription('Who to pull up, yourself if blank')
			.setRequired(false)),
	new SlashCommandBuilder().setName('hiddenpower').setDescription('Suggested Hidden Power type for a given Pokémon that can learn it.').addStringOption(option =>
		option.setName('pokemon')
			.setDescription('Which Pokémon to look up. Will find the closest match that learns Hidden Power.')
			.setRequired(true)),
	new SlashCommandBuilder().setName('wildcard').setDescription('Information on which wildcards are allowed in a given gym').addStringOption(option =>
		option.setName('type')
			.setDescription("Which type's wildcards, all if blank.")
			.setRequired(false)
			.addChoice('Bug', 'bug')
			.addChoice('Dark', 'dark')
			.addChoice('Dragon', 'dragon')
			.addChoice('Electric', 'electric')
			.addChoice('Fairy', 'fairy')
			.addChoice('Fighting', 'fighting')
			.addChoice('Fire', 'fire')
			.addChoice('Flying', 'flying')
			.addChoice('Ghost', 'ghost')
			.addChoice('Grass', 'grass')
			.addChoice('Ground', 'ground')
			.addChoice('Ice', 'ice')
			.addChoice('Normal', 'normal')
			.addChoice('Poison', 'poison')
			.addChoice('Psychic', 'psychic')
			.addChoice('Rock', 'rock')
			.addChoice('Steel', 'steel')
			.addChoice('Water', 'water')),
	new SlashCommandBuilder().setName('effectiveness').setDescription('Full list of how much a given Pokémon takes from each type (without abilities).').addStringOption(option =>
		option.setName('pokemon')
			.setDescription('Which Pokémon to look up. Will find the closest match.')
			.setRequired(true)),
	new SlashCommandBuilder().setName('contest').setDescription('Contest move data, either for a specific move or the full chart for a mode.').addStringOption(option =>
		option.setName('mode')
			.setDescription("Which contest mode")
			.setRequired(true)
			.addChoice('RSE', 'rse')
			.addChoice('ORAS', 'oras')
			.addChoice('DPPt', 'dppt')).addStringOption(option =>
		option.setName('move')
			.setDescription("Which move to check, full chart if blank")
			.setRequired(false)).addBooleanOption(option =>
		option.setName('ephemeral')
			.setDescription("If true, will only display to yourself")
			.setRequired(false)),
	new SlashCommandBuilder().setName('d').setDescription('Roll one or more dice').addIntegerOption(option =>
		option.setName('sides')
			.setDescription('Number of sides.  Defaults to 100 if blank.')
			.setRequired(false)).addIntegerOption(option =>
		option.setName('dice')
			.setDescription('Number of dice to roll.  Defaults to 1 if blank.')
			.setRequired(false)).addBooleanOption(option =>
		option.setName('ephemeral')
			.setDescription("If true, will only display to yourself.  There will be no record of the result so don't use this for something important.")
			.setRequired(false))
]
	.map(command => command.toJSON());
/*const guildCommands = [
	new SlashCommandBuilder().setName('mention').setDescription('Mention a role and optinally pass a message').addRoleOption(option =>
		option.setName('mentions')
			.setDescription('What role to mention')
			.setRequired(true)).addStringOption(option =>
		option.setName('message')
			.setDescription('Message to pass with the ping')
			.setRequired(false))
]*/

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationCommands("531429270451519490"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

/*rest.put(Routes.applicationGuildCommands("531429270451519490", "135864828240592896"), { body: guildCommands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);*/