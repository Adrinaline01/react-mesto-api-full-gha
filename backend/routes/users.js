const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUser, getUsers, getUserById, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');
const regexUrl = require('../utils/constants');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/me', getUserById);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexUrl),
  }),
}), updateAvatarUser);

module.exports = router;
