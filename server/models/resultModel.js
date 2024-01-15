const mongoose = require("mongoose");

const resultModel = mongoose.Schema({
  subjectClass: { type: String, required: true },
  subject: { type: String, required: true },
  term: { type: String, required: true },
  examDuration: { type: Number, required: true },
  academicSession: { type: String, required: true },
  finished: { type: Boolean, required: true },
  started: { type: Boolean, required: true },
  timeLeft: { type: Number },
  answeredQuestions: [
    {
      questionText: { type: String },
      answerOptions: [
        {
          answerText: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
          checked: { type: Boolean, required: true },
        },
      ],
      chosenAnswer: { type: String },
      isAnswerCorrect: { type: Boolean },
    },
  ],
  answeredTheoryQuetions: [
    { questionText: { type: String }, score: { type: Number } },
  ],
  scoreTherory: { type: Number },
  score: { type: Number },
  student_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("result", resultModel);
