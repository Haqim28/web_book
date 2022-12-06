const { userBook } = require('../../models')


exports.pinjamBook = async (req, res) => {
try{
    const data = req.body
    data.idUser = req.user.id
    await userBook.create(data)

    res.status(200).send({
        status: 'success',
        message: 'Buku berhasil dipinjam',
        data
    })
} catch (error) {
    console.log(error)
    res.send({
        status: 'failed',
        message: 'Server Error'
    })
}
  };

  exports.getPinjam = async (req, res) => {
    try {

      const pinjams = await userBook.findAll({
          attributes: {
              exclude: ['createdAt', 'updatedAt']
          }
      })

      res.send({
          status: 'success',
          data: {
              pinjams
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



