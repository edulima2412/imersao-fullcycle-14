"use client";

import type { FindPlaceFromTextResponseData } from "@googlemaps/google-maps-services-js";
import { FormEvent } from "react";

export function NewRoutePage() {
  async function routeCreate(event: FormEvent) {
    event.preventDefault();

    const source = (document.getElementById("source") as HTMLInputElement)
      .value;
    const destination = (
      document.getElementById("destination") as HTMLInputElement
    ).value;

    const [sourceResponse, destinationResponse] = await Promise.all([
      fetch(`http://localhost:3000/places?text=${source}`),
      fetch(`http://localhost:3000/places?text=${destination}`),
    ]);

    const [sourcePlace, destinationPlace]: FindPlaceFromTextResponseData[] =
      await Promise.all([sourceResponse.json(), destinationResponse.json()]);

    if (sourcePlace.status !== "OK") {
      console.error(sourcePlace);
      alert("Não foi possivel encontrar a origem");
      return;
    }

    if (destinationPlace.status !== "OK") {
      console.error(destinationPlace);
      alert("Não foi possivel encontrar o destino");
      return;
    }

    const placeSourceId = sourcePlace.candidates[0].place_id;
    const placeDestinationId = destinationPlace.candidates[0].place_id;

    const directionResponse = await fetch(
      `http://localhost:3000/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`
    );

    const directionData = await directionResponse.json();

    console.log(directionData);
  }

  return (
    <div>
      <h1>Nova Rota</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={routeCreate}
      >
        <div>
          <input type="text" name="source" id="source" placeholder="Origem" />
        </div>
        <div>
          <input
            type="text"
            name="destination"
            id="destination"
            placeholder="Destino"
          />
        </div>
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  );
}

export default NewRoutePage;
