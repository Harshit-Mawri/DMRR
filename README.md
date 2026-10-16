\# Task Manager App



A beginner full-stack web development project built using React, TypeScript, Django REST Framework, and MongoDB.



I'm building this project to learn how frontend and backend applications communicate, how REST APIs work, and how to connect a web application to a database.



\## Technologies Used



\*\*Frontend\*\*

\- React

\- TypeScript

\- Vite

\- React Router

\- Axios 



\*\*Backend\*\*

\- Python

\- Django

\- Django REST Framework

\- uv for Python package and project management

\- JWT authentication



\*\*Database\*\*

\- MongoDB



\## Features



\- Create and view tasks.

\- Manage tasks through a web interface.

\- Connect the frontend to a Django REST API.

\- Store application data in MongoDB.



\*Only features implemented and tested in the current version should be considered complete.\*



\## Getting Started



\### Prerequisites



Install the following tools:



\- \[Git](https://git-scm.com/)

\- \[Node.js](https://nodejs.org/)

\- \[uv](https://docs.astral.sh/uv/)

\- \[Python](https://www.python.org/)

\- \[MongoDB Community Server](https://www.mongodb.com/try/download/community)



\## 1. Clone the Repository



```bash

git clone https://github.com/Harshit-Mawri/DMRR.git

cd DMRR

```



Replace the example URL and repository name with your actual GitHub details.



\## 2. Set Up the Backend



Open a terminal in the backend project directory — the folder containing `pyproject.toml` and `manage.py`.



\### Install Python dependencies



```bash

uv sync

```



This installs the dependencies defined in the project's `pyproject.toml` and lockfile, if present.



\### Configure environment variables



Create the required local environment file using your project's configuration.



Do not commit `.env` or expose your Django secret key, database credentials, or other secrets.



\### Start MongoDB



Make sure your local MongoDB server is running before starting Django.



If your project uses a local MongoDB instance, confirm that its connection URI matches the configuration in your backend.



\### Check the Django project



```bash

uv run manage.py check

```



\### Apply migrations



```bash

uv run manage.py migrate

```



Run this command only if migrations are part of your project's database setup and are supported by your configured Django database backend.



\### Start the Django development server



```bash

uv run manage.py runserver

```



The backend will usually be available at:



`http://127.0.0.1:8000/`



Keep this terminal open while using the application.



\## 3. Set Up the Frontend



Open a second terminal in the `frontend` directory.



\### Install dependencies



```bash

npm ci

```



\### Configure the API URL



Create the local `.env` file based on `.env.example`, if your frontend uses environment variables.



For example, if your source code expects `VITE\_API\_URL`:



```env

VITE\_API\_URL=http://127.0.0.1:8000

```



Use the exact variable name expected by your application.



\### Start the frontend



```bash

npm run dev

```



Open the local URL printed in your terminal, usually:



`http://localhost:5173/`



\## 4. Useful Development Commands



\### Backend



Run these commands from the backend directory:



| Command | Purpose |

|---|---|

| `uv sync` | Install project dependencies |

| `uv run manage.py check` | Check Django configuration |

| `uv run manage.py migrate` | Apply database migrations |

| `uv run manage.py runserver` | Start the development server |

| `uv run manage.py test` | Run Django tests |



If you change Django models, you may also need:



```bash

uv run manage.py makemigrations

uv run manage.py migrate

uv run manage.py runserver

```



\### Frontend



Run these commands from the frontend directory:



| Command | Purpose |

|---|---|

| `npm ci` | Install frontend dependencies |

| `npm run dev` | Start the development server |

| `npm run lint` | Check code for linting issues |

| `npm run build` | Build the frontend |

| `npm run preview` | Preview the production build |



\## 5. How the Application Works



```text

React + TypeScript

&#x20;       |

&#x20;       | HTTP requests

&#x20;       v

Django REST Framework

&#x20;       |

&#x20;       v

&#x20;    MongoDB

```



The frontend sends requests to the Django API. The backend processes those requests and interacts with the database.



\## What I'm Learning



\- Building interfaces using React and TypeScript.

\- Creating REST APIs using Django REST Framework.

\- Connecting a frontend to a backend.

\- Working with MongoDB.

\- Managing Python dependencies using uv.

\- Using Git and GitHub for version control.



\## Project Status



\*\*In development.\*\*



This is a learning project. Features and implementation may change as I gain experience and improve the application.



\## Author



\*\*HARSHIT\*\*



\- GitHub: https://github.com/Harshit-Mawri

