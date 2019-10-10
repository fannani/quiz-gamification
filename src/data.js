import React from 'react';

const data = {
    config : {
        title : "Quiz pertama",
        description : "Nyawa yang disediakan adalah jawaban salah yang diperbolehkan",
        lives : 0,
        times: 60,
    },
    quiz : [
        {
            question : "Pilihlah jawaban dibawah ini, yang menurut anda benar ?",
            choice : ['Jawaban pertama', 'Jawaban kedua', 'yang benar ini','ini jawaban salah'],
            answer : 'yang benar ini',
            score : 20
        },
        {
            question : "Soal kedua",
            choice : ['choice 1', 'choice 2', 'choice 3','choice 4'],
            answer : 'choice 4',
            score : 20
        },
        {
            question : "Soal ketiga",
            choice : ['choice 1', 'choice 2', 'choice 3','choice 4'],
            answer : 'choice 4',
            score : 20
        },
        {
            question : "Soal keempat",
            choice : ['choice 1', 'choice 2', 'choice 3','choice 4'],
            answer : 'choice 4',
            score : 20
        }
    ]
}

data.config.lives =  Math.ceil(data.quiz.length / 2);

export default data;