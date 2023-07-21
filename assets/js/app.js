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
localStorage.setItem("editObj", JSON.stringify(editObj))
toDoInput.value=editObj.skillName;
addBtn.classList.add("d-none")
updateBtn.classList.remove("d-none")
}
const onUpdate=(eve)=>{
  let updatedValue=toDoInput.value
  let editedObj=JSON.parse(localStorage.getItem("editObj"))
  skillArr.forEach(obj=>{
    if(obj.uuid === editedObj.uuid){
      obj.skillName=updatedValue
    }
  })
  localStorage.setItem("skillArr", JSON.stringify(skillArr))
 
  document.getElementById(editedObj.uuid).firstElementChild.innerHTML=updatedValue
  //templating(skillArr)
  Swal.fire({
    icon: 'success',
    text: `${editedObj.skillName.toUpperCase()} is updated as ${updatedValue.toUpperCase()}`,
    timer:3000
  })
  toDoForm.reset()
  addBtn.classList.remove("d-none")
updateBtn.classList.add("d-none")
}
updateBtn.addEventListener("click", onUpdate)

const onDelete=(eve)=>{
  let deleteId=eve.getAttribute("data-id")
  if (confirm("Are you sure")) {
    skillArr=skillArr.filter(obj=> obj.uuid != deleteId)
    localStorage.setItem("skillArr", JSON.stringify(skillArr))
    //templating(skillArr)
    let deletedItem=document.getElementById(deleteId).firstElementChild.innerHTML
    document.getElementById(deleteId).remove()
    Swal.fire({
      icon: 'success',
      text: `${deletedItem.toUpperCase()} item successfully deleted`,
      timer:3000
    })
  } else {
    return false;
  }

    
}
const templating=(arr)=>{
    let result=``;
    arr.forEach(obj=>{
        result +=` <li id="${obj.uuid}" class="list-group-item toDoItem font-weight-bold text-uppercase d-flex justify-content-between">
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
    skillArr.unshift(obj)
    localStorage.setItem("skillArr", JSON.stringify(skillArr))
    let li=document.createElement("li")
    li.setAttribute("id",obj.uuid)
    li.className="list-group-item toDoItem font-weight-bold text-uppercase d-flex justify-content-between"
    li.innerHTML=` <span>${obj.skillName}</span>
    <span>
      <i class="fa-solid fa-pen-to-square edit" onclick="onEdit(this)" data-id="${obj.uuid}"></i>
      <i class="fa-solid fa-trash-can delete ml-2 "onclick="onDelete(this)" data-id="${obj.uuid}"></i>
    </span>`
    toDoList.prepend(li)
    Swal.fire({
      icon: 'success',
      text: `${skill.toUpperCase()} item successfully added to list`,
      timer:3000
    })
   //templating(skillArr)
    toDoForm.reset()
}

toDoForm.addEventListener("submit", onSubmitAdd)