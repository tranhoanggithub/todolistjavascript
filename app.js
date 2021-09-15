const input_value= document.getElementById("input_value");
const btn_todo=document.getElementById("btn_todo");
const list_todo= document.getElementById("list_todo");
const filter_todo= document.getElementById("select_todo");



btn_todo.addEventListener("click",addtodo);
list_todo.addEventListener("click",deleteTodo);
filter_todo.addEventListener("click",deleteTodo);

listTodoStorage();

function deleteTodo(e){
    console.log(e.target);
    const item= e.target;
    //delete todo
    if(item.classList[0]==='delete_btn'){
        const todo = item.parentElement;
        todo.remove();
        removeStorageTodo(todo);
    }
    //completed button
    if(item.classList[0]==='completed_btn'){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
        updateStorageItem(todo);
    }
}
function updateStorageItem(todo){
    let task;
    if(localStorage.getItem("task")===null){
        task=[];
    }else{
        task=JSON.parse(localStorage.getItem("task"))
    }
    const todoIndex= todo.children[0].innerText;
    index =task.findIndex(object=>object.text===todoIndex);
    task[index].complete=true;
    localStorage.setItem("task",JSON.stringify(task));
    console.log(index)
}
function removeStorageTodo(todo){
    let task;
    if(localStorage.getItem("task")===null){
        task=[];
    }else{
        task=JSON.parse(localStorage.getItem("task"))
    }
    const todoIndex =todo.children[0].innerText;
    console.log(todoIndex);
    task.splice(task.indexOf(todoIndex),1)
    localStorage.setItem("task",JSON.stringify(task));

}
function addtodo(e){
    e.preventDefault();
    todo= input_value.value;

    if(todo){
        
        const newDiv =document.createElement("div");
        newDiv.classList.add("todo");

        //tao list todo
        const newTodo =document.createElement("li");

        newTodo.innerText=todo;

        newTodo.classList.add('todo-item');
        newDiv.appendChild(newTodo);
        //add to local
        saveLocalStorage(todo);
        input_value.value="";

        const btn_hoanthanh = document.createElement("button");
        btn_hoanthanh.innerText="Hoan thanh"
        btn_hoanthanh.classList.add("completed_btn");
        newDiv.appendChild(btn_hoanthanh);

        const btn_xoa = document.createElement("button");
        btn_xoa.innerText="Xoa"
        btn_xoa.classList.add("delete_btn");
        newDiv.appendChild(btn_xoa);

        list_todo.appendChild(newDiv);
        
    }
}

function saveLocalStorage(todo){
    let task;
    if(localStorage.getItem("task")===null){
        task=[];
    }else{
        task=JSON.parse(localStorage.getItem("task"))
    }
    task.push({
        text:todo,
        complete:false

    });
    localStorage.setItem("task",JSON.stringify(task))
}

function listTodoStorage(){
    let task;
    if(localStorage.getItem("task")===null){
        task=[];
    }else{
        task=JSON.parse(localStorage.getItem("task"))
    }
    task.forEach(nhiemvu=>{
        const newDiv =document.createElement("div");
        newDiv.classList.add("todo");
    
        //tao list todo
        const newTodo =document.createElement("li");
    
        newTodo.innerText=nhiemvu.text;
    
        newTodo.classList.add('todo-item');
        newDiv.appendChild(newTodo);
        //add to local
        
    
        const btn_hoanthanh = document.createElement("button");
        btn_hoanthanh.innerText="Hoan thanh"
        btn_hoanthanh.classList.add("completed_btn");
        newDiv.appendChild(btn_hoanthanh);
    
        const btn_xoa = document.createElement("button");
        btn_xoa.innerText="Xoa"
        btn_xoa.classList.add("delete_btn");
        newDiv.appendChild(btn_xoa);
    
        list_todo.appendChild(newDiv);
        
        if(nhiemvu.complete==true){
            newDiv.classList.add('completed');
            btn_hoanthanh.innerText="Da hoan thanh";
            btn_hoanthanh.style.color="green";
            btn_hoanthanh.disabled=true;
        }
    })

}
function filterTodo(e){
    const task = list_todo.childNodes;
    task.forEach(todo=>{
        console.log(todo.classList.contains("completed"));
        switch(e.target.value){
            case "tatca":
                task.style.display="block";
                break;
                    case "hoan thanh":
                        if(todo.classList.contains("completed")){
                            task.style.display="block";
                        }else{
                            task.style.display="none";
                        }
                
                    break;
                    case " chua hoan thanh":
                        if(!todo.classList.contains("completed")){
                            task.style.display="block";
                        }else{
                            task.style.display="none";
                        }
                        break;
                   

        }
    })
}
