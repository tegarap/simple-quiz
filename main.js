// halaman
const pageStart = document.getElementById("pageStart");
const pageQuiz = document.getElementById("pageQuiz");
const pageHasil = document.getElementById("pageHasil");
// optional answer
var ques = document.getElementById("question");
var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var opt4 = document.getElementById("option4");

// tombol
const nextButton = document.getElementById("next");
const remidiButton = document.getElementById("remidi");
const kirimButton = document.getElementById("kirim");

// variabel
var nama = document.getElementById("nama");
var kelas = document.getElementById("kelas");
var identitas = document.getElementById("identitas");
var hasil = document.getElementById("hasil");
var timer = document.getElementById("timer")

var tques = questions.length;
var score = 0;
var quesindex = 0;

var c = 15 * 60; 
var t;

// variabel nilai remidi
var nilaiMin = 75;

// membuat pertanyaan
function give_ques(quesindex){
	ques.textContent = quesindex + 1 + ". " + questions[quesindex][0];
	opt1.textContent = questions[quesindex][1];
	opt2.textContent = questions[quesindex][2];
	opt3.textContent = questions[quesindex][3];
	opt4.textContent = questions[quesindex][4];
	return;// body...
};

// start quiz
function mulaiQuiz(){
	if(nama.value.length == 0 || kelas.value.length == 0){
		alert("Mohon untuk melengkapi form");
		return;
	} else {
		pageStart.style.display = "none";
    	pageQuiz.style.display = "block";
		give_ques(0);
		timedCount();
	}
}

function nextques(){
	var selected_ans= document.querySelector('input[type=radio]:checked');
	if(!selected_ans){
		alert("Mohon pilih salah satu jawaban");return;
	}
	if(selected_ans.value==questions[quesindex][5]){
		score=score+1;
	}
	selected_ans.checked=false;
	quesindex++;
	if(quesindex==tques-1){
		nextButton.textContent = "Lihat Hasil";
	}
		
	var nilai = (score/tques * 100).toFixed(0);
	if(quesindex==tques){
		pageQuiz.style.display = "none";
		pageHasil.style.display = "block";
		identitas.textContent = "Nama : " + nama.value + ", Kelas : " + kelas.value;
		hasil.textContent = "Anda Menjawab Benar : "+score+" Nilai Anda = "+nilai;
		if(nilai < nilaiMin){
			remidiButton.style.display = "block";
			kirimButton.style.display = "none";
		} else {
			remidiButton.style.display = "none";
			kirimButton.style.display = "block";
		}
        return;
	}
    give_ques(quesindex);
}

function timedCount() {
	if(c == 185) { 
		return false; 
	}

	var hours = parseInt( c / 3600 ) % 24;
	var minutes = parseInt( c / 60 ) % 60;
	var seconds = c % 60;
	var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
	// $('#timer').html(result);
	timer.textContent = result;

	if(c == 0 ) {
		c=185;
		quizOver = true;
		return false;
	}
	c = c - 1;
	t = setTimeout(function() {
		timedCount()
	},1000);
}

function remidi() {
	score = 0;
	quesindex = 0;
	c = 15 * 60; 
	t;
	pageHasil.style.display = "none";
	mulaiQuiz();
}

function kirim() {
	alert("Sedang mengirim . . .");return;
}