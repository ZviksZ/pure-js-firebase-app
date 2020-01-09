import {getAuthForm}          from "./auth.js";
import {createModal, isValid} from "./utils.js";
import {Question}             from "./question.js";
import './styles.css'


const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
   submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
   event.preventDefault()

   if (isValid(input.value)) {
      const question = {
         text: input.value.trim(),
         date: new Date().toJSON()
      }

      submitBtn.disabled = true
      Question.create(question)
         .then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
         })
   }
}

function openModal() {
   createModal('Авторизация', getAuthForm())
   document.getElementById('auth-form').addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(e) {
   e.preventDefault()
   
   const email = e.target.querySelector('#email').value
   const password = e.target.querySelector('#password').value
   
   console.log(email, password)
}