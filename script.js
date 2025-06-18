function myFunction() {
    const formGrades = document.getElementById("fGrades").value;
    const summativeGrades = document.getElementById("sGrades").value;
    const formGradesArray = formGrades.split(",");
    const sumGradesArray = summativeGrades.split(",");
    const numFormGradesArray = formGradesArray.map(Number);
    const numSumGradesArray = sumGradesArray.map(Number);
    const formGradeCount = numFormGradesArray.length;
    const sumGradeCount = numSumGradesArray.length;
    let formGradeAddedUp = 0;
    let sumGradeAddedUp = 0;
    for (let i = 0; i<numFormGradesArray.length; i++) {
        formGradeAddedUp += numFormGradesArray[i];
    }
    for (let i = 0; i<numSumGradesArray.length; i++) {
        sumGradeAddedUp += numSumGradesArray[i];
    }
    const result = ((formGradeAddedUp / formGradeCount) * 0.3)+((sumGradeAddedUp / sumGradeCount) * 0.7);
    if (!isNaN(result)) {
        document.getElementById("grade").style.fontSize = "5rem";
        document.getElementById("grade").innerHTML = ("Grade: " + (result.toFixed(2)));
    }
    else {
        document.getElementById("grade").style.fontSize = "2rem";
        document.getElementById("grade").innerHTML = ("Make sure you only put numbers and commas.")
    }
}