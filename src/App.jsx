import { useState, useEffect, useCallback } from "react";

// ─── CURRICULUM DATA ────────────────────────────────────────────────────────
const CURRICULUM = [
  {
    id: "unit1",
    title: "Algorithms & Programming",
    color: "#6C63FF",
    icon: "⚙️",
    lessons: [
      {
        id: "u1l1",
        title: "Boolean Logic",
        apConcept: "AAP-2.H",
        description: "AND, OR, NOT operators and truth values",
        game: "boolean",
        unlocked: true,
        levels: 8,
      },
      {
        id: "u1l2",
        title: "Conditionals",
        apConcept: "AAP-2.G",
        description: "IF / ELSE decision trees",
        game: "conditionals_maze",
        unlocked: false,
        levels: 6,
        comingSoon: true,
      },
      {
        id: "u1l3",
        title: "Loops",
        apConcept: "AAP-2.J",
        description: "REPEAT and iteration counting",
        game: "loop_counter",
        unlocked: false,
        levels: 6,
        comingSoon: true,
      },
    ],
  },
  {
    id: "unit2",
    title: "Data & Analysis",
    color: "#F59E0B",
    icon: "📊",
    lessons: [
      {
        id: "u2l1",
        title: "Binary Numbers",
        apConcept: "DAT-1.C",
        description: "Convert between binary and decimal",
        game: "binary_decoder",
        unlocked: false,
        levels: 8,
        comingSoon: true,
      },
      {
        id: "u2l2",
        title: "Data Types",
        apConcept: "DAT-1.A",
        description: "Sort values by type: int, string, bool, float",
        game: "data_sorter",
        unlocked: false,
        levels: 5,
        comingSoon: true,
      },
    ],
  },
  {
    id: "unit3",
    title: "Networks & the Internet",
    color: "#10B981",
    icon: "🌐",
    lessons: [
      {
        id: "u3l1",
        title: "Packet Routing",
        apConcept: "CSN-1.B",
        description: "Route packets through a live network",
        game: "packet_router",
        unlocked: false,
        levels: 6,
        comingSoon: true,
      },
    ],
  },
  {
    id: "unit4",
    title: "Cybersecurity",
    color: "#EF4444",
    icon: "🔐",
    lessons: [
      {
        id: "u4l1",
        title: "Caesar Cipher",
        apConcept: "IOC-2.B",
        description: "Encrypt and decrypt shift ciphers",
        game: "cipher",
        unlocked: false,
        levels: 5,
        comingSoon: true,
      },
    ],
  },
];

// ─── BOOLEAN GAME ENGINE ─────────────────────────────────────────────────────
const SHAPES = ["circle", "square", "triangle", "star"];
const COLORS = ["red", "blue", "green", "yellow", "purple"];
const SIZES = ["small", "large"];

function generateShapes(count = 12) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: SIZES[Math.floor(Math.random() * SIZES.length)],
  }));
}

function evaluateExpression(expr, shape) {
  if (expr.type === "atom") {
    if (expr.attr === "color") return shape.color === expr.value;
    if (expr.attr === "shape") return shape.shape === expr.value;
    if (expr.attr === "size") return shape.size === expr.value;
  }
  if (expr.type === "NOT") return !evaluateExpression(expr.operand, shape);
  if (expr.type === "AND") return evaluateExpression(expr.left, shape) && evaluateExpression(expr.right, shape);
  if (expr.type === "OR") return evaluateExpression(expr.left, shape) || evaluateExpression(expr.right, shape);
  if (expr.type === "XOR") return evaluateExpression(expr.left, shape) !== evaluateExpression(expr.right, shape);
  return false;
}

function exprToString(expr) {
  if (expr.type === "atom") return `${expr.attr} = "${expr.value}"`;
  if (expr.type === "NOT") return `NOT (${exprToString(expr.operand)})`;
  if (expr.type === "AND") return `(${exprToString(expr.left)}) AND (${exprToString(expr.right)})`;
  if (expr.type === "OR") return `(${exprToString(expr.left)}) OR (${exprToString(expr.right)})`;
  if (expr.type === "XOR") return `(${exprToString(expr.left)}) XOR (${exprToString(expr.right)})`;
}

function atom(attr, value) { return { type: "atom", attr, value }; }
function AND(left, right) { return { type: "AND", left, right }; }
function OR(left, right) { return { type: "OR", left, right }; }
function NOT(operand) { return { type: "NOT", operand }; }
function XOR(left, right) { return { type: "XOR", left, right }; }

