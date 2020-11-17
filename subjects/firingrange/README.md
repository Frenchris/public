## FiringRange

In this exercise, you will learn to use Unreal Engine and use Blueprints to script functionalities of a basic FPS game. The theme is to reproduce a firing range. And remember weapons are allowed only inside the shooting area!!

### Instructions

The map of this project should be composed by a cube with dimensions of X = 35, Y = 40, Z = 1, simulating the floor and other cubes as walls around the floor. In the map there should be a zone where the character should be able to walk around and shoot to the targets and another zone where the player can not go, where the targets are present.

For this project you will have to create a Blueprint Class target, that will have some characteristics. The target should :

- either be moving from side to side or stationary.
- be dynamic, using the timeline node.
- use a public variable to set or unset the movement animation of the target.
- rise again after x seconds after being hit it with a projectile, , and behave like before it was hit.

Only one class of target is allowed on the whole project.

The previous mentioned projectile should:

- have a size of X = Y = Z = 0,5.
- have a speed of 10000.

The First-person template and all needed assets can be found in the Firing Range folder.

When finished, your project should look like the executable example on the folder or the “Expected Result” video.

> Don’t forget to zip up the project compile and save everything for peer correction.

#### Bonus

Here are some ideas for improving the game:

- Targets with different speeds
- Textures on the walls and ground
- Add obstacles in front of the targets