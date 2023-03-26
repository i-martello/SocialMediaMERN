import CommentSchema from "../models/comment.js";

let ctrlComment = {};

ctrlComment.post = async (req, res) => {
  if (req.body.comment) {
    const imagen_id = req.params.id;
    const comment = req.body.comment;

    console.log(global.verifySession);

    if (comment.length > 300) {
      res.json({ error: "mucho texto" });
    } else {
      const newComment = new CommentSchema({
        image_id: imagen_id,
        name: global.verifySession,
        comment: comment,
      });
      await newComment.save();
    }
  } else {
    const comentarios = await CommentSchema.find({
      image_id: req.params.id,
    }).sort({ createdAt: -1 });
    if (comentarios) res.json(comentarios);

  }
};

export default ctrlComment;
