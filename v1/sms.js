// function confirm_order(){
//     console.log("confirm_order() function called");
//     const accountSid = 'AC44e0f800c0d762ed37457e504de2fc0b';
//     const authToken = 'd3731453c3210ca9dce8dfe3d58c6e44';
//     const twilioPhoneNumber = '+18146663257';
//     const recipientPhoneNumber = '+918072640512';
//     const message = 'Order successfully';

//     const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

//     const formData = new FormData();
//     formData.append('To', recipientPhoneNumber);
//     formData.append('From', twilioPhoneNumber);
//     formData.append('Body', message);

//     fetch(url, {
//         method: 'POST',
//         headers: {
//             Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`)
//         },
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Message sent successfully:', data);
//             // Optionally, display a success message to the user
//         })
//         .catch(error => {
//             console.error('Error sending message:', error);
//             // Optionally, display an error message to the user
//         });
// }