// lib/studyCodes.ts
export const STUDY_SERIES = {
  // Level 1: To Know Jesus
  COME_ALIVE: { code: 'CA', prefix: 'CA', name: 'Come Alive with Jesus', totalLessons: 7, level: 1 },
  STEPS_TO_JESUS: { code: 'SJ', prefix: 'SJ', name: 'Steps to Jesus', totalLessons: 5, level: 1 },
  SEARCH_CERTAINTY: { code: 'SR', prefix: 'SR', name: 'Search for Certainty', totalLessons: 30, level: 1 },
  EXPLORER_CLASS: { code: 'EX', prefix: 'EX', name: 'Explorer Class Series', totalLessons: 18, level: 1 },
  RELIABILITY: { code: 'RB', prefix: 'RB', name: 'Reliability of the Bible', totalLessons: 6, level: 1, status: 'coming-soon' },
  
  // Level 2: To Grow in Jesus
  STAY_ALIVE: { code: 'SA', prefix: 'SA', name: 'Stay Alive with Jesus', totalLessons: 15, level: 2 },
  ENCOUNTER: { code: 'EN', prefix: 'EN', name: 'Encounter with Jesus', totalLessons: 30, level: 2 },
  BRANCH_VINE: { code: 'BV', prefix: 'BV', name: 'The Branch and The Vine', totalLessons: 10, level: 2 },
  DANIEL: { code: 'DA', prefix: 'DA', name: 'Daniel Verse by Verse', totalLessons: 12, level: 2 },
  SANCTUARY: { code: 'SN', prefix: 'SN', name: 'Sanctuary: Heaven\'s Blueprint', totalLessons: 12, level: 2 },
  DISCOVER: { code: 'DS', prefix: 'DS', name: 'Discover: 3 Angels & RBF', totalLessons: 30, level: 2 },
  SECRETS_PROPHECY: { code: 'SP', prefix: 'SP', name: 'Secrets of Prophecy', totalLessons: 24, level: 2 },
  SEVEN_CHURCHES: { code: 'SC', prefix: 'SC', name: 'Seven Churches of Revelation', totalLessons: 8, level: 2 },
  
  // Level 3: To Mature in Jesus
  EXCELLENCE_LIFE: { code: 'EL', prefix: 'EL', name: 'Excellence in Life', totalLessons: 7, level: 3 },
  COURTSHIP: { code: 'CT', prefix: 'CT', name: 'Courtship & Relationship', totalLessons: 9, level: 3 },
  PARENTING: { code: 'PA', prefix: 'PA', name: 'Christian Parenting', totalLessons: 12, level: 3 },
  GODLY_MAN: { code: 'GM', prefix: 'GM', name: 'Being a Godly Man', totalLessons: 5, level: 3 },
  FINANCE: { code: 'FI', prefix: 'FI', name: 'Christian Finance', totalLessons: 5, level: 3 },
  
  // Level 4: Extra Meat
  DESIRE_AGES: { code: 'DA', prefix: 'DA', name: 'Desire of Ages', totalLessons: 87, level: 4, status: 'coming-soon' },
  MOUNT_BLESSING: { code: 'MB', prefix: 'MB', name: 'Mount of Blessing', totalLessons: 10, level: 4, status: 'coming-soon' },
  CHRIST_OBJECT_LESSONS: { code: 'COL', prefix: 'COL', name: 'Christ\'s Object Lessons', totalLessons: 30, level: 4, status: 'coming-soon' },
  GREAT_CONTROVERSY: { code: 'GC', prefix: 'GC', name: 'Great Controversy', totalLessons: 42, level: 4, status: 'coming-soon' },
};

export function getUnlockCode(seriesKey: string, lessonNumber: number): string {
  const series = STUDY_SERIES[seriesKey as keyof typeof STUDY_SERIES];
  if (!series) return `${lessonNumber}`;
  const paddedNumber = lessonNumber.toString().padStart(2, '0');
  return `${series.prefix}${paddedNumber}`;
}

export function verifyCode(seriesKey: string, lessonNumber: number, inputCode: string): boolean {
  const expectedCode = getUnlockCode(seriesKey, lessonNumber);
  return expectedCode.toLowerCase() === inputCode.toLowerCase().trim();
}