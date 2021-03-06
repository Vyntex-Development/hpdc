const fetchData = async (URL, method, data) => {
  const response = await fetch(
    URL,
    method === "POST"
      ? {
          body: JSON.stringify(data),
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      : null
  );
  const dataResponse = response.json();
  return dataResponse;
};

export const client = {
  request: async (URL, method = "GET", data = null) => {
    return await fetchData(URL, method, data);
  },
};

const formatingData = (data) => {
  let arrayOfDataFromBackend = [];
  let modifiedArrayOfData = [];

  for (const key in data) {
    if (data[key] && [key][0] !== "id" && data[key][0]) {
      arrayOfDataFromBackend.push(data[key][0]);
    }
  }

  modifiedArrayOfData = arrayOfDataFromBackend.map((card) => {
    if (card) {
      return {
        id: card.id,
        description: card.CardDescription,
        title: card.CardTitle,
        mediaUrl: card.CardIcon?.url,
        mediaUrlWebm: card.CardIconwebm?.url,
      };
    }
  });

  return modifiedArrayOfData;
};

const splitIntoChunks = (arr, size) => {
  let results = [];
  while (arr.length) {
    results.push(arr.splice(0, size));
  }

  return results;
};

export const getAllCategories = (data) => {
  let caratsList = formatingData(data[0].Carats[0]);
  let colorsList = formatingData(data[0].Color[0]);
  let subcolorList = formatingData(data[0].Subcolor[0]);
  let opacityList = formatingData(data[0].Opacity[0]).filter((item) => item);
  let cutQualityCollection = formatingData(data[0].CutQuality.Collection);
  let cutQualityCubeBase = formatingData(data[0].CutQuality.CubeBase);
  let cutQualitySphereBase = formatingData(data[0].CutQuality.SphereBase);

  return [
    {
      name: "Carats",
      category: splitIntoChunks([...caratsList], 6),
      length: [...caratsList].length,
    },
    {
      name: "Colors",
      category: splitIntoChunks([...colorsList], 6),
      length: [...colorsList].length,
    },
    {
      name: "Sub Colors",
      category: splitIntoChunks([...subcolorList], 6),
      length: [...subcolorList].length,
    },
    {
      name: "Opacity",
      category: splitIntoChunks([...opacityList], 6),
      length: [...opacityList].length,
    },
    {
      name: "Cut Quality",
      category: splitIntoChunks(
        [
          ...cutQualityCollection,
          ...cutQualityCubeBase,
          ...cutQualitySphereBase,
        ],
        6
      ),
      length: [
        ...cutQualityCollection,
        ...cutQualityCubeBase,
        ...cutQualitySphereBase,
      ].length,
    },
  ];
};

export const changePostitionOfSwiperElements = (btns, parent) => {
  btns.forEach((btn) => {
    let parentEl = btn.closest(parent);
    parentEl.append(btn);
  });
};
