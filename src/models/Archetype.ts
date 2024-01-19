export default class Archetype {
    public readonly name: string;
    public readonly description: string;
    public readonly games: string[];
    public readonly parent_types: string[];

    public constructor(object: any) {
        this.name = object.name;
        this.description = object.description;
        this.games = object.games;
        this.parent_types = object.parent_types;
    }
}