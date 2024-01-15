const router = require("express").Router();
const questionModel = require("../models/questionModel");
const mongoose = require("mongoose");
const authenticate = require("../middleware/isverified");
const User = require("../models/userModel");
const { findById, updateOne } = require("../models/questionModel");

//Get a particular question

router.get("/get-question/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
});
// update records for each answer choosen
router.put("/", async (req, res) => {
  try {
    const { questionId, answerId, isAnswerCorrect } = req.body;

    await questionModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(questionId),
        "answerOptions.checked": true,
      },
      { $set: { "answerOptions.$.checked": false } }
    );
    await questionModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(questionId),
        "answerOptions._id": mongoose.Types.ObjectId(answerId),
      },
      { $set: { "answerOptions.$.checked": true } }
    );
    await questionModel.updateOne(
      { _id: mongoose.Types.ObjectId(questionId) },
      { $set: { isAnswerCorrect: isAnswerCorrect } }
    );

    const response = await questionModel.findById(questionId);
    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

// add Exams Questions to db manually

router.post("/", async (req, res) => {
  try {
    await questionModel
      .insertMany([
        {
          answeredQuestionText: "what is the capital of  France",
          answerOptions: [
            { answerText: "London", isCorrect: false, checked: false },
            { answerText: "Accra", isCorrect: false, checked: false },
            { answerText: "Lagos", isCorrect: false, checked: false },
            { answerText: "Paris", isCorrect: true, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  Poland ",
          answerOptions: [
            { answerText: "Warsaw", isCorrect: true, checked: false },
            { answerText: "Yaounde", isCorrect: false, checked: false },
            { answerText: "Nairobi", isCorrect: false, checked: false },
            { answerText: "Minsk", isCorrect: false, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  USA",
          answerOptions: [
            { answerText: "Liverpool", isCorrect: false, checked: false },
            { answerText: "Washington DC", isCorrect: true, checked: false },
            { answerText: "Lagos", isCorrect: false, checked: false },
            { answerText: "Hague", isCorrect: false, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  Greace",
          answerOptions: [
            { answerText: "Athens", isCorrect: false, checked: false },
            { answerText: "Florence", isCorrect: false, checked: false },
            { answerText: "Athens", isCorrect: true, checked: false },
            { answerText: "Abuja", isCorrect: false, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of Niger",
          answerOptions: [
            { answerText: "Kastina", isCorrect: false, checked: false },
            { answerText: "Chad", isCorrect: true, checked: false },
            { answerText: "London", isCorrect: false, checked: false },
            { answerText: "Paris", isCorrect: false, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  Germany",
          answerOptions: [
            { answerText: "Berlin", isCorrect: true, checked: false },
            { answerText: "johanisburg", isCorrect: false, checked: false },
            { answerText: "London", isCorrect: false, checked: false },
            { answerText: "Paris", isCorrect: false, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  Italy",
          answerOptions: [
            { answerText: "Florence", isCorrect: false, checked: false },
            { answerText: "Rome", isCorrect: true, checked: false },
            { answerText: "Madrid", isCorrect: false, checked: false },
            { answerText: "Paris", isCorrect: false, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  Nigeria",
          answerOptions: [
            { answerText: "Berlin", isCorrect: false, checked: false },
            { answerText: "Accra", isCorrect: false, checked: false },
            { answerText: "Lagos", isCorrect: false, checked: false },
            { answerText: "Abuja", isCorrect: true, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  Ghana",
          answerOptions: [
            { answerText: "Prague", isCorrect: false, checked: false },
            { answerText: "Accra", isCorrect: true, checked: false },
            { answerText: "Minsk", isCorrect: false, checked: false },
            { answerText: "Sao-Tome", isCorrect: false, checked: false },
          ],
          isAnswerCorrect: false,
        },
        {
          answeredQuestionText: "what is the capital of  Spain",
          answerOptions: [
            { answerText: "Barcelonia", isCorrect: false, checked: false },
            { answerText: "Rome", isCorrect: false, checked: false },
            { answerText: "Accra", isCorrect: false, checked: false },
            { answerText: "Madrid", isCorrect: true, checked: false },
          ],
          isAnswerCorrect: false,
        },
      ])
      .then(() => {
        console.log("inserted successfully");
      });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await questionModel.find({});

    return res.json(questions);
  } catch (err) {
    console.error(err.message);
  }
});

// get a particulat exam Question
router.post("/schedule", async (req, res) => {
  const { questionId } = req.body();
  const question = await questionModel.findById(questionId);
  res.json(question);
});
router.get("/user", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json(user);
  } catch (err) {
    console.error(err.messageg + " Hello");
  }
});

router.delete("/deleteID", async (req, res) => {
  try {
    const { id, questionId } = req.body;
    console.log(req.body);
    const question = questionModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      { $pull: { questions: { _id: mongoose.Types.ObjectId(questionId) } } }
    );
    question.then((err, succ) => {
      if (err) {
        res.json("Question Deleted Successfuly");
      } else res.json("Server Error, Question was not Deleted");
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/deleteresult/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const questions = await questionModel.findByIdAndDelete(id);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