function randomAtom(allowSize = false) {
  const attrs = allowSize ? ["color", "shape", "size"] : ["color", "shape"];
  const attr = attrs[Math.floor(Math.random() * attrs.length)];
  const pool = attr === "color" ? COLORS : attr === "shape" ? SHAPES : SIZES;
  return atom(attr, pool[Math.floor(Math.random() * pool.length)]);
}

function generateExpression(level) {
  if (level <= 2) return randomAtom();
  if (level === 3) return AND(randomAtom(), randomAtom());
  if (level === 4) return OR(randomAtom(), randomAtom());
  if (level === 5) return NOT(randomAtom());
  if (level === 6) return AND(OR(randomAtom(), randomAtom()), randomAtom(true));
  if (level === 7) return OR(NOT(randomAtom()), randomAtom(true));
  return XOR(AND(randomAtom(), randomAtom(true)), NOT(randomAtom()));
}

function generateBooleanLevel(level) {
  let shapes, expr, answers;
  let attempts = 0;
  do {
    shapes = generateShapes(12);
    expr = generateExpression(level);
    answers = shapes.filter(s => evaluateExpression(expr, s)).map(s => s.id);
    attempts++;
  } while ((answers.length === 0 || answers.length === 12) && attempts < 20);
  return { shapes, expr, answers };
}

// ─── SHAPE RENDERER ──────────────────────────────────────────────────────────
const COLOR_MAP = {
  red: "#EF4444", blue: "#3B82F6", green: "#22C55E",
  yellow: "#EAB308", purple: "#A855F7",
};

function ShapeIcon({ shape, color, size, selected, correct, revealed, onClick }) {
  const px = size === "small" ? 28 : 40;
  const c = COLOR_MAP[color] || color;
  const border = revealed
    ? correct ? "3px solid #22C55E" : selected ? "3px solid #EF4444" : "3px solid transparent"
    : selected ? "3px solid #6C63FF" : "3px solid transparent";

  const svgShape = () => {
    if (shape === "circle") return <circle cx="24" cy="24" r={px / 2} fill={c} />;
    if (shape === "square") return <rect x={24 - px / 2} y={24 - px / 2} width={px} height={px} fill={c} rx="3" />;
    if (shape === "triangle") return <polygon points={`24,${24 - px / 2} ${24 - px / 2},${24 + px / 2} ${24 + px / 2},${24 + px / 2}`} fill={c} />;
    if (shape === "star") {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? px / 2 : px / 4;
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        pts.push(`${24 + r * Math.cos(angle)},${24 + r * Math.sin(angle)}`);
      }
      return <polygon points={pts.join(" ")} fill={c} />;
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: 64, height: 64, display: "flex", alignItems: "center",
        justifyContent: "center", cursor: "pointer", borderRadius: 10,
        border, background: selected && !revealed ? "#EEF2FF" : "#F8FAFC",
        transition: "all 0.15s", transform: selected && !revealed ? "scale(1.06)" : "scale(1)",
        boxShadow: selected && !revealed ? "0 0 0 2px #6C63FF33" : "none",
      }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48">{svgShape()}</svg>
    </div>
  );
}

