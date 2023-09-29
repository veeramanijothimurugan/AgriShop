const firebaseConfig = {
    apiKey: "AIzaSyDthIP57USRjfD8Btu14YDjbZ_-Sps5uoE",
    authDomain: "agrishop-8320b.firebaseapp.com",
    databaseURL: "https://agrishop-8320b-default-rtdb.firebaseio.com/",
    projectId: "agrishop-8320b",
    storageBucket: "agrishop-8320b.appspot.com",
    messagingSenderId: "284533778289",
    appId: "1:284533778289:web:13e6ff9b291bfafe2a78d0",
    measurementId: "G-HTTSS4PGNX"
  };

  //initialize fire base
  firebase.initializeApp(firebaseConfig);

  const productsDB = firebase.database().ref('products');
// Retrieve data from the database and create grid of cards
productsDB.once('value').then(snapshot => {
    const cardsGrid = document.getElementById('cardsGrid');

    // Convert the snapshot results to an array and reverse the order
    const productsArray = [];
    const keyarray = [];
    snapshot.forEach(childSnapshot => {
        productsArray.push(childSnapshot.val());
        keyarray.push(childSnapshot.key);
    });
    productsArray.reverse(); // Reverse the array order
    keyarray.reverse();

    // Append the reversed array to the DOM
    productsArray.forEach(productDetails => {
        const card = createCardElement(productDetails);
        const date = productDetails.date;
        const expiry=differenceInDays(date);
    if(7-expiry>0){
        cardsGrid.appendChild(card);
    }
    });
});

function differenceInDays(date1) {
    const currentDate = new Date();
    const d= new Date(date1);
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffMilliseconds = Math.abs(d - currentDate);
    return Math.floor(diffMilliseconds / oneDay);
}


// Create card element with details and "Buy" button
function createCardElement(productDetails) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    // Create an image element
    const image = document.createElement('img');
    image.className = 'card-image';
    image.src = productDetails.imageUrl; // Assuming you have an "imageUrl" field in your data

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = productDetails.pname;

    const weightPerKg = document.createElement('p');
    weightPerKg.className = 'card-text';
    weightPerKg.textContent = `Weight per kg: ${productDetails.price} ₹`;

    const availableWeight = document.createElement('p');
    availableWeight.className = 'card-text';
    availableWeight.textContent = `Available weight: ${productDetails.weight} kg`;


    const date=productDetails.date;
    const expiry=differenceInDays(date);    
    const exp = document.createElement('p');
    exp.className = 'card-text';
    exp.textContent = `Expires in ${7-expiry} days`;
    exp.classList.add('expires-text');
    // const contact = document.createElement('p');
    // contact.className = 'card-text';
    // contact.textContent = `Contact: ${productDetails.phone}`;

    // const address = document.createElement('p');
    // address.className = 'card-text';
    // address.textContent = `Address: ${productDetails.address}`;


    const buyButton = document.createElement('button');
    buyButton.className = 'buy-button';
    buyButton.textContent = 'Buy';


    // Attach event listener to "Buy" button
    buyButton.addEventListener('click', () => {
        // Redirect to product details page (buy.html) and pass the product details as query parameters
        const queryParams = `?pname=${encodeURIComponent(productDetails.pname)}&availableWeight=${encodeURIComponent(productDetails.weight)}&weightPerKg=${encodeURIComponent(productDetails.price)}&phone=${encodeURIComponent(productDetails.phone)}&address=${encodeURIComponent(productDetails.address)}&imageUrl=${encodeURIComponent(productDetails.imageUrl)}`;
        window.location.href = `buy.html${queryParams}`;
    });

    
    cardContent.appendChild(image); // Add the image to the card content
    cardContent.appendChild(title);
            cardContent.appendChild(weightPerKg);
            cardContent.appendChild(availableWeight);
            cardContent.appendChild(exp);
            //cardContent.appendChild(contact);
            //cardContent.appendChild(address);
            cardContent.appendChild(buyButton);

    card.appendChild(cardContent);

    return card;
}

// ... Your existing Firebase configuration and setup ...

// Function to filter cards based on search query
function filterCards(searchQuery) {
    const cards = document.getElementsByClassName('card');
    let noItemsFound = true;
    
    for (const card of cards) {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        if (title.includes(searchQuery.toLowerCase())) {
            card.style.display = 'block'; // Show the card
            noItemsFound = false;
        } else {
            card.style.display = 'none'; // Hide the card
        }
    }
    
    const noItemsMessage = document.getElementById('noItemsMessage');
    if (noItemsFound) {
        noItemsMessage.style.display = 'block';
    } else {
        noItemsMessage.style.display = 'none';
    }
}

// Handle search button click
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();
    filterCards(searchQuery);
});

// Handle search input change (for live search)
document.getElementById('searchInput').addEventListener('input', () => {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();
    filterCards(searchQuery);
});

// ... Your existing code to retrieve and display cards ...

