export const template = {
  get task() {
    const taskTpl = document.createElement('template')
    taskTpl = `
      <div class='task-item'>
        <slot name='title'><span class='task-item__title'></span></slot>
        <slot name='observations'><span class='task-item__observations'></span></slot>
        <slot name='edit__btn'><button class='task-item__edit'></button></slot>
        <slot name='delete__btn'><button class='task-item__delete'></button></slot>
      </div>
    `
    return taskTpl
  }
}