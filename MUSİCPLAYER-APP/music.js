class Music{
    constructor(title,singer,img,file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }

    getName(){
        return this.title+" - "+this.singer;
    }
}

const musicList=[
    new Music("Sensiz Kaldım", "Suat Suna","suat.jpeg","suat.mp3"),
    new Music("Her Akşam","Dario Moreno","dario.jpeg", "dario.mp3"),
    new Music("Yok Yok Yalan Deme", "Ferdi Özbeğen", "Ferdi.jpeg","Ferdi-Ozbegen.mp3")
]