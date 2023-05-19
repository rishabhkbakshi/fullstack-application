# fullstack-application
This is the demo springboot application for basic crud operation in MySQL database

## Frontend Application
I used <ins>**_Angular framework_**</ins> for frontend part <br/>
- Code Editor : <ins>Vscode</ins> <br/>
- Language : <ins>Typescript, Bootstrap, HTML and CSS</ins><br/>

This is the path of frontend code :- <ins>[**https://github.com/rishabhkbakshi/fullstack-application/tree/master/Frontend-Angular**](https://github.com/rishabhkbakshi/fullstack-application/tree/master/Frontend-Angular)</ins>

## Backend Application
I used <ins>**_Springboot framework_**</ins> for backend part <br/>
- Code Editor : <ins>Eclipse</ins> <br/>
- Language : <ins>Java</ins> <br/>
- Database : <ins>MySQL</ins> <br/>
- Database Editor : <ins>MySQL-Front</ins>

This is the path of backend code :- <ins>[**https://github.com/rishabhkbakshi/fullstack-application/tree/master/Backend-Springboot**](https://github.com/rishabhkbakshi/fullstack-application/tree/master/Backend-Springboot)</ins>

> For more information :- Check out the individual **<ins>README.md</ins>** file of both the project.

### Required queries for the database (For this projet)
To create database :
> create database testdb <br>

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
