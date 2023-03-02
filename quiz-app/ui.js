function UI(){
    this.btn_start=document.querySelector(".btn_start"),
    this.btn_nxt=document.querySelector(".nxt_btn"),
    this.btn_replay=document.querySelector(".btn_replay"),
    this.btn_quit=document.querySelector(".btn_quit"),
    this.quiz_box=document.querySelector(".quiz_box"),
    this.score_box=document.querySelector(".score_box"),
    this.score_text=document.querySelector(".score_text")
    this.option_list = document.querySelector(".option_list"),
    this.correctIcon='<div class="icon"><i class="fa-solid fa-check"></i></div>',
    this.incorrectIcon='<div class="icon"><i class="fa-solid fa-xmark"></i></div>',
    this.time_second=document.querySelector(".time_second"),
    this.time_text=document.querySelector(".time_text"),
    this.time_line=document.querySelector(".time_line")
}

UI.prototype.soruGoster=function (soru){
    let question=`<span>${soru.soruMetni}</span>`;
    let options="";

    for(let cevap in soru.cevapSecenekleri){
        options+=
        `
        <div class="option">
            <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
        </div>
        `;
    }

    document.querySelector(".question_text").innerHTML=question;
    this.option_list.innerHTML=options;

    const secenekler=this.option_list.querySelectorAll(".option");

    for(let secenek of secenekler){
        secenek.setAttribute("onclick", "optionSelected(this)");
    }   
}

UI.prototype.soruSayisiniGoster= function(soruSirasi, toplamSoru){
    let tag=`<span class="badge bg-warning">${soruSirasi}/${toplamSoru}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML=tag;
}

UI.prototype.scoreGoster=function(toplamSoru,dogruSoru){
    let textScore=`Toplam ${toplamSoru} soruda ${dogruSoru} doğru cevabınız bulunmaktadır.`;
    this.score_text.innerHTML=textScore;
}