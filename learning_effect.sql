/*
 Navicat Premium Data Transfer

 Source Server         : mongo
 Source Server Type    : MongoDB
 Source Server Version : 50007
 Source Host           : localhost:27017
 Source Schema         : learning_effect

 Target Server Type    : MongoDB
 Target Server Version : 50007
 File Encoding         : 65001

 Date: 15/05/2022 19:04:48
*/


// ----------------------------
// Collection structure for answers
// ----------------------------
db.getCollection("answers").drop();
db.createCollection("answers");

// ----------------------------
// Documents of answers
// ----------------------------
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42efa265a6224054148e"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e420ba265a6224054144f"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42e7a265a6224054148a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42efa265a6224054148f"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e427ba265a62240541466"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42e7a265a6224054148a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42efa265a62240541490"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4220a265a62240541454"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42e7a265a6224054148a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42efa265a62240541491"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e423aa265a62240541459"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42e7a265a6224054148a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42efa265a62240541492"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4248a265a6224054145e"),
    "question_type": NumberInt("3"),
    "answer_value": "111",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42e7a265a6224054148a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42efa265a62240541493"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4254a265a62240541461"),
    "question_type": NumberInt("3"),
    "answer_value": "111",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42e7a265a6224054148a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a6224054149e"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40a8a265a622405413ff"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a6224054149f"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40caa265a62240541402"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a622405414a0"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40ffa265a62240541405"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a622405414a1"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4154a265a6224054141c"),
    "question_type": NumberInt("2"),
    "answer_value": "11",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a622405414a2"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4164a265a6224054141f"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a622405414a3"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e411ea265a62240541408"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a622405414a4"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e417da265a6224054142a"),
    "question_type": NumberInt("2"),
    "answer_value": "11",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e42fda265a622405414a5"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4193a265a62240541431"),
    "question_type": NumberInt("3"),
    "answer_value": "11",
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "exam_id": ObjectId("627e42f4a265a6224054149a"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4da7a265a622405415fa"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e420ba265a6224054144f"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4d9fa265a622405415f6"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4da7a265a622405415fb"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e427ba265a62240541466"),
    "question_type": NumberInt("1"),
    "answer_value": "C",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4d9fa265a622405415f6"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4da7a265a622405415fc"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4220a265a62240541454"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4d9fa265a622405415f6"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4da7a265a622405415fd"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e423aa265a62240541459"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4d9fa265a622405415f6"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4da7a265a622405415fe"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4248a265a6224054145e"),
    "question_type": NumberInt("3"),
    "answer_value": "11",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4d9fa265a622405415f6"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4da7a265a622405415ff"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4254a265a62240541461"),
    "question_type": NumberInt("3"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4d9fa265a622405415f6"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a6224054160a"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40a8a265a622405413ff"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a6224054160b"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40caa265a62240541402"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a6224054160c"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40ffa265a62240541405"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a6224054160d"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e411ea265a62240541408"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a6224054160e"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4154a265a6224054141c"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a6224054160f"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4164a265a6224054141f"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a62240541610"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e417da265a6224054142a"),
    "question_type": NumberInt("2"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a62240541611"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4193a265a62240541431"),
    "question_type": NumberInt("3"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627e4db4a265a62240541612"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e41a3a265a62240541436"),
    "question_type": NumberInt("3"),
    "answer_value": "111",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627e4daaa265a62240541606"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f1b0e95eef11dc4b9b5a6"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e420ba265a6224054144f"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("6273263ba019664244cef123"),
    "exam_id": ObjectId("627f1b0595eef11dc4b9b5a2"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f1b0e95eef11dc4b9b5a7"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e427ba265a62240541466"),
    "question_type": NumberInt("1"),
    "answer_value": "C",
    "user_id": ObjectId("6273263ba019664244cef123"),
    "exam_id": ObjectId("627f1b0595eef11dc4b9b5a2"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f1b0e95eef11dc4b9b5a8"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4220a265a62240541454"),
    "question_type": NumberInt("2"),
    "answer_value": "123",
    "user_id": ObjectId("6273263ba019664244cef123"),
    "exam_id": ObjectId("627f1b0595eef11dc4b9b5a2"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f1b0e95eef11dc4b9b5a9"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4248a265a6224054145e"),
    "question_type": NumberInt("3"),
    "answer_value": "13",
    "user_id": ObjectId("6273263ba019664244cef123"),
    "exam_id": ObjectId("627f1b0595eef11dc4b9b5a2"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f1b0e95eef11dc4b9b5aa"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4254a265a62240541461"),
    "question_type": NumberInt("3"),
    "answer_value": "13",
    "user_id": ObjectId("6273263ba019664244cef123"),
    "exam_id": ObjectId("627f1b0595eef11dc4b9b5a2"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f1b0e95eef11dc4b9b5ab"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e423aa265a62240541459"),
    "question_type": NumberInt("2"),
    "answer_value": "1",
    "user_id": ObjectId("6273263ba019664244cef123"),
    "exam_id": ObjectId("627f1b0595eef11dc4b9b5a2"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f1b1795eef11dc4b9b5b6"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40a8a265a622405413ff"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("6273263ba019664244cef123"),
    "exam_id": ObjectId("627f1b1195eef11dc4b9b5b2"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f56446ae4573e84c99acf"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e420ba265a6224054144f"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627f563c6ae4573e84c99acb"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f56446ae4573e84c99ad0"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e427ba265a62240541466"),
    "question_type": NumberInt("1"),
    "answer_value": "C",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627f563c6ae4573e84c99acb"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f56446ae4573e84c99ad1"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4220a265a62240541454"),
    "question_type": NumberInt("2"),
    "answer_value": "11",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627f563c6ae4573e84c99acb"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f56446ae4573e84c99ad2"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e423aa265a62240541459"),
    "question_type": NumberInt("2"),
    "answer_value": "13",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627f563c6ae4573e84c99acb"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f56446ae4573e84c99ad3"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4248a265a6224054145e"),
    "question_type": NumberInt("3"),
    "answer_value": "13",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627f563c6ae4573e84c99acb"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f56446ae4573e84c99ad4"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4254a265a62240541461"),
    "question_type": NumberInt("3"),
    "answer_value": "31",
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "exam_id": ObjectId("627f563c6ae4573e84c99acb"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58036ae4573e84c99bfd"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e420ba265a6224054144f"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f57fc6ae4573e84c99bf9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58036ae4573e84c99bfe"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e427ba265a62240541466"),
    "question_type": NumberInt("1"),
    "answer_value": "C",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f57fc6ae4573e84c99bf9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58036ae4573e84c99bff"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4220a265a62240541454"),
    "question_type": NumberInt("2"),
    "answer_value": "21",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f57fc6ae4573e84c99bf9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58036ae4573e84c99c00"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e423aa265a62240541459"),
    "question_type": NumberInt("2"),
    "answer_value": "21",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f57fc6ae4573e84c99bf9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58036ae4573e84c99c01"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4254a265a62240541461"),
    "question_type": NumberInt("3"),
    "answer_value": "11",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f57fc6ae4573e84c99bf9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58036ae4573e84c99c02"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4248a265a6224054145e"),
    "question_type": NumberInt("3"),
    "answer_value": "11",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f57fc6ae4573e84c99bf9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c0d"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40a8a265a622405413ff"),
    "question_type": NumberInt("1"),
    "answer_value": "C",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c0e"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40caa265a62240541402"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c0f"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e40ffa265a62240541405"),
    "question_type": NumberInt("1"),
    "answer_value": "C",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c10"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e411ea265a62240541408"),
    "question_type": NumberInt("1"),
    "answer_value": "B",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c11"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4154a265a6224054141c"),
    "question_type": NumberInt("2"),
    "answer_value": "12",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c12"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4164a265a6224054141f"),
    "question_type": NumberInt("2"),
    "answer_value": "21",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c13"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e417da265a6224054142a"),
    "question_type": NumberInt("2"),
    "answer_value": "33",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c14"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e4193a265a62240541431"),
    "question_type": NumberInt("3"),
    "answer_value": "33",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f58126ae4573e84c99c15"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_id": ObjectId("627e41a3a265a62240541436"),
    "question_type": NumberInt("3"),
    "answer_value": "33",
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "exam_id": ObjectId("627f58076ae4573e84c99c09"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f592b6ae4573e84c99ce2"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e420ba265a6224054144f"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("627f59176ae4573e84c99cd4"),
    "exam_id": ObjectId("627f59236ae4573e84c99cde"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f592b6ae4573e84c99ce3"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e427ba265a62240541466"),
    "question_type": NumberInt("1"),
    "answer_value": "C",
    "user_id": ObjectId("627f59176ae4573e84c99cd4"),
    "exam_id": ObjectId("627f59236ae4573e84c99cde"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f592b6ae4573e84c99ce4"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4220a265a62240541454"),
    "question_type": NumberInt("2"),
    "answer_value": "11",
    "user_id": ObjectId("627f59176ae4573e84c99cd4"),
    "exam_id": ObjectId("627f59236ae4573e84c99cde"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f592b6ae4573e84c99ce5"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e423aa265a62240541459"),
    "question_type": NumberInt("2"),
    "answer_value": "212",
    "user_id": ObjectId("627f59176ae4573e84c99cd4"),
    "exam_id": ObjectId("627f59236ae4573e84c99cde"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f592b6ae4573e84c99ce6"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4248a265a6224054145e"),
    "question_type": NumberInt("3"),
    "answer_value": "21",
    "user_id": ObjectId("627f59176ae4573e84c99cd4"),
    "exam_id": ObjectId("627f59236ae4573e84c99cde"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f592b6ae4573e84c99ce7"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4254a265a62240541461"),
    "question_type": NumberInt("3"),
    "answer_value": "21",
    "user_id": ObjectId("627f59176ae4573e84c99cd4"),
    "exam_id": ObjectId("627f59236ae4573e84c99cde"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f5c1c6ae4573e84c99ded"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e420ba265a6224054144f"),
    "question_type": NumberInt("1"),
    "answer_value": "A",
    "user_id": ObjectId("627f5c006ae4573e84c99ddb"),
    "exam_id": ObjectId("627f5c116ae4573e84c99de9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f5c1c6ae4573e84c99dee"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4220a265a62240541454"),
    "question_type": NumberInt("2"),
    "answer_value": "21",
    "user_id": ObjectId("627f5c006ae4573e84c99ddb"),
    "exam_id": ObjectId("627f5c116ae4573e84c99de9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f5c1c6ae4573e84c99def"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e423aa265a62240541459"),
    "question_type": NumberInt("2"),
    "answer_value": "21",
    "user_id": ObjectId("627f5c006ae4573e84c99ddb"),
    "exam_id": ObjectId("627f5c116ae4573e84c99de9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f5c1c6ae4573e84c99df0"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4254a265a62240541461"),
    "question_type": NumberInt("3"),
    "answer_value": "23",
    "user_id": ObjectId("627f5c006ae4573e84c99ddb"),
    "exam_id": ObjectId("627f5c116ae4573e84c99de9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f5c1c6ae4573e84c99df1"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e4248a265a6224054145e"),
    "question_type": NumberInt("3"),
    "answer_value": "33",
    "user_id": ObjectId("627f5c006ae4573e84c99ddb"),
    "exam_id": ObjectId("627f5c116ae4573e84c99de9"),
    __v: NumberInt("0")
} ]);
db.getCollection("answers").insert([ {
    _id: ObjectId("627f5c1c6ae4573e84c99df2"),
    "answer_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_id": ObjectId("627e427ba265a62240541466"),
    "question_type": NumberInt("1"),
    "user_id": ObjectId("627f5c006ae4573e84c99ddb"),
    "exam_id": ObjectId("627f5c116ae4573e84c99de9"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for classes
// ----------------------------
db.getCollection("classes").drop();
db.createCollection("classes");
db.getCollection("classes").createIndex({
    "classes_name": NumberInt("1")
}, {
    name: "classes_name_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of classes
// ----------------------------
db.getCollection("classes").insert([ {
    _id: ObjectId("622b2014975a2a6948676d92"),
    "classes_name": "计算机174",
    __v: NumberInt("0")
} ]);
db.getCollection("classes").insert([ {
    _id: ObjectId("622b2017975a2a6948676d94"),
    "classes_name": "计算机173",
    __v: NumberInt("0")
} ]);
db.getCollection("classes").insert([ {
    _id: ObjectId("622c0d078af193236898c0d4"),
    "classes_name": "计算机172",
    __v: NumberInt("0")
} ]);
db.getCollection("classes").insert([ {
    _id: ObjectId("6240098f03d3131948c8e434"),
    "classes_name": "计算机171",
    __v: NumberInt("0")
} ]);
db.getCollection("classes").insert([ {
    _id: ObjectId("627f5bef6ae4573e84c99dd3"),
    "classes_name": "计算机国际版",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for exams
// ----------------------------
db.getCollection("exams").drop();
db.createCollection("exams");

// ----------------------------
// Documents of exams
// ----------------------------
db.getCollection("exams").insert([ {
    _id: ObjectId("627e42e7a265a6224054148a"),
    "sum_score": NumberInt("220"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "start_time": "1652441831312",
    __v: NumberInt("0"),
    "end_time": "1652441839969",
    "brief_score": NumberInt("75"),
    "empty_score": NumberInt("68"),
    other: "{\"627e420ba265a6224054144f\":\"34\",\"627e427ba265a62240541466\":\"43\",\"627e4220a265a62240541454\":\"23\",\"627e423aa265a62240541459\":\"45\",\"627e4248a265a6224054145e\":\"32\",\"627e4254a265a62240541461\":\"43\"}",
    "select_score": NumberInt("77"),
    knowList: "{\"627c5eb26df4e397983be09d\":\"73.33\",\"627c5eb86df4e397983be0a0\":\"73.33\",\"627c5ebf6df4e397983be0a3\":\"73.33\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627e42f4a265a6224054149a"),
    "sum_score": NumberInt("123"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "start_time": "1652441843998",
    __v: NumberInt("0"),
    "end_time": "1652441853715",
    "brief_score": NumberInt("14"),
    "empty_score": NumberInt("39"),
    other: "{\"627e40a8a265a622405413ff\":\"20\",\"627e40caa265a62240541402\":\"7\",\"627e40ffa265a62240541405\":\"8\",\"627e411ea265a62240541408\":\"9\",\"627e4154a265a6224054141c\":\"10\",\"627e4164a265a6224054141f\":\"10\",\"627e417da265a6224054142a\":\"19\",\"627e4193a265a62240541431\":\"14\"}",
    "select_score": NumberInt("44"),
    knowList: "{\"627c5eb86df4e397983be0a0\":\"27.00\",\"627c5eb26df4e397983be09d\":\"32.00\",\"627c5ed16df4e397983be0a9\":\"8.83\",\"627c5ec76df4e397983be0a6\":\"17.50\",\"627c5ebf6df4e397983be0a3\":\"11.67\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627e4d9fa265a622405415f6"),
    "sum_score": NumberInt("224"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "start_time": "1652444574836",
    __v: NumberInt("0"),
    "end_time": "1652444583844",
    "brief_score": NumberInt("82"),
    "empty_score": NumberInt("72"),
    other: "{\"627e420ba265a6224054144f\":\"34\",\"627e427ba265a62240541466\":\"36\",\"627e4220a265a62240541454\":\"31\",\"627e423aa265a62240541459\":\"41\",\"627e4248a265a6224054145e\":\"41\",\"627e4254a265a62240541461\":\"41\"}",
    "select_score": NumberInt("70"),
    knowList: "{\"627c5eb26df4e397983be09d\":\"74.67\",\"627c5eb86df4e397983be0a0\":\"74.67\",\"627c5ebf6df4e397983be0a3\":\"74.67\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627e4daaa265a62240541606"),
    "sum_score": NumberInt("126"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "start_time": "1652444586580",
    __v: NumberInt("0"),
    "end_time": "1652444596429",
    "brief_score": NumberInt("43"),
    "empty_score": NumberInt("18"),
    other: "{\"627e40a8a265a622405413ff\":\"12\",\"627e40caa265a62240541402\":\"21\",\"627e40ffa265a62240541405\":\"21\",\"627e411ea265a62240541408\":\"11\",\"627e4154a265a6224054141c\":\"3\",\"627e4164a265a6224054141f\":\"12\",\"627e417da265a6224054142a\":\"3\",\"627e4193a265a62240541431\":\"31\",\"627e41a3a265a62240541436\":\"12\"}",
    "select_score": NumberInt("65"),
    knowList: "{\"627c5eb86df4e397983be0a0\":\"32.43\",\"627c5eb26df4e397983be09d\":\"32.93\",\"627c5ed16df4e397983be0a9\":\"15.10\",\"627c5ec76df4e397983be0a6\":\"35.93\",\"627c5ebf6df4e397983be0a3\":\"9.60\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627f1b0595eef11dc4b9b5a2"),
    "sum_score": NumberInt("72"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("6273263ba019664244cef123"),
    "start_time": "1652497157118",
    __v: NumberInt("0"),
    "end_time": "1652497166214",
    "brief_score": NumberInt("24"),
    "empty_score": NumberInt("25"),
    other: "{\"627e420ba265a6224054144f\":\"12\",\"627e427ba265a62240541466\":\"11\",\"627e4220a265a62240541454\":\"12\",\"627e423aa265a62240541459\":\"13\",\"627e4248a265a6224054145e\":\"12\",\"627e4254a265a62240541461\":\"12\"}",
    "select_score": NumberInt("23"),
    knowList: "{\"627c5eb26df4e397983be09d\":\"24.00\",\"627c5eb86df4e397983be0a0\":\"24.00\",\"627c5ebf6df4e397983be0a3\":\"24.00\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627f563c6ae4573e84c99acb"),
    "sum_score": NumberInt("172"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "start_time": "1652512315962",
    __v: NumberInt("0"),
    "end_time": "1652512324034",
    "brief_score": NumberInt("64"),
    "empty_score": NumberInt("64"),
    other: "{\"627e420ba265a6224054144f\":\"12\",\"627e427ba265a62240541466\":\"32\",\"627e4220a265a62240541454\":\"32\",\"627e423aa265a62240541459\":\"32\",\"627e4248a265a6224054145e\":\"32\",\"627e4254a265a62240541461\":\"32\"}",
    "select_score": NumberInt("44"),
    knowList: "{\"627c5eb26df4e397983be09d\":\"57.33\",\"627c5eb86df4e397983be0a0\":\"57.33\",\"627c5ebf6df4e397983be0a3\":\"57.33\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627f57fc6ae4573e84c99bf9"),
    "sum_score": NumberInt("218"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "start_time": "1652512764438",
    __v: NumberInt("0"),
    "end_time": "1652512771880",
    "brief_score": NumberInt("86"),
    "empty_score": NumberInt("66"),
    other: "{\"627e420ba265a6224054144f\":\"23\",\"627e427ba265a62240541466\":\"43\",\"627e4220a265a62240541454\":\"23\",\"627e423aa265a62240541459\":\"43\",\"627e4254a265a62240541461\":\"43\",\"627e4248a265a6224054145e\":\"43\"}",
    "select_score": NumberInt("66"),
    knowList: "{\"627c5eb26df4e397983be09d\":\"72.67\",\"627c5eb86df4e397983be0a0\":\"72.67\",\"627c5ebf6df4e397983be0a3\":\"72.67\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627f58076ae4573e84c99c09"),
    "sum_score": NumberInt("196"),
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "user_id": ObjectId("627f57f06ae4573e84c99bef"),
    "start_time": "1652512775055",
    __v: NumberInt("0"),
    "end_time": "1652512786795",
    "brief_score": NumberInt("32"),
    "empty_score": NumberInt("45"),
    other: "{\"627e40a8a265a622405413ff\":\"23\",\"627e40caa265a62240541402\":\"32\",\"627e40ffa265a62240541405\":\"33\",\"627e411ea265a62240541408\":\"31\",\"627e4154a265a6224054141c\":\"12\",\"627e4164a265a6224054141f\":\"12\",\"627e417da265a6224054142a\":\"21\",\"627e4193a265a62240541431\":\"21\",\"627e41a3a265a62240541436\":\"11\"}",
    "select_score": NumberInt("119"),
    knowList: "{\"627c5eb86df4e397983be0a0\":\"48.07\",\"627c5eb26df4e397983be09d\":\"62.57\",\"627c5ed16df4e397983be0a9\":\"22.40\",\"627c5ec76df4e397983be0a6\":\"45.90\",\"627c5ebf6df4e397983be0a3\":\"17.07\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627f59236ae4573e84c99cde"),
    "sum_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("627f59176ae4573e84c99cd4"),
    "start_time": "1652513059362",
    __v: NumberInt("0"),
    "end_time": "1652513067183",
    "brief_score": NumberInt("42"),
    "empty_score": NumberInt("33"),
    other: "{\"627e420ba265a6224054144f\":\"12\",\"627e427ba265a62240541466\":\"12\",\"627e4220a265a62240541454\":\"12\",\"627e423aa265a62240541459\":\"21\",\"627e4248a265a6224054145e\":\"21\",\"627e4254a265a62240541461\":\"21\"}",
    "select_score": NumberInt("24"),
    knowList: "{\"627c5eb26df4e397983be09d\":\"33.00\",\"627c5eb86df4e397983be0a0\":\"33.00\",\"627c5ebf6df4e397983be0a3\":\"33.00\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627f5c116ae4573e84c99de9"),
    "sum_score": NumberInt("170"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("627f5c006ae4573e84c99ddb"),
    "start_time": "1652513809374",
    __v: NumberInt("0"),
    "end_time": "1652513820370",
    "brief_score": NumberInt("62"),
    "empty_score": NumberInt("64"),
    other: "{\"627e420ba265a6224054144f\":\"12\",\"627e427ba265a62240541466\":\"32\",\"627e4220a265a62240541454\":\"32\",\"627e423aa265a62240541459\":\"32\",\"627e4254a265a62240541461\":\"31\",\"627e4248a265a6224054145e\":\"31\"}",
    "select_score": NumberInt("44"),
    knowList: "{\"627c5eb26df4e397983be09d\":\"56.67\",\"627c5eb86df4e397983be0a0\":\"56.67\",\"627c5ebf6df4e397983be0a3\":\"56.67\"}"
} ]);
db.getCollection("exams").insert([ {
    _id: ObjectId("627f669cab00c1392c32fe17"),
    "sum_score": NumberInt("0"),
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "start_time": "1652516507719",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for info
// ----------------------------
db.getCollection("info").drop();
db.createCollection("info");
db.getCollection("info").createIndex({
    "info_name": NumberInt("1")
}, {
    name: "info_name_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of info
// ----------------------------
db.getCollection("info").insert([ {
    _id: ObjectId("6263fef3d3190000490079e3"),
    "info_name": "1212113"
} ]);
db.getCollection("info").insert([ {
    _id: ObjectId("626406bafaed6a16a0517f13"),
    "info_name": "124555",
    __v: NumberInt("0")
} ]);
db.getCollection("info").insert([ {
    _id: ObjectId("626406befaed6a16a0517f16"),
    "info_name": "234235",
    __v: NumberInt("0")
} ]);
db.getCollection("info").insert([ {
    _id: ObjectId("626406c2faed6a16a0517f19"),
    "info_name": "232522",
    __v: NumberInt("0")
} ]);
db.getCollection("info").insert([ {
    _id: ObjectId("626406c6faed6a16a0517f1c"),
    "info_name": "2342324",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for know
// ----------------------------
db.getCollection("know").drop();
db.createCollection("know");
db.getCollection("know").createIndex({
    "know_name": NumberInt("1")
}, {
    name: "know_name_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of know
// ----------------------------
db.getCollection("know").insert([ {
    _id: ObjectId("627c5eb26df4e397983be09d"),
    "know_name": "计算机",
    __v: NumberInt("0")
} ]);
db.getCollection("know").insert([ {
    _id: ObjectId("627c5eb86df4e397983be0a0"),
    "know_name": "数据结构",
    __v: NumberInt("0")
} ]);
db.getCollection("know").insert([ {
    _id: ObjectId("627c5ebf6df4e397983be0a3"),
    "know_name": "测试",
    __v: NumberInt("0")
} ]);
db.getCollection("know").insert([ {
    _id: ObjectId("627c5ec76df4e397983be0a6"),
    "know_name": "计算机基础",
    __v: NumberInt("0")
} ]);
db.getCollection("know").insert([ {
    _id: ObjectId("627c5ed16df4e397983be0a9"),
    "know_name": "c语言",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for mark
// ----------------------------
db.getCollection("mark").drop();
db.createCollection("mark");
db.getCollection("mark").createIndex({
    "mark_name": NumberInt("1")
}, {
    name: "mark_name_1",
    background: true,
    unique: true
});
db.getCollection("mark").createIndex({
    "com_score": NumberInt("1")
}, {
    name: "com_score_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of mark
// ----------------------------
db.getCollection("mark").insert([ {
    _id: ObjectId("6263a76ad3190000490079e2"),
    "mark_name": "非常优秀",
    "com_score": "10"
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6263a9d52434ae0d34fd5894"),
    "mark_name": "比较优秀",
    __v: NumberInt("0"),
    "com_score": "9"
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6264d47ec44a9133c4811930"),
    "mark_name": "优秀",
    __v: NumberInt("0"),
    "com_score": "8"
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6264db8ec44a9133c4811958"),
    "mark_name": "比较良好",
    __v: NumberInt("0"),
    "com_score": "7"
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("62650f3843e3874fa433f9dc"),
    "mark_name": "良好",
    __v: NumberInt("0"),
    "com_score": "6"
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6265112643e3874fa433fa1e"),
    "mark_name": "中等",
    "com_score": "5",
    __v: NumberInt("0")
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6265116843e3874fa433fa2c"),
    "mark_name": "不及格",
    "com_score": "4",
    __v: NumberInt("0")
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6265120243e3874fa433fa48"),
    "mark_name": "粗心",
    "com_score": "3",
    __v: NumberInt("0")
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6265120a43e3874fa433fa4b"),
    "mark_name": "比较粗心",
    "com_score": "2",
    __v: NumberInt("0")
} ]);
db.getCollection("mark").insert([ {
    _id: ObjectId("6265121143e3874fa433fa4e"),
    "mark_name": "非常粗心",
    "com_score": "1",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for papers
// ----------------------------
db.getCollection("papers").drop();
db.createCollection("papers");

// ----------------------------
// Documents of papers
// ----------------------------
db.getCollection("papers").insert([ {
    _id: ObjectId("622ee63a265b5f608059fe18"),
    "paper_status": NumberInt("1"),
    "paper_for_classes": [
        ObjectId("6240098f03d3131948c8e434"),
        ObjectId("622c0d078af193236898c0d4"),
        ObjectId("622b2014975a2a6948676d92"),
        ObjectId("622b2017975a2a6948676d94")
    ],
    "paper_title": "java",
    "paper_type": NumberInt("1"),
    "created_at": "1647240762532",
    "paper_points": "本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码。\n\n本书为中级难度，适合已经掌握 ES5 的读者，用来了解这门语言的最新发展；也可当作参考手册，查寻新增的语法点。如果你是 JavaScript 语言的初学者，建议先学完《JavaScript 语言入门教程》，再来看本书。\n\n全书已由电子工业出版社出版，2017年9月推出了第三版，书名为《ES6 标准入门》。纸版是基于网站内容排版印刷的。\n\n感谢张春雨编辑支持我将全书开源的做法。如果您认可这本书，建议购买纸版。这样可以使出版社不因出版开源书籍而亏钱，进而鼓励更多的作者开源自己的书籍。下面是第三版的购买地址。",
    "paper_time": NumberInt("60"),
    "paper_score": NumberInt("120"),
    "user_id": ObjectId("622c0c868af193236898c0b5"),
    __v: NumberInt("0"),
    "pass_at": "1652441730438"
} ]);
db.getCollection("papers").insert([ {
    _id: ObjectId("622f014ab8afca64ec684c0a"),
    "paper_status": NumberInt("1"),
    "paper_for_classes": [
        ObjectId("622b2014975a2a6948676d92"),
        ObjectId("622b2017975a2a6948676d94")
    ],
    "paper_title": "张三讲法律",
    "paper_type": NumberInt("1"),
    "created_at": "1647247690503",
    "paper_points": "法本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码。\n\n本书为中级难度，适合已经掌握 ES5 的读者，用来了解这门语言的最新发展；也可当作参考手册，查寻新增的语法点。如果你是 JavaScript 语言的初学者，建议先学完《JavaScript 语言入门教程》，再来看本书。\n\n全书已由电子工业出版社出版，2017年9月推出了第三版，书名为《ES6 标准入门》。纸版是基于网站内容排版印刷的。\n\n感谢张春雨编辑支持我将全书开源的做法。如果您认可这本书，建议购买纸版。这样可以使出版社不因出版开源书籍而亏钱，进而鼓励更多的作者开源自己的书籍。下面是第三版的购买地址。",
    "paper_time": NumberInt("120"),
    "paper_score": NumberInt("120"),
    "user_id": ObjectId("622c0c868af193236898c0b5"),
    __v: NumberInt("0"),
    "pass_at": "1652441550705"
} ]);

// ----------------------------
// Collection structure for questions
// ----------------------------
db.getCollection("questions").drop();
db.createCollection("questions");

// ----------------------------
// Documents of questions
// ----------------------------
db.getCollection("questions").insert([ {
    _id: ObjectId("623c506ebb3eaf2ef81d28f9"),
    "paper_id": ObjectId("623c5047bb3eaf2ef81d28d8"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": "11"
    },
    "question_value": "111",
    "question_score": NumberInt("1"),
    __v: NumberInt("0"),
    know: "(Array) 3 Elements"
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("623c5083bb3eaf2ef81d28fc"),
    "paper_id": ObjectId("623c5047bb3eaf2ef81d28d8"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": "123123"
    },
    "question_value": "123213",
    "question_score": NumberInt("0"),
    __v: NumberInt("0"),
    know: "(Array) 3 Elements"
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("623daddd889c5e317cff2753"),
    "paper_id": ObjectId("623dadc0889c5e317cff274f"),
    "question_type": NumberInt("1"),
    "question_content": {
        "question_title": "小李来了",
        options: [
            {
                "option_key": "11",
                "option_value": "11"
            },
            {
                "option_key": "2222",
                "option_value": "11"
            }
        ]
    },
    "question_value": "B",
    "question_score": NumberInt("5"),
    __v: NumberInt("0"),
    know: "(Array) 3 Elements"
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("623db018889c5e317cff2793"),
    "paper_id": ObjectId("623daff7889c5e317cff278f"),
    "question_type": NumberInt("3"),
    "question_content": {
        "question_title": "我是谁"
    },
    "question_value": "地方数据是给打发了结果还是豆腐干和山东积分时都会发生的恢复开放和受到了发货速度的佛教是的覅和山东i发货送到丰厚的是  红烧豆腐和史丹佛i",
    "question_score": NumberInt("10"),
    __v: NumberInt("0"),
    know: "(Array) 3 Elements"
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("6262316616634a5c5c05f4d0"),
    "paper_id": ObjectId("6262315e16634a5c5c05f4cc"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": "11"
    },
    "question_value": "11",
    "question_score": NumberInt("4"),
    __v: NumberInt("0"),
    know: "(Array) 3 Elements"
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627c5f396df4e397983be0d0"),
    know: [
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("627c5f1c6df4e397983be0cb"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": "计算机"
    },
    "question_value": "计算机",
    "question_score": NumberInt("10"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"3.33\",\"627c5eb86df4e397983be0a0\":\"3.33\",\"627c5ebf6df4e397983be0a3\":\"3.33\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e40a8a265a622405413ff"),
    know: [
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5eb26df4e397983be09d")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("1"),
    "question_content": {
        "question_title": "张三杀了人，但是是在迫不得已的情况下，这个时候要判几年？\n   \n",
        options: [
            {
                "option_key": "A",
                "option_value": "1年"
            },
            {
                "option_key": "B",
                "option_value": "2年"
            },
            {
                "option_key": "C",
                "option_value": "三年"
            }
        ]
    },
    "question_value": "A",
    "question_score": NumberInt("5"),
    "know_score": "{\"627c5eb86df4e397983be0a0\":\"2.50\",\"627c5eb26df4e397983be09d\":\"2.50\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e40caa265a62240541402"),
    know: [
        ObjectId("627c5ed16df4e397983be0a9"),
        ObjectId("627c5ec76df4e397983be0a6")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("1"),
    "question_content": {
        "question_title": "通常将计算机的中央处理器称为运算控制单元，又称为_______",
        options: [
            {
                "option_key": "A",
                "option_value": "11"
            },
            {
                "option_key": "B",
                "option_value": "22"
            }
        ]
    },
    "question_value": "A",
    "question_score": NumberInt("5"),
    "know_score": "{\"627c5ed16df4e397983be0a9\":\"2.50\",\"627c5ec76df4e397983be0a6\":\"2.50\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e40ffa265a62240541405"),
    know: [
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5ec76df4e397983be0a6")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("1"),
    "question_content": {
        "question_title": "张三姓什么",
        options: [
            {
                "option_key": "A",
                "option_value": "张"
            },
            {
                "option_key": "B",
                "option_value": "李"
            },
            {
                "option_key": "C",
                "option_value": "陈"
            },
            {
                "option_key": "D",
                "option_value": "黄"
            }
        ]
    },
    "question_value": "A",
    "question_score": NumberInt("5"),
    "know_score": "{\"627c5eb86df4e397983be0a0\":\"2.50\",\"627c5ec76df4e397983be0a6\":\"2.50\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e411ea265a62240541408"),
    know: [
        ObjectId("627c5eb26df4e397983be09d")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("1"),
    "question_content": {
        "question_title": "计算机是什么？",
        options: [
            {
                "option_key": "A",
                "option_value": "电脑"
            },
            {
                "option_key": "B",
                "option_value": "手机"
            }
        ]
    },
    "question_value": "A",
    "question_score": NumberInt("15"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"15.00\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e4154a265a6224054141c"),
    know: [
        ObjectId("627c5ed16df4e397983be0a9"),
        ObjectId("627c5ec76df4e397983be0a6"),
        ObjectId("627c5ebf6df4e397983be0a3"),
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5eb86df4e397983be0a0")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": "________是连接计算机中各个部件的物理信号线"
    },
    "question_value": "________是连接计算机中各个部件的物理信号线",
    "question_score": NumberInt("15"),
    "know_score": "{\"627c5ed16df4e397983be0a9\":\"3.00\",\"627c5ec76df4e397983be0a6\":\"3.00\",\"627c5ebf6df4e397983be0a3\":\"3.00\",\"627c5eb26df4e397983be09d\":\"3.00\",\"627c5eb86df4e397983be0a0\":\"3.00\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e4164a265a6224054141f"),
    know: [
        ObjectId("627c5ed16df4e397983be0a9"),
        ObjectId("627c5ec76df4e397983be0a6"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": "控制器是由程序计数器、指令寄存器和________等组成的"
    },
    "question_value": "控制器是由程序计数器、指令寄存器和________等组成的",
    "question_score": NumberInt("15"),
    "know_score": "{\"627c5ed16df4e397983be0a9\":\"5.00\",\"627c5ec76df4e397983be0a6\":\"5.00\",\"627c5ebf6df4e397983be0a3\":\"5.00\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e417da265a6224054142a"),
    know: [
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5ebf6df4e397983be0a3"),
        ObjectId("627c5eb86df4e397983be0a0")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": " 运算器的功能主要是进行算术运算和________"
    },
    "question_value": " 运算器的功能主要是进行算术运算和________",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\",\"627c5eb86df4e397983be0a0\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e4193a265a62240541431"),
    know: [
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5ec76df4e397983be0a6")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("3"),
    "question_content": {
        "question_title": "简述计算机系统的多级层次结构的分层理由及各层功能？"
    },
    "question_value": "简述计算机系统的多级层次结构的分层理由及各层功能？",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5ec76df4e397983be0a6\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e41a3a265a62240541436"),
    know: [
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622f014ab8afca64ec684c0a"),
    "question_type": NumberInt("3"),
    "question_content": {
        "question_title": " 计算机系统5层层次结构从下到上由哪五层组成？哪些是物理机，哪些是虚拟机？"
    },
    "question_value": " 计算机系统5层层次结构从下到上由哪五层组成？哪些是物理机，哪些是虚拟机？",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e420ba265a6224054144f"),
    know: [
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_type": NumberInt("1"),
    "question_content": {
        "question_title": "一条指令至少包括操作码和________两部分内容",
        options: [
            {
                "option_key": "A",
                "option_value": "A"
            },
            {
                "option_key": "B",
                "option_value": "B"
            }
        ]
    },
    "question_value": "A",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e4220a265a62240541454"),
    know: [
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": " 计算机的硬件能够识别并执行的一个基本操作命令称为________"
    },
    "question_value": " 计算机的硬件能够识别并执行的一个基本操作命令称为________",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e423aa265a62240541459"),
    know: [
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_type": NumberInt("2"),
    "question_content": {
        "question_title": "指令的有序排列称为________"
    },
    "question_value": "指令的有序排列称为________",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e4248a265a6224054145e"),
    know: [
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_type": NumberInt("3"),
    "question_content": {
        "question_title": "什么是存储单元、存储字、存储字长、存储体 "
    },
    "question_value": "什么是存储单元、存储字、存储字长、存储体 ",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e4254a265a62240541461"),
    know: [
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_type": NumberInt("3"),
    "question_content": {
        "question_title": " 浮点加减运算基本按照哪几步来进行 "
    },
    "question_value": " 浮点加减运算基本按照哪几步来进行 ",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\"}",
    __v: NumberInt("0")
} ]);
db.getCollection("questions").insert([ {
    _id: ObjectId("627e427ba265a62240541466"),
    know: [
        ObjectId("627c5eb26df4e397983be09d"),
        ObjectId("627c5eb86df4e397983be0a0"),
        ObjectId("627c5ebf6df4e397983be0a3")
    ],
    "paper_id": ObjectId("622ee63a265b5f608059fe18"),
    "question_type": NumberInt("1"),
    "question_content": {
        "question_title": " 浮点加减运算基本按照哪几步来进行 ",
        options: [
            {
                "option_key": "A",
                "option_value": "一步"
            },
            {
                "option_key": "B",
                "option_value": "两步"
            },
            {
                "option_key": "C",
                "option_value": "三步"
            }
        ]
    },
    "question_value": "A",
    "question_score": NumberInt("20"),
    "know_score": "{\"627c5eb26df4e397983be09d\":\"6.67\",\"627c5eb86df4e397983be0a0\":\"6.67\",\"627c5ebf6df4e397983be0a3\":\"6.67\"}",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for signs
// ----------------------------
db.getCollection("signs").drop();
db.createCollection("signs");

// ----------------------------
// Documents of signs
// ----------------------------
db.getCollection("signs").insert([ {
    _id: ObjectId("623ee3e1a94676304465c7c3"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1650782126000",
    date: "9180",
    __v: NumberInt("0"),
    "sign_out": "1651332927000"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623ee756a94676304465c7c6"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1650782135028",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1650782136237"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623ee795a94676304465c7c9"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1648289685000",
    __v: NumberInt("0"),
    date: "302",
    "sign_out": "1648307859000"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623ee881a94676304465c7cc"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1648289921056",
    __v: NumberInt("0"),
    date: "1",
    "sign_out": "1648290013615"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623ee903a94676304465c7d8"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1648290051000",
    __v: NumberInt("0"),
    date: "1443",
    "sign_out": "1648376660000"
} ]);
db.getCollection("signs").insert([ {
    _id: "623ee3e1a94676304465c7c3",
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648288737949,
    date: 23,
    __v: 0,
    "sign_out": 1648289569358
} ]);
db.getCollection("signs").insert([ {
    _id: "623ee756a94676304465c7c6",
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648289622702,
    date: 126,
    __v: 0,
    "sign_out": 1648289673726
} ]);
db.getCollection("signs").insert([ {
    _id: "623ee795a94676304465c7c9",
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648289685248,
    date: 214,
    __v: 0,
    "sign_out": 1648289859215
} ]);
db.getCollection("signs").insert([ {
    _id: "623ee881a94676304465c7cc",
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648289921056,
    date: 1,
    __v: 0,
    "sign_out": 1648290013615
} ]);
db.getCollection("signs").insert([ {
    _id: "623ee8e7a94676304465c7d3",
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290023359,
    date: "",
    __v: 0,
    "sign_out": 1648290048895
} ]);
db.getCollection("signs").insert([ {
    _id: "623ee903a94676304465c7d8",
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 30,
    __v: 0,
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efba898760000e20035c2"),
    "user_id": "62300c1829ef3926a0138297",
    date: 78,
    "sign_in": 1648290051239,
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbc898760000e20035c3"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 30,
    __v: 0,
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbc898760000e20035c4"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 78,
    __v: "",
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035c5"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 30,
    __v: 0,
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035c6"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648288737949,
    date: 23,
    __v: 0,
    "sign_out": 1648289569358
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035c7"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648289622702,
    date: 126,
    __v: 0,
    "sign_out": 1648289673726
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035c8"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648289685248,
    date: 214,
    __v: 0,
    "sign_out": 1648289859215
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035c9"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648289921056,
    date: 1,
    __v: 0,
    "sign_out": 1648290013615
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035ca"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290023359,
    date: "",
    __v: 0,
    "sign_out": 1648290048895
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035cb"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 30,
    __v: 0,
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035cc"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 78,
    __v: "",
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035cd"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 56,
    __v: 0,
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("623efbd098760000e20035ce"),
    "user_id": "62300c1829ef3926a0138297",
    "sign_in": 1648290051239,
    date: 78,
    __v: "",
    "sign_out": 1648290260088
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("624008a903d3131948c8e3ea"),
    "user_id": ObjectId("622e3aee8856fa50f049a593"),
    "sign_in": "1648363689493",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1648363690461"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6240091803d3131948c8e3f2"),
    "user_id": ObjectId("622e3aee8856fa50f049a593"),
    "sign_in": "1648363800246",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1648363804294"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("624009a803d3131948c8e43e"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1648363944350",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1648363945846"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("626203c416634a5c5c05f3d8"),
    "user_id": ObjectId("622e3aee8856fa50f049a593"),
    "sign_in": "1650590660226",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1650590662020"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("62620d4116634a5c5c05f454"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1650593089431",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1650593090105"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6262395b16634a5c5c05f5fa"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1650604379094",
    __v: NumberInt("0")
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6262d13a78a8b61a6c22fac7"),
    "user_id": ObjectId("62300c4d29ef3926a01382b4"),
    "sign_in": "1650643258022",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1650643259209"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6262d46e78a8b61a6c22fb1b"),
    "user_id": ObjectId("622b8d161a6fca6d60b4bce7"),
    "sign_in": "1651076072850",
    "sign_out": "1651248875864",
    date: "2880",
    __v: NumberInt("0")
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6264ef3d60f0ea2ef0347630"),
    "user_id": ObjectId("6264047e0f381b36a0dbe1c8"),
    "sign_in": "1649745207450",
    "sign_out": "1650782012849",
    date: "17280",
    __v: NumberInt("0")
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6264f02460f0ea2ef0347659"),
    "user_id": ObjectId("622f7d3e5d33e46aac3cf4e4"),
    "sign_in": "1648795038144",
    "sign_out": "1651214241265",
    date: "40320",
    __v: NumberInt("0")
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6264f3de085cea38c090bdae"),
    "user_id": ObjectId("622e3aee8856fa50f049a593"),
    "sign_in": "1650783197931",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1650783199116"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6264fce9b3ec6953e8262110"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1650785513344",
    __v: NumberInt("0")
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("6265020a8c17dd2634dc4f49"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1650786825769",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1650786826518"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("626513fb43e3874fa433fa76"),
    "user_id": ObjectId("62300c1829ef3926a0138297"),
    "sign_in": "1650791418737",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1650791426246"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("627fae61e0534d044887359e"),
    "user_id": ObjectId("622e3aee8856fa50f049a593"),
    "sign_in": "1652534880943",
    __v: NumberInt("0"),
    date: "0",
    "sign_out": "1652534882470"
} ]);
db.getCollection("signs").insert([ {
    _id: ObjectId("627fae65e0534d04488735a2"),
    "user_id": ObjectId("622e3aee8856fa50f049a593"),
    "sign_in": "1652534885227",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");
db.getCollection("users").createIndex({
    uname: NumberInt("1")
}, {
    name: "uname_1",
    background: true,
    unique: true
});
db.getCollection("users").createIndex({
    phone: NumberInt("1")
}, {
    name: "phone_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("62272af4db71000061001e24"),
    uname: "root",
    pwd: "123456",
    "user_type": 1,
    phone: "root",
    name: "超管",
    "info_id": "",
    "classes_id": "622b2088681f907e2c5ef6c1",
    "com_pc": "{}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("622c0c868af193236898c0b5"),
    name: "李四",
    "user_type": NumberInt("2"),
    phone: "17136679925",
    "created_at": "1647053958227",
    pwd: "123456",
    uname: "17133333324",
    __v: NumberInt("0"),
    "info_id": "",
    "classes_id": "622b20b0681f907e2c5ef6d9",
    "com_pc": "{}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("622e3aee8856fa50f049a593"),
    name: "wangwu",
    "user_type": NumberInt("2"),
    phone: "11111111111",
    "created_at": "1647196910667",
    pwd: "111111",
    uname: "11111111111",
    __v: NumberInt("0"),
    "info_id": "",
    "classes_id": "622b20b0681f907e2c5ef6d9",
    "com_pc": "{}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("62300c1829ef3926a0138297"),
    name: "刘德华",
    "user_type": NumberInt("3"),
    phone: "10000000000",
    "created_at": "1647315991801",
    "classes_id": ObjectId("622c0d078af193236898c0d4"),
    pwd: "000000",
    uname: "10000000000",
    __v: NumberInt("0"),
    "info_id": "6263fef3d3190000490079e3,626406bafaed6a16a0517f13,626406c6faed6a16a0517f1c,626406befaed6a16a0517f16,626406c2faed6a16a0517f19",
    "mark_id": ObjectId("6263a9d52434ae0d34fd5894"),
    "com_pc": "{\"627c5eb26df4e397983be09d\":0.32257708210221675,\"627c5eb86df4e397983be0a0\":0.2971848495919287,\"627c5ebf6df4e397983be0a3\":0.3850974036770049,\"627c5ed16df4e397983be0a9\":0.1321253303133258,\"627c5ec76df4e397983be0a6\":0.12488888888888887}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("62300c4d29ef3926a01382b4"),
    name: "六六",
    "user_type": NumberInt("2"),
    phone: "16666666666",
    "created_at": "1647316045286",
    pwd: "666666",
    uname: "16666666666",
    __v: NumberInt("0"),
    "info_id": "",
    "classes_id": "622b20b0681f907e2c5ef6d9",
    "com_pc": "{}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("62300c9f29ef3926a01382bb"),
    name: "wuwu",
    "user_type": NumberInt("2"),
    phone: "15555555555",
    "created_at": "1647316127617",
    pwd: "555555",
    uname: "15555555555",
    __v: NumberInt("0"),
    "info_id": "",
    "classes_id": "622b20c0681f907e2c5ef6e3",
    "com_pc": "{}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6264047e0f381b36a0dbe1c8"),
    name: "123",
    "user_type": NumberInt("3"),
    phone: "13999999999",
    "created_at": "1650721918985",
    "classes_id": ObjectId("6240098f03d3131948c8e434"),
    "info_id": "6263fef3d3190000490079e3,626400b37dedb03b4050efe0",
    pwd: "999999",
    uname: "13999999999",
    __v: NumberInt("0"),
    "com_pc": "{\"627c5eb26df4e397983be09d\":0.6576975796559621,\"627c5eb86df4e397983be0a0\":0.576257847040144,\"627c5ebf6df4e397983be0a3\":0.8783045630438444,\"627c5ed16df4e397983be0a9\":0.1545253863134658,\"627c5ec76df4e397983be0a6\":0.12165630701673004}",
    "mark_id": ObjectId("6263a76ad3190000490079e2")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6273263ba019664244cef123"),
    name: "郑",
    "user_type": NumberInt("3"),
    phone: "18819597673",
    "created_at": "1651713594944",
    "classes_id": ObjectId("6240098f03d3131948c8e434"),
    pwd: "597673",
    uname: "18819597673",
    __v: NumberInt("0"),
    "mark_id": ObjectId("6265112643e3874fa433fa1e"),
    "com_pc": "{\"627c5eb26df4e397983be09d\":0.27791666666666665,\"627c5eb86df4e397983be0a0\":0.27791666666666665,\"627c5ebf6df4e397983be0a3\":0.27791666666666665}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("627f57f06ae4573e84c99bef"),
    name: "小李",
    "user_type": NumberInt("3"),
    phone: "13222222222",
    "created_at": "1652512752015",
    "classes_id": ObjectId("622b2017975a2a6948676d94"),
    pwd: "222222",
    uname: "13222222222",
    __v: NumberInt("0"),
    "com_pc": "{\"627c5eb26df4e397983be09d\":0.25550676913401105,\"627c5eb86df4e397983be0a0\":0.24831310632205492,\"627c5ebf6df4e397983be0a3\":0.32247472278157246,\"627c5ed16df4e397983be0a9\":0.05208333333333334,\"627c5ec76df4e397983be0a6\":0.0476155894456548}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("627f59176ae4573e84c99cd4"),
    name: "21",
    "user_type": NumberInt("3"),
    phone: "12223333333",
    "created_at": "1652513047888",
    "classes_id": ObjectId("622b2014975a2a6948676d92"),
    pwd: "333333",
    uname: "12223333333",
    __v: NumberInt("0"),
    "com_pc": "{\"627c5eb26df4e397983be09d\":0.2021212121212121,\"627c5eb86df4e397983be0a0\":0.2021212121212121,\"627c5ebf6df4e397983be0a3\":0.2021212121212121}"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("627f5c006ae4573e84c99ddb"),
    name: "国际生",
    "user_type": NumberInt("3"),
    phone: "12444444444",
    "created_at": "1652513792718",
    "classes_id": ObjectId("627f5bef6ae4573e84c99dd3"),
    pwd: "444444",
    uname: "12444444444",
    __v: NumberInt("0"),
    "com_pc": "{\"627c5eb26df4e397983be09d\":0.11769895888477146,\"627c5eb86df4e397983be0a0\":0.11769895888477146,\"627c5ebf6df4e397983be0a3\":0.11769895888477146}"
} ]);
