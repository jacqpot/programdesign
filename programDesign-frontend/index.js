const introduction = () => document.getElementById('title');
const programTitle = () => document.querySelector()
const programList = () => document.getElementById('program-list')
const newProgramBtn = () => document.getElementById('new-program')
const baseUrl = 'http://localhost:3000';
const programFormContainer = () => document.getElementById("programFormContainer");
const allProgramBtn = () => document.getElementById('all-programs-btn')
const workoutFormContainer = () => document.getElementById("workout-form-container")
const workoutList = () => document.getElementById('workouts-list');

document.addEventListener("DOMContentLoaded", callOnLoad)



function callOnLoad() {
    loadPrograms();
    programFormContainer().innerHTML = ''
    newProgramBtn().addEventListener("click", (event) => {renderProgramForm()});
    allProgramBtn().addEventListener("click", () => {loadPrograms()});

      
}


// function loadPrograms() {
//     Program.all = []
//     programFormContainer().innerHTML = ''
//     programList().innerHTML = ''
//     document.getElementById('workouts-list').innerHTML = ''
    
//     fetch(baseUrl + '/programs')
//     .then(resp => {
//         if (resp.status !== 200) {
//             throw new error(resp.statusText);
//         }
//         return resp.json()
//     })
//     .catch(errors => console.log(errors))
//     .then(programs => displayPrograms(programs))
// };
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

function displayChosenProgram(program){
    displayProgram(program)
    
    let newWorkoutBtn = document.createElement('button')
    newWorkoutBtn.classList.add('btn');
    newWorkoutBtn.innerText = 'Add New Workout';
    newWorkoutBtn.id = program.id;
    newWorkoutBtn.addEventListener('click', (e) => {renderWorkoutForm(e, program.id)});
    programList().appendChild(newWorkoutBtn);
    
    program.workouts.forEach(workout => {
        Workout.create(workout.id, workout.program_id, workout.volume, workout.warmUp, workout.date, workout.description)

        displayProgramWorkout(workout)})
    
};


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
        getListOfExercises(e.target.id)    
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

function displayExercise(exercise){
    workoutList()
        const div = document.createElement('div');
        const fRating = document.createElement('p');
        const name = document.createElement('h4')
        const eList = document.createElement("ul");
        const li = document.createElement("li");
    
        fRating.innerText = `- Fatigue Rating: ${exercise.fatigueRating}`;
        name.innerText = `-${exercise.name}`;
        
        li.appendChild(name);
        li.appendChild(fRating);
        eList.appendChild(li);
        div.appendChild(eList);
        
        workoutList().appendChild(div);
}

function getWorkoutDetails(id){
    fetch(baseUrl +`/workouts/${id}`)
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        return resp.json()
    })
    .catch(errors => console.log(errors))
    .then(workout => showWorkoutDetails(workout))

}
function renderExerciseForm(id, exercises){
 let div = document.querySelector('.wo');
 let form = document.createElement('div');
//  debugger;
 form.innerHTML = `
 <form>
 <div class="input-field"  name="exercise">
    <select id="exercise">
            <option value="" disabled selected>Choose your option</option>
            ${exercises.map(exercise => `<option value="${exercise.id}">${exercise.name}</option>`)}
    </select>
    <label>exercise:</label>
</div>
        <input type="hidden" id="workout_id" name="workout_id" value="${id}">
        <input type="submit" value="Create">
</form>
 `
 div.appendChild(form)
 $('select').formSelect();
 form.addEventListener("submit", (event) => {
     event.preventDefault();
     exerciseFormSubmission(id);
    });
};

function exerciseFormSubmission(id){
    let form = document.createElement('div');
    let pick = document.getElementById("exercise").value;
    let workoutId = document.getElementById("workout_id").value;

    let workoutExercises = {
        exercises_workouts: {
            exercise_id: pick,
            workout_id: workoutId
        
        }
    }
// debugger;
    fetch(baseUrl + `/exercises_workouts`,{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(workoutExercises)
    })
    .then(resp => resp.json())
    
    form.innerHTML = ""
    getWorkoutDetails(id)
}


function getListOfExercises(id){
    fetch(baseUrl +`/exercises`)
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        return resp.json()
    })
    .catch(errors => console.log(errors))
    .then(exercises => renderExerciseForm(id, exercises))

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


