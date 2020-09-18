class Program{
    constructor(id, title, split, length, goal, weeklyVolume, workoutsPerWeek, startDate){
        this.title = title;
        this.split = split;
        this.length = length;
        this.goal = goal;
        this.weeklyVolume = weeklyVolume;
        this.workoutsPerWeek = workoutsPerWeek;
        this.startDate = startDate;
        this.id = id;
    }

    static all = []

    static create(id, title, split, length, goal, weeklyVolume, workoutsPerWeek, startDate){
        let program = new Program(id, title, split, length, goal, weeklyVolume, workoutsPerWeek, startDate)
        Program.all.push(program)
        return this 
    }
}

