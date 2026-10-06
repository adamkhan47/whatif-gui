let formGradesArray = [];
let summativeGradesArray = [];


function addFormative() {
    const formGrades = document.getElementById("fGrades").value;
    formGradesArray.push(Number(formGrades));
    calculate();
    generateButtons();
}

function addSummative() {
    const summativeGrades = document.getElementById("sGrades").value;
    summativeGradesArray.push(Number(summativeGrades));
    calculate();
    generateButtons();
}
function addGradesFromOtherSource(formArray, sumArray) {
    for (let i = 0; i < formArray.length; i++) {
        formGradesArray.push(formArray[i]);
    }
    for (let i = 0; i < sumArray.length; i++) {
        summativeGradesArray.push(sumArray[i]);
    }
    calculate();
}
// test this with: http://127.0.0.1:5500/?addGradesFromOtherSources=[1,2,3],[4,5000,6] (url obv diff not localhost)
const urlParams = new URLSearchParams(window.location.search);
const rawParam = urlParams.get('addGradesFromOtherSources');
if (rawParam) {
    const parsed = JSON.parse(`[${rawParam}]`);
    addGradesFromOtherSource(parsed[0], parsed[1]);
}

function calculate() {
    let formGradeAddedUp = 0;
    let sumGradeAddedUp = 0;
    for (let i = 0; i < formGradesArray.length; i++) {
        formGradeAddedUp += formGradesArray[i];
    }
    for (let i = 0; i < summativeGradesArray.length; i++) {
        sumGradeAddedUp += summativeGradesArray[i];
    }

    let formGradeCount = formGradesArray.length;
    let sumGradeCount = summativeGradesArray.length;
    if (formGradeCount === 0) {
        formGradeCount = 1;
    }
    if (sumGradeCount === 0) {
        sumGradeCount = 1;
    }

    const result = ((formGradeAddedUp / formGradeCount) * 0.3) + ((sumGradeAddedUp / sumGradeCount) * 0.7);
    if (!isNaN(result)) {
        document.getElementById("grade").style.fontSize = "5rem";
        document.getElementById("grade").innerHTML = ("Grade: " + (result.toFixed(2)));
    }
    else {
        document.getElementById("grade").style.fontSize = "2rem";
        document.getElementById("grade").innerHTML = ("Make sure you only put numbers.")
    }
}

function generateButtons() {
    let fcontainer = document.getElementById("formatives");
    let scontainer = document.getElementById("summative");
    fcontainer.innerHTML = "";
    scontainer.innerHTML = "";

    formGradesArray.forEach((grade) => {
        let btn = document.createElement('button');
        btn.textContent = grade;
        btn.className = "remove-button";
        btn.addEventListener('click', () => {
            let index = formGradesArray.indexOf(grade);
            formGradesArray.splice(index, 1);
            calculate();
            generateButtons();
        });
        fcontainer.appendChild(btn);
    });

    summativeGradesArray.forEach((grade) => {
        let btn = document.createElement('button');
        btn.textContent = grade;
        btn.className = "remove-button";
        btn.addEventListener('click', () => {
            let index = summativeGradesArray.indexOf(grade);
            summativeGradesArray.splice(index, 1);
            calculate();
            generateButtons();
        });
        scontainer.appendChild(btn);
    });
}