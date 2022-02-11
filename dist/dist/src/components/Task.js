import { BaseComponent } from './BaseComponent.js'
import { template } from '../../templates/task.js'

export class Task extends BaseComponent {
  constructor(taskName, dateTask, created, modified) {
    this._taskName = taskName
    this._status = 0
    this._createdDate = created || Date.now()
    this._modifiedDate = modified
  }

  get taskName() {
    return this._taskName
  }

  set taskName(value) {
    this._taskName = value
  }

  get status() {
    return this._status
  }

  set status(value) {
    this._status = value
  }


}