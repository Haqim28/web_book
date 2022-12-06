
const { book } = require('../../models')
exports.addBook = async (req, res) => {
  try {
    const data = req.body;
    data.image = req.file.filename;
    data.status = "active"
    const newBook = await book.create(data);
    res.status(200).send({
        status:"success",
        newBook        
    })
    } catch (error) {
    console.log(error)
    res.send({
        status: 'failed',
        message: 'Server Error'
    })
}
  };


  exports.getBooks = async (req, res) => {
    try {

      let books = await book.findAll({
          attributes: {
              exclude: ['createdAt', 'updatedAt']
          }
      })

    
    books.map((item)=>{
          item.image = process.env.PATH_FILE + item.image
      })
      
      res.send({
          status: 'success',
          data: {
              books
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

  exports.getBook = async (req, res) => {
    try {
      const { id } = req.params

      const data = await book.findAll({
          where: {
              id
          },
          attributes: {
              exclude: ['password', 'createdAt', 'updatedAt']
          }
      })
      data.map((item)=>{
        item.image = process.env.PATH_FILE + item.image
       })       
      if(!data){
        res.status(404).send({
           message : "Not Found"
        })
      }
      res.send({
          status: 'success',
          book:data
      })
  } catch (error) {
      console.log(error)
      res.status(404).send({
          status: 'failed',
          message: 'Server Error'
      })
  }
  };

  exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const datafirst = await book.findOne({
            where: {
                id
            }
        })
      
      const data = req.body;
      if(req.file == undefined){
        data.image = datafirst.image 
      }else{
        data.image = req.file.filename
      }

      await book.update(data, {
          where: {
              id
          }
      })
 
      res.send({
          status: 'success',
          message: `Update book id: ${id} finished`,
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

  exports.deleteBook = async (req, res) => {
    try {
      const { id } = req.params
      await book.destroy({
          where: {
              id
          }
      })
      
      res.send({
          status: 'success',
          message: `Delete book id: ${id} finished`
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
  };