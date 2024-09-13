/** @jsxImportSource frog/jsx */
import { Box } from "../api/[[...routes]]/ui";
import { moxieStat } from "../utils/helpers";
export async function getMoxieImage(fid?: number) {

  let result = await moxieStat(Number(fid));

  return (
    <Box
      grow
      alignVertical="center"
      padding="10"
      paddingBottom="26"
      marginTop="2"
      marginBottom="2"
      fontWeight="700"
      position="relative"
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <img src="/Result.png" />
      </div>

      <div
        style={{
          position: "absolute",
          display: "flex",
          top: 365,
          left: 90,
          width: 500,
          height: 45,
          color: "white",
          fontSize: 44,
          fontFamily: "coinbase",
        }}
      >
        {`${result.LIFETIME} MOXIE`}
      </div>


      <div
        style={{
          position: "absolute",
          display: "flex",
          top: 500,
          left: 90,
          width: 500,
          height: 45,
          color: "white",
          fontSize: 44,
          fontFamily: "coinbase",
        }}
      >
        {`${result.WEEKLY} MOXIE`}
      </div>

      <div
        style={{
          position: "absolute",
          display: "flex",
          top: 635,
          left: 90,
          width: 500,
          height: 45,
          color: "white",
          fontSize: 44,
          fontFamily: "coinbase",
        }}
      >
        {`${result.TODAY} MOXIE`}
      </div>


    </Box>
  );
}
