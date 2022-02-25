import BaseComponent from '../../@LittleComps/BaseComponent'
import '../atoms/atoms'

const htmlTemplate = /*html*/`<form class='lists__form'>
<div class='input__container'>
  <input
    class='menu__input--text'
    type='text'
    name='listName'
    placeholder='Set a name for the list...'
    value='${this.newListName}'
  />
</div>
<div classw='input__container'>
  <textarea

    type='text'
    name='observations'
    placeholder='Add some observations?'
    value='${this.newListObs}'
  ></textarea>
</div>

<button class='task__button--send-list' type='button'>Save List</button>
</form>`

export default class CreateListForm extends BaseComponent {
  constructor() {
    super()
    this._template = htmlTemplate
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = this._template
  }
}