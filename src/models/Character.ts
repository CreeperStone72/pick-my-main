import IMAGES from "../images";

export default class Character {
    public readonly name: string;
    public readonly fighting_style: string;
    public readonly url: string;
    public readonly game: string;
    public readonly archetypes: string[];
    
    public constructor(object: any) {
        this.name = object.name;
        this.fighting_style = object.fighting_style;
        this.url = IMAGES.get(object.game)?.find(img => img.includes(object.display_name)) ?? 'Pas trouvé';
        this.game = object.game;
        this.archetypes = object.archetypes;
    }
}