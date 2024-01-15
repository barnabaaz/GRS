const router = require("express").Router();

const resultModel = require("../models/resultModel");
const questionModel = require("../models/questionModel");
const shuffle = require("../utils/shuffle");
const mongoose = require("mongoose");

const studentModel = require("../models/studentModel");
const { db } = require("../models/resultModel");
// get all results
router.get("/", async (req, res) => {
  try {
    const data = await resultModel.find;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("server Error");
    console.error(err.message);
  }
});
// find  all result for a particular student

router.get("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allresult = await resultModel.find({
      student_id: mongoose.Types.ObjectId(id),
    });
    return res.status(200).json(allresult);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: true, message: "server Error" });
  }
});

router.post("/result", async (req, res) => {
  try {
    const results = new resultModel({
      subjectClass: "Primary Five",
      subject: "English Language",
      term: "First Term ",
      examDuration: 120,
      academicSession: "2021/2022",
      finished: false,
      started: false,
      student_id: mongoose.Types.ObjectId("61e1e5535664a778138bc8e8"),
      score: 0,
      answeredQuestions: [
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
    });
    await results.save();
    res.json(results);
  } catch (err) {
    console.error(err.message);
  }
});
//
// get a particulat result

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const question = await resultModel.findById(id);
  res.status(200).json(question);
});

router.post("/", async (req, res) => {
  try {
    const { student_id, examId } = req.body;
    const questions = await questionModel.findById(examId);
    sortedQuestions = shuffle(questions.questions);
    console.log(sortedQuestions);
    const userQuestions = new resultModel({
      subjectClass: questions.subjectClass,
      subject: questions.subject,
      term: questions.term,
      academicSession: questions.academicSession,
      examDuration: questions.examDuration,
      finished: false,
      answeredQuestions: sortedQuestions,
      student_id: student_id,
    });
    await userQuestions.save();
    res.json(userQuestions);
  } catch (err) {
    console.error(err.message);
  }
});
// update result for each choosen answer

router.put("/", async (req, res) => {
  try {
    const { questionId, answerId, isAnswerCorrect, examId } = req.body;

    // set checked to false if previously true

    await resultModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(examId),
        "answeredQuestions._id": mongoose.Types.ObjectId(questionId),
      },
      {
        $set: {
          "answeredQuestions.$[outer].answerOptions.$[inner].checked": false,
        },
      },
      {
        arrayFilters: [
          { "outer._id": mongoose.Types.ObjectId(questionId) },
          { "inner.checked": true },
        ],
      }
    );
    // db.results.updateOne(
    //   {
    //     _id: ObjectId("61e824f5eef879edba6a829b"),
    //     "answeredQuestions._id": ObjectId("61e824f5eef879edba6a829c"),
    //   },
    //   {
    //     $set: {
    //       "answeredQuestions.$[outer].answerOptions.$[inner].checked": false,
    //     },
    //   },
    //   {
    //     arrayFilters: [
    //       { "outer._id": ObjectId("61e824f5eef879edba6a829c") },
    //       { "inner.checked": true },
    //     ],
    //   }
    // );

    //set checked is true for choosen question
    await resultModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(examId),
        answeredQuestions: {
          $elemMatch: {
            _id: mongoose.Types.ObjectId(questionId),
            "answerOptions._id": mongoose.Types.ObjectId(answerId),
          },
        },
      },
      {
        $set: {
          "answeredQuestions.$[outer].answerOptions.$[inner].checked": true,
        },
      },
      {
        arrayFilters: [
          { "outer._id": mongoose.Types.ObjectId(questionId) },
          { "inner._id": mongoose.Types.ObjectId(answerId) },
        ],
      }
    );

    // set answer is correct
    await resultModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(examId),
        "answeredQuestions._id": mongoose.Types.ObjectId(questionId),
      },
      { $set: { "answeredQuestions.$.isAnswerCorrect": isAnswerCorrect } }
    );
    const response = await resultModel.findById(examId);
    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});
router.put("/scheduled", async (req, res) => {
  const { _id, scheduled } = req.body;
  const question = await questionModel.findById(_id);

  question.scheduled = !scheduled;
  await question.save();
  console.log(question);
  res.json(question);
});

router.get("/get-Scheduled/:studentClass", async (req, res) => {
  try {
    const { studentClass } = req.params;
    console.log(studentClass);
    const scheduledExams = await questionModel.find({
      scheduled: true,
      subjectClass: studentClass,
    });

    if (scheduledExams.length === 0) {
      console.log("i was called ");
      return res.status(200).json(null);
    }
    console.log("i was logged");
    return res.json(scheduledExams);
  } catch (err) {
    console.error(err.message);
  }
});
// set Result to be taken by student
router.post("/setresult", async (req, res, next) => {
  try {
    const { questionData, studentId, studentClass } = req.body;
    console.log({ studentId, studentClass });
    console.log(questionData[0].subjectClass === studentClass);
    const result = await resultModel.findOne({
      student_id: studentId,
      subject: questionData[0].subject,
      term: questionData[0].term,
      academicSession: questionData[0].academicSession,
    });
    if (result !== null) {
      console.log("i have already been created");
      return res.json(result._id);
    }
    console.log(" i have not been created ");

    const sortedQuestions = shuffle(questionData[0].questions);
    console.log(sortedQuestions);
    const newresult = {
      subjectClass: studentClass,
      subject: questionData[0].subject,
      term: questionData[0].term,
      examDuration: questionData[0].examDuration,
      academicSession: questionData[0].academicSession,
      finished: false,
      started: false,
      answeredQuestions: sortedQuestions,
      score: 0,
      student_id: studentId,
    };
    await new resultModel(newresult).save((err, result) => {
      if (err) {
        console.error(err.message);
      }
      return res.json(result._id);
    });
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/get-time/:id", async (req, res) => {
  try {
    const result = await resultModel.findById(req.params.id);
    if (result.started === true) {
      return res.status(200).json(result.timeLeft - 0.5);
    }
    res.status(200).json(result.examDuration);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update-time", async (req, res) => {
  try {
    const { currentTime, examId } = req.body;
    const updateTime = await resultModel.updateOne(
      { _id: mongoose.Types.ObjectId(examId) },
      { $set: { timeLeft: currentTime, started: true } }
    );
    res.json(updateTime);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: true, message: "server Error" });
  }
});
router.put("/end-test", async (req, res) => {
  try {
    const { examId } = req.body;
    const resultScore = await resultModel.findById(examId);
    const score = resultScore.answeredQuestions.filter(
      (lenght) => lenght.isAnswerCorrect
    ).length;
    const response = await resultModel.updateOne(
      { _id: mongoose.Types.ObjectId(examId) },
      { $set: { finished: true, score: score } }
    );
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "true", message: "Server Error " });
  }
});
module.exports = router;

// db.results.updateMany(
//   {
//     _id: ObjectId("61e822fb03df3b0378c6fbcf"),
//     answeredQuestions: {
//       $elemMatch: {
//         _id: ObjectId("61e822fb03df3b0378c6fbd1"),
//         "answerOptions._checked": false,
//       },
//     },
//   },
//   {
//     $set: {
//       "answeredQuestions.$[outer].answerOptions.$[inner].checked": false,
//     },
//   },
//   {
//     arrayFilters: [
//       { "outer._id": ObjectId("61e81689fe1c5af4762674b4") },
//       { "inner.checked": false },
//     ],
//   }
// );
