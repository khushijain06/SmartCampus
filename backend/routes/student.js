const router = require("express").Router()
const auth = require("../middleware/auth")
const Student = require("../models/student")

router.get("/me",auth,async (req,res)=>{
    const student = await Student.findOne({userId: req.user.id })
    res.json(student)
});

router.post("/",auth,async (req,res)=>{
    const student = new Student({...req.body,userId: req.user.id})
    await student.save()
    res.json(student)
})
module.exports = router;