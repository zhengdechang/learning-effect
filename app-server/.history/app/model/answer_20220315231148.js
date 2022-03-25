module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    paper_id: { type: Schema.Types.ObjectId, ref: 'Paper' },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question' },
    question_type: { type: Number },
    answer_value: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    answer_score: { type: Number, default: 0 },
  });

  // 回答表
  return conn.model('Answer', schema, 'answers');
}