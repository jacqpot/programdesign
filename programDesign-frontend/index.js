const introduction = () => document.getElementById('title');
const programTitle = () => document.querySelector()
const programList = () => document.getElementById('program-list')
const newProgramBtn = () => document.getElementById('new-program')
const baseUrl = 'http://localhost:3000';
const programFormContainer = () => document.getElementById("programFormContainer");
const allProgramBtn = () => document.getElementById('all-programs-btn')
const workoutFormContainer = () => document.getElementById("workout-form-container")
const workoutList = () => document.getElementById('workouts-list');
const exerciseFormContainer = () => document.querySelector('#wo')
document.addEventListener("DOMContentLoaded", callOnLoad)



function callOnLoad() {
    loadPrograms();
    programFormContainer().innerHTML = ''
    newProgramBtn().addEventListener("click", (event) => {renderProgramForm()});
    allProgramBtn().addEventListener("click", () => {loadPrograms()});

      
}

function loadPrograms() {
    Program.all = []
    programFormContainer().innerHTML = ''
    programList().innerHTML = ''
    document.getElementById('workouts-list').innerHTML = ''
    
    fetch(baseUrl + '/programs')
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        return resp.json()
    })
    .catch(errors => console.log(errors))
    .then(programs => displayPrograms(programs))
};

function displayPrograms(programs){
    programs.forEach(program => {
        
        displayProgram(program)
        
        //  debugger;
        Program.create(program.id, program.title, program.split, program.length, program.goal, program.weeklyVolume, program.workoutsPerWeek, program.startdate)
    })
};


function displayProgram(program) {
    //  debugger;
    console.log(Program.all.length)
    const div = document.createElement('div');
    div.classList.add('program-card')
    const h1 = document.createElement('h1');
    const date = document.createElement('h3');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    const view = document.createElement('button')
    deleteButton.classList.add('btn');
    deleteButton.innerText = 'delete'
    deleteButton.id = program.id;
    deleteButton.addEventListener('click', deleteProgram)
    
    editButton.classList.add('btn');
    editButton.innerText = 'edit';
    editButton.id = program.id;
    editButton.addEventListener('click', editProgram)
    
    view.classList.add('btn');
    view.innerText = 'view';
    view.id = program.id;
    view.addEventListener('click', (e) => {clearProgramList(e)})
    
    h1.innerText = program.title;
    date.innerText = `Started on: ${program.startdate}`
    h4.innerText = program.split;
    p.innerText = `This is a ${program['goal']} Program. Using a ${program.split}, and will be running for ${program.length} weeks. \n At ${program.workoutsPerWeek} workouts per week each muscle group shoh1d hit ${program.weeklyVolume} sets per week.`
    
    div.appendChild(h1);
    div.appendChild(date)
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    div.appendChild(view);
    programList().appendChild(div);
};

function deleteProgram(e){
    let programId = parseInt(e.target.id);
    let program = e.target.parentNode;
    program.parentNode.removeChild(program);
    fetch(`${baseUrl}/programs/${programId}`,{
        method: 'DELETE'
    })
    // debugger;
    $("#div").load("#div > *");
}
function programUpdate(e, id) {
    e.preventDefault();
    let title = document.getElementById("ptitle").value;
    let split = document.getElementById("split").value; 
    let length = document.getElementById("length").value; 
    let goal = document.getElementById("goal").value;
    let weeklyVolume = document.getElementById("weeklyVolume").value; 
    let workoutsPerWeek = document.getElementById("workoutsPerWeek").value; 
    let startDate = document.getElementById("startdate").value;


    let program = {
        program: {
        title: title,
        split: split,
        length: length,
        goal: goal,
        weeklyVolume: weeklyVolume,
        workoutsPerWeek: workoutsPerWeek,
        startdate: startDate}
    }

    fetch(baseUrl + '/programs/' + id, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(program)
    })
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        loadPrograms();
    })
    .catch(errors => console.log(errors));
}
  

 function editProgram(e){
    let id = e.target.id
    
    
    fetch(baseUrl + '/programs/'+ id)
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        return resp.json()
    })
    .catch(errors => console.log(errors))
    .then(program => renderProgramForm(program))

 }
//  for (const option in options) {
//     if (options[option].value == this.parentNode.querySelectorAll('h5')[0].innerText ) {
//         options.selectedIndex = options[option].index
//     }
// }



