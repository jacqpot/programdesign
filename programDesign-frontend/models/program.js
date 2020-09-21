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
    programList().innerHtml = "";
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
    let p = Program.all.findIndex(program => program.id == programId)

     Program.all.splice(p,1)
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
        Weekly Volume per Muscle Group: <input type="integer" id="weeklyVolume"><br>
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
            // debugger;
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
    .then(resp => resp.json())
    .then(response => {
        programFormContainer().innerHTML = "";
        loadPrograms();
    })

}

function clearProgramList(e){
   
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