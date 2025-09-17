
export enum Screen {
  HOME,
  INSTRUCTIONS,
  ANALYSIS,
  RESULTS,
  INTEGRITY,
  TRANSMISSION,
  USER_PROFILE,
}

export enum TestType {
  JUMP = 'Vertical Jump',
  SITUP = 'Sit-up Test',
  SPRINT = '40m Sprint',
  PUSHUP = 'Push-up Test',
  BROAD_JUMP = 'Broad Jump',
  MEDICINE_BALL_THROW = 'Medicine Ball Throw',
}

export type JumpResult = {
  height: number;
};

export type SitupResult = {
  count: number;
  deviations: number;
};

export type SprintResult = {
  time: number; // in seconds
};

export type PushupResult = {
  count: number;
  deviations: number;
};

export type BroadJumpResult = {
  distance: number; // in cm
};

export type MedicineBallThrowResult = {
    distance: number; // in meters
};

export type TestResult = JumpResult | SitupResult | SprintResult | PushupResult | BroadJumpResult | MedicineBallThrowResult;

export type UserProfile = {
    name: string;
    sport: string;
};

export type TestRecord = {
    id: string;
    date: string;
    testType: TestType;
    result: TestResult;
};