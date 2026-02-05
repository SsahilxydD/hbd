"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Button,
  Line,
  Scene,
  Ambient,
  Confetti,
  Progress,
  Fragments,
  Envelopes,
  SoundToggle,
  Footer,
} from "@/components";
import { copy } from "@/data/copy";

type SceneName =
  | "hook"
  | "identity"
  | "reveal"
  | "question"
  | "celebration"
  | "calibration"
  | "memories"
  | "message"
  | "gift"
  | "envelopes"
  | "end";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<SceneName>("hook");
  const [soundOn, setSoundOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [calibrationLine, setCalibrationLine] = useState("");
  const [calibrationDone, setCalibrationDone] = useState(false);
  const [memoriesRevealed, setMemoriesRevealed] = useState(0);
  const [giftRevealed, setGiftRevealed] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusicRef.current = new Audio("/music.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.25;

    clickSoundRef.current = new Audio("https://cdn.freesound.org/previews/256/256116_3263906-lq.mp3");
    clickSoundRef.current.volume = 0.3;

    return () => {
      bgMusicRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const playClick = useCallback(() => {
    if (soundOn && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
    if (navigator.vibrate) navigator.vibrate(12);
  }, [soundOn]);

  const goTo = useCallback(
    (scene: SceneName) => {
      playClick();
      setCurrentScene(scene);
      // Light theme only for reveal scene
      if (scene === "reveal") {
        setTheme("light");
      } else if (scene === "question") {
        // Return to dark after reveal
        setTheme("dark");
      }
    },
    [playClick]
  );

  const toggleSound = useCallback(() => {
    const newState = !soundOn;
    setSoundOn(newState);
    if (bgMusicRef.current) {
      if (newState) {
        bgMusicRef.current.play().catch(() => {});
      } else {
        bgMusicRef.current.pause();
      }
    }
  }, [soundOn]);

  const handleCelebration = useCallback(() => {
    playClick();
    setShowConfetti(true);
    setCurrentScene("celebration");
    setTimeout(() => setShowConfetti(false), 2500);
  }, [playClick]);

  useEffect(() => {
    if (currentScene !== "calibration") return;

    setCalibrationProgress(0);
    setCalibrationLine("");
    setCalibrationDone(false);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= copy.calibration.lines.length) {
        clearInterval(interval);
        setCalibrationDone(true);
        return;
      }
      setCalibrationProgress(((i + 1) / copy.calibration.lines.length) * 100);
      setCalibrationLine(copy.calibration.lines[i]);
      i++;
    }, 1400);

    return () => clearInterval(interval);
  }, [currentScene]);

  const handleMemoryReveal = useCallback((count: number) => {
    setMemoriesRevealed(count);
  }, []);

  const handleGiftReveal = useCallback(() => {
    playClick();
    setGiftRevealed(true);
    setTimeout(() => goTo("envelopes"), 2400);
  }, [playClick, goTo]);

  const showSoundToggle = currentScene !== "hook" && currentScene !== "identity";

  return (
    <>
      <Ambient />
      <SoundToggle isOn={soundOn} onToggle={toggleSound} visible={showSoundToggle} />
      <Confetti active={showConfetti} />

      {/* HOOK */}
      <Scene isActive={currentScene === "hook"}>
        <Line delay={0.6}>{copy.hook.line1}</Line>
        <Line delay={2.2}>{copy.hook.line2}</Line>
        <Line delay={4.2}>{copy.hook.line3}</Line>
        <Button onClick={() => goTo("identity")} delay={5.2}>
          {copy.hook.button}
        </Button>
      </Scene>

      {/* IDENTITY */}
      <Scene isActive={currentScene === "identity"}>
        <Line delay={0.4}>{copy.identity.line1}</Line>
        <Line delay={2}>{copy.identity.line2}</Line>
        <Button onClick={() => goTo("reveal")} delay={3.2}>
          {copy.identity.button}
        </Button>
      </Scene>

      {/* REVEAL */}
      <Scene isActive={currentScene === "reveal"}>
        <Line variant="headline" delay={0.6}>
          {copy.reveal.headline.replace("{name}", copy.name)}
        </Line>
        <Line delay={2.4}>{copy.reveal.line1}</Line>
        <Line delay={3.8}>{copy.reveal.line2}</Line>
        <Button onClick={() => goTo("question")} delay={5}>
          {copy.reveal.button}
        </Button>
      </Scene>

      {/* QUESTION */}
      <Scene isActive={currentScene === "question"}>
        <Line delay={0.4}>{copy.question.line1}</Line>
        <Line delay={1.8}>{copy.question.line2}</Line>
        <Line delay={3.2}>{copy.question.line3}</Line>
        <Line variant="headline" delay={4.8}>
          {copy.question.headline}
        </Line>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
          <Button variant="yes" onClick={handleCelebration} delay={5.8}>
            {copy.question.yes}
          </Button>
          <Button variant="no" disabled delay={5.8}>
            {copy.question.no}
          </Button>
        </div>
      </Scene>

      {/* CELEBRATION */}
      <Scene isActive={currentScene === "celebration"}>
        <Line delay={0.6}>{copy.celebration.line1}</Line>
        <Line delay={2.4}>{copy.celebration.line2}</Line>
        <Button onClick={() => goTo("calibration")} delay={3.6}>
          {copy.celebration.button}
        </Button>
      </Scene>

      {/* CALIBRATION */}
      <Scene isActive={currentScene === "calibration"}>
        <Line delay={0}>{copy.calibration.intro}</Line>
        <Progress value={calibrationProgress} />
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", minHeight: "1.4em" }}>{calibrationLine}</p>
        {calibrationDone && (
          <Button onClick={() => goTo("memories")} delay={0.4}>
            {copy.calibration.button}
          </Button>
        )}
      </Scene>

      {/* MEMORIES */}
      <Scene isActive={currentScene === "memories"}>
        <Line delay={0}>{copy.memories.intro}</Line>
        <div style={{ margin: "24px 0" }}>
          <Fragments items={copy.memories.items} onReveal={handleMemoryReveal} />
        </div>
        {memoriesRevealed >= 2 && (
          <>
            <Line delay={0.6}>{copy.memories.after}</Line>
            <Button onClick={() => goTo("message")} delay={1.4}>
              {copy.memories.button}
            </Button>
          </>
        )}
      </Scene>

      {/* MESSAGE */}
      <Scene isActive={currentScene === "message"}>
        <Line delay={0.4}>{copy.message.line1}</Line>
        <Line delay={2}>{copy.message.line2}</Line>
        <div style={{ 
          margin: "18px auto", 
          width: "auto",
          height: "42vh",
          aspectRatio: "9/16",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}>
          <iframe
            src="https://www.youtube.com/embed/UK39LkwRmYk?autoplay=1&controls=1&playsinline=1"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{ border: "none" }}
          />
        </div>
        <div style={{ marginTop: 14 }}>
          <Button onClick={() => goTo("gift")} delay={3.6}>
            {copy.message.continue}
          </Button>
        </div>
      </Scene>

      {/* GIFT */}
      <Scene isActive={currentScene === "gift"}>
        <Line delay={0.5}>{copy.gift.line1}</Line>
        <Line delay={2.2}>{copy.gift.line2}</Line>
        <Button onClick={handleGiftReveal} delay={3.6}>
          {copy.gift.button}
        </Button>
        {giftRevealed && <Line delay={0.4}>{copy.gift.hint}</Line>}
      </Scene>

      {/* ENVELOPES */}
      <Scene isActive={currentScene === "envelopes"}>
        <Line delay={0}>{copy.envelopes.intro}</Line>
        <div style={{ margin: "18px 0" }}>
          <Envelopes items={copy.envelopes.items} />
        </div>
        <Button onClick={() => goTo("end")} delay={0.6}>
          {copy.envelopes.button}
        </Button>
      </Scene>

      {/* END */}
      <Scene isActive={currentScene === "end"}>
        <Line variant="headline" delay={0.6}>
          {copy.end.headline}
        </Line>
        <Line delay={2.4}>{copy.end.line}</Line>
      </Scene>

      <Footer visible={currentScene === "end"} text={copy.end.footer} />
    </>
  );
}
