const firebaseConfig = {
    apiKey: "AIzaSyDthIP57USRjfD8Btu14YDjbZ_-Sps5uoE",
    authDomain: "agrishop-8320b.firebaseapp.com",
    databaseURL: "https://agrishop-8320b-default-rtdb.firebaseio.com",
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
    snapshot.forEach(childSnapshot => {
        productsArray.push(childSnapshot.val());
    });
    productsArray.reverse(); // Reverse the array order

    // Append the reversed array to the DOM
    productsArray.forEach(productDetails => {
        const card = createCardElement(productDetails);
        cardsGrid.appendChild(card);
    });
});


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
    weightPerKg.textContent = `Weight per kg: ${productDetails.weight} kg`;

    const totalWeight = document.createElement('p');
    totalWeight.className = 'card-text';
    totalWeight.textContent = `Total weight: ${productDetails.totalWeight} kg`;

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
        // Handle buy action or navigate to purchase page
        // You can use productDetails.productId or any other identifier to track the selected product
    });

    cardContent.appendChild(image); // Add the image to the card content
   cardContent.appendChild(title);
            cardContent.appendChild(weightPerKg);
            cardContent.appendChild(totalWeight);
            //cardContent.appendChild(contact);
            //cardContent.appendChild(address);
            cardContent.appendChild(buyButton);

    card.appendChild(cardContent);

    return card;
}