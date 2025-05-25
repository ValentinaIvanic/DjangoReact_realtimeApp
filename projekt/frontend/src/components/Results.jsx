import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Results() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    fetch(`/api/question/${id}/`)
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => console.error("Greška pri dohvaćanju rezultata:", err));
  }, [id]);

  if (!question) return <p>Učitavanje rezultata...</p>;

  const totalVotes = question.choices.reduce((sum, choice) => sum + choice.votes, 0);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-xl font-bold mb-4">{question.question_text}</h2>
      <ul className="space-y-2">
        {question.choices.map((choice) => {
          const percentage = totalVotes
            ? ((choice.votes / totalVotes) * 100).toFixed(1)
            : 0;
          return (
            <li key={choice.id} className="bg-gray-100 p-4 rounded shadow">
              <p className="font-semibold">{choice.choice_text}</p>
              <p>
                {choice.votes} glasova ({percentage}%)
              </p>
              <div className="w-full bg-gray-300 h-4 rounded mt-2">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Results;
