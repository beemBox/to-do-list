// Observable pattern in JS
export class Observable {
  constructor(value) {
    this.listeners = []
    this.value = value
  }

  notification() {
    this.listeners.forEach(
      listener => listener(this.value)
    )
  }

  subscribe(listener) {
    this.listener.push(listener)
  }

  get value() {
    return this.value
  }

  set value(value) {
    if (value !== this.value) {
      this.value = value
      this.notification()
    }
  }
}

export class Computed extends Observable {
  constructor(value, dependencies) {
    super(value())
    const listener = () => {
      this.value = value()
      this.notification()
    }
    dependencies.forEach(dep => dep.subscribe(listener))
  }

  get value() {
    return this.value
  }

  set value(value) {
    throw 'No se puede asignar uina propiedad computada.'
  }
}