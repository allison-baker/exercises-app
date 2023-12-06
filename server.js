const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client"));

let lists = [
  {
    name: "Back and Biceps",
    id: 0,
    color: {
      name: "Amber",
      class: "text-amber-600",
      id: 1,
    },
    exercises: [
      {
        difficulty: "beginner",
        equipment: "dumbbell",
        instructions:
          "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.",
        muscle: "biceps",
        name: "Incline Hammer Curls",
        type: "strength",
      },
      {
        difficulty: "beginner",
        equipment: "dumbbell",
        instructions:
          "Begin in a standing position with a dumbbell in each hand. Your arms should be hanging at your sides with your palms facing forward. Look directly ahead, keeping your chest up, with your feet shoulder-width apart. This will be your starting position. Initiate the movement by flexing the elbows to curl the weight. Do not use momentum or flex through the shoulder, instead use a controlled motion. Execute the pressing movement by extending the arm, flexing and abducting the shoulder to rotate the arm as you press above your head. Pause at the top of the motion before reversing the movement to return to the starting position. Complete the desired number of repetitions before switching to the opposite side.",
        muscle: "biceps",
        name: "Biceps curl to shoulder press",
        type: "strength",
      },
      {
        difficulty: "intermediate",
        equipment: "cable",
        instructions:
          "Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. These pads will prevent your body from being raised by the resistance attached to the bar. Grab the bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than your shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width. As you have both arms extended in front of you - while holding the bar at the chosen grip width - bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position. As you breathe out, bring the bar down until it touches your upper chest by drawing the shoulders and the upper arms down and back. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary (only the arms should move). The forearms should do no other work except for holding the bar; therefore do not try to pull the bar down using the forearms. After a second in the contracted position, while squeezing your shoulder blades together, slowly raise the bar back to the starting position when your arms are fully extended and the lats are fully stretched. Inhale during this portion of the movement. 6. Repeat this motion for the prescribed amount of repetitions.  Variations: The behind-the-neck variation is not recommended as it can be hard on the rotator cuff due to the hyperextension created by bringing the bar behind the neck.",
        muscle: "lats",
        name: "Close-Grip Front Lat Pulldown",
        type: "strength",
      },
      {
        difficulty: "intermediate",
        equipment: "cable",
        instructions:
          "For this exercise you will need access to a low pulley row machine with a V-bar. Note: The V-bar will enable you to have a neutral grip where the palms of your hands face each other. To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your knees are slightly bent and not locked. Lean over as you keep the natural alignment of your back and grab the V-bar handles. With your arms extended pull back until your torso is at a 90-degree angle from your legs. Your back should be slightly arched and your chest should be sticking out. You should be feeling a nice stretch on your lats as you hold the bar in front of you. This is the starting position of the exercise. Keeping the torso stationary, pull the handles back towards your torso while keeping the arms close to it until you touch the abdominals. Breathe out as you perform that movement. At that point you should be squeezing your back muscles hard. Hold that contraction for a second and slowly go back to the original position while breathing in. Repeat for the recommended amount of repetitions.  Caution: Avoid swinging your torso back and forth as you can cause lower back injury by doing so. Variations: You can use a straight bar instead of a V-Bar and perform with a pronated grip (palms facing down-forward) or a supinated grip (palms facing up-reverse grip).",
        muscle: "middle_back",
        name: "Seated Cable Row",
        type: "strength",
      },
      {
        difficulty: "intermediate",
        equipment: "body_only",
        instructions:
          "Lie face down on a hyperextension bench, tucking your ankles securely under the footpads. Adjust the upper pad if possible so your upper thighs lie flat across the wide pad, leaving enough room for you to bend at the waist without any restriction. With your body straight, cross your arms in front of you (my preference) or behind your head. This will be your starting position. Tip: You can also hold a weight plate for extra resistance in front of you under your crossed arms. Start bending forward slowly at the waist as far as you can while keeping your back flat. Inhale as you perform this movement. Keep moving forward until you feel a nice stretch on the hamstrings and you can no longer keep going without a rounding of the back. Tip: Never round the back as you perform this exercise. Also, some people can go farther than others. The key thing is that you go as far as your body allows you to without rounding the back. Slowly raise your torso back to the initial position as you inhale. Tip: Avoid the temptation to arch your back past a straight line. Also, do not swing the torso at any time in order to protect the back from injury. Repeat for the recommended amount of repetitions.  Variations: This exercise can also be performed without a hyperextension bench, but in this case you will need a spotter. Also, a similar exercise to this one is the good morning and the stiff-legged deadlift.",
        muscle: "lower_back",
        name: "Back Extension",
        type: "strength",
      },
    ],
  },
  {
    name: "Leg Day",
    id: 1,
    color: {
      name: "Blue",
      class: "text-blue-800",
      id: 6,
    },
    exercises: [
      {
        difficulty: "intermediate",
        equipment: "machine",
        instructions:
          "Load the sled to an appropriate weight. Seat yourself on the machine, planting one foot on the platform in line with your hip. Your free foot can be placed on the ground. Maintain good spinal position with your head and chest up. Supporting the weight, fully extend the knee and unlock the sled. This will be your starting position. Lower the weight by flexing the hip and knee, continuing as far as flexibility allows. Do not allow your lumbar to take the load by moving your pelvis. At the bottom of the motion pause briefly and then return to the starting position by extending the hip and knee. Complete all repetitions for one leg before switching to the other.",
        muscle: "quadriceps",
        name: "Single-Leg Press",
        type: "strength",
      },
      {
        difficulty: "intermediate",
        equipment: "barbell",
        instructions:
          "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack just above shoulder level. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it. Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso. Step away from the rack and position your legs using a shoulder-width medium stance with the toes slightly pointed out. Keep your head up at all times and maintain a straight back. This will be your starting position. Begin to slowly lower the bar by bending the knees and sitting back with your hips as you maintain a straight posture with the head up. Continue down until your hamstrings are on your calves. Inhale as you perform this portion of the movement. Begin to raise the bar as you exhale by pushing the floor with the heel or middle of your foot as you straighten the legs and extend the hips to go back to the starting position. Repeat for the recommended amount of repetitions.  This type of squat allows a greater range of motion, and allows the trunk to maintain a more vertical position than other types of squats, due to foot position and the higher bar position.",
        muscle: "quadriceps",
        name: "Barbell Full Squat",
        type: "strength",
      },
      {
        difficulty: "beginner",
        equipment: "dumbbell",
        instructions:
          "Begin in a standing position with a dumbbell in each hand. Ensure that your back is straight and stays that way for the duration of the exercise. Allow your arms to hang perpendicular to the floor, with the wrists pronated and the elbows pointed to your sides. This will be your starting position. Initiate the movement by flexing your hips, slowly pushing your butt as far back as you can. This should entail a horizontal movement of the hips, rather than a downward movement. The knees should only partially bend, and your weight should remain on your heels. Drive your butt back as far as you can, which should generate tension in your hamstrings as your hands approach knee level. Maintain an arch in your back throughout the exercise. When your hips cannot perform any further backward movement, pause, and then slowly return to the starting position by extending the hips.",
        muscle: "hamstrings",
        name: "Romanian Deadlift With Dumbbells",
        type: "strength",
      },
      {
        difficulty: "beginner",
        equipment: "body_only",
        instructions:
          "Kneel on the floor or an exercise mat and bend at the waist with your arms extended in front of you (perpendicular to the torso) in order to get into a kneeling push-up position but with the arms spaced at shoulder width. Your head should be looking forward and the bend of the knees should create a 90-degree angle between the hamstrings and the calves. This will be your starting position. As you exhale, lift up your right leg until the hamstrings are in line with the back while maintaining the 90-degree angle bend. Contract the glutes throughout this movement and hold the contraction at the top for a second. Tip: At the end of the movement the upper leg should be parallel to the floor while the calf should be perpendicular to it. Go back to the initial position as you inhale and now repeat with the left leg. Continue to alternate legs until all of the recommended repetitions have been performed.  Variations: For this exercise you can also perform all of the repetitions with one leg first and then the other one. Additionally, you can also add ankle weights.",
        muscle: "glutes",
        name: "Glute Kickback",
        type: "strength",
      },
      {
        difficulty: "intermediate",
        equipment: "body_only",
        instructions:
          "Stand facing a box or bench of an appropriate height with your feet together. This will be your starting position. Begin the movement by stepping up, putting your left foot on the top of the bench. Extend through the hip and knee of your front leg to stand up on the box. As you stand on the box with your left leg, flex your right knee and hip, bringing your knee as high as you can. Reverse this motion to step down off the box, and then repeat the sequence on the opposite leg.",
        muscle: "glutes",
        name: "Step-up with knee raise",
        type: "strength",
      },
    ],
  },
];

