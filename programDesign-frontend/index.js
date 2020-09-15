const introduction = () => document.getElementById('title');
const programTitle = () => document.querySelector()
const programList = () => document.getElementById('program-list')
const newProgram = () => document.getElementById('new-program')
const baseUrl = 'http://localhost:3000';
const programFormContainer = document.querySelector("#programFormContainer");
let addProgram = false;


document.addEventListener("DOMContentLoaded", callOnLoad)



function callOnLoad() {
    loadPrograms();
    newProgram.addEventListener("click", () => {
  addProgram = !addProgram;
  if (addProgram) {
      programFormContainer.style.display = "block";
      renderProgramForm()
    } else {
    programFormContainer.style.display = "none";
  }
});

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
    programs.data.forEach(program => displayProgram(program.attributes))
};


function displayProgram(program) {

    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    
    deleteButton.classList.add('btn');
    deleteButton.innerText = 'delete'
    deleteButton.id = program.id;
    deleteButton.addEventListener('click', deleteProgram)
    
    editButton.classList.add('btn');
    editButton.innerText = 'edit';
    editButton.id = program.id;
    editButton.addEventListener('click', editProgram)
    
    
    h1.innerText = program.title;
    h4.innerText = program.split;
    p.innerText = `This is a ${program['goal']} Program. Using a ${program.split}, and will be running for ${program.length} weeks. \n At ${program.workoutsPerWeek} workouts per week each muscle group should hit ${program.weeklyVolume} sets per week.`
    
    div.appendChild(h1);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    
    programList().appendChild(div);
};

function deleteProgram(e){
    let programId = parseInt(e.target.dataset.id)
    fetch(`${baseUrl}/programs/${programId}`,{
        method: 'DELETE'
    })
    this.location.reload()
}


function editProgram(e){
    
}



function renderProgramForm() {
    const programFormContainer = document.getElementById('new-program');
    programFormContainer.innerHTML += 
    `
    <h1>Create Program</h1>
    <form>
        Title: <input type="text" id="title"><br>
        Split: <input type="text" id="split"><br>
        length in weeks: <input type="integer" id="length"><br>
        Goal: <input type="integer" id="goal"><br>
        Weekly Volume: <input type="integer" id="weeklyVolume"><br>
        Workouts Per Week: <input type="integer" id="workoutsPerWeek"><br>
        Start Date: <input type="date" id="startdate"><br>
        <input type="submit" value="Create">
    </form><br>
    `
    programForm.addEventListener("submit", programFormSubmission())
}

function programFormSubmission(){
    event.preventDefault()
    let title = document.getElementById("title").value 
    let split = document.getElementById("split").value 
    let length = document.getElementById("length").value 
    let goal = document.getElementById("goal").value
    let weeklyVolume = document.getElementById("weeklyVolume").value 
    let workoutsPerWeek = document.getElementById("workoutsPerWeek").value 
    let startDate = document.getElementById("startdate").value

    let program = {
        title: title,
        split: split, 
        length: length,
        goal: goal,
        weeklyVolume: weeklyVolume,
        workoutsPerWeek: workoutsPerWeek,
        startDate: startdate
    }

    fetch(baseUrl + `/programs`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application'
        },
        body: JSON.stringify(program)
    })
    .then(resp => resp.json())
    .then(program => {
        let p = new Program (program.id, program.title, program.split, program.length, program.goal, program.weeklyVolume, program.workoutsPerWeek, program.startDate)
        displayProgram(p)
    })
}

// function createForm(){
//     let subscribersForm = document.getElementById("subscribers-form")
//     subscribersForm.innerHTML += 
//     `
//     <h1>
//     Create Subscriber:
//     </h1>
//     <form>
//        Your Photo URL: <input type="text" id="photo"> <br>   
//        Username: <input type="text" id="username"> <br>   
//        Email: <input type="text" id="email"> <br>
//        <input type="submit" value="Create" > 
//     </form> 
//     <br>
//     `
//     subscribersForm.addEventListener("submit", subscriberFormSubmission) 
// }
