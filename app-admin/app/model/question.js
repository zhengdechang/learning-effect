module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    paper_id: { type: Schema.Types.ObjectId, ref: 'Paper' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    question_type: { type: Number },
    question_content: { type: Schema.Types.Mixed },
    question_value: { type: String },
    question_score: { type: Number },
    know: [Schema.Types.ObjectId],
    know_score: { type: String },
  });

  // 题目表
  return conn.model('Question', schema, 'questions');
}