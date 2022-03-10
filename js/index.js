const bgColor = ['secondary', 'success', 'danger', 'dark'];
const html = document.querySelector('.container-2');

const storedData = JSON.parse(localStorage.getItem('dummy'))
                      ?.sort(() => Math.random() - 0.5) 
                      || [];


if(storedData.length > 0) {
  
    displayData(storedData);

} else {
    
    getData();
}



function displayData(data){

   html.innerHTML = data.map((element, index) => {

      let randomPick = bgColor[Math.floor(Math.random() * bgColor.length)];
      return `<div class="card mb-2 text-light  bg-${randomPick}">
      <div class="card-header">
          <h5 class="card-title">
          ${element.slice(0,15)}...
          <span class="align-right"><i data-copy="${element}" class="far fa-copy"></i></span>
          </h5>
          
      </div>
          <div class="card-body">
            <p class="card-text">${element}</p>
          </div>
        </div>`

    }).join('');
      
}


// Get data from API
async function getData() {

    const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=60&format=json');

    const data = await response.json()
    localStorage.setItem('dummy', JSON.stringify(data));
    
    displayData(data);
}





    // Copy to clipboard
    document.addEventListener('click', function(e) {

      let target = e.target 
      // Check if the target have data-copy attribute
      if(target?.dataset.copy) {
        navigator.clipboard.writeText(target.dataset.copy);
      }
  });

