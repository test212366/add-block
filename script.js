const form = document.getElementById('form'),
	input = document.querySelector('.input'),
	todosUl = document.querySelector('.todos'),
	todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
	todos.forEach(todo => {
		addTodo(todo)
	})
}


form.addEventListener('submit', e => {
	e.preventDefault()
	addTodo()
})

function addTodo(todo) {
	let todoText = input.value
	if (todo) {
		todoText = todo.text
	}
	if (todoText) {
		const todoEl = document.createElement('li')
		if (todo && todo.complete) {
			todoEl.classList.add('complete')
		}
		todoEl.textContent = todoText
		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('complete')
			updateLS()
		})
		todoEl.addEventListener('contextmenu', e => {
			e.preventDefault()
			todoEl.remove()
			updateLS()
		})
		todosUl.appendChild(todoEl)
		input.value = ''

		updateLS()
	}
}
function updateLS() {
	const todosEl = document.querySelectorAll('li')
	const todos = []
	todosEl.forEach(todoEl => {
		todos.push({
			text: todoEl.textContent,
			complete: todoEl.classList.contains('complete')
		})
	})
	localStorage.setItem('todos', JSON.stringify(todos))
}