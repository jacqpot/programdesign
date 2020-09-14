const introduction = () => document.getElementById('title');
const programTitle = () => document.querySelector()
const programList = () => document.getElementById('program-list')
const newbtn = document.getElementById('new-program')
const baseUrl = 'http://localhost:3000'


document.addEventListener("DOMContentLoaded", callOnLoad)


function callOnLoad() {
    loadPrograms()
    newbtn.addEventListener('click', renderProgramForm)
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
    this.id 
    this.parentNode
    
    fetch(baseUrl + '/programs/' + this.id,{
        method: "delete"
    })
    .then(resp => {
        return resp.json();
    })
    .then(data => {
        this.parentNode.remove();
    })
}


function editProgram(e){
    
}

function editBlog(e) {
    editing = true;
    
    // populate form inputs
    //     blogTitle().value = this.parentNode.querySelector('h4').innerText
    //     blogContent().value = this.parentNode.querySelector('p').innerText;
    //     submitButton().value = "Edit Blog"
    
    //     editedBlogId = this.id;
    // debugger;
    //   }

    function renderProgramForm(){
        const main = document.getElementById('main')
        const div = document.createElement('div');
        const form = document.createElement('form');
            form.id = "program-form"
        const title = document.createElement('input');
            title.type = "string"
            title.name = "program-title"
            title.id = "program-title"
        const tLabel = document.createElement('label');
            tLabel.for = "program-title"
        const startdate = document.createElement('input');
        const sdLabel = document.createElement('label');
        const split = document.createElement('input');
        const sLabel = document.createElement('label');
        const workoutsPerWeek = document.createElement('input');
        const wpwLabel = document.createElement('label');
        const weeklyVolume = document.createElement('input');
        const vLabel = document.createElement('label');
        const goal = document.createElement('input');
        const gLabel = document.createElement('label');
        const length = document.createElement('input');
        const lLabel = document.createElement('label');

}

function createProgram(e) {
    e.preventDefault();
    if(editing) {
        updateBlog();
    } 
    else {
        const strongParams = {
            program: {
                startdate: programTitle().value
                
            }
        }
    }
}