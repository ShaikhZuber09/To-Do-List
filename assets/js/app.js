const cl=console.log;

const toDoForm=document.getElementById("toDoForm");
const toDoList=document.getElementById("toDoList");
const toDoInput=document.getElementById("toDoInput");
const addBtn=document.getElementById("addBtn");
const updateBtn=document.getElementById("updateBtn");

const onEdit=(eve)=>{
let editId=eve.getAttribute("data-id")
let editObj=skillArr.find((obj)=>{
  return ( obj.uuid===editId)
})
localStorage.setItem("editId", editId)
toDoInput.value=editObj.skillName;
addBtn.classList.add("d-none")
updateBtn.classList.remove("d-none")
}
const onUpdate=(eve)=>{
  let updatedValue=toDoInput.value
  let updateId=localStorage.getItem("editId")
  skillArr.forEach(obj=>{
    if(obj.uuid === updateId){
      obj.skillName=updatedValue
    }
  })
  localStorage.setItem("skillArr", JSON.stringify(skillArr))
  templating(skillArr)
  toDoForm.reset()
  addBtn.classList.remove("d-none")
updateBtn.classList.add("d-none")
}
updateBtn.addEventListener("click", onUpdate)

const onDelete=(eve)=>{
  let deleteId=eve.getAttribute("data-id")
  skillArr=skillArr.filter(obj=> obj.uuid != deleteId)
  localStorage.setItem("skillArr", JSON.stringify(skillArr))
  templating(skillArr)
}
const templating=(arr)=>{
    let result=``;
    arr.forEach(obj=>{
        result +=` <li class="list-group-item toDoItem font-weight-bold text-uppercase d-flex justify-content-between">
        <span>${obj.skillName}</span>
        <span>
          <i class="fa-solid fa-pen-to-square edit" onclick="onEdit(this)" data-id="${obj.uuid}"></i>
          <i class="fa-solid fa-trash-can delete ml-2 "onclick="onDelete(this)" data-id="${obj.uuid}"></i>
        </span>
      </li>`
    });
    toDoList.innerHTML=result;
}
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
let skillArr=JSON.parse(localStorage.getItem("skillArr"))||[];
templating(skillArr)
const onSubmitAdd=(eve)=>{
    eve.preventDefault();
    let skill=toDoInput.value
    let obj={
        skillName:skill,
        uuid:uuidv4()
    }
    skillArr.push(obj)
    localStorage.setItem("skillArr", JSON.stringify(skillArr))
   templating(skillArr)
    toDoForm.reset()
}

toDoForm.addEventListener("submit", onSubmitAdd)