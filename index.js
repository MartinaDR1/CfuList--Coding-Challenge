const STORAGE_KEY = '__cfu-list__';

const totalCfu = document.querySelector('.totalCfu');
const examsListElement = document.querySelector('.exams-list');

const form = document.querySelector('#form');
const nameField = document.querySelector('#name-field');
const profField = document.querySelector('#prof-field');
const cfuField = document.querySelector('#cfu-field');

let exams = [];

const prevList = localStorage.getItem(STORAGE_KEY);

if(prevList) {
    exams= JSON.parse(prevList);

    calculateTotal();

    renderList();
}

form.addEventListener('submit', function (event) {

    event.preventDefault();

    const name = nameField.value.trim();
    const prof = profField.value.trim();
    const cfu = cfuField.value.trim();

    addExam (name,prof,cfu);

    form.reset();
    nameField.focus();
});

//Funzioni

//Aggiungere gli esami
function addExam (name,prof,cfu){

    const newExam = {
        name,
        prof,
        cfu: Number(cfu)
    };

    exams.push(newExam);
    console.log(exams);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));

    calculateTotal();

    renderList();
}



function calculateTotal() {
    let total = 0;

    for (let i= 0; i< exams.length; i++){

        total += exams[i].cfu;
    }

    totalCfu.innerText = total
}

function renderList() {
    
    examsListElement.innerHTML= '';

    for (let i= 0; i< exams.length; i++) {

        const examElement = createListElement (i);

        examsListElement.innerHTML += examElement;
    }

    setDeleteButtons();
}

function createListElement(i) {
    
    const exam = exams [i];

    return `
    <li class="exam">
        <div class="exam-info">
            <h3>${exam.name}</h3>
            <p>${exam.prof}</p>
        </div>
        <strong class="exam-cfu">${exam.cfu}</strong>
        <button class="button" data-index="${i}">❌</button>
    </li>
    `;
}

function setDeleteButtons() {

    const deleteButtons = document.querySelectorAll('.button');

    for (let i=0; i< deleteButtons.length; i++){

        const button= deleteButtons[i];

        button.addEventListener('click', function(){

            const index = button.dataset.index;

            removeExam (index);
        });
    };
}

function removeExam(index) {
    
    exams.splice(index,1);
    console.log(exams);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));

    calculateTotal();

    renderList();

}