export const heroStats = {
  age: "20",
  weight: "61.6 kg",
  height: "161.5 cm",
  bodyFat: "~23%",
  location: "La Paz, BOL",
};

export const altitudeInfo = {
  title: "Altitude Adjustment — La Paz, Bolivia · 3,640 m",
  text: "At 3,640m you're running on roughly 65% of the oxygen available at sea level. Your cardiovascular system is already working harder at rest — which is genuinely an athletic advantage long-term (natural EPO boost, higher red blood cell count) but demands smarter training short-term. All conditioning work in this plan is intensity-capped. Rest periods are extended by 20–30% vs. standard programming. Never chase a \"sea level HR\" here — perceived exertion is your real guide.",
  pills: [
    "🫁 Rest +20–30%",
    "💧 Hydrate aggressively",
    "🚫 No max-HR sprints",
    "📉 Moderate cardio intensity",
    "✅ Long-term cardio advantage"
  ]
};

export const targets = [
  { label: "Daily Calories", val: "1,800", sub: "kcal · deficit phase" },
  { label: "Daily Protein", val: "130g", sub: "minimum · 140g ideal" },
  { label: "Target Loss", val: "0.45", sub: "kg per week" },
  { label: "Training Days", val: "5 / wk", sub: "Mon Tue Wed Fri Sat" }
];

export const scheduleData = {
  mon: {
    id: "mon",
    dayName: "Monday",
    dayTitle: "Upper A",
    focusTag: "Push Focus",
    restCallouts: [
      { text: "Main lifts", bold: "3–3.5 min rest" },
      { text: "Accessories", bold: "90s–2 min rest" },
      { text: "Stop", bold: "1–2 reps shy", suffix: " of failure" }
    ],
    exercises: [
      { name: "Barbell / DB Bench Press", sets: "3", reps: "8–10", notes: "2s controlled descent. Main strength lift of the day." },
      { name: "Dumbbell Overhead Press", sets: "3", reps: "10–12", notes: "Don't flare elbows. Brace core throughout." },
      { name: "Incline DB Press", sets: "3", reps: "10–12", notes: "30–45° incline. Upper chest emphasis." },
      { name: "Lateral Raises", sets: "3", reps: "12–15", notes: "Light weight. Lead with elbows, slow up and down." },
      { name: "Tricep Dips (assisted ok)", sets: "3", reps: "8–12", notes: "Slight forward lean for chest engagement." },
      { name: "Face Pulls", sets: "3", reps: "15–20", notes: "Non-negotiable for shoulder health. Keep it light." }
    ]
  },
  tue: {
    id: "tue",
    dayName: "Tuesday",
    dayTitle: "Lower A",
    focusTag: "Quad Focus",
    restCallouts: [
      { text: "Squat / Deadlift", bold: "3–3.5 min rest" },
      { text: "Accessories", bold: "90s–2 min rest" }
    ],
    exercises: [
      { name: "Goblet Squat → Barbell Squat", sets: "3", reps: "8–12", notes: "Start goblet, progress to barbell when form is solid." },
      { name: "Romanian Deadlift", sets: "3", reps: "10–12", notes: "Feel the hamstring stretch at bottom. Hips back." },
      { name: "Leg Press", sets: "3", reps: "12–15", notes: "Feet shoulder-width. Don't lock out knees at top." },
      { name: "Leg Curl (machine)", sets: "3", reps: "12–15", notes: "Full range of motion. Slow eccentric." },
      { name: "Standing Calf Raise", sets: "4", reps: "15–20", notes: "Full stretch at bottom, full contraction at top." },
      { name: "Plank", sets: "3", reps: "30–45s", notes: "Brace like you're about to take a punch. Breathe." }
    ]
  },
  wed: {
    id: "wed",
    dayName: "Wednesday",
    dayTitle: "Core + Cardio",
    focusTag: "⛰️ Altitude-Adjusted",
    pMessage: "This day is your fat loss engine. At altitude, your body burns more calories just existing — lean into that. Keep all conditioning at a moderate perceived effort (6–7/10). If you feel light-headed or your breathing becomes labored, drop intensity immediately.",
    isConditioningDay: true,
    exercises: [
      { name: "Hanging Knee Raises", sets: "3", reps: "10–15 reps", notes: "Control the swing. Don't kip." },
      { name: "Dead Bug", sets: "3", reps: "8 each side", notes: "Lower back stays glued to floor." },
      { name: "Plank to Down Dog", sets: "3", reps: "10 reps", notes: "Slow and deliberate. Stretches + strengthens." },
      { name: "Russian Twists (bodyweight)", sets: "3", reps: "15 each side", notes: "Feet elevated if possible. Rotate from core, not arms." },
      { name: "Hollow Body Hold", sets: "3", reps: "20–30s", notes: "Lower back pressed to floor. This is a gymnastic staple." }
    ]
  },
  fri: {
    id: "fri",
    dayName: "Friday",
    dayTitle: "Upper B",
    focusTag: "Pull Focus",
    restCallouts: [
      { text: "Main lifts", bold: "3–3.5 min rest" },
      { text: "Accessories", bold: "90s–2 min rest" },
      { text: "Stop", bold: "1–2 reps shy", suffix: " of failure" }
    ],
    exercises: [
      { name: "Lat Pulldown / Assisted Pull-up", sets: "3", reps: "8–10", notes: "Pull elbows to hips. Think about your lats, not your hands." },
      { name: "Seated Cable Row", sets: "3", reps: "10–12", notes: "Tall chest. Squeeze shoulder blades at the end of each rep." },
      { name: "Single-Arm DB Row", sets: "3", reps: "10–12 each", notes: "Brace on bench. Big range of motion. Don't rotate hips." },
      { name: "Rear Delt Fly (DB or cable)", sets: "3", reps: "15", notes: "Light weight. Elbows high, arc outward. Burn should be felt." },
      { name: "Barbell / DB Bicep Curl", sets: "3", reps: "10–12", notes: "Full extension at the bottom. Don't swing." },
      { name: "Hammer Curl", sets: "3", reps: "10–12", notes: "Targets brachialis and forearm thickness. Tom Holland staple." }
    ]
  },
  sat: {
    id: "sat",
    dayName: "Saturday",
    dayTitle: "Lower B",
    focusTag: "Hinge + Athleticism",
    restCallouts: [
      { text: "Deadlift", bold: "3.5–4 min rest" },
      { text: "Accessories", bold: "90s–2 min rest" },
      { text: "Your", bold: "heaviest day", suffix: " — brace hard" }
    ],
    exercises: [
      { name: "Conventional Deadlift", sets: "3", reps: "6–8", notes: "Heaviest compound of the week. Brace core like a vice." },
      { name: "Bulgarian Split Squat", sets: "3", reps: "10–12 each", notes: "Back foot elevated. Front knee tracks over toe. Brutal but essential." },
      { name: "Leg Extension (machine)", sets: "3", reps: "12–15", notes: "Quad isolation. Pause 1s at the top of each rep." },
      { name: "Nordic Curl or Leg Curl", sets: "3", reps: "8–10", notes: "Hamstring emphasis. Eccentric focus — control the lowering." },
      { name: "Seated Calf Raise", sets: "3", reps: "15–20", notes: "Different angle vs standing. Hits soleus. Full stretch at bottom." },
      { name: "Ab Wheel Rollout (or Plank)", sets: "3", reps: "8–10 reps", notes: "Only go as far as you can control without lower back dipping." }
    ]
  }
};

