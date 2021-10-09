import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Words from "./Words";
import { TextField } from "@mui/material";
import stories from "../stories/stories.json";

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
      setGametitle(stories[storynum]["title"]);
      setGamestring(stories[storynum]["body"]);
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
