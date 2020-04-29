import express from 'express'
import cors from 'cors'
import {evaluator} from "./evaluator.js";

const app = express()
const port = 5050

app.use(express.json())
app.use(cors())
app.use((err, req, res, next) => {
    res.status(500).json({err: err.message})
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
app.post('/parse', (req, res, next) => {
   let inputText, inputDsl, evaluatedExpression
   try {
       inputText = req.body.text
       inputDsl = req.body.rule
       evaluatedExpression = evaluator(inputText, inputDsl)
   } catch(e) {
      next(e)
   }
   res.json({
        evaluated: evaluatedExpression,
        inputText: inputText,
        inputDsl: inputDsl
    })


})
