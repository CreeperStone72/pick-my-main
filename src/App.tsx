import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import "./App.css";
import { Avatar, Button, Stack, Tab, TabList, Table, Tabs, Tooltip, Typography } from "@mui/joy";
import CharacterSelect from "./components/CharacterSelect";
import PlayerStats from "./components/PlayerStats";

import Archetype from "./models/Archetype";
import Character from "./models/Character";
import { Archetypes, Characters, getCharactersByNames } from "./data";
import MainPicker from "./models/MainPicker";
import CharacterPanel from "./components/CharacterPanel";

export default function App() {
  document.title = "Pick my Main";

  const [showResults, setShowResults] = React.useState(false);
  const [stats, setStats] = React.useState<[Archetype, number][]>([]);
  const [potentials, setPotentials] = React.useState<[Character, number][]>([]);
  const [defaultValue, setDefaultValue] = React.useState(0);
  const [showTable, setShowTable] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStats([]);
    setPotentials([]);
    setShowResults(false);
    setDefaultValue(0);

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const selectedCharacters = getCharactersByNames(formJson["selected-characters"]);
    const unselectedCharacters = Characters.filter((character) => !selectedCharacters.includes(character));
    const archetypeWeights = MainPicker.getArchetypeWeights(selectedCharacters);

    setStats(MainPicker.getOrderedWeights(archetypeWeights));
    setPotentials(MainPicker.getCharactersPotential(unselectedCharacters, archetypeWeights));
    setShowResults(true);
  }

  const alphabeticalSort = (a: Archetype|Character, b: Archetype|Character) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());

  const colors = ['darkgreen', 'limegreen', 'palegreen'];

  return (
    <main>
      <CssVarsProvider>
        {showTable ?
        <Sheet
          sx={{
            width: 1700,
            height: 500,
            mx: "auto", // margin left & right
            my: 4, // margin top & bottom
            px: 2, // padding left & right
            pb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
            overflow: 'scroll'
          }}
        >
          <Table stickyHeader>
            <thead>
              <tr>
                <th><Button onClick={() => setShowTable(false)}>Back</Button></th>
                {Archetypes.sort(alphabeticalSort).map(archetype => (
                  <th key={archetype.name}>
                    <Tooltip title={archetype.description}>
                      <Typography level='body-sm' sx={{textAlign: 'center'}}>{archetype.name}</Typography>
                    </Tooltip>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Characters.sort(alphabeticalSort).map(character => (
                <tr key={character.name}>
                  <td>
                    <Tooltip title={character.name}>
                      <Avatar src={character.url} />
                    </Tooltip>
                  </td>
                  {
                    Archetypes.sort(alphabeticalSort).map(archetype => (
                      <td
                        key={archetype.name}
                        style={{backgroundColor: character.archetypes.includes(archetype.name) ? colors[character.archetypes.findIndex(a => a === archetype.name)] : 'transparent'}}
                      >
                        {character.archetypes.includes(archetype.name) &&
                          <Tooltip title={`${character.name} - ${archetype.name}`}>
                            <Typography sx={{color: colors[character.archetypes.findIndex(a => a === archetype.name)]}}>x</Typography>
                          </Tooltip>}
                      </td>
                    ))
                  }
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet> :
        <>
          <Sheet
            sx={{
              width: 700,
              mx: "auto", // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
            }}
          >
            {
              showResults ?
              <Button onClick={() => window.location.reload()}>
                Next battle
              </Button> :
              <>
                <Typography level="h2" component="h1" sx={{ textAlign: "center" }}>
                  Pick my Main
                </Typography>
                <form onSubmit={onSubmit}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={5}
                  >
                    <CharacterSelect characters={Characters} />
                    <Button size="lg" type="submit">
                      Get ready for the next battle
                    </Button>
                  </Stack>
                </form>
                <Button onClick={() => setShowTable(true)} variant='plain' size='sm' sx={{width: '70%'}}>Wanna see which character fits which archetype instead ?</Button>
              </>
            }
            {showResults && (
              <Stack direction="column" alignItems="center" spacing={2}>
                <Typography level="title-lg">Your archetypes</Typography>
                <PlayerStats stats={stats} />
              </Stack>
            )}
          </Sheet>
          {showResults && (
            <Sheet
              sx={{
                width: 700,
                mx: "auto", // margin left & right
                my: 4, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
              }}
            >
              <Tabs defaultValue={defaultValue}>
                <TabList>
                  {potentials.map((potential) => (
                    <Tab key={potential[0].name}>{potential[0].name}</Tab>
                  ))}
                </TabList>
                {potentials.map((potential, index) => (
                  <CharacterPanel key={potential[0].name} potential={potential[0]} index={index} />
                ))}
              </Tabs>
            </Sheet>
          )}
        </>}
      </CssVarsProvider>
    </main>
  );
}
