const { Thougth, User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .then((Users) => res.json(Users))
      .catch((err) => res.status(500).json(err));
  },
  //Single User
  getSingleUser(req, res) {
    User.findOne({ __id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Delete one user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }).then((User) =>
      !User
        ? res.status(404).json({ message: "There is no user with that ID" })
        : Thougth.deleteMany({ _id: { $in: User.thoughts } })
    );
  },
  //Update a user
  addFriend(req, res) {
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a friend from a list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { frinds: { frindId: req.params.frindId } } }
    )
      .then((user) =>
        !userId
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
