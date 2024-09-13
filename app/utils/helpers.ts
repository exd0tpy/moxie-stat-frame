import { Lum0x } from "lum0x-sdk";

Lum0x.init(process.env.LUM0X_API_KEY || "");

export async function postLum0xTestFrameValidation(fid: number, path: string) {
  fetch("https://testnetapi.lum0x.com/frame/validation", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      farcasterFid: fid,
      frameUrl: `${process.env.BASE_URL}/api/${path}`,
    }),
  });
}

export async function moxieStat(fid: number) {

  let LIFETIME, WEEKLY, TODAY;

  let res = await Lum0x.farcasterMoxie.getEarningStat({
      entity_type: "USER",
      entity_id: fid.toString(),
      timeframe: "LIFETIME"
  });
  let LIFETIME_STAT = res.data.FarcasterMoxieEarningStats.FarcasterMoxieEarningStat;

  res = await Lum0x.farcasterMoxie.getEarningStat({
      entity_type: "USER",
      entity_id: fid.toString(),
      timeframe: "WEEKLY"
  });
  let WEEKLY_STAT = res.data.FarcasterMoxieEarningStats.FarcasterMoxieEarningStat;

  res = await Lum0x.farcasterMoxie.getEarningStat({
      entity_type: "USER",
      entity_id: fid.toString(),
      timeframe: "TODAY"
  });

  let TODAY_STAT = res.data.FarcasterMoxieEarningStats.FarcasterMoxieEarningStat;

  if(LIFETIME_STAT == null) {
      LIFETIME = '0';
  } else {
      LIFETIME = LIFETIME_STAT[0].allEarningsAmount.toFixed(2);
  }

  if(WEEKLY_STAT == null) {
      WEEKLY = '0';
  } else {
      WEEKLY = WEEKLY_STAT[0].allEarningsAmount.toFixed(2);
  }

  if(TODAY_STAT == null) {
      TODAY = '0';
  } else {
      TODAY = TODAY_STAT[0].allEarningsAmount.toFixed(2);
  }

  return { LIFETIME, WEEKLY, TODAY }
}