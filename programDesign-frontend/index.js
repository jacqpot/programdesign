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





