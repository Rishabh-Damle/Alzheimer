import app from "./index";
import { PORT } from "./config";

const port = Number(PORT) || 3000;

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