function renderProgramForm(program = null) {
    programFormContainer().innerHTML =  
    `
    <h1 id="form-header">Create Program</h1>
    <form>
        Title: <input type="text" id="ptitle"><br>
        
        <div class="input-field"  name="split">
            <select id="split">
                <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
                <option value="Total Body" ${program && program.split == "Total Body" ? 'selected' : ''} >Total Body</option>
                <option value="Push, Pull, Legs" ${program && program.split == "Push, Pull, Legs" ? 'selected' : ''} >Push, Pull, Legs</option>
                <option value="Upper, Lower" ${program && program.split == "Upper, Lower" ? 'selected' : ''} >Upper, Lower</option>
                <option value="Body Part Split" ${program && program.split == "Body Part Split" ? 'selected' : ''} >Body Part Split</option>
            </select>
            <label>Split:</label>
        </div>
        <div class="input-field"  name="length">
            <select id="length">
                <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
                <option value="4" " ${program && program.length == "4" ? 'selected' : ''} >4 weeks</option>
                <option value="8"" ${program && program.length == "8" ? 'selected' : ''} >8 weeks</option>
                <option value="12"" ${program && program.length == "12" ? 'selected' : ''} >12 weeks</option>
            </select>
            <label>length:</label>
        </div>
        <div class="input-field"  name="goal">
            <select id="goal">
                <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
                <option value="Power" ${program && program.goal == "Power" ? 'selected' : ''} >Power</option>
                <option value="Strength" ${program && program.goal == "Strength" ? 'selected' : ''} >Strength</option>
                <option value="Hypertrophy" ${program && program.goal == "Hypertrophy" ? 'selected' : ''} >Hypertrophy</option>
                <option value="Endurance" ${program && program.goal == "Endurance" ? 'selected' : ''} >Endurance</option>
                <option value="Stability" ${program && program.goal == "Stability" ? 'selected' : ''} >Stability</option>
            </select>
            <label>Goal:</label>
        </div>
        Weekly Volume per exercise: <input type="integer" id="weeklyVolume"><br>
        Workouts Per Week: <input type="integer" id="workoutsPerWeek"><br>
        Start Date: <input type="date" id="startdate"><br>
        <input type="submit" value="Create">
    </form>
    `

$('select').formSelect();
    if (program != null){
        document.getElementById("form-header").innerHTML = "Edit Program";
        document.getElementById("ptitle").value = program.title,
        $("#split").val = program.split,
        document.getElementById("length").value = program.length,
        document.getElementById("goal").value = program.goal,
        document.getElementById("weeklyVolume").value = program.weeklyVolume,
        document.getElementById("workoutsPerWeek").value = program.workoutsPerWeek,
        document.getElementById("startdate").value = program.startDate
        // debugger;

        programFormContainer().addEventListener("submit", (event) => {
            event.preventDefault(); 
            programUpdate(event, program.id);
        })
    } else{
        programFormContainer().addEventListener("submit", (event) => {
            event.preventDefault();
            programFormSubmission();
        });
    }
        
    }
    
    // function getOption() {
        //     var obj = document.getElementById("mySelect");
        //     document.getElementById("demo").innerHTML = 
        //     obj.options[obj.selectedIndex].text;
        //   }
        
function programFormSubmission(){
    let title = document.getElementById("ptitle").value 
    let split = document.getElementById("split").value 
    
    let length = document.getElementById("length").value 
    let goal = document.getElementById("goal").value
    let weeklyVolume = document.getElementById("weeklyVolume").value 
    let workoutsPerWeek = document.getElementById("workoutsPerWeek").value 
    let startDate = document.getElementById("startdate").value


    let program = {
        program: {
        title: title,
        split: split,
        length: length,
        goal: goal,
        weeklyVolume: weeklyVolume,
        workoutsPerWeek: workoutsPerWeek,
        startdate: startDate}
    }

    fetch(baseUrl + `/programs`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(program)
    })
    .then(resp => resp.json());
    Program.all.length = 0;

    programFormContainer().innerHTML = "";
    loadPrograms();
}

function clearProgramList(e){
    e.preventDefault()
    
    let pn = e.target.parentNode
    let id = parseInt(e.target.id)
    document.getElementById("program-list").innerHTML = "";
    document.getElementById("workouts-list").innerHTML = "";
    
    if (pn.classList.contains('program-card')){
        // debugger
        getProgramDetails(id)
    } else {
        loadPrograms()
    }
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
    add.innerText = 'View All Exercises';
    add.id = workout.id;
    add.addEventListener('click', (e) => {
        getListOfExercises()    
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
    let btn = getElementById(`${workout.id}`)
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
 let div = querySelector('#wo');
 let form = createElement('div')
 form.innerHTML = `
 <form>
 <div class="input-field"  name="split">
    <select id="exercise">
        <option value="" disabled 'selected'>Choose your option</option>
        ${exercises.map(exercise => `<option value="${exercise.id}">${exercise.name}</option>`)}
        </select>
        <label>exercise:</label>
        <input type="hidden" id="workout_id" name="workout_id" value="${id}">
        <input type="submit" value="Create">
    </form>
</div>
 `
 $('select').formSelect()
div.appendChild(form)
form.addEventListener("submit", (event) => {
    console.log("please work")
    //  debugger;
    event.preventDefault();
    workoutFormSubmission();

}

function getListOfExercises(){
    fetch(baseUrl +`/exercises`)
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        return resp.json()
    })
    .catch(errors => console.log(errors))
    .then(exercises => showWorkoutDetails(exercises))

}
// function displayExercises(e, workout){
//     e.preventDefault()
//     const work = document.getElementById(`${workout.id}`);
//     const addExerciseBtn = document.createElement('button')

//     addExerciseBtn.classList.add('btn');
//     addExerciseBtn.innerText = 'Add exercise';
//     addExerciseBtn.id = workout.id;
//     addExerciseBtn.addEventListener('click', () => {renderExerciseSelection()});

//     // debugger;
// }

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
    // if (program != null){
    //             document.getElementById("form-header").innerHTML = "Edit Workout";
    //             document.getElementById("description").value = program.description,
    //             $("#split").val = program.split,
    //             document.getElementById("length").value = program.length,
    //             document.getElementById("goal").value = program.goal,
    //             document.getElementById("weeklyVolume").value = program.weeklyVolume,

    //             // debugger;
        
    //             programFormContainer().addEventListener("submit", (event) => {
    //                 event.preventDefault(); 
    //                 programUpdate(event, program.data.id);
    //             })
    //         } else{
    //             ;
    //         }
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
    }
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
    })
    // debugger;
    workoutFormContainer().innerHTML = ""
}


