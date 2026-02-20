/* ---------- LOGIN ---------- */
const loginForm = document.getElementById("loginForm");

if(loginForm){
loginForm.addEventListener("submit", e=>{
e.preventDefault();
localStorage.setItem("loggedIn", "true");
document.getElementById("loginMsg").textContent="Logged in!";
});
}

/* ---------- FEEDBACK ---------- */
const feedbackForm = document.getElementById("feedbackForm");

if(feedbackForm){
feedbackForm.addEventListener("submit", e=>{
e.preventDefault();

const rating = Number(document.getElementById("rating").value);
const comment = document.getElementById("comment").value;

let data = JSON.parse(localStorage.getItem("ratings")) || [];
data.push({rating, comment});

localStorage.setItem("ratings", JSON.stringify(data));

document.getElementById("thanks").textContent="Thanks for your feedback!";
feedbackForm.reset();
});
}

/* ---------- DISPLAY AVERAGE ---------- */
const avgDisplay = document.getElementById("avgRating");

if(avgDisplay){
let data = JSON.parse(localStorage.getItem("ratings")) || [];

if(data.length === 0){
avgDisplay.textContent="No ratings yet";
}else{
let sum = data.reduce((a,b)=>a+b.rating,0);
let avg = (sum / data.length).toFixed(2);
avgDisplay.textContent = avg + " / 5 ⭐ ("+data.length+" reviews)";
}
}