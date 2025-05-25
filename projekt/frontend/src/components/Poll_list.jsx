import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Poll_list() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/questions`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
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
          <li key={question.id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
            <span>{question.question_text}</span>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => navigate(`/vote/${question.id}`)}
              >
                Glasaj
              </button>
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => navigate(`/results/${question.id}`)}
              >
                Rezultati
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Poll_list;