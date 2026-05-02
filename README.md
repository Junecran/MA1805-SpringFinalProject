# **Inside The Void** 
**By Eleanor Craner & Simon Bahrani** 


### Links 
 - [Host GitHub](https://github.com/Junecran/MA1805-SpringFinalProject) 
 - [Website](https://junecran.github.io/MA1805-SpringFinalProject/) 
 - ['Inside The Void'](insideTheVoid/index.html) 
 - [Art References](https://uk.pinterest.com/Blank9289/project-inspiration/2d-pixel-game-inspiration/)
 - [Eleanor Personal Text File](textFiles/EleanorCraner_PersonalContributions.txt)



### **Description**
Step into the void with this experimental mini-game, where the vast emptiness becomes a powerful metaphor for isolation and mental health. You guide a delicate, tethered spacecraft that mirrors your own emotional state, while shadowy enemies drift by as the embodiment of intrusive thoughts.

With only simple mouse controls and a rope tether, every movement demands awareness and balance, highlighting your limitations. The experience is designed to evoke reflection, weaving gameplay and the challenge of managing intrusive thoughts into one seamless journey.

**Theme & Design Choices**  
* The spaceship represents the player’s mental state through visible damage, while persistent enemies highlight intrusive thoughts.
* Instead of weapons, gameplay centres on movement and contact, facing negative thoughts head-on, with mouse controls making it feel personal.
* The rope visibly reflects a fragile connection to stability and the struggle to escape negative thoughts.
* Visual cues like flickering, overlays, and no health bar show silent decline, mirroring how mental health often goes unnoticed.
* A scrolling camera, limited guidance, and no scoring system create disorientation and shift focus from winning to enduring ongoing pressure.
* The game uses cold, faded colours to show isolation. Red stands for resilience, and yellow for hope. Pixel art keeps the mood abstract rather than realistic.
* The audio is simple but effective, with eerie space sounds that build tension. Clear sound cues for enemy encounters and ship impacts help give feedback and make the gameplay feel more immersive.

## Debrief
* We organised the game using different game states, like the main menu, instructions, transitions, and gameplay. This kept things structured and avoided putting all the code in one place. Giving each state its own function made it easier to manage and debug the project.
* We used classes like Enemy and Player to organise the main sprites. This made the code easier to read and reuse. For example, we could create several enemies from the same Enemy class instead of writing new code each time.
* We used a simple system for the tethered player instead of a full physics engine. The simple system ensured it did not feel unnatural or too elastic in zero gravity. 
* We used simple square hitboxes and collision detection. Although these hitboxes do not match the exact sprite shapes, they are easy to set up. Since the mechanics are basic, high precision was unnecessary.
* As we added features like pause and menus, managing game states became more complicated. We simplified this by reducing the number of states and combining functions. However, this made debugging difficult, so we created a debug mode that could be toggled in code to show which parts worked.

**Future Improvements**
* We could improve the rope system to make it affect gameplay and the player’s experience more. Adding stronger feedback, like a more obvious snap-back or a stronger pull toward the spaceship, would help create a better sense of connection and tension.
* There are also ways to improve player movement and animation. Letting the player sprite rotate with movement or adding small shaking effects when the spaceship is damaged would give clearer feedback and make the game feel more immersive.
* Adding more enemy types, like faster ones, would increase the challenge while maintaining the mood. 

Further development of the rope mechanics, player feedback, and gameplay variety would enhance immersion and engagement, all while retaining the intended visual and experiential qualities.

## Group Members & Main Responsibilities:

1. **Eleanor Craner** - [Personal Text File](textFiles/EleanorCraner_PersonalContributions.txt)
- Pixel Art 
- Menus/UI & Transitions
- player & Enemies movement

2. **Simon Bahrani** 
- Sounds
- Ship Health mechanic
- Sprite Collisions 


## Concept Development 
[**Link to Art References**](https://uk.pinterest.com/Blank9289/project-inspiration/2d-pixel-game-inspiration/)
### Early Concepts
* **Noise Parkcore (Rain + Water Creature Platformer)**
This game idea features loud noises that trigger rain. The player controls a water creature that jumps between puddles. If there’s no microphone input, the character makes sound by jumping into puddles.

* **Music Soundboard Birds (Interactive Music System)**
This idea is a music-making tool where power lines act as a musical staff. Birds sit on the lines like notes, and each bird stands for a different instrument or sound.

* **Wordplay Art Room**
This concept is a room full of objects with double meanings. When you interact with an object, it changes into its other meaning, like a computer mouse turning into a real mouse. It could also include word puzzle mechanics similar to Wordle.

* **Unscrabble Witch Game**
Players drag letters into a magic circle, where they fade or resist, making word creation magical. 


### Change Direction
We initially planned to make a game, but soon shifted to creating an interactive art piece focused on emotion and atmosphere, prioritising sensory experience over traditional gameplay. We explored themes like hope, despair, mental health, illness, and comfort in uncertainty or adventure, leading us to focus on loneliness, a widely relatable emotion today.

### Final Concepts
The project became an interactive experience. Simple actions, visuals, and sounds create tension and vulnerability, with sounds responding to player actions and visuals highlighting key moments.

The experience explores loneliness and stress. The 'tethered player system' connects players to an object or boundary, creating dependence and emphasising threats. With no clear goals or ways to win, it functions as an interactive art piece, with menus and interface supporting the mood.