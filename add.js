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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Realtime Database
const productsDB = firebase.database().ref('products');

// Handle form submission
document.getElementById("addform").addEventListener("submit", function (e) {
    e.preventDefault();
    const productname = getElementVal("productname");
    // const weight = getElementVal("weight");
    const price = getElementVal("price");
    const phone = getElementVal("phone");
    const address = getElementVal("address");
    const currentDate = new Date();

// Get the year, month, and day components
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
const day = currentDate.getDate();

// Convert the components to a formatted string
const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    // Upload the image and then save details
    uploadImage(productname, price, phone, address,formattedDate);
    document.getElementById("alart").style.display = "block";
    setTimeout(() => {
        document.getElementById("alart").style.display = "none";
    }, 3000);

    // Reset form
    document.getElementById("addform").reset();
});


function uploadImage(productname, price, phone, address,d) {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#image").files[0];
    const name = new Date() + '-' + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);

    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            // Now that you have the URL, save details including the URL
            savedetails(productname, price, phone, address, url,d);
        })
        .catch(error => {
            console.error("Error uploading image:", error);
        });
}

// Upload data and image URL
function savedetails(productname, price, phone, address, imageUrl,date) {
    const newAddForm = productsDB.push();
    newAddForm.set({
        pname: productname,
        price: price,
        phone: phone,
        address: address,
        imageUrl: imageUrl,
        date: date // Include the image URL in the data
    });
}

// Get element value by ID
function getElementVal(id) {
    return document.getElementById(id).value;
}