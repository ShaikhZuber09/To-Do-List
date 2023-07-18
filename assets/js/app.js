const cl=console.log;

const toDoForm=document.getElementById("toDoForm");
const toDoList=document.getElementById("toDoList");
const toDoInput=document.getElementById("toDoInput");

const templating=(arr)=>{
    let result=``;
    arr.forEach(ele=>{
        result +=` <li class="list-group-item toDoItem font-weight-bold text-uppercase d-flex justify-content-between">
        <span>${ele}</span>
        <span>
          <i class="fa-solid fa-pen-to-square edit"></i>
          <i class="fa-solid fa-trash-can delete ml-2"></i>
        </span>
      </li>`
    });
    toDoList.innerHTML=result;
}
let skillArr=[];
const onSubmitAdd=(eve)=>{
    eve.preventDefault();
    let skill=toDoInput.value
    skillArr.push(skill)
   templating(skillArr)
    toDoForm.reset()
}

toDoForm.addEventListener("submit", onSubmitAdd)