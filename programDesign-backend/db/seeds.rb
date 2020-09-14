# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

    Program.create(startdate: '2020-09-11', workoutsPerWeek: 4, weeklyVolume: 20, title: 'training program 1', split: 'push, pull', length: 8, goal: 'hypertrophy')
    Program.create(startdate: '2020-09-11', workoutsPerWeek: 3, weeklyVolume: 15, title: 'training program 1', split: 'Total body', length: 8, goal: 'hypertrophy')
    
    Exercise.create(name: 'Squat', description: 'rest the bar on your shoulders, take one step back from the rack. Feet shoulder width apart and toes slightly pointed out. Bend your hips and knees at the same time, keeping your chest upright. keep going until your knees reach 90 degrees', fatigueRating: 5, bodyPart: 'Legs')
    Exercise.create(name: 'Deadlift', description: 'step up to the bar so your toes are direcly beneath the bar, gently hip hinge and bend the knees until you can grip the bar aproximatly shoulder width apart. with a straight back, squeeze your shoulderblades down and together. Drive the bar straight up by driving your hips foreward and squeeze your glutes at the top!', fatigueRating: 5, bodyPart: 'Legs, Back')
    Exercise.create(name: 'Barbell Bench', description: 'Position your self under the Bar with a tight core and flat back, lower the bar in a controled position so that the bar path would make contact with your nipples. stop the downward motion when the elbows reach 90 degrees. push up and out with your hands tucking the elbows out slightly.', fatigueRating: 3, bodyPart: 'Chest, Shoulders')
    Exercise.create(name: 'Barbell Military Press', description: 'Grab the bar shoulder width apart. Push straight overhead so the biceps are by your ears. slowly bring barbell back down in front. stop at neck hight', fatigueRating: 3, bodyPart: 'Shoulders')
    Exercise.create(name: 'Barbell Bent over Row', description: 'Stand with a shoulder-width stance. Grab the barbell, wider than shoulder-width, with an overhand grip. Bending your knees slightly, and your core tight, bend over at the waist keeping your lower back tight. Bending over until your upper body is at a 45-degree bend or lower, pull the bar up towards your lower chest.', fatigueRating: 3, bodyPart: 'Back')

    Workout.create(description: 'Push', warmUp: '', volume: 0, date: '2020-09-11', program_id: 1, exercise_id: 1)
    Workout.create(description: 'Pull', warmUp: '', volume: 0, date: '2020-09-11', program_id: 1, exercise_id: 2)
    Workout.create(description: 'Total Body', warmUp: '', volume: 0, date: '2020-09-11', program_id: 2, exercise_id: 1)
    Workout.create(description: 'Total Body', warmUp: '', volume: 0, date: '2020-09-11', program_id: 2, exercise_id: 1)
