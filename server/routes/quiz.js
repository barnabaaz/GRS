const router = require("express").Router();

const mongoose = require("mongoose");
const questionModel = require("../models/questionModel");
// get all questionsModel
router.get("/", async (req, res) => {
  try {
    const Model = await questionModel.find({});
    res.json(Model);
  } catch (err) {
    console.error(err.message);
    res.json("cant get any Questions Server Error");
  }
});

//get a specific questions for a class
router.get("/get-question/:id", async (req, res) => {
  const { id } = req.params;
  const question = await questionModel.findById(id);
  return res.json(question);
});
// delete a Particular created Test
router.delete("/delete-question/:id", async (req, res) => {
  const { id } = req.params;
  const action = questionModel.findByIdAndDelete(id);
  action.then((succ, err) => {
    if (succ) {
      return res.json("Exam Questions Deleted Successfuly");
    }
    return res.json("exam Questions were not delete, Server Error");
  });
});
// save an edited single question
router.post("/update-question/", async (req, res) => {
  const { examId, questionId, question } = req.body;

  const action = questionModel.updateMany(
    {
      _id: mongoose.Types.ObjectId(examId),
      "question._id": mongoose.Types.ObjectId(questionId),
    },
    {
      $set: {
        "questions.$[elem].questionText": question.questionText,
        "questions.$[elem].answerOptions": question.answerOptions,
        "questions.$[elem].isAnswerCorrect": question.isAnswerCorrect,
      },
    },
    { arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(questionId) }] }
  );
  action.then((result, err) => {
    if (err) {
      return res.json("Server Error, Update was ");
    }
    return res.json("Update was Successful");
  });
});
// Edit Exam Header
router.post("/update-header/", async (req, res) => {
  const { term, examId, subject, subjectClass, examDuration, academicSession } =
    req.body;
  const action = questionModel.updateMany(
    { _id: mongoose.Types.ObjectId(examId) },
    {
      $set: {
        term,
        subject,
        subjectClass,
        examDuration,
        academicSession,
      },
    }
  );

  action.then((result, err) => {
    if (err) {
      return res.json("Server Error, Update was ");
    }
    if (result) {
      return res.json("Update was Successful");
    }
  });
});
// create a new quiz with class and subject
//subject, class and duration of quiz term and accademicc session
router.post("/header", async (req, res) => {
  try {
    const { subject, examDuration, subjectClass, term, academicSession } =
      req.body;
    const newQuiz = await new questionModel({
      subject,
      examDuration,
      subjectClass,
      term,
      academicSession,
      scheduled: false,
    });
    await newQuiz.save();
    console.log(newQuiz);
    res.json(newQuiz._id);
  } catch (err) {
    console.error(err.message);
    res.json("Question creation not succesful ");
  }
});
//put a specific class quiz question
// add a question to an exam
router.post("/insert", async (req, res) => {
  try {
    const {
      examId,
      questionText,
      answerOptions,
      choosenAnswer,
      isAnswerCorrect,
    } = req.body;
    const question = await questionModel.findById(examId);
    question.questions.push({
      questionText,
      answerOptions,
      chosenAnswer: choosenAnswer,
      isAnswerCorrect,
    });
    console.log(question);
    await question.save();
    res.json("Question Was Created Successufuly");
  } catch (err) {
    console.error(err.message);
  }
});
// insert new section B questions *********
router.post("/insert-sectionb", async (req, res) => {
  try {
    const { examId, score, questionText, isAnswerCorrect } = req.body;
    const question = await questionModel.findById(examId);
    question.theoryQuetions.push({
      questionText,
      score,
      isAnswerCorrect: false,
    });
    res.json(question);
  } catch (err) {
    console.error(err.messagge);
    res.json("question not Successful, Server Error");
  }
});
// Edit a particular header Data
router.post("/edit-header", async (req, res) => {
  try {
    const {
      subject,
      examDuration,
      subjectClass,
      term,
      academicSession,
      examId,
    } = req.body;
    const edited = await questionModel.findById(examId);
    edited.subject = subject;
    edited.examDuration = examDuration;
    edited.subjectClass = subjectClass;
    edited.term = term;
    edited.academicSession = academicSession;
    edited.save();
    console.log(edited);
    return res.json(edited);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const question = await questionModel.findById(id);
    await question.delete();
  } catch (err) {
    console.error(err.message);
  }
});

// delete a specific classQuiz question
router.post("/insertmany", async (req, res) => {
  try {
    const newQuestion = {
      subjectClass: "Primary Five",
      subject: "Mathematics",
      term: "First Term ",
      examDuration: 120,
      academicSession: "2021/2022",
      scheduled: false,
      questions: [
        {
          questionText: "what is the capital of  France",
          answerOptions: [
            {
              answerText: "london",

              isCorrect: false,
              checked: false,
            },
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
        {
          questionText: "what is the capital of  France",
          answerOptions: [
            {
              answerText: "london",

              isCorrect: false,
              checked: false,
            },
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
        {
          questionText: "what is the capital of  France",
          answerOptions: [
            {
              answerText: "london",

              isCorrect: false,
              checked: false,
            },
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
        {
          questionText: "what is the capital of  France",
          answerOptions: [
            {
              answerText: "london",

              isCorrect: false,
              checked: false,
            },
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
    };
    const question = await new questionModel(newQuestion);
    await question.save();
    res.status(200).json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Erro");
  }
});
module.exports = router;
