const router = rquire("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  removeFriend,
} = rquire("../../controllers/usersController");

//users
router.route("/").get(getUsers).post(createUser);
//single user
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
//add friend
router.route("/:userId/friends").post(addFriend);
//delet friend
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
