import { Helper } from './Helper.js'

export class UserTaskList {
  constructor(listName, observations, createdDate, modifiedDate) {
    this._listName = listName
    this._observations = observations
    this._createdDate = createdDate || Date.now()
    this._modifiedDate = modifiedDate || null
  }

  get name() {
    return this._listName
  }

  set name(val) {
    this._listName = val
  }

  get observations() {
    return this._observations
  }

  set observations(value) {
    this._observations = val
  }

  get createdDate() {
    return Helper.formatDate(this._createdDate)
  }

  set createdDate(value) {
    this._createdDate = value
  }
}