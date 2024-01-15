const mongoose = require("mongoose");

const questionModel = mongoose.Schema({
  subjectClass: { type: String, required: true },
  subject: { type: String, required: true },
  term: { type: String, required: true },
  examDuration: { type: Number, required: true },
  academicSession: { type: String, required: true },
  scheduled: { type: Boolean, required: true },
  questions: [
    {
      questionText: { type: String },
      answerOptions: [
        {
          answerText: { type: String },
          isCorrect: { type: Boolean },
          checked: { type: Boolean },
        },
      ],
      chosenAnswer: { type: String },
      isAnswerCorrect: { type: Boolean },
    },
  ],
  theoryQuetions: [{ questionText: { type: String }, score: { type: Number } }],
});

module.exports = mongoose.model("question", questionModel);
