# fullstack-application

This is a demo full-stack CRUD application using **Angular**/**React** (Frontend), **Spring Boot** (Backend), and **MySQL** (Database).

---

## Project Structure
* fullstack-application/ 
    * `backend-springboot/`: The core backend service built with Spring Boot.
    * `frontend-angular/`: An Angular-based frontend application.
    * `frontend-react/`: A React-based frontend application.
    * `README.md`: This file, providing an overview of the entire project.

## Frontend Applications

### 1. Angular Frontend

- **Framework:** Angular 11  
- **Code Editor:** VS Code  
- **Languages:** TypeScript, Bootstrap, HTML, CSS  
- **Path:** [`frontend-angular`](./frontend-angular)  
- **How to run:**  
  1. Open a terminal in the `frontend-angular` folder.
  2. Run `npm install`
  3. Run `ng serve`
  4. Visit [http://localhost:4200](http://localhost:4200) in your browser.

[View Angular code on GitHub](https://github.com/rishabhkbakshi/fullstack-application/tree/master/frontend-angular)

---

### 2. React Frontend

- **Framework:** React (with TypeScript)
- **Code Editor:** VS Code  
- **Languages:** TypeScript, Bootstrap, HTML, CSS  
- **Path:** [`frontend-react`](./frontend-react)  
- **How to run:**  
  1. Open a terminal in the `frontend-react` folder.
  2. Run `npm install`
  3. Run `npm start`
  4. Visit [http://localhost:3000](http://localhost:3000) in your browser.

[View React code on GitHub](https://github.com/rishabhkbakshi/fullstack-application/tree/master/frontend-react)

---

## Backend Application

- **Framework:** Spring Boot 3.1.0  
- **Code Editor:** Eclipse  
- **Language:** Java  
- **Database:** MySQL  
- **Database Editor:** MySQL-Front  
- **Path:** [`backend-springboot`](./backend-springboot)  
- **How to run:**  
  1. Open a terminal in the `backend-springboot` folder.
  2. Import the project into Eclipse or run with Maven: ` & 'C:\Program Files\Java\jdk-17\bin\java.exe' '@C:\Users\<username>\AppData\Local\Temp\cp_cwltkfxbahzvgm0x0r4xnsorx.argfile' 'com.springbootapp.controller.AppRunner'`
  3. Backend will run on [http://localhost:8080](http://localhost:8080) by default.

[View Backend code on GitHub](https://github.com/rishabhkbakshi/fullstack-application/tree/master/backend-springboot)

---

## Running the Full Application

- **Step 1:** Start the backend (`backend-springboot`)
- **Step 2:** Start either frontend (`frontend-angular` or `frontend-react`) or both (each on its own port)
- **Step 3:** Open the corresponding port in your browser to use the application

You can run both frontends simultaneously; each will be available on its own port.

---

## Database Setup

**Create database:**
```sql
create database testdb;

To create table : 
> CREATE TABLE springboottable ( <br/>
          id int NOT NULL AUTO_INCREMENT, <br/>
          FirstName varchar(255),<br/>
          LastName varchar(255),<br/>
          Gender varchar(10),<br/>
          PRIMARY KEY (id)<br/>
);

Select query :
> select * from springboottable

Insert query :
> Insert into springboottable (firstname, lastname, gender)
> values('xyz', 'xyz', 'xyz')

Update query :
> update springboottable
set firstname = 'xyz', lastname = 'xyz', gender = 'xyz'
where id = 10 

Delete query :
> delete from springboottable
where id = 10
