import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import * as React from "react";
import Character from "../models/Character";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Avatar from "@mui/joy/Avatar";
import { Stack, Typography } from "@mui/joy";

type Props = {
  characters: Character[];
};

export default function CharacterSelect({ characters }: Props) {
  return (
    <Stack>
      <Typography level='title-sm'>I currently main...</Typography>
      <Select
        name="selected-characters"
        required
        multiple
        renderValue={(selected) => (
          <Box sx={{ display: "flex", gap: "0.25rem" }}>
            {selected
              .sort((a, b) => (a.value > b.value ? 1 : -1))
              .map((selectedOption) => (
                <Chip key={`${selectedOption.value}`} variant="soft" color="primary">
                  {`${selectedOption.value}`}
                </Chip>
              ))}
          </Box>
        )}
        sx={{
          width: "15rem"
        }}
        slotProps={{
          listbox: {
            sx: {
              width: "100%"
            },
          },
        }}
      >
        {characters.map((character) => (
          <Option key={character.name} value={character.name}>
            <React.Fragment>
              <ListItemDecorator>
                <Avatar size="sm" src={character.url} />
              </ListItemDecorator>
              {character.name} ({character.game})
            </React.Fragment>
          </Option>
        ))}
      </Select>
    </Stack>
  );
}
