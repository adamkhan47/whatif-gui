let formGradesArray = [];
let summativeGradesArray = [];

function addFormative() {
    const formGrades = document.getElementById("fGrades").value;
    formGradesArray.push(Number(formGrades));
    calculate();
    document.getElementById("fGrades").value = "";
}

function addSummative() {
    const summativeGrades = document.getElementById("sGrades").value;
    summativeGradesArray.push(Number(summativeGrades));
    calculate();
    document.getElementById("sGrades").value = "";
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
        document.getElementById("grade").innerHTML = ("Make sure you only put numbers and commas.")
    }
}