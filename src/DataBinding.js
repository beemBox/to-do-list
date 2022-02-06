import { Observable, Computed } from './Observable'

export class DataBinding {
  execute(codeToEval) {
    return eval(codeToEval)
  }

  executeInContext(src, context, attachBindingHelpers = false) {
    if (attachBindingHelpers) {
      context.observable = this.observable
      context.computed = this.computed
      context.bindValue = this.bindValue
    }

    // pasamos el contexto del componente en el que se encuentra
    return this.execute.call(context, src)
  }

  observable(value) {
    return new Observable(value)
  }
  compute(calc, dependencies) {
    return new Computed(calc, dependencies)
  }

  bindAll(el, context) {
    this.bindLists(el, context)
    this.bindObervables(el, context)
  }

  bindvalue(input, observable) {
    const inicial = observable.value
    input.value = inicial
    observable.subscribe(() => input.value = observable.value)

    let convert = value => value
    if (typeof inicial === 'number')
      convert = num => isNaN(num = parseFloat(num))
        ? 0 : num

    // cuando el usuario termina de ingresar datos en el input
    // convertimos el valor y lo agregamos al observable
    input.onkeyup = () => observable.value = convert(input.value)
  }

  bindObservables(el, context) {
    const dataBinding = el.querySelectorAll('[data-bind]')
    dataBinding.forEach(el => {
      this.bindValue(context[el.getAttribute('data-bind')])
    })
  }

  bindLists(el, context) {
    const listBinding = el.querySelectorAll('[repeat]')
    listBinding.forEach(el => {
      const parentEl = el.parentElement
      const expression = el.getAttribute('repeat')

      el.removeAttribute('repeat')
      const elHtml = el.outerHTML
      parentEl.removeChild(el)

      context[expression].forEach(item => {
        let nuevoHtml = `${elHtml}`
        // buscamos los datos a reemplazar por variables en el html dentro de -> {{}}
        const matchCodigo = nuevoHtml.match(/\{\{([^\}]*?)\}\}/g)

        if (matchCodigo) {
          matchCodigo.forEach(match => {
            match = match.replace('{{', '').replace('}}', '')
            const value = this.executeInContext(`this.${match}`, { item })
            nuevoHtml = nuevoHtml.replace(`{{${match}}}`, value)
          })
          parentEl.innerHTML += nuevoHtml
        }
      })
    })
  }
}