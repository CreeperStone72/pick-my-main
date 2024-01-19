import Stack from "@mui/joy/Stack";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import Character from "../models/Character";
import { getArchetypesByNames } from "../data";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Tooltip from "@mui/joy/Tooltip";
import AspectRatio from "@mui/joy/AspectRatio";

type Props = {
    key: React.Key,
    potential: Character,
    index: number
}

export default function CharacterPanel({ potential, index }: Props) {
  return (
    <TabPanel key={potential.name} value={index}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="column" spacing={1}>
          <Typography level="h4">{potential.name}</Typography>
          <Typography level="title-sm">{potential.game}</Typography>
          <Typography level="body-md">
            <b>Fighting style.</b> {potential.fighting_style}
          </Typography>
          <Typography level="body-md">
            <b>Archetypes.</b>
          </Typography>
          <List>
            {getArchetypesByNames(potential.archetypes).map((archetype) => (
              <ListItem key={archetype.name}>
                <Tooltip title={archetype.description}>
                  <Typography level="body-md">
                    <b>{archetype.name}</b>
                  </Typography>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Stack>
        <AspectRatio ratio="3/4" sx={{ width: "33%" }}>
          <img src={potential.url} alt={potential.name} />
        </AspectRatio>
      </Stack>
    </TabPanel>
  );
}
