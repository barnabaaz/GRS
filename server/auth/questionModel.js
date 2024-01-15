const mongoose = require("mongoose");

const answeredQuestionModel = mongoose.Schema({
  subjectClass: { type: String, required: true },
  subject: { type: String, required: true },
  scheduled: { type: Boolean, required: true },
  term: { type: String, required: true },
  examDuration: { type: Number, required: true },
  academicSession: { type: String, required: true },
  questions: [
    {
      questionText: { type: String },
      answerOptions: [
        {
          checked: { type: Boolean },
          answerText: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
      chosenAnswer: { type: String, required: true },
      isAnswerCorrect: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model("question", answeredQuestionModel);
