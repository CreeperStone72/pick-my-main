import Grid from "@mui/joy/Grid";
import Archetype from "../models/Archetype";
import { Tooltip, Typography } from "@mui/joy";
import React from "react";

type Props = {
  stats: [Archetype, number][];
};

export default function PlayerStats({ stats }: Props) {
  const red = '#A80306';

  return (
    <Grid container columns={11} spacing={2} rowGap={2} sx={{width: '75%'}}>
      {stats.map((stat) => (
        <React.Fragment key={stat[0].name}>
          <Grid xs={3}>
            <Tooltip title={stat[0].description}>
              <Typography level="title-sm">{stat[0].name}</Typography>
            </Tooltip>
          </Grid>
          <Grid xs={2} sx={{
            background: stat[1] >= 0.25 ? red : `linear-gradient(to right, ${red} 0%, ${red} ${stat[1] * 100}%, transparent ${stat[1] * 100}%, transparent 100%)`,
            borderRadius: stat[1] <= 0.25 ? '2rem' : '2rem 0 0 2rem',
            borderRight: stat[1] > 0.25 ? '2px solid black' : ''
          }} />
          <Grid xs={2} sx={{
            background: stat[1] >= 0.5 ? red : `linear-gradient(to right, ${red} 0%, ${red} ${(stat[1] - 0.25) * 100}%, transparent ${(stat[1] - 0.25) * 100}%, transparent 100%)`,
            borderRadius: stat[1] <= 0.5 ? '0 2rem 2rem 0' : '0',
            borderRight: stat[1] > 0.5 ? '2px solid black' : ''
          }} />
          <Grid xs={2} sx={{
            background: stat[1] >= 0.75 ? red : `linear-gradient(to right, ${red} 0%, ${red} ${(stat[1] - 0.5) * 100}%, transparent ${(stat[1] - 0.5) * 100}%, transparent 100%)`,
            borderRadius: stat[1] <= 0.75 ? '0 2rem 2rem 0' : '0',
            borderRight: stat[1] > 0.75 ? '2px solid black' : ''
          }} />
          <Grid xs={2} sx={{
            background: stat[1] >= 1 ? red : `linear-gradient(to right, ${red} 0%, ${red} ${(stat[1] - 0.75) * 100}%, transparent ${(stat[1] - 0.75) * 100}%, transparent 100%)`,
            borderRadius: stat[1] <= 1 ? '0 2rem 2rem 0' : '0'
          }} />
        </React.Fragment>
      ))}
    </Grid>
  );
}
