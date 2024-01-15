const data = [
  {
    subjectClass: "Primary Five",
    subject: "Mathematics",
    term: "First Term ",
    examDuration: 120,
    academicSession: "2021/2022",
    done: false,
    started: true,
    student_id: ObjectId("61e1e5535664a778138bc8e8"),
    score: 0,
    answeredQuestions: [
      {
        questionText: "what is the capital of  France",
        answerOptions: [
          { answerText: "London", isCorrect: false, checked: false },
          { answerText: "Accra", isCorrect: false, checked: false },
          { answerText: "Lagos", isCorrect: false, checked: false },
          { answerText: "Paris", isCorrect: true, checked: false },
        ],

        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  Poland ",
        answerOptions: [
          { answerText: "Warsaw", isCorrect: true, checked: false },
          { answerText: "Yaounde", isCorrect: false, checked: false },
          { answerText: "Nairobi", isCorrect: false, checked: false },
          { answerText: "Minsk", isCorrect: false, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  USA",
        answerOptions: [
          { answerText: "Liverpool", isCorrect: false, checked: false },
          { answerText: "Washington DC", isCorrect: true, checked: false },
          { answerText: "Lagos", isCorrect: false, checked: false },
          { answerText: "Hague", isCorrect: false, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  Greace",
        answerOptions: [
          { answerText: "Athens", isCorrect: false, checked: false },
          { answerText: "Florence", isCorrect: false, checked: false },
          { answerText: "Athens", isCorrect: true, checked: false },
          { answerText: "Abuja", isCorrect: false, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of Niger",
        answerOptions: [
          { answerText: "Kastina", isCorrect: false, checked: false },
          { answerText: "Chad", isCorrect: true, checked: false },
          { answerText: "London", isCorrect: false, checked: false },
          { answerText: "Paris", isCorrect: false, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  Germany",
        answerOptions: [
          { answerText: "Berlin", isCorrect: true, checked: false },
          { answerText: "johanisburg", isCorrect: false, checked: false },
          { answerText: "London", isCorrect: false, checked: false },
          { answerText: "Paris", isCorrect: false, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  Italy",
        answerOptions: [
          { answerText: "Florence", isCorrect: false, checked: false },
          { answerText: "Rome", isCorrect: true, checked: false },
          { answerText: "Madrid", isCorrect: false, checked: false },
          { answerText: "Paris", isCorrect: false, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  Nigeria",
        answerOptions: [
          { answerText: "Berlin", isCorrect: false, checked: false },
          { answerText: "Accra", isCorrect: false, checked: false },
          { answerText: "Lagos", isCorrect: false, checked: false },
          { answerText: "Abuja", isCorrect: true, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  Ghana",
        answerOptions: [
          { answerText: "Prague", isCorrect: false, checked: false },
          { answerText: "Accra", isCorrect: true, checked: false },
          { answerText: "Minsk", isCorrect: false, checked: false },
          { answerText: "Sao-Tome", isCorrect: false, checked: false },
        ],
        isAnswerCorrect: false,
      },
      {
        questionText: "what is the capital of  Spain",
        answerOptions: [
          { answerText: "Barcelonia", isCorrect: false, checked: false },
          { answerText: "Rome", isCorrect: false, checked: false },
          { answerText: "Accra", isCorrect: false, checked: false },
          { answerText: "Madrid", isCorrect: true, checked: false },
        ],
        isAnswerCorrect: false,
      },
    ],
  },
];

export default data;

db.results.updateMany(
  {
    _id: ObjectId("61e822fb03df3b0378c6fbcf"),
    answeredQuestions: {
      $elemMatch: {
        _id: ObjectId("61e822fb03df3b0378c6fbd1"),
        "answerOptions._checked": false,
      },
    },
  },
  {
    $set: {
      "answeredQuestions.$[outer].answerOptions.$[inner].checked": false,
    },
  },
  {
    arrayFilters: [
      { "outer._id": ObjectId("61e81689fe1c5af4762674b4") },
      { "inner.checked": false },
    ],
  }
);
