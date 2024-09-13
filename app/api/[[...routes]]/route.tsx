/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { neynar } from "frog/hubs";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import {
  postLum0xTestFrameValidation,
} from "../../utils/helpers";

import { getMoxieImage } from "../../ui/moxie";

interface State {
  targetFid: number;
}


const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  hub: neynar({ apiKey: process.env.NEYNAR_API_KEY ?? "" }),
  title: "Moxie Stat",
  imageAspectRatio: "1:1",
  imageOptions: {
    height: 800,
    width: 800,
  },
  initialState: {
    targetFid: -1
  },
});

app.frame("/", async (c) => {
  
  return c.res({
    image: "/Default.png",
    intents: [
      <TextInput placeholder="Enter Fid" />,
      <Button action="/moxie-stat">Search</Button>
    ],
  });
});

app.frame("/moxie-stat", async (c) => {
  const fid = c.frameData?.fid;
  await postLum0xTestFrameValidation(Number(fid), "moxie-stat");

  const state : State = c.deriveState((previousState: any) => {
    previousState.targetFid = Number(c.inputText);
  }) as State;

  return c.res({
    image: await getMoxieImage(c.inputText == "" ? fid : state.targetFid),
    intents: [
      <TextInput placeholder="Enter Fid" />,
      <Button action="/moxie-stat">Search</Button>
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
