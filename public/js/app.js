// jquery template string to create outcomes table
function listTableTemplate(data) {
  var compiled = '';
  data.forEach(item => {
    compiled += `
    <tr class="table-warning">
      <td>${item.make}</td>
      <td>${item.style}</td>
      <td>${item.model}</td>
      <td>${item.ioiha}</td>
      <td><span class="glyphicon glyphicon-pencil" onclick="handleEditAidClick(this)" data-aid-id="${item._id}" style="cursor: pointer;"></span>
      <span class="glyphicon glyphicon-remove" onclick="handleDeleteAidClick(this)" data-aid-id="${item._id}"   style="cursor: pointer;"></span></td>
    </tr>`;
  });
  return compiled;
}

//get data from mongodb
function getAids() {
  return $.ajax('/api/hearingaids')
    .then(res => {
      return res;
    })
    .fail(err => {
      console.log("Error in getAids()", err);
      throw err;
    });
}

//create the main table based on the mongodb data
function refreshAidsList(make) {
  getAids()
    .then(aids => {
      const data = {aids: aids};
      const scoreArray = [];
      window.aids = data;
      $('#list-table-content').html(listTableTemplate(data.aids));
      data.aids.forEach(item => {
        if (item.make === make){
          scoreArray.push(item.ioiha);
          return scoreArray;
        }
      });
      averageByMake(scoreArray);
    });
  }
    //finalScores.push(averageByMake(scoreArray));

const finalScores = [];
// calculates the average of ioiha scores
function averageByMake(scores){
  const newScores = [];
  if (scores.length < 1 || scores == undefined){
    const avg = 0;
    finalScores.push(avg);
  } else {
    const sum = scores.reduce((previous, current) => current += previous);
    const avg = sum / scores.length;
    finalScores.push(avg);
  }

  // pairing the average score to the hearing aid Make
  if (finalScores.length === 7){
    const haMake = ['', 'Phonak', 'Resound', 'Signia', 'Starkey', 'Oticon', 'Widex'];
    const results = {};
    haMake.forEach((key, i) => results[key] = finalScores[i]);

    // var compiled = '';
    // results.forEach(item => {
    //   compiled += `
    //   <tr class="table-warning">
    //     <td>${item.key}</td>
    //     <td>${item.value}</td>
    //   </tr>`;
    // });
    //return compiled;
    return results;
    console.log(results.values);
  }
}

// loop through the six different hearing aid makes to get each ioiha averageByMake
function getHAScore(){
  const haMake = ['Phonak', 'Resound', 'Signia', 'Starkey', 'Oticon', 'Widex'];
  for (i = 0; i < haMake.length; i++) {
    refreshAidsList(haMake[i]);
  }
}

// create an edit button
function handleEditAidClick(element) {
  const aidId = element.getAttribute('data-aid-id');
  //get the array of the item to be edited
  const aid = window.aids.aids.find(aid => aid._id === aidId);
  if (aid) {
    setForm(aid);
  }

  showAddAidForm();
}

// create a soft delete button
function handleDeleteAidClick(element) {
  const aidId = element.getAttribute('data-aid-id');

  if (confirm("Are you sure?")) {
      deleteAid(aidId);
    }
}

function deleteAid(aidId) {
  const url = '/api/hearingaids/' + aidId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      refreshAidsList();
    })
    .catch(err => {
      console.error("Merely a flesh wound!", err);
    });
}

//clear form or populate form with edit information
function setForm(data) {
  data = data || {};

  const formData = {
    make: data.make || '',
    style: data.style || '',
    model: data.model || '',
    ioiha: data.ioiha || '',
    _id: data._id || '',
  };

  $('#makeSelect').val(formData.make);
  $('#styleSelect').val(formData.style);
  $('#modelTextarea').val(formData.model);
  $('#ioihaTextarea').val(formData.ioiha);
  $('#aid-id').val(formData._id);

  if (data._id) {
    $('#form-label').text("Edit Outcome");
  } else {
    $('#form-label').text("Enter New Outcome");
  }
}

// submit hearing aid form data
function submitHAForm() {

// get the values from the form
  const aidData = {
    make: $('#makeSelect').val(),
    style: $('#styleSelect').val(),
    model: $('#modelTextarea').val(),
    ioiha: $('#ioihaTextarea').val(),
    _id: $('#aid-id').val()
  };

// select POST or PUT methods
  let method, url;
  if(aidData._id) {
    method = 'PUT';
    url = 'api/hearingaids/' + aidData._id;
  } else {
    method = 'POST';
    url = 'api/hearingaids';
  }

  fetch(url, {
      method: method,
      body: JSON.stringify(aidData),
      headers: {
          'Content-Type': 'application/json'
      }})
      .then(response => response.json())
      .then(aids => {
          setForm();
          refreshAidsList();
      })
      .catch(err => {
          console.error("A terrible thing has happened", err);
      })

    cancelHAForm();
}

//

// Hide form on page load
function hideHAForm () {
  $('#form-container').hide();
}

// When button is pressed show the form
function showAddAidForm() {
   $('#form-container').show();
}

// When cancel is pressed hide the form and clear the form
function cancelHAForm() {
    setForm();
    hideHAForm();
}
