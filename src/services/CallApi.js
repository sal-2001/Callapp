const BASE_URL = "https://cerulean-marlin-wig.cyclic.app";

export const handleGetCalls = () => {
  return fetch(`${BASE_URL}/activities`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const handleSingleArchive = (id) => {
  return fetch(`${BASE_URL}/activities/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_archived: true,
    }),
  }).catch((error) => console.log(error));
};

export const handleSingleUnarchive = (id) => {
  return fetch(`${BASE_URL}/activities/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_archived: false,
    }),
  }).catch((error) => console.log(error));
};

export const handleAllUnarchive = () => {
  return fetch(`${BASE_URL}/reset`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error));
};


