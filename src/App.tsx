import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { getUsdPerMatic } from "./common/univ2";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useSigner } from "wagmi";

import { useModal } from "connectkit";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import { BigNumber, ethers } from "ethers";

import ERC20Abi from "./abi/erc20.json";

// Matic network, payment address accepts straight up matic
const PAYMENT_ADDRESS = "0xD5184c0d23f7551DB7c8c4a3a3c5F1685059A09c";
const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const DAI_ADDRESS = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";

const BEPSI_ICONS = ["🟢", "🔴", "🌸", "🍒", "🟣", "🟠"];

function App() {
  const { data: signer } = useSigner();
  const { setOpen } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const [isBuying, setIsBuying] = useState(false);
  const [selectedBepsi, setSelectedBepsi] = useState(1);
  const [usdPerMatic, setUsdPerMatic] = useState<null | number>(null);
  const [maticToPay, setMaticToPay] = useState<null | BigNumber>(null);

  const payWithMatic = useCallback(async () => {
    if (signer === null || signer === undefined) {
      setOpen(true);
      return;
    }
    if (maticToPay === null) {
      enqueueSnackbar("Retrieving MATIC price, please be patient", {
        variant: "info",
      });
      return;
    }

    const bal = await signer.getBalance();
    if (bal.lt(maticToPay)) {
      enqueueSnackbar("Not enough funds...", { variant: "warning" });
      return;
    }

    setIsBuying(true);
    enqueueSnackbar("Buying a BEPSI...", { variant: "info" });
    try {
      const tx = await signer.sendTransaction({
        to: PAYMENT_ADDRESS,
        value: maticToPay,
        data: "0x0" + selectedBepsi.toString(16),
      });
      await tx.wait();
      enqueueSnackbar("BEPSI payment successful", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("BEPSI payment failed", { variant: "error" });
    }
    setIsBuying(false);
  }, [enqueueSnackbar, setOpen, selectedBepsi, signer, maticToPay]);

  const payWithStablecoin = useCallback(
    async (stablecoinAddr: string, stablecoinDecimals: number) => {
      if (signer === null || signer === undefined) {
        setOpen(true);
        return;
      }
      const stablecoin = new ethers.Contract(stablecoinAddr, ERC20Abi, signer);
      const amount = ethers.utils
        .parseUnits("1", stablecoinDecimals)
        .add(selectedBepsi);

      const bal = await stablecoin.balanceOf(await signer.getAddress());
      if (bal.lt(amount)) {
        enqueueSnackbar("Not enough funds...", { variant: "warning" });
        return;
      }

      setIsBuying(true);
      enqueueSnackbar("Buying a BEPSI...", { variant: "info" });
      try {
        const tx = await stablecoin.transfer(PAYMENT_ADDRESS, amount);
        await tx.wait();
        enqueueSnackbar("BEPSI payment successful", { variant: "success" });
      } catch (e) {
        enqueueSnackbar("BEPSI payment failed", { variant: "error" });
      }
      setIsBuying(false);
    },
    [signer, selectedBepsi, setOpen, enqueueSnackbar]
  );

  useEffect(() => {
    if (usdPerMatic === null) {
      getUsdPerMatic().then((x) => setUsdPerMatic(x));
    }

    if (usdPerMatic != null) {
      setMaticToPay(ethers.utils.parseUnits((1.0 / usdPerMatic).toString()));
    }
  }, [usdPerMatic]);

  return (
    <>
      <ResponsiveAppBar />

      <Grid container marginTop={2}>
        <Grid item xs={1} md={3} />
        <Grid item xs={10} md={6}>
          <Typography variant="h5">1. Select drink</Typography>
          <FormControl>
            <RadioGroup
              defaultValue={1}
              onChange={(e) => setSelectedBepsi(parseInt(e.target.value))}
              row
              name="position"
            >
              {BEPSI_ICONS.map((x, idx) => {
                return (
                  <FormControlLabel
                    value={idx + 1} // Yes I know...
                    control={<Radio />}
                    label={x}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1} md={3} />
      </Grid>

      <Grid container marginTop={2}>
        <Grid item xs={1} md={3} />
        <Grid item xs={10} md={6}>
          <Typography variant="h5">2. Pay</Typography>
          <br />
          <Button
            disabled={isBuying}
            onClick={payWithMatic}
            variant="contained"
            style={{ backgroundColor: "purple" }}
            fullWidth
          >
            Pay with Matic (~
            {maticToPay === null
              ? "..."
              : ethers.utils.formatUnits(maticToPay).slice(0, 6)}{" "}
            Matic)
          </Button>
          <Button
            disabled={isBuying}
            onClick={() => payWithStablecoin(DAI_ADDRESS, 18)}
            style={{ backgroundColor: "orange", marginTop: "10px" }}
            variant="contained"
            fullWidth
          >
            Pay with DAI (~1 DAI)
          </Button>
          <Button
            disabled={isBuying}
            onClick={() => payWithStablecoin(USDC_ADDRESS, 6)}
            style={{ marginTop: "10px" }}
            variant="contained"
            fullWidth
          >
            Pay with USDC (~1 USDC)
          </Button>
          <Button
            disabled={isBuying}
            onClick={() => payWithStablecoin(USDT_ADDRESS, 6)}
            style={{ backgroundColor: "green", marginTop: "10px" }}
            variant="contained"
            fullWidth
          >
            Pay with USDT (~1 USDT)
          </Button>
        </Grid>
        <Grid item xs={1} md={3} />
      </Grid>
    </>
  );
}

export default App;
