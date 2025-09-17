
import { TestType, TestResult, JumpResult, SitupResult } from '../types';

const isJumpResult = (result: TestResult): result is JumpResult => 'height' in result;
const isSitupResult = (result: TestResult): result is SitupResult => 'count' in result && 'deviations' in result;


const getJumpFeedback = (result: JumpResult): string => {
    const { height } = result;
    if (height > 45) {
        return `### Strengths
Excellent! A jump of ${height.toFixed(1)} cm indicates powerful explosive strength in your lower body. This is a fantastic foundation for sports requiring quick, powerful movements.

### Areas for Improvement
To reach the next level, focus on refining your jumping mechanics. Ensure you are using your arms effectively for momentum and that your landing is controlled to absorb impact safely.

### Recommended Drills
1. **Box Jumps**: Perform 3 sets of 5 reps. Focus on exploding up and landing softly.
2. **Depth Jumps**: Step off a small box and immediately explode into a vertical jump upon landing. This improves reactive strength.
3. **Kettlebell Swings**: Develops hip power which is crucial for maximizing jump height.`;
    }
    if (height > 30) {
        return `### Strengths
A solid performance! Your jump of ${height.toFixed(1)} cm shows good foundational power. You have a great base to build upon.

### Areas for Improvement
Focus on increasing your rate of force development. This means training your muscles to produce maximum force in the shortest amount of time. Also, work on your pre-jump countermovement.

### Recommended Drills
1. **Squat Jumps**: 3 sets of 8 reps. Focus on minimizing ground contact time.
2. **Pogo Hops**: Improves ankle stiffness and elasticity. 3 sets of 20 seconds.
3. **Barbell Squats**: Building overall leg strength is key. Focus on a full range of motion.`;
    }
    return `### Strengths
Good effort on your jump of ${height.toFixed(1)} cm. Every test is a baseline to improve from, and you've established yours.

### Areas for Improvement
The primary focus should be on building foundational strength in your legs and core. Proper form is also critical to prevent injury and maximize output.

### Recommended Drills
1. **Bodyweight Squats**: Master the form first. 3 sets of 15 reps.
2. **Glute Bridges**: Activates and strengthens your glutes, which are key for jumping. 3 sets of 12 reps.
3. **Plank**: A strong core is essential for transferring energy. Hold for 3 sets of 30-60 seconds.`;
};


const getSitupFeedback = (result: SitupResult): string => {
    const { count, deviations } = result;
    let feedback = '';

    if (count > 40) {
        feedback += `### Strengths
Fantastic endurance! A score of ${count} reps shows a very strong and resilient core, which is vital for almost every athletic movement.

### Areas for Improvement
With such high endurance, you can now focus on functional core strength. This involves training your core to resist rotation and stabilize your spine under load.
`;
    } else if (count > 20) {
         feedback += `### Strengths
Great work! Achieving ${count} reps is a solid display of core strength and endurance. You have a strong muscular base to build on.

### Areas for Improvement
Focus on consistency in your reps. Aim to make the last rep as clean as the first. Also, consider incorporating exercises that target the lower abs and obliques for balanced strength.
`;
    } else {
         feedback += `### Strengths
Good job completing the test! ${count} reps is a solid starting point. You've established a baseline and now you know what to work on.

### Areas for Improvement
The main goal is to build muscular endurance in your abdominals and hip flexors. Focus on performing each rep with controlled, correct form rather than rushing.
`;
    }

    if (deviations > 0) {
        feedback += `
### Form Correction (${deviations} deviations noted)
The AI noted that ${deviations} of your reps did not meet the full range-of-motion criteria. To improve, ensure your back fully touches the ground on the way down and your chest comes all the way up. Slower, more controlled reps are better than fast, incomplete ones.
`;
    }

    feedback += `
### Recommended Drills
1. **Plank Series**: Include front and side planks to build isometric strength.
2. **Leg Raises**: Excellent for targeting the lower abdominal muscles.
3. **Russian Twists**: Improves rotational strength and oblique engagement.`;

    return feedback;
}


/**
 * Simulates calling a generative AI model to get coaching feedback.
 * @param testType The type of test performed.
 * @param result The result of the test.
 * @returns A promise that resolves to a string of markdown-formatted feedback.
 */
export const getAICoachingFeedback = async (
  testType: TestType,
  result: TestResult
): Promise<string> => {
  console.log("Generating AI feedback for:", { testType, result });

  // Simulate network delay and AI processing time
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const prompt = `You are an elite sports performance coach. An athlete has just completed a ${testType} test with the following result: ${JSON.stringify(result)}. Provide personalized feedback covering their strengths, areas for improvement, and 2-3 specific, actionable drills to help them improve. Format the response with markdown headings (e.g., ### Strengths).`;
  console.log("Simulated Prompt:", prompt);


  if (testType === TestType.JUMP && isJumpResult(result)) {
    return getJumpFeedback(result);
  }

  if (testType === TestType.SITUP && isSitupResult(result)) {
    return getSitupFeedback(result);
  }
  
  // Generic fallback for other tests
  return `### Overall Performance
Well done on completing the ${testType} test. Consistent effort and dedication are key to improvement.

### Areas for Improvement
To improve your performance, focus on the fundamental techniques specific to this exercise. Building supporting muscle groups will also contribute to better results.

### Recommended Drills
1. **Technique Practice**: Spend time performing the movement slowly to perfect your form.
2. **Strength Training**: Incorporate resistance training for the primary muscles used in this test.
3. **Mobility Work**: Ensure you have the necessary range of motion to perform the exercise correctly and safely.`;
};
