import { TestType } from './types';

export const APP_TITLE = "AI Sports Talent Scout";
export const SAI_LOGO_URL = "https://sportsauthorityofindia.gov.in/sai/images/sai-logo-new.png";

export const INSTRUCTIONS = {
  [TestType.JUMP]: {
    title: "Vertical Jump Instructions",
    steps: [
      "Stand sideways to the camera.",
      "Ensure your entire body is visible in the frame.",
      "Use a tripod or place your phone on a stable surface, about 2-3 meters away.",
      "When ready, jump as high as you can from a standing position.",
      "Land safely. The AI will calculate your jump height.",
    ],
  },
  [TestType.SITUP]: {
    title: "Sit-up Test Instructions",
    steps: [
      "Lie on your back with your knees bent.",
      "Place the camera to your side, capturing your full range of motion.",
      "Use a tripod or place your phone on a stable surface, about 1.5-2 meters away.",
      "Perform as many sit-ups as you can with correct form.",
      "The AI will count your reps and check your form.",
    ],
  },
  [TestType.SPRINT]: {
    title: "40m Sprint Instructions",
    steps: [
        "Set up a 40-meter straight running path.",
        "Use a tripod to place the camera at the finish line, facing the start line.",
        "Ensure the entire running path is visible in the frame.",
        "Run from start to finish as fast as you can.",
        "The AI will automatically start and stop the timer.",
    ],
  },
  [TestType.PUSHUP]: {
    title: "Push-up Test Instructions",
    steps: [
        "Use a mini-tripod or place the camera on the floor to your side.",
        "Ensure your entire body is visible in the frame.",
        "Start in a high plank position with hands under your shoulders.",
        "Lower your body until your chest nearly touches the floor.",
        "Push back up to the starting position for one full rep.",
        "The AI will count your reps and check for full range of motion.",
    ],
  },
  [TestType.BROAD_JUMP]: {
    title: "Broad Jump Instructions",
    steps: [
        "Use a tripod or place your phone on a stable surface to your side.",
        "Mark a clear starting line on the ground.",
        "Ensure the camera can see you at the start and the area you will jump into.",
        "Stand behind the line and jump as far as you can forward.",
        "Land with both feet and hold your position. The AI will measure the distance.",
    ],
  },
  [TestType.MEDICINE_BALL_THROW]: {
    title: "Medicine Ball Throw Instructions",
    steps: [
        "Use a standard weight medicine ball (e.g., 3kg).",
        "Use a tripod or place your phone on a stable surface to your side.",
        "Ensure the camera can see you and the area where the ball will land.",
        "Hold the ball at your chest and throw it forward as far as you can.",
        "The AI will track the ball and measure the throw distance.",
    ],
  }
};

export const ANALYSIS_STAGES = {
  [TestType.JUMP]: [
    { message: "Initializing pose detection model...", result: null },
    { message: "Scanning video for subject...", result: null },
    { message: "Subject detected. Tracking center of mass.", result: null },
    { message: "Analyzing take-off phase...", result: "Peak Velocity: 3.5 m/s" },
    { message: "Detecting jump arc and peak height...", result: "Estimated Height: 46 cm" },
    { message: "Finalizing results...", result: "Calculated Height: 48 cm" },
  ],
  [TestType.SITUP]: [
    { message: "Initializing repetition counting model...", result: null },
    { message: "Identifying core body landmarks...", result: null },
    { message: "Monitoring torso angle for full range of motion...", result: "Live Rep Count: 15" },
    { message: "Counting sit-up rhythm...", result: "Live Rep Count: 32" },
    { message: "Analyzing form for deviations...", result: "Deviations Found: 2" },
    { message: "Finalizing valid rep count...", result: "Final Valid Reps: 45" },
  ],
  [TestType.SPRINT]: [
    { message: "Initializing motion tracking model...", result: null },
    { message: "Detecting start and finish lines from frame...", result: null },
    { message: "Waiting for runner's first movement...", result: "Ready..." },
    { message: "Runner detected. Timer started.", result: "Time: 1.34s" },
    { message: "Tracking runner across the path...", result: "Time: 3.81s" },
    { message: "Finish line crossed. Finalizing time...", result: "Final Time: 5.72s" },
  ],
  [TestType.PUSHUP]: [
    { message: "Initializing repetition counting model...", result: null },
    { message: "Identifying key body landmarks (shoulders, elbows, hips)...", result: null },
    { message: "Monitoring elbow angle and chest proximity to floor...", result: "Live Rep Count: 12" },
    { message: "Counting valid repetitions...", result: "Live Rep Count: 25" },
    { message: "Analyzing form for incomplete reps...", result: "Deviations Found: 3" },
    { message: "Finalizing valid rep count...", result: "Final Valid Reps: 32" },
  ],
  [TestType.BROAD_JUMP]: [
    { message: "Initializing pose detection model...", result: null },
    { message: "Scanning video for subject and start line...", result: null },
    { message: "Subject detected. Tracking take-off point.", result: null },
    { message: "Analyzing jump trajectory and landing point...", result: "Estimated Distance: 205 cm" },
    { message: "Confirming stable landing...", result: "Landing Confirmed." },
    { message: "Finalizing results...", result: "Calculated Distance: 212 cm" },
  ],
  [TestType.MEDICINE_BALL_THROW]: [
    { message: "Initializing object tracking model...", result: null },
    { message: "Scanning video for subject and medicine ball...", result: null },
    { message: "Subject and ball detected. Tracking release point.", result: null },
    { message: "Analyzing ball trajectory and flight path...", result: "Estimated Distance: 7.5m" },
    { message: "Detecting landing point...", result: "Landing Confirmed." },
    { message: "Finalizing results...", result: "Calculated Distance: 7.8m" },
  ],
};