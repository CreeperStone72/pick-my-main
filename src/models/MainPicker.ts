import Archetype from "./Archetype";
import Character from "./Character";
import { Archetypes, getArchetypesByNames } from "../data";

export default class MainPicker {
  public static getArchetypeWeights(selectedCharacters: Character[]): Map<Archetype, number> {
    const archetypeWeights = new Map<Archetype, number>();
    Archetypes.forEach((archetype) => archetypeWeights.set(archetype, 0));

    for (const character of selectedCharacters) {
      for (const archetype of getArchetypesByNames(character.archetypes)) {
        archetypeWeights.set(archetype, (archetypeWeights.get(archetype) ?? 0) + 1);

        for (const parent of getArchetypesByNames(archetype.parent_types)) {
          archetypeWeights.set(parent, (archetypeWeights.get(parent) ?? 0) + 0.5);
        }
      }
    }

    return archetypeWeights;
  }

  private static getCharacterPotential(character: Character, archetypeWeights: Map<Archetype, number>): number {
    let potential = 0;

    for (let i = 0; i < character.archetypes.length; i++) {
      const archetype = getArchetypesByNames([character.archetypes[i]])[0];
      potential += (archetypeWeights.get(archetype) ?? 0) * (character.archetypes.length - i);
    }

    return potential;
  }

  public static getOrderedWeights(archetypeWeights: Map<Archetype, number>): [Archetype, number][] {
    let orderedWeights: [Archetype, number][] = [];
    archetypeWeights.forEach((value, key) => orderedWeights.push([key, value]));

    orderedWeights.sort((a, b) => b[1] - a[1]);
    orderedWeights = orderedWeights.map((value) => [value[0], value[1] / Math.max(...orderedWeights.map((value) => value[1]))]);
    orderedWeights = orderedWeights.slice(0, 5);

    return orderedWeights;
  }

  public static getCharactersPotential(unselectedCharacters: Character[], archetypeWeights: Map<Archetype, number>): [Character, number][] {
    let characterPotentials: [Character, number][] = unselectedCharacters.map((character) => [character, MainPicker.getCharacterPotential(character, archetypeWeights)]);
    characterPotentials.sort((a, b) => b[1] - a[1]);
    characterPotentials = characterPotentials.slice(0, 5);
    return characterPotentials;
  }
}
