// OOP: Nesne Tabanlı Programlama
const quiz=new Quiz(sorular);
let ui=new UI();

ui.btn_start.addEventListener("click", function(){
    ui.quiz_box.classList.add("active")
    let soru=quiz.soruGetir();
    ui.soruGoster(soru); 
    startTimer(10);
    startTimerLine();
    ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length)  
})

ui.btn_nxt.addEventListener("click", function(){
    quiz.soruIndex+=1;
    if(quiz.sorular.length != quiz.soruIndex){
        let nextQuestion=quiz.soruGetir();
        ui.soruGoster(nextQuestion);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(10);
        startTimerLine();
        ui.soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length);
        ui.btn_nxt.classList.remove("active");
    }
    else{
        console.log("quiz bitti");
        clearInterval(counter);
        clearInterval(counterLine);
        ui.score_box.classList.add("active");
        ui.quiz_box.classList.remove("active");
        ui.scoreGoster(quiz.sorular.length,quiz.dogruCevapSayisi);
        
    }
})

ui.btn_quit.addEventListener("click", function(){
    window.location.reload();
})

ui.btn_replay.addEventListener("click", function(){
    quiz.soruIndex=0;
    quiz.dogruCevapSayisi=0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
})

function optionSelected(scnk){
    clearInterval(counter)
    clearInterval(counterLine)
    let cevap= scnk.querySelector("span b").textContent;
    let soru=quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)){
        scnk.classList.add("correct")
        scnk.insertAdjacentHTML("beforeend",ui.correctIcon)
        quiz.dogruCevapSayisi+=1;
    }
    else{
        scnk.classList.add("incorrect")
        scnk.insertAdjacentHTML("beforeend", ui.incorrectIcon)
    }

    for(let i=0; i<ui.option_list.children.length; i++){
        ui.option_list.children[i].classList.add("disabled")
    }

    ui.btn_nxt.classList.add("active")
}

let counter;
function startTimer(time){
    counter=setInterval(zamanlayici,1000)

    function zamanlayici(){
        ui.time_second.textContent=time;
        time--;

        if (time < 0){
            clearInterval(counter)

            ui.time_text.textContent="Süre Bitti";

            let cevap=quiz.soruGetir().dogruCevap;
            const secenekler=ui.option_list.querySelectorAll(".option");
            for(let i=0; i<secenekler.length;i++){
                if(secenekler[i].querySelector("span b").textContent==cevap){
                    secenekler[i].classList.add("correct");
                    secenekler[i].insertAdjacentHTML("beforeend", ui.correctIcon)

                    for(let i=0; i<ui.option_list.children.length; i++){
                        ui.option_list.children[i].classList.add("disabled")
                    }

                    ui.btn_nxt.classList.add("active");
                }
            }
        }
    }
}


let counterLine;
function startTimerLine(){
    let line_width=0;

    counterLine=setInterval(zamanlayici,20);

    function zamanlayici(){
        line_width+=1;
        ui.time_line.style.width=line_width+"px";

        if(line_width > 549){
            clearInterval(counterLine);
        }
    }
}





























// const correctIcon='<div class="icon"><i class="fa-solid fa-check"></i></div>'
// const incorrectIcon='<div class="icon"><i class="fa-solid fa-xmark"></i></div>'
// const option_list = document.querySelector(".option_list");





        
    