/* Calculate id number - makes sure each id number is unique even if items have been added/deleted
New id number is higher than any other number currently in the array */
function getId(array) {
  let newID = 0;
  array.forEach((item) => {
    if (item.id > newID) newID = item.id;
  });
  return newID + 1;
}

/* GET request - send lists */
app.get("/api/lists", (req, res) => {
  res.send(lists);
});

/* POST request - create new list */
app.post("/api/list", (req, res) => {
  lists.push({
    name: req.body.name,
    id: getId(lists),
    color: req.body.color,
    exercises: [],
  });

  res.send(lists);
});

/* PUT request - update list information */
app.put("/api/list", (req, res) => {
  lists.forEach((list) => {
    if (list.id === Number(req.body.id)) {
      list.name = req.body.name;
      list.color = req.body.color;
    }
  });

  res.send(lists);
});

/* DELETE request - delete list from array */
app.delete("/api/list", (req, res) => {
  lists = lists.filter((list) => list.id !== Number(req.body.id));
  res.send(lists);
});

/* POST request - add an exercise to a list */
app.post("/api/list/exercises", (req, res) => {
  lists.forEach((list) => {
    if (list.id === Number(req.body.id)) {
      list.exercises.push(req.body.exercise);
    }
  });

  res.send(lists);
});

/* DELETE request - delete an exercise from a list */
app.delete("/api/list/exercises", (req, res) => {
  let index = lists.findIndex((list) => list.id === Number(req.body.listId));
  lists[index].exercises.splice(
    Number(req.body.exerciseId),
    1
  );
  res.send(lists);
});

/* POST request - create a custom exercise */
app.post("/api/exercises", (req, res) => {
  console.log(req.body);
  let exercise = {
    difficulty: req.body.difficulty,
    equipment: req.body.equipment,
    instructions: req.body.instructions,
    muscle: req.body.muscle,
    name: req.body.name,
    type: req.body.type,
  };

  lists.forEach((list) => {
    if (list.id === Number(req.body.id)) {
      list.exercises.push(exercise);
    };
  });

  res.send(lists);
});

// LISTEN
app.listen(port, () => {
  console.log(`Exercises app listening on port ${port}`);
});
