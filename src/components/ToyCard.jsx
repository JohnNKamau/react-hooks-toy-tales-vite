import React from "react";

function ToyCard({ toy, toys, setToys }) {
  const { id, name, image, likes } = toy;

  // DELETE toy
  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((t) => t.id !== id);
      setToys(updatedToys);
    });
  }

  // LIKE toy (PATCH)
  function handleLike() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        const updatedList = toys.map((t) =>
          t.id === updatedToy.id ? updatedToy : t
        );
        setToys(updatedList);
      });
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>

      <img src={image} alt={name} className="toy-avatar" />

      <p>{likes} Likes </p>

      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>

      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;