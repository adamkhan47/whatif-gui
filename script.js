let formGradesArray = [];
let summativeGradesArray = [];

let formEC = [];
let summativeEC = [];

// Add EC support. it shouldnt be a full summative but if u get a 5 on extra credit it shouldnt treat it as a 5/100. it should ADD 5 to another summative.

// For example. [100,100,100,95,100,98,100,93,100,100],[90,92,5,90] theres a 5 which brings the average down to a 78.05. however the 5 extra credit should add to 90.


function addFormative(isEC) {
    const formGrades = document.getElementById("fGrades").value;
    let grade = Number(formGrades);
    if (isEC) {
        formEC.push(grade);
    }
    else {
        formGradesArray.push(grade);
    }
    calculate();
    generateButtons();
}

function addSummative(isEC) {
    const summativeGrades = document.getElementById("sGrades").value;
    let grade = Number(summativeGrades);
    if (isEC) {
        summativeEC.push(grade);
    }
    else {
        summativeGradesArray.push(grade);
    }
    calculate();
    generateButtons();
}
function addGradesFromOtherSource(formArray, sumArray) {
    for (let i = 0; i < formArray.length; i++) {
        let val = String(formArray[i]);
        if (val.includes("EC")) {
            formEC.push(Number(val.replace("EC", "")));
        }
        else {
            formGradesArray.push(Number(val));
        }
    }
    for (let i = 0; i < sumArray.length; i++) {
        let val = String(sumArray[i]);
        if (val.includes("EC")) {
            summativeEC.push(Number(val.replace("EC", "")));
        }
        else {
            summativeGradesArray.push(Number(val));
        }
    }
    calculate();
    generateButtons();
}
// test this with: http://127.0.0.1:5500/?addGradesFromOtherSources=[1,2,3],[4,5000,6] (url obv diff not localhost)
const urlParams = new URLSearchParams(window.location.search);
const rawParam = urlParams.get('addGradesFromOtherSources');
if (rawParam) {
    const sanitized = rawParam.replace(/([a-zA-Z0-9]+)/g, (match) => {
        return isNaN(match) ? `"${match}"` : match;
    });
    const parsed = JSON.parse(`[${sanitized}]`);
    addGradesFromOtherSource(parsed[0], parsed[1]);
}

function calculate() {
    let formGradeAddedUp = 0;
    let sumGradeAddedUp = 0;
    for (let i = 0; i < formGradesArray.length; i++) {
        formGradeAddedUp += formGradesArray[i];
    }
    for (let i = 0; i < formEC.length; i++) {
        formGradeAddedUp += formEC[i];
    }
    for (let i = 0; i < summativeGradesArray.length; i++) {
        sumGradeAddedUp += summativeGradesArray[i];
    }
    for (let i = 0; i < summativeEC.length; i++) {
        sumGradeAddedUp += summativeEC[i];
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

    // fix this. working: button color for yellow  goes fully around. but purple and green ar eonly on top???
    formGradesArray.forEach((grade) => {
        let btn = document.createElement('button');
        btn.textContent = grade;
        btn.className = "remove-button";
        btn.style.borderColor = "green";
        btn.style.borderWidth = "2px";
        btn.style.borderStyle = "solid";
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
        btn.style.borderColor = "purple";
        btn.style.borderWidth = "2px";
        btn.style.borderStyle = "solid";
        btn.addEventListener('click', () => {
            let index = summativeGradesArray.indexOf(grade);
            summativeGradesArray.splice(index, 1);
            calculate();
            generateButtons();
        });
        scontainer.appendChild(btn);
    });

    formEC.forEach((grade) => {
        let btn = document.createElement('button');
        btn.textContent = grade;
        btn.className = "remove-button";
        btn.style.borderColor = "yellow";
        btn.style.borderWidth = "2px";
        btn.style.borderStyle = "solid";
        btn.addEventListener('click', () => {
            let index = formEC.indexOf(grade);
            formEC.splice(index, 1);
            calculate();
            generateButtons();
        });
        fcontainer.appendChild(btn);
    });

    summativeEC.forEach((grade) => {
        let btn = document.createElement('button');
        btn.textContent = grade;
        btn.className = "remove-button";
        btn.style.borderColor = "yellow";
        btn.style.borderWidth = "2px";
        btn.style.borderStyle = "solid";
        btn.addEventListener('click', () => {
            let index = summativeEC.indexOf(grade);
            summativeEC.splice(index, 1);
            calculate();
            generateButtons();
        });
        scontainer.appendChild(btn);
    });
}