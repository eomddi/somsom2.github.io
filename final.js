/* 1. 실시간 시계 */
const clock = document.querySelector("#clock");

function getClock() {
    const today = new Date();    
    const hours = String(today.getHours()).padStart(2,"0");
    const minutes = String(today.getMinutes()).padStart(2,"0");
    const seconds = String(today.getSeconds()).padStart(2,"0");
    
    clock.innerText = `${hours} : ${minutes} : ${seconds}`;
}

getClock();
setInterval(getClock, 1000);

/* 2.로컬 스토리지를 사용한 로그인 */
const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
const greeting = document.getElementById("greeting");

const HIDDEN_CLASSNAME = "hidden"; 
const USERNAME_KEY = "username";

const link = document.querySelector("a");

function onLoginSubmit(tomato){

    tomato.preventDefault(); 

    loginForm.classList.add("HIDDEN_CLASSNAME");
    const username = loginInput.value;
    localStorage.setItem("USERNAME_KEY", username);

    console.log(username);
    paintGreetings(username);
}



loginForm.addEventListener("submit", onLoginSubmit);


function paintGreetings(username){
    greeting.innerText = `Hello ${username} :)`;
    greeting.classList.remove(HIDDEN_CLASSNAME);

}

const savedUsername = localStorage.getItem("USERNAME_KEY");

if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}




/* 3. 로컬 스토리지를 사용한 투두리스트 */

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(a){
    const li = a.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.addEventListener("click", deleteTodo)
    li.appendChild(span);
    li.appendChild(btn);
    toDoList.appendChild(li);
}



function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;    
    toDoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id:Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if(savedToDos!== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); 
}

/* 4. 랜덤 배경 이미지 */
const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34"
];

const wrap = document.querySelector("#wrap");
const bgChangeBtn = document.querySelector(".bgChangeBtn");
handleClick();
function handleClick() {
  const a = colors[Math.floor(Math.random() * colors.length)];
  const b = colors[Math.floor(Math.random() * colors.length)];

  wrap.style.background = `linear-gradient(to left, ${a}, ${b})`;
}

bgChangeBtn.addEventListener("click", handleClick);


/* 5.날씨와 위치 (geolocation) */

const API_KEY = "0f45b772109d2b54b256a453c5d5b72a";
 
function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        });
}

function onGeoError(){
    alert("can't find you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

/* quote */
const quotes = [
    {
        quoteEng : "Don't dwell on the past.",
        quoteKor : "과거에 연연하지 마세요."
    },
    {
        quoteEng : "Believe in yourself.",
        quoteKor : "자기 자신을 믿으세요."
    },
    {
        quoteEng : "Follow your heart.",
        quoteKor : "마음이 원하는 대로 따르세요."
    },
    {
        quoteEng : "Seize the day.",
        quoteKor : "오늘을 즐기세요."
    },
    {
        quoteEng : "You only live once.",
        quoteKor : "인생은 한 번 뿐이에요."
    },
    {
        quoteEng : "Where there is a will there is a way",
        quoteKor : "뜻이 있는 곳엔 길이 있다."
    },
    {
        quoteEng : "Don't beat yourself up.",
        quoteKor : "자책하지 마세요."
    },
    {
        quoteEng : "Life is a journey.",
        quoteKor : "인생은 여정이다."
    }    
];

const quoteEng = document.querySelector("#quote span:first-child");
const quoteKor = document.querySelector("#quote span:last-child");

const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];

quoteEng.innerText = todayQuote.quoteEng;
quoteKor.innerText = todayQuote.quoteKor;

