# MA1805-SpringFinalProject
**By Eleanor Craner & Simon Bahrani** - [Host GitHub Link](https://github.com/Junecran/MA1805-SpringFinalProject) - [Website Link](https://junecran.github.io/MA1805-SpringFinalProject/) 


# [Inside The Void](insideTheVoid\index.html) - Link to Mini Game 01

This experimental mini-game explores a survival experience set in the quiet emptiness of space, using it as a metaphor for isolation and the damage to mental health. The player controls a fragile, tethered spacecraft that represents a shifting mental state, where visual damage like flickers and gradual decay suggests growing psychological pressure over time. Enemies drift in from the darkness as bad intrusive thoughts , constantly closing in and reflecting how persistent and difficult these mental patterns can be to escape.

Instead of combat, the focus is on movement and awareness. Simple mouse controls keep the interaction direct and instinctive, while the rope tether adds a sense of restriction and balance, reinforcing the idea that control is always limited and stability has to be constantly maintained. Overall, the game aims to create a reflective, slightly uneasy atmosphere that connects gameplay mechanics with ideas around mental health, highlighting the quiet, ongoing effort it takes to manage intrusive thoughts and stay grounded.

**Theme & Design Choices**  
* The spaceship stands for the player’s mental state, and taking damage shows growing emotional strain. Enemies represent intrusive thoughts that keep coming after the player, highlighting how hard they are to avoid.
* Rather than using weapons, the game focuses on movement and contact, which stands for facing these thoughts head-on. Using the mouse to control the game makes the experience feel more instinctive and intense.
* The player is tied to a rope, which shows a fragile link to stability. This mechanic highlights both the limits the player faces and how hard it is to fully escape negative thoughts.
* Visual cues like flickering, screen overlays, and no visible health bar quietly show things getting worse. This reflects how mental health problems can often go unnoticed.
* A scrolling camera and very little guidance make the player feel disoriented and lost. Without a scoring system, the game shifts focus from winning to just surviving constant pressure.
* The visual style matches the theme, using cold, faded colours to show isolation. Small touches of red stand for resilience, and yellow for hope. The pixel art keeps things abstract and focuses on mood instead of realism.

## Debrief
* The game was organised using distinct game states such as the main menu, instructions, transitions, and gameplay. This approach maintained structure, avoiding the pitfalls of placing all code together. Each state was given its own function, which made managing and debugging the project more straightforward.
* Using classes like Enemy and Player to organise the main sprites made the code easier to read and reuse. For example, I could create several enemies from the same Enemy class instead of writing new code every time.
* A simplified system was implemented for the tethered player instead of a comprehensive physics engine. However, this approach introduced issues, such as movement feeling unnatural or overly elastic in zero gravity. These challenges made it difficult to find comparable solutions (as detailed in Eleanor's text file).
* Simple square hitboxes were employed for collisions, primarily for their ease of implementation, despite not perfectly matching the sprites' forms. Given the simplicity of the game mechanics, high precision was deemed unnecessary.
* As features like pause and menus were introduced, managing game states became increasingly complex. Minimising the number of states and consolidating functions helped to streamline this process. Nevertheless, debugging became more challenging, leading to the creation of a dedicated debug mode.

**Future Improvements**
* The rope system could be refined to have a greater impact on gameplay and player experience. Stronger feedback, such as a more noticeable snap-back or a pronounced pulling force toward the spaceship, would enhance the sense of connection and tension.
* Player movement and animation also present opportunities for improvement. Allowing the player sprite to rotate with movement direction or integrating minor shaking effects when the spaceship is damaged would offer clearer visual feedback, making the game more immersive.
* Introducing a greater variety of enemies, such as faster ones, would elevate challenge and diversity. This approach would sustain player interest while preserving the game’s visual and emotional style, avoiding an overly mechanical feel.

Despite these challenges, the project remains built on a solid foundation and delivers a strong emotional impact. Further development of the rope mechanics, player feedback, and gameplay variety would enhance immersion and engagement, all while retaining the intended visual and experiential qualities.


## Group Members & Main Responsibilities:

**Eleanor Craner** - [Link to Text Eleanor file](EleanorCraner_PersonalContributions.txt)
- Pixel Art 
- Menus/UI & Transitions
- player & Enemies movement

**Simon Bahrani** - [Link to Text Simon file](insideTheVoid/index.html)
- Sounds
- Ship Health mechanic
- Sprite Collisions 


## Concept Development & References
[**Link to Art References**](https://uk.pinterest.com/Blank9289/project-inspiration/2d-pixel-game-inspiration-outerbreak/)

### Early Concepts
1. Noise Parkcore (Rain + Water Creature Platformer)
A game where loud noises trigger rain. The player is a water creature that jumps between puddles. Without a microphone input, the character creates sound by jumping into puddles.

2. Music Soundboard Birds (Interactive Music System)
A music-making tool where power lines act as a musical staff. Birds sit on the lines like notes, each representing a different instrument or sound.

3. Wordplay Art Room 
A room filled with objects that have double meanings. Interacting with an object transforms it into its alternate meaning (e.g., computer mouse → real mouse). It could include word puzzle mechanics like Wordle.

4. Unscrabble Witch Game
Letters are dragged into a magic circle. They slowly fade or resist, making word formation feel magical and unstable.

### Change Dirction
We first planned to make a game, but we found ourselves more interested in **emotion and atmosphere**. Rather than setting goals, we focused on how the world feels and how it affects the player’s senses. The project became an interactive art piece where mood and sensory experience matter more than traditional gameplay.

After that, we looked for themes that would give the experience real meaning. We thought about ideas like hope versus despair, mental health struggles, illness, and the quiet comfort found in uncertainty or adventure. Each theme led us to new emotions and helped us picture how a player might feel in our world. In the end, we chose to focus on **loneliness**, a feeling that is shared by many.

### Final Concepts
Our project started as a traditional game idea but grew into an interactive experience focused on atmosphere and feelings. The gameplay uses simple actions (moving, staying alive, and interacting) along with visual and sound effects like flickering screens, health-based visual changes, and background sounds to create tension and a feeling of weakness.

At its core, the experience explores **loneliness and stress through gameplay and design**. The tethered player system makes players feel dependent and limited, while enemies appearing all the time add threat and worry. Even the menu changes and the user interface build the atmosphere, showing the world is not just a place to play but something to feel and understand. Rather than a clear goals or a way to win, the project acts more like an interactive art piece. 