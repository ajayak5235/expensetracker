// main.js
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    // Function to fetch and display expenses
    const fetchExpenses = async () => {
        
        try {
            const response = await fetch('http://localhost:3000/getAll');
            const expenses = await response.json();
            expenseList.innerHTML = '';

            expenses.forEach((expense) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${expense.description}: $${expense.amount} (${expense.date}) <button data-id="${expense.id}" class="deleteBtn">Delete</button>`;
                expenseList.appendChild(listItem);
            });

            // Attach event listeners for delete buttons
            const deleteButtons = document.querySelectorAll('.deleteBtn');
            deleteButtons.forEach((button) => {
                button.addEventListener('click', async (e) => {
                    const expenseId = e.target.getAttribute('data-id');
                    await deleteExpense(expenseId);
                    fetchExpenses();
                });
            });
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    // Function to delete an expense
    const deleteExpense = async (id) => {
        try {
            await fetch(`http://localhost:3000/getAll/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    // Form submission handler
    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;

        const newExpense = {
            description,
            amount,
            date,
        };

        try {
            await fetch('http://localhost:3000/getAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExpense),
            });

            // Clear form fields after submission
            expenseForm.reset();

            // Fetch and display updated expense list
            fetchExpenses();
        } catch (error) {
            console.error('Error creating expense:', error);
        }
    });

    // Fetch and display expenses on page load
    fetchExpenses();
});
