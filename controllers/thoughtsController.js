const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: "reaction", select: "-__v" })
      .then((Thought) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No thoughts with that ID" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Posting a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: Thought._id } },
          { new: trud }
        );
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Deleting Thought
  deleteThougth(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thgouthId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : Thought.deleteMany({ _id: { $in: Thought.thoughts } })
      )
      .then(() => res.json({ message: "No Thoought with that ID" }))
      .catch((err) => res.status(500).json(err));
  },
  // Add reaction to a thought
  addRection(req, res) {
    console.log("You are adding a reaction");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { Reaction: { ReactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
