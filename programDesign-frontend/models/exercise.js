
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


