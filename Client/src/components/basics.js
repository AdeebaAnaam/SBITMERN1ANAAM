console.log("hello");
// variable let
let age=50;
age = 53;// upadted 
console.log("age",age);
// variable var
var name= "john";
//var name ="cena";
console.log(name);// var can allow redeclarations
// variable const
const gpa=9.8;
//const gpa = 8.9;
console.log(gpa); // cant be redeclared
// arrays
let marks=[40,50,45,35,46];
console.log(marks);
console.log("length",marks.length);
// forEach loop
marks.forEach((m)=>console.log("marks: ", m));
//working withcollection
let faculty={id:123, name:"mm",designation:"prof"};
console.log(faculty);
console.log("name: ", faculty.name);
// array collection
let tt=[
  {day:"Monday", hr1 : "Mern", faculty:"MM" },
  {day:"Tuesday", hr1 : "DS", faculty:"MN" },
  {day:"Wednesday", hr1 : "C", faculty:"AA" },
  {day:"Thursdat", hr1 : "OS", faculty:"SN" },
  {day:"Friday", hr1 : "WP", faculty:"NA" }
];
// map() loop
tt.map((t)=>console.log("Time Table: ",t));


// create a js file timetable.js 
//array of collection mon to sat
// rach dat ha 6 houes
// each day has subs, fac, room no, 
//apply fiter and forEach on this array of collection
//e.g.:     let tt={ day:"", hours:[{hr1:"", sub:"skill", faculty:"mm", room no:"mba 2nd floor"}, {hr2}] }
// apply filter map  on each hour or entire day