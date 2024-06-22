import React from 'react'
import './questionview.css'

function QuestionView(props) {
    return (
        <div className='questionview'>
            <div className="questiontype bordersimple">
                Question Type : MCQ
            </div>
            <div className="question">
                <form action="#" method="post">
                    <fieldset>
                        <legend>Question </legend>
                        <p>{props.question.question}</p>
                        {
                            props.question.options.map((option, index) => (
                                <div>
                                    <label className='option' key={index} onChange={(e)=>{props.saveAnswer(index); props.question.answer = index}}>
                                        <input type="radio" name="question" value={option} checked={props.question.answer === index} />
                                        {option}
                                    </label><br />
                                </div>

                            ))
                        }
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default QuestionView