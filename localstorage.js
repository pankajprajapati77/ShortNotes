localStorage.setItem("name", "pankaj");
localStorage.setItem("age", "22");
localStorage.setItem("lastname", "prajapati");
localStorage.setItem("pursuing", "Btech");

let data = localStorage.getItem("name");
let data1 = localStorage.name;  //ese bhi get kar sakte h
console.log(data);

// let remove = localStorage.removeItem("age");
delete localStorage.name; //ese bhi remove kar sakte h
// console.log(remove);

// let clear = localStorage.clear();

let key = localStorage.key(2);
console.log(key);

let length = localStorage.length;
console.log(length);
