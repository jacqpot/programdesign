const introduction = () => document.getElementById('title');
const programTitle = () => document.querySelector()
const programList = () => document.getElementById('program-list')
const newProgramBtn = () => document.getElementById('new-program')
const baseUrl = 'http://localhost:3000';
const programFormContainer = () => document.getElementById("programFormContainer");
const allProgramBtn = () => document.getElementById('all-programs-btn')


document.addEventListener("DOMContentLoaded", callOnLoad)



function callOnLoad() {
    loadPrograms();
    programFormContainer().innerHTML = ''
    newProgramBtn().addEventListener("click", (event) => {renderProgramForm()});
    allProgramBtn().addEventListener("click", (event) => {loadPrograms()});

      
}

function loadPrograms() {
    
    programFormContainer().innerHTML = ''
    programList().innerHTML = ''
    document.getElementById('workouts').innerHTML = ''
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
    programs.data.forEach(program => displayProgram(program.attributes, program.id))
};


function displayProgram(program, id) {

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
    deleteButton.id = id;
    deleteButton.addEventListener('click', deleteProgram)
    
    editButton.classList.add('btn');
    editButton.innerText = 'edit';
    editButton.id = id;
    editButton.addEventListener('click', editProgram)
    
    view.classList.add('btn');
    view.innerText = 'view';
    view.id = id;
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
    let programId = parseInt(e.target.id)
    fetch(`${baseUrl}/programs/${programId}`,{
        method: 'DELETE'
    })
    // debugger;
    this.location.reload()
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
                <option value="Total Body" ${program && program.data.attributes.length == "Total Body" ? 'selected' : ''} >Total Body</option>
                <option value="Push, Pull, Legs" ${program && program.data.attributes.length == "Push, Pull, Legs" ? 'selected' : ''} >Push, Pull, Legs</option>
                <option value="Upper, Lower" ${program && program.data.attributes.length == "Upper, Lower" ? 'selected' : ''} >Upper, Lower</option>
                <option value="Body Part Split" ${program && program.data.attributes.length == "Body Part Split" ? 'selected' : ''} >Body Part Split</option>
            </select>
            <label>Split:</label>
        </div>
        <div class="input-field"  name="length">
            <select id="length">
                <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
                <option value="4" " ${program && program.data.attributes.length == "4" ? 'selected' : ''} >4 weeks</option>
                <option value="8"" ${program && program.data.attributes.length == "8" ? 'selected' : ''} >8 weeks</option>
                <option value="12"" ${program && program.data.attributes.length == "12" ? 'selected' : ''} >12 weeks</option>
            </select>
            <label>length:</label>
        </div>
        <div class="input-field"  name="goal">
            <select id="goal">
                <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
                <option value="Power" ${program && program.data.attributes.goal == "Power" ? 'selected' : ''} >Power</option>
                <option value="Strength" ${program && program.data.attributes.goal == "Strength" ? 'selected' : ''} >Strength</option>
                <option value="Hypertrophy" ${program && program.data.attributes.goal == "Hypertrophy" ? 'selected' : ''} >Hypertrophy</option>
                <option value="Endurance" ${program && program.data.attributes.goal == "Endurance" ? 'selected' : ''} >Endurance</option>
                <option value="Stability" ${program && program.data.attributes.goal == "Stability" ? 'selected' : ''} >Stability</option>
            </select>
            <label>Goal:</label>
        </div>
        Weekly Volume: <input type="integer" id="weeklyVolume"><br>
        Workouts Per Week: <input type="integer" id="workoutsPerWeek"><br>
        Start Date: <input type="date" id="startdate"><br>
        <input type="submit" value="Create">
    </form>
    `

$('select').formSelect();
    if (program != null){
        document.getElementById("form-header").innerHTML = "Edit Program";
        document.getElementById("ptitle").value = program.data.attributes.title,
        $("#split").val = program.data.attributes.split,
        document.getElementById("length").value = program.data.attributes.length,
        document.getElementById("goal").value = program.data.attributes.goal,
        document.getElementById("weeklyVolume").value = program.data.attributes.weeklyVolume,
        document.getElementById("workoutsPerWeek").value = program.data.attributes.workoutsPerWeek,
        document.getElementById("startdate").value = program.data.attributes.startDate
        // debugger;

        programFormContainer().addEventListener("submit", (event) => {
            event.preventDefault(); 
            programUpdate(event, program.data.id);
        })
    } else{
        programFormContainer().addEventListener("submit", (event) => {
            event.preventDefault();
            programFormSubmission(event);
        });
    }
        
    }
    
    // function getOption() {
        //     var obj = document.getElementById("mySelect");
        //     document.getElementById("demo").innerHTML = 
        //     obj.options[obj.selectedIndex].text;
        //   }
        
function programFormSubmission(event){
    event.preventDefault()
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
    .then(resp => resp.json())
    .then(program => {
        // debugger;
        Program.create(program.id, program.title, program.split, program.length, program.goal, program.weeklyVolume, program.workoutsPerWeek, program.startdate)
        displayProgram(Program.all.last)
    })
    debugger;
    programFormContainer().innerHTML = ""
}

function clearProgramList(e){
    e.preventDefault()

    let pn = e.target.parentNode
    
    console.log(pn);
    document.getElementById("program-list").innerHTML = "";
    document.getElementById("workouts").innerHTML = "";
    
            if (pn.classList.contains('program-card')){
        getProgramDetails(e.target.id)
    } else {
        loadPrograms()
    }
}

function getProgramDetails(id){
    fetch(baseUrl + '/programs/'+ id)
    .then(resp => {
        if (resp.status !== 200) {
            throw new error(resp.statusText);
        }
        return resp.json()
    })
    .catch(errors => console.log(errors))
    .then(program => displayChosenProgram(program, id))
}

function displayChosenProgram(program, id){

    displayProgram(program.data.attributes, id)
    
    let newWorkoutBtn = document.createElement('button')
    newWorkoutBtn.classList.add('btn');
    newWorkoutBtn.innerText = 'Add New Workout';
    newWorkoutBtn.id = id;
    newWorkoutBtn.addEventListener('click', (e) => {renderWorkoutForm(e)});
    programList().appendChild(newWorkoutBtn);
    
    program.included.forEach(workout => displayProgramWorkouts(workout.attributes, workout.id, id))
    
};

function displayProgramWorkouts(workout, id, programId){
    const program = programId;
    const workoutList = document.getElementById('workouts');
    const div = document.createElement('div');
    const description = document.createElement('h1');
    const warmUp = document.createElement('p');
    const date = document.createElement('h2');
    const volume = document.createElement('p');
    const view = document.createElement("button");
    const eList = document.createElement("ul");
    const li = document.createElement("li");
    const fRating = document.createElement('p');
    const name = document.createElement('p')
    
    fRating.innerText = `- Fatigue Rating: ${workout.exercise.fatigueRating}`;
    name.innerText = `- Exercise Name: ${workout.exercise.name}`;
    warmUp.innerText = `- Warm up(if any): ${workout.warmUp}`;
    date.innerText = `Date: ${workout.date}`;
    volume.innerText = `- Number of sets: ${workout.volume}`;
    
    view.classList.add('btn');
    view.innerText = 'view';
    view.id = id;
    view.addEventListener('click', (e) => {viewWorkout(e)})
    
    div.appendChild(date);
    div.appendChild(warmUp);
    div.appendChild(volume);
    li.appendChild(name);
    li.appendChild(fRating);
    eList.appendChild(li);
    div.appendChild(eList);
    workoutList.appendChild(div);
    debugger;
}
function viewWorkout(e){
    e.preventDefault()
}

function renderWorkoutForm(e){
    e.preventDefault()
    const wList = document.getElementById('workout-form');

    wList.innerHTML = 
    `
    <h1 id="form-header">Add Workout</h1>
    <form>
    <div class="input-field"  name="description">
         <select id="description">
            <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
            <option value="Total Body" ${program && program.data.attributes.length == "Total Body" ? 'selected' : ''} >Total Body</option>
            <option value="Push" ${program && program.data.attributes.length == "Push" ? 'selected' : ''} >Push</option>
            <option value="Pull" ${program && program.data.attributes.length == "Pull" ? 'selected' : ''} >Pull</option>
            <option value="Legs" ${program && program.data.attributes.length == "Legs" ? 'selected' : ''} >Legs</option>
            <option value="Upper Body" ${program && program.data.attributes.length == "Upper Body" ? 'selected' : ''} >Upper Body</option>
            <option value="Lower Body" ${program && program.data.attributes.length == "Lower Body" ? 'selected' : ''} >Lower Body</option>
            <option value="Chest" ${program && program.data.attributes.length == "Chest" ? 'selected' : ''} >Chest</option>
            <option value="Back" ${program && program.data.attributes.length == "Back" ? 'selected' : ''} >Back</option>
            <option value="Shoulders" ${program && program.data.attributes.length == "Shoulders" ? 'selected' : ''} >Shoulders</option>
            <option value="Arms" ${program && program.data.attributes.length == "Arms" ? 'selected' : ''} >Arms</option>
            <option value="Legs" ${program && program.data.attributes.length == "Legs" ? 'selected' : ''} >Legs</option>
         </select>
         <label>Muscle Groups worked:</label>
     </div>
        
    </form>
    `
}

// function renderProgramForm(program = null) {
//     programFormContainer().innerHTML =  
//     `
//     <h1 id="form-header">Create Program</h1>
//     <form>
//         Title: <input type="text" id="ptitle"><br>
        
//         <div class="input-field"  name="split">
//             <select id="split">
//                 <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
//                 <option value="Total Body" ${program && program.data.attributes.length == "Total Body" ? 'selected' : ''} >Total Body</option>
//                 <option value="Push, Pull, Legs" ${program && program.data.attributes.length == "Push, Pull, Legs" ? 'selected' : ''} >Push, Pull, Legs</option>
//                 <option value="Upper, Lower" ${program && program.data.attributes.length == "Upper, Lower" ? 'selected' : ''} >Upper, Lower</option>
//                 <option value="Body Part Split" ${program && program.data.attributes.length == "Body Part Split" ? 'selected' : ''} >Body Part Split</option>
//             </select>
//             <label>Split:</label>
//         </div>
//         <div class="input-field"  name="length">
//             <select id="length">
//                 <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
//                 <option value="4" " ${program && program.data.attributes.length == "4" ? 'selected' : ''} >4 weeks</option>
//                 <option value="8"" ${program && program.data.attributes.length == "8" ? 'selected' : ''} >8 weeks</option>
//                 <option value="12"" ${program && program.data.attributes.length == "12" ? 'selected' : ''} >12 weeks</option>
//             </select>
//             <label>length:</label>
//         </div>
//         <div class="input-field"  name="goal">
//             <select id="goal">
//                 <option value="" disabled ${program ? '' : 'selected'}>Choose your option</option>
//                 <option value="Power" ${program && program.data.attributes.goal == "Power" ? 'selected' : ''} >Power</option>
//                 <option value="Strength" ${program && program.data.attributes.goal == "Strength" ? 'selected' : ''} >Strength</option>
//                 <option value="Hypertrophy" ${program && program.data.attributes.goal == "Hypertrophy" ? 'selected' : ''} >Hypertrophy</option>
//                 <option value="Endurance" ${program && program.data.attributes.goal == "Endurance" ? 'selected' : ''} >Endurance</option>
//                 <option value="Stability" ${program && program.data.attributes.goal == "Stability" ? 'selected' : ''} >Stability</option>
//             </select>
//             <label>Goal:</label>
//         </div>
//         Weekly Volume: <input type="integer" id="weeklyVolume"><br>
//         Workouts Per Week: <input type="integer" id="workoutsPerWeek"><br>
//         Start Date: <input type="date" id="startdate"><br>
//         <input type="submit" value="Create">
//     </form>
//     `

// $('select').formSelect();
//     if (program != null){
//         document.getElementById("form-header").innerHTML = "Edit Program";
//         document.getElementById("ptitle").value = program.data.attributes.title,
//         $("#split").val = program.data.attributes.split,
//         document.getElementById("length").value = program.data.attributes.length,
//         document.getElementById("goal").value = program.data.attributes.goal,
//         document.getElementById("weeklyVolume").value = program.data.attributes.weeklyVolume,
//         document.getElementById("workoutsPerWeek").value = program.data.attributes.workoutsPerWeek,
//         document.getElementById("startdate").value = program.data.attributes.startDate
//         // debugger;

//         programFormContainer().addEventListener("submit", (event) => {
//             event.preventDefault(); 
//             programUpdate(event, program.data.id);
//         })
//     } else{
//         programFormContainer().addEventListener("submit", (event) => {
//             event.preventDefault();
//             programFormSubmission(event);
//         });
//     }
        
//     }