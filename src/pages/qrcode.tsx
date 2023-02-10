import { Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { getUsdPerMatic } from "../common/univ2";
import {
  PAYMENT_ADDRESS,
  USDC_ADDRESS,
  USDT_ADDRESS,
  DAI_ADDRESS,
} from "../common/constants";

// 1 to 6
const randomCan = () => Math.floor(Math.random() * 6) + 1;

function QRCodePage() {
  const [usdPerMatic, setUsdPerMatic] = useState<null | number>(null);

  useEffect(() => {
    if (usdPerMatic === null) {
      getUsdPerMatic().then((x) => setUsdPerMatic(x));
    }
  }, [usdPerMatic]);

  return (
    <>
      <ResponsiveAppBar />

      <Grid container marginTop={2} marginBottom={2}>
        <Grid item xs={1} md={3} />
        <Grid item xs={10} md={6}>
          <Alert severity="info">Make sure you're on the Polygon Network</Alert>
          <Typography variant="h5">Matic</Typography>
          {usdPerMatic === null ? (
            <CircularProgress />
          ) : (
            <QRCode
              value={`ethereum:${PAYMENT_ADDRESS}?value=${(
                (1 / usdPerMatic) *
                1.05
              ).toString()}e18`}
            />
          )}
          <Typography variant="h5">DAI</Typography>
          <QRCode
            value={`ethereum:${DAI_ADDRESS}/transfer?address=${PAYMENT_ADDRESS}&uint256=100000000000000000${randomCan().toString()}`}
          />
          <Typography variant="h5">USDC</Typography>
          <QRCode
            value={`ethereum:${USDC_ADDRESS}/transfer?address=${PAYMENT_ADDRESS}&uint256=100000${randomCan().toString()}`}
          />
          <Typography variant="h5">USDT</Typography>
          <QRCode
            value={`ethereum:${USDT_ADDRESS}/transfer?address=${PAYMENT_ADDRESS}&uint256=100000${randomCan().toString()}`}
          />
        </Grid>
        <Grid item xs={1} md={3} />
      </Grid>
    </>
  );
}

export default QRCodePage;
