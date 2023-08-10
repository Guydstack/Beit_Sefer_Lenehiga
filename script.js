// Catch some elements from the DOM
const drivingSchoolsUrl = "https://data.gov.il/api/action/datastore_search?resource_id=3f06e2f2-e2ad-41ac-9665-37d0625537f2&limit=400";
const tableContainer = document.getElementById("hehiga");
const tableMain = document.querySelector(".search");
const inputElement = document.getElementById('searchInput');

// Promise with a fetch to collect data of Driving Schools
const drivingSchools = async () => {
    try {
        const response = await fetch(drivingSchoolsUrl);
        const Schools = await response.json();
        // Sorting the records by alphabet
        const sortedSchools = sortSchoolsByEzor(Schools.result.records);
        // Calling renderSchools function to handel the data
        renderSchools(sortedSchools);
    } catch (error) {
        console.log(error);
    }
};

// Sorting the records by alphabet
const sortSchoolsByEzor = (schools) => {
    return schools.sort((a, b) => a.ezor.localeCompare(b.ezor, 'he', { sensitivity: 'base' }));
};

// Function with array map, getting some info from the data base
const renderSchools = (array) => {
    array.map((records) => {
       let phone;
      //  Checking if a phone number exist or not 
       if (records.telefon.length > 0){
            phone = records.telefon
        }else {
            phone = "לא נמצא";
        }
      // Printing the collected date to the DOM
        tableContainer.innerHTML += `
            <tr class="search-ezor">
                <td>${records._id}</td>
                <td>${records.cod_ezor}</td>
                <td class="ezor">${records.ezor}</td>
                <td>${records.cod_beit_sefer}</td>
                <td class="shem">${records.shem_beit_sefer}</td>
                <td>${records.cod_hiter}</td>
                <td>${records.ktovet}</td>
                <td><a href="tel:${phone}">${phone}</a></td>
                <td>${(records.prati == 0) ? "לא" : (records.prati == 1) ? "כן" : ""}</td>
            </tr>`;
    });
}

// Filtering the list by the input value when user type for search
const filterSchool = (searchTerm) => {
  const schoolRow = tableMain.getElementsByClassName('search-ezor');
  Array.from(schoolRow).forEach((card) => {
    const schoolEzor = card.querySelector('.ezor').textContent;
    const schoolName = card.querySelector('.shem').textContent;
    if (schoolEzor.includes(searchTerm) || schoolName.includes(searchTerm)) {
      card.style.display = 'table-row '; // Show the matching result
    } else {
      card.style.display = 'none'; // Hide non-matching results
    }
  });
};

// Add event to the input and send the value to the filterSchool function to handel
inputElement.addEventListener('input', function (event) {
  const searchTerm = event.target.value.trim();
  filterSchool(searchTerm);
});

// Calling drivingSchools function to start 
drivingSchools();



