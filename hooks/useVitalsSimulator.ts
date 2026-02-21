import { useState, useEffect, useRef, useCallback } from "react";
import {
  VitalsSnapshot,
  ScenarioType,
  generateNextVitals,
  generateCriticalVitals,
  normalBaseline,
  pickRandomScenario,
} from "../utils/vitalsGenerator";

const HISTORY_LENGTH = 10;
const TICK_MS = 3500;
const SCENARIO_INTERVAL_MIN = 30000;
const SCENARIO_INTERVAL_MAX = 60000;
const SCENARIO_DURATION = 20000;

// Deterministic initial state — avoids SSR/client mismatch
const INITIAL_VITALS: VitalsSnapshot = {
  heartRate: 72,
  systolicBP: 120,
  diastolicBP: 76,
  spO2: 97,
  temperature: 98.4,
  respiratoryRate: 16,
  timestamp: 0,
};

export function useVitalsSimulator() {
  const [current, setCurrent] = useState<VitalsSnapshot>(INITIAL_VITALS);
  const [history, setHistory] = useState<VitalsSnapshot[]>([]);
  const [playing, setPlaying] = useState(true);
  const [scenario, setScenario] = useState<ScenarioType>("none");
  const [mounted, setMounted] = useState(false);
  const scenarioRef = useRef<ScenarioType>("none");
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scenarioTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scenarioEndRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize with random baseline on client only
  useEffect(() => {
    const baseline = normalBaseline();
    setCurrent(baseline);
    setHistory([baseline]);
    setMounted(true);
  }, []);

  // Keep ref in sync
  useEffect(() => {
    scenarioRef.current = scenario;
  }, [scenario]);

  const tick = useCallback(() => {
    setCurrent((prev) => {
      const next = generateNextVitals(prev, scenarioRef.current);
      setHistory((h) => [...h.slice(-(HISTORY_LENGTH - 1)), next]);
      return next;
    });
  }, []);

  const scheduleScenario = useCallback(() => {
    const delay =
      SCENARIO_INTERVAL_MIN +
      Math.random() * (SCENARIO_INTERVAL_MAX - SCENARIO_INTERVAL_MIN);
    scenarioTimerRef.current = setTimeout(() => {
      const s = pickRandomScenario();
      setScenario(s);
      scenarioEndRef.current = setTimeout(() => {
        setScenario("none");
        scheduleScenario();
      }, SCENARIO_DURATION);
    }, delay);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (playing) {
      tickRef.current = setInterval(tick, TICK_MS);
      scheduleScenario();
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (scenarioTimerRef.current) clearTimeout(scenarioTimerRef.current);
      if (scenarioEndRef.current) clearTimeout(scenarioEndRef.current);
    };
  }, [mounted, playing, tick, scheduleScenario]);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  const reset = useCallback(() => {
    setScenario("none");
    if (scenarioTimerRef.current) clearTimeout(scenarioTimerRef.current);
    if (scenarioEndRef.current) clearTimeout(scenarioEndRef.current);
    const baseline = normalBaseline();
    setCurrent(baseline);
    setHistory([baseline]);
  }, []);

  const triggerCritical = useCallback(() => {
    if (scenarioTimerRef.current) clearTimeout(scenarioTimerRef.current);
    if (scenarioEndRef.current) clearTimeout(scenarioEndRef.current);
    const critical = generateCriticalVitals();
    setCurrent(critical);
    setHistory((h) => [...h.slice(-(HISTORY_LENGTH - 1)), critical]);
    setScenario("cardiac");
    scenarioEndRef.current = setTimeout(() => {
      setScenario("none");
      scheduleScenario();
    }, SCENARIO_DURATION);
  }, [scheduleScenario]);

  return {
    current,
    history,
    playing,
    scenario,
    togglePlay,
    reset,
    triggerCritical,
  };
}
