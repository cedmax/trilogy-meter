import axios from "axios";
import { schedule } from "@netlify/functions";

const hook = process.env.BUILD_HOOK;

const handler = schedule("0 0 * * 1", async () => {
  if (hook) {
    await axios.post(hook);
  }

  return {
    statusCode: 200,
  };
});

export { handler };
