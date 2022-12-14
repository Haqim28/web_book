
const { user,profile } = require('../../models')



exports.addUsers = async (req, res) => {

  try {

    await user.create(req.body)

    res.status(200).send({
        status: 'success',
        message: 'Add user finished'
    })
} catch (error) {
    console.log(error)
    res.send({
        status: 'failed',
        message: 'Server Error'
    })
}
  };


  exports.getUsers = async (req, res) => {
    try {

      const users = await user.findAll({
          attributes: {
              exclude: ['password','createdAt', 'updatedAt']
          }
      })

      res.send({
          status: 'success',
          data: {
              users
          }
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
  };

  exports.getUser = async (req, res) => {
    try {
      const { id } = req.params
      const data = await user.findAll({
          where: {
              id
          },
          attributes: {
              exclude: ['password', 'createdAt', 'updatedAt']
          }
      })

      res.send({
          status: 'success',
          data: {
              user: data
          }
      })
  } catch (error) {
      console.log(error)
      res.status(500).send({
          status: 'failed',
          message: 'Server Error'
      })
  }
  };

  exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params

      await user.update(req.body, {
          where: {
              id
          }
      })

      res.send({
          status: 'success',
          message: `Update user id: ${id} finished`,
          data: req.body
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params

      await user.destroy({
          where: {
              id
          }
      })
      
      res.send({
          status: 'success',
          message: `Delete user id: ${id} finished`
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
  };


  exports.getProfile = async (req, res) => {
    try {

      const profiles = await profile.findAll({
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
          },
        },
          attributes: {
              exclude: ['password','createdAt', 'updatedAt']
          }
      })

      res.send({
          status: 'success',
          data: {
              profiles,
          }
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
  };