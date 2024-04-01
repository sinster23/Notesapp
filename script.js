let addnote=document.querySelector('.addnote');
let content=document.querySelector('.note-container');
let popup=document.querySelector('.popup-container');
let para=document.querySelector('.startpop p');
let exit=document.querySelector('.startpop i');
let title=document.querySelector('.midpop-title input');
let des=document.querySelector('.midpop-desc textarea');
let addbut=document.querySelector('.popbut button');
let arr=['January','February','March','April','May','June','July','August','September','October','November','December'];
let allnotes=document.querySelectorAll('.note');
let notes=JSON.parse(localStorage.getItem('savednotes')||'[]');
let settings=document.querySelector('.settings');
let flag=0;
let specificid,specificcol='';

function shownotes(){
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((e,index)=> {
        let html=`<div class="note" style="background:${e.color}">
        <div class="details">
        <img src="spin.png">
            <p>${e.head}</p>
            <span>${e.info}</span>
        </div>
                
                <div class="bottom">
                    <span>${e.date}</span>
                    <div class="settings">
                        <i  onclick="openopt(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="options">
                            <li onclick="edit(${index},'${e.head}','${e.info}','${e.color}')">&nbsp;&nbsp;<i class="uil uil-pen"></i>&nbsp;Edit</li>
                            <li onclick="del(${index})">&nbsp;&nbsp;<i class="uil uil-trash"></i>&nbsp;Delete</li>
                        </ul>
                    </div>
                
                </div>
    </div>`
    addnote.insertAdjacentHTML('afterend',html);
    });
}
shownotes();

function openopt(elem){
    elem.parentElement.classList.add('show');
    document.addEventListener('click',(e)=>{
        if(e.target.tagName!='I'||e.target!=elem)
        elem.parentElement.classList.remove('show');
    })
}

function edit(editid,topic,desc,colors){
    flag=1;
    specificid=editid;
    specificcol=colors;
    addnote.click();
    title.value=topic;
    des.value=desc;
    addbut.innerHTML='Update';
    para.innerHTML='Update Note';
}

function del(delid){
    notes.splice(delid,1);
    localStorage.setItem('savednotes',JSON.stringify(notes));
    shownotes();
}
addnote.addEventListener('click',()=>{
    popup.classList.add('show');
})
exit.addEventListener('click',()=>{
    flag=0;
    addbut.innerHTML='Add Note';
    para.innerHTML='Add a new Note';
    title.value='';
    des.value='';
    popup.classList.remove('show');
})

addbut.addEventListener('click',()=>{
    if(title.value||des.value){
        let dt=new Date();
        let day=dt.getDate()
        let month=arr[dt.getMonth()];
        let year=dt.getFullYear();
        let col;
        if(flag==0)
         col=pickColor();
        else
        col=specificcol;

         let notedisp={
         head:title.value, info:des.value,
         date:`${month} ${day}, ${year}`,
         color:col
        }
        if(flag==0){
            notes.push(notedisp);
        }
        else{
            notes[specificid]= notedisp;
            flag=0;
            addbut.innerHTML='Add Note';
            para.innerHTML='Add a new Note';
        }
        localStorage.setItem('savednotes',JSON.stringify(notes));
        shownotes();
        exit.click();
        title.value='';
        des.value='';
    }
  
})

function pickColor() {  
    var colors = [ 
        'rgba(255, 0, 0, 0.551)', 'rgba(255, 217, 0, 0.573)', ' #ed1e78a2', 
        '#FF5F6D', 'rgba(210, 105, 30, 0.7)', 'rgba(0, 255, 128, 0.629)' 
    ]; 
    var random_color = colors[(Math.floor( Math.random()*colors.length))]; 
      
    var x = document.querySelector('.note'); 
    return random_color;
} 