// ─── BOOLEAN GAME ────────────────────────────────────────────────────────────
function BooleanGame({ onBack, progress, setProgress }) {
  const levelKey = "u1l1";
  const startLevel = (progress[levelKey] || 0) + 1;
  const [level, setLevel] = useState(Math.min(startLevel, 8));
  const [gameData, setGameData] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [complete, setComplete] = useState(false);

  const loadLevel = useCallback((lvl) => {
    const data = generateBooleanLevel(lvl);
    setGameData(data);
    setSelected(new Set());
    setRevealed(false);
    setFeedback(null);
  }, []);

  useEffect(() => { loadLevel(level); }, [level, loadLevel]);

  const toggle = (id) => {
    if (revealed) return;
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const check = () => {
    if (!gameData) return;
    const correct = new Set(gameData.answers);
    const isRight = [...selected].every(id => correct.has(id)) &&
      [...correct].every(id => selected.has(id));
    setRevealed(true);
    if (isRight) {
      const pts = 100 + streak * 25;
      setScore(s => s + pts);
      setStreak(s => s + 1);
      setFeedback({ ok: true, msg: streak >= 2 ? `🔥 ${streak + 1}× streak! +${pts}pts` : `✓ Correct! +${pts}pts` });
    } else {
      setStreak(0);
      const missed = gameData.answers.filter(id => !selected.has(id)).length;
      const extra = [...selected].filter(id => !correct.has(id)).length;
      setFeedback({ ok: false, msg: `✗ ${missed} missed, ${extra} extra. Check the highlighted shapes.` });
    }
  };

  const next = () => {
    if (level >= 8) {
      setComplete(true);
      setProgress(prev => ({ ...prev, [levelKey]: 8 }));
    } else {
      const nl = level + 1;
      setLevel(nl);
      setProgress(prev => ({ ...prev, [levelKey]: nl - 1 }));
    }
  };

  if (complete) return (
    <div style={{ textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 64 }}>🎉</div>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, color: "#1E1B4B", marginBottom: 8 }}>Boolean Logic Mastered!</h2>
      <p style={{ color: "#6B7280", marginBottom: 4 }}>Final score: <strong>{score} pts</strong></p>
      <p style={{ color: "#6B7280", marginBottom: 32 }}>You worked through AND, OR, NOT, XOR and nested expressions.</p>
      <button onClick={onBack} style={btnStyle("#6C63FF")}>← Back to Course Map</button>
    </div>
  );

  const levelLabels = ["", "Single Attribute", "Single Attribute", "AND", "OR", "NOT", "AND + OR", "NOT + OR", "XOR + Nested"];

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6B7280" }}>←</button>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#1E1B4B" }}>Boolean Logic</div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>AAP-2.H · Level {level} of 8 · {levelLabels[level]}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
          {streak >= 2 && <div style={{ background: "#FEF3C7", color: "#D97706", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>🔥 {streak}×</div>}
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#6C63FF", fontSize: 18 }}>{score} pts</div>
        </div>
      </div>

      {/* Level progress bar */}
      <div style={{ height: 4, background: "#E5E7EB", borderRadius: 4, marginBottom: 24 }}>
        <div style={{ height: 4, background: "#6C63FF", borderRadius: 4, width: `${((level - 1) / 8) * 100}%`, transition: "width 0.4s" }} />
      </div>

      {/* Expression card */}
      {gameData && (
        <div style={{ background: "#F5F3FF", border: "2px solid #C4B5FD", borderRadius: 14, padding: "18px 22px", marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#7C3AED", marginBottom: 6, textTransform: "uppercase" }}>Select all shapes where:</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 17, color: "#1E1B4B", lineHeight: 1.6, wordBreak: "break-word" }}>
            {exprToString(gameData.expr)}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "#9CA3AF" }}>
            {gameData.answers.length} shape{gameData.answers.length !== 1 ? "s" : ""} match · click all of them, then check
          </div>
        </div>
      )}

      {/* Shape grid */}
      {gameData && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 20 }}>
          {gameData.shapes.map(s => (
            <ShapeIcon
              key={s.id} {...s}
              selected={selected.has(s.id)}
              correct={gameData.answers.includes(s.id)}
              revealed={revealed}
              onClick={() => toggle(s.id)}
            />
          ))}
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div style={{
          padding: "12px 16px", borderRadius: 10, marginBottom: 16, fontSize: 14,
          background: feedback.ok ? "#DCFCE7" : "#FEE2E2",
          color: feedback.ok ? "#166534" : "#991B1B",
          fontWeight: 500,
        }}>
          {feedback.msg}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        {!revealed ? (
          <>
            <button onClick={check} disabled={selected.size === 0} style={btnStyle("#6C63FF", selected.size === 0)}>
              Check Answer
            </button>
            <button onClick={() => loadLevel(level)} style={btnStyle("#E5E7EB", false, "#374151")}>
              New Shapes
            </button>
          </>
        ) : (
          <button onClick={next} style={btnStyle("#6C63FF")}>
            {level >= 8 ? "Finish 🎉" : "Next Level →"}
          </button>
        )}
      </div>

      {/* Operator legend */}
      <div style={{ marginTop: 28, padding: "14px 18px", background: "#F9FAFB", borderRadius: 10, border: "1px solid #E5E7EB" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Quick Reference</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px", fontSize: 13, color: "#374151" }}>
          <div><code style={codeStyle}>A AND B</code> — both must be true</div>
          <div><code style={codeStyle}>A OR B</code> — either can be true</div>
          <div><code style={codeStyle}>NOT A</code> — A must be false</div>
          <div><code style={codeStyle}>A XOR B</code> — exactly one true</div>
        </div>
      </div>
    </div>
  );
}

// ─── COURSE MAP ───────────────────────────────────────────────────────────────
function CourseMap({ onSelect, progress }) {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 16px" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: "#1E1B4B", marginBottom: 4 }}>
          AP CSP · Logic Lab
        </div>
        <div style={{ color: "#6B7280", fontSize: 15 }}>
          DEV VERSION Concept-aligned games for every lesson. Complete a game to unlock the next.
        </div>
      </div>

      {CURRICULUM.map(unit => (
        <div key={unit.id} style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 22 }}>{unit.icon}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: "#1E1B4B" }}>{unit.title}</div>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB", marginLeft: 8 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
            {unit.lessons.map(lesson => {
              const lvlDone = progress[lesson.id] || 0;
              const pct = Math.round((lvlDone / lesson.levels) * 100);
              return (
                <div
                  key={lesson.id}
                  onClick={() => lesson.unlocked && !lesson.comingSoon && onSelect(lesson)}
                  style={{
                    background: "#fff", border: `2px solid ${lesson.unlocked ? unit.color + "44" : "#E5E7EB"}`,
                    borderRadius: 14, padding: "18px 18px 14px",
                    cursor: lesson.unlocked && !lesson.comingSoon ? "pointer" : "default",
                    opacity: lesson.comingSoon ? 0.55 : 1,
                    transition: "transform 0.15s, box-shadow 0.15s",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => { if (lesson.unlocked && !lesson.comingSoon) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px #0001"; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: "#1E1B4B" }}>{lesson.title}</div>
                    {lesson.comingSoon
                      ? <span style={{ fontSize: 11, background: "#F3F4F6", color: "#9CA3AF", padding: "2px 7px", borderRadius: 8 }}>Soon</span>
                      : pct === 100
                        ? <span style={{ fontSize: 16 }}>✅</span>
                        : !lesson.unlocked
                          ? <span style={{ fontSize: 14 }}>🔒</span>
                          : null}
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>{lesson.apConcept}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>{lesson.description}</div>
                  {lesson.unlocked && !lesson.comingSoon && (
                    <>
                      <div style={{ height: 4, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: 4, width: `${pct}%`, background: unit.color, borderRadius: 4, transition: "width 0.6s" }} />
                      </div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 5 }}>{lvlDone}/{lesson.levels} levels</div>
                    </>
                  )}
                  {/* accent stripe */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: unit.color, borderRadius: "12px 0 0 12px" }} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const btnStyle = (bg, disabled = false, color = "#fff") => ({
  background: disabled ? "#E5E7EB" : bg,
  color: disabled ? "#9CA3AF" : color,
  border: "none", borderRadius: 10, padding: "11px 22px",
  fontSize: 14, fontWeight: 600, cursor: disabled ? "default" : "pointer",
  fontFamily: "'Space Grotesk', sans-serif", transition: "opacity 0.15s",
});

const codeStyle = {
  fontFamily: "'Space Mono', monospace", background: "#EEF2FF",
  color: "#4F46E5", padding: "1px 5px", borderRadius: 4, fontSize: 12,
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("map"); // "map" | "game"
  const [activeLesson, setActiveLesson] = useState(null);
  const [progress, setProgress] = useState({});

  const openLesson = (lesson) => {
    setActiveLesson(lesson);
    setView("game");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Space+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F8FAFC; font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Top nav */}
      <div style={{ background: "#1E1B4B", padding: "12px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ color: "#A5B4FC", fontSize: 20 }}>⚡</div>
        <div style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16 }}>Logic Lab</div>
        <div style={{ color: "#6366F1", fontSize: 13, marginLeft: 4 }}>AP CSP</div>
        {view === "game" && (
          <button onClick={() => setView("map")} style={{ marginLeft: "auto", background: "#312E81", color: "#A5B4FC", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
            ← Course Map
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ minHeight: "calc(100vh - 52px)" }}>
        {view === "map" && (
          <CourseMap onSelect={openLesson} progress={progress} />
        )}
        {view === "game" && activeLesson?.game === "boolean" && (
          <BooleanGame onBack={() => setView("map")} progress={progress} setProgress={setProgress} />
        )}
      </div>
    </>
  );
}
