export class Post {
  public imagePath: string;
  public title: string;
  public description: string;

  constructor(imagePath: string, title: string, description: string){
    this.imagePath = imagePath;
    this.title = title;
    this.description = description;
  }
}
