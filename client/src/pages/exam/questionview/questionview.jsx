import React from 'react'
import './questionview.css'

function QuestionView() {
    return (
        <div className='questionview'>
            <div className="questiontype bordersimple">
                Question Type : MCQ
            </div>
            <div className="question">
                <form action="#" method="post">
                    <fieldset>
                        <legend>Question </legend>
                        <p>Which Concept is used in Queue</p>
                        <label className='option'>
                            <input type="radio" name="question" value="FIFO" />
                            FIFO
                        </label><br />
                        <label className='option'>
                            <input type="radio" name="question" value="LIFO" />
                            LIFO
                        </label><br />
                        <label className='option'>
                            <input type="radio" name="question" value="FILO" />
                            FILO
                        </label><br />
                        <label className='option'>
                            <input type="radio" name="question" value="LILA" />
                            LILA
                        </label><br />
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default QuestionView