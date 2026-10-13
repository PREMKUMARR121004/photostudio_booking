
import React from "react";

function PublicPortfolio() {
  const portfolio = [
    {
      id: 1,
      title: "Wedding Photography",
      description: "Beautiful moments from your special day.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Portrait Photography",
      description: "Simple and beautiful photos that show who you are.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Couple Photography",
      description: "Capture your special moments together.",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    },
    {
  id: 4,
  title: "Event Photography",
  description: "Capture the fun and special moments of every event.",
  image:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
},
  ];

  return (
    <div className="min-h-screen bg-white px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Portfolio
          </h1>

          <p className="mt-3 text-gray-600">
            Some of our best moments captured through the camera.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicPortfolio;
