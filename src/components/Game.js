import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Words from "./Words";
import { TextField } from "@mui/material";

const Game = ({
  counts,
  setMessages,
  setCounts,
  sorted,
  messages,
  setSorted,
}) => {
  const translation = {
    "&noun-person-place-thing&": "Noun (person, place, thing)",
    "&noun-plural&": "Noun (plural)",
    "&noun&": "Noun",
    "&noun-person&": "Noun (person)",
    "&noun-place&": "Noun (place)",
    "&noun-thing&": "Noun (thing)",
    "&noun-proper&": "Proper noun (Name or Place)",
    "&verb-past&": "Verb (past tense)",
    "&verb-present&": "Verb (present tense)",
    "&verb-future&": "Verb (future tense)",
    "&verb-ing&": "Verb (-ing)",
    "&adverb&": "Adverb",
    "&adjective&": "Adjective",
  };
  const stories = [
    [
      "The Two Time",
      `Let’s talk about me, let's talk about 6 foot 8 frame the 37 inch vertical leap the &noun& that drips down my back a.k.a the &adjective& &noun& the google prototype &noun& from built-in lcd led 1080p 3D Sony technology the Ethiopian &adjective& &noun& a.k.a the slick daddy. Let's talk about the &noun& right behind me that go 40 deep into the wall that houses the other 95% of my &noun-plural& , the awards, certificates all claiming first place right? Let me give you a little inside glimpse of the hotshot video &verb-ing& lifestyle of the two time international &verb-ing& superstar because that's what this channel about. You're looking at the face of Twitch! &noun-proper& !`,
    ],
    [
      "Taco Stand",
      `Today I went to my favorite Taco Stand called the &adjective& &noun& . Unlike most food stands, they cook and prepare the food in a &Something_you_would_ride_in& while you &verb& . The best thing on the menu is the &Color& &noun& . Instead of ground beef they fill the taco with &Food_(plural)& , cheese, and top it off with a salsa made from &Food_(plural)& . If that doesn't make your mouth water, then it's just like &Person& always says: &Saying_(A_Phrase)& !`,
    ],
    [
      "Pizza Party",
      `I just got back from a pizza party with &Person& . Can you believe we got to eat &adjective& pizza in &A_Place& ?! Everyone got to choose their own toppings. I made ' &Food& and &Things_(plural)& ' pizza, which is my favorite! They even stuffed the crust with &Things_(plural)& . How &Feeling& ! If that wasn't good enough already, &A_Celebrity& was there singing &Song_Title& . I was so inspired by the music, I had to get up out of my seat and &Verb& .`,
    ],
    [
      "Weasely Little Liar",
      "What a &Adjective& liar, dude. What a &Adjective& , weaselly little, liar, dude. What a &Adjective& , weaselly little LIAR, dude. Holy shit, dude. Holy &Adjective& shit, dude. Literally lying, STILL LYING...",
    ],
    [
      "Day at the zoo",
      `Today I went to the zoo. I saw a(n)
      &adjective& 
      &noun& jumping up and down in its tree.
      He &verb-past& &adverb& 
      through the large tunnel that led to its &adjective& 
      &noun& . I got some &Noun_(plural)& and passed
      them through the cage to a gigantic gray &noun& 
      towering above my head. Feeding that animal made
      me hungry. I went to get a &adjective& scoop
      of &Food& . It filled my stomach. Afterwards I had to
      &Verb& &adverb& to catch our bus.
      When I got home I &verb-past& my
      mom for a &adjective& day at the zoo. `,
    ],
    [
      "New Toy",
      `There is a new toy on the market that has everyone saying
    &Exclamation& ! It is called the &Sound& 
    &Adjective& &Noun& box, and will be in stores in
    &A_month& . The &Sound& 
    &Adjective& &Noun& box is a new gadget that
    lets you do just about anything!
    It &Verb& s, it &Verb& s, and it even serves
    &A_beverage& ! It is easy to operate and requires no
    instructions!
    You can also have it custom made any size up to
    &Number& inches or a &Color& to glow in the
    dark at no extra charge! The original product is pocket-sized and
    &Color& . There are &Number& jacks on the
    product for 6V DC power and for upgrades and add-ons. You can add
    head-phones, &Noun_(plural)& monitors, &Noun_(plural)& , and more! It’s possible to use them all at the same time! `,
    ],
  ];
  const [gameMode, setGameMode] = useState("");
  const [gametitle, setGametitle] = useState("");
  const [gamestring, setGamestring] = useState("");
  const [words, setWords] = useState([]);
  const [displayWord, setDisplayWord] = useState("");
  const [grammar, setGrammar] = useState([]);
  const [title, setTitle] = useState("");
  const [grammarCounter, setGrammarCounter] = useState(0);
  const [gameState, setGameState] = useState(0);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (gameState === 0) {
      setDisplayWord("");
      setTitle("");
      setWords([]);
      setGrammar([]);
      setGrammarCounter(0);
      let storynum = Math.floor(Math.random() * stories.length);
      setGametitle(stories[storynum][0]);
      setGamestring(stories[storynum][1]);
    }
    if (gameState === 3) {
      setDisplayWord("TwitchLibs READY!");
    }
    if (gameState === 4) {
      let count = 0;
      setDisplayWord(
        gamestring
          .split(" ")
          .map((word) => {
            if (word.startsWith("&") && word.endsWith("&")) {
              return words[count++];
            } else return word;
          })
          .join(" ")
      );
    }
  }, [gameState]);

  const handleStart = (mode) => {
    setTitle(gametitle);
    setGameMode(mode);
    setGrammar(
      gamestring
        .split(" ")
        .map((word) => {
          if (word.startsWith("&") && word.endsWith("&"))
            return word in translation
              ? translation[word]
              : word.replaceAll("&", "").replaceAll("_", " ");
          else return " ";
        })
        .filter((word) => word !== " ")
    );
    setGameState(1);
  };

  const handleNext = (e) => {
    if (gameState === 1) {
      setDisplayWord(grammar[grammarCounter]);
      setGrammarCounter(grammarCounter + 1);
      setGameState(2);
    } else if (gameState === 2 && grammarCounter < grammar.length) {
      if (gameMode === "chat") {
        setWords((old) => [...old, sorted.length > 0 ? sorted[0][0] : ""]);
      } else if (gameMode === "streamer") {
        setWords((old) => [...old, userInput]);
      }
      setDisplayWord(grammar[grammarCounter]);
      setGrammarCounter(grammarCounter + 1);
    }
    if (words.length === grammar.length - 1) {
      if (gameMode === "chat") {
        setWords((old) => [...old, sorted.length > 0 ? sorted[0][0] : ""]);
      } else if (gameMode === "streamer") {
        setWords((old) => [...old, userInput]);
      }
      setGameState(3);
    }
    if (gameState === 3) {
      setGameState(4);
    }
    if (gameState === 4) {
      setGameState(5);
    }
    if (gameState === 5) {
      setDisplayWord("");
      setTitle("");
      setWords([]);
      setGrammar([]);
      setGrammarCounter(0);
      setGameState(0);
    }

    setUserInput("");
    setMessages([]);
    setCounts({});
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      handleNext(e);
      setUserInput("");
    } else {
      setUserInput(e.target.value);
    }
  };

  return (
    <div className="GameDiv">
      <Button
        className="BackButton"
        variant="contained"
        href="/start"
        style={{
          backgroundColor: "#2b2929",
        }}
      >
        Back
      </Button>
      <Button
        onClick={() => {
          console.log(sorted);
        }}
      >
        test{" "}
      </Button>
      {gameState === 0 ? (
        <div className="Menu">
          <Button variant="contained" onClick={() => handleStart("chat")}>
            Chat plays
          </Button>
          <Button variant="contained" onClick={() => handleStart("streamer")}>
            Streamer plays
          </Button>
        </div>
      ) : null}
      {gameState >= 1 ? (
        <div className="Game">
          <div className="Title">{title}</div>
          <div className="Word">{displayWord}</div>
          <div className="Guesses">
            <Button variant="contained" onClick={(e) => handleNext(e)}>
              {gameState === 1 ? "Start" : gameState === 5 ? "Restart" : "Next"}
            </Button>
            {gameMode === "streamer" && gameState === 2 ? (
              <TextField
                className="UserInput"
                value={userInput}
                id="userInput"
                variant="filled"
                onInput={(e) => handleInput(e)}
              ></TextField>
            ) : null}
            {gameState === 2 ? (
              <Words
                sorted={sorted}
                messages={messages}
                setSorted={setSorted}
                counts={counts}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Game;
