document.body.innerHTML= 
`
<div class = "user-form">
<input class="add-user-name" placeholder="Enter your name">
<input class="add-user-avatar" placeholder="Enter your pic url">
<button onclick="addUser()">Add</button>
</div>
<section class="user-list"></section>`;


async function getAllUsers(){
    const data = await fetch("https://6166c4d913aa1d00170a66f7.mockapi.io/users",
    { method: "GET" }
    );
    const users = await data.json();

const userContainer = document.querySelector(".user-list");

userContainer.innerHTML="";  //to erase the old user list

users.forEach(user => {
    userContainer.innerHTML +=`
    <div class="user-container">
    <img class="user-avatar" src="${user.avatar}" alt=${user.name}>
    <div>
    <p class="user-name">${user.name}</p>
    <button onclick="toggleEdit(${user.id})">Edit</button>
    <button onclick="deleteUser(${user.id})">Delete</button>
    <div class="edit-user-form edit-${user.id}">
    <input value=${user.name} class="edit-${user.id}-user-name" placeholder="Enter your name"><br>
    <input value=${user.avatar} class="edit-${user.id}-user-avatar" placeholder="Enter your pic url">
    </div>
    </div>
    </div>
    `;
    
});
}

getAllUsers();

 async function deleteUser(userId){
    console.log("deleting...",userId);
    const data = await fetch("https://6166c4d913aa1d00170a66f7.mockapi.io/users/" + userId,
    { method: "DELETE" }
    );
    // Delete => Refresh the user list - success
    getAllUsers();
}

async function addUser(){
    console.log("Adding...");
   const userName = document.querySelector(".add-user-name").value;
   const userAvatar = document.querySelector(".add-user-avatar").value;

    // 1. Method - post
   //2. Data - Body - stringfy(JSON)- // javascript object -> JSON
   //3. headers - JSON data

   const data = await fetch("https://6166c4d913aa1d00170a66f7.mockapi.io/users",
    { 
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({name:userName,avatar:userAvatar}),
     }
    );
    
    // Add user => Refresh the user list - success
    getAllUsers();
}


function toggleEdit(userId){
    console.log("Editing...");
    const editUserForm = document.querySelector(`.edit-${userId}`);
    editUserForm.style.display = editUserForm.style.display== "block" ? "none" : "block";
}

