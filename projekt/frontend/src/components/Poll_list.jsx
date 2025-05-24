import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Poll_list() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/questions`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
        console.log(questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvaćanju pitanja:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Učitavanje...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Popis anketa</h2>
      <ul className="space-y-4">
        {questions.map((question) => (
          <li key={question.id} className="p-4 bg-gray-100 rounded shadow">
            {question.question_text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Poll_list;