import { ApiUser, getUsers } from "./Fetch_API/fetchCall";


const userUrl : string = 'https://api.escuelajs.co/api/v1/users';
const users : ApiUser[] = await getUsers(userUrl);
const emails = document.querySelector<HTMLUListElement>('#email');
if (emails && users.length > 0) {
    for (const user of users) {
        const li = document.createElement('li');
        li.textContent = user.email;
        emails.appendChild(li);
    }
}
console.log("In the main",users);