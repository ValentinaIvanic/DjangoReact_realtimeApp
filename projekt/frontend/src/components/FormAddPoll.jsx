import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

function FormAddPoll() {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", ""]);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const removeChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      question_text: question,
      choices: choices
        .filter(choice => choice.trim() !== "")
        .map(choice => ({ choice_text: choice })),
    };

    console.log(payload)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/questions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text(); // ne mora biti JSON!
        console.error("Greška kod slanja:", text);
        return;
      }


      const result = await response.json();
      console.log("Uspješno spremljeno:", result);

      // Resetiranje forme
      setQuestion("");
      setChoices(["", ""]);
    } catch (error) {
      console.error("Greška pri fetchanju:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Dodaj novu anketu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="question" value="Pitanje" />
          <TextInput
            id="question"
            type="text"
            placeholder="Upiši pitanje..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

      <div className="space-y-4">
        <Label value="Odabiri" />
        {choices.map((choice, index) => (
          <div key={index} className="flex gap-2">
            <TextInput
              className= "bg-gray-100 border-gray-400 text-blue-700 flex-1"
              placeholder={`Odabir ${index + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              required
            />
            {choices.length > 2 && (
              <Button color="failure" className="text-red-600" onClick={() => removeChoice(index)} type="button">
                Izbriši
              </Button>
            )}
          </div>
        ))}
        <Button color="gray" type="button" onClick={addChoice}>
          + Dodaj odabir
        </Button>
      </div>

        <div className="text-center">
          <Button type="submit" color="blue">
            Spremi anketu
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormAddPoll;
