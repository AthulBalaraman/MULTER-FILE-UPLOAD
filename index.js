const express = require('express')
const app = express()
const PORT = 5000
const multer = require('multer')
const path = require('path')

app.use(express.json())

// Setting the storage engine 
const storage = multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{               //cb = callback
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage:storage,
  limits:{fileSize:10}
})

app.use('/profilePicture',express.static('upload/images'))

// upload folder will automatically be created

app.post('/upload',upload.single('profilePicture'),(req,res)=>{
  console.log(req.file)
  res.json({
    success:1,
    profile_url:`http://localhost:5000/profilePicture/${req.file.filename}`
  })
})

// Global way of handling error

function errHandler(err,req,res,next){
  if(err instanceof multer.MulterError){
    res.json({
      success:0,
      message:err.message
    })
  }
}
app.use(errHandler)

app.listen(PORT,()=>{
  console.log("PORT running at 5000 ")
})

