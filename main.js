var modules = {
  "Gestion des connaissances": 2,
  "Méthodologie de la recherche scientifique": 1,
  "Droit commercial": 1,
  "Langue étrangère 3": 1,
  "Marketing stratégique": 2,
  "Gestion du comportement organisationnel": 2,
  "Gestion de la créativité et de l'innovation": 2,
};
var moyenneGeneral = document.getElementById("moyennegeneral");
function displaySomething() {
  // Get the reference to the HTML element where you want to display something
  var table = document.getElementById("tableOfModules");

  // Check if the element exists
  if (table) {
    // Display some content in the HTML element
    let id = 1;
    for (var key in modules) {
      if (modules.hasOwnProperty(key)) {
        content = `<tr id="${id}">
            <td>${key}</td>
            <td name="coef" id="coef_${id}">${modules[key]}</td>
            <td name="cour"><input type="number" id="cour_${id}" value="0" min="0" max="20" oninput="limitInput(this)" onchange="calculateAvrg()"></td>
            `;
        if (modules[key] == 2) {
          content += `<td name="td"><input type="number" id="td_${id}" value="0" min="0" max="20" oninput="limitInput(this)" onchange="calculateAvrg()"></td>`;
        } else {
          content += `<td name="td"></td>`;
        }
        content += `<td name="moy" id="moy_${id}"></td>
        </tr>`;

        table.innerHTML += content;
      }
      id++;
    }
  } else {
    console.error('Element with ID "tableOfModules" not found');
  }
}
function calculateAvrg() {
  // Get all rows in the table
  var rows = document.getElementById("tableOfModules").querySelectorAll("tr");
  var moyTotal = 0;

  // Iterate over each row (starting from index 1 to skip the header row)
  for (var i = 1; i < rows.length; i++) {
    var courInput = document.getElementById(`cour_${i}`);
    if (i != 2 && i != 3 && i != 4)
      var tdInput = document.getElementById(`td_${i}`);
    var moyModule = document.getElementById(`moy_${i}`);
    var coef = parseInt(document.getElementById(`coef_${i}`).innerText);

    // Ensure input values are between 0 and 20
    var courValue = Math.min(Math.max(parseFloat(courInput.value) || 0, 0), 20);
    var tdValue =
      i == 2 || i == 3 || i == 4
        ? 0
        : Math.min(Math.max(parseFloat(tdInput.value) || 0, 0), 20);

    // Calculate the average of the module
    var result = (courValue + tdValue) / (i == 2 || i == 3 || i == 4 ? 1 : 2);

    // Update the result in the "moy" cell
    moyModule.innerText = result.toFixed(2);
    moyTotal += moyModule.innerText * coef;
  }
  temp = (moyTotal / 11).toFixed(2)
  moyenneGeneral.innerText = temp;
  // Apply styles based on the overall average value
  if (temp < 9.2) {
    moyenneGeneral.style.color = "red";
    moyenneGeneral.style.fontSize = "20px";
  } else if (temp < 10) {
    moyenneGeneral.style.color = "orange";
    moyenneGeneral.style.fontSize = "20px";
  } else {
    moyenneGeneral.style.color = "green";
    moyenneGeneral.style.fontSize = "20px";
  }
}
function limitInput(inputElement) {
  // Limit the input value to the range 0 to 20
  inputElement.value = Math.min(
    Math.max(parseInt(inputElement.value) || 0, 0),
    20
  );
}

// Call the function when the page is loaded
document.addEventListener("DOMContentLoaded", displaySomething);
