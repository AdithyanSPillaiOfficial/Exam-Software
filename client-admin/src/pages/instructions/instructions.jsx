import React from 'react';

function InstructionsHtml() {
    return (
        <div>
            <p><strong>Please read the following carefully.</strong></p>
            <ol>
                <li>The duration of the examination is <strong>180</strong> minutes. The clock will be set on the server. The
                    countdown timer at the top right-hand corner of your screen displays the time available for you to complete the
                    examination.</li>
                <li>When the timer reaches zero, the examination will end automatically. You will not be required to submit your
                    examination.</li>
                <li>A <strong>scientific calculator</strong> is available at the top-right-hand side of the screen.</li>
                <li>The Question Palette displayed on the right-hand side of the screen shows the status of each question using one
                    of the following symbols:</li>
            </ol>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="https://link.com/image1.jpg"
                            alt="" /></td>
                        <td>You have NOT visited the question yet.</td>
                    </tr>
                    <tr>
                        <td><img src="https://link.com/image2.jpg"
                            alt="" /></td>
                        <td>You have NOT answered the question.</td>
                    </tr>
                    <tr>
                        <td><img src="https://link.com/image3.jpg"
                            alt="" /></td>
                        <td>You have answered the question. <strong>This will be evaluated.</strong></td>
                    </tr>
                    <tr>
                        <td><img src="https://link.com/image4.jpg"
                            alt="" /></td>
                        <td>You have NOT answered the question but marked it for review.</td>
                    </tr>
                    <tr>
                        <td><img src="https://link.com/image5.jpg"
                            alt="" /></td>
                        <td>You have answered the question and marked it for review. <strong>This will also be evaluated.</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ol>
                <li>Click on <img
                    src="https://link.com/image7.jpg"
                    alt="" /> to collapse the question palette and maximize the question window.</li>
            </ol>
            <p>To undo, click on<img
                src="https://link.com/image8.jpg"
                alt="" /></p>
            <p><strong>Answering questions:</strong></p>
            <ol>
                <li>
                    <p>To navigate to a question, click on the question number in the Question Palette. This does NOT save your
                        answer to the current question.</p>
                </li>
                <li>
                    <p><strong>Multiple-Choice questions (MCQs)/Multiple-select questions (MSQs):</strong> Each MCQ/MSQ has four
                        options. Clicking on an option will select it and clicking on it again will unselect it. For MCQ, only one
                        option can be selected at any time. For MSQ, more than one option can be selected. Clicking the
                        <strong>Clear Response</strong> button will clear all selected options for that question.</p>
                </li>
                <li>
                    <p><strong>Numerical Answer Type (NAT) questions:</strong> To enter a numerical answer, use the virtual numeric
                        keypad that appears below the question. Clicking the <strong>Clear Response</strong> button will clear the
                        numerical answer you have entered.</p>
                </li>
                <li>
                    <p>Click on <strong>Save &amp; Next</strong> to save your answer to the current question and then go to the next
                        question.</p>
                </li>
                <li>
                    <p>Click on <strong>Mark for Review &amp; Next</strong> to save your answer to the current question, mark it for
                        review, and then go to the next question.</p>
                </li>
                <li>
                    <p>You can navigate to any question and change your answer to it during the examination. Remember to click on
                        <strong>Save &amp; Next</strong> after changing your answer.</p>
                </li>
                <li>
                    <p><strong>Marking:</strong> Each question carries either one mark or two marks, as specified. Questions that
                        are not attempted will result in ZERO marks.</p>
                </li>
                <li>
                    <p><strong>Negative marking:</strong></p>
                </li>
                <li>
                    <p><strong>MCQ</strong>: Wrong answers for MCQs will result in NEGATIVE marks: ⅓ negative mark for a 1-mark
                        question; and ⅔ negative mark for a 2-mark question.</p>
                </li>
                <li><strong>MSQ:</strong> There is no negative marking for MSQs. However, there is NO partial marking. To get the
                    specified marks, you must select ALL the correct option(s) and NO wrong option(s). Note that MSQs cannot have
                    all four options correct.</li>
                <li><strong>NAT:</strong> There is no negative marking for NAT questions.</li>
            </ol>
            <p><strong>Navigating through sections:</strong></p>
            <ol>
                <li>
                    <p>Sections in the question paper are displayed at the top of the screen. Questions in a section can be viewed
                        by clicking on the section heading/tab. The tab of the section you are currently viewing is highlighted.</p>
                </li>
                <li>
                    <p>Clicking the <strong>Save &amp; Next button</strong> on the last question for a section will take you to the
                        first question of the next section.</p>
                </li>
                <li>
                    <p>You can switch between sections and questions anytime during the examination by clicking on the appropriate
                        tab.</p>
                </li>
                <li>
                    <p>You can view the section summary above the question palette.</p>
                </li>
            </ol>
            <p><strong>Scribble Pad</strong></p>
            <ol>
                <li>You may use the scribble pad provided in the examination hall for rough work. Write your name and registration
                    number on the scribble pad before using it. You can possess ONLY one scribble pad at any point of time. You may
                    ask for a second scribble pad only after returning the first one to the invigilator. Return the scribble pad in
                    your possession to the invigilator at the end of the examination.</li>
            </ol>
        </div>
    )
}

export default InstructionsHtml;
