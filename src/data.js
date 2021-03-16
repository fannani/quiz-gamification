import React from 'react';

const data = {
    config : {
        title : "SOAL UTS",
        description : "Nyawa yang disediakan adalah jawaban salah yang diperbolehkan",
        lives : 0,
        times: 30,
    },
    quiz : [
        {
            question : "Pilihlah jawaban dibawah ini, yang menurut anda benar ?",
            choice : ['Jawaban pertama', 'Jawaban kedua', 'yang benar ini','ini jawaban salah'],
            answer : 'yang benar ini',
            score : 20
        },
        {
            question : <div>Soal kedua <img src='./mario.jfif' width="30" /></div>,
            choice : ['choice 1', 'choice 2', 'choice 3','choice 4'],
            answer : 'choice 4',
            score : 20
        },
        {
            question : <iframe width="560" height="315" src="https://www.youtube.com/embed/WAE3-XPclE4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
            choice : ['choice 1', 'choice 2', 'choice 3','choice 4'],
            answer : 'choice 4',
            score : 20
        },
        {
            question : "Soal keempat",
            choice : ['choice 1', 'choice 2', 'choice 3','choice 4'],
            answer : 'choice 4',
            score : 20
        },
	{
            question : "Soal kelima",
            choice : ['choice 1 ashudh', 'choice 2 aijd', 'choice 3','choice 4'],
            answer : 'choice 3',
            score : 40
        }

    ]
}

data.config.lives =  Math.ceil(data.quiz.length / 2);

export default data;