import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Vote() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/question/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvaćanju pitanja:", err);
        setLoading(false);
      });
  }, [id]);

  const handleVote = () => {
    if (selectedChoice) {
      fetch(`/api/questions/${id}/vote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choice_id: selectedChoice }),
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = `/results/${id}`;
          } else {
            console.error("Greška pri slanju glasa.");
          }
        })
        .catch((err) => {
          console.error("Greška pri slanju glasa:", err);
        });
    }
  };

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-xl font-bold mb-4">{question.question_text}</h2>
      <ul className="space-y-2">
        {question.choices.map((choice) => (
          <li key={choice.id}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="choice"
                value={choice.id}
                onChange={() => setSelectedChoice(choice.id)}
              />
              <span>{choice.choice_text}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleVote}
        disabled={!selectedChoice}
      >
        Glasaj
      </button>
    </div>
  );
}

export default Vote;