export const conditioningOptions = [
  { label: "Option A — Incline Walk", desc: "25 min brisk incline treadmill walk. Moderate pace, sustained. Best for beginners at altitude." },
  { label: "Option B — Intervals (light)", desc: "4–5 rounds of 150m moderate jog / 150m walk. Altitude-safe version of sprint work." },
  { label: "Option C — Jump Rope", desc: "8 rounds: 45s on / 45s off. Keep it light — double-unders are NOT altitude-appropriate yet." },
  { label: "Option D — Stairmaster", desc: "20 min at low–moderate intensity. You're literally at altitude — stairs hit different here." }
];

export const progressionSteps = [
  { week: "Weeks 1–2", desc: "Learn the movement patterns. Keep weight conservative. Nail form before adding load. Altitude may make you feel weaker than expected on cardio days — that's normal." },
  { week: "Weeks 3 onward", desc: "Add 1–2 reps per session or add 2.5–5kg when you consistently hit the top of the rep range. You'll progress fast — you're a beginner. Enjoy it." },
  { week: "Every 4–6 Weeks", desc: "Deload: drop volume by ~40%, keep the same weight. Reassess measurements, weight trend, and energy levels. Review and adjust if needed." }
];

export const footerNotes = [
  "Updated with dietary analysis · 4-week weigh-in data · La Paz altitude adjustments",
  { main: " — continue daily, timing doesn't matter", red: "Creatine 5g" }
];
