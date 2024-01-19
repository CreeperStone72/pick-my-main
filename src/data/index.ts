import characters from "./characters.json";
import Character from "../models/Character";

import archetypes from "./archetypes.json";
import Archetype from "../models/Archetype";

const Characters = characters.map((character) => new Character(character));
const Archetypes = archetypes.map((archetype) => new Archetype(archetype));

const getCharactersByNames = (characterNames: string[]): Character[] => Characters.filter((character) => characterNames.includes(character.name));
const getArchetypesByNames = (archetypes: string[]): Archetype[] => Archetypes.filter((archetype) => archetypes.includes(archetype.name));

export { Characters, Archetypes, getCharactersByNames, getArchetypesByNames };
