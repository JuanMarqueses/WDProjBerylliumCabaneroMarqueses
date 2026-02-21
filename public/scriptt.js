/* ===========================
   LOGIN SYSTEM
=========================== */

const loginForm = document.getElementById("loginForm");

if(loginForm){
loginForm.addEventListener("submit", e=>{
e.preventDefault();

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

/* check if user exists */
let existing = users.find(u => u.username === username);

if(existing){
if(existing.password === password){
localStorage.setItem("currentUser", username);
document.getElementById("loginMsg").textContent="Login successful!";
}else{
document.getElementById("loginMsg").textContent="Wrong password";
}
}else{
/* create new account automatically */
users.push({username,password});
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("currentUser", username);
document.getElementById("loginMsg").textContent="Account created!";
}
});
}


/* ===========================
   FEEDBACK SYSTEM
=========================== */

const feedbackForm = document.getElementById("feedbackForm");

if(feedbackForm){

const user = localStorage.getItem("currentUser");

if(!user){
alert("You must login first.");
window.location.href="login.html";
}

feedbackForm.addEventListener("submit", e=>{
e.preventDefault();

const rating = Number(document.getElementById("rating").value);
const comment = document.getElementById("comment").value;

let data = JSON.parse(localStorage.getItem("ratings")) || [];

data.push({
user,
rating,
comment
});

localStorage.setItem("ratings", JSON.stringify(data));

document.getElementById("thanks").textContent="Thanks for your feedback!";
feedbackForm.reset();
});
}


/* ===========================
   SHOW AVERAGE RATING
=========================== */

const avgDisplay = document.getElementById("avgRating");

if(avgDisplay){
let data = JSON.parse(localStorage.getItem("ratings")) || [];

if(data.length === 0){
avgDisplay.textContent="No ratings yet";
}else{
let sum = data.reduce((a,b)=>a+b.rating,0);
let avg = (sum/data.length).toFixed(2);
avgDisplay.textContent = avg + " / 5 ⭐ ("+data.length+" reviews)";
}
}


/* ===========================
   SHOW ALL FEEDBACK PAGE
=========================== */

const list = document.getElementById("feedbackList");

if(list){
let data = JSON.parse(localStorage.getItem("ratings")) || [];

if(data.length === 0){
list.innerHTML="<p>No feedback yet</p>";
}else{
data.forEach(f=>{
list.innerHTML += `
<div class="feedback-item">
<strong>${f.user}</strong>
<p>Rating: ${f.rating} ⭐</p>
<p>${f.comment}</p>
<hr>
</div>
`;
});
}
}