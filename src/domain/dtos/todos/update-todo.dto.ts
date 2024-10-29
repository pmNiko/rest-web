export class UpdateTodoDTO {
  constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { id, text, completedAt } = props;

    if (!id || isNaN(Number(id))) return ["id must be a number"];

    let newCompleteAt = completedAt;
    if (completedAt) {
      newCompleteAt = new Date(completedAt);

      if (newCompleteAt.toString() === "Invalid Date") {
        return ["CompletedAt must be a valid date"];
      }
    }

    return [undefined, new UpdateTodoDTO(id, text, newCompleteAt)];
  }
}
