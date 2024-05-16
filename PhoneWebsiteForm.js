document
    .getElementById("surveyForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();
 
            let nameField =
                document.getElementById(
                    "name"
                );
            let ageField =
                document.getElementById(
                    "age"
                );
            let errorText =
                document.getElementById(
                    "errorText"
                );
 
            let name = nameField.value;
            let age = ageField.value;
 
        // Creating a regular expression for Name field
            
            let Regex = /^[A-Za-z ]+$/;
 
// Adding success message and styles
            errorText.innerHTML =
                "Submitted Successfully";
            errorText.classList.add(
                "successText"
            );
 
            const formData =
                new FormData(
                    event.target
                );
            const formValues = {};
 
    // each value in the object
            formData.forEach(
                (value, key) => {
                    formValues[key] =
                        value;
                }
            );
 
            //  function
            const csvContent =
                convertToCSV(
                    formValues
                );
            const blob = new Blob(
                [csvContent],
                { type: "text/csv" }
            );
 
// Clink for downloading excel sheet
            const link =
                document.createElement(
                    "a"
                );
            link.href =
                window.URL.createObjectURL(
                    blob
                );
            link.download =
                "survey_data.csv";
            link.click();
        }
    );
// Function to convert object to csv
function convertToCSV(objArr) {
    const array =
        typeof objArr !== "object"
            ? JSON.parse(objArr)
            : objArr;
    let result = "";
 
    // Add commas to make it as csv
    const header =
        Object.keys(array).join(",") +
        "\n";
    result += header;
 
    for (const item in array) {
        if (
            array.hasOwnProperty(item)
        ) {
            result += array[item] + ",";
        }
    }
    result = result.slice(0, -1);
    result += "\n";
 
    return result;
}