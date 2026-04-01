import { v4 as uuidv4 } from "uuid";

async function chillHop() {
  try {
    // Fetch chill radio stations from Radio Browser API (No API key required)
    const response = await fetch(
      "https://de1.api.radio-browser.info/json/stations/search?tag=chill&limit=10&hasGeoInfo=true",
    );
    const stations = await response.json();

    // Map radio stations to the expected format
    return stations.map((station, index) => ({
      name:
        station.name.length > 30
          ? station.name.substring(0, 30) + "..."
          : station.name,
      cover:
        station.favicon ||
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect fill="%234a6c7a" width="300" height="300"/><text x="50%" y="50%" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">Radio</text></svg>',
      artist: "Radio Station",
      audio: station.url,
      color: ["#4a6c7a", "#7a9bb0"],
      id: station.stationuuid,
      active: index === 0,
    }));
  } catch (error) {
    console.error("Failed to fetch radio stations:", error);
    // Fallback to some working radio streams
    return [
      {
        name: "Chillhop Beats",
        cover:
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect fill='%234a6c7a' width='300' height='300'/><text x='50%' y='50%' font-size='20' fill='white' text-anchor='middle' dominant-baseline='middle'>Chillhop</text></svg>",
        artist: "Radio Station",
        audio: "https://stream.zeno.fm/lwv6zqgtv1dtv",
        color: ["#4a6c7a", "#7a9bb0"],
        id: uuidv4(),
        active: true,
      },
      {
        name: "Relax FM",
        cover:
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect fill='%236b5b95' width='300' height='300'/><text x='50%' y='50%' font-size='20' fill='white' text-anchor='middle' dominant-baseline='middle'>Relax FM</text></svg>",
        artist: "Radio Station",
        audio: "https://pub0201.101.ru/stream/trust/mp3/128/24?",
        color: ["#6b5b95", "#8a7ca5"],
        id: uuidv4(),
        active: false,
      },
      {
        name: "Jazz Radio",
        cover:
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect fill='%238b7ba8' width='300' height='300'/><text x='50%' y='50%' font-size='20' fill='white' text-anchor='middle' dominant-baseline='middle'>Jazz</text></svg>",
        artist: "Radio Station",
        audio: "https://stream.zeno.fm/pu6zs09vgtzuv",
        color: ["#8b7ba8", "#b9a8d1"],
        id: uuidv4(),
        active: false,
      },
    ];
  }
}

export default chillHop;
