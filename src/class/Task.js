export class Task {
  constructor(taskName, dateTask, created, modified) {
    this.taskName = taskName
    this.status = 0
    this.createdDate = created || Date.now()
    this.modifiedDate = modified
  }
}