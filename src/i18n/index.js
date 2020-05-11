import enUS from "./en-us";
import esES from "./es-es";
import path from "./routes";
enUS["path"] = path;
esES["path"] = path;
let lenguages = {
  "en-us": enUS,
  "es-es": esES
};
export default lenguages;
