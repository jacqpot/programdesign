class Workout{
    constructor(id, description, volume, warmUp, date, program_id){
        this.description = description;
        this.volume = volume;
        this.warmUp = warmUp;
        this.date = date;
        this.program_id = program_id;
        this.id = id;
    }

    static all = []

    static create(id, description, volume, warmUp, date, program_id){
        let program = new Workout(id, description, volume, warmUp, date, program_id)
        Workout.all.push(program)
        return this 
    }
}