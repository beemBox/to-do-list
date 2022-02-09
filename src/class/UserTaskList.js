export class UserTaskList {
  constructor(taskName, observations, createdDate, modifiedDate) {
    this._taskName = taskName
    this._observations = observations
    this._createdDate = createdDate || Date.now()
    this._modifiedDate = modifiedDate || null
  }

  get name() {
    return this._taskName
  }

  set name(val) {
    this._taskName = val
  }

  get observations() {
    return this._observations
  }

  set observations(value) {
    this._observations = val
  }

  get createdDate() {
    return this._createdDate // tengo que formatear la fecha
  }

  set createdDate(value) {
    this._createdDate = value
  }
}