function promedio(){
    return 100;
}

function change_name(){
    let paragraphs = document.getElementsByTagName("p");
    if (paragraphs.length > 0) {
        let paragraph = paragraphs[0];
        paragraph.innerText = "Hola Bootcamp!!!";
    }
    if (paragraphs.length > 1) {
        let paragraph = paragraphs[1];
        const date = new Date();
        paragraph.innerText = "Hola Bootcamp!!! " + date;
    }
}

change_name();
