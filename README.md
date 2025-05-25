# Aplikacija za izradu anketa sa realtime prikazom rezultata (WebSockets)

---

### Backend

1. **(Opcionalno)** Stvaranje i aktivacija virtualnog okruženja:

```bash
python -m venv venv
venv\Scripts\activate        # Windows
```

2. Instalacija potrebnih paketa:

```bash
pip install -r requirements.txt
```

3. U folderu `pollApp`, pokretanje migracija:

```bash
python manage.py migrate
```

4. U folderu `pollApp`, pokrenuti server:

```bash
daphne pollApp.asgi:application
```

5. Potrebno pokrenuti Redis server (za WebSockets):

- Moguće preko Dockera:

```bash
docker run -p 6379:6379 redis
```

---

### Frontend

1. U folderu `frontend`:

```bash
npm install
```

2. U folderu `frontend`, pokretanje:

```bash
npm run dev
```
