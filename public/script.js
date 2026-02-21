/* ===========================
   ADMIN PASSWORD PROTECTION
=========================== */

const ADMIN_PASSWORD = "warriors123";

function checkAdmin(){
const input = document.getElementById("adminPass").value;

if(input === ADMIN_PASSWORD){
document.getElementById("adminLogin").style.display="none";
document.getElementById("feedbackSection").style.display="block";
loadFeedback();
}else{
document.getElementById("adminMsg").textContent="Wrong password";
}
}


/* ===========================
   LOAD FEEDBACK (ADMIN ONLY)
=========================== */

function loadFeedback(){
const list = document.getElementById("feedbackList");
if(!list) return;

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