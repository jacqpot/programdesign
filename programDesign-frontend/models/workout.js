class Workout{
    constructor(id, description, volume, warmUp, date, program_id){
        this.description = description;
        this.volume = volume;
        this.warmUp = warmUp;
        this.date = date;
        this.program_id = program_id;
        this.id = id;
    };

    static all = []

    static create(id, description, volume, warmUp, date, program_id){
        let program = new Workout(id, description, volume, warmUp, date, program_id)
        Workout.all.push(program)
        return this 
    };
}


function getProgramDetails(id){
    fetch(baseUrl +`/programs/${id}`)
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        return resp.json()
    })
    .then(program => displayChosenProgram(program))
    .catch(errors => console.log(errors))
    // debugger;
}




function displayProgramWorkout(workout){
    const program = workout.program_id;

    const div = document.createElement('div');
    const description = document.createElement('p');
    const warmUp = document.createElement('p');
    const date = document.createElement('h2');
    const volume = document.createElement('p');
    const view = document.createElement("button");
    const add = document.createElement("button");
    //  debugger;
    warmUp.innerText = `- Warm up(if any): ${workout.warmUp}`;
    date.innerText = `Date: ${workout.date}`;
    description.innerText = `Body part(s) worked: ${workout.description}`
    volume.innerText = `- Number of sets: ${workout.volume}`;
    
    view.classList.add('btn');
    view.innerText = 'View All Exercises';
    view.id = workout.id;
    view.addEventListener('click', (e) => getWorkoutDetails(e.target.id))
    add.classList.add('btn');
    add.innerText = 'Add New Exercise';
    add.id = workout.id;
    add.addEventListener('click', (e) => {
        renderExerciseForm(e.target.id)    
    })
    div.id = workout.id;
    div.classList.add('wo')
    div.appendChild(date);
    div.appendChild(description);
    div.appendChild(warmUp);
    div.appendChild(volume);
    div.appendChild(view);
    div.appendChild(add);
    workoutList().appendChild(div);
    // debugger;
}
function showWorkoutDetails(workout){
    // debugger;
    console.log('workoutList')
    workoutList().innerHTML = ""
    displayProgramWorkout(workout);
    // let btn = getElementById(`${workout.id}`)
    workout.exercises.forEach(exercise => displayExercise(exercise))
    
}



function renderWorkoutForm(e, program_id, workout = null){
    e.preventDefault();
    
    workoutFormContainer().innerHTML = 
    `
    <h1 id="form-header">Add Workout</h1>
    <form>
    Date: <input type="date" id="date"><br>

    <div class="input-field"  name="description">
         <select id="wdescription">
            <option value="" disabled ${workout ? '' : 'selected'}>Choose your option</option>
            <option value="Total Body" ${workout && workout.data.attributes.description == "Total Body" ? 'selected' : ''} >Total Body</option>
            <option value="Push" ${workout && workout.data.attributes.description == "Push" ? 'selected' : ''} >Push</option>
            <option value="Pull" ${workout && workout.data.attributes.description == "Pull" ? 'selected' : ''} >Pull</option>
            <option value="Legs" ${workout && workout.data.attributes.description == "Legs" ? 'selected' : ''} >Legs</option>
            <option value="Upper Body" ${workout && workout.data.attributes.description == "Upper Body" ? 'selected' : ''} >Upper Body</option>
            <option value="Lower Body" ${workout && workout.data.attributes.description == "Lower Body" ? 'selected' : ''} >Lower Body</option>
            <option value="Chest" ${workout && workout.data.attributes.description == "Chest" ? 'selected' : ''} >Chest</option>
            <option value="Back" ${workout && workout.data.attributes.description == "Back" ? 'selected' : ''} >Back</option>
            <option value="Shoulders" ${workout && workout.data.attributes.description == "Shoulders" ? 'selected' : ''} >Shoulders</option>
            <option value="Arms" ${workout && workout.data.attributes.description == "Arms" ? 'selected' : ''} >Arms</option>
            <option value="Legs" ${workout && workout.data.attributes.description == "Legs" ? 'selected' : ''} >Legs</option>
         </select>
         <label>Muscle Groups worked:</label>
     </div>
     Total working sets per primary muscle group worked: <input type="integer" id="volume"><br>
     warmUp: <input type="integer" id="warmUp"><br>
     <input type="hidden" id="program_id" name="program_id" value="${program_id}">
     <input type="submit" value="Create">
    </form>
    `
    $('select').formSelect()
    workoutFormContainer().addEventListener("submit", (event) => {
        console.log("please work")
        //  debugger;
        event.preventDefault();
        workoutFormSubmission();
                    });

}

function workoutFormSubmission(){
    
    let date = document.getElementById("date").value;
    let description = document.getElementById("wdescription").value;
    let volume = document.getElementById("volume").value;
    let warmUp = document.getElementById("warmUp").value;
    let programId = document.getElementById("program_id").value;
    
    
    let workout = {
        workout: {
            date: date,
            description: description,
            volume: volume,
            warmUp: warmUp,
            program_id: programId,
            exercise_id: null 
        }
    };
    console.log('workout')
    fetch(baseUrl + `/workouts`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(workout)
    })
    .then(resp => resp.json())
    .then(workout => {
        // displayProgramWorkout(Workout.all.last)
        getProgramDetails(workout.program_id)
    });
    // debugger;
    workoutFormContainer().innerHTML = ""
}
