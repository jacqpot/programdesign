const introduction = () => document.getElementById('title');
const programTitle = () => document.querySelector()
const programList = () => document.getElementById('program-list')
const newProgramBtn = () => document.getElementById('new-program')
const baseUrl = 'http://localhost:3000';
const programFormContainer = () => document.getElementById("programFormContainer");



document.addEventListener("DOMContentLoaded", callOnLoad)



function callOnLoad() {
    loadPrograms();
    programFormContainer().innerHTML = ''
    newProgramBtn().addEventListener("click", (event) => {renderProgramForm()});
     

      
}

function loadPrograms() {
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


function editProgram(e){
    
}



function renderProgramForm() {

    programFormContainer().innerHTML =  
    `
    <h1>Create Program</h1>
    <form>
        Title: <input type="text" id="ptitle"><br>

        <div class="input-field" id="split" name="split">
            <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Total Body</option>
                <option value="2">Push, Pull, Legs</option>
                <option value="3">Upper, Lower</option>
                <option value="4">Body Part Split</option>
            </select>
            <label>Split:</label>
        </div>
        <br>
        <div class="input-field" id="length" name="length">
            <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">4 weeks</option>
                <option value="2">8 weeks</option>
                <option value="3">12 weeks</option>
            </select>
            <label>length:</label>
        </div>
        <div class="input-field" id="goal" name="goal">
        <select>
            <option value="" disabled selected>Choose your option</option>
            <option value="1">Power</option>
            <option value="2">Strength</option>
            <option value="3">Hypertrophy</option>
            <option value="4">Endurance</option>
            <option value="5">Stability</option>
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
    programFormContainer().addEventListener("submit", (event) => {programFormSubmission(event)})

}

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
    let pn = e.target.parentNode
    console.log(pn);
    document.getElementById("program-list").innerHTML = "";
    getProgramDetails(e.target.id)
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
    .then(program => displayChosenProgram(program))
}

function displayChosenProgram(program){

    displayProgram(program.data.attributes, program.id)
    program.included.forEach(workout => displayProgramWorkouts(workout.attributes, workout.id))
    
};

function displayProgramWorkouts(workout, id){
    // debugger;
    const workoutList = document.getElementById('workouts');
    const div = document.createElement('div');
    const description = document.createElement('h1');
    const warmUp = document.createElement('h4');
    const date = document.createElement('p');
    const volume = document.createElement('p');
    const view = document.createElement("button");
    description.innerText = workout.description;
    warmUp.innerText = workout.warmUp;
    date.innerText = workout.date;
    volume.innerText = workout.volume;
    
    view.classList.add('btn');
    view.innerText = 'view';
    view.id = id;
    view.addEventListener('click', (e) => {viewWorkout(e)})

    div.appendChild(description);
    div.appendChild(warmUp);
    div.appendChild(date);
    div.appendChild(volume);
    workoutList.appendChild(div);
}
function viewWorkout(e){

}