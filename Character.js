export class Character
{
    constructor(name, playbook, cool, hard, hot, sharp, weird)
    {
        this.name = name;
        this.playbook = playbook;
        this.cool = cool;
        this.hard = hard;
        this.hot = hot;
        this.sharp = sharp;
        this.weird = weird;
    }

    static fromJSON(inputJSON)
    {
        return new Character(inputJSON.name, inputJSON.playbook, parseInt(inputJSON.cool), parseInt(inputJSON.hard), parseInt(inputJSON.hot), parseInt(inputJSON.sharp), parseInt(inputJSON.weird));
    }
}